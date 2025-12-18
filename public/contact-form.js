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

    // Form submission handler
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Remove any existing error state
      form.classList.remove('show-errors');
      successMsg.style.display = 'none';
      errorMsg.style.display = 'none';

      // Check honeypot
      const honeypot = document.getElementById('company');
      if (honeypot && honeypot.value) {
        // Honeypot was filled - likely spam
        console.warn('Honeypot triggered');
        showError('Please try again.');
        return;
      }

      // Validate form
      if (!form.checkValidity()) {
        form.classList.add('show-errors');
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
        if (key !== 'company') { // Exclude honeypot
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
        }
      });
    });

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
     * For static site deployment, this creates a mailto link as fallback
     * In production, replace with actual API endpoint
     */
    async function submitForm(data) {
      // Since this is a static site, we'll use a simple approach:
      // 1. Log to console (for development)
      // 2. Use FormSubmit.co or similar service (free, no backend needed)
      // 3. Or create a mailto link as ultimate fallback

      console.log('Form submission data:', data);

      // Option 1: Use FormSubmit.co (replace YOUR_EMAIL with actual email)
      // This is a free service that sends form data via email
      try {
        const response = await fetch('https://formsubmit.co/ajax/hello@keyturn.studio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            ...data,
            _subject: `Contact Form: ${data.clinicName}`,
            _template: 'table',
            _captcha: 'false'
          })
        });

        if (response.ok) {
          return { success: true };
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('FormSubmit error:', error);
        
        // Fallback: create mailto link
        const subject = encodeURIComponent(`Contact Form: ${data.clinicName}`);
        const body = encodeURIComponent(
          `Clinic Name: ${data.clinicName}\n` +
          `Website: ${data.websiteUrl}\n` +
          `Contact Name: ${data.contactName}\n` +
          `Email: ${data.email}\n` +
          `Phone: ${data.phone || 'Not provided'}\n` +
          `Preferred Contact: ${data.contactMethod}\n` +
          `Want to Improve: ${data.improvement}\n` +
          `Message: ${data.message || 'No additional message'}\n`
        );
        
        // Return success since we're using mailto as fallback
        // In a real implementation, you would return failure here
        return { 
          success: false, 
          message: 'Unable to send automatically. Please email hello@keyturn.studio directly or click the email button above.' 
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
