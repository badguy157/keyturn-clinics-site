/**
 * Keyturn Referrals Page - Referral Intro Generator
 * Handles form input, email generation, copy-to-clipboard, and mailto
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('referral-intro-form');
    if (!form) return;

    const copyBtn = document.getElementById('copy-intro-btn');
    const emailBtn = document.getElementById('email-intro-btn');

    // Get form fields
    const yourNameInput = document.getElementById('your_name');
    const referredClinicInput = document.getElementById('referred_clinic');
    const referredWebsiteInput = document.getElementById('referred_website');
    const contactNameInput = document.getElementById('contact_name');
    const contactEmailInput = document.getElementById('contact_email');
    const noteInput = document.getElementById('note');

    /**
     * Generate email subject and body from form values
     */
    function generateEmail() {
      const yourName = yourNameInput.value.trim();
      const referredClinic = referredClinicInput.value.trim();
      const referredWebsite = referredWebsiteInput.value.trim();
      const contactName = contactNameInput.value.trim();
      const contactEmail = contactEmailInput.value.trim();
      const note = noteInput.value.trim();

      // Validate required fields
      if (!yourName || !referredClinic) {
        return null;
      }

      const subject = `Referral intro: ${referredClinic}`;

      let body = `Hi Keyturn team,

I'd like to refer ${referredClinic}`;

      if (referredWebsite) {
        body += ` (${referredWebsite})`;
      }

      body += ` as a potential clinic website rebuild.

My name: ${yourName}`;

      if (contactName || contactEmail) {
        body += `\nContact at clinic: `;
        if (contactName) {
          body += contactName;
        }
        if (contactEmail) {
          body += ` (${contactEmail})`;
        }
      }

      if (note) {
        body += `\n\nNotes: ${note}`;
      }

      body += `\n\nPlease reply with a short intro email I can forward, or feel free to include me on the thread.

Thanks!`;

      return { subject, body };
    }

    /**
     * Copy email to clipboard
     */
    function copyToClipboard() {
      const email = generateEmail();
      if (!email) {
        alert('Please fill in your name and referred clinic name.');
        return;
      }

      const fullText = `Subject: ${email.subject}\n\n${email.body}`;

      navigator.clipboard.writeText(fullText).then(function() {
        // Show "Copied" state
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied';
        copyBtn.disabled = true;

        // Track event
        trackAction('copy');

        // Reset after 1.5s
        setTimeout(function() {
          copyBtn.textContent = originalText;
          copyBtn.disabled = false;
        }, 1500);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard. Please try again.');
      });
    }

    /**
     * Open mailto with generated email
     */
    function openMailto() {
      const email = generateEmail();
      if (!email) {
        alert('Please fill in your name and referred clinic name.');
        return;
      }

      const encodedSubject = encodeURIComponent(email.subject);
      const encodedBody = encodeURIComponent(email.body);
      const mailtoUrl = `mailto:hello@keyturn.studio?subject=${encodedSubject}&body=${encodedBody}`;

      // Track event
      trackAction('email');

      // Open mailto
      window.location.href = mailtoUrl;
    }

    /**
     * Track analytics event
     */
    function trackAction(action) {
      if (window.gtag) {
        try {
          gtag('event', 'referral_intro_action', { action: action });
        } catch (e) {
          console.log('[referrals] action', action);
        }
      } else {
        console.log('[referrals] action', action);
      }
    }

    // Attach event listeners
    if (copyBtn) {
      copyBtn.addEventListener('click', copyToClipboard);
    }

    if (emailBtn) {
      emailBtn.addEventListener('click', openMailto);
    }
  });
})();
