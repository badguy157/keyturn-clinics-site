/**
 * Booking Modal
 * Lightweight modal for collecting booking inquiries
 */

(function() {
  'use strict';

  // Calendly URL for optional scheduling fallback
  const CALENDLY_URL = 'https://calendly.com/vinnie-keyturn/intro?utm_source=site';

  // State
  let currentStep = 1;
  let formData = {
    name: '',
    email: '',
    phone: '',
    treatment: '',
    timeWindow: '',
    source: ''
  };

  // Elements (will be cached after DOM ready)
  let overlay, modal, closeBtn;
  let step1, step2, thankYou;
  let stepDots;
  let focusableElements;
  let lastFocusedElement;

  // Initialize on DOM ready
  function init() {
    cacheElements();
    attachEventListeners();
  }

  // Cache DOM elements
  function cacheElements() {
    overlay = document.getElementById('booking-modal-overlay');
    modal = document.getElementById('booking-modal');
    closeBtn = document.querySelector('.booking-modal-close');
    step1 = document.getElementById('booking-step-1');
    step2 = document.getElementById('booking-step-2');
    thankYou = document.getElementById('booking-thank-you');
    stepDots = document.querySelectorAll('.booking-step-dot');
  }

  // Attach all event listeners
  function attachEventListeners() {
    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Overlay click (close on background click)
    if (overlay) {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          closeModal();
        }
      });
    }

    // ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
        closeModal();
      }
    });

    // Delegated click listener for booking triggers (handles dynamic content)
    document.addEventListener('click', function(e) {
      const trigger = e.target.closest('[data-booking-open]');
      if (!trigger) return;

      // Ignore if explicitly disabled
      if (trigger.getAttribute('data-booking-open') === 'false') return;

      // Prevent anchor navigation
      if (trigger.tagName === 'A') {
        e.preventDefault();
      }

      openBookingModal({
        source: trigger.getAttribute('data-booking-source') || '',
        interest: trigger.getAttribute('data-booking-interest') || ''
      });
    });

    // Form navigation
    const nextBtn = document.getElementById('booking-next-btn');
    const backBtn = document.getElementById('booking-back-btn');
    const confirmBtn = document.getElementById('booking-confirm-btn');

    if (nextBtn) {
      nextBtn.addEventListener('click', handleNext);
    }

    if (backBtn) {
      backBtn.addEventListener('click', handleBack);
    }

    if (confirmBtn) {
      confirmBtn.addEventListener('click', handleSubmit);
    }

    // Schedule now button (Calendly fallback)
    const scheduleBtn = document.getElementById('booking-schedule-now');
    if (scheduleBtn && CALENDLY_URL) {
      scheduleBtn.addEventListener('click', function() {
        window.open(CALENDLY_URL, '_blank', 'noopener');
      });
    }

    // Input change handlers to clear errors
    if (modal) {
      const inputs = modal.querySelectorAll('.booking-form-input, .booking-form-select');
      inputs.forEach(function(input) {
        input.addEventListener('input', function() {
          clearFieldError(input);
        });
        input.addEventListener('change', function() {
          clearFieldError(input);
        });
      });
    }
  }

  // Open modal
  function openBookingModal(opts) {
    opts = opts || {};
    
    // Guard: if modal doesn't exist on this page, warn and return
    if (!overlay || !modal) {
      console.warn('Booking modal not found on this page. Skipping modal open.');
      return;
    }
    
    // Store last focused element
    lastFocusedElement = document.activeElement;

    // Reset state
    currentStep = 1;
    formData = {
      name: '',
      email: '',
      phone: '',
      treatment: opts.interest || '',
      timeWindow: '',
      source: opts.source || ''
    };

    // Reset form
    resetForm();

    // Prefill treatment if provided
    if (opts.interest) {
      const treatmentSelect = document.getElementById('booking-treatment');
      if (treatmentSelect) {
        treatmentSelect.value = opts.interest;
      }
    }

    // Show modal - remove hidden attribute and update aria
    overlay.removeAttribute('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
    document.body.classList.add('booking-modal-open');
    document.documentElement.classList.add('kt-modal-open');

    // Show step 1
    showStep(1);

    // Focus first input
    setTimeout(function() {
      const nameInput = document.getElementById('booking-name');
      if (nameInput) {
        nameInput.focus();
      }
    }, 100);

    // Setup focus trap
    setupFocusTrap();
  }

  // Close modal
  function closeModal() {
    if (!overlay) return;
    
    overlay.classList.remove('active');
    overlay.setAttribute('hidden', '');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('booking-modal-open');
    document.documentElement.classList.remove('kt-modal-open');

    // Restore focus
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }

    // Reset after animation
    setTimeout(function() {
      resetForm();
      currentStep = 1;
      showStep(1);
    }, 300);
  }

  // Show specific step
  function showStep(stepNum) {
    currentStep = stepNum;

    // Hide all steps and thank you
    step1.classList.remove('active');
    step2.classList.remove('active');
    thankYou.classList.remove('active');

    // Show current step
    if (stepNum === 1) {
      step1.classList.add('active');
    } else if (stepNum === 2) {
      step2.classList.add('active');
      populateSummary();
    }

    // Update step indicators
    stepDots.forEach(function(dot, index) {
      if (index < stepNum) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Handle next button (Step 1 -> Step 2)
  function handleNext() {
    if (!validateStep1()) {
      return;
    }

    // Save form data from step 1
    formData.name = document.getElementById('booking-name').value.trim();
    formData.email = document.getElementById('booking-email').value.trim();
    formData.phone = document.getElementById('booking-phone').value.trim();
    formData.treatment = document.getElementById('booking-treatment').value;
    formData.timeWindow = document.getElementById('booking-time-window').value;

    // Move to step 2
    showStep(2);
  }

  // Handle back button (Step 2 -> Step 1)
  function handleBack() {
    showStep(1);
  }

  // Handle final submission
  async function handleSubmit() {
    const confirmBtn = document.getElementById('booking-confirm-btn');
    
    // Disable button to prevent double submission
    if (confirmBtn) {
      confirmBtn.disabled = true;
      confirmBtn.textContent = 'Sending...';
    }

    // Clear any previous errors
    clearSubmitError();

    // Create submission payload
    const submission = {
      created_at: new Date().toISOString(),
      timestamp: new Date().toISOString(), // TODO: Remove in future version (deprecated in favor of created_at)
      page_url: window.location.href,
      source: formData.source,
      interest: formData.treatment,
      user_agent: navigator.userAgent,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      treatment: formData.treatment,
      timeWindow: formData.timeWindow,
      pagePath: window.location.pathname,
      referrer: document.referrer,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    // Console log for debugging
    console.log('Booking submission:', submission);

    try {
      // Send to backend API
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submission)
      });

      const data = await response.json();

      // Check if backend confirms success
      if (response.ok && data.ok === true) {
        // Save to localStorage
        saveToLocalStorage(submission);

        // Show thank you state
        step2.classList.remove('active');
        thankYou.classList.add('active');

        // Auto close after 5 seconds
        setTimeout(function() {
          closeModal();
        }, 5000);
      } else {
        // Backend returned an error
        const errorMessage = data.error || 'Unable to submit booking request. Please try again.';
        console.error('Booking submission failed:', {
          status: response.status,
          data: data
        });
        
        showSubmitError(errorMessage);
        
        // Re-enable button
        if (confirmBtn) {
          confirmBtn.disabled = false;
          confirmBtn.textContent = 'Confirm Booking';
        }
      }
    } catch (error) {
      // Network or other error
      console.error('Booking submission error:', {
        error: error.message,
        stack: error.stack
      });
      
      showSubmitError('Network error. Please check your connection and try again.');
      
      // Re-enable button
      if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.textContent = 'Confirm Booking';
      }
    }
  }

  // Validate step 1
  function validateStep1() {
    let isValid = true;

    // Clear all errors first
    clearAllErrors();

    const name = document.getElementById('booking-name').value.trim();
    const email = document.getElementById('booking-email').value.trim();
    const phone = document.getElementById('booking-phone').value.trim();
    const treatment = document.getElementById('booking-treatment').value;
    const timeWindow = document.getElementById('booking-time-window').value;

    // Name is required
    if (!name) {
      showFieldError('booking-name', 'Name is required');
      isValid = false;
    }

    // At least one of email or phone is required
    if (!email && !phone) {
      showFieldError('booking-email', 'Please provide email or phone');
      showFieldError('booking-phone', 'Please provide email or phone');
      isValid = false;
    }

    // Email format validation (if provided)
    if (email && !isValidEmail(email)) {
      showFieldError('booking-email', 'Please enter a valid email');
      isValid = false;
    }

    // Treatment is required
    if (!treatment) {
      showFieldError('booking-treatment', 'Please select a treatment');
      isValid = false;
    }

    // Time window is required
    if (!timeWindow) {
      showFieldError('booking-time-window', 'Please select a preferred time');
      isValid = false;
    }

    return isValid;
  }

  // Show field error
  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    
    if (field) {
      field.classList.add('error');
    }
    
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('active');
    }
  }

  // Clear field error
  function clearFieldError(field) {
    field.classList.remove('error');
    const errorEl = document.getElementById(field.id + '-error');
    if (errorEl) {
      errorEl.classList.remove('active');
    }
  }

  // Clear all errors
  function clearAllErrors() {
    const errorFields = modal.querySelectorAll('.error');
    errorFields.forEach(function(field) {
      field.classList.remove('error');
    });

    const errorMessages = modal.querySelectorAll('.booking-form-error');
    errorMessages.forEach(function(error) {
      error.classList.remove('active');
    });
  }

  // Show submit error message
  function showSubmitError(message) {
    const submitError = document.getElementById('booking-submit-error');
    if (submitError) {
      submitError.textContent = message;
      submitError.classList.add('active');
    }
  }

  // Clear submit error message
  function clearSubmitError() {
    const submitError = document.getElementById('booking-submit-error');
    if (submitError) {
      submitError.classList.remove('active');
    }
  }

  // Email validation
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Populate summary in step 2
  function populateSummary() {
    document.getElementById('summary-name').textContent = formData.name;
    document.getElementById('summary-email').textContent = formData.email || '—';
    document.getElementById('summary-phone').textContent = formData.phone || '—';
    document.getElementById('summary-treatment').textContent = formData.treatment;
    document.getElementById('summary-time-window').textContent = formData.timeWindow;
  }

  // Save to localStorage
  function saveToLocalStorage(submission) {
    try {
      let leads = [];
      const stored = localStorage.getItem('kt_booking_leads');
      
      if (stored) {
        leads = JSON.parse(stored);
      }

      leads.push(submission);
      localStorage.setItem('kt_booking_leads', JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  // Reset form
  function resetForm() {
    const form = modal.querySelector('form');
    if (form) {
      form.reset();
    }
    clearAllErrors();
  }

  // Basic focus trap
  function setupFocusTrap() {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    focusableElements = modal.querySelectorAll(focusableSelectors.join(','));

    modal.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  // Expose global function
  window.openBookingModal = openBookingModal;

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
