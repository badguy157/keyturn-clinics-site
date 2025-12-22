/**
 * FadeInSection - Progressive enhancement for scroll-in animations
 * Uses IntersectionObserver for performant, viewport-based animations
 * Falls back gracefully when JS is disabled
 */

(function() {
  'use strict';

  // Initialize on DOMContentLoaded (don't wait for window.onload)
  document.addEventListener('DOMContentLoaded', function() {
    // Add 'js' class to <html> to enable CSS animations
    document.documentElement.classList.add('js');
    
    const els = document.querySelectorAll('.fade-in-section');
    
    if (!els.length) return;

    // Helper to show an element
    const show = function(el) {
      el.classList.add('is-visible');
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Immediately show all sections without animation
      els.forEach(show);
      return;
    }

    // Create IntersectionObserver with larger rootMargin for earlier trigger
    const io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          show(e.target);
          // Stop observing after animation triggers
          io.unobserve(e.target);
        }
      });
    }, {
      rootMargin: '150px 0px'
    });

    // Observe all sections
    els.forEach(function(el) {
      io.observe(el);
    });

    // Immediate pass: show elements already in/near viewport
    els.forEach(function(el) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.2) {
        show(el);
      }
    });

    // Safety fallback: force-visible any sections above the fold after 300ms
    setTimeout(function() {
      els.forEach(function(el) {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 1.4) {
          show(el);
        }
      });
    }, 300);
  });
})();
