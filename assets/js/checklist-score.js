/**
 * Checklist Score Calculator
 * Interactive scoring widget for clinic website checklist
 */

(function() {
  'use strict';

  // State
  let checkboxes = [];
  let scoreValue;
  let scoreBandTitle;
  let scoreBandBody;
  let recommendedCta;
  let resetBtn;
  let sendResultsBtn;
  let resultsEmail;
  let emailStatusMessage;

  // Initialize on DOM ready
  function init() {
    cacheElements();
    attachEventListeners();
    updateScore(); // Initial render
  }

  // Cache DOM elements
  function cacheElements() {
    checkboxes = document.querySelectorAll('input[type="checkbox"][data-check-item]');
    scoreValue = document.getElementById('scoreValue');
    scoreBandTitle = document.getElementById('scoreBandTitle');
    scoreBandBody = document.getElementById('scoreBandBody');
    recommendedCta = document.getElementById('recommendedCta');
    resetBtn = document.getElementById('resetBtn');
    sendResultsBtn = document.getElementById('sendResultsBtn');
    resultsEmail = document.getElementById('resultsEmail');
    emailStatusMessage = document.getElementById('emailStatusMessage');
  }

  // Attach all event listeners
  function attachEventListeners() {
    // Listen to checkbox changes
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateScore);
    });

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', resetChecklist);
    }

    // Send results button
    if (sendResultsBtn) {
      sendResultsBtn.addEventListener('click', sendResults);
    }
  }

  // Calculate and update score
  function updateScore() {
    const score = Array.from(checkboxes).filter(cb => cb.checked).length;
    
    // Update score display
    if (scoreValue) {
      scoreValue.textContent = score;
    }

    // Update band based on score
    updateBand(score);
  }

  // Update band title, body, and CTA based on score
  function updateBand(score) {
    let title, body, ctaText, ctaHref, ctaAttrs;

    if (score <= 7) {
      // 0-7: Leaking bookings
      title = "Leaking bookings";
      body = "Your site is likely losing patient bookings. A rebuild or significant refresh could make a big difference. Let's start with a quick Fit Check to see what's possible.";
      ctaText = "Book 15-min Fit Check";
      ctaHref = "#";
      ctaAttrs = {
        'data-booking-open': 'true',
        'data-booking-source': 'checklist',
        'data-booking-interest': 'Fit Check'
      };
    } else if (score <= 10) {
      // 8-10: Good foundation, clear leaks
      title = "Good foundation, clear leaks";
      body = "You have a solid base, but there are clear opportunities to improve conversions. Start with our Free Scan to identify specific issues and get a Blueprint for fixing them.";
      ctaText = "Run Free Scan";
      ctaHref = "https://scan.keyturn.studio/";
      ctaAttrs = {
        'target': '_blank',
        'rel': 'noopener'
      };
    } else {
      // 11-15: Strong foundation
      title = "Strong foundation";
      body = "Your site is in good shape! You're ready for strategic growth upgrades and optimization. Get a custom quote to take your patient flow to the next level.";
      ctaText = "Get a quote";
      ctaHref = "/quote.html";
      ctaAttrs = {};
    }

    // Update UI
    if (scoreBandTitle) {
      scoreBandTitle.textContent = title;
    }
    if (scoreBandBody) {
      scoreBandBody.textContent = body;
    }
    if (recommendedCta) {
      recommendedCta.textContent = ctaText;
      recommendedCta.href = ctaHref;
      
      // Clear existing data attributes
      recommendedCta.removeAttribute('data-booking-open');
      recommendedCta.removeAttribute('data-booking-source');
      recommendedCta.removeAttribute('data-booking-interest');
      recommendedCta.removeAttribute('target');
      recommendedCta.removeAttribute('rel');
      
      // Set new attributes
      Object.keys(ctaAttrs).forEach(key => {
        recommendedCta.setAttribute(key, ctaAttrs[key]);
      });
    }
  }

  // Reset checklist
  function resetChecklist() {
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    updateScore();
    
    // Clear email input
    if (resultsEmail) {
      resultsEmail.value = '';
    }
    
    // Hide email status message
    if (emailStatusMessage) {
      emailStatusMessage.style.display = 'none';
    }
  }

  // Send results via email
  function sendResults() {
    const email = resultsEmail ? resultsEmail.value.trim() : '';
    
    // Basic email validation
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    // Calculate current score
    const score = Array.from(checkboxes).filter(cb => cb.checked).length;
    
    // Determine band
    let band;
    if (score <= 7) {
      band = "Leaking bookings (0-7)";
    } else if (score <= 10) {
      band = "Good foundation, clear leaks (8-10)";
    } else {
      band = "Strong foundation (11-15)";
    }
    
    // Get missed items (unchecked)
    const missedItems = [];
    checkboxes.forEach(checkbox => {
      if (!checkbox.checked) {
        const labelText = checkbox.parentElement.querySelector('span').textContent;
        missedItems.push(labelText);
      }
    });
    
    // Build mailto link
    const subject = encodeURIComponent(`Checklist Score ${score}/15`);
    const bodyParts = [
      `Email: ${email}`,
      ``,
      `Score: ${score}/15`,
      `Band: ${band}`,
      ``,
      `Missed items (${missedItems.length}):`,
      ...missedItems.map((item, index) => `${index + 1}. ${item}`)
    ];
    const body = encodeURIComponent(bodyParts.join('\n'));
    
    const mailtoLink = `mailto:hello@keyturn.studio?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show confirmation message
    if (emailStatusMessage) {
      emailStatusMessage.textContent = 'Email draft opened ✓';
      emailStatusMessage.style.display = 'block';
      
      // Hide message after 5 seconds
      setTimeout(() => {
        emailStatusMessage.style.display = 'none';
      }, 5000);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
