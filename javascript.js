/* ═══════════════════════════════════════════════════════════════
   'র' -তে রাজীব · Site JavaScript
   Handles: nav scroll, scroll-reveal, footer year, tooltips
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. Footer year ──────────────────────────────────────────── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ── 2. Sticky nav on scroll ─────────────────────────────────── */
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 55) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Run once on load

  /* ── 3. Smooth-scroll nav links ──────────────────────────────── */
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ── 4. Scroll-reveal with IntersectionObserver ──────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.revealDelay || '0', 10);
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, delay);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealEls.forEach(function (el, index) {
      // Stagger siblings within same parent
      const siblingsInGroup = Array.from(el.parentNode.querySelectorAll(':scope > .reveal'));
      const siblingIndex = siblingsInGroup.indexOf(el);
      if (siblingIndex > 0) {
        el.dataset.revealDelay = String(siblingIndex * 90);
      }
      revealObserver.observe(el);
    });
  } else {
    // Fallback for old browsers
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ── 5. Writing cards — stagger on grid reveal ───────────────── */
  const writingCards = document.querySelectorAll('.writing-card');
  writingCards.forEach(function (card, i) {
    card.dataset.revealDelay = String(i * 70);
  });

  /* ── 6. Trait items — stagger ────────────────────────────────── */
  const traitItems = document.querySelectorAll('.trait-item');
  traitItems.forEach(function (item, i) {
    item.dataset.revealDelay = String(i * 60);
  });

  /* ── 7. Connect items — stagger ──────────────────────────────── */
  const connectItems = document.querySelectorAll('.connect-item');
  connectItems.forEach(function (item, i) {
    item.dataset.revealDelay = String(i * 55);
  });

  /* ── 8. Active nav link highlight on scroll ──────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        allNavLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ── 9. Subtle hero parallax on mouse move ───────────────────── */
  const heroGlyph = document.querySelector('.hero-bg-glyph');
  const hero = document.getElementById('hero');

  if (heroGlyph && hero) {
    hero.addEventListener('mousemove', function (e) {
      const rect = hero.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (e.clientX - rect.left - cx) / cx;
      const dy = (e.clientY - rect.top - cy) / cy;
      heroGlyph.style.transform =
        'translateY(-50%) translate(' + dx * 18 + 'px, ' + dy * 10 + 'px)';
    });

    hero.addEventListener('mouseleave', function () {
      heroGlyph.style.transform = 'translateY(-50%)';
      heroGlyph.style.transition = 'transform 1s cubic-bezier(.16,1,.3,1)';
    });

    hero.addEventListener('mouseenter', function () {
      heroGlyph.style.transition = 'transform 0.15s linear';
    });
  }

})();
