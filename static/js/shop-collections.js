(function() {
    'use strict';

    // ── DOM refs ──
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sections = document.querySelectorAll('.col-section');
    const seps = document.querySelectorAll('.section-sep');
    const slides = document.querySelectorAll('.hero-slide');
    const dotBtns = document.querySelectorAll('.hero-dot');
    const currentNum = document.getElementById('currentSlideNum');
    const heroEyebrow = document.getElementById('heroEyebrow');
    const heroPill = document.getElementById('heroPill');
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');

    // ── Slide metadata ──
    const slideMeta = [{
        eyebrow: 'All Collections · UK Studio',
        pill: '5 Collections',
        title: 'Pieces crafted for <em>elegance,</em><br />modesty, and purpose.',
        desc: 'Five collections, each with its own story. Browse by category below or explore a specific collection in full.'
    }, {
        eyebrow: 'Featured · Corporate Wear Collection',
        pill: '8 Pieces',
        title: 'Tailored for the <em>modern</em><br />professional woman.',
        desc: 'Structured blazers, two-piece sets, and executive dresses cut for confidence in boardroom & business.'
    }, {
        eyebrow: 'Featured · All Season Collection',
        pill: '8 Pieces',
        title: 'Built to carry you <em>across</em><br />the entire year.',
        desc: 'Breathable, premium fabrics designed for year-round versatility, timeless comfort, and graceful draping.'
    }, {
        eyebrow: 'Featured · African Prints Collection',
        pill: '8 Pieces',
        title: 'Heritage <em>patterns,</em> cut with<br />contemporary elegance.',
        desc: 'Authentic Ankara and Adire prints celebrating African identity through vibrant color and tailored style.'
    }, {
        eyebrow: 'Featured · Abaya Collection',
        pill: '8 Pieces',
        title: 'Flowing <em>silhouettes,</em><br />regal comfort and grace.',
        desc: 'Weighted high-grade fabrics that drape effortlessly — modest fashion crafted with royal sophistication.'
    }, {
        eyebrow: 'Featured · Studio Accessories',
        pill: '6 Pieces',
        title: 'Zero-waste <em>craftsmanship,</em><br />handcrafted by design.',
        desc: 'Practical, durable fabric tote bags and pouches made with care from our studio offcuts.'
    }];

    let currentSlideIdx = 0;
    let autoSlideTimer = null;

    // ── Go to slide ──
    function goToSlide(idx) {
        if (idx < 0) idx = slides.length - 1;
        if (idx >= slides.length) idx = 0;
        currentSlideIdx = idx;

        slides.forEach((s, i) => s.classList.toggle('active', i === idx));
        dotBtns.forEach((d, i) => d.classList.toggle('active', i === idx));

        currentNum.textContent = String(idx + 1).padStart(2, '0');

        const meta = slideMeta[idx];
        if (meta) {
            heroEyebrow.textContent = meta.eyebrow;
            heroPill.textContent = meta.pill;
            heroTitle.innerHTML = meta.title;
            heroDesc.textContent = meta.desc;
        }
    }

    // ── Auto slide ──
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideTimer = setInterval(() => {
            goToSlide((currentSlideIdx + 1) % slides.length);
        }, 5500);
    }

    function stopAutoSlide() {
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
    }

    // ── Manual controls ──
    document.getElementById('prevSlide').addEventListener('click', () => {
        stopAutoSlide();
        goToSlide(currentSlideIdx - 1);
    });

    document.getElementById('nextSlide').addEventListener('click', () => {
        stopAutoSlide();
        goToSlide(currentSlideIdx + 1);
    });

    dotBtns.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(parseInt(dot.dataset.slide, 10));
        });
    });

    // ── Collection map ──
    const collections = {
        corporate: { sec: 'sec-corporate', cta: 'cta-corporate', slideIdx: 1 },
        season: { sec: 'sec-season', cta: 'cta-season', slideIdx: 2 },
        prints: { sec: 'sec-prints', cta: 'cta-prints', slideIdx: 3 },
        abaya: { sec: 'sec-abaya', cta: 'cta-abaya', slideIdx: 4 },
        bags: { sec: 'sec-bags', cta: 'cta-bags', slideIdx: 5 },
    };

    // ── Show all ──
    function showAll() {
        sections.forEach(s => s.classList.remove('is-hidden'));
        seps.forEach(s => s.style.display = '');

        document.querySelectorAll('.p-card[data-preview="false"]').forEach(c => c.classList.add('is-hidden'));
        document.querySelectorAll('.p-card[data-preview="true"]').forEach(c => c.classList.remove('is-hidden'));

        document.querySelectorAll('.col-cta').forEach(b => b.classList.remove('visible'));

        goToSlide(0);
        startAutoSlide();
    }

    // ── Show single collection ──
    function showCollection(filter) {
        stopAutoSlide();
        const col = collections[filter];
        if (!col) return;

        sections.forEach(s => s.classList.add('is-hidden'));
        seps.forEach(s => s.style.display = 'none');

        const targetSec = document.getElementById(col.sec);
        if (targetSec) targetSec.classList.remove('is-hidden');

        document.querySelectorAll(`#${col.sec} .p-card`).forEach(c => c.classList.remove('is-hidden'));

        document.querySelectorAll('.col-cta').forEach(b => b.classList.remove('visible'));
        const targetCta = document.getElementById(col.cta);
        if (targetCta) targetCta.classList.add('visible');

        if (col.slideIdx !== undefined) {
            goToSlide(col.slideIdx);
        }
    }

    // ── Filter button clicks ──
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            f === 'all' ? showAll() : showCollection(f);
        });
    });

    // ── Initialize ──
    startAutoSlide();
})();
