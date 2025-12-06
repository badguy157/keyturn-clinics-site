/**
 * FadeInSection - Subtle scroll-in animations for sections
 * Uses IntersectionObserver for performant, viewport-based animations
 */

(function() {
  'use strict';

  // CSS for fade-in animation
  const styleId = 'fade-in-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }

      .fade-in-section.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        .fade-in-section {
          opacity: 1;
          transform: none;
          transition: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function initFadeInSections() {
    const sections = document.querySelectorAll('.fade-in-section');
    
    if (!sections.length) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Immediately show all sections without animation
      sections.forEach(section => section.classList.add('is-visible'));
      return;
    }

    // IntersectionObserver configuration
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px', // Trigger slightly before entering viewport
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class with a slight stagger if multiple sections
          entry.target.classList.add('is-visible');
          // Stop observing after animation triggers
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => observer.observe(section));
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFadeInSections);
  } else {
    initFadeInSections();
  }
})();
