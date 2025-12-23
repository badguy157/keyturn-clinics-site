/**
 * Keyturn Studio Contact Form Handler
 * 
 * Features:
 * - Client-side validation with friendly errors
 * - Honeypot spam protection
 * - Loading state on submit
 * - Success state inline (no redirect)
 * - Error state inline with fallback to email
 */

(function() {
  'use strict';

  function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const loadingText = document.getElementById('loadingText');
    const successMsg = document.getElementById('formSuccess');
    const errorMsg = document.getElementById('formError');
    const errorMessage = document.getElementById('errorMessage');

    if (!form) return;

    // Handle "Send a quick request" button - scroll to form and focus first input
    const quickRequestLinks = document.querySelectorAll('a[href="#contact-form"]');
    quickRequestLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const formSection = document.getElementById('contact-form');
        const firstInput = document.getElementById('clinicName');
        
        if (formSection) {
          // Smooth scroll to form
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
          const elementPosition = formSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight - 20;
          
          window.scrollTo({ 
            top: offsetPosition, 
            behavior: 'smooth' 
          });
          
          // Focus first input after scroll completes
          // Use requestAnimationFrame to ensure DOM has updated after scroll starts
          const focusAfterScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (Math.abs(scrollTop - offsetPosition) < 5) {
              // Scroll completed or close enough
              if (firstInput) {
                firstInput.focus();
              }
            } else {
              // Check again on next frame
              requestAnimationFrame(focusAfterScroll);
            }
          };
          
          // Start checking after a brief delay to let smooth scroll begin
          setTimeout(() => requestAnimationFrame(focusAfterScroll), 100);
        }
      });
    });

    // Form submission handler
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Remove any existing error state
      form.classList.remove('show-errors');
      successMsg.style.display = 'none';
      errorMsg.style.display = 'none';
      
      // Clear all inline error messages
      const errorDivs = form.querySelectorAll('.form-field-error');
      errorDivs.forEach(div => {
        div.textContent = '';
      });

      // Mirror clinic name to hidden company field for backward compatibility
      const clinicNameInput = document.getElementById('clinicName');
      const companyHidden = document.getElementById('company');
      if (clinicNameInput && companyHidden) {
        companyHidden.value = clinicNameInput.value;
      }

      // Check honeypot
      const honeypot = document.getElementById('honeypot_company');
      if (honeypot && honeypot.value) {
        // Honeypot was filled - likely spam
        console.warn('Honeypot triggered');
        showError('Please try again.');
        return;
      }

      // Validate form
      if (!form.checkValidity()) {
        form.classList.add('show-errors');
        
        // Show inline error messages
        showInlineErrors();
        
        // Find first invalid field and focus it
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
          // Scroll to first error with offset for sticky header
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
          const elementPosition = firstInvalid.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight - 20;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        return;
      }

      // Get form data
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        if (key !== 'honeypot_company') { // Exclude honeypot
          data[key] = value;
        }
      });

      // Show loading state
      submitBtn.disabled = true;
      submitText.style.display = 'none';
      loadingText.style.display = 'inline';

      try {
        // Send to backend (for now, use mailto as fallback since this is a static site)
        // In production, this would be replaced with a proper API endpoint
        const response = await submitForm(data);

        if (response.success) {
          showSuccess();
          form.reset();
        } else {
          showError(response.message || 'Something went wrong. Please try emailing hello@keyturn.studio directly.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        showError('Something went wrong. Please try emailing hello@keyturn.studio directly.');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        loadingText.style.display = 'none';
      }
    });

    // Real-time validation - remove error styling when user starts typing
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        if (form.classList.contains('show-errors') && this.checkValidity()) {
          // Remove visual error state for this field when it becomes valid
          this.classList.remove('invalid');
          // Clear inline error message
          const errorDiv = document.getElementById(this.id + '-error');
          if (errorDiv) {
            errorDiv.textContent = '';
          }
        }
      });
    });

    function showInlineErrors() {
      const fieldMessages = {
        'clinicName': 'Please enter your clinic or practice name',
        'websiteUrl': 'Please enter a valid website URL',
        'contactName': 'Please enter your name',
        'email': 'Please enter a valid email address',
        'contactMethod': 'Please select your preferred contact method',
        'improvement': 'Please select what you want to improve'
      };

      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        if (!input.checkValidity() && input.id && fieldMessages[input.id]) {
          const errorDiv = document.getElementById(input.id + '-error');
          if (errorDiv) {
            errorDiv.textContent = fieldMessages[input.id];
          }
        }
      });
    }

    function showSuccess() {
      successMsg.style.display = 'block';
      errorMsg.style.display = 'none';
      
      // Scroll to success message
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
      const elementPosition = successMsg.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

      // Track event if GA4 is available
      if (window.safeEvent) {
        window.safeEvent('contact_form_submit', {
          form_location: 'contact_page'
        });
      }
    }

    function showError(message) {
      errorMsg.style.display = 'block';
      successMsg.style.display = 'none';
      if (message) {
        errorMessage.textContent = message;
      }

      // Scroll to error message
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
      const elementPosition = errorMsg.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }

    /**
     * Submit form data to backend
     * Uses the /api/contact endpoint for proper email handling
     */
    async function submitForm(data) {
      console.log('Form submission data:', data);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            ...data,
            // Add metadata for tracking
            pagePath: window.location.pathname,
            referrer: document.referrer,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            userAgent: navigator.userAgent
          })
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
          return { 
            success: false, 
            message: result.error || 'Something went wrong. Please try emailing hello@keyturn.studio directly.' 
          };
        }

        // Success - internal email sent
        // Note: result.confirm_ok indicates if confirmation email was sent
        // We don't show an error if confirmation fails (per spec)
        return { success: true };
      } catch (error) {
        console.error('Form submission error:', error);
        return { 
          success: false, 
          message: 'Something went wrong. Please try emailing hello@keyturn.studio directly.' 
        };
      }
    }
  }

  // Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();
