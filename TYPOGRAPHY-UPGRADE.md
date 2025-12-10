# Typography Upgrade Guide for Premium Dark-Themed Website

This guide provides CSS snippets and implementation steps for upgrading typography on the Keyturn Studio website to achieve a premium, sophisticated feel using Playfair Display for headings and Inter for body text.

## Font Stack Overview

- **Headings**: Playfair Display (serif) - Sophisticated, elegant serif font
- **Body Text**: Inter (sans-serif) - Clean, modern sans-serif font
- **Letter-spacing**: 0.5-1px on headings for premium feel

---

## Section 1: Headings CSS

### Google Fonts Import
Add this to your HTML `<head>` section (or Webflow Custom Code → Head Code):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
```

### CSS Custom Properties (Design Tokens)
Add these to your `:root` in global CSS:

```css
:root {
  /* Typography font families */
  --font: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  --font-heading: 'Playfair Display', Georgia, serif;
}
```

### Global Heading Styles
Apply to all heading tags (h1-h6):

```css
h1, h2, h3, h4, h5, h6 {
  line-height: 1.3;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
  font-weight: 600;
}
```

### Hero Title (Large Display Headings)
For your main hero/landing page titles:

```css
.hero-title {
  font-size: clamp(36px, 7vw, 72px);
  line-height: 1.05;
  margin: 0 0 16px;
  font-weight: 700;
  font-family: var(--font-heading);
  letter-spacing: 1px; /* Slightly more spacing for large headings */
}
```

### Section Headings (H2 Level)
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

.pricing-section-heading {
  text-align: center;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  margin: 0 0 12px;
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

### Blueprint/Feature Titles
For special sections like Blueprint:

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
Apply to the `<body>` element:

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
Standard paragraph styling:

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
For larger introductory text:

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
For supporting text and descriptions:

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

## Section 3: Step-by-Step Application

### For Webflow Users:

#### Step 1: Add Google Fonts
1. Go to **Project Settings → Custom Code**
2. In the **Head Code** section, paste the Google Fonts import link (from Section 1)
3. Click **Save**

#### Step 2: Add CSS Custom Properties
1. Go to **Project Settings → Custom Code**
2. In the **Head Code** section (after the font import), add:
```html
<style>
:root {
  --font: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  --font-heading: 'Playfair Display', Georgia, serif;
}
</style>
```

#### Step 3: Apply Heading Styles
**Option A: Using Custom Code (Recommended for Global Styles)**
1. Go to **Project Settings → Custom Code**
2. Add to **Head Code** or create an embedded CSS element:
```html
<style>
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', Georgia, serif;
  letter-spacing: 0.5px;
}

.hero-title, .w-dyn-bind-empty h1 {
  font-family: 'Playfair Display', Georgia, serif;
  letter-spacing: 1px;
}
</style>
```

**Option B: Using Webflow Designer (For Individual Elements)**
1. Select an **H1**, **H2**, etc. element
2. In the **Style Panel → Typography**:
   - Set **Font Family** to "Playfair Display"
   - Set **Letter Spacing** to 0.5px (or 1px for larger headings)
3. Create a **Class** (e.g., "heading-serif") for reusability
4. Apply this class to all heading elements

#### Step 4: Apply Body Text Styles
1. Select the **Body** element in Webflow
2. In the **Style Panel → Typography**:
   - Verify **Font Family** is set to "Inter" (or create a global class)
   - Set **Font Size** to 17px
   - Set **Line Height** to 1.6
3. This will cascade to all text elements

#### Step 5: Create Combo Classes for Special Cases
For elements like `.card-title`, `.hero-lede`, etc.:
1. Select the element
2. Add the base class (e.g., "card-title")
3. In **Typography**, set:
   - **Font Family**: Playfair Display (for titles) or Inter (for body text)
   - **Letter Spacing**: 0.5px (for titles)
   - **Font Weight**: 600-700 for headings

### For Standard HTML/CSS Users:

#### Step 1: Add Font Import to HTML
Add to the `<head>` of your HTML file:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
```

#### Step 2: Update CSS Variables
In your main CSS file (e.g., `styles.css`), add or update `:root`:
```css
:root {
  --font: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  --font-heading: 'Playfair Display', Georgia, serif;
}
```

#### Step 3: Apply Global Heading Styles
Add to your CSS:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
  line-height: 1.3;
  font-weight: 600;
}

body {
  font-family: var(--font);
  font-size: 17px;
  line-height: 1.6;
}
```

#### Step 4: Add Specific Component Styles
Copy the relevant CSS from Sections 1 and 2 above for your specific components.

---

## Color Palette Reference

The dark theme uses these colors (already defined in the site):

```css
:root {
  /* Background colors */
  --brand-bg: #0a1220;              /* Navy background */
  --brand-surface: rgba(255,255,255,.10);  /* Card backgrounds */
  --brand-soft: rgba(255,255,255,.06);     /* Softer surfaces */
  
  /* Text colors */
  --brand-text: #e6ebf5;            /* Main body text (light slate) */
  --brand-muted: #a6b3cf;           /* Secondary text */
  --fg: #e6ebf5;                    /* Foreground (same as brand-text) */
  
  /* Accent colors */
  --brand-primary: #5aa2ff;         /* Primary blue for CTAs */
  --brand-accent: #7db8ff;          /* Softer blue accent */
}
```

---

## Typography Hierarchy Summary

| Element | Font | Size | Weight | Letter-spacing |
|---------|------|------|--------|----------------|
| Hero Title (H1) | Playfair Display | 36-72px (responsive) | 700 | 1px |
| Section Heading (H2) | Playfair Display | 1.75-2.25rem (responsive) | 600 | 0.5px |
| Card Title (H3/H4) | Playfair Display | 1.25rem | 700 | 0.5px |
| Body Text | Inter | 17px / 1rem | 400 | 0 |
| Lead Text | Inter | 17-20px (responsive) | 400 | 0 |
| Small/Muted Text | Inter | 0.875-0.95rem | 400-600 | 0 |

---

## Testing Checklist

After implementation, verify:

- [ ] All headings (H1-H6) display in Playfair Display
- [ ] Letter-spacing is visible on headings (0.5-1px)
- [ ] Body text displays in Inter
- [ ] No layout shifts or text overflow issues
- [ ] Typography looks good on mobile, tablet, and desktop
- [ ] Font loading doesn't cause FOUT (Flash of Unstyled Text)
- [ ] All text remains readable against dark backgrounds

---

## Notes

- **No Content Changes**: This upgrade only affects typography styling. All text content remains unchanged.
- **Fallback Fonts**: Georgia is used as fallback for Playfair Display; system fonts are fallbacks for Inter.
- **Performance**: Using Google Fonts with `preconnect` ensures optimal loading performance.
- **Accessibility**: The chosen fonts maintain excellent readability and meet WCAG standards when paired with the existing color palette.

---

## Questions or Issues?

If you encounter any problems:
1. Verify Google Fonts are loading (check browser Network tab)
2. Check that CSS custom properties are defined in `:root`
3. Ensure class names match your HTML structure
4. Use browser DevTools to inspect font-family values

---

**Implementation Date**: 2025-12-10
**Version**: 1.0
