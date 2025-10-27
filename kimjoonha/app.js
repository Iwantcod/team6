

// app.js — 공통 스크립트
(function () {
  // ==== 인트로 on-load 순차 등장 ====
  (function introOnLoad() {
    const els = Array.from(document.querySelectorAll('.reveal-onload'))
      .sort((a, b) => {
        const oa = Number(a.getAttribute('data-onload-order')) || 0;
        const ob = Number(b.getAttribute('data-onload-order')) || 0;
        return oa - ob;
      });
    if (!els.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      els.forEach(el => el.classList.add('show'));
      return;
    }
    const baseDelay = 80;
    const step = 280;

    window.addEventListener('DOMContentLoaded', () => {
      els.forEach((el, i) => {
        el.style.willChange = 'opacity, transform';
        setTimeout(() => el.classList.add('show'), baseDelay + i * step);
        const cleanup = () => { el.style.willChange = ''; el.removeEventListener('transitionend', cleanup); };
        el.addEventListener('transitionend', cleanup);
      });
    });
  })();

  // ==== Pinned scrollytelling ====
  (function setupPinnedScene() {
    const scene = document.getElementById('pinScene');
    if (!scene) return;

    const viewport = scene.querySelector('.pin-viewport');
    const slides = Array.from(scene.querySelectorAll('.pin-slide'));
    const hint = scene.querySelector('.pin-hint');
    if (!slides.length || !viewport || !hint) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function adjustHeight() {
      const steps = slides.length;
      scene.style.height = `${Math.max(steps * 120, 200)}vh`;
    }
    adjustHeight();
    window.addEventListener('resize', adjustHeight);

    let current = 0;
    function setActive(i) {
      if (reduce) {
        slides.forEach(s => s.classList.add('is-active'));
        hint.classList.add('state-after');
        hint.classList.remove('state-intro');
        return;
      }
      if (i === current) return;
      current = i;
      slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
      if (i === 0) {
        hint.classList.add('state-intro');
        hint.classList.remove('state-after');
      } else {
        hint.classList.add('state-after');
        hint.classList.remove('state-intro');
      }
    }

    function onScroll() {
      const rect = scene.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScrollable = scene.offsetHeight - vh;

      if (rect.top > 0) { setActive(0); return; }
      if (rect.bottom < vh) { setActive(slides.length - 1); return; }

      const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);
      const progress = totalScrollable > 0 ? scrolled / totalScrollable : 0;
      const idx = Math.min(slides.length - 1, Math.max(0, Math.floor(progress * slides.length + 0.02)));
      setActive(idx);
    }

    slides.forEach((s, k) => s.classList.toggle('is-active', k === 0));
    hint.classList.add('state-intro');
    hint.classList.remove('state-after');

    window.addEventListener('scroll', onScroll, { passive: true });

    const nextBtn = document.getElementById('nextSlideBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const vh = window.innerHeight;
        window.scrollBy({ top: Math.round(vh * 1.1), behavior: 'smooth' });
      });
    }
  })();
})();