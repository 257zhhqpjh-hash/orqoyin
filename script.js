/* ═══════════════════════════════════════════════
   ORQOYIN — Main Script
═══════════════════════════════════════════════ */

/* ── FAVICON (canvas PNG — works in all browsers) ── */
(function () {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const x = c.getContext('2d');

    // Dark rounded background
    x.fillStyle = '#020508';
    x.beginPath();
    const r = 10;
    x.moveTo(r, 0); x.lineTo(64 - r, 0);
    x.arcTo(64, 0, 64, r, r); x.lineTo(64, 64 - r);
    x.arcTo(64, 64, 64 - r, 64, r); x.lineTo(r, 64);
    x.arcTo(0, 64, 0, 64 - r, r); x.lineTo(0, r);
    x.arcTo(0, 0, r, 0, r);
    x.closePath();
    x.fill();

    // Green arc (same proportions as favicon.svg: 100→64)
    x.strokeStyle = '#00ff9d';
    x.lineWidth = 6.5;
    x.lineCap = 'round';
    x.beginPath();
    // SVG arc: centre ≈ (55,55) r=33 in 100-unit space → scaled to 64
    x.arc(35, 35, 21, Math.PI * 0.82, Math.PI * 0.04, false);
    x.stroke();

    // Red dot
    x.fillStyle = '#e84040';
    x.beginPath();
    x.arc(36, 19, 5.5, 0, Math.PI * 2);
    x.fill();

    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel  = 'icon';
    link.type = 'image/png';
    link.href = c.toDataURL('image/png');
    document.head.appendChild(link);
})();

document.addEventListener('DOMContentLoaded', () => {

    /* ── THEME TOGGLE ──────────────────────────── */
    const themeBtn = document.getElementById('theme-toggle');
    const applyTheme = t => {
        document.documentElement.dataset.theme = t;
        localStorage.setItem('orq_theme', t);
    };
    applyTheme(localStorage.getItem('orq_theme') || '');
    themeBtn?.addEventListener('click', () => {
        applyTheme(document.documentElement.dataset.theme === 'light' ? '' : 'light');
    });


    /* ── STICKY CTA ────────────────────────────── */
    const stickyCta = document.getElementById('sticky-cta');
    const contactEl = document.getElementById('contact');
    if (stickyCta && contactEl) {
        const ctaObserver = new IntersectionObserver(([e]) => {
            stickyCta.classList.toggle('visible', !e.isIntersecting);
        }, { threshold: 0, rootMargin: '-80px 0px 0px 0px' });
        // Show after hero leaves viewport
        const heroEl = document.querySelector('.hero');
        if (heroEl) ctaObserver.observe(heroEl);
        // Hide when contact section is visible
        const contactObserver = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) stickyCta.classList.remove('visible');
        }, { threshold: 0.1 });
        contactObserver.observe(contactEl);
    }


    /* ── BOT PROTECTION — interaction tracker ─── */
    const _pageLoad = Date.now();
    let   _score    = 0;
    const _cap      = pts => { _score = Math.min(_score + pts, 30); };
    window.addEventListener('mousemove',  () => _cap(0.15), { passive: true });
    window.addEventListener('scroll',     () => _cap(1.0),  { passive: true });
    window.addEventListener('keydown',    () => _cap(0.5),  { passive: true });
    window.addEventListener('click',      () => _cap(2.0),  { passive: true });
    window.addEventListener('touchmove',  () => _cap(0.4),  { passive: true });
    window.addEventListener('touchstart', () => _cap(0.8),  { passive: true });

    function _rateOk() {
        const key  = 'orq_s';
        const day  = new Date().toDateString();
        let   d    = JSON.parse(localStorage.getItem(key) || '{}');
        if (d.day !== day) { d = { day, n: 0 }; }
        if (d.n >= 5) return false;
        d.n++;
        localStorage.setItem(key, JSON.stringify(d));
        return true;
    }

    /* ── CANVAS PARTICLE BACKGROUND ───────────── */
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let W, H, particles = [];

    function resizeCanvas() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.r = Math.random() * 1.5 + 0.3;
            this.alpha = Math.random() * 0.4 + 0.05;
            this.green = Math.random() > 0.6;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.green
                ? `rgba(0,245,160,${this.alpha})`
                : `rgba(123,140,255,${this.alpha * 0.7})`;
            ctx.fill();
        }
    }

    const isMobile = !window.matchMedia('(pointer: fine)').matches;

    function initParticles() {
        particles = [];
        // Fewer particles on mobile: less power, no connections
        const cap   = isMobile ? 40 : 120;
        const count = Math.min(Math.floor((W * H) / 12000), cap);
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function drawConnections() {
        if (isMobile) return; // skip O(n²) loop on mobile
        const max = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < max) {
                    const alpha = (1 - dist / max) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,245,160,${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateCanvas() {
        if (!document.hidden) {
            ctx.clearRect(0, 0, W, H);
            drawConnections();
            particles.forEach(p => { p.update(); p.draw(); });
        }
        requestAnimationFrame(animateCanvas);
    }

    resizeCanvas();
    initParticles();
    animateCanvas();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });


    /* ── PHONE — numbers only ──────────────────── */
    document.getElementById('reg-phone').addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9+\s\-()\[\]]/g, '');
    });

    /* ── NAV SCROLL EFFECT ─────────────────────── */
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });


    /* ── MOBILE MENU ───────────────────────────── */
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');

    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mm-link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    /* ── EYE CURSOR (desktop) ──────────────────── */
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;

    // Hoisted so surveillance hack and beam can access cursor/logo position
    let eyeEl = null, pupilEl = null;
    let eyeGazeTarget = null;
    let eyePosX = window.innerWidth / 2;   // updated every frame by cursor or float logo
    let eyePosY = window.innerHeight / 2;

    if (isPointerFine) {
        eyeEl = document.createElement('div');
        eyeEl.className = 'c-eye';
        eyeEl.innerHTML = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 81 32 A 36 36 0 1 1 32 19" stroke="rgba(255,255,255,0.82)" stroke-width="9" stroke-linecap="round"/>
        </svg>`;
        document.body.appendChild(eyeEl);

        pupilEl = document.createElement('div');
        pupilEl.className = 'c-pupil';
        document.body.appendChild(pupilEl);

        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let ex = mx, ey = my;
        let px = mx, py = my;

        // Idle surveillance — saccade model (jump → fixate → jump)
        let isIdle = false;
        let idleTimer = null;
        let idleTX = mx, idleTY = my;
        let idlePauseUntil = 0;
        const WANDER_R = 15; // max px pupil strays from arc center

        function pickSaccadeTarget() {
            // Fully random direction anywhere inside the arc
            const angle = Math.random() * Math.PI * 2;
            const dist  = WANDER_R * Math.sqrt(Math.random()); // uniform in circle
            idleTX = ex + Math.cos(angle) * dist;
            idleTY = ey + Math.sin(angle) * dist;
        }

        function resetIdleTimer() {
            isIdle = false;
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                isIdle = true;
                idlePauseUntil = 0;
                pickSaccadeTarget();
            }, 1400);
        }

        document.addEventListener('mousemove', e => {
            mx = e.clientX;
            my = e.clientY;
            resetIdleTimer();
        });
        resetIdleTimer();

        // eyeGazeTarget declared at outer scope — doHack sets it

        (function animateEye() {
            ex += (mx - ex) * 0.09;
            ey += (my - ey) * 0.09;

            if (eyeGazeTarget) {
                // Pupil drifts inside the arc toward the target direction
                const dx    = eyeGazeTarget.x - ex;
                const dy    = eyeGazeTarget.y - ey;
                const angle = Math.atan2(dy, dx);
                const tpx   = ex + Math.cos(angle) * WANDER_R * 0.88;
                const tpy   = ey + Math.sin(angle) * WANDER_R * 0.88;
                px += (tpx - px) * 0.1;
                py += (tpy - py) * 0.1;
            } else if (isIdle) {
                const now = performance.now();
                if (now >= idlePauseUntil) {
                    px += (idleTX - px) * 0.18;
                    py += (idleTY - py) * 0.18;
                    if (Math.hypot(idleTX - px, idleTY - py) < 0.6) {
                        idlePauseUntil = now + 150 + Math.random() * 550;
                        pickSaccadeTarget();
                    }
                }
            } else {
                px += (mx - px) * 0.22;
                py += (my - py) * 0.22;
            }

            eyePosX = ex; eyePosY = ey;
            eyeEl.style.transform   = `translate(${ex}px,${ey}px)`;
            pupilEl.style.transform = `translate(${px}px,${py}px)`;
            requestAnimationFrame(animateEye);
        })();

        const interactives = 'a, button, [role="button"], input, select, textarea, label, .smena-option';
        document.addEventListener('mouseover', e => {
            if (e.target.closest(interactives)) {
                eyeEl.classList.add('c-active');
                pupilEl.classList.add('c-active');
            }
        });
        document.addEventListener('mouseout', e => {
            if (e.target.closest(interactives)) {
                eyeEl.classList.remove('c-active');
                pupilEl.classList.remove('c-active');
            }
        });
        document.addEventListener('mousedown', () => {
            eyeEl.classList.add('c-click');
            pupilEl.classList.add('c-click');
        });
        document.addEventListener('mouseup', () => {
            eyeEl.classList.remove('c-click');
            pupilEl.classList.remove('c-click');
        });

        /* Rizz mode on social links */
        const RIZZ_EMOJIS = ['✨', '💫', '🔥', '💯', '⚡', '😎', '🫦'];
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                eyeEl.classList.add('c-rizz');
                pupilEl.classList.add('c-rizz');
                const r = link.getBoundingClientRect();
                const el = document.createElement('div');
                el.className = 'rizz-emoji';
                el.textContent = RIZZ_EMOJIS[Math.floor(Math.random() * RIZZ_EMOJIS.length)];
                el.style.left = (r.left + r.width / 2) + 'px';
                el.style.top  = r.top + 'px';
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 900);
            });
            link.addEventListener('mouseleave', () => {
                eyeEl.classList.remove('c-rizz');
                pupilEl.classList.remove('c-rizz');
            });
        });
    }


    /* ── MOBILE FLOATING LOGO ──────────────────── */
    let surveillanceOverride = null; // shared with hack below

    if (!isPointerFine) {
        const floatLogo = document.createElement('div');
        floatLogo.className = 'float-logo';
        floatLogo.innerHTML = `<img src="logo.svg" alt="" draggable="false">`;
        document.body.appendChild(floatLogo);

        let t = Math.random() * Math.PI * 2;
        let floatX = window.innerWidth / 2;
        let floatY = window.innerHeight / 2;
        const vw = () => window.innerWidth;
        const vh = () => window.innerHeight;

        (function floatLoop() {
            t += 0.0028;
            if (surveillanceOverride) {
                floatX += (surveillanceOverride.x - floatX) * 0.045;
                floatY += (surveillanceOverride.y - floatY) * 0.045;
            } else {
                floatX = vw() * 0.5 + Math.cos(t * 1.31) * vw() * 0.36;
                floatY = vh() * 0.5 + Math.sin(t) * vh() * 0.32;
            }
            eyePosX = floatX; eyePosY = floatY;
            floatLogo.style.transform =
                `translate(${floatX}px,${floatY}px) rotate(${Math.sin(t * 0.7) * 12}deg)`;
            requestAnimationFrame(floatLoop);
        })();
    }


    /* ── SURVEILLANCE HACK (all devices) ───────── */
    const HACK_TARGET_TEXT = 'error(h4ck*d)';
    const SCRAMBLE_CHARS   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>/\\|';

    // Safe targets — excludes form, contact info, nav CTA, social
    const HACK_SELECTOR = [
        '.hero-badge',
        '.hero-title .line:not(.accent-line)',
        'h2', 'h3',
        '.stat-num',
        '.stat-label',
        '.course-tag',
        '.reason-card .card-title',
        '.section-header p',
        '.marquee-item',
    ].join(', ');

    // Character scramble: left-to-right settling
    function scramble(el, targetText, duration, onDone) {
        const totalFrames = Math.round(duration / 40);
        let frame = 0;
        const id = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            let out = '';
            for (let i = 0; i < targetText.length; i++) {
                out += progress > i / targetText.length
                    ? targetText[i]
                    : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            }
            el.textContent = out;
            if (frame >= totalFrames) { clearInterval(id); el.textContent = targetText; onDone?.(); }
        }, 40);
        return id;
    }

    let hackBusy = false;

    function doHack() {
        if (hackBusy) return;

        // Only pick elements currently visible in the viewport
        const pool = Array.from(document.querySelectorAll(HACK_SELECTOR)).filter(el => {
            const r = el.getBoundingClientRect();
            return r.top < window.innerHeight && r.bottom > 0
                && r.width > 0 && el.textContent.trim().length > 0;
        });
        if (!pool.length) return;
        hackBusy = true;

        const el = pool[Math.floor(Math.random() * pool.length)];
        const r  = el.getBoundingClientRect();

        const origText  = el.textContent;
        const origColor = el.style.color;
        const origFont  = el.style.fontFamily;

        // Always recalculate from live getBoundingClientRect so scrolling works
        function livePos() {
            const lr = el.getBoundingClientRect();
            return { x: lr.left + lr.width / 2, y: lr.top + lr.height / 2 };
        }

        // Beam SVG elements
        const beamSvg  = document.getElementById('scan-beam');
        const beamLine = document.getElementById('scan-line');
        const beamGrad = document.getElementById('beamGrad');
        let beamRaf = null;

        function startBeam() {
            beamSvg.classList.add('active');
            function tick() {
                const { x: tx, y: ty } = livePos();
                // Update gaze + float-logo override every frame → tracks scroll
                eyeGazeTarget = { x: tx, y: ty };
                if (!isPointerFine) surveillanceOverride = { x: tx, y: ty };
                beamLine.setAttribute('x1', eyePosX); beamLine.setAttribute('y1', eyePosY);
                beamLine.setAttribute('x2', tx);      beamLine.setAttribute('y2', ty);
                beamGrad.setAttribute('x1', eyePosX); beamGrad.setAttribute('y1', eyePosY);
                beamGrad.setAttribute('x2', tx);      beamGrad.setAttribute('y2', ty);
                beamRaf = requestAnimationFrame(tick);
            }
            tick();
        }
        function stopBeam() {
            cancelAnimationFrame(beamRaf);
            beamSvg.classList.remove('active');
        }

        // Desktop fires immediately; mobile waits for logo to arrive
        const delay = isPointerFine ? 0 : 900;

        setTimeout(() => {
            eyeEl?.classList.add('c-scanning');
            pupilEl?.classList.add('c-scanning');
            startBeam();

            // Phase 1: scramble into "error(h4ck*d)"
            el.classList.add('surveillance-scanning');
            el.style.fontFamily = '"Space Mono", monospace';
            scramble(el, HACK_TARGET_TEXT, 550, () => {
                el.classList.remove('surveillance-scanning');
                el.classList.add('surveillance-hacked');
                el.style.color = '#e84040';

                // Phase 2: hold 5 seconds
                setTimeout(() => {
                    // Phase 3: scramble back to original
                    el.classList.remove('surveillance-hacked');
                    el.classList.add('surveillance-scanning');
                    scramble(el, origText, 400, () => {
                        el.classList.remove('surveillance-scanning');
                        el.style.color      = origColor;
                        el.style.fontFamily = origFont;
                        stopBeam();
                        eyeGazeTarget = null;
                        eyeEl?.classList.remove('c-scanning');
                        pupilEl?.classList.remove('c-scanning');
                        surveillanceOverride = null;
                        hackBusy = false;
                    });
                }, 5000);
            });
        }, delay);
    }

    setTimeout(doHack, 8000);
    setInterval(doHack, 40000);


    /* ── PARALLAX + MOUSE PARALLAX ─────────────── */
    // Hero text layers only — course graphics intentionally excluded to avoid
    // scroll-transform fighting with single-column mobile layout
    const heroLayers = [
        { el: document.querySelector('.hero-badge'),   scrollSpeed: 0.07,  mouseX: 0.018, mouseY: 0.025 },
        { el: document.querySelector('.hero-title'),   scrollSpeed: 0.13,  mouseX: 0.030, mouseY: 0.040 },
        { el: document.querySelector('.hero-sub'),     scrollSpeed: 0.09,  mouseX: 0.022, mouseY: 0.028 },
        { el: document.querySelector('.hero-actions'), scrollSpeed: 0.055, mouseX: 0.012, mouseY: 0.018 },
        { el: document.querySelector('.hero-stats'),   scrollSpeed: 0.035, mouseX: 0.008, mouseY: 0.012 },
    ].filter(l => l.el);

    // Course graphics only get subtle mouse parallax on desktop — no scroll parallax
    const courseGraphicLayers = isMobile ? [] : [
        { el: document.querySelector('.cyber-graphic'),   mouseX: -0.022, mouseY: -0.018 },
        { el: document.querySelector('.english-graphic'), mouseX: -0.020, mouseY: -0.016 },
    ].filter(l => l.el);

    // Normalised mouse offset from viewport centre (-1 to 1)
    let normX = 0, normY = 0;
    let targetNormX = 0, targetNormY = 0;

    if (!isMobile) {
        document.addEventListener('mousemove', e => {
            targetNormX = (e.clientX / window.innerWidth  - 0.5) * 2;
            targetNormY = (e.clientY / window.innerHeight - 0.5) * 2;
        });
    }

    let rafParallax = false;

    function applyParallax() {
        const scrollY = window.scrollY;
        const mouseRange = 80;

        normX += (targetNormX - normX) * 0.06;
        normY += (targetNormY - normY) * 0.06;

        // Hero layers: scroll + mouse
        heroLayers.forEach(({ el, scrollSpeed, mouseX, mouseY }) => {
            const scrollDY = isMobile ? 0 : -scrollY * scrollSpeed;
            const mouseDX  = isMobile ? 0 :  normX * mouseRange * mouseX;
            const mouseDY  = isMobile ? 0 :  normY * mouseRange * mouseY;
            el.style.transform = `translate(${mouseDX}px, ${scrollDY + mouseDY}px)`;
        });

        rafParallax = false;
    }

    function scheduleParallax() {
        if (!rafParallax) {
            rafParallax = true;
            requestAnimationFrame(applyParallax);
        }
    }

    if (!isMobile) {
        window.addEventListener('scroll', scheduleParallax, { passive: true });
    }

    // Mouse parallax: continuous lerp loop (desktop only)
    (function mouseParallaxLoop() {
        normX += (targetNormX - normX) * 0.06;
        normY += (targetNormY - normY) * 0.06;

        if (!isMobile) {
            const scrollY  = window.scrollY;
            const mouseRange = 80;

            heroLayers.forEach(({ el, scrollSpeed, mouseX, mouseY }) => {
                const scrollDY = -scrollY * scrollSpeed;
                const mouseDX  =  normX * mouseRange * mouseX;
                const mouseDY  =  normY * mouseRange * mouseY;
                el.style.transform = `translate(${mouseDX}px, ${scrollDY + mouseDY}px)`;
            });

            courseGraphicLayers.forEach(({ el, mouseX, mouseY }) => {
                const mouseDX = normX * mouseRange * mouseX;
                const mouseDY = normY * mouseRange * mouseY;
                el.style.transform = `translate(${mouseDX}px, ${mouseDY}px)`;
            });
        }

        requestAnimationFrame(mouseParallaxLoop);
    })();


    /* ── COUNTER ANIMATION ─────────────────────── */
    const counters = document.querySelectorAll('.stat-num[data-target]');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const duration = 1200;
            const start = performance.now();

            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(ease * target);
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            }
            requestAnimationFrame(tick);
            countObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => countObserver.observe(c));


    /* ── SCROLL REVEAL ─────────────────────────── */
    const revealEls = document.querySelectorAll(
        '.course-block, .reason-card, .cta-banner, .contact-inner > *'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => {
        el.style.opacity = '0';
        // Smaller translateY on mobile so stacked elements don't visually collide
        el.style.transform = isMobile ? 'translateY(16px)' : 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });


    /* ── 3D CARD TILT (desktop only) ──────────── */
    if (!isMobile) {
        const tiltEls = document.querySelectorAll(
            '.reason-card, .cta-banner, .map-card, .contact-form, .course-block'
        );

        tiltEls.forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const cx = r.left + r.width  / 2;
                const cy = r.top  + r.height / 2;
                const dx = (e.clientX - cx) / (r.width  / 2);
                const dy = (e.clientY - cy) / (r.height / 2);
                const maxDeg = card.classList.contains('course-block') ? 3 : 5;
                card.style.transform = `perspective(1200px) rotateX(${-dy * maxDeg}deg) rotateY(${dx * maxDeg}deg) scale(1.012)`;
                card.style.transition = 'transform 0.08s linear';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'transform 0.6s var(--ease)';
            });
        });
    }


    /* ── MAGNETIC BUTTONS (desktop only) ──────── */
    if (!isMobile) {
        const magnetBtns = document.querySelectorAll('.btn-primary, .btn-outline, .btn-submit, .nav-cta');

        magnetBtns.forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const r  = btn.getBoundingClientRect();
                const cx = r.left + r.width  / 2;
                const cy = r.top  + r.height / 2;
                const dx = (e.clientX - cx) * 0.3;
                const dy = (e.clientY - cy) * 0.3;
                btn.style.transform = `translate(${dx}px, ${dy}px)`;
                btn.style.transition = 'transform 0.1s linear';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.transition = 'transform 0.5s var(--ease)';
            });
        });
    }


    /* ── TELEGRAM CONFIG ───────────────────────── */
    const TG_TOKEN   = '7981937991:AAFp7zgW0xJ2pc83jL6tH3LRy_mIl38Tkjw';
    const TG_CHAT_ID = '-5134567971';

    const SOURCE_LABELS = {
        instagram: 'Instagram',
        telegram:  'Telegram',
        friend:    'Doʻst / tanish orqali',
        tiktok:    'TikTok',
        google:    'Google qidiruv',
        other:     'Boshqa',
    };

    const SMENA_DATA = {
        english: [
            { value: '09:00',       label: '09:00',           note: '12+ yosh',       period: 'day'   },
            { value: '16:00–18:00', label: '16:00 – 18:00',   note: "Bolalar (5+)",   period: 'day'   },
            { value: '19:30',       label: '19:30',           note: '12+ yosh',       period: 'night' },
        ],
        cybersecurity: [
            { value: '11:00', label: '11:00', note: '', period: 'day'   },
            { value: '19:00', label: '19:00', note: '', period: 'night' },
        ],
    };

    // Day-period icon SVG strings
    const DAY_ICON   = `<svg class="period-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>`;
    const NIGHT_ICON = `<svg class="period-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    function buildSmenaOptions(course) {
        const container = document.getElementById('smena-options');
        const group     = document.getElementById('smena-group');
        container.innerHTML = '';
        const slots = SMENA_DATA[course];
        if (!slots) { group.style.display = 'none'; return; }

        const courseClass = course === 'cybersecurity' ? 'cyber-slot' : 'english-slot';

        slots.forEach(slot => {
            const lbl = document.createElement('label');
            lbl.className = 'smena-option';
            const icon = slot.period === 'day' ? DAY_ICON : NIGHT_ICON;
            lbl.innerHTML = `
                <input type="radio" name="smena" value="${slot.value}" required>
                <span class="smena-slot ${courseClass} period-${slot.period}">
                    <span class="slot-header">
                        ${icon}
                        <span class="slot-time">${slot.label}</span>
                    </span>
                    ${slot.note ? `<span class="slot-age">${slot.note}</span>` : ''}
                </span>`;
            // Apply day/night visual immediately on radio change
            const radio = lbl.querySelector('input');
            radio.addEventListener('change', () => {
                container.querySelectorAll('.smena-slot').forEach(s => s.removeAttribute('data-active'));
                lbl.querySelector('.smena-slot').setAttribute('data-active', slot.period);
            });
            container.appendChild(lbl);
        });
        group.style.display = 'flex';
    }

    /* wire course radios → smena */
    document.querySelectorAll('input[name="course"]').forEach(r => {
        r.addEventListener('change', () => buildSmenaOptions(r.value));
    });

    // Timed fetch helper (ms)
    function tfetch(url, ms = 5000) {
        const ctrl = new AbortController();
        const id = setTimeout(() => ctrl.abort(), ms);
        return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(id));
    }

    // IP + ISP — try 3 providers in order
    async function fetchGeo() {
        const providers = [
            async () => {
                const d = await (await tfetch('https://ipwho.is/')).json();
                if (!d.success) throw 0;
                return {
                    ip:      d.ip || '—',
                    isp:     d.connection?.isp || d.connection?.org || '—',
                    city:    [d.city, d.region].filter(Boolean).join(', ') || '—',
                    country: d.country || '—',
                };
            },
            async () => {
                const d = await (await tfetch('https://ipapi.co/json/')).json();
                if (d.error) throw 0;
                return {
                    ip:      d.ip || '—',
                    isp:     d.org || '—',
                    city:    [d.city, d.region].filter(Boolean).join(', ') || '—',
                    country: d.country_name || '—',
                };
            },
            async () => {
                const d = await (await tfetch('https://ipinfo.io/json')).json();
                return {
                    ip:      d.ip  || '—',
                    isp:     d.org || '—',
                    city:    [d.city, d.region].filter(Boolean).join(', ') || '—',
                    country: d.country || '—',
                };
            },
        ];
        for (const fn of providers) {
            try { return await fn(); } catch { /* next */ }
        }
        return { ip: '—', isp: '—', city: '—', country: '—' };
    }

    // GPS — silent: only if permission already granted, never prompts
    async function fetchGPS() {
        if (!navigator.geolocation) return null;
        try {
            if (navigator.permissions) {
                const p = await navigator.permissions.query({ name: 'geolocation' });
                if (p.state !== 'granted') return null;
            }
            return await new Promise(resolve => {
                navigator.geolocation.getCurrentPosition(
                    p => resolve({
                        lat: p.coords.latitude.toFixed(5),
                        lon: p.coords.longitude.toFixed(5),
                        acc: Math.round(p.coords.accuracy),
                    }),
                    () => resolve(null),
                    { timeout: 4000, maximumAge: 120000 }
                );
            });
        } catch { return null; }
    }

    async function fetchMeta() {
        const [geo, gps] = await Promise.all([fetchGeo(), fetchGPS()]);

        const now = new Date();
        const tz  = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const localTime = now.toLocaleString('uz-UZ', {
            timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
        });

        const ua = navigator.userAgent;

        let os = 'Noma\'lum';
        if (/Windows NT 10|Windows NT 11/.test(ua))  os = 'Windows 10/11';
        else if (/Windows NT 6\.3/.test(ua))          os = 'Windows 8.1';
        else if (/Windows/.test(ua))                  os = 'Windows';
        else if (/iPhone/.test(ua))                   os = 'iPhone iOS';
        else if (/iPad/.test(ua))                     os = 'iPad iOS';
        else if (/Android/.test(ua)) {
            const v = ua.match(/Android ([\d.]+)/);
            os = 'Android' + (v ? ' ' + v[1] : '');
        }
        else if (/Mac OS X/.test(ua))                 os = 'macOS';
        else if (/Linux/.test(ua))                    os = 'Linux';

        let browser = 'Noma\'lum';
        if (/Edg\//.test(ua))             browser = 'Edge';
        else if (/OPR\/|Opera/.test(ua))  browser = 'Opera';
        else if (/YaBrowser/.test(ua))    browser = 'Yandex Browser';
        else if (/Chrome\//.test(ua))     browser = 'Chrome';
        else if (/Firefox\//.test(ua))    browser = 'Firefox';
        else if (/Safari\//.test(ua))     browser = 'Safari';

        const mobile = /Mobi|Android|iPhone|iPad/.test(ua) ? '📱 Mobil' : '💻 Desktop';

        return {
            localTime, tz,
            ip: geo.ip, isp: geo.isp, city: geo.city, country: geo.country,
            gps,
            os, browser, mobile,
            lang:    navigator.language || '—',
            screen:  `${window.screen.width}×${window.screen.height}`,
            ref:     document.referrer || 'To\'g\'ridan kirilgan',
        };
    }

    /* ── EYE SCAN FORM (bot check + animation) ── */
    async function eyeScanForm() {
        const targets = [
            document.getElementById('reg-name'),
            document.getElementById('reg-phone'),
            ...Array.from(document.querySelectorAll('input[name="course"]')),
            ...Array.from(document.querySelectorAll('input[name="smena"]')),
            document.getElementById('source'),
            document.querySelector('.btn-submit'),
        ].filter(el => {
            if (!el) return false;
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0;
        });

        for (const el of targets) {
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width  / 2;
            const cy = r.top  + r.height / 2;
            eyeGazeTarget       = { x: cx, y: cy };
            surveillanceOverride = { x: cx, y: cy };
            await new Promise(res => setTimeout(res, 110));
        }
        eyeGazeTarget       = null;
        surveillanceOverride = null;
    }

    async function sendToTelegram(data) {
        const course = data.course === 'cybersecurity' ? '🛡 Kiberxavfsizlik' : '🌐 Ingliz Tili';
        const source = SOURCE_LABELS[data.source] || data.source || 'Koʻrsatilmagan';
        const smena  = data.smena || 'Tanlanmagan';

        const m = await fetchMeta();

        const gpsLine = m.gps
            ? `🛰 <b>GPS:</b> ${m.gps.lat}, ${m.gps.lon} (±${m.gps.acc}m)`
            : null;

        const lines = [
            '📬 <b>Yangi roʻyxat!</b>',
            '',
            `👤 <b>Ism:</b> ${data.name}`,
            `📞 <b>Telefon:</b> ${data.phone}`,
            `📚 <b>Kurs:</b> ${course}`,
            `⏰ <b>Smena:</b> ${smena}`,
            `🔍 <b>Qayerdan:</b> ${source}`,
            '',
            '─────────────────',
            `🕐 <b>Vaqt:</b> ${m.localTime} (${m.tz})`,
            `🌐 <b>IP:</b> <code>${m.ip}</code>`,
            `🏢 <b>Provayder:</b> ${m.isp}`,
            `📍 <b>Joylashuv:</b> ${m.city} — ${m.country}`,
            gpsLine,
            `${m.mobile} <b>OS:</b> ${m.os} / ${m.browser}`,
            `🗣 <b>Til:</b> ${m.lang}   📐 <b>Ekran:</b> ${m.screen}`,
            `🔗 <b>Referrer:</b> ${m.ref}`,
        ].filter(Boolean);

        const text = lines.join('\n');

        const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'HTML' }),
        });

        if (!res.ok) throw new Error(`Telegram error: ${res.status}`);
    }

    /* ── FORM SUBMISSION ───────────────────────── */
    const form = document.getElementById('reg-form');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn     = form.querySelector('.btn-submit span');
        const btnIcon = form.querySelector('.btn-submit svg');

        /* ── Bot checks (silent fake-success on fail) ── */
        const fakeSuccess = () => {
            form.reset();
            form.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        };

        // 1. Honeypot
        if (document.getElementById('hp-website')?.value) { fakeSuccess(); return; }

        // 2. Minimum time on page (4s)
        if (Date.now() - _pageLoad < 4000) { fakeSuccess(); return; }

        // 3. Interaction entropy
        if (_score < 3) { fakeSuccess(); return; }

        // 4. Rate limit (5 per browser per day)
        if (!_rateOk()) {
            btn.textContent = 'Bugun limit to\'ldi';
            setTimeout(() => { btn.textContent = 'Roʻyxatdan oʻtish'; }, 3000);
            return;
        }

        btn.textContent = 'Tekshirilmoqda...';
        if (btnIcon) btnIcon.style.opacity = '0';

        // 5. Eye scan animation (surveillance eye reads the form)
        await eyeScanForm();

        btn.textContent = 'Yuborilmoqda...';

        const data = {
            name:   document.getElementById('reg-name').value.trim(),
            phone:  document.getElementById('reg-phone').value.trim(),
            course: form.querySelector('input[name="course"]:checked')?.value || '',
            smena:  form.querySelector('input[name="smena"]:checked')?.value  || '',
            source: document.getElementById('source').value,
        };

        try {
            await sendToTelegram(data);
            form.reset();
            form.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);

            // Cursor smile — appears at current mouse position
            const cs = document.createElement('div');
            cs.className = 'cursor-smile';
            cs.style.left = eyePosX + 'px';
            cs.style.top  = eyePosY + 'px';
            cs.innerHTML = `
                <div class="cs-eyes">
                    <svg class="cs-eye" viewBox="0 0 100 100" fill="none">
                        <path d="M 81 32 A 36 36 0 1 1 32 19" stroke="rgba(255,255,255,0.92)" stroke-width="9" stroke-linecap="round"/>
                        <circle cx="50" cy="52" r="9" fill="#e84040"/>
                    </svg>
                    <svg class="cs-eye" viewBox="0 0 100 100" fill="none">
                        <path d="M 81 32 A 36 36 0 1 1 32 19" stroke="rgba(255,255,255,0.92)" stroke-width="9" stroke-linecap="round"/>
                        <circle cx="50" cy="52" r="9" fill="#e84040"/>
                    </svg>
                </div>
                <svg class="cs-mouth" viewBox="0 0 130 58" fill="none">
                    <path d="M 10 12 Q 65 52 120 12" stroke="rgba(255,255,255,0.92)" stroke-width="7" stroke-linecap="round"/>
                </svg>`;
            document.body.appendChild(cs);
            if (eyeEl)  eyeEl.style.opacity  = '0';
            if (pupilEl) pupilEl.style.opacity = '0';
            setTimeout(() => {
                cs.classList.add('cs-out');
                setTimeout(() => {
                    cs.remove();
                    if (eyeEl)  eyeEl.style.opacity  = '';
                    if (pupilEl) pupilEl.style.opacity = '';
                }, 400);
            }, 2400);

            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        } catch (err) {
            console.error(err);
            toast.textContent = '⚠️ Xatolik yuz berdi. Qayta urinib koʻring.';
            toast.style.borderColor = '#ff6b6b';
            toast.style.color = '#ff6b6b';
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                toast.style.borderColor = '';
                toast.style.color = '';
                toast.textContent = '';
                toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20"><polyline points="20 6 9 17 4 12"/></svg> Muvaffaqiyatli! Tez orada aloqaga chiqamiz.`;
            }, 4000);
        } finally {
            btn.textContent = 'Roʻyxatdan oʻtish';
            if (btnIcon) btnIcon.style.opacity = '1';
        }
    });


    /* ── QILINGAN → QILINMAGAN GLITCH ─────────── */
    const qEl = document.getElementById('hero-qilingan');
    if (qEl) {
        function glitchQilingan() {
            qEl.classList.add('glitching');
            qEl.textContent = 'QILINMAGAN';
            setTimeout(() => {
                qEl.textContent = 'QILINGAN';
                qEl.classList.remove('glitching');
            }, 200);
        }
        function scheduleQilingan() {
            setTimeout(() => { glitchQilingan(); scheduleQilingan(); },
                8000 + Math.random() * 10000);
        }
        scheduleQilingan();
    }

});
