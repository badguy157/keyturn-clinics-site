# Image Optimization Pipeline

This project uses a modern image optimization pipeline to deliver fast-loading, responsive images in next-gen formats.

## Overview

- **Original images**: 5.92MB
- **Optimized images**: 1.44MB
- **Total savings**: 4.48MB (75.6% reduction)

## Running the Optimization

To optimize all images in the project:

```bash
npm run optimize:images
```

This processes all PNG/JPG/JPEG files in:
- `/assets/demos/`
- `/images/`

Output is saved to `/assets/img/optimized/`

## What Gets Generated

For each source image, the script creates:
- AVIF versions at 480w, 768w, 1024w, 1440w (quality: 50)
- WebP versions at 480w, 768w, 1024w, 1440w (quality: 75)

## Image Implementation Pattern

All optimized images use the `<picture>` element with responsive sources:

```html
<picture>
  <source type="image/avif" 
          srcset="/assets/img/optimized/image-480.avif 480w, 
                  /assets/img/optimized/image-768.avif 768w, 
                  /assets/img/optimized/image-1024.avif 1024w, 
                  /assets/img/optimized/image-1440.avif 1440w" 
          sizes="(max-width: 768px) 90vw, 520px">
  <source type="image/webp" 
          srcset="/assets/img/optimized/image-480.webp 480w, 
                  /assets/img/optimized/image-768.webp 768w, 
                  /assets/img/optimized/image-1024.webp 1024w, 
                  /assets/img/optimized/image-1440.webp 1440w" 
          sizes="(max-width: 768px) 90vw, 520px">
  <img src="/assets/img/optimized/image-1024.webp" 
       alt="Description" 
       width="2538" 
       height="1281" 
       loading="lazy" 
       decoding="async">
</picture>
```

## Performance Optimizations

### 1. Hero Image (Above the Fold)
- **Preload**: Link in `<head>` with responsive srcset
- **Priority**: `fetchpriority="high"`
- **Decoding**: `decoding="async"`
- **No lazy loading**: Loads immediately for best LCP

### 2. Below-the-Fold Images
- **Lazy loading**: `loading="lazy"`
- **Async decoding**: `decoding="async"`
- **Responsive**: Proper srcset and sizes

### 3. Layout Stability
- All images include explicit `width` and `height` attributes
- Prevents Cumulative Layout Shift (CLS)

## Browser Support

- **AVIF**: Chrome 85+, Firefox 93+, Safari 16.1+
- **WebP**: Chrome 23+, Firefox 65+, Safari 14+, Edge 18+
- **Fallback**: Modern browsers choose AVIF; older browsers use WebP

## File Organization

```
/assets/img/optimized/
├── aurora-hero-480.avif
├── aurora-hero-480.webp
├── aurora-hero-768.avif
├── aurora-hero-768.webp
├── aurora-hero-1024.avif
├── aurora-hero-1024.webp
├── aurora-hero-1440.avif
├── aurora-hero-1440.webp
├── demo-dermatology-480.avif
├── demo-dermatology-480.webp
... (96 total optimized images)
```

## Adding New Images

1. Add your image to `/assets/demos/` or `/images/`
2. Run `npm run optimize:images`
3. Update HTML to use the picture element pattern above
4. For hero images: Add preload and fetchpriority
5. For other images: Use loading="lazy"

## Quality Settings

Current settings provide excellent quality/size balance:
- **AVIF quality: 50** (~90% smaller than PNG)
- **WebP quality: 75** (~60-70% smaller than PNG)

To adjust, edit `scripts/optimize-images.mjs`:
```js
const AVIF_QUALITY = 50;
const WEBP_QUALITY = 75;
```

## Performance Impact

Expected improvements:
- **LCP (Largest Contentful Paint)**: <2.5s on mobile
- **Total page weight**: Reduced by ~4.5MB
- **Mobile load time**: <3s on 3G connection
- **CLS (Cumulative Layout Shift)**: 0 (explicit dimensions)

## Maintenance

Re-run optimization when:
- Adding new marketing images
- Updating existing images
- Changing quality settings
- Adding new responsive breakpoints
