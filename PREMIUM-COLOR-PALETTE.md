# Premium Color Palette Upgrade

## Overview
This document outlines the premium color palette upgrade for the Keyturn Studio website, introducing metallic gold and soft silver accents to complement the existing dark navy base (#0A1220) and blue accents.

---

## Updated Color Palette Swatches

### Base Colors (Unchanged)
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Dark Navy Base** | `#0A1220` | Main background color |
| **Primary Text** | `#E6EBF5` | Body text and headings |
| **Muted Text** | `#A6B3CF` | Secondary text |
| **Brand Primary Blue** | `#5AA2FF` | Primary CTA color |
| **Brand Accent Blue** | `#7DB8FF` | Supporting elements |

### Premium Metallic Colors (New)
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Premium Gold** | `#D4AF37` | Primary metallic accent |
| **Gold Dark** | `#B8941F` | Hover states for gold elements |
| **Gold Light** | `#E8C968` | Highlights and active states |
| **Premium Silver** | `#E0E0E0` | Secondary metallic accent |
| **Silver Dark** | `#C0C0C0` | Hover states for silver elements |

### Gradient Definitions

#### Gold Gradients
```css
/* Metallic Gold Gradient */
--gradient-gold: linear-gradient(135deg, #D4AF37 0%, #E8C968 50%, #D4AF37 100%);

/* Subtle Gold Overlay */
--gradient-gold-subtle: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(232, 201, 104, 0.25) 50%, rgba(212, 175, 55, 0.15) 100%);
```

#### Silver Gradient
```css
/* Metallic Silver Gradient */
--gradient-silver: linear-gradient(135deg, #E0E0E0 0%, #F5F5F5 50%, #E0E0E0 100%);
```

#### Hero Section Gradients
```css
/* Premium Hero Overlay (Gold + Blue Blend) */
--gradient-hero-premium: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(90, 162, 255, 0.08) 50%, rgba(212, 175, 55, 0.08) 100%);
```

---

## Color Usage Guidelines

### Buttons
- **Premium Gold Buttons**: Use for high-value CTAs (e.g., "Get Started", "Book Now")
- **Premium Silver Buttons**: Use for secondary premium actions
- **Gold Outline Buttons**: Use for subtle premium CTAs
- **Silver Outline Buttons**: Use for alternative secondary actions

### Links
- **Gold Links**: Use for premium content links, featured resources
- **Silver Links**: Use for secondary navigation, footer links
- **Icon Links**: Use for navigational elements with visual emphasis

### Hero Sections
- **Gold Gradient Overlay**: Use for premium landing pages
- **Gold Radial Gradient**: Use for spotlight hero sections
- **Dual-Tone Gradient**: Use for balanced premium feel (gold + blue)
- **Shimmer Effect**: Use for dynamic, eye-catching hero sections

### Backgrounds
- **Accent Bars**: Use gold left borders for featured content blocks
- **Subtle Overlays**: Use gradient overlays for depth and luxury

---

## Accessibility Notes

### Contrast Ratios
All premium color combinations have been designed to maintain WCAG AA compliance:

- Gold (#D4AF37) on Dark Navy (#0A1220): **Excellent contrast**
- Silver (#E0E0E0) on Dark Navy (#0A1220): **Excellent contrast**
- Gold text requires dark background for readability
- Button text uses dark navy (#0A1220) on gold/silver backgrounds for optimal contrast

### Hover State Visibility
- All hover states include transform and shadow changes for additional visual feedback
- Color changes are supplemented with motion for better accessibility

---

## Visual Examples

### Button Hierarchy
```
1. Premium Gold Solid → Highest priority actions
2. Premium Silver Solid → High priority secondary actions
3. Gold Outline → Medium priority premium actions
4. Silver Outline → Lower priority secondary actions
5. Blue Primary (existing) → Standard CTAs
```

### Link Hierarchy
```
1. Gold Links → Premium content, featured links
2. Silver Links → Secondary premium links
3. Blue Links (existing) → Standard navigation
```

---

## Browser Compatibility
All premium styles use standard CSS properties and are compatible with:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

Gradient backgrounds, transitions, and animations are all widely supported.

---

## Next Steps
1. Review the CSS implementation in `styles.css`
2. Test the premium classes on sample buttons and links
3. Apply to hero sections using the overlay classes
4. Integrate into Webflow using the provided CSS snippets
