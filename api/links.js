// File: /api/links.js

// Blueprint base URL with standard UTM parameters
export const BLUEPRINT_BASE = '/quote.html?intent=blueprint&utm_campaign=blueprint&utm_medium=cta';

/**
 * Build a Blueprint URL with a specific source parameter
 * @param {string} source - The utm_source value (e.g., 'home_hero', 'pricing', 'footer')
 * @returns {string} Complete Blueprint URL with all UTM parameters
 */
export function buildBlueprintUrl(source) {
  return `${BLUEPRINT_BASE}&utm_source=${encodeURIComponent(source)}`;
}

// Vercel serverless function handler
export default async function handler(_req, res) {
    res.status(200).json({
      fullIntake: process.env.TALLY_FULL_INTAKE || '',
      upload: process.env.DROPBOX_REQUEST || 'https://www.dropbox.com/request/OOsRAkmpSTVmnnAX6jJg',
      blueprintBase: BLUEPRINT_BASE
    });
  }
  