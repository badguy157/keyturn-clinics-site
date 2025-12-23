/**
 * Keyturn Studio Site-wide JavaScript
 * - Consistent nav/header injection
 * - GA4 event helper (safeEvent)
 * - Mobile menu functionality
 */

(function() {
  'use strict';

  // ===== GA4 Event Helper =====
  window.safeEvent = function(eventName, eventParams) {
    if (typeof gtag === 'function') {
      try {
        gtag('event', eventName, eventParams || {});
      } catch (e) {
        console.warn('GA4 event failed:', eventName, e);
      }
    }
  };

  // ===== Header Injection =====
  function injectHeader() {
    // Skip injection if header already exists (e.g., custom headers on specific pages)
    if (document.querySelector('.site-header')) {
      return;
    }
    
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/index';
    const isActive = (path) => {
      const normalized = path.replace(/\/$/, '');
      return currentPath === normalized || currentPath === normalized + '.html';
    };

    const headerHTML = `
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
  <div class="container header-bar">
    <a class="brand" href="/" aria-label="Keyturn Studio home">
      <img src="/public/logo.svg?v=2" alt="Keyturn Studio" width="180" height="56" decoding="async">
    </a>

    <!-- Desktop nav -->
    <nav class="nav-desktop" aria-label="Primary">
      <ul class="nav-list">
        <li><a href="/services.html"${isActive('/services') ? ' aria-current="page"' : ''}>Services</a></li>
        <li><a href="/proof.html"${isActive('/proof') ? ' aria-current="page"' : ''}>Proof</a></li>
        <li><a href="/pricing.html"${isActive('/pricing') ? ' aria-current="page"' : ''}>Pricing</a></li>
        <li><a href="/how-it-works.html"${isActive('/how-it-works') ? ' aria-current="page"' : ''}>How it works</a></li>
        <li><a href="/quote.html"${isActive('/quote') ? ' aria-current="page"' : ''}>Get a quote</a></li>
        <li><a href="/blog.html"${isActive('/blog') ? ' aria-current="page"' : ''}>Blog</a></li>
        <li><a href="/contact.html"${isActive('/contact') ? ' aria-current="page"' : ''}>Contact</a></li>
      </ul>
      <div class="nav-ctas">
        <a class="nav-tel" href="tel:+12025961574" aria-label="Call Keyturn Studio">Call</a>
        <a class="btn btn-primary" href="#" data-booking-open="true" data-booking-source="navbar" aria-label="Book 15-minute Fit Check">Book 15-min Fit Check</a>
        <a class="btn btn-ghost" href="https://scan.keyturn.studio/" target="_blank" rel="noopener">Run Free Scan</a>
      </div>
    </nav>

    <!-- Mobile hamburger -->
    <button class="menu-toggle" aria-controls="mobileMenu" aria-expanded="false" data-menu-toggle>
      <span class="sr-only">Toggle menu</span>☰
    </button>
  </div>

  <!-- Mobile drawer -->
  <nav id="mobileMenu" class="mobile-drawer" hidden aria-label="Mobile">
    <a href="/services.html">Services</a>
    <a href="/proof.html">Proof</a>
    <a href="/pricing.html">Pricing</a>
    <a href="/how-it-works.html">How it works</a>
    <a href="/quote.html"${isActive('/quote') ? ' aria-current="page"' : ''}>Get a quote</a>
    <a href="/blog.html">Blog</a>
    <a href="/contact.html">Contact</a>
    <a class="mobile-menu-tel" href="tel:+12025961574">Call (202) 596-1574</a>
    <a class="btn btn-primary w-full" href="#" data-booking-open="true" data-booking-source="navbar-mobile">Book 15-min Fit Check</a>
    <a class="btn btn-ghost w-full" href="https://scan.keyturn.studio/" target="_blank" rel="noopener">Run Free Scan</a>
  </nav>
</header>
    `.trim();

    // Insert at the beginning of body
    if (document.body && document.body.firstChild) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = headerHTML;
      while (tempDiv.firstChild) {
        document.body.insertBefore(tempDiv.firstChild, document.body.firstChild);
      }
    }
  }

  // ===== Mobile Menu Toggle =====
  function initMobileMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const drawer = document.getElementById('mobileMenu');
    
    if (toggle && drawer) {
      const closeDrawer = () => {
        drawer.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
        document.body.classList.remove('nav-open');
      };

      toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        drawer.hidden = open;
        document.body.classList.toggle('no-scroll', !open);
        document.body.classList.toggle('nav-open', !open);
      });

      drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
    }
  }

  // ===== Services Dropdown =====
  function initServicesDropdown() {
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');
    const dropdown = document.querySelector('.nav-dropdown');
    
    if (dropdownToggle && dropdownMenu && dropdown) {
      let closeTimeout = null;

      // Click toggle
      dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
        dropdownToggle.setAttribute('aria-expanded', String(!isExpanded));
        dropdownMenu.hidden = isExpanded;
      });

      // Hover - with delay on close
      const openDropdown = () => {
        if (closeTimeout) {
          clearTimeout(closeTimeout);
          closeTimeout = null;
        }
        dropdownToggle.setAttribute('aria-expanded', 'true');
        dropdownMenu.hidden = false;
      };

      const closeDropdown = () => {
        closeTimeout = setTimeout(() => {
          dropdownToggle.setAttribute('aria-expanded', 'false');
          dropdownMenu.hidden = true;
        }, 150);
      };

      dropdown.addEventListener('mouseenter', openDropdown);
      dropdown.addEventListener('mouseleave', closeDropdown);
      dropdownMenu.addEventListener('mouseenter', openDropdown);
      dropdownMenu.addEventListener('mouseleave', closeDropdown);

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownToggle.setAttribute('aria-expanded', 'false');
          dropdownMenu.hidden = true;
        }
      });

      // Keyboard navigation
      dropdownToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
          dropdownToggle.setAttribute('aria-expanded', String(!isExpanded));
          dropdownMenu.hidden = isExpanded;
          if (!isExpanded) {
            dropdownMenu.querySelector('a')?.focus();
          }
        }
      });
    }
  }

  // ===== Year Footer Update =====
  function updateYear() {
    const yearEl = document.getElementById('y');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ===== Scroll Reveal Animation with Intersection Observer =====
  function initScrollReveal() {
    // Check if browser supports Intersection Observer
    if (!('IntersectionObserver' in window)) {
      // Fallback: make all elements visible immediately
      document.querySelectorAll('.animate-on-scroll, .section-reveal, .card-grid-item, .checklist-item, .list-reveal').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    // Create observer with subtle threshold
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optional: unobserve after animation to improve performance
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal classes
    const elementsToAnimate = document.querySelectorAll(
      '.animate-on-scroll, .section-reveal, .card-grid-item, .checklist-item, .list-reveal'
    );
    
    elementsToAnimate.forEach(el => observer.observe(el));
  }

  // ===== Subtle Parallax Effect for Hero Mockups =====
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-mock-parallax');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        // Subtle parallax - move at 30% of scroll speed
        const yPos = -(scrolled * 0.3);
        // Limit parallax to first 800px of scroll to avoid excessive movement
        if (scrolled < 800) {
          el.style.transform = `translateY(${yPos}px)`;
        }
      });

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  // ===== Calendly Link Normalization =====
  function normalizeCalendlyLinks() {
    document.querySelectorAll('a.book-intro').forEach(a => {
      a.href = 'https://calendly.com/vinnie-keyturn/intro';
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  // ===== Inject Mobile Sticky CTA =====
  function injectMobileStickyCA() {
    const stickyHTML = `
<div class="mobile-sticky-cta" data-sticky-cta hidden>
  <a class="btn btn-primary mobile-sticky-primary"
     href="#"
     data-booking-open="true"
     data-booking-source="sticky"
     data-booking-interest="">
     Book 15-min Fit Check
  </a>

  <a class="mobile-sticky-secondary text-link-primary"
     href="https://scan.keyturn.studio/"
     target="_blank" rel="noopener">
     Run Free Scan
  </a>
</div>
    `.trim();

    // Insert before closing body tag
    if (document.body) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = stickyHTML;
      document.body.appendChild(tempDiv.firstChild);
    }
  }

  // ===== Configure Sticky CTA based on page =====
  function configureStickyCTA() {
    const stickyBar = document.querySelector('[data-sticky-cta]');
    if (!stickyBar) return;

    const primaryBtn = stickyBar.querySelector('.mobile-sticky-primary');
    const secondaryLink = stickyBar.querySelector('.mobile-sticky-secondary');
    
    if (!primaryBtn || !secondaryLink) return;

    // Determine current page type
    const pathname = window.location.pathname;
    const isBlogPage = pathname.includes('/blog') || pathname.endsWith('blog.html');
    const isProofPage = pathname.includes('/proof') || pathname.endsWith('proof.html');
    const isSpecialPage = isBlogPage || isProofPage;

    if (isSpecialPage) {
      // Blog/Proof: primary = Free Scan, secondary = Fit Check
      primaryBtn.textContent = 'Run Free Scan';
      primaryBtn.href = 'https://scan.keyturn.studio/';
      primaryBtn.setAttribute('target', '_blank');
      primaryBtn.setAttribute('rel', 'noopener');
      primaryBtn.removeAttribute('data-booking-open');
      primaryBtn.removeAttribute('data-booking-source');
      primaryBtn.removeAttribute('data-booking-interest');

      secondaryLink.textContent = 'Book 15-min Fit Check';
      secondaryLink.href = '#';
      secondaryLink.setAttribute('data-booking-open', 'true');
      secondaryLink.setAttribute('data-booking-source', 'sticky');
      secondaryLink.setAttribute('data-booking-interest', '');
      secondaryLink.removeAttribute('target');
      secondaryLink.removeAttribute('rel');
    }
    // Default case is already set in the HTML:
    // primary = Book Fit Check (with booking modal)
    // secondary = Run Free Scan (external link)

    // Show the sticky bar
    stickyBar.removeAttribute('hidden');

    // Re-attach booking modal listeners if needed (for dynamic content)
    if (window.attachBookingListeners && typeof window.attachBookingListeners === 'function') {
      window.attachBookingListeners();
    }
  }

  // ===== Initialize on DOMContentLoaded =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectHeader();
      initMobileMenu();
      initServicesDropdown();
      updateYear();
      normalizeCalendlyLinks();
      initScrollReveal();
      initParallax();
      injectMobileStickyCA();
      // Small delay to ensure booking.js has loaded
      setTimeout(configureStickyCTA, 100);
    });
  } else {
    injectHeader();
    initMobileMenu();
    initServicesDropdown();
    updateYear();
    normalizeCalendlyLinks();
    initScrollReveal();
    initParallax();
    injectMobileStickyCA();
    // Small delay to ensure booking.js has loaded
    setTimeout(configureStickyCTA, 100);
  }
})();
