/**
 * Keyturn Studio Pricing Configuration
 * Single source of truth for all package pricing across the site
 * Used by: pricing.html, ROI calculator (tools/roi.html), and any other pricing displays
 */
(function() {
  'use strict';
  
  window.KEYTURN_PRICING = {
    // Service scans and planning
    deepScan: 297,
    blueprint: 1000,
    
    // Website rebuild packages
    rebuild: {
      core: 9000,
      pro: 15000,
      premierMin: 25000,
      premierMax: 32000
    },
    
    // Formatting helper functions
    formatPrice: function(price) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(price);
    },
    
    formatPriceShort: function(price) {
      if (price >= 1000) {
        return '$' + (price / 1000) + 'k';
      }
      return '$' + price;
    },
    
    formatPremierRange: function() {
      return this.formatPrice(this.rebuild.premierMin) + ' to ' + this.formatPrice(this.rebuild.premierMax);
    },
    
    formatPremierRangeShort: function() {
      return '$' + (this.rebuild.premierMin / 1000) + 'k – $' + (this.rebuild.premierMax / 1000) + 'k';
    }
  };
})();
