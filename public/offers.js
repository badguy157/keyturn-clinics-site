/**
 * Keyturn Studio Offers Configuration
 * Centralized definitions for all scan and blueprint offers
 */

(function(window) {
  'use strict';

  // Base URL for scan tool
  const SCAN_URL_BASE = "https://scan.keyturn.studio";

  // Offer configurations
  const OFFERS = {
    QUICK_SCAN: {
      id: 'quick_scan',
      title: 'Free Patient-Flow Scan',
      eyebrow: 'Step 1',
      price: 0,
      priceText: 'Free',
      timeText: '60 seconds',
      bullets: [
        'Instant score',
        'Biggest leaks',
        'Quick wins'
      ],
      primaryCta: {
        label: 'Run free scan',
        href: `${SCAN_URL_BASE}/?mode=quick`
      },
      secondaryNote: 'No email needed.'
    },

    DEEP_SCAN: {
      id: 'deep_scan',
      title: 'Deep Patient-Flow Scan',
      eyebrow: 'Comprehensive Analysis',
      price: 297,
      priceText: '$297',
      timeText: '5–7 min',
      bullets: [
        'Executive summary',
        'Strengths and weaknesses breakdown',
        'Quick wins prioritized',
        'Page-by-page analysis with screenshots',
        'Patient journey map',
        'Category scores with overall rating'
      ],
      primaryCta: {
        label: 'Get Deep Scan',
        href: `${SCAN_URL_BASE}/?mode=deep`
      },
      secondaryNote: null
    },

    DEEP_SCAN_WALKTHROUGH_ADDON: {
      id: 'deep_scan_walkthrough',
      title: 'Deep Scan + Walkthrough',
      eyebrow: 'Add-on',
      price: 200,
      priceText: '+$200',
      timeText: '10–15 min video',
      description: '10–15 min Loom walkthrough or short live Q&A',
      bullets: [
        'Personalized Loom video walkthrough',
        'Or schedule a short live Q&A',
        'Clarify priorities and next steps'
      ],
      primaryCta: {
        label: 'Add Walkthrough',
        href: `${SCAN_URL_BASE}/?mode=deep&addon=walkthrough`
      },
      secondaryNote: 'Available after Deep Scan purchase.'
    },

    BLUEPRINT: {
      id: 'blueprint',
      title: 'Clinic Booking Blueprint',
      eyebrow: 'Step 2',
      price: 1000,
      priceText: '$1,000',
      timeText: null,
      note: 'credited if you hire us',
      bullets: [
        'Top fixes (what to change first)',
        'Page map (what pages you need)',
        'Simple wireframe (rough layout)',
        'Tracking plan (so you can measure results)'
      ],
      primaryCta: {
        label: 'Start the Blueprint',
        href: '/quote.html?intent=blueprint&utm_campaign=blueprint&utm_medium=cta&utm_source=offers_js'
      },
      secondaryNote: 'If we rebuild your site within 90 days, we credit the $1,000.'
    }
  };

  // URL helper functions
  function quickScanUrl() {
    return `${SCAN_URL_BASE}/?mode=quick`;
  }

  function deepScanUrl() {
    return `${SCAN_URL_BASE}/?mode=deep`;
  }

  function blueprintUrl(utmSource = 'offers_js') {
    return `/quote.html?intent=blueprint&utm_campaign=blueprint&utm_medium=cta&utm_source=${utmSource}`;
  }

  /**
   * Renders an offer card as HTML string
   * @param {Object} offer - Offer configuration object
   * @param {Object} options - Optional overrides
   * @returns {string} HTML string for the offer card
   */
  function renderOfferCard(offer, options = {}) {
    const {
      title = offer.title,
      eyebrow = offer.eyebrow,
      priceText = offer.priceText,
      timeText = offer.timeText,
      bullets = offer.bullets,
      primaryCta = offer.primaryCta,
      secondaryNote = offer.secondaryNote,
      note = offer.note,
      showStepBadge = true
    } = options;

    const stepBadge = eyebrow && showStepBadge 
      ? `<div class="start-here-step-badge">${eyebrow}</div>` 
      : '';

    const titleWithPrice = priceText && priceText !== 'Free'
      ? `${title} (${priceText}${note ? ', ' + note : ''})`
      : timeText 
        ? `${title} (${timeText})`
        : title;

    const bulletsHTML = bullets && bullets.length > 0
      ? `<ul class="start-here-bullets">
        ${bullets.map(bullet => `<li>${bullet}</li>`).join('\n        ')}
      </ul>`
      : '';

    const ctaHTML = primaryCta
      ? `<div class="start-here-cta">
        <a class="btn btn-primary" href="${primaryCta.href}" ${primaryCta.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${primaryCta.label}</a>
      </div>`
      : '';

    const noteHTML = secondaryNote
      ? `<p class="start-here-note">${secondaryNote}</p>`
      : '';

    return `<div class="start-here-card">
      ${stepBadge}
      <h3 class="start-here-card-title">${titleWithPrice}</h3>
      ${bulletsHTML}
      ${ctaHTML}
      ${noteHTML}
    </div>`;
  }

  /**
   * Renders offer cards into a container
   * @param {string} containerId - ID of container element
   * @param {Array} offers - Array of offer objects to render
   */
  function renderOfferCards(containerId, offers) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`Container with id "${containerId}" not found`);
      return;
    }

    const html = offers.map(offer => renderOfferCard(offer)).join('\n    ');
    container.innerHTML = html;
  }

  // Export to window for global access
  window.KeyturnOffers = {
    SCAN_URL_BASE,
    OFFERS,
    quickScanUrl,
    deepScanUrl,
    blueprintUrl,
    renderOfferCard,
    renderOfferCards
  };

})(window);
