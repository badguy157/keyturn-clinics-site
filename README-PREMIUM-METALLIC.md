# Premium Metallic Gold & Silver CSS Code Block

## Overview
This is a complete, ready-to-use CSS code block that adds premium metallic gold (#D4AF37) and soft silver (#E0E0E0) accents to your dark navy website (#0A0F1E base). The styles are designed to be copy-pasted directly into custom code sections (like Webflow's custom code area).

## Features
- ✨ Premium metallic gold (#D4AF37) button accents
- 🌟 Soft silver (#E0E0E0) link hover effects
- 🌊 Navy-to-dark hero gradients with gold overlay
- 🎨 CSS variables for easy customization
- 💪 !important flags for reliable overrides
- 📱 Responsive media queries (mobile, tablet, desktop)
- 🎯 Targets common classes (.button, .w-button, a, .hero-section)
- 🔵 Blue theme fallback option
- ♿ Accessibility support (prefers-reduced-motion)

## Quick Start

### Option 1: Copy the Complete CSS File
Simply copy the entire contents of `premium-metallic-accents.html` and paste it into your custom code section.

### Option 2: Use Individual Components
The CSS is organized into sections - you can copy only the parts you need:
- Button styles
- Link styles
- Hero gradients
- Utility classes

## CSS Classes Reference

### Buttons

#### Gold Buttons (Primary)
```html
<button class="button">Click me</button>
<a href="#" class="button-gold">Link Button</a>
<button class="w-button">Webflow Button</button>
```

#### Gold Outline Buttons
```html
<button class="button-outline">Outline</button>
<a href="#" class="button-gold-outline">Gold Outline</a>
<button class="w-button-outline">Webflow Outline</button>
```

#### Silver Buttons (Secondary)
```html
<button class="button-silver">Silver</button>
<a href="#" class="button-silver">Silver Link</a>
<button class="w-button-silver">Webflow Silver</button>
```

### Links

#### Standard Links (Auto Silver Hover)
All `<a>` tags automatically get silver hover effects.

#### Premium Links with Underline Animation
```html
<a href="#" class="link-premium">Premium Link</a>
<a href="#" class="link-hover-silver">Silver Hover</a>
```

#### Gold Accent Links
```html
<a href="#" class="link-gold">Gold Link</a>
```

### Hero Sections

#### Standard Hero (Navy + Gold Overlay)
```html
<section class="hero-section">
  <div class="hero-content">
    <h1>Your Hero Title</h1>
    <p>Your subtitle here</p>
  </div>
</section>
```

Or use: `.hero` or `.hero-premium`

#### Radial Gold Spotlight
```html
<section class="hero-gold-radial">
  <!-- content -->
</section>
```

#### Dual-Tone Gradient (Gold + Blue)
```html
<section class="hero-dual-tone">
  <!-- content -->
</section>
```

#### Animated Shimmer Effect
```html
<section class="hero-shimmer">
  <!-- content -->
</section>
```

### Utility Classes

#### Text Colors
```html
<p class="text-gold">Gold text</p>
<p class="text-silver">Silver text</p>
```

#### Backgrounds
```html
<div class="bg-gold">Gold background</div>
<div class="bg-silver">Silver background</div>
```

#### Borders
```html
<div class="border-gold">Gold border</div>
<div class="border-silver">Silver border</div>
```

#### Gold Accent Bar
```html
<div class="accent-bar-gold">
  <p>Content with gold left border</p>
</div>
```

### Blue Theme Fallback

Wrap any section in `.theme-blue` to use blue gradients instead of gold:

```html
<div class="theme-blue">
  <button class="button">Blue Button</button>
  <section class="hero-section">
    <!-- Blue theme hero -->
  </section>
</div>
```

## Customization

All colors are defined as CSS variables at the top of the file. You can easily customize them:

```css
:root {
  /* Premium Metallic Colors */
  --premium-gold: #D4AF37;        /* Change to your gold */
  --premium-silver: #E0E0E0;      /* Change to your silver */
  
  /* Dark Navy Base Colors */
  --navy-base: #0A0F1E;           /* Change to your base color */
  
  /* Blue Theme Fallback */
  --blue-primary: #5AA2FF;        /* Change to your blue */
}
```

## Responsive Breakpoints

- **Mobile**: Default styles (< 768px)
- **Tablet**: 768px and up (90vh heroes, larger buttons)
- **Desktop**: 1100px and up (100vh heroes, largest buttons)

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Files Included

1. **premium-metallic-accents.html** - Complete CSS code block wrapped in `<style>` tags (ready to copy-paste)
2. **premium-metallic-demo.html** - Live demo page showing all components
3. **README-PREMIUM-METALLIC.md** - This file (documentation)

## Demo

Open `premium-metallic-demo.html` in your browser to see all the styles in action.

## Integration with Webflow

1. In Webflow, go to Project Settings > Custom Code
2. Copy the entire contents of `premium-metallic-accents.html`
3. Paste into the "Head Code" section
4. Apply the classes to your elements

## Notes

- All styles use `!important` flags to ensure they override existing styles
- Animations respect `prefers-reduced-motion` for accessibility
- Hero sections have built-in responsive height adjustments
- Button padding and font sizes scale with screen size

## Screenshot

![Premium Metallic Accents Demo](https://github.com/user-attachments/assets/60b407d9-d836-4b47-9b1a-e7b0d7e5ded5)

## Support

For questions or issues, please refer to the demo page for visual examples of all components.
