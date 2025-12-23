/**
 * Quote Page - Optional Details Toggle
 * Shows/hides optional form sections to reduce initial form length
 */

(function() {
  'use strict';

  function initOptionalDetailsToggle() {
    const toggleBtn = document.getElementById('optionalDetailsToggle');
    const container = document.getElementById('optionalDetailsContainer');
    
    // Gracefully handle missing elements
    if (!toggleBtn || !container) {
      return;
    }

    toggleBtn.addEventListener('click', function() {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        // Hide the optional details
        container.hidden = true;
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.textContent = 'Add more details (optional)';
      } else {
        // Show the optional details
        container.hidden = false;
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.textContent = 'Hide details';
        
        // Smooth scroll to the toggle button so user sees the expanded content
        setTimeout(function() {
          toggleBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOptionalDetailsToggle);
  } else {
    initOptionalDetailsToggle();
  }
})();
