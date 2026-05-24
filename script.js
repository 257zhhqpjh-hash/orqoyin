/* ═══════════════════════════════════════════════════
   ORQOYIN — Script (UZ/TM Bilingual)
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────────────
       1. TRANSLATIONS
    ───────────────────────────────────────────────── */
    const T = {
        uz: {
            nav_register:       "Ro'yxatdan o'tish",
            nav_courses:        "Kurslar",
            nav_about:          "Akademiya",
            hero_badge:         "Urganch — Raqamli Akademiya",
            hero_line1:         "KELAJAK",
            hero_line2:         "HIMOYA",
            hero_line3:         "QILINGAN",
            hero_sub:           "Kiberxavfsizlik. Ingliz tili. Bir joyda.\nUrganch shahridagi birinchi ixtisoslashgan akademiya.",
            hero_btn_courses:   "Kurslarni ko'rish",
            hero_btn_about:     "Akademiya haqida",
            stat_directions:    "Yo'nalish",
            stat_free:          "Bepul kurs",
            stat_unique:        "Yagona",
            stat_unique_sub:    "Viloyatda",
            stat_hours:         "Har kuni ochiq",
            scroll_down:        "Pastga",
            courses_title:      "Ikki kuch.\nCheksiz imkoniyat.",
            cyber_tag:          "KIBERXAVFSIZLIK",
            cyber_title:        "Kiberxavfsizlik",
            cyber_desc:         "Axloqiy hakerlik, tarmoq himoyasi va raqamli tekshiruv — haqiqiy laboratoriyalarda, real tajriba.",
            cyber_t1:           "Tarmoq xavfsizligi va axloqiy hakerlik",
            cyber_t2:           "Tizimga kirib tekshirish va CTF",
            cyber_t3:           "Linux tizimi va buyruq satri",
            cyber_t4:           "Zararli dastur tahlili va raqamli tekshiruv",
            cyber_t5:           "OSCP/CPTS sertifikat tayyorlovi",
            cyber_dur:          "1 yil",
            cyber_days:         "Hafta 4 kun",
            cyber_lab:          "Amaliy lab",
            cyber_morning:      "Sabahgi guruh",
            cyber_evening:      "Kechki guruh",
            cyber_float:        "HIMOYALANGAN",
            eng_tag:            "INGLIZ TILI",
            eng_title:          "Ingliz Tili",
            eng_desc:           "A1 dan C1 gacha — grammatika, nutq, IELTS va SAT tayyorlovi. Bolalar uchun maxsus 5+ guruh.",
            eng_t1:             "Boshlang'ich ingliz tili asoslari",
            eng_t2:             "Grammatika va so'z boyligi",
            eng_t3:             "Tinglash va o'qib tushunish",
            eng_t4:             "Yozma va og'zaki nutq",
            eng_t5:             "IELTS/SAT tayyorlovi",
            eng_adult:          "12+ yosh",
            eng_kids:           "Bolalar 5–12",
            eng_days4:          "Hafta 4 kun",
            eng_days5:          "Hafta 5 kun",
            eng_play:           "O'yin orqali",
            free_label:         "BEPUL KURSLAR",
            free_badge:         "BEPUL",
            ielts_title:        "Bepul IELTS Tayyorlovi",
            sat_title:          "Bepul SAT Tayyorlovi",
            day_fri:            "Juma",
            day_sat:            "Shanba",
            day_sun:            "Yakshanba",
            day_fri_short:      "Jum",
            day_sat_short:      "Sha",
            day_sun_short:      "Yak",
            free_reg_note:      "Markazga kelib ro'yxatdan o'ting. To'lov yo'q.",
            free_join:          "Qo'shilish",
            why_title:          "Nega",
            why_desc:           "Xorazm viloyatida kiberxavfsizlik bo'yicha birinchi va yagona ixtisoslashgan markaz. Biz ikkita sohani o'rgatamiz — jahon darajasida.",
            reason1_title:      "Viloyatda yagona",
            reason1_desc:       "Xorazm viloyatida kiberxavfsizlik bo'yicha birinchi va yagona ixtisoslashgan markaz.",
            reason2_title:      "Ikki kurs, bir joy",
            reason2_desc:       "Kiberxavfsizlik + ingliz tili — texnik bilim va muloqot ko'nikmasi bir kompleksda.",
            reason3_title:      "Haqiqiy laboratoriya",
            reason3_desc:       "Ommaviy ma'ruzalar emas — 6 Mac Mini, real CTF va amaliy loyihalar.",
            reason4_title:      "Chuqur bilim",
            reason4_desc:       "Sertifikat uchun emas — bilim uchun. Mustaqil fikrlash va real muammolarni hal etish.",
            amen_hours:         "Dush–Payshanba rasmiy. Juma–Yakshanba — to'garaklar va erkin vaqt.",
            amen_internet:      "Bepul internet",
            amen_internet_desc: "Barcha talabalar uchun tezkor tarmoq.",
            amen_coffee:        "Qahva va choy",
            amen_coffee_desc:   "Bepul. Har kuni.",
            amen_mac:           "Dars bo'lmagan vaqtda ham foydalanish mumkin.",
            amen_server:        "Shaxsiy server",
            amen_server_desc:   "Ma'lumotlar uchinchi tomon serverlariga yuborilmaydi.",
            amen_workspace:     "Ochiq ish joyi",
            amen_workspace_desc:"Uyga vazifa, ijodiy va shaxsiy loyiha ishlari uchun.",
            cta_sub:            "Birinchi qadam eng muhim",
            cta_title:          "Tayyormisiz?",
            cta_note:           "Joylar cheklangan. Hoziroq ro'yxatdan o'ting.",
            cta_register:       "Ro'yxatdan o'ting →",
            cta_or:             "yoki",
            contact_label:      "RO'YXAT",
            contact_title:      "Qo'shiling.",
            contact_desc:       "Bepul maslahat uchun ma'lumotlaringizni qoldiring. 24 soat ichida bog'lanamiz.",
            contact_map_link:   "Urganch — Xaritada ko'rish ↗",
            form_name:          "Ism va Familiya",
            form_name_ph:       "To'liq ismingiz",
            form_phone:         "Telefon raqam",
            form_course:        "Kurs tanlang",
            form_time:          "Dars vaqtini tanlang",
            form_source:        "Bizni qayerdan topdingiz?",
            form_source_ph:     "— Tanlang —",
            form_source_friend: "Do'st / tanish orqali",
            form_source_other:  "Boshqa",
            map_label:          "JOYLASHUV",
            map_title:          "Bizni toping.",
            map_desc:           "Urganch — Xorazm viloyatining yagona kiberxavfsizlik akademiyasi.",
            map_btn:            "Google Xaritada ochish",
            clubs_label:        "BEPUL TO'GARAKLAR",
            clubs_title_pre:    "Hafta oxiri",
            clubs_title_free:   "bepul.",
            clubs_desc:         "Juma, shanba va yakshanba — rasmiy dars yo'q. Bu kunlar IELTS va SAT to'garaklari, tarmoq qurishish va hamkasblar bilan bilim almashinuvi uchun. Ro'yxat kerak — lekin onlayn emas. Markazga kelib yozilasiz. To'lov yo'q.",
            footer_tagline:     "Urganch — Xorazm viloyatining kiberxavfsizlik akademiyasi",
            footer_rights:      "Barcha huquqlar himoyalangan.",
            garaoy_desc:        "Orqoyin jamoasining yangi platformasi — Linux, Android va macOS uchun",
            coming_soon:        "Tez orada",
            toast_success:      "Muvaffaqiyatli! Tez orada bog'lanamiz.",
        },
        tm: {
            nav_register:       "Hasaba durmak",
            nav_courses:        "Kurslar",
            nav_about:          "Akademiýa",
            hero_badge:         "Örgeniç — Sanly Akademiýa",
            hero_line1:         "GELJEK",
            hero_line2:         "GORAGLY",
            hero_line3:         "BOLSUN",
            hero_sub:           "Kiberhowpsuzlyk. Iňlis dili. Bir ýerde.\nÖrgeniçdäki ilkinji ýöriteleşdirilen akademiýa.",
            hero_btn_courses:   "Kurslary görmek",
            hero_btn_about:     "Akademiýa hakda",
            stat_directions:    "Ugur",
            stat_free:          "Mugt kurs",
            stat_unique:        "Ýeke-täk",
            stat_unique_sub:    "Welaýatda",
            stat_hours:         "Her gün açyk",
            scroll_down:        "Aşak",
            courses_title:      "Iki güýç.\nÇäksiz mümkinçilik.",
            cyber_tag:          "KIBERHOWPSUZLYK",
            cyber_title:        "Kiberhowpsuzlyk",
            cyber_desc:         "Etik hakerlik, ulgam goragy we sanly barlag — hakyky laboratoriýalarda, real tejribe.",
            cyber_t1:           "Ulgam howpsuzlygy we etik hakerlyk",
            cyber_t2:           "Ulgama aralaşmak we CTF",
            cyber_t3:           "Linux ulgamy we buýruk setiri",
            cyber_t4:           "Zyýanly programma derňewi we sanly barlag",
            cyber_t5:           "OSCP/CPTS şahadatnama taýýarlygy",
            cyber_dur:          "1 ýyl",
            cyber_days:         "Hepde 4 gün",
            cyber_lab:          "Amaly lab",
            cyber_morning:      "Irki topar",
            cyber_evening:      "Agşam topary",
            cyber_float:        "GORAGLY",
            eng_tag:            "IŇLIS DILI",
            eng_title:          "Iňlis Dili",
            eng_desc:           "A1-den C1-e — grammatika, söhbet, IELTS we SAT. Çagalar üçin aýratyn 5+ topar.",
            eng_t1:             "Esasy iňlis dili",
            eng_t2:             "Grammatika we söz baýlygy",
            eng_t3:             "Diňlemek we okamak",
            eng_t4:             "Ýazuw we sözleýiş",
            eng_t5:             "IELTS/SAT taýýarlygy",
            eng_adult:          "12+ ýaş",
            eng_kids:           "Çagalar 5–12",
            eng_days4:          "Hepde 4 gün",
            eng_days5:          "Hepde 5 gün",
            eng_play:           "Oýun arkaly",
            free_label:         "MUGT KURSLAR",
            free_badge:         "MUGT",
            ielts_title:        "Mugt IELTS Taýýarlygy",
            sat_title:          "Mugt SAT Taýýarlygy",
            day_fri:            "Anna",
            day_sat:            "Şenbe",
            day_sun:            "Ýekşenbe",
            day_fri_short:      "Ann",
            day_sat_short:      "Şen",
            day_sun_short:      "Ýek",
            free_reg_note:      "Merkeze gelip hasaba duruň. Töleg ýok.",
            free_join:          "Goşulmak",
            why_title:          "Näme üçin",
            why_desc:           "Horezm welaýatynda kiberhowpsuzlyk boýunça ilkinji we ýeke-täk ýöriteleşdirilen merkez. Biz iki ugry öwredýäris — dünýä derejesinde.",
            reason1_title:      "Welaýatda ýeke-täk",
            reason1_desc:       "Horezm welaýatynda kiberhowpsuzlyk boýunça ilkinji we ýeke-täk ýöriteleşdirilen merkez.",
            reason2_title:      "Iki kurs, bir ýer",
            reason2_desc:       "Kiberhowpsuzlyk + iňlis dili — tehniki bilim we aragatnaşyk endigi bir toplumda.",
            reason3_title:      "Hakyky laboratoriýa",
            reason3_desc:       "Köpçülikleýin leksiýalar däl — 6 Mac Mini, real CTF we amaly taslamalar.",
            reason4_title:      "Çuňňur bilim",
            reason4_desc:       "Şahadatnama üçin däl — bilim üçin. Garaşsyz pikirlenmek we real meseleleri çözmek.",
            amen_hours:         "Duş–Penş resmi. Anna–Ýekşenbe — toparlar we erkin wagt.",
            amen_internet:      "Mugt internet",
            amen_internet_desc: "Ähli okuwçylar üçin çalt ulgam.",
            amen_coffee:        "Kofe we çaý",
            amen_coffee_desc:   "Mugt. Her gün.",
            amen_mac:           "Sapak bolmadyk wagty hem ulanyp bolýar.",
            amen_server:        "Şahsy serwer",
            amen_server_desc:   "Maglumatlar üçünji tarap serwerlerine iberilmeýär.",
            amen_workspace:     "Açyk iş ýeri",
            amen_workspace_desc:"Öý işleri, döredijilik we şahsy taslamalar üçin.",
            cta_sub:            "Ilkinji ädim iň möhüm",
            cta_title:          "Taýýarmysyň?",
            cta_note:           "Ýerler çäkli. Häzir hasaba duruň.",
            cta_register:       "Hasaba duruň →",
            cta_or:             "ýa-da",
            contact_label:      "HASABA ALMAK",
            contact_title:      "Goşulyň.",
            contact_desc:       "Mugt maslahat üçin maglumatlaryňyzy goýuň. 24 sagat içinde habarlaşarys.",
            contact_map_link:   "Örgeniç — Kartada görmek ↗",
            form_name:          "At we Familiýa",
            form_name_ph:       "Doly adyňyz",
            form_phone:         "Telefon belgisi",
            form_course:        "Kurs saýlaň",
            form_time:          "Sapak wagtyny saýlaň",
            form_source:        "Bizi nireden tapdyňyz?",
            form_source_ph:     "— Saýlaň —",
            form_source_friend: "Dost / tanyş arkaly",
            form_source_other:  "Beýleki",
            map_label:          "ÝERLEŞIŞ",
            map_title:          "Bizi tapyň.",
            map_desc:           "Örgeniç — Horezm welaýatynyň ýeke-täk kiberhowpsuzlyk akademiýasy.",
            map_btn:            "Google Kartada açmak",
            clubs_label:        "MUGT TOPARLAR",
            clubs_title_pre:    "Hepde soňy",
            clubs_title_free:   "mugt.",
            clubs_desc:         "Anna, şenbe we ýekşenbe — resmi sapak ýok. Bu günler IELTS we SAT toparlary, ulgam gurmak we bilim paýlaşmak üçin. Hasaba almak gerek — ýöne onlaýn däl. Merkeze gelip ýazylaýarsyňyz. Töleg ýok.",
            footer_tagline:     "Örgeniç — Horezm welaýatynyň kiberhowpsuzlyk akademiýasy",
            footer_rights:      "Ähli hukuklar goralýar.",
            garaoy_desc:        "Orqoýin toparasynyň täze platformasy — Linux, Android we macOS üçin",
            coming_soon:        "Ýakynda",
            toast_success:      "Üstünlik! Ýakynda habarlaşarys.",
        }
    };

    /* ─────────────────────────────────────────────────
       2. LANGUAGE SWITCHER
    ───────────────────────────────────────────────── */
    const html        = document.documentElement;
    let   currentLang = localStorage.getItem('orqoyin-lang') || 'uz';

    function applyLang(lang) {
        currentLang = lang;
        html.setAttribute('data-lang', lang);
        html.setAttribute('lang', lang === 'tm' ? 'tk' : 'uz');
        localStorage.setItem('orqoyin-lang', lang);

        const tr = T[lang];

        // Standard text nodes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (tr[key] !== undefined) el.textContent = tr[key];
        });

        // Placeholders
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.dataset.i18nPh;
            if (tr[key] !== undefined) el.placeholder = tr[key];
        });

        // Accent line (hero): update data-text for CSS ::before glitch
        const accentLine = document.querySelector('[data-i18n-accent]');
        if (accentLine) {
            const key = accentLine.dataset.i18nAccent;
            if (tr[key]) {
                accentLine.textContent = tr[key];
                accentLine.setAttribute('data-text', tr[key]);
            }
        }

        // Update active state on lang buttons
        document.querySelectorAll('[data-l]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.l === lang);
        });

        // Re-render smena options if a course is already selected
        const checkedCourse = document.querySelector('input[name="course"]:checked');
        if (checkedCourse) buildSmenaOptions(checkedCourse.value);
    }

    // Nav lang toggle (UZ | TM spans)
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            applyLang(currentLang === 'uz' ? 'tm' : 'uz');
        });
    }

    // Mobile menu lang buttons
    document.querySelectorAll('.mm-lang-btn[data-l]').forEach(btn => {
        btn.addEventListener('click', () => applyLang(btn.dataset.l));
    });

    // Apply saved language on load
    applyLang(currentLang);

    /* ─────────────────────────────────────────────────
       3. THEME TOGGLE
    ───────────────────────────────────────────────── */
    const savedTheme = localStorage.getItem('orqoyin-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('orqoyin-theme', next);
        });
    }

    /* ─────────────────────────────────────────────────
       4. MOBILE MENU / BURGER
    ───────────────────────────────────────────────── */
    const burger     = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            const open = mobileMenu.classList.toggle('open');
            burger.classList.toggle('open', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('.mm-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                burger.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ─────────────────────────────────────────────────
       5. NAV SCROLL BEHAVIOUR
    ───────────────────────────────────────────────── */
    const nav        = document.getElementById('nav');
    const stickyCTA  = document.getElementById('sticky-cta');

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        nav?.classList.toggle('scrolled', y > 40);
        stickyCTA?.classList.toggle('visible', y > 300);
    }, { passive: true });

    /* ─────────────────────────────────────────────────
       6. CANVAS BACKGROUND
    ───────────────────────────────────────────────── */
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, nodes = [];

        function resizeCanvas() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        const NODE_COUNT = Math.min(60, Math.floor(window.innerWidth / 22));

        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.28,
                vy: (Math.random() - 0.5) * 0.28,
                r: Math.random() * 1.6 + 0.4,
            });
        }

        function drawCanvas() {
            ctx.clearRect(0, 0, W, H);
            const isLight = html.getAttribute('data-theme') === 'light';
            const nodeColor = isLight ? 'rgba(0,80,40,0.35)' : 'rgba(0,255,157,0.55)';
            const lineColor = isLight
                ? (a) => `rgba(0,80,40,${a * 0.25})`
                : (a) => `rgba(0,255,157,${a * 0.18})`;

            nodes.forEach(n => {
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
                if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = nodeColor;
                ctx.fill();
            });

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = lineColor(1 - dist / 140);
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawCanvas);
        }
        drawCanvas();
    }

    /* ─────────────────────────────────────────────────
       7. PARALLAX ORBS (desktop / pointer:fine only)
    ───────────────────────────────────────────────── */
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    const orbs = [
        { el: document.querySelector('.orb-1'), speedX: 0.018, speedY: 0.012 },
        { el: document.querySelector('.orb-2'), speedX: -0.014, speedY: 0.020 },
        { el: document.querySelector('.orb-3'), speedX: 0.022, speedY: -0.016 },
    ].filter(o => o.el);

    if (isPointerFine && orbs.length) {
        let mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', e => {
            mouseX = e.clientX - window.innerWidth / 2;
            mouseY = e.clientY - window.innerHeight / 2;
        }, { passive: true });

        let scrollY = 0;
        window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

        const orbSpeeds = [0.10, 0.18, 0.07]; // scroll parallax per orb
        function animateOrbs() {
            orbs.forEach((o, i) => {
                const tx = mouseX * o.speedX;
                const ty = mouseY * o.speedY - scrollY * orbSpeeds[i];
                o.el.style.transform = `translate(${tx}px, ${ty}px)`;
            });
            requestAnimationFrame(animateOrbs);
        }
        animateOrbs();
    }

    /* ─────────────────────────────────────────────────
       8. REVEAL ON SCROLL (IntersectionObserver)
    ───────────────────────────────────────────────── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ─────────────────────────────────────────────────
       9. COUNTER ANIMATION
    ───────────────────────────────────────────────── */
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el     = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const dur    = 1200;
            const start  = performance.now();

            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / dur, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(ease * target);
                if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.hstat-num[data-target]').forEach(el => counterObserver.observe(el));

    /* ─────────────────────────────────────────────────
       10. SCAN BEAM
    ───────────────────────────────────────────────── */
    const scanLine = document.getElementById('scan-line');
    const scanBeam = document.getElementById('scan-beam');
    if (scanLine && scanBeam) {
        let scanning = false, scanY = -1, scanDest = -1, scanRaf;

        function moveScan() {
            if (!scanning) return;
            scanY += (scanDest - scanY) * 0.06;
            const yv = Math.round(scanY);
            scanLine.setAttribute('x1', '0');
            scanLine.setAttribute('y1', String(yv));
            scanLine.setAttribute('x2', String(window.innerWidth));
            scanLine.setAttribute('y2', String(yv));
            scanBeam.style.opacity = '1';
            scanRaf = requestAnimationFrame(moveScan);
        }

        document.addEventListener('mousemove', e => {
            if (!isPointerFine) return;
            scanDest = e.clientY;
            if (!scanning) {
                scanning = true;
                if (scanY < 0) scanY = scanDest;
                moveScan();
            }
        });

        document.addEventListener('mouseleave', () => {
            scanning = false;
            cancelAnimationFrame(scanRaf);
            scanBeam.style.opacity = '0';
        });
    }

    /* ─────────────────────────────────────────────────
       11. REGISTRATION FORM
    ───────────────────────────────────────────────── */
    const TG_TOKEN   = '7981937991:AAFp7zgW0xJ2pc83jL6tH3LRy_mIl38Tkjw';
    const TG_CHAT_ID = '-5134567971';

    const COURSE_LABELS = {
        cybersecurity: '🛡 Kiberxavfsizlik',
        english:       '🌐 Ingliz Tili',
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

    const DAY_ICON   = `<svg class="period-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>`;
    const NIGHT_ICON = `<svg class="period-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    const SMENA_DATA = {
        cybersecurity: [
            { value: '11:00', label: '11:00', note: '', period: 'day'   },
            { value: '19:00', label: '19:00', note: '', period: 'night' },
        ],
        english: [
            { value: '09:00', label: '09:00 – 11:00', note: '12+ yosh',    period: 'day'   },
            { value: '16:00', label: '16:00 – 18:00', note: 'Bolalar (5+)', period: 'day'   },
            { value: '19:30', label: '19:30 – 21:00', note: '12+ yosh',    period: 'night' },
        ],
        ielts_free: [
            { value: '10:00', label: '10:00 – 11:30', note: 'Juma · Shanba · Yakshanba', period: 'day' },
        ],
        sat_free: [
            { value: '18:30', label: '18:30 – 20:00', note: 'Juma · Shanba · Yakshanba', period: 'night' },
        ],
    };

    function buildSmenaOptions(course) {
        const container = document.getElementById('smena-options');
        const group     = document.getElementById('smena-group');
        if (!container || !group) return;

        container.innerHTML = '';
        const slots = SMENA_DATA[course];
        if (!slots || slots.length === 0) { group.style.display = 'none'; return; }

        const courseClass = course === 'cybersecurity' ? 'cyber-slot'
                          : course === 'ielts_free'    ? 'ielts-slot'
                          : course === 'sat_free'      ? 'sat-slot'
                          : 'english-slot';

        // Translate slot note if TM
        const isTM = currentLang === 'tm';
        const translateNote = (note) => {
            if (!isTM) return note;
            return note
                .replace('12+ yosh', '12+ ýaş')
                .replace('Bolalar (5+)', 'Çagalar (5+)')
                .replace('Juma · Shanba · Yakshanba', 'Anna · Şenbe · Ýekşenbe');
        };

        slots.forEach(slot => {
            const lbl = document.createElement('label');
            lbl.className = 'smena-option';
            const icon = slot.period === 'day' ? DAY_ICON : NIGHT_ICON;
            const note = translateNote(slot.note);
            lbl.innerHTML = `
                <input type="radio" name="smena" value="${slot.value}" required>
                <span class="smena-slot ${courseClass} period-${slot.period}">
                    <span class="slot-header">
                        ${icon}
                        <span class="slot-time">${slot.label}</span>
                    </span>
                    ${note ? `<span class="slot-age">${note}</span>` : ''}
                </span>`;

            const radio = lbl.querySelector('input');
            radio.addEventListener('change', () => {
                container.querySelectorAll('.smena-slot').forEach(s => s.removeAttribute('data-active'));
                lbl.querySelector('.smena-slot').setAttribute('data-active', slot.period);
            });
            container.appendChild(lbl);
        });

        // Auto-select single slot
        if (slots.length === 1) {
            const radio = container.querySelector('input[name="smena"]');
            const slotEl = container.querySelector('.smena-slot');
            if (radio && slotEl) {
                radio.checked = true;
                slotEl.setAttribute('data-active', slots[0].period);
            }
        }

        group.style.display = 'flex';
    }

    // Course radio change
    document.querySelectorAll('input[name="course"]').forEach(r => {
        r.addEventListener('change', () => buildSmenaOptions(r.value));
    });

    // Telegram submission
    async function sendToTelegram(data) {
        const course  = COURSE_LABELS[data.course] || data.course;
        const source  = SOURCE_LABELS[data.source]  || data.source || '—';
        const smena   = data.smena || '—';
        const message = `📋 <b>Yangi ro'yxat</b>\n\n👤 <b>Ism:</b> ${data.name}\n📞 <b>Telefon:</b> ${data.phone}\n📚 <b>Kurs:</b> ${course}\n🕐 <b>Smena:</b> ${smena}\n📣 <b>Manba:</b> ${source}`;
        const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
        await fetch(url, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: 'HTML' }),
        });
    }

    // Form submit
    const form = document.getElementById('reg-form');
    if (form) {
        form.addEventListener('submit', async e => {
            e.preventDefault();

            // Honeypot
            if (document.getElementById('hp-website')?.value) return;

            const name    = document.getElementById('reg-name')?.value.trim();
            const phone   = document.getElementById('reg-phone')?.value.trim();
            const course  = form.querySelector('input[name="course"]:checked')?.value;
            const smena   = form.querySelector('input[name="smena"]:checked')?.value;
            const source  = document.getElementById('source')?.value;

            if (!name || !phone || !course) return;

            const btn = form.querySelector('.btn-submit');
            if (btn) { btn.disabled = true; btn.style.opacity = '0.6'; }

            try {
                await sendToTelegram({ name, phone, course, smena, source });
                showToast();
                form.reset();
                document.getElementById('smena-group').style.display = 'none';
                document.getElementById('smena-options').innerHTML = '';
            } catch {
                // silent fail — form resets anyway
            } finally {
                if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
            }
        });
    }

    /* ─────────────────────────────────────────────────
       12. TOAST
    ───────────────────────────────────────────────── */
    function showToast() {
        const toast = document.getElementById('toast');
        if (!toast) return;
        // update text for current lang
        const textEl = toast.querySelector('[data-i18n]');
        if (textEl) textEl.textContent = T[currentLang].toast_success;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    }

    /* ─────────────────────────────────────────────────
       13. CUSTOM CURSOR
    ───────────────────────────────────────────────── */
    if (isPointerFine) {
        const ring = document.getElementById('cur-ring');
        const dot  = document.getElementById('cur-dot');

        let rx = -100, ry = -100; // ring pos (lerped)
        let dx = -100, dy = -100; // dot pos  (instant)

        document.addEventListener('mousemove', e => {
            dx = e.clientX; dy = e.clientY;
        }, { passive: true });

        (function cursorLoop() {
            rx += (dx - rx) * 0.10;
            ry += (dy - ry) * 0.10;
            if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
            if (dot)  { dot.style.left  = dx + 'px'; dot.style.top  = dy + 'px'; }
            requestAnimationFrame(cursorLoop);
        })();

        // Hover detection for interactive elements
        const hoverTargets = 'a, button, .cs-card, .smena-slot, .bento-card, .wu-card, .club-card, .map-card, label';
        document.querySelectorAll(hoverTargets).forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    /* ─────────────────────────────────────────────────
       14. SCRAMBLE TEXT EFFECT
    ───────────────────────────────────────────────── */
    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?';

    function scrambleEl(el, target, duration) {
        const len = target.length;
        let start = null;

        function step(ts) {
            if (!start) start = ts;
            const t = Math.min((ts - start) / duration, 1);
            const revealed = Math.floor(t * len);

            let out = '';
            for (let i = 0; i < len; i++) {
                out += i < revealed
                    ? target[i]
                    : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }

            // Update text node directly so CSS ::before/::after (data-text) stay intact
            const tn = el.childNodes[0];
            if (tn && tn.nodeType === 3) tn.nodeValue = out;
            else el.textContent = out;

            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                const tn2 = el.childNodes[0];
                if (tn2 && tn2.nodeType === 3) tn2.nodeValue = target;
                else el.textContent = target;
                // Keep data-text in sync for glitch pseudo-elements
                if (el.hasAttribute('data-text')) el.setAttribute('data-text', target);
            }
        }
        requestAnimationFrame(step);
    }

    function runScrambles(lang) {
        const key = 'final' + lang.charAt(0).toUpperCase() + lang.slice(1);
        document.querySelectorAll('.scramble').forEach((el, i) => {
            const target = el.dataset[key] || el.textContent.trim();
            setTimeout(() => scrambleEl(el, target, 1100 + i * 80), i * 90 + 120);
        });
    }

    // Initial scramble on load
    runScrambles(currentLang);

    // Re-scramble when language changes
    function onLangChange() {
        setTimeout(() => runScrambles(currentLang), 60);
    }
    if (langToggle) langToggle.addEventListener('click', onLangChange);
    document.querySelectorAll('.mm-lang-btn[data-l]').forEach(btn => {
        btn.addEventListener('click', onLangChange);
    });

    /* ─────────────────────────────────────────────────
       15. 3D CARD TILT
    ───────────────────────────────────────────────── */
    if (isPointerFine) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            const MAX = 8; // max degrees

            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width  / 2;
                const cy = rect.top  + rect.height / 2;
                const dx = (e.clientX - cx) / (rect.width  / 2);
                const dy = (e.clientY - cy) / (rect.height / 2);
                const rotX = -dy * MAX;
                const rotY =  dx * MAX;
                card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
            });
        });
    }

    /* ─────────────────────────────────────────────────
       16. MAGNETIC BUTTONS
    ───────────────────────────────────────────────── */
    if (isPointerFine) {
        document.querySelectorAll('.magnetic').forEach(el => {
            const STRENGTH = 0.38;

            el.addEventListener('mousemove', e => {
                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width  / 2;
                const cy = rect.top  + rect.height / 2;
                const dx = (e.clientX - cx) * STRENGTH;
                const dy = (e.clientY - cy) * STRENGTH;
                el.style.transform = `translate(${dx}px, ${dy}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0,0)';
                el.style.transition = 'transform 0.4s cubic-bezier(.25,.46,.45,.94)';
            });

            el.addEventListener('mouseenter', () => {
                el.style.transition = 'transform 0.1s linear';
            });
        });
    }

}); // end DOMContentLoaded
