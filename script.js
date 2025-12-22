console.log('Hello!');

/**
 * Path Chooser Module
 * Handles the interactive path selection on the services page
 */
(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPathChooser);
  } else {
    initPathChooser();
  }

  function initPathChooser() {
    const pathOptions = document.querySelectorAll('.path-option');
    const pathTitle = document.getElementById('pathTitle');
    const pathBullets = document.getElementById('pathBullets');
    const pathCta = document.getElementById('pathCta');

    if (pathOptions.length === 0 || !pathTitle || !pathBullets || !pathCta) {
      // Path chooser not on this page
      return;
    }

    // Data map for each path option
    const pathData = {
      scan: {
        title: 'Free Quick Scan',
        bullets: [
          'You want to see what\'s leaking bookings (no commitment)',
          'You\'re not ready to talk to anyone yet',
          'You need quick wins you can fix yourself'
        ],
        ctaText: 'Run Free Scan',
        href: 'https://scan.keyturn.studio/',
        target: '_blank',
        rel: 'noopener',
        dataAttributes: {}
      },
      blueprint: {
        title: '$1,000 Booking Blueprint',
        bullets: [
          'You ran the free scan and want the full picture',
          'You need a clear roadmap with priorities and ROI',
          'You want to see exactly what a rebuild would include'
        ],
        ctaText: 'Start the Blueprint',
        href: '#',
        target: '',
        rel: '',
        dataAttributes: {
          'data-booking-open': 'true',
          'data-booking-source': 'services',
          'data-booking-interest': 'Clinic Booking Blueprint'
        }
      },
      quote: {
        title: 'Get a Rebuild Quote',
        bullets: [
          'You\'re ready to commit to a full website rebuild',
          'You want a no-pressure quote and package recommendation',
          'You need to see pricing before moving forward'
        ],
        ctaText: 'Get a Quote',
        href: '/quote.html',
        target: '',
        rel: '',
        dataAttributes: {}
      }
    };

    // Handle path option clicks
    pathOptions.forEach(function(option) {
      option.addEventListener('click', function() {
        const selectedKey = this.getAttribute('data-key');
        switchPath(selectedKey);
      });

      // Handle keyboard navigation
      option.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const selectedKey = this.getAttribute('data-key');
          switchPath(selectedKey);
        }
      });
    });

    function switchPath(key) {
      const data = pathData[key];
      if (!data) return;

      // Update option states
      pathOptions.forEach(function(option) {
        const isSelected = option.getAttribute('data-key') === key;
        option.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        option.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        if (isSelected) {
          option.classList.add('is-active');
        } else {
          option.classList.remove('is-active');
        }
      });

      // Update detail panel content
      pathTitle.textContent = data.title;
      
      // Update bullets
      pathBullets.innerHTML = '';
      data.bullets.forEach(function(bullet) {
        const li = document.createElement('li');
        li.textContent = bullet;
        pathBullets.appendChild(li);
      });
      
      // Update CTA
      pathCta.textContent = data.ctaText;
      pathCta.href = data.href;
      
      // Set or remove target attribute
      if (data.target) {
        pathCta.setAttribute('target', data.target);
      } else {
        pathCta.removeAttribute('target');
      }
      
      // Set or remove rel attribute
      if (data.rel) {
        pathCta.setAttribute('rel', data.rel);
      } else {
        pathCta.removeAttribute('rel');
      }
      
      // Clear old data attributes and set new ones
      pathCta.removeAttribute('data-booking-open');
      pathCta.removeAttribute('data-booking-source');
      pathCta.removeAttribute('data-booking-interest');
      
      Object.keys(data.dataAttributes).forEach(function(attr) {
        pathCta.setAttribute(attr, data.dataAttributes[attr]);
      });
    }

    // Default selection on load = scan
    switchPath('scan');
  }
})();
