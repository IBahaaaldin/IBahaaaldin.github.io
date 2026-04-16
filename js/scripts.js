/* ============================================================
   BAHAA ALDIN — Portfolio Scripts
   Theme · Language · Nav · Reveal · Count-up · Form
   ============================================================ */

(function () {
  'use strict';

  /* ── Year ────────────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Theme ───────────────────────────────────────────────── */
  const body      = document.body;
  const themeBtn  = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon'); // <i> inside theme-btn

  function setTheme(t) {
    body.classList.remove('dark', 'light');
    body.classList.add(t);
    if (themeIcon) {
      themeIcon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    localStorage.setItem('bm-theme', t);
  }

  const savedTheme = localStorage.getItem('bm-theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  setTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      setTheme(body.classList.contains('dark') ? 'light' : 'dark');
    });
  }

  /* ── Language ────────────────────────────────────────────── */
  const langBtn   = document.getElementById('lang-btn');
  const langLabel = document.getElementById('lang-label'); // <span> inside lang-btn
  let currentLang = localStorage.getItem('bm-lang') || 'en';

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    if (langLabel) langLabel.textContent = lang === 'ar' ? 'EN' : 'AR';

    // Update all bilingual text elements
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      el.innerHTML = el.getAttribute('data-' + lang);
    });

    // Update placeholders if any
    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
      el.placeholder = el.getAttribute('data-placeholder-' + lang) || el.placeholder;
    });

    localStorage.setItem('bm-lang', lang);
  }

  applyLang(currentLang);

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLang(currentLang === 'en' ? 'ar' : 'en');
    });
  }

  /* ── Mobile nav ──────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove('open');
    body.style.overflow = '';
    if (hamburger) {
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      body.style.overflow = isOpen ? 'hidden' : '';
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ── Scrolled nav ────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Active nav link ─────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav-menu a[href^="#"]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  /* ── Reveal on scroll ────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = parseFloat(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('visible'), delay * 1000);
      revealObs.unobserve(e.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = (i % 5) * 0.07;
    revealObs.observe(el);
  });

  /* ── Count-up animation ──────────────────────────────────── */
  function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

  function animateCount(el) {
    const target    = parseFloat(el.dataset.target);
    const isDecimal = String(target).includes('.');
    const dur       = 1800;
    const start     = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / dur, 1);
      const val = target * easeOutQuart(progress);
      el.textContent = isDecimal
        ? val.toFixed(1)
        : Math.round(val).toLocaleString();
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
    }
    requestAnimationFrame(frame);
  }

  const metricsWrap = document.querySelector('.hero-metrics');
  if (metricsWrap) {
    let counted = false;
    const metricObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.metric-n[data-target]').forEach(animateCount);
        metricObs.disconnect();
      }
    }, { threshold: 0.4 });
    metricObs.observe(metricsWrap);
  }

  /* ── Contact form ────────────────────────────────────────── */
  const form = document.getElementById('contact-form');

  if (form) {
    // Insert status element after form
    const statusEl = document.createElement('div');
    statusEl.className = 'form-status';
    form.after(statusEl);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const originalHTML = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>&nbsp;Sending…';
      statusEl.className = 'form-status';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          form.reset();
          statusEl.className = 'form-status success';
          statusEl.textContent = currentLang === 'ar'
            ? 'تم إرسال رسالتك! سأتواصل معك قريباً.'
            : "Message sent! I'll get back to you soon.";
        } else {
          throw new Error('server');
        }
      } catch {
        statusEl.className = 'form-status error';
        statusEl.textContent = currentLang === 'ar'
          ? 'حدث خطأ. يرجى المحاولة مجدداً أو التواصل عبر واتساب.'
          : 'Something went wrong. Reach me via WhatsApp instead.';
      } finally {
        btn.disabled  = false;
        btn.innerHTML = originalHTML;
      }
    });
  }

})();
