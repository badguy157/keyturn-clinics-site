// Site-wide CTA constants for Keyturn Studio
(function() {
  'use strict';

  // Base URL for the scan tool (canonical)
  const SCAN_URL_BASE = "https://scan.keyturn.studio";

  // Primary scan URL (canonical - no mode parameter)
  const quickScanUrl = SCAN_URL_BASE + "/";
  const deepScanUrl = SCAN_URL_BASE + "/";

  // Quote URLs with intent parameters
  const quoteUrl = "/quote.html?intent=quote";
  const blueprintUrl = "/quote.html?intent=blueprint";

  // Pricing constants (all prices in USD)
  const deepScanPrice = 297;
  const deepScanWalkthroughAddon = 200;
  const blueprintPrice = 1000;

  // Marketing copy
  const deepScanCreditNote = "Upgrade to the Blueprint within 14 days and we credit your $297.";

  // Expose constants to global scope
  window.KEYTURN_OFFERS = {
    SCAN_URL_BASE,
    quickScanUrl,
    deepScanUrl,
    quoteUrl,
    blueprintUrl,
    deepScanPrice,
    deepScanWalkthroughAddon,
    blueprintPrice,
    deepScanCreditNote
  };

  // Also expose individual constants for backward compatibility
  // This allows both window.KEYTURN_OFFERS.propertyName and window.propertyName syntax
  Object.assign(window, window.KEYTURN_OFFERS);
})();
