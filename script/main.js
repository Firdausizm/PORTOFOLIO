/* ============================================================
   MAIN.JS — Portfolio Interactions
   Spasex Design Language — Minimal, mission-focused
   ============================================================ */

'use strict';

/* ============================================================
   NAVIGATION — Scroll behavior + Hamburger
   ============================================================ */

(function initNav() {
  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('nav-hamburger');
  const drawer     = document.getElementById('nav-drawer');
  const drawerLinks = document.querySelectorAll('.nav__drawer-link');

  if (!nav) return;

  // --- Scroll: darken nav after leaving hero ---
  const onScroll = () => {
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // --- Hamburger toggle ---
  if (!hamburger || !drawer) return;

  const openDrawer = () => {
    hamburger.classList.add('is-open');
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    hamburger.classList.remove('is-open');
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('is-open');
    isOpen ? closeDrawer() : openDrawer();
  });

  // Close drawer when a link is clicked
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
})();

/* ============================================================
   SMOOTH SCROLL — Anchor links
   ============================================================ */

(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.getElementById('nav')?.offsetHeight ?? 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   SCROLL REVEAL — IntersectionObserver
   ============================================================ */

(function initScrollReveal() {
  const opts = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, opts);

  // Observe all .reveal and .reveal-stagger elements
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    observer.observe(el);
  });
})();

/* ============================================================
   HERO — Subtle parallax on background
   ============================================================ */

(function initHeroParallax() {
  const heroBg = document.querySelector('#hero .band__bg');
  if (!heroBg) return;

  // Only on desktop — skip on mobile for performance
  if (window.matchMedia('(max-width: 767px)').matches) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    // Move background up slightly as user scrolls down
    heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
  }, { passive: true });
})();

/* ============================================================
   ACTIVE NAV LINK — highlight current section
   ============================================================ */

(function initActiveNavLink() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link[data-section]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.opacity = link.dataset.section === id ? '1' : '0.5';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
})();

/* ============================================================
   HERO TITLE — Typewriter-style stagger on load
   ============================================================ */

(function initHeroEntrance() {
  const heroContent = document.querySelector('.hero__entrance');
  if (!heroContent) return;

  // Delay slightly to let page paint first
  setTimeout(() => {
    heroContent.classList.add('is-visible');
  }, 200);
})();
