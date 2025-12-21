/**
 * Analytics Lazy Loader
 * Loads analytics scripts after the page has finished initial paint
 * Uses requestIdleCallback with setTimeout fallback for older browsers
 * 
 * SETUP INSTRUCTIONS:
 * 1. Replace 'G-XXXXXXXXXX' below with actual GA4 measurement ID
 * 2. Add these preconnect hints to <head> for better performance:
 *    <link rel="preconnect" href="https://www.googletagmanager.com">
 *    <link rel="preconnect" href="https://www.google-analytics.com">
 */
(function() {
  'use strict';

  /**
   * Load analytics script after browser is idle
   */
  function loadAnalytics() {
    // Check if gtag is already loaded
    if (window.gtag) {
      return;
    }

    // TODO: Replace 'G-XXXXXXXXXX' with actual GA4 measurement ID when ready
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
    
    // Create and inject Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    
    script.onload = function() {
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      window.gtag = gtag;
      
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, {
        'send_page_view': true
      });
    };
    
    script.onerror = function() {
      console.warn('Failed to load analytics');
    };
    
    document.head.appendChild(script);
  }

  /**
   * Schedule analytics loading on idle or after timeout
   */
  function scheduleAnalyticsLoad() {
    // Use requestIdleCallback if available (modern browsers)
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadAnalytics, {
        timeout: 3000 // Load within 3 seconds even if not idle
      });
    } else {
      // Fallback for older browsers - load after 2 seconds
      setTimeout(loadAnalytics, 2000);
    }
  }

  // Start loading analytics after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleAnalyticsLoad);
  } else {
    scheduleAnalyticsLoad();
  }
})();
