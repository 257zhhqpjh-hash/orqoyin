/* ═══════════════════════════════════════════════════
   ORQOYIN — Script  (UZ / TM  Bilingual)
   Blade Runner 2049 edition
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────────────
       1. TRANSLATIONS
    ───────────────────────────────────────────────── */
    const T = {
        uz: {
            nav_register:        "Ro'yxatdan o'tish",
            nav_courses:         "Kurslar",
            nav_about:           "Akademiya",
            hero_badge:          "Urganch — Raqamli Akademiya",
            hero_line1:          "KELAJAK",
            hero_line2:          "HIMOYA",
            hero_line3:          "QILINGAN",
            hero_sub:            "Kiberxavfsizlik. Ingliz tili. Bir joyda.\nUrganch shahridagi birinchi ixtisoslashgan akademiya.",
            hero_btn_courses:    "Kurslarni ko'rish",
            hero_btn_about:      "Akademiya haqida",
            stat_directions:     "Yo'nalish",
            stat_free:           "Bepul kurs",
            stat_unique:         "Yagona",
            stat_unique_sub:     "Viloyatda",
            stat_hours:          "Har kuni ochiq",
            courses_title:       "Ikki kuch.\nCheksiz imkoniyat.",
            cyber_tag:           "KIBERXAVFSIZLIK",
            cyber_title:         "Kiberxavfsizlik",
            cyber_desc:          "Axloqiy hakerlik, tarmoq himoyasi va raqamli tekshiruv — haqiqiy laboratoriyalarda, real tajriba.",
            cyber_t1:            "Tarmoq xavfsizligi va axloqiy hakerlik",
            cyber_t2:            "Tizimga kirib tekshirish va CTF",
            cyber_t3:            "Linux tizimi va buyruq satri",
            cyber_t4:            "Zararli dastur tahlili va raqamli tekshiruv",
            cyber_t5:            "OSCP/CPTS sertifikat tayyorlovi",
            cyber_dur:           "MUDDAT",
            cyber_days:          "HAFTA 4 KUN",
            cyber_lab:           "Amaliy lab",
            cyber_morning:       "Sabahgi guruh",
            cyber_evening:       "Kechki guruh",
            cyber_float:         "HIMOYALANGAN",
            eng_tag:             "INGLIZ TILI",
            eng_title:           "Ingliz Tili",
            eng_desc:            "A1 dan C1 gacha — grammatika, nutq, IELTS va SAT tayyorlovi. Bolalar uchun maxsus 5+ guruh.",
            eng_t1:              "Boshlang'ich ingliz tili asoslari",
            eng_t2:              "Grammatika va so'z boyligi",
            eng_t3:              "Tinglash va o'qib tushunish",
            eng_t4:              "Yozma va og'zaki nutq",
            eng_t5:              "IELTS/SAT tayyorlovi",
            eng_adult:           "YOSH",
            eng_kids:            "Bolalar 5–12",
            eng_days4:           "Hafta 4 kun",
            eng_days5:           "Hafta 5 kun",
            eng_play:            "O'yin orqali",
            free_label:          "BEPUL KURSLAR",
            free_badge:          "BEPUL",
            ielts_title:         "Bepul IELTS Tayyorlovi",
            sat_title:           "Bepul SAT Tayyorlovi",
            day_fri:             "Juma",
            day_sat:             "Shanba",
            day_sun:             "Yakshanba",
            day_fri_short:       "Jum",
            day_sat_short:       "Sha",
            day_sun_short:       "Yak",
            free_reg_note:       "Markazga kelib ro'yxatdan o'ting. To'lov yo'q.",
            free_join:           "Qo'shilish",
            why_title:           "Nega",
            why_desc:            "Xorazm viloyatida kiberxavfsizlik bo'yicha birinchi va yagona ixtisoslashgan markaz. Biz ikkita sohani o'rgatamiz — jahon darajasida.",
            reason1_title:       "Viloyatda yagona",
            reason1_desc:        "Xorazm viloyatida kiberxavfsizlik bo'yicha birinchi va yagona ixtisoslashgan markaz.",
            reason2_title:       "Ikki kurs, bir joy",
            reason2_desc:        "Kiberxavfsizlik + ingliz tili — texnik bilim va muloqot ko'nikmasi bir kompleksda.",
            reason3_title:       "Haqiqiy laboratoriya",
            reason3_desc:        "Ommaviy ma'ruzalar emas — 6 Mac Mini, real CTF va amaliy loyihalar.",
            reason4_title:       "Chuqur bilim",
            reason4_desc:        "Sertifikat uchun emas — bilim uchun. Mustaqil fikrlash va real muammolarni hal etish.",
            cta_sub:             "Birinchi qadam eng muhim",
            cta_title:           "Tayyormisiz?",
            cta_note:            "Joylar cheklangan. Hoziroq ro'yxatdan o'ting.",
            cta_register:        "Ro'yxatdan o'ting →",
            cta_or:              "yoki",
            contact_label:       "RO'YXAT",
            contact_title:       "Qo'shiling.",
            contact_desc:        "Bepul maslahat uchun ma'lumotlaringizni qoldiring. 24 soat ichida bog'lanamiz.",
            contact_map_link:    "Urganch — Xaritada ko'rish ↗",
            form_name:           "Ism va Familiya",
            form_name_ph:        "To'liq ismingiz",
            form_phone:          "Telefon raqam",
            form_course:         "Kurs tanlang",
            form_time:           "Dars vaqtini tanlang",
            form_source:         "Bizni qayerdan topdingiz?",
            form_source_ph:      "— Tanlang —",
            form_source_friend:  "Do'st / tanish orqali",
            form_source_other:   "Boshqa",
            garaoy_label:        "PLATFORMA",
            coming_soon:         "Tez orada",
            garaoy_desc:         "Gara Öý — Orqoyin jamoasining yangi platformasi. Linux, Android va macOS uchun maxfiylik va xavfsizlikka qaratilgan.",
            footer_tagline:      "Urganch — Xorazm viloyatining kiberxavfsizlik akademiyasi",
            footer_rights:       "Barcha huquqlar himoyalangan.",
            toast_success:       "Muvaffaqiyatli! Tez orada bog'lanamiz.",
        },
        tm: {
            nav_register:        "Hasaba durmak",
            nav_courses:         "Kurslar",
            nav_about:           "Akademiýa",
            hero_badge:          "Ürgenç — Sanly Akademiýa",
            hero_line1:          "GELJEK",
            hero_line2:          "GORAGLY",
            hero_line3:          "BOLSUN",
            hero_sub:            "Kiberhowpsuzlyk. Iňlis dili. Bir ýerde.\nÜrgençdäki ilkinji ýöriteleşdirilen akademiýa.",
            hero_btn_courses:    "Kurslary görmek",
            hero_btn_about:      "Akademiýa hakda",
            stat_directions:     "Ugur",
            stat_free:           "Mugt kurs",
            stat_unique:         "Ýeke-täk",
            stat_unique_sub:     "Welaýatda",
            stat_hours:          "Her gün açyk",
            courses_title:       "Iki güýç.\nÇäksiz mümkinçilik.",
            cyber_tag:           "KIBERHOWPSUZLYK",
            cyber_title:         "Kiberhowpsuzlyk",
            cyber_desc:          "Etik hakerlik, ulgam goragy we sanly barlag — hakyky laboratoriýalarda, real tejribe.",
            cyber_t1:            "Ulgam howpsuzlygy we etik hakerlyk",
            cyber_t2:            "Ulgama aralaşmak we CTF",
            cyber_t3:            "Linux ulgamy we buýruk setiri",
            cyber_t4:            "Zyýanly programma derňewi we sanly barlag",
            cyber_t5:            "OSCP/CPTS şahadatnama taýýarlygy",
            cyber_dur:           "MÖHLET",
            cyber_days:          "HEPDE 4 GÜN",
            cyber_lab:           "Amaly lab",
            cyber_morning:       "Irki topar",
            cyber_evening:       "Agşam topary",
            cyber_float:         "GORAGLY",
            eng_tag:             "IŇLIS DILI",
            eng_title:           "Iňlis Dili",
            eng_desc:            "A1-den C1-e — grammatika, söhbet, IELTS we SAT. Çagalar üçin aýratyn 5+ topar.",
            eng_t1:              "Esasy iňlis dili",
            eng_t2:              "Grammatika we söz baýlygy",
            eng_t3:              "Diňlemek we okamak",
            eng_t4:              "Ýazuw we sözleýiş",
            eng_t5:              "IELTS/SAT taýýarlygy",
            eng_adult:           "ÝAŞ",
            eng_kids:            "Çagalar 5–12",
            eng_days4:           "Hepde 4 gün",
            eng_days5:           "Hepde 5 gün",
            eng_play:            "Oýun arkaly",
            free_label:          "MUGT KURSLAR",
            free_badge:          "MUGT",
            ielts_title:         "Mugt IELTS Taýýarlygy",
            sat_title:           "Mugt SAT Taýýarlygy",
            day_fri:             "Anna",
            day_sat:             "Şenbe",
            day_sun:             "Ýekşenbe",
            day_fri_short:       "Ann",
            day_sat_short:       "Şen",
            day_sun_short:       "Ýek",
            free_reg_note:       "Merkeze gelip hasaba duruň. Töleg ýok.",
            free_join:           "Goşulmak",
            why_title:           "Näme üçin",
            why_desc:            "Horezm welaýatynda kiberhowpsuzlyk boýunça ilkinji we ýeke-täk ýöriteleşdirilen merkez. Biz iki ugry öwredýäris — dünýä derejesinde.",
            reason1_title:       "Welaýatda ýeke-täk",
            reason1_desc:        "Horezm welaýatynda kiberhowpsuzlyk boýunça ilkinji we ýeke-täk ýöriteleşdirilen merkez.",
            reason2_title:       "Iki kurs, bir ýer",
            reason2_desc:        "Kiberhowpsuzlyk + iňlis dili — tehniki bilim we aragatnaşyk endigi bir toplumda.",
            reason3_title:       "Hakyky laboratoriýa",
            reason3_desc:        "Köpçülikleýin leksiýalar däl — 6 Mac Mini, real CTF we amaly taslamalar.",
            reason4_title:       "Çuňňur bilim",
            reason4_desc:        "Şahadatnama üçin däl — bilim üçin. Garaşsyz pikirlenmek we real meseleleri çözmek.",
            cta_sub:             "Ilkinji ädim iň möhüm",
            cta_title:           "Taýýarmysyň?",
            cta_note:            "Ýerler çäkli. Häzir hasaba duruň.",
            cta_register:        "Hasaba duruň →",
            cta_or:              "ýa-da",
            contact_label:       "HASABA ALMAK",
            contact_title:       "Goşulyň.",
            contact_desc:        "Mugt maslahat üçin maglumatlaryňyzy goýuň. 24 sagat içinde habarlaşarys.",
            contact_map_link:    "Ürgenç — Kartada görmek ↗",
            form_name:           "At we Familiýa",
            form_name_ph:        "Doly adyňyz",
            form_phone:          "Telefon belgisi",
            form_course:         "Kurs saýlaň",
            form_time:           "Sapak wagtyny saýlaň",
            form_source:         "Bizi nireden tapdyňyz?",
            form_source_ph:      "— Saýlaň —",
            form_source_friend:  "Dost / tanyş arkaly",
            form_source_other:   "Beýleki",
            garaoy_label:        "PLATFORMA",
            coming_soon:         "Ýakynda",
            garaoy_desc:         "Gara Öý — Orqoýin toparynyň täze platformasy. Linux, Android we macOS üçin gizlinlige we howpsuzlyga gönükdirilen.",
            footer_tagline:      "Ürgenç — Horezm welaýatynyň kiberhowpsuzlyk akademiýasy",
            footer_rights:       "Ähli hukuklar goralýar.",
            toast_success:       "Üstünlik! Ýakynda habarlaşarys.",
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

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (tr[key] !== undefined) el.textContent = tr[key];
        });

        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.dataset.i18nPh;
            if (tr[key] !== undefined) el.placeholder = tr[key];
        });

        document.querySelectorAll('[data-l]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.l === lang);
        });

        // Re-render smena options if a course is already selected
        const checkedCourse = document.querySelector('input[name="course"]:checked');
        if (checkedCourse) buildSmenaOptions(checkedCourse.value);
    }

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            applyLang(currentLang === 'uz' ? 'tm' : 'uz');
        });
    }

    document.querySelectorAll('.mm-lang-btn[data-l]').forEach(btn => {
        btn.addEventListener('click', () => applyLang(btn.dataset.l));
    });

    applyLang(currentLang);

    /* ─────────────────────────────────────────────────
       3. MOBILE MENU / BURGER
    ───────────────────────────────────────────────── */
    const burger     = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            const open = mobileMenu.classList.toggle('open');
            burger.classList.toggle('open', open);
            burger.setAttribute('aria-expanded', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('.mm-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                burger.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    /* ─────────────────────────────────────────────────
       4. NAV SCROLL
    ───────────────────────────────────────────────── */
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav?.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    /* ─────────────────────────────────────────────────
       5. REVEAL ON SCROLL
    ───────────────────────────────────────────────── */
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    /* ─────────────────────────────────────────────────
       6. STAT COUNTER  (.sv[data-count])
    ───────────────────────────────────────────────── */
    const countObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el     = entry.target;
            const target = parseInt(el.dataset.count, 10);
            if (isNaN(target)) return;
            const dur   = 1100;
            const start = performance.now();
            el.classList.add('counting');
            (function tick(now) {
                const t    = Math.min((now - start) / dur, 1);
                const ease = 1 - Math.pow(1 - t, 3);
                el.textContent = Math.round(ease * target);
                if (t < 1) requestAnimationFrame(tick);
                else { el.textContent = target; el.classList.remove('counting'); }
            })(start);
            countObs.unobserve(el);
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('.sv[data-count]').forEach(el => countObs.observe(el));

    /* ─────────────────────────────────────────────────
       7. CURSOR (dot + lagging ring) + aurora follow
          – only on pointer:fine devices
    ───────────────────────────────────────────────── */
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;

    if (isPointerFine) {
        const curDot  = document.getElementById('cur');
        const curRing = document.getElementById('cur-ring');
        const aura    = document.getElementById('aura-mouse');

        let mx = -300, my = -300;   // raw mouse
        let rx = -300, ry = -300;   // ring (lags)
        let ax = window.innerWidth / 2, ay = window.innerHeight / 2; // aura (slow lag)

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
        }, { passive: true });

        (function cursorLoop() {
            // dot snaps to mouse
            if (curDot) curDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
            // ring lags
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            if (curRing) curRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            // aurora glow lags slowly
            ax += (mx - ax) * 0.045;
            ay += (my - ay) * 0.045;
            if (aura) { aura.style.left = ax + 'px'; aura.style.top = ay + 'px'; }
            requestAnimationFrame(cursorLoop);
        })();

        // Hover grow state
        const hoverSel = 'a, button, label, input, select, .cs-card, .smena-slot';
        document.addEventListener('mouseover', e => {
            if (e.target.closest(hoverSel)) document.body.classList.add('hovering');
        });
        document.addEventListener('mouseout', e => {
            if (e.target.closest(hoverSel)) document.body.classList.remove('hovering');
        });

        // Magnetic buttons
        document.querySelectorAll('.btn-amber, .btn-ghost, .btn-outline-amber, .cta-btn, .nav-reg').forEach(el => {
            const STR = 0.32;
            el.addEventListener('mousemove', e => {
                const r = el.getBoundingClientRect();
                const dx = (e.clientX - (r.left + r.width / 2)) * STR;
                const dy = (e.clientY - (r.top + r.height / 2)) * STR;
                el.style.transform = `translate(${dx}px, ${dy}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transition = 'transform .4s cubic-bezier(.2,.9,.2,1)';
                el.style.transform = 'translate(0,0)';
                setTimeout(() => { el.style.transition = ''; }, 400);
            });
        });
    }

    /* ─────────────────────────────────────────────────
       8. SURVEILLANCE EYE  (#eye, #eye-pupil)
          – pupil (red dot) tracks mouse cursor
          – blink every 5–14 s
    ───────────────────────────────────────────────── */
    const eye      = document.getElementById('eye');
    const eyePupil = document.getElementById('eye-pupil');
    const eyeAngle = document.getElementById('eye-angle');
    const eyeDist  = document.getElementById('eye-dist');

    if (eye && eyePupil) {
        const MAX_OFFSET = 38; // px — max pupil travel from centre
        let ptx = 0, pty = 0;  // target offset
        let pcx = 0, pcy = 0;  // current (lerped)

        document.addEventListener('mousemove', e => {
            const rect = eye.getBoundingClientRect();
            const cx   = rect.left + rect.width  / 2;
            const cy   = rect.top  + rect.height / 2;
            const dx   = e.clientX - cx;
            const dy   = e.clientY - cy;
            const raw  = Math.hypot(dx, dy);
            const angle = Math.atan2(dy, dx);
            const dist  = Math.min(raw / 5, MAX_OFFSET);

            ptx = Math.cos(angle) * dist;
            pty = Math.sin(angle) * dist;

            if (eyeAngle) {
                const deg = Math.round(((angle * 180 / Math.PI) + 360) % 360);
                eyeAngle.textContent = String(deg).padStart(3, '0');
            }
            if (eyeDist) {
                eyeDist.textContent = String(Math.min(Math.round(raw), 999)).padStart(3, '0');
            }
        }, { passive: true });

        (function pupilLoop() {
            pcx += (ptx - pcx) * 0.08;
            pcy += (pty - pcy) * 0.08;
            eyePupil.style.transform =
                `translate(calc(-50% + ${pcx.toFixed(2)}px), calc(-50% + ${pcy.toFixed(2)}px))`;
            requestAnimationFrame(pupilLoop);
        })();

        // Periodic blink
        (function scheduleBlink() {
            const delay = 5000 + Math.random() * 9000;
            setTimeout(() => {
                eye.classList.add('blinking');
                setTimeout(() => {
                    eye.classList.remove('blinking');
                    scheduleBlink();
                }, 440);
            }, delay);
        })();
    }

    /* ─────────────────────────────────────────────────
       9. SCRAMBLE TEXT
    ───────────────────────────────────────────────── */
    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?';

    function scrambleEl(el, target, duration) {
        const len = target.length;
        let start = null;
        (function step(ts) {
            if (!start) start = ts;
            const t        = Math.min((ts - start) / duration, 1);
            const revealed = Math.floor(t * len);
            let out = '';
            for (let i = 0; i < len; i++) {
                out += i < revealed
                    ? target[i]
                    : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            const tn = el.childNodes[0];
            if (tn && tn.nodeType === 3) tn.nodeValue = out;
            else el.textContent = out;
            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                const tn2 = el.childNodes[0];
                if (tn2 && tn2.nodeType === 3) tn2.nodeValue = target;
                else el.textContent = target;
            }
        })(performance.now());
    }

    function runScrambles(lang) {
        const key = 'final' + lang.charAt(0).toUpperCase() + lang.slice(1);
        document.querySelectorAll('.scramble').forEach((el, i) => {
            const target = el.dataset[key] || el.textContent.trim();
            setTimeout(() => scrambleEl(el, target, 1100 + i * 80), i * 90 + 120);
        });
    }

    runScrambles(currentLang);

    // Re-scramble on language change
    function onLangChange() {
        setTimeout(() => runScrambles(currentLang), 60);
    }
    if (langToggle) langToggle.addEventListener('click', onLangChange);
    document.querySelectorAll('.mm-lang-btn[data-l]').forEach(btn => {
        btn.addEventListener('click', onLangChange);
    });

    /* ─────────────────────────────────────────────────
       10. REGISTRATION FORM + TELEGRAM
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

    const DAY_ICON   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>`;
    const NIGHT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    const SMENA_DATA = {
        cybersecurity: [
            { value: '11:00', label: '11:00',          note: '',                         period: 'day'   },
            { value: '19:00', label: '19:00',          note: '',                         period: 'night' },
        ],
        english: [
            { value: '09:00', label: '09:00 – 11:00', note: '12+ yosh',                 period: 'day'   },
            { value: '16:00', label: '16:00 – 18:00', note: 'Bolalar (5+)',              period: 'day'   },
            { value: '19:30', label: '19:30 – 21:00', note: '12+ yosh',                 period: 'night' },
        ],
        ielts_free: [
            { value: '10:00', label: '10:00 – 11:30', note: 'Juma · Shanba · Yakshanba', period: 'day'  },
        ],
        sat_free: [
            { value: '18:30', label: '18:30 – 20:00', note: 'Juma · Shanba · Yakshanba', period: 'night'},
        ],
    };

    function buildSmenaOptions(course) {
        const container = document.getElementById('smena-options');
        const group     = document.getElementById('smena-group');
        if (!container || !group) return;

        container.innerHTML = '';
        const slots = SMENA_DATA[course];
        if (!slots || slots.length === 0) { group.style.display = 'none'; return; }

        const isTM = currentLang === 'tm';
        const translateNote = (note) => {
            if (!isTM) return note;
            return note
                .replace('12+ yosh',             '12+ ýaş')
                .replace('Bolalar (5+)',           'Çagalar (5+)')
                .replace('Juma · Shanba · Yakshanba', 'Anna · Şenbe · Ýekşenbe');
        };

        slots.forEach(slot => {
            const lbl  = document.createElement('label');
            lbl.className = 'smena-option';
            const icon = slot.period === 'day' ? DAY_ICON : NIGHT_ICON;
            const note = translateNote(slot.note);
            lbl.innerHTML = `
                <input type="radio" name="smena" value="${slot.value}" required>
                <span class="smena-slot period-${slot.period}">
                    <span class="slot-header">${icon}<span class="slot-time">${slot.label}</span></span>
                    ${note ? `<span class="slot-age">${note}</span>` : ''}
                </span>`;

            const radio = lbl.querySelector('input');
            radio.addEventListener('change', () => {
                container.querySelectorAll('.smena-slot').forEach(s => s.removeAttribute('data-active'));
                lbl.querySelector('.smena-slot').setAttribute('data-active', slot.period);
            });
            container.appendChild(lbl);
        });

        // Auto-select if only one slot
        if (slots.length === 1) {
            const r  = container.querySelector('input[name="smena"]');
            const sl = container.querySelector('.smena-slot');
            if (r && sl) { r.checked = true; sl.setAttribute('data-active', slots[0].period); }
        }

        group.style.display = 'flex';
    }

    document.querySelectorAll('input[name="course"]').forEach(r => {
        r.addEventListener('change', () => buildSmenaOptions(r.value));
    });

    async function sendToTelegram(data) {
        const course  = COURSE_LABELS[data.course] || data.course;
        const source  = SOURCE_LABELS[data.source]  || data.source || '—';
        const smena   = data.smena || '—';
        const message =
            `📋 <b>Yangi ro'yxat</b>\n\n` +
            `👤 <b>Ism:</b> ${data.name}\n` +
            `📞 <b>Telefon:</b> ${data.phone}\n` +
            `📚 <b>Kurs:</b> ${course}\n` +
            `🕐 <b>Smena:</b> ${smena}\n` +
            `📣 <b>Manba:</b> ${source}`;
        await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: 'HTML' }),
        });
    }

    const form = document.getElementById('reg-form');
    if (form) {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            if (document.getElementById('hp-website')?.value) return;

            const name   = document.getElementById('reg-name')?.value.trim();
            const phone  = document.getElementById('reg-phone')?.value.trim();
            const course = form.querySelector('input[name="course"]:checked')?.value;
            const smena  = form.querySelector('input[name="smena"]:checked')?.value;
            const source = document.getElementById('source')?.value;

            if (!name || !phone || !course) return;

            const btn = form.querySelector('.btn-submit');
            if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; }

            try {
                await sendToTelegram({ name, phone, course, smena, source });
                showToast();
                form.reset();
                const sg = document.getElementById('smena-group');
                const so = document.getElementById('smena-options');
                if (sg) sg.style.display = 'none';
                if (so) so.innerHTML = '';
            } catch {
                // silent fail
            } finally {
                if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
            }
        });
    }

    /* ─────────────────────────────────────────────────
       11. TOAST
    ───────────────────────────────────────────────── */
    function showToast() {
        const toast = document.getElementById('toast');
        if (!toast) return;
        const textEl = toast.querySelector('[data-i18n]');
        if (textEl) textEl.textContent = T[currentLang].toast_success;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    }

}); // end DOMContentLoaded
