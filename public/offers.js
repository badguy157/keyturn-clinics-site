// Site-wide CTA constants for Keyturn Studio
(function() {
  'use strict';

  // Base URL for the scan tool
  const SCAN_URL_BASE = "https://scan.keyturn.studio";

  // Scan URLs with mode parameters
  const quickScanUrl = SCAN_URL_BASE + "/?mode=quick";
  const deepScanUrl = SCAN_URL_BASE + "/?mode=deep";

  // Quote URLs with intent parameters
  const quoteUrl = "/quote.html?intent=quote";
  const blueprintUrl = "/quote.html?intent=blueprint";

  // Pricing constants
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
  Object.assign(window, window.KEYTURN_OFFERS);
})();
