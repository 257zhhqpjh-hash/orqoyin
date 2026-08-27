/* ═══════════════════════════════════════════════════════════
   ORQOYIN — /science Dynamic Editorial Stream (The Verge Style)
═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    let allArticles = [];
    let activeCategory = 'all';

    const leadSlot = document.getElementById('lead-article-slot');
    const gridSlot = document.getElementById('science-articles-grid');
    const tickerText = document.getElementById('ticker-headline');
    const searchInput = document.getElementById('fan-search');
    const chipBtns = document.querySelectorAll('.sci-chip');

    async function initScienceFeed() {
        try {
            const res = await fetch('/api/articles');
            if (!res.ok) return;
            const data = await res.json();

            if (data.ok && Array.isArray(data.articles) && data.articles.length > 0) {
                allArticles = data.articles;
                renderFeed();
            }
        } catch (e) {
            console.warn('Dynamic feed fetch failed:', e);
        }
    }

    function renderFeed() {
        const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

        let filtered = allArticles.filter(a => {
            if (activeCategory !== 'all') {
                const cat = (a.category || '').toLowerCase();
                const tags = Array.isArray(a.tags) ? a.tags.join(' ').toLowerCase() : '';
                if (!cat.includes(activeCategory.toLowerCase()) && !tags.includes(activeCategory.toLowerCase())) {
                    return false;
                }
            }
            if (query) {
                const matchTitle = (a.title || '').toLowerCase().includes(query);
                const matchDesc = (a.standfirst || '').toLowerCase().includes(query);
                const matchCat = (a.category || '').toLowerCase().includes(query);
                if (!matchTitle && !matchDesc && !matchCat) return false;
            }
            return true;
        });

        if (filtered.length === 0) {
            if (leadSlot) leadSlot.innerHTML = '';
            if (gridSlot) gridSlot.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;font-family:var(--mono);color:var(--t3);">Ushbu ruknda hozircha maqola topilmadi.</div>';
            return;
        }

        /* 1. Set Lead Article (First in list) */
        const lead = filtered[0];
        if (tickerText && lead) {
            tickerText.textContent = `${lead.title} — ${lead.author || 'ORQOYIN'}`;
        }

        const leadImage = lead.heroImage || '/science/article00001/bottle.png';
        const leadLink = getArticleLink(lead);
        const leadDate = lead.dateFormatted || lead.date || '';

        if (leadSlot) {
            leadSlot.innerHTML = `
            <a href="${leadLink}" class="sci-lead-card">
                <div class="sci-lead-thumb">
                    <img src="${escapeHtml(leadImage)}" alt="${escapeHtml(lead.title)}" loading="lazy">
                </div>
                <div class="sci-lead-content">
                    <span class="sci-lead-tag">// ${escapeHtml((lead.category || 'Fan').toUpperCase())}</span>
                    <h2 class="sci-lead-title">${escapeHtml(lead.title)}</h2>
                    <p class="sci-lead-desc">${escapeHtml(lead.standfirst || '')}</p>
                    <div class="sci-lead-byline">
                        <span class="author-dot">●</span>
                        <span>${escapeHtml(lead.author || 'ORQOYIN tahririyati')}</span>
                        <span>·</span>
                        <span>${escapeHtml(leadDate)}</span>
                        <span>·</span>
                        <span>${escapeHtml(lead.readTime || '4 daqiqa öqiş')}</span>
                    </div>
                </div>
            </a>`;
        }

        /* 2. Set Stream Grid (Remaining articles or all if only 1) */
        const streamArticles = filtered.slice(1);

        if (gridSlot) {
            if (streamArticles.length === 0) {
                gridSlot.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:30px 20px;font-family:var(--mono);font-size:.8rem;color:var(--t3);">
                    Boshqa maqolalarni o‘qish yoki yangisini yozish uchun <a href="/yoz" style="color:var(--c1);text-decoration:underline;">/yoz</a> bo‘limiga o‘ting.
                </div>`;
            } else {
                gridSlot.innerHTML = streamArticles.map(a => {
                    const img = a.heroImage || '/science/article00001/bottle.png';
                    const link = getArticleLink(a);
                    const date = a.dateFormatted || a.date || '';
                    const cat = a.category || 'Fan';

                    return `
                    <a href="${link}" class="sci-grid-card">
                        <div class="sci-grid-thumb">
                            <img src="${escapeHtml(img)}" alt="${escapeHtml(a.title)}" loading="lazy">
                        </div>
                        <div class="sci-grid-body">
                            <span class="sci-grid-tag">// ${escapeHtml(cat.toUpperCase())}</span>
                            <h3 class="sci-grid-title">${escapeHtml(a.title)}</h3>
                            <p class="sci-grid-desc">${escapeHtml(a.standfirst || '')}</p>
                            <div class="sci-grid-meta">
                                <span>${escapeHtml(date)} · ${escapeHtml(a.readTime || '')}</span>
                            </div>
                        </div>
                    </a>`;
                }).join('');
            }
        }
    }

    function getArticleLink(a) {
        const slug = a.slug || a.id;
        if (slug === 'article00001') return '/science/article00001/';
        return `/science/${encodeURIComponent(slug)}/`;
    }

    function escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /* Event Listeners */
    if (searchInput) {
        searchInput.addEventListener('input', renderFeed);
    }

    chipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chipBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-cat') || 'all';
            renderFeed();
        });
    });

    initScienceFeed();
})();
