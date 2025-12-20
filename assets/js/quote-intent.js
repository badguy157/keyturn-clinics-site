// Quote intent mode handler for quote.html
(function() {
  'use strict';

  // Cache DOM elements
  let elements = null;

  // Get intent from URL query string
  function getIntent() {
    const params = new URLSearchParams(window.location.search);
    const intent = params.get('intent');
    return intent === 'blueprint' ? 'blueprint' : 'quote';
  }

  // Update URL without reload
  function updateURL(intent) {
    // Validate intent parameter
    if (intent !== 'quote' && intent !== 'blueprint') {
      intent = 'quote'; // Default to quote if invalid
    }
    const url = new URL(window.location);
    url.searchParams.set('intent', intent);
    window.history.replaceState({}, '', url);
  }

  // Update UI based on intent
  function updateUI(intent) {
    if (!elements) return;

    if (intent === 'blueprint') {
      // Blueprint mode
      if (elements.heroTitle) elements.heroTitle.textContent = 'Clinic Booking Blueprint';
      if (elements.heroLede) elements.heroLede.textContent = 'A clear plan first. $1,000 credited if you hire us.';
      if (elements.submitBtn) elements.submitBtn.textContent = 'Start the Blueprint';
      
      // Update toggle active states
      if (elements.toggleQuote) elements.toggleQuote.classList.remove('is-active');
      if (elements.toggleBlueprint) elements.toggleBlueprint.classList.add('is-active');
      
      // Pre-select the blueprint radio option
      if (elements.blueprintRadio) elements.blueprintRadio.checked = true;
    } else {
      // Quote mode (default)
      if (elements.heroTitle) elements.heroTitle.textContent = 'Get a clear, no-pressure quote';
      if (elements.heroLede) elements.heroLede.textContent = 'We review your site and booking setup. Then we send one clear email with your recommended package and price.';
      if (elements.submitBtn) elements.submitBtn.textContent = 'Get my clear quote';
      
      // Update toggle active states
      if (elements.toggleQuote) elements.toggleQuote.classList.add('is-active');
      if (elements.toggleBlueprint) elements.toggleBlueprint.classList.remove('is-active');
      
      // Pre-select the full rebuild radio option
      if (elements.rebuildRadio) elements.rebuildRadio.checked = true;
    }
  }

  // Initialize on page load
  function init() {
    // Cache all DOM elements
    elements = {
      heroTitle: document.querySelector('.hero-title'),
      heroLede: document.querySelector('.hero-lede'),
      submitBtn: document.querySelector('#qsSubmit span'),
      toggleQuote: document.querySelector('#toggle-quote'),
      toggleBlueprint: document.querySelector('#toggle-blueprint'),
      blueprintRadio: document.querySelector('input[name="start_type"][value="blueprint_first"]'),
      rebuildRadio: document.querySelector('input[name="start_type"][value="full_rebuild"]')
    };

    const currentIntent = getIntent();
    updateUI(currentIntent);

    // Add click handlers to toggle buttons
    if (elements.toggleQuote) {
      elements.toggleQuote.addEventListener('click', function() {
        updateURL('quote');
        updateUI('quote');
      });
    }

    if (elements.toggleBlueprint) {
      elements.toggleBlueprint.addEventListener('click', function() {
        updateURL('blueprint');
        updateUI('blueprint');
      });
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
