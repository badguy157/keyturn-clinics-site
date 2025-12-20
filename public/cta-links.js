// CTA Link Wiring - Assigns hrefs to buttons based on data-kt-link attributes
(function() {
  'use strict';

  // Map data-kt-link values to KEYTURN_OFFERS properties
  const linkMap = {
    'quick-scan': 'quickScanUrl',
    'deep-scan': 'deepScanUrl',
    'quote': 'quoteUrl',
    'blueprint': 'blueprintUrl'
  };

  // Wire up CTA links when DOM is ready
  function wireCTALinks() {
    if (!window.KEYTURN_OFFERS) {
      console.warn('KEYTURN_OFFERS not found. CTA links will not be wired.');
      return;
    }

    // Find all elements with data-kt-link attribute
    const ctaElements = document.querySelectorAll('[data-kt-link]');
    
    ctaElements.forEach(element => {
      const linkType = element.getAttribute('data-kt-link');
      const offerKey = linkMap[linkType];
      
      if (offerKey && window.KEYTURN_OFFERS[offerKey]) {
        element.href = window.KEYTURN_OFFERS[offerKey];
      } else {
        console.warn(`Unknown link type or missing URL for data-kt-link="${linkType}"`);
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireCTALinks);
  } else {
    // DOM already loaded
    wireCTALinks();
  }
})();
