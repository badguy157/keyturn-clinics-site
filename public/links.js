/**
 * Client-side links module for consistent URL generation
 * Single source of truth for Blueprint and other important URLs
 */

// Blueprint base URL with standard UTM parameters
const BLUEPRINT_BASE = '/quote.html?intent=blueprint&utm_campaign=blueprint&utm_medium=cta';

/**
 * Build a Blueprint URL with a specific source parameter
 * @param {string} source - The utm_source value (e.g., 'home_hero', 'home_card', 'pricing', 'footer')
 * @returns {string} Complete Blueprint URL with all UTM parameters
 */
function buildBlueprintUrl(source) {
  return `${BLUEPRINT_BASE}&utm_source=${encodeURIComponent(source)}`;
}

// Make functions available globally for inline usage
if (typeof window !== 'undefined') {
  window.KeyturnLinks = {
    BLUEPRINT_BASE,
    buildBlueprintUrl
  };
}
