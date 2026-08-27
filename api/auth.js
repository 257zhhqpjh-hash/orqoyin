/* ORQOYIN — /api/auth
   Author authentication & session verification for /yoz studio.
   Protected with HMAC token signing and rate limiting. */

const crypto = require('crypto');

const ADMIN_SECRET = process.env.YOZ_PASSWORD || process.env.ADMIN_KEY || 'H0d1j4x0n&';
const JWT_SECRET   = process.env.JWT_SECRET   || ADMIN_SECRET || 'orqoyin-yoz-secret-2026';

/* In-memory rate limiting for auth attempts */
const failedHits = new Map();
function isRateLimited(ip) {
    const now = Date.now();
    const attempts = (failedHits.get(ip) || []).filter(t => now - t < 60_000);
    if (attempts.length >= 5) return true;
    return false;
}
function recordFailedAttempt(ip) {
    const now = Date.now();
    const attempts = (failedHits.get(ip) || []).filter(t => now - t < 60_000);
    attempts.push(now);
    failedHits.set(ip, attempts);
}

function signToken(payload) {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
        return null;
    }
    try {
        const data = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
        if (data.exp && data.exp < Date.now()) return null;
        return data;
    } catch {
        return null;
    }
}

module.exports = async (req, res) => {
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

    /* GET: Check session validity */
    if (req.method === 'GET') {
        const authHeader = req.headers['authorization'] || '';
        const cookieToken = req.headers['cookie'] ? (req.headers['cookie'].match(/yoz_token=([^;]+)/) || [])[1] : '';
        const token = authHeader.replace(/^Bearer\s+/i, '') || cookieToken;

        const session = verifyToken(token);
        if (session && session.role === 'author') {
            return res.status(200).json({ ok: true, authenticated: true, user: session.user || 'author' });
        }
        return res.status(200).json({ ok: false, authenticated: false });
    }

    /* POST: Author Login */
    if (req.method === 'POST') {
        if (isRateLimited(ip)) {
            return res.status(429).json({ ok: false, message: "Juda ko'p urinishlar. Iltimos, 1 daqiqa kuting." });
        }

        let body = req.body;
        if (typeof body === 'string') {
            try { body = JSON.parse(body); } catch { body = {}; }
        }
        body = body || {};

        const password = String(body.password || body.key || '').trim();

        if (!password) {
            recordFailedAttempt(ip);
            return res.status(400).json({ ok: false, message: 'Parol kiritilmadi.' });
        }

        /* Compare password securely */
        const isMatch = (password === ADMIN_SECRET);

        if (!isMatch) {
            recordFailedAttempt(ip);
            return res.status(401).json({ ok: false, message: "Noto'g'ri parol yoki maxfiy kalit." });
        }

        const exp = Date.now() + 14 * 24 * 3600 * 1000; // 14 days
        const token = signToken({ role: 'author', user: 'ORQOYIN Tahririyat', exp });

        res.setHeader('Set-Cookie', `yoz_token=${token}; Path=/; Max-Age=${14 * 24 * 3600}; SameSite=Lax`);
        return res.status(200).json({
            ok: true,
            message: 'Muvaffaqiyatli autentifikatsiya qilindi.',
            token,
            expiresAt: exp,
            user: 'ORQOYIN Tahririyat'
        });
    }

    /* DELETE / Logout */
    if (req.method === 'DELETE') {
        res.setHeader('Set-Cookie', `yoz_token=; Path=/; Max-Age=0; SameSite=Lax`);
        return res.status(200).json({ ok: true, message: 'Tizimdan chiqildi.' });
    }

    return res.status(405).json({ ok: false, message: 'Method not allowed' });
};

module.exports.verifyToken = verifyToken;
