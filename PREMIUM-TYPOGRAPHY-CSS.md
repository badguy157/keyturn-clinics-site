# Premium Typography CSS for Dark-Themed Website

**Premium feel with sophisticated serif headings and clean sans-serif body text**

This document provides complete CSS code to upgrade typography on your dark-themed website (navy background, blue accents) for a premium feel using:
- **Playfair Display** (sophisticated serif) for headings
- **Inter** (clean sans-serif) for body text
- **Letter-spacing** (0.5-1px) on headings for elegance

**No copy/content changes** — styling only.

---

## Section 1: Headings CSS

### CSS Variables (Design Tokens)
Add to your `:root` selector in styles.css:

```css
:root {
  /* Typography font families */
  --font: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  --font-heading: 'Playfair Display', Georgia, serif;
}
```

### Global Heading Styles
Apply sophisticated serif font to all headings with premium letter-spacing:

```css
h1, h2, h3, h4, h5, h6 {
  line-height: 1.3;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
  font-weight: 600;
}
```

### Hero Title (Large Display Headings)
For main hero/landing page titles with increased letter-spacing:

```css
.hero-title {
  font-size: clamp(36px, 7vw, 72px);
  line-height: 1.05;
  margin: 0 0 16px;
  font-weight: 700;
  font-family: var(--font-heading);
  letter-spacing: 1px; /* Slightly more for large headings */
}
```

### Section Headings (H2)
For section headings across the site:

```css
h2 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  text-align: left;
  margin: 0 0 1.5rem;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}
```

### Card Titles
For card and component titles:

```css
.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0.25rem 0 0.5rem;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}
```

### Pricing Section Headings
For centered pricing headers:

```css
.pricing-section-heading {
  text-align: center;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  margin: 0 0 12px;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}
```

### Blueprint/Feature Titles
For special sections:

```css
.blueprint-primary-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: clamp(1.5rem, 4vw, 1.875rem);
  font-weight: 700;
  color: var(--fg);
  line-height: 1.3;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}

.pricing-blueprint-title {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: var(--fg);
  margin: 0 0 8px;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}
```

---

## Section 2: Body CSS

### Base Body Text
Clean sans-serif for all body content:

```css
body {
  background: var(--brand-bg);
  color: var(--brand-text);
  font-family: var(--font);
  font-size: 17px;
  line-height: 1.6;
}
```

### Paragraph Text
Standard paragraph styling with optimal readability:

```css
p {
  margin: 0.4rem 0 1rem;
  color: var(--brand-text);
  font-size: 1rem;
  line-height: 1.6;
  font-family: var(--font);
}
```

### Hero/Lead Text
Larger introductory text for hero sections:

```css
.hero-lede {
  color: rgba(203, 213, 225, 0.9);
  font-size: clamp(17px, 3.6vw, 20px);
  margin: 0 0 32px;
  line-height: 1.7;
  max-width: 540px;
  font-family: var(--font);
}
```

### Secondary/Muted Text
Supporting text and descriptions:

```css
.pricing-section-subheading {
  text-align: center;
  color: var(--brand-muted);
  font-size: 0.95rem;
  margin: 0 0 24px;
  line-height: 1.7;
  font-family: var(--font);
}

@media (min-width: 768px) {
  .pricing-section-subheading {
    font-size: 1rem;
  }
}
```

---

## Section 3: Step-by-Step to Add to styles.css

### Step 1: Add Google Fonts Import
**Add to your HTML `<head>` section** (before styles.css link):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
```

### Step 2: Update CSS Variables in styles.css
**Locate the `:root` selector** (typically at the top of styles.css) and add/update:

```css
:root {
  /* Typography font families */
  --font: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  --font-heading: 'Playfair Display', Georgia, serif;
}
```

### Step 3: Add Global Heading Styles
**Add after the `:root` section** in styles.css:

```css
/* ---- Premium Typography ---- */
h1, h2, h3, h4, h5, h6 {
  line-height: 1.3;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
  font-weight: 600;
}
```

### Step 4: Update Body Element
**Update the body selector** in styles.css:

```css
body {
  background: var(--brand-bg);
  color: var(--brand-text);
  font-family: var(--font);
  font-size: 17px;
  line-height: 1.6;
}
```

### Step 5: Add Component-Specific Styles
**Add these styles to the appropriate sections** of your styles.css:

```css
/* Hero Section Typography */
.hero-title {
  font-size: clamp(36px, 7vw, 72px);
  line-height: 1.05;
  margin: 0 0 16px;
  font-weight: 700;
  font-family: var(--font-heading);
  letter-spacing: 1px;
}

.hero-lede {
  color: rgba(203, 213, 225, 0.9);
  font-size: clamp(17px, 3.6vw, 20px);
  margin: 0 0 32px;
  line-height: 1.7;
  max-width: 540px;
  font-family: var(--font);
}

/* Section Headings */
h2 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  text-align: left;
  margin: 0 0 1.5rem;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}

/* Card Typography */
.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0.25rem 0 0.5rem;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}

/* Pricing Section */
.pricing-section-heading {
  text-align: center;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  margin: 0 0 12px;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}

.pricing-section-subheading {
  text-align: center;
  color: var(--brand-muted);
  font-size: 0.95rem;
  margin: 0 0 24px;
  line-height: 1.7;
  font-family: var(--font);
}

@media (min-width: 768px) {
  .pricing-section-subheading {
    font-size: 1rem;
  }
}

/* Blueprint/Feature Titles */
.blueprint-primary-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: clamp(1.5rem, 4vw, 1.875rem);
  font-weight: 700;
  color: var(--fg);
  line-height: 1.3;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}

.pricing-blueprint-title {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: var(--fg);
  margin: 0 0 8px;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}

/* Paragraphs */
p {
  margin: 0.4rem 0 1rem;
  color: var(--brand-text);
  font-size: 1rem;
  line-height: 1.6;
  font-family: var(--font);
}
```

### Step 6: Verify Implementation
After adding the CSS:

1. **Check font loading**: Open browser DevTools → Network tab → filter "font" to verify Playfair Display and Inter are loading
2. **Inspect headings**: Right-click any heading → Inspect → verify font-family shows "Playfair Display"
3. **Inspect body text**: Right-click paragraph text → Inspect → verify font-family shows "Inter"
4. **Check letter-spacing**: In DevTools, verify headings show letter-spacing: 0.5px or 1px
5. **Test responsiveness**: Resize browser to check font sizes scale properly on mobile/tablet/desktop

---

## Color Palette Reference (Dark Theme)

These colors are already defined in the codebase for the navy background with blue accents:

```css
:root {
  /* Background colors */
  --brand-bg: #0a1220;              /* Navy background */
  --brand-surface: rgba(255,255,255,.10);  /* Card backgrounds */
  --brand-soft: rgba(255,255,255,.06);     /* Softer surfaces */
  
  /* Text colors */
  --brand-text: #e6ebf5;            /* Main body text (light slate) */
  --brand-muted: #a6b3cf;           /* Secondary text */
  --fg: #e6ebf5;                    /* Foreground */
  
  /* Accent colors */
  --brand-primary: #5aa2ff;         /* Primary blue for CTAs */
  --brand-accent: #7db8ff;          /* Softer blue accent */
}
```

---

## Typography Hierarchy Summary

| Element | Font | Size | Weight | Letter-spacing |
|---------|------|------|--------|----------------|
| Hero Title (H1) | Playfair Display | 36-72px (clamp) | 700 | 1px |
| Section Heading (H2) | Playfair Display | 1.75-2.25rem (clamp) | 600 | 0.5px |
| Card Title (H3/H4) | Playfair Display | 1.25rem | 700 | 0.5px |
| Blueprint Title | Playfair Display | 1.5-1.875rem (clamp) | 700 | 0.5px |
| Body Text | Inter | 17px / 1rem | 400 | 0 |
| Lead Text | Inter | 17-20px (clamp) | 400 | 0 |
| Muted Text | Inter | 0.95-1rem | 400 | 0 |

---

## Key Features

✓ **No Content Changes**: Only styling updates, all text content remains unchanged  
✓ **Responsive**: Uses `clamp()` for fluid typography that scales across devices  
✓ **Premium Feel**: Sophisticated serif headings with elegant letter-spacing  
✓ **Clean Body**: Highly readable sans-serif body text with optimal line-height  
✓ **Dark Theme Optimized**: Colors chosen for excellent contrast on navy backgrounds  
✓ **Performance**: Google Fonts with `preconnect` for optimal loading  
✓ **Fallbacks**: Georgia for serif, system fonts for sans-serif  
✓ **Accessibility**: Meets WCAG standards with proper contrast ratios  

---

## Quick Copy-Paste Complete CSS Block

If you want to add everything at once, copy this complete block to your styles.css:

```css
/* ===============================
   Premium Typography System
   =============================== */

/* Font imports - ADD TO HTML <head> */
/* 
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
*/

/* CSS Variables */
:root {
  --font: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  --font-heading: 'Playfair Display', Georgia, serif;
}

/* Global Typography */
body {
  font-family: var(--font);
  font-size: 17px;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.3;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
  font-weight: 600;
}

h2 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  margin: 0 0 1.5rem;
}

p {
  margin: 0.4rem 0 1rem;
  font-size: 1rem;
  line-height: 1.6;
}

/* Hero Section */
.hero-title {
  font-size: clamp(36px, 7vw, 72px);
  line-height: 1.05;
  margin: 0 0 16px;
  font-weight: 700;
  font-family: var(--font-heading);
  letter-spacing: 1px;
}

.hero-lede {
  color: rgba(203, 213, 225, 0.9);
  font-size: clamp(17px, 3.6vw, 20px);
  margin: 0 0 32px;
  line-height: 1.7;
  max-width: 540px;
}

/* Card Components */
.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0.25rem 0 0.5rem;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}

/* Pricing Section */
.pricing-section-heading {
  text-align: center;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  margin: 0 0 12px;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}

.pricing-section-subheading {
  text-align: center;
  color: var(--brand-muted);
  font-size: 0.95rem;
  margin: 0 0 24px;
  line-height: 1.7;
}

@media (min-width: 768px) {
  .pricing-section-subheading {
    font-size: 1rem;
  }
}

/* Blueprint/Feature Sections */
.blueprint-primary-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: clamp(1.5rem, 4vw, 1.875rem);
  font-weight: 700;
  line-height: 1.3;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}

.pricing-blueprint-title {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 700;
  margin: 0 0 8px;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}
```

---

**Implementation Date**: 2025-12-10  
**Version**: 1.0  
**Status**: Ready for Production
