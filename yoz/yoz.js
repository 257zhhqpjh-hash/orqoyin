/* ═══════════════════════════════════════════════════════════
   ORQOYIN — /yoz Editorial Studio Script
   Author Authentication, Article CRUD, Live Markdown Parser
═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    /* State */
    let currentToken = localStorage.getItem('yoz_token') || '';
    let articlesCache = [];
    let activeFilter = 'all';
    let currentEditArticle = null;
    let isSlugManual = false;

    /* DOM Elements */
    const authView        = document.getElementById('auth-view');
    const appView         = document.getElementById('app-view');
    const authForm        = document.getElementById('auth-form');
    const authKeyInput    = document.getElementById('auth-key');
    const authError       = document.getElementById('auth-error');
    const togglePwdBtn    = document.getElementById('toggle-pwd');
    const btnLogout       = document.getElementById('btn-logout');

    const viewList        = document.getElementById('view-list');
    const viewEditor      = document.getElementById('view-editor');
    const articlesContainer = document.getElementById('articles-container');
    const searchInput     = document.getElementById('article-search');
    const filterPills     = document.querySelectorAll('.fpill');
    const btnCreateArticle= document.getElementById('btn-create-article');
    const btnBackToList   = document.getElementById('btn-back-to-list');

    const statTotal       = document.getElementById('stat-total');
    const statPublished   = document.getElementById('stat-published');
    const statDrafts      = document.getElementById('stat-drafts');

    /* Editor Form Elements */
    const articleForm     = document.getElementById('article-form');
    const editIdInput     = document.getElementById('edit-id');
    const fTitle          = document.getElementById('f-title');
    const fSlug           = document.getElementById('f-slug');
    const fCategory       = document.getElementById('f-category');
    const fStandfirst     = document.getElementById('f-standfirst');
    const fAuthor         = document.getElementById('f-author');
    const fDate           = document.getElementById('f-date');
    const fReadtime       = document.getElementById('f-readtime');
    const fHeroimage      = document.getElementById('f-heroimage');
    const fImageFile      = document.getElementById('f-image-file');
    const btnUploadTrigger= document.getElementById('btn-upload-trigger');
    const fImagecaption   = document.getElementById('f-imagecaption');
    const fContent        = document.getElementById('f-content');
    const fTags           = document.getElementById('f-tags');
    const fPublished      = document.getElementById('f-published');

    const editorHeading   = document.getElementById('editor-heading');
    const btnSaveDraft    = document.getElementById('btn-save-draft');
    const btnSaveDraftBtm = document.getElementById('btn-save-draft-bottom');
    const btnPublish      = document.getElementById('btn-publish');
    const btnPublishBtm   = document.getElementById('btn-publish-bottom');
    const btnCancelEdit   = document.getElementById('btn-cancel-edit');
    const btnDeleteArticle= document.getElementById('btn-delete-article');

    /* Preview Elements */
    const prevCrumbSlug   = document.getElementById('prev-crumb-slug');
    const prevEyebrow     = document.getElementById('prev-eyebrow');
    const prevTitle       = document.getElementById('prev-title');
    const prevStandfirst  = document.getElementById('prev-standfirst');
    const prevAuthor      = document.getElementById('prev-author');
    const prevDate        = document.getElementById('prev-date');
    const prevReadtime    = document.getElementById('prev-readtime');
    const prevHeroWrap    = document.getElementById('prev-hero-wrap');
    const prevHeroImg     = document.getElementById('prev-hero-img');
    const prevHeroCaption = document.getElementById('prev-hero-caption');
    const prevBodyHtml    = document.getElementById('prev-body-html');
    const prevTags        = document.getElementById('prev-tags');
    const previewWordCount= document.getElementById('preview-word-count');

    /* ════ 1. AUTHENTICATION & SESSION ════ */

    async function checkAuthSession() {
        if (!currentToken) {
            showAuthView();
            return;
        }

        try {
            const res = await fetch('/api/auth', {
                headers: { 'Authorization': `Bearer ${currentToken}` }
            });
            const data = await res.json();
            if (data.ok && data.authenticated) {
                showAppView();
                loadArticles();
            } else {
                currentToken = '';
                localStorage.removeItem('yoz_token');
                showAuthView();
            }
        } catch (e) {
            console.warn('Auth check error, falling back to local token validation:', e);
            showAppView();
            loadArticles();
        }
    }

    function showAuthView() {
        authView.style.display = 'grid';
        appView.style.display = 'none';
        if (authKeyInput) authKeyInput.focus();
    }

    function showAppView() {
        authView.style.display = 'none';
        appView.style.display = 'flex';
        showListView();
    }

    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            authError.style.display = 'none';
            const password = authKeyInput.value.trim();
            if (!password) return;

            const submitBtn = document.getElementById('auth-submit-btn');
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Tekshirilmoqda...';

            try {
                const res = await fetch('/api/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });
                const data = await res.json();

                if (data.ok && data.token) {
                    currentToken = data.token;
                    localStorage.setItem('yoz_token', currentToken);
                    showToast('Tizimga muvaffaqiyatli kirildi', 'success');
                    showAppView();
                    loadArticles();
                } else {
                    authError.textContent = data.message || "Noto'g'ri maxfiy kalit.";
                    authError.style.display = 'block';
                }
            } catch (err) {
                authError.textContent = 'Server bilan bog‘lanishda xatolik yuz berdi.';
                authError.style.display = 'block';
            } finally {
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = 'Kirish';
            }
        });
    }

    if (togglePwdBtn) {
        togglePwdBtn.addEventListener('click', () => {
            const isPassword = authKeyInput.type === 'password';
            authKeyInput.type = isPassword ? 'text' : 'password';
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', async () => {
            try {
                await fetch('/api/auth', { method: 'DELETE' });
            } catch {}
            currentToken = '';
            localStorage.removeItem('yoz_token');
            showToast('Tizimdan chiqildi', 'info');
            showAuthView();
        });
    }

    /* ════ 2. ARTICLES LIST & DASHBOARD ════ */

    async function loadArticles() {
        articlesContainer.innerHTML = '<div class="loading-state">Maqolalar yuklanmoqda...</div>';

        try {
            const res = await fetch('/api/articles?all=true', {
                headers: { 'Authorization': `Bearer ${currentToken}` }
            });
            const data = await res.json();

            if (data.ok && Array.isArray(data.articles)) {
                articlesCache = data.articles;
                renderStats();
                renderArticlesList();
            } else {
                articlesContainer.innerHTML = '<div class="empty-state">Maqolalarni yuklab bo‘lmadi.</div>';
            }
        } catch (err) {
            articlesContainer.innerHTML = '<div class="empty-state">Maqolalarni yuklashda xatolik yuz berdi.</div>';
        }
    }

    function renderStats() {
        const total = articlesCache.length;
        const published = articlesCache.filter(a => a.published).length;
        const drafts = total - published;

        if (statTotal) statTotal.textContent = total;
        if (statPublished) statPublished.textContent = published;
        if (statDrafts) statDrafts.textContent = drafts;
    }

    function renderArticlesList() {
        const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

        let filtered = articlesCache.filter(a => {
            if (activeFilter === 'published' && !a.published) return false;
            if (activeFilter === 'drafts' && a.published) return false;
            if (!query) return true;
            return (
                (a.title && a.title.toLowerCase().includes(query)) ||
                (a.category && a.category.toLowerCase().includes(query)) ||
                (a.standfirst && a.standfirst.toLowerCase().includes(query)) ||
                (a.content && a.content.toLowerCase().includes(query))
            );
        });

        if (filtered.length === 0) {
            articlesContainer.innerHTML = '<div class="empty-state">Hech qanday maqola topilmadi. Yangi maqola yozishingiz mumkin.</div>';
            return;
        }

        articlesContainer.innerHTML = filtered.map(a => {
            const isPub = Boolean(a.published);
            const statusClass = isPub ? 'published' : 'draft';
            const statusLabel = isPub ? 'Nashr etilgan' : 'Qoralama';
            const imageSrc = a.heroImage || '/science/article00001/bottle.png';
            const dateDisplay = a.dateFormatted || a.date || 'Sana ko‘rsatilmagan';

            return `
            <div class="art-card" data-id="${escapeHtml(a.id || a.slug)}">
                <div class="art-thumb">
                    <img src="${escapeHtml(imageSrc)}" alt="" loading="lazy">
                </div>
                <div class="art-body">
                    <div class="art-top-meta">
                        <span class="art-category">${escapeHtml(a.category || 'Fan')}</span>
                        <span class="art-status ${statusClass}">${statusLabel}</span>
                        <span class="art-bottom-meta">${escapeHtml(dateDisplay)} · ${escapeHtml(a.readTime || '')}</span>
                    </div>
                    <h3 class="art-title">${escapeHtml(a.title)}</h3>
                    <p class="art-desc">${escapeHtml(a.standfirst || '')}</p>
                </div>
                <div class="art-actions">
                    <button type="button" class="btn-ghost btn-sm btn-edit-art" data-id="${escapeHtml(a.id || a.slug)}">
                        ✏️ Tahrirlash
                    </button>
                    <a href="/science/${escapeHtml(a.slug || a.id)}/" target="_blank" class="btn-ghost btn-sm">
                        ↗ Ko‘rish
                    </a>
                    <button type="button" class="btn-danger btn-sm btn-delete-art" data-id="${escapeHtml(a.id || a.slug)}" title="O‘chirish">
                        🗑
                    </button>
                </div>
            </div>`;
        }).join('');

        /* Bind edit & delete events */
        articlesContainer.querySelectorAll('.btn-edit-art').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const article = articlesCache.find(a => a.id === id || a.slug === id);
                if (article) openEditorFor(article);
            });
        });

        articlesContainer.querySelectorAll('.btn-delete-art').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                confirmDeleteArticle(id);
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', renderArticlesList);
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeFilter = pill.getAttribute('data-filter');
            renderArticlesList();
        });
    });

    /* ════ 3. EDITOR VIEW & FORM ════ */

    function showListView() {
        viewList.style.display = 'block';
        viewEditor.style.display = 'none';
        currentEditArticle = null;
    }

    function showEditorView() {
        viewList.style.display = 'none';
        viewEditor.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (btnCreateArticle) {
        btnCreateArticle.addEventListener('click', () => {
            openEditorFor(null);
        });
    }

    if (btnBackToList) {
        btnBackToList.addEventListener('click', () => {
            showListView();
        });
    }

    if (btnCancelEdit) {
        btnCancelEdit.addEventListener('click', () => {
            showListView();
        });
    }

    function openEditorFor(article) {
        currentEditArticle = article;
        isSlugManual = Boolean(article && article.slug);

        if (article) {
            editorHeading.textContent = 'Maqolani tahrirlash';
            editIdInput.value = article.id || article.slug;
            fTitle.value = article.title || '';
            fSlug.value = article.slug || '';
            fCategory.value = article.category || 'Intellektual mulk';
            fStandfirst.value = article.standfirst || '';
            fAuthor.value = article.author || 'ORQOYIN tahririyati';
            fDate.value = article.date || new Date().toISOString().split('T')[0];
            fReadtime.value = article.readTime || '';
            fHeroimage.value = article.heroImage || '';
            fImagecaption.value = article.imageCaption || '';
            fContent.value = article.content || '';
            fTags.value = Array.isArray(article.tags) ? article.tags.join(', ') : (article.tags || '');
            fPublished.checked = article.published !== false;
            btnDeleteArticle.style.display = 'inline-flex';
        } else {
            editorHeading.textContent = 'Yangi maqola yozish';
            editIdInput.value = '';
            fTitle.value = '';
            fSlug.value = '';
            fCategory.value = 'Intellektual mulk';
            fStandfirst.value = '';
            fAuthor.value = 'ORQOYIN tahririyati';
            fDate.value = new Date().toISOString().split('T')[0];
            fReadtime.value = '';
            fHeroimage.value = '/science/article00001/bottle.png';
            fImagecaption.value = '';
            fContent.value = '';
            fTags.value = 'Fan, Texnologiya';
            fPublished.checked = true;
            btnDeleteArticle.style.display = 'none';
        }

        showEditorView();
        updateLivePreview();
    }

    /* Auto slug generation from title */
    if (fTitle) {
        fTitle.addEventListener('input', () => {
            if (!isSlugManual) {
                fSlug.value = slugify(fTitle.value);
            }
            updateLivePreview();
        });
    }

    if (fSlug) {
        fSlug.addEventListener('input', () => {
            isSlugManual = true;
            updateLivePreview();
        });
    }

    /* All form fields trigger live preview update */
    [fCategory, fStandfirst, fAuthor, fDate, fReadtime, fHeroimage, fImagecaption, fContent, fTags].forEach(el => {
        if (el) el.addEventListener('input', updateLivePreview);
    });

    /* Image file upload to base64 or preview */
    if (btnUploadTrigger && fImageFile) {
        btnUploadTrigger.addEventListener('click', () => fImageFile.click());
        fImageFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                fHeroimage.value = event.target.result;
                updateLivePreview();
                showToast('Rasm yuklandi va biriktirildi', 'success');
            };
            reader.readAsDataURL(file);
        });
    }

    /* Toolbar Actions */
    document.querySelectorAll('.tb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            applyToolbarAction(action);
        });
    });

    function applyToolbarAction(action) {
        const textarea = fContent;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selText = textarea.value.substring(start, end);
        let replacement = '';
        let cursorOffset = 0;

        switch (action) {
            case 'h2':
                replacement = `\n## ${selText || 'Sarlavha'}\n`;
                break;
            case 'h3':
                replacement = `\n### ${selText || 'Kichik sarlavha'}\n`;
                break;
            case 'bold':
                replacement = `**${selText || 'matn'}**`;
                break;
            case 'italic':
                replacement = `*${selText || 'matn'}*`;
                break;
            case 'quote':
                replacement = `\n> ${selText || 'Iqtibos matni bu yerda'}\n`;
                break;
            case 'ul':
                replacement = `\n* ${selText || 'Birinchi band'}\n* Ikkinchi band\n`;
                break;
            case 'ol':
                replacement = `\n1. ${selText || 'Birinchi band'}\n2. Ikkinchi band\n`;
                break;
            case 'conclusion':
                replacement = `\n:::conclusion\n## Xulosa\n${selText || 'Maqolaning yakuniy xulosa matni bu yerda joylashadi.'}\n:::\n`;
                break;
            case 'link':
                replacement = `[${selText || 'Havola matni'}](https://)`;
                break;
            case 'hr':
                replacement = `\n---\n`;
                break;
            default:
                return;
        }

        textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
        textarea.focus();
        updateLivePreview();
    }

    /* View Mode Switcher */
    const vmodeBtns = document.querySelectorAll('.vmode-btn');
    vmodeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            vmodeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.getAttribute('data-mode');
            articleForm.classList.remove('split-mode', 'edit-mode', 'preview-mode');
            articleForm.classList.add(`${mode}-mode`);
        });
    });

    /* ════ 4. LIVE MARKDOWN & EDITORIAL PREVIEW ════ */

    function updateLivePreview() {
        const title = fTitle.value.trim() || 'Maqola sarlavhasi bu yerda ko‘rinadi';
        const slug = fSlug.value.trim() || 'maqola';
        const category = fCategory.value.trim() || 'Fan';
        const standfirst = fStandfirst.value.trim() || 'Qisqacha tavsif va kirish xulosasi bu yerda ko‘rinadi.';
        const author = fAuthor.value.trim() || 'ORQOYIN tahririyati';
        const date = fDate.value || new Date().toISOString().split('T')[0];
        const dateFormatted = formatDateString(date);
        const heroImg = fHeroimage.value.trim() || '/science/article00001/bottle.png';
        const heroCaption = fImagecaption.value.trim();
        const content = fContent.value;
        const tags = fTags.value.trim() || category;

        /* Word count and estimated read time */
        const words = content.trim().split(/\s+/).filter(Boolean).length;
        const readTimeCalculated = `${Math.max(1, Math.ceil(words / 160))} daqiqa öqiş`;
        const readTime = fReadtime.value.trim() || readTimeCalculated;

        /* Update preview DOM */
        if (prevCrumbSlug) prevCrumbSlug.textContent = slug;
        if (prevEyebrow) prevEyebrow.textContent = `Fan · ${category}`;
        if (prevTitle) prevTitle.textContent = title;
        if (prevStandfirst) prevStandfirst.textContent = standfirst;
        if (prevAuthor) prevAuthor.textContent = author;
        if (prevDate) prevDate.textContent = dateFormatted;
        if (prevReadtime) prevReadtime.textContent = readTime;

        if (prevHeroImg) {
            prevHeroImg.src = heroImg;
            prevHeroWrap.style.display = 'block';
        }
        if (prevHeroCaption) {
            prevHeroCaption.textContent = heroCaption;
            prevHeroCaption.style.display = heroCaption ? 'block' : 'none';
        }

        if (prevTags) prevTags.textContent = `Fan · ${tags}`;
        if (previewWordCount) previewWordCount.textContent = `${words} so‘z · ${readTime}`;

        /* Render parsed content HTML */
        if (prevBodyHtml) {
            prevBodyHtml.innerHTML = parseMarkdownToEditorialHtml(content);
        }
    }

    function parseMarkdownToEditorialHtml(md) {
        if (!md || !md.trim()) {
            return '<p class="a-lead">Maqolaning asosiy matni bu yerda haqiqiy ORQOYIN dizaynida to‘liq shakllanadi...</p>';
        }

        /* 1. Extract and process :::conclusion ... ::: blocks */
        let processed = md.replace(/:::conclusion([\s\S]*?):::/g, (match, inner) => {
            const innerHtml = parseMarkdownBlocks(inner.trim());
            return `<div class="a-conclusion reveal">${innerHtml}</div>`;
        });

        return parseMarkdownBlocks(processed, true);
    }

    function parseMarkdownBlocks(text, isMainBody = false) {
        /* Split text into blocks by double newlines */
        const blocks = text.split(/\n\n+/);
        let isFirstPara = true;

        const renderedBlocks = blocks.map(block => {
            block = block.trim();
            if (!block) return '';

            /* Raw custom HTML container */
            if (block.startsWith('<div class="a-conclusion"')) {
                return block;
            }

            /* Heading 2 */
            if (block.startsWith('## ')) {
                const hText = block.slice(3).trim();
                return `<h2>${inlineFormat(hText)}</h2>`;
            }

            /* Heading 3 */
            if (block.startsWith('### ')) {
                const hText = block.slice(4).trim();
                return `<h3>${inlineFormat(hText)}</h3>`;
            }

            /* Pull Quote */
            if (block.startsWith('> ')) {
                const qText = block.replace(/^>\s*/gm, '').trim();
                return `<blockquote class="a-pull">${inlineFormat(qText)}</blockquote>`;
            }

            /* Horizontal Rule */
            if (block === '---' || block === '***') {
                return '<hr style="border:none;border-top:1px solid var(--border);margin:40px 0;">';
            }

            /* Unordered List */
            if (/^[*+-]\s+/m.test(block)) {
                const items = block.split(/\n/).map(line => {
                    const cleanLine = line.replace(/^[*+-]\s+/, '').trim();
                    return cleanLine ? `<li>${inlineFormat(cleanLine)}</li>` : '';
                }).join('');
                return `<ul>${items}</ul>`;
            }

            /* Ordered List */
            if (/^\d+\.\s+/m.test(block)) {
                const items = block.split(/\n/).map(line => {
                    const cleanLine = line.replace(/^\d+\.\s+/, '').trim();
                    return cleanLine ? `<li>${inlineFormat(cleanLine)}</li>` : '';
                }).join('');
                return `<ol>${items}</ol>`;
            }

            /* Image paragraph */
            if (block.startsWith('![')) {
                const imgMatch = block.match(/!\[(.*?)\]\((.*?)\)/);
                if (imgMatch) {
                    return `<figure class="a-inline-img" style="margin:30px 0;"><img src="${escapeHtml(imgMatch[2])}" alt="${escapeHtml(imgMatch[1])}" style="max-width:100%;border-radius:14px;"><figcaption style="font-family:var(--mono);font-size:.68rem;color:var(--t3);margin-top:8px;">${escapeHtml(imgMatch[1])}</figcaption></figure>`;
                }
            }

            /* Regular Paragraph */
            const paraClass = (isMainBody && isFirstPara) ? 'class="a-lead"' : '';
            if (isMainBody) isFirstPara = false;

            return `<p ${paraClass}>${inlineFormat(block)}</p>`;
        });

        return renderedBlocks.join('\n');
    }

    function inlineFormat(text) {
        if (!text) return '';
        return text
            /* Bold */
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            /* Italic */
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            /* Inline code */
            .replace(/`([^`]+)`/g, '<code style="font-family:var(--mono);background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;">$1</code>')
            /* Markdown Link */
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    }

    /* ════ 5. FORM SUBMISSION: CREATE / UPDATE / DELETE ════ */

    async function handleArticleSubmit(isDraft = false) {
        const title = fTitle.value.trim();
        if (!title) {
            showToast('Iltimos, maqola sarlavhasini kiriting', 'error');
            fTitle.focus();
            return;
        }

        const id = editIdInput.value.trim();
        const isEditing = Boolean(id);
        const slug = fSlug.value.trim() || slugify(title);

        const payload = {
            id: id || undefined,
            title: title,
            slug: slug,
            category: fCategory.value.trim() || 'Fan',
            standfirst: fStandfirst.value.trim(),
            author: fAuthor.value.trim() || 'ORQOYIN tahririyati',
            date: fDate.value || new Date().toISOString().split('T')[0],
            dateFormatted: formatDateString(fDate.value),
            readTime: fReadtime.value.trim(),
            heroImage: fHeroimage.value.trim() || '/science/article00001/bottle.png',
            imageCaption: fImagecaption.value.trim(),
            content: fContent.value,
            tags: fTags.value.split(',').map(s => s.trim()).filter(Boolean),
            published: isDraft ? false : fPublished.checked
        };

        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `/api/articles?id=${encodeURIComponent(id)}` : '/api/articles';

        showToast('Maqola saqlanmoqda...', 'info');

        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (data.ok) {
                showToast(isEditing ? 'Maqola yangilandi!' : 'Yangi maqola nashr qilindi!', 'success');
                await loadArticles();
                showListView();
            } else {
                showToast(data.message || 'Xatolik yuz berdi', 'error');
            }
        } catch (err) {
            showToast('Server bilan bog‘lanishda xatolik', 'error');
        }
    }

    if (articleForm) {
        articleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleArticleSubmit(false);
        });
    }

    if (btnPublish) {
        btnPublish.addEventListener('click', () => handleArticleSubmit(false));
    }
    if (btnPublishBtm) {
        btnPublishBtm.addEventListener('click', () => handleArticleSubmit(false));
    }

    if (btnSaveDraft) {
        btnSaveDraft.addEventListener('click', () => handleArticleSubmit(true));
    }
    if (btnSaveDraftBtm) {
        btnSaveDraftBtm.addEventListener('click', () => handleArticleSubmit(true));
    }

    async function confirmDeleteArticle(id) {
        if (!confirm('Haqiqatan ham bu maqolani o‘chirmoqchimisiz?')) return;

        showToast('Maqola o‘chirilmoqda...', 'info');

        try {
            const res = await fetch(`/api/articles?id=${encodeURIComponent(id)}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${currentToken}` }
            });
            const data = await res.json();

            if (data.ok) {
                showToast('Maqola o‘chirildi', 'success');
                await loadArticles();
                if (currentEditArticle && (currentEditArticle.id === id || currentEditArticle.slug === id)) {
                    showListView();
                }
            } else {
                showToast(data.message || 'O‘chirishda xatolik', 'error');
            }
        } catch (err) {
            showToast('Server xatosi', 'error');
        }
    }

    if (btnDeleteArticle) {
        btnDeleteArticle.addEventListener('click', () => {
            const id = editIdInput.value.trim();
            if (id) confirmDeleteArticle(id);
        });
    }

    /* ════ 6. UTILITIES ════ */

    function slugify(text) {
        return String(text || '')
            .toLowerCase()
            .replace(/['"ʻʼ`]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function formatDateString(dateStr) {
        if (!dateStr) dateStr = new Date().toISOString();
        const d = new Date(dateStr);
        const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'];
        return `${d.getDate()}-${months[d.getMonth()]}, ${d.getFullYear()}`;
    }

    function escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    /* Initialize app */
    checkAuthSession();

})();
