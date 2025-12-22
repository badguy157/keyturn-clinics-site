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
    const pathDetails = document.querySelectorAll('.path-detail');

    if (pathOptions.length === 0 || pathDetails.length === 0) {
      // Path chooser not on this page
      return;
    }

    // Handle path option clicks
    pathOptions.forEach(function(option) {
      option.addEventListener('click', function() {
        const selectedPath = this.getAttribute('data-path');
        switchPath(selectedPath);
      });

      // Handle keyboard navigation
      option.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const selectedPath = this.getAttribute('data-path');
          switchPath(selectedPath);
        }
      });
    });

    function switchPath(pathName) {
      // Update option states
      pathOptions.forEach(function(option) {
        const isSelected = option.getAttribute('data-path') === pathName;
        option.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      });

      // Update detail panels
      pathDetails.forEach(function(detail) {
        const detailId = 'path-detail-' + pathName;
        if (detail.id === detailId) {
          detail.classList.add('active');
        } else {
          detail.classList.remove('active');
        }
      });
    }

    // Set default selection to Free Scan (first option)
    // This is already set in HTML, but we ensure it's active
    switchPath('scan');
  }
})();
