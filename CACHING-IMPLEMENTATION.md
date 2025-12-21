# Caching Implementation for CDN-Friendly Static Assets

## Overview
This site is configured with optimal caching headers for static assets and HTML pages, making it CDN-friendly and improving performance.

## Cache Strategy

### HTML Pages (Short Cache)
- **Cache-Control**: `public, max-age=0, must-revalidate`
- **Applies to**: All `.html` files and the root `/` path
- **Reasoning**: HTML content can change frequently, so we set max-age to 0 to ensure browsers always check for updates while still allowing CDN caching with revalidation.

### Static Assets (Long Cache)
- **Cache-Control**: `public, max-age=31536000, immutable`
- **Applies to**:
  - CSS files (`.css`)
  - JavaScript files (`.js`)
  - Images (`.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`, `.svg`, `.ico`)
  - Fonts (`.woff`, `.woff2`)
  - All files under `/assets/*` directory
- **Reasoning**: Static assets are versioned with query strings (e.g., `?v=1.0.0`), allowing aggressive caching. The `immutable` directive tells browsers the file will never change for this specific URL.

## Implementation Details

### 1. Vercel Configuration (`vercel.json`)
The caching headers are configured in the `vercel.json` file using the `headers` configuration:

```json
{
  "headers": [
    {
      "source": "/(.*).html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*).css",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
    // ... more rules for JS, images, etc.
  ]
}
```

### 2. Cache Busting with Version Parameters
All static asset references in HTML files include a version parameter to enable cache invalidation:

**Before:**
```html
<link rel="stylesheet" href="styles.css">
<script src="/public/site.js" defer></script>
```

**After:**
```html
<link rel="stylesheet" href="styles.css?v=1.0.0">
<script src="/public/site.js?v=1.0.0" defer></script>
```

## Updating Asset Versions

When you make changes to CSS or JavaScript files, update the version parameter to bust the cache:

1. Change the version in HTML files from `?v=1.0.0` to `?v=1.0.1` (or next version)
2. You can use a find-and-replace or the provided script:

```bash
# Update all HTML files with new version
sed -i 's/?v=1.0.0/?v=1.0.1/g' **/*.html
```

## Benefits

1. **Improved Performance**: Long cache times for static assets reduce bandwidth and server load
2. **CDN-Friendly**: Both Vercel Edge Network and third-party CDNs can effectively cache assets
3. **Instant Updates**: Version parameters allow immediate cache invalidation when needed
4. **Browser Cache**: Browsers can cache assets for up to 1 year (31,536,000 seconds)
5. **Fresh HTML**: HTML pages are always checked for updates while still being CDN-cacheable

## Testing

To verify caching headers are working correctly after deployment:

```bash
# Check HTML cache headers
curl -I https://your-domain.com/

# Check CSS cache headers
curl -I https://your-domain.com/styles.css

# Check JS cache headers
curl -I https://your-domain.com/public/site.js
```

Expected headers:
- HTML: `cache-control: public, max-age=0, must-revalidate`
- Assets: `cache-control: public, max-age=31536000, immutable`

## Font Configuration

This site uses Google Fonts (web fonts), which are automatically optimized by Google's CDN:
- Inter font family
- Playfair Display font family

Google Fonts are loaded with `display=swap` for optimal performance.

## Notes

- The `immutable` directive is supported by modern browsers and helps prevent unnecessary revalidation requests
- Max-age of 31,536,000 seconds equals 1 year, the maximum recommended cache duration
- The `public` directive allows both browser and CDN caching
- All image formats (WebP, AVIF, PNG, JPG, SVG) are included in long-cache rules
