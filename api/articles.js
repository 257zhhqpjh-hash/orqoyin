/* ORQOYIN — /api/articles
   Full CRUD serverless API for Fan (science) blog articles.
   Supports authenticated mutations, public read, GitHub persistence, and filesystem caching. */

const fs = require('fs');
const path = require('path');
const { verifyToken } = require('./auth');

const GITHUB_REPO  = process.env.GITHUB_REPO  || '257zhhqpjh-hash/orqoyin';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';

/* In-memory store initialized from data/articles.json */
let memoryArticles = null;

function getArticlesFilePath() {
    return path.join(process.cwd(), 'data', 'articles.json');
}

function loadInitialArticles() {
    if (memoryArticles && memoryArticles.length > 0) return memoryArticles;

    try {
        const filePath = getArticlesFilePath();
        if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, 'utf8');
            memoryArticles = JSON.parse(raw);
            return memoryArticles;
        }
    } catch (e) {
        console.error('Failed to read data/articles.json from disk:', e);
    }

    /* Fallback default seed */
    memoryArticles = [
        {
            id: "article00001",
            slug: "article00001",
            title: "Butilka şakli faqat funksional vazifasidan kelib çiqqan bölsa ham tovar belgisi sifatida röyxatdan ötkazilişi mumkinmi?",
            category: "Intellektual mulk",
            standfirst: "Şakli funksional zaruratdan kelib çiqadigan uç ölçamli butilka tovar belgisi sifatida huquqiy himoya olişi mumkinmi? Özbekiston qonunçiligi va ma'muriy reglament bu savolga aniq javob beradi.",
            author: "ORQOYIN tahririyati",
            date: "2026-06-06",
            dateFormatted: "6-iyun, 2026",
            readTime: "4 daqiqa öqiş",
            heroImage: "/science/article00001/bottle.png",
            imageCaption: "Maişiy kimyo mahsuloti butilkasining uç ölçamli şakli — tahririyat murojaatida körib çiqilgan namuna.",
            tags: ["Fan", "Intellektual mulk", "Tovar belgilari"],
            published: true,
            createdAt: "2026-06-06T10:00:00.000Z",
            updatedAt: "2026-06-06T10:00:00.000Z",
            content: "Özbekiston Respublikasining «Tovar belgilari, xizmat körsatiş belgilari va tovar kelib çiqqan joy nomlari töğrisida»gi Qonuniga köra, tovar belgisi bir yuridik yoki jismoniy şaxsning tovarlarini boşqa şaxslarning şu turdagi tovarlaridan farqlaş uçun xizmat qiladigan va belgilangan tartibda röyxatdan ötkazilgan belgidir.\n\nŞuningdek, Vazirlar Mahkamasining 2023-yil 19-sentyabrdagi 480-son qarori bilan tasdiqlangan Tovar belgilari va xizmat körsatiş belgilarini röyxatdan ötkaziş böyiça davlat xizmatini körsatişning ma'muriy reglamentida tovar belgisi sifatida röyxatdan ötkazilişi mumkin bölmagan belgilar ham belgilangan.\n\nXususan, mazkur Reglamentning 7-bandi «d» kiçik bandiga muvofiq, şakli faqat funksional vazifasidan kelib çiqadigan uç ölçamli obyektlar tovar belgisi sifatida röyxatdan ötkazilmaydi."
        }
    ];
    return memoryArticles;
}

async function persistArticles(articles) {
    memoryArticles = articles;

    /* 1. Try local filesystem write */
    try {
        const filePath = getArticlesFilePath();
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), 'utf8');
    } catch (e) {
        console.warn('Filesystem write not available (serverless read-only environment):', e.message);
    }

    /* 2. Try GitHub API commit if GITHUB_TOKEN is available */
    if (GITHUB_TOKEN && GITHUB_REPO) {
        try {
            const apiPath = `https://api.github.com/repos/${GITHUB_REPO}/contents/data/articles.json`;
            const getRes = await fetch(apiPath, {
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github+json',
                    'User-Agent': 'ORQOYIN-App'
                }
            });

            let sha = null;
            if (getRes.ok) {
                const fileData = await getRes.json();
                sha = fileData.sha;
            }

            const contentBase64 = Buffer.from(JSON.stringify(articles, null, 2)).toString('base64');
            const putRes = await fetch(apiPath, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'ORQOYIN-App'
                },
                body: JSON.stringify({
                    message: 'Content update: articles data via /yoz studio',
                    content: contentBase64,
                    sha: sha || undefined
                })
            });

            if (!putRes.ok) {
                const errText = await putRes.text();
                console.error('GitHub sync failed:', putRes.status, errText);
            }
        } catch (err) {
            console.error('GitHub API error during persist:', err);
        }
    }
}

function checkAuth(req) {
    const authHeader = req.headers['authorization'] || '';
    const cookieToken = req.headers['cookie'] ? (req.headers['cookie'].match(/yoz_token=([^;]+)/) || [])[1] : '';
    const token = authHeader.replace(/^Bearer\s+/i, '') || cookieToken;
    const session = verifyToken(token);
    return session && session.role === 'author';
}

function formatDate(dateStr) {
    if (!dateStr) dateStr = new Date().toISOString();
    const d = new Date(dateStr);
    const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
    return `${d.getDate()}-${months[d.getMonth()]}, ${d.getFullYear()}`;
}

function slugify(text) {
    return String(text || '')
        .toLowerCase()
        .replace(/['"ʻʼ`]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function calculateReadTime(text) {
    const words = String(text || '').trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 160));
    return `${minutes} daqiqa öqiş`;
}

module.exports = async (req, res) => {
    const articles = loadInitialArticles();
    const isAuthed = checkAuth(req);

    /* ════ GET: List or Single Article ════ */
    if (req.method === 'GET') {
        const { slug, id, all } = req.query || {};

        if (slug || id) {
            const item = articles.find(a => a.slug === slug || a.id === id);
            if (!item) {
                return res.status(404).json({ ok: false, message: 'Maqola topilmadi.' });
            }
            if (!item.published && !isAuthed) {
                return res.status(404).json({ ok: false, message: 'Maqola topilmadi.' });
            }
            return res.status(200).json({ ok: true, article: item });
        }

        /* List articles */
        let list = articles;
        if (!isAuthed && all !== 'true') {
            list = list.filter(a => a.published);
        }

        /* Sort newest first */
        list = [...list].sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));

        return res.status(200).json({
            ok: true,
            articles: list,
            isAuthor: isAuthed
        });
    }

    /* All mutations require authentication */
    if (!isAuthed) {
        return res.status(401).json({ ok: false, message: 'Ruxsat berilmadi. Iltimos, /yoz orqali kiring.' });
    }

    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { body = {}; }
    }
    body = body || {};

    /* ════ POST: Create New Article ════ */
    if (req.method === 'POST') {
        const title = String(body.title || '').trim();
        if (!title) {
            return res.status(400).json({ ok: false, message: 'Maqola sarlavhasi majburiy.' });
        }

        const date = body.date || new Date().toISOString().split('T')[0];
        const rawSlug = body.slug ? slugify(body.slug) : slugify(title);
        let slug = rawSlug || `maqola-${Date.now()}`;

        /* Ensure slug uniqueness */
        let counter = 1;
        while (articles.some(a => a.slug === slug)) {
            slug = `${rawSlug}-${counter++}`;
        }

        const content = String(body.content || '');
        const newArticle = {
            id: 'art_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            slug: slug,
            title: title,
            category: String(body.category || 'Fan').trim(),
            standfirst: String(body.standfirst || '').trim(),
            author: String(body.author || 'ORQOYIN tahririyati').trim(),
            date: date,
            dateFormatted: body.dateFormatted || formatDate(date),
            readTime: body.readTime || calculateReadTime(content),
            heroImage: String(body.heroImage || '/science/article00001/bottle.png').trim(),
            imageCaption: String(body.imageCaption || '').trim(),
            tags: Array.isArray(body.tags) ? body.tags : (body.tags ? String(body.tags).split(',').map(s => s.trim()) : ['Fan']),
            published: body.published !== false,
            content: content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        articles.unshift(newArticle);
        await persistArticles(articles);

        return res.status(201).json({
            ok: true,
            message: 'Yangi maqola muvaffaqiyatli saqlandi.',
            article: newArticle
        });
    }

    /* ════ PUT: Update Existing Article ════ */
    if (req.method === 'PUT') {
        const targetId = String(req.query.id || req.query.slug || body.id || body.slug || '');
        const index = articles.findIndex(a => a.id === targetId || a.slug === targetId);

        if (index === -1) {
            return res.status(404).json({ ok: false, message: 'Tahrirlash uchun maqola topilmadi.' });
        }

        const existing = articles[index];
        const content = body.content !== undefined ? String(body.content) : existing.content;
        const date = body.date || existing.date;

        let slug = existing.slug;
        if (body.slug && body.slug !== existing.slug) {
            const requestedSlug = slugify(body.slug);
            if (!articles.some(a => a.slug === requestedSlug && a.id !== existing.id)) {
                slug = requestedSlug;
            }
        }

        const updatedArticle = {
            ...existing,
            title: body.title !== undefined ? String(body.title).trim() : existing.title,
            slug: slug,
            category: body.category !== undefined ? String(body.category).trim() : existing.category,
            standfirst: body.standfirst !== undefined ? String(body.standfirst).trim() : existing.standfirst,
            author: body.author !== undefined ? String(body.author).trim() : existing.author,
            date: date,
            dateFormatted: body.dateFormatted || formatDate(date),
            readTime: body.readTime || calculateReadTime(content),
            heroImage: body.heroImage !== undefined ? String(body.heroImage).trim() : existing.heroImage,
            imageCaption: body.imageCaption !== undefined ? String(body.imageCaption).trim() : existing.imageCaption,
            tags: body.tags ? (Array.isArray(body.tags) ? body.tags : String(body.tags).split(',').map(s => s.trim())) : existing.tags,
            published: body.published !== undefined ? Boolean(body.published) : existing.published,
            content: content,
            updatedAt: new Date().toISOString()
        };

        articles[index] = updatedArticle;
        await persistArticles(articles);

        return res.status(200).json({
            ok: true,
            message: 'Maqola muvaffaqiyatli yangilandi.',
            article: updatedArticle
        });
    }

    /* ════ DELETE: Remove Article ════ */
    if (req.method === 'DELETE') {
        const targetId = String(req.query.id || req.query.slug || body.id || body.slug || '');
        const index = articles.findIndex(a => a.id === targetId || a.slug === targetId);

        if (index === -1) {
            return res.status(404).json({ ok: false, message: 'O‘chirish uchun maqola topilmadi.' });
        }

        const deleted = articles.splice(index, 1)[0];
        await persistArticles(articles);

        return res.status(200).json({
            ok: true,
            message: 'Maqola muvaffaqiyatli o‘chirildi.',
            article: deleted
        });
    }

    return res.status(405).json({ ok: false, message: 'Method not allowed' });
};
