/* ORQOYIN — /science dynamic article loader */

(function () {
    'use strict';

    const container = document.getElementById('science-articles-list');
    if (!container) return;

    async function loadFanArticles() {
        try {
            const res = await fetch('/api/articles');
            if (!res.ok) return;
            const data = await res.json();

            if (data.ok && Array.isArray(data.articles) && data.articles.length > 0) {
                renderArticles(data.articles);
            }
        } catch (e) {
            console.warn('Could not fetch dynamic articles, using static fallback:', e);
        }
    }

    function renderArticles(articles) {
        container.innerHTML = articles.map(a => {
            const imageSrc = a.heroImage || '/science/article00001/bottle.png';
            const dateStr = a.dateFormatted || a.date || '';
            const readTime = a.readTime || '4 daqiqa öqiş';
            const slug = a.slug || a.id;
            const link = (slug === 'article00001') ? '/science/article00001/' : `/science/${encodeURIComponent(slug)}/`;

            return `
            <a href="${link}" class="sci-card reveal">
                <div class="sci-thumb">
                    <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(a.title)}" loading="lazy">
                </div>
                <div class="sci-card-body">
                    <span class="sci-tag">${escapeHtml(a.category || 'Fan')}</span>
                    <h2 class="sci-card-title">${escapeHtml(a.title)}</h2>
                    <p class="sci-card-desc">${escapeHtml(a.standfirst || '')}</p>
                    <span class="sci-meta">${escapeHtml(dateStr)} · ${escapeHtml(readTime)}</span>
                </div>
            </a>`;
        }).join('');
    }

    function escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    loadFanArticles();
})();
