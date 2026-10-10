/* ============================================================
   MANUAL SIU DIAGUITA — JavaScript principal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. BARRA DE PROGRESO DE LECTURA ─────────────────── */
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop  = document.documentElement.scrollTop;
      const scrollH    = document.documentElement.scrollHeight - window.innerHeight;
      const pct        = scrollH > 0 ? (scrollTop / scrollH) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  /* ── 2. DARK MODE ────────────────────────────────────── */
  const darkBtn = document.getElementById('darkModeBtn');
  const html    = document.documentElement;

  const applyTheme = (dark) => {
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (darkBtn) darkBtn.innerHTML = dark ? '☀️ Modo claro' : '🌙 Modo oscuro';
  };

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));

  if (darkBtn) {
    darkBtn.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      applyTheme(!isDark);
      localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    });
  }

  /* ── 3. BOTÓN SCROLL TO TOP ──────────────────────────── */
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 350);
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 4. SIDEBAR MOBILE (hamburger) ──────────────────── */
  const sidebar  = document.querySelector('.sidebar');
  const overlay  = document.querySelector('.sidebar-overlay');
  const hamburger = document.getElementById('hamburgerBtn');

  const openSidebar  = () => { sidebar?.classList.add('open'); overlay?.classList.add('open'); };
  const closeSidebar = () => { sidebar?.classList.remove('open'); overlay?.classList.remove('open'); };

  hamburger?.addEventListener('click', () => {
    sidebar?.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  overlay?.addEventListener('click', closeSidebar);

  /* Cerrar sidebar al navegar en mobile */
  sidebar?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 900) closeSidebar();
    });
  });

  /* ── 5. RESALTADO DE SECCIÓN ACTIVA EN TOC ───────────── */
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

  /* ── 6. LIGHTBOX: envolver imágenes sin glightbox ───── */
  // Las imágenes dentro de step-card que NO tengan ya un <a> se envuelven
  document.querySelectorAll('.step-card img:not(a img)').forEach((img, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'img-wrap';

    const link = document.createElement('a');
    link.href  = img.src;
    link.className = 'glightbox';
    link.setAttribute('data-title', img.alt || '');
    link.setAttribute('data-gallery', 'page-gallery');

    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(link);
    link.appendChild(img);

    // Hint de zoom
    const hint = document.createElement('span');
    hint.className = 'img-zoom-hint';
    hint.innerHTML = '🔍 Clic para ampliar';
    wrap.appendChild(hint);
  });

  /* Inicializar GLightbox */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      touchNavigation: true,
      loop: true,
      autoplayVideos: false,
      zoomable: true,
    });
  }

  /* ── 7. STEPPER: marcar paso activo al hacer scroll ──── */
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
