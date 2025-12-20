# Offers Configuration

This document explains the centralized offers configuration system for Keyturn Studio.

## Overview

The `/public/offers.js` file provides a centralized configuration for all scan and blueprint offers across the site. This ensures consistency and makes it easy to update offer details, pricing, and URLs in one place.

## Configuration

### Offers Available

The system includes four main offer types:

1. **QUICK_SCAN** - Free Patient-Flow Scan (60 seconds)
2. **DEEP_SCAN** - Deep Patient-Flow Scan ($297, 5-7 min)
3. **DEEP_SCAN_WALKTHROUGH_ADDON** - Add-on walkthrough (+$200)
4. **BLUEPRINT** - Clinic Booking Blueprint ($1,000, credited)

### URL Helpers

Three helper functions are available for generating consistent URLs:

- `quickScanUrl()` - Returns the quick scan URL
- `deepScanUrl()` - Returns the deep scan URL  
- `blueprintUrl(utmSource)` - Returns the blueprint URL with UTM tracking

## Usage

### Accessing Offers Config

The offers configuration is available globally via `window.KeyturnOffers`:

```javascript
// Get the offers configuration
const { OFFERS, quickScanUrl, deepScanUrl, blueprintUrl } = window.KeyturnOffers;

// Access individual offers
const quickScan = OFFERS.QUICK_SCAN;
const blueprint = OFFERS.BLUEPRINT;
```

### Rendering Offer Cards

The `renderOfferCard()` function generates HTML for offer cards:

```javascript
// Render a single offer card
const cardHTML = window.KeyturnOffers.renderOfferCard(OFFERS.QUICK_SCAN);

// Render with custom options
const customCard = window.KeyturnOffers.renderOfferCard(OFFERS.BLUEPRINT, {
  primaryCta: {
    label: 'Get Started',
    href: blueprintUrl('custom_source')
  }
});
```

### Example: Rendering Multiple Cards

```javascript
document.addEventListener('DOMContentLoaded', function() {
  if (window.KeyturnOffers) {
    const { OFFERS, renderOfferCard } = window.KeyturnOffers;
    const container = document.getElementById('offers-container');
    
    // Render Quick Scan and Blueprint cards
    const quickScanHTML = renderOfferCard(OFFERS.QUICK_SCAN);
    const blueprintHTML = renderOfferCard(OFFERS.BLUEPRINT);
    
    container.innerHTML = quickScanHTML + blueprintHTML;
  }
});
```

### Example: Updating Button URLs

```javascript
document.addEventListener('DOMContentLoaded', function() {
  if (window.KeyturnOffers) {
    const { quickScanUrl, blueprintUrl } = window.KeyturnOffers;
    
    // Update scan button
    const scanBtn = document.getElementById('scan-button');
    if (scanBtn) scanBtn.href = quickScanUrl();
    
    // Update blueprint button with custom UTM source
    const blueprintBtn = document.getElementById('blueprint-button');
    if (blueprintBtn) blueprintBtn.href = blueprintUrl('my_page');
  }
});
```

## Pages Using Offers Config

The following pages have been updated to use the centralized configuration:

- **index.html** - "Start here" section with offer cards
- **pricing.html** - Blueprint panel and decision callout sections
- **services.html** - Blueprint CTA section

## Styling

Offer cards use the existing `.start-here-card` CSS classes for consistent styling:

- Dark glass background with `--brand-soft`
- Step badges, titles, bullet lists
- Primary CTA buttons
- Secondary notes
- Mobile-responsive layout

## Future Enhancements

To add new offers or modify existing ones:

1. Edit `/public/offers.js`
2. Add or update offer objects in the `OFFERS` configuration
3. Update any pages that reference the modified offers
4. No CSS changes needed - existing styles will apply automatically
