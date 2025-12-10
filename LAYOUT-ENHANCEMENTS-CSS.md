# Premium Layout Enhancements - CSS Snippets

## Overview
This document contains all CSS snippets for the premium layout enhancements. These changes create a more spacious, elegant feel with increased section padding, taller hero sections, asymmetric grids, and enhanced shadows/borders.

---

## 1. Increased Section Padding (80-100px)

### Mobile Base (80px)
```css
:root {
  --section-y: 80px;  /* increased from 64px */
}
```

### Tablet (88px)
```css
@media (min-width: 768px) {
  :root {
    --section-y: 88px;  /* increased from 80px */
  }
}
```

### Desktop (100px)
```css
@media (min-width: 1100px) {
  :root {
    --section-y: 100px;  /* increased from 88px */
  }
}
```

**Why:** More generous vertical spacing creates breathing room, making the site feel premium and less cramped. 100px on desktop is the sweet spot for modern, high-end websites.

---

## 2. Taller Hero Section (80-100vh)

### Complete Hero Enhancement
```css
.hero {
  padding-top: 4rem;
  padding-bottom: 4rem;
  min-height: 80vh;  /* NEW: taller hero */
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .hero {
    padding-top: 6rem;
    padding-bottom: 6rem;
    min-height: 90vh;  /* tablet: 90vh */
  }
}

@media (min-width: 1100px) {
  .hero {
    min-height: 100vh;  /* desktop: full viewport */
  }
}
```

**Why:** A taller hero makes a bold first impression. Using `min-height` with flexbox ensures content is properly centered while maintaining flexibility for different content amounts.

---

## 3. Asymmetric Grid for Services Cards

### Services Grid with Visual Rhythm
```css
.services-offer-grid {
  display: grid;
  gap: 2.5rem;
}

/* Mobile: single column */
@media (max-width: 767px) {
  .services-offer-grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet: asymmetric 2-column */
@media (min-width: 768px) {
  .services-offer-grid {
    grid-template-columns: 1fr 1.15fr;  /* asymmetric ratio */
    gap: 2rem;
  }
}

/* Desktop: more pronounced asymmetry */
@media (min-width: 1100px) {
  .services-offer-grid {
    grid-template-columns: 1fr 1.2fr;  /* 1:1.2 ratio */
    gap: 2.5rem;
  }
}
```

**Why:** Asymmetric grids (1fr 1.2fr) create visual interest and movement. The eye is naturally drawn to the larger element, creating hierarchy without explicit decoration.

---

## 4. Asymmetric Grid for Pricing Cards

### Pricing Grid with Featured Card Emphasis
```css
.pricing-cards-grid {
  display: grid;
  gap: 24px;
}

@media (min-width: 640px) {
  .pricing-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: asymmetric 3-column with center emphasis */
@media (min-width: 900px) {
  .pricing-cards-grid {
    grid-template-columns: 0.95fr 1.1fr 0.95fr;  /* center larger */
    gap: 28px;
  }
}
```

**Why:** The 0.95fr - 1.1fr - 0.95fr pattern makes the featured/popular card (typically in center) slightly larger, naturally drawing attention to it. This creates a "hero" focal point.

---

## 5. Enhanced Card Shadows & Borders

### Base Card Enhancement
```css
.card {
  background: var(--brand-surface);
  border: 1px solid rgba(255,255,255,.08);  /* increased from .04 */
  border-radius: var(--radius);
  padding: 20px;
  /* Layered shadows for depth */
  box-shadow: 0 4px 12px rgba(0,0,0,.2),
              0 1px 3px rgba(0,0,0,.15);
  position: relative;
}

/* Subtle inner glow */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
  padding: 1px;
  background: linear-gradient(135deg, rgba(255,255,255,.06) 0%, transparent 50%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

**Why:** 
- **Layered shadows** create realistic depth (near shadow + far shadow)
- **Stronger border** (0.08 vs 0.04) increases definition on dark backgrounds
- **Inner glow** adds subtle premium highlight along top edge

---

## 6. Premium Pricing Card Shadows

### Pricing Card Enhancement
```css
.pricing-card {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.04) 100%);
  border: 1px solid rgba(255,255,255,.12);  /* enhanced */
  border-radius: 20px;
  padding: 28px 24px 32px;
  display: flex;
  flex-direction: column;
  /* Multi-layer shadows */
  box-shadow: 0 8px 24px rgba(0,0,0,.25),
              0 2px 8px rgba(0,0,0,.15),
              inset 0 1px 0 rgba(255,255,255,.05);
  transition: transform 0.15s ease-out, 
              box-shadow 0.15s ease-out, 
              border-color 0.15s ease-out;
}

.pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 30px rgba(90,162,255,.35),
              0 12px 36px rgba(0,0,0,.3),
              0 4px 12px rgba(0,0,0,.2),
              inset 0 1px 0 rgba(255,255,255,.08);
  border-color: rgba(90,162,255,.35);
}
```

### Featured Card Enhancement
```css
.pricing-card-featured {
  background: linear-gradient(135deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,.10) 100%);
  border: 2px solid var(--brand-primary);
  /* Layered glow effect */
  box-shadow: 0 0 0 1px var(--brand-primary),
              0 0 24px rgba(90,162,255,.3),
              0 12px 36px rgba(90,162,255,.2),
              0 4px 12px rgba(0,0,0,.25),
              inset 0 1px 0 rgba(255,255,255,.08);
}

.pricing-card-featured:hover {
  box-shadow: 0 0 40px rgba(90,162,255,.5),
              0 0 70px rgba(90,162,255,.3),
              0 16px 48px rgba(0,0,0,.3),
              0 4px 16px rgba(90,162,255,.2),
              inset 0 1px 0 rgba(255,255,255,.12);
}
```

**Why:**
- **Multiple shadow layers** simulate real-world lighting (ambient + focused)
- **Inset highlight** adds dimensional "glass" effect
- **Blue glow on hover** reinforces interactivity and brand color
- **Featured card glow** creates "premium tier" visual hierarchy

---

## 7. Service Card Shadows

### Service Card Enhancement
```css
.service-card {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.04) 100%);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: var(--radius);
  padding: 28px 24px 24px;
  display: flex;
  flex-direction: column;
  /* Enhanced shadows */
  box-shadow: 0 6px 20px rgba(0,0,0,.2),
              0 2px 6px rgba(0,0,0,.15),
              inset 0 1px 0 rgba(255,255,255,.04);
  transition: border-color 0.15s ease-out,
              box-shadow 0.15s ease-out,
              transform 0.15s ease-out;
}

.service-card:hover {
  border-color: rgba(90,162,255,.25);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,0,0,.25),
              0 0 20px rgba(90,162,255,.15),
              0 2px 8px rgba(0,0,0,.15),
              inset 0 1px 0 rgba(255,255,255,.06);
}
```

**Why:**
- **Subtle lift on hover** (-2px) provides feedback without being jarring
- **Blue glow on hover** connects to brand while showing interactivity
- **Consistent shadow pattern** matches pricing cards for visual coherence

---

## Key Principles for Dark Websites

### Shadow Strategy
1. **Layer multiple shadows** - Combine ambient (large, soft) with focused (small, crisp)
2. **Higher opacity on dark** - Use 0.2-0.3 opacity vs 0.1-0.15 on light backgrounds
3. **Inset highlights** - Top inner glow simulates overhead lighting

### Border Strategy
1. **Increase alpha on dark** - Use 0.08-0.12 instead of 0.04 for visibility
2. **Subtle gradients** - Top-left to bottom-right feels natural
3. **Glow on interaction** - Brand color borders/glows reinforce clickability

### Spacing Strategy
1. **More generous on premium sites** - 80-100px sections vs 60-80px standard
2. **Asymmetry for interest** - 1:1.2 ratios prevent monotony
3. **Consistent rhythm** - Use same spacing multiples throughout (e.g., 24px, 48px, 96px)

---

## Browser Compatibility Notes

- All CSS uses standard properties (no vendor prefixes needed for modern browsers)
- `min-height` with `vh` units: IE11+ (99%+ browser support)
- CSS Grid: All modern browsers (IE11 needs `-ms-` prefix but degrading to single column is fine)
- Multiple `box-shadow`: All browsers supporting box-shadow
- `mask-composite`: Modern browsers (Safari needs `-webkit-` prefix, included above)

---

## Performance Considerations

- **Shadows don't trigger repaints** when not changing - static shadows are performant
- **Transform on hover** uses GPU acceleration - very smooth
- **Transition timing** kept to 0.15s for snappy feel without lag
- **No JavaScript required** - pure CSS, very efficient

---

## Testing Checklist

- [ ] Verify spacing looks good on mobile (320px width)
- [ ] Check tablet breakpoint (768px) - cards should start asymmetry
- [ ] Confirm desktop (1100px+) has full 100px spacing and 100vh hero
- [ ] Test hover states on all card types
- [ ] Verify dark mode contrast for borders/shadows
- [ ] Check that asymmetric grids don't break with different content lengths
