/* ============================================================
   MANUAL SIU DIAGUITA — JavaScript principal v2.0
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. BARRA DE PROGRESO ────────────────────────────── */
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    const updateProgress = () => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollH > 0 ? (document.documentElement.scrollTop / scrollH) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  /* ── 2. DARK MODE ────────────────────────────────────── */
  const darkBtn  = document.getElementById('darkModeBtn');
  const iconMoon = document.getElementById('iconMoon');
  const iconSun  = document.getElementById('iconSun');
  const html     = document.documentElement;

  const applyTheme = (dark) => {
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (iconMoon) iconMoon.style.display = dark ? 'none' : 'block';
    if (iconSun)  iconSun.style.display  = dark ? 'block' : 'none';
  };

  const savedTheme  = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));

  darkBtn?.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    applyTheme(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  });

  /* ── 3. SIDEBAR DRAWER ───────────────────────────────── */
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebarOverlay');
  const hamburger = document.getElementById('hamburgerBtn');
  const closeBtn  = document.getElementById('sidebarClose');

  const openSidebar  = () => {
    sidebar?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger?.setAttribute('aria-expanded', 'true');
  };
  const closeSidebar = () => {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    hamburger?.setAttribute('aria-expanded', 'false');
  };

  hamburger?.addEventListener('click', openSidebar);
  closeBtn?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });

  sidebar?.querySelectorAll('a[href]').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 900) closeSidebar();
    });
  });

  /* ── 4. SCROLL TO TOP ────────────────────────────────── */
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 350);
    }, { passive: true });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 5. TOC ACTIVO AL SCROLL ─────────────────────────── */
  const tocLinks  = document.querySelectorAll('.sidebar-sub a[href^="#"]');
  const stepCards = document.querySelectorAll('.step-card[id]');

  if (tocLinks.length && stepCards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(l => l.classList.remove('toc-active'));
          const target = document.querySelector(`.sidebar-sub a[href="#${entry.target.id}"]`);
          if (target) target.classList.add('toc-active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    stepCards.forEach(card => observer.observe(card));
  }

  /* ── 6. LIGHTBOX ─────────────────────────────────────── */
  document.querySelectorAll('.step-card img:not(a img)').forEach((img) => {
    const wrap = document.createElement('div');
    wrap.className = 'img-wrap';
    const link = document.createElement('a');
    link.href = img.src;
    link.className = 'glightbox';
    link.setAttribute('data-title', img.alt || '');
    link.setAttribute('data-gallery', 'page-gallery');
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(link);
    link.appendChild(img);
    const hint = document.createElement('span');
    hint.className = 'img-zoom-hint';
    hint.innerHTML = '🔍 Clic para ampliar';
    wrap.appendChild(hint);
  });

  if (typeof GLightbox !== 'undefined') {
    GLightbox({ touchNavigation: true, loop: true, zoomable: true });
  }

  /* ── 7. STEPPER ──────────────────────────────────────── */
  const stepperItems = document.querySelectorAll('.stepper-item');
  if (stepperItems.length && stepCards.length) {
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(stepCards).indexOf(entry.target);
          stepperItems.forEach((item, i) => {
            item.classList.remove('active', 'done');
            if (i < idx)  item.classList.add('done');
            if (i === idx) item.classList.add('active');
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    stepCards.forEach(card => stepObserver.observe(card));
  }

});
