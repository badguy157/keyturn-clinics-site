/**
 * Keyturn Studio Accordion System
 * 
 * High-end, accessible accordion behavior for FAQ sections.
 * Features:
 * - All items collapsed by default
 * - Smooth height animation (no snapping)
 * - Only one item open at a time within each group
 * - Full keyboard accessibility with ARIA support
 * - Works on all screen sizes
 */

(function() {
  'use strict';

  function initAccordion() {
    const faqGroups = document.querySelectorAll('.faq-group');

    faqGroups.forEach(function(group) {
      const questions = group.querySelectorAll('.faq-question');

      questions.forEach(function(question) {
        const item = question.closest('.faq-item');
        const answer = item ? item.querySelector('.faq-answer') : null;

        if (!item || !answer) return;

        // Initialize: ensure collapsed state
        item.classList.remove('faq-item--open');
        question.setAttribute('aria-expanded', 'false');
        answer.hidden = true;
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';

        // Click handler
        question.addEventListener('click', function() {
          const isOpen = item.classList.contains('faq-item--open');

          if (isOpen) {
            // Close this item
            closeItem(item, question, answer);
          } else {
            // Close all other items in this group
            const siblingItems = group.querySelectorAll('.faq-item--open');
            siblingItems.forEach(function(openItem) {
              if (openItem !== item) {
                const openQuestion = openItem.querySelector('.faq-question');
                const openAnswer = openItem.querySelector('.faq-answer');
                if (openQuestion && openAnswer) {
                  closeItem(openItem, openQuestion, openAnswer);
                }
              }
            });

            // Open this item
            openItem(item, question, answer);
          }
        });

        // Keyboard support (Enter and Space)
        question.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
          }
        });
      });
    });
  }

  function openItem(item, question, answer) {
    item.classList.add('faq-item--open');
    question.setAttribute('aria-expanded', 'true');
    answer.hidden = false;

    // Force a reflow to ensure transition works
    void answer.offsetHeight;

    // Calculate the scroll height for smooth animation
    var scrollHeight = answer.scrollHeight;
    answer.style.maxHeight = scrollHeight + 'px';
    answer.style.opacity = '1';

    // After transition, remove maxHeight so content can adjust if needed
    answer.addEventListener('transitionend', function handler(e) {
      if (e.propertyName === 'max-height' && item.classList.contains('faq-item--open')) {
        answer.style.maxHeight = 'none';
      }
      answer.removeEventListener('transitionend', handler);
    });
  }

  function closeItem(item, question, answer) {
    // Set maxHeight to current height first (in case it's 'none')
    answer.style.maxHeight = answer.scrollHeight + 'px';

    // Force reflow
    void answer.offsetHeight;

    // Then animate to 0
    answer.style.maxHeight = '0';
    answer.style.opacity = '0';
    item.classList.remove('faq-item--open');
    question.setAttribute('aria-expanded', 'false');

    // Set hidden after transition
    answer.addEventListener('transitionend', function handler(e) {
      if (e.propertyName === 'max-height' && !item.classList.contains('faq-item--open')) {
        answer.hidden = true;
      }
      answer.removeEventListener('transitionend', handler);
    });
  }

  // Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordion);
  } else {
    initAccordion();
  }
})();
