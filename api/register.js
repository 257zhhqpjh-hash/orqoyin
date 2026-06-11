/* ORQOYIN — registration endpoint (Vercel serverless)
   Proxies form submissions to Telegram so the bot token never
   ships to the browser. Validates input, honeypot, rate-limits. */

const TG_TOKEN   = process.env.TG_TOKEN   || '7981937991:AAFp7zgW0xJ2pc83jL6tH3LRy_mIl38Tkjw';
const TG_CHAT_ID = process.env.TG_CHAT_ID || '-5134567971';

const COURSE_LABELS = {
    cybersecurity: '🛡 Kiberxavfsizlik',
    english:       '🌐 Ingliz Tili',
    arabic:        '🕌 Arab Tili',
    math_kids:     '🔢 Bolalar Matematikasi',
    ielts_free:    '📖 Bepul IELTS Tayyorlovi',
    sat_free:      '📐 Bepul SAT Tayyorlovi',
};

const SOURCE_LABELS = {
    instagram: 'Instagram',
    telegram:  'Telegram',
    friend:    "Do'st / tanish",
    tiktok:    'TikTok',
    google:    'Google',
    other:     'Boshqa',
};

/* naive per-instance rate limit: 5 req/min per IP */
const hits = new Map();
function limited(ip) {
    const now  = Date.now();
    const list = (hits.get(ip) || []).filter(t => now - t < 60_000);
    if (list.length >= 5) return true;
    list.push(now);
    hits.set(ip, list);
    return false;
}

const clean = (v, max) => String(v ?? '').slice(0, max).replace(/[<>&]/g, '').trim();

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ ok: false });
        return;
    }

    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    if (limited(ip)) {
        res.status(429).json({ ok: false });
        return;
    }

    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { body = {}; }
    }
    body = body || {};

    /* honeypot — pretend success so bots stop retrying */
    if (body.website) {
        res.status(200).json({ ok: true });
        return;
    }

    const name   = clean(body.name, 80);
    const phone  = clean(body.phone, 18);
    const course = String(body.course || '');
    const smena  = clean(body.smena, 12);
    const source = String(body.source || '');

    if (!name || phone.length < 7 || !COURSE_LABELS[course]) {
        res.status(400).json({ ok: false });
        return;
    }

    const message =
        `📋 <b>Yangi ro'yxat</b>\n\n` +
        `👤 <b>Ism:</b> ${name}\n` +
        `📞 <b>Telefon:</b> ${phone}\n` +
        `📚 <b>Kurs:</b> ${COURSE_LABELS[course]}\n` +
        `🕐 <b>Smena:</b> ${smena || '—'}\n` +
        `📣 <b>Manba:</b> ${SOURCE_LABELS[source] || '—'}`;

    try {
        const tg = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: 'HTML' }),
        });
        if (!tg.ok) throw new Error('telegram ' + tg.status);
        res.status(200).json({ ok: true });
    } catch {
        res.status(502).json({ ok: false });
    }
};
