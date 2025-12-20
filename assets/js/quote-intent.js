// Quote intent mode handler for quote.html
(function() {
  'use strict';

  // Get intent from URL query string
  function getIntent() {
    const params = new URLSearchParams(window.location.search);
    const intent = params.get('intent');
    return intent === 'blueprint' ? 'blueprint' : 'quote';
  }

  // Update URL without reload
  function updateURL(intent) {
    const url = new URL(window.location);
    url.searchParams.set('intent', intent);
    window.history.replaceState({}, '', url);
  }

  // Update UI based on intent
  function updateUI(intent) {
    const heroTitle = document.querySelector('.hero-title');
    const heroLede = document.querySelector('.hero-lede');
    const submitBtn = document.querySelector('#qsSubmit span');
    const toggleQuote = document.querySelector('#toggle-quote');
    const toggleBlueprint = document.querySelector('#toggle-blueprint');

    if (intent === 'blueprint') {
      // Blueprint mode
      if (heroTitle) heroTitle.textContent = 'Clinic Booking Blueprint';
      if (heroLede) heroLede.textContent = 'A clear plan first. $1,000 credited if you hire us.';
      if (submitBtn) submitBtn.textContent = 'Start the Blueprint';
      
      // Update toggle active states
      if (toggleQuote) toggleQuote.classList.remove('is-active');
      if (toggleBlueprint) toggleBlueprint.classList.add('is-active');
      
      // Pre-select the blueprint radio option
      const blueprintRadio = document.querySelector('input[name="start_type"][value="blueprint_first"]');
      if (blueprintRadio) blueprintRadio.checked = true;
    } else {
      // Quote mode (default)
      if (heroTitle) heroTitle.textContent = 'Get a clear, no-pressure quote';
      if (heroLede) heroLede.textContent = 'We review your site and booking setup. Then we send one clear email with your recommended package and price.';
      if (submitBtn) submitBtn.textContent = 'Get my clear quote';
      
      // Update toggle active states
      if (toggleQuote) toggleQuote.classList.add('is-active');
      if (toggleBlueprint) toggleBlueprint.classList.remove('is-active');
      
      // Pre-select the full rebuild radio option
      const rebuildRadio = document.querySelector('input[name="start_type"][value="full_rebuild"]');
      if (rebuildRadio) rebuildRadio.checked = true;
    }
  }

  // Initialize on page load
  function init() {
    const currentIntent = getIntent();
    updateUI(currentIntent);

    // Add click handlers to toggle buttons
    const toggleQuote = document.querySelector('#toggle-quote');
    const toggleBlueprint = document.querySelector('#toggle-blueprint');

    if (toggleQuote) {
      toggleQuote.addEventListener('click', function() {
        updateURL('quote');
        updateUI('quote');
      });
    }

    if (toggleBlueprint) {
      toggleBlueprint.addEventListener('click', function() {
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
