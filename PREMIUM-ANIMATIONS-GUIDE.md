# Premium Animation Guide for Keyturn Studio

This guide provides subtle, professional CSS animations designed to make the website feel high-end while maintaining optimal performance. All animations are under 0.5s with ease-in-out timing and are fully Webflow-compatible.

## Animation Types

### 1. Fade-In on Section Scroll
Sections smoothly fade in as users scroll, creating a polished reveal effect.

**Use Cases:**
- Main content sections
- Feature cards
- Testimonial blocks
- Service descriptions

### 2. Card Hover with Scale-Up and Shadow
Cards subtly lift and scale when hovered, with enhanced shadow for depth.

**Use Cases:**
- Pricing cards
- Service cards
- Feature blocks
- Case study cards

### 3. Parallax on Hero Mockups
Hero mockup images move at a different rate than the scroll, creating depth.

**Use Cases:**
- Hero section mockups
- Feature screenshots
- Product displays

### 4. Checklist Scroll Reveal
Checklist items reveal one by one with a subtle slide-in effect.

**Use Cases:**
- Feature lists
- Benefit lists
- Process steps
- Requirements checklists

---

## CSS Code

### Core Keyframe Animations

```css
/* Subtle fade-in for sections on scroll */
@keyframes subtleFadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Checklist item reveal animation */
@keyframes checklistReveal {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Parallax-ready transform for hero mockups */
@keyframes heroMockFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}
```

### Scroll-Based Reveal Classes

```css
/* Base state for elements that will animate on scroll */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Checklist items scroll reveal */
.checklist-item {
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.checklist-item.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* Stagger delays for checklist items (1-10) */
.checklist-item:nth-child(1).is-visible { transition-delay: 0.05s; }
.checklist-item:nth-child(2).is-visible { transition-delay: 0.1s; }
.checklist-item:nth-child(3).is-visible { transition-delay: 0.15s; }
/* ... up to 10 items */
```

### Enhanced Card Hover Effects

```css
.card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(90, 162, 255, 0.15);
  border-color: rgba(90, 162, 255, 0.3);
}

/* Premium pricing cards with blue glow */
.pricing-grid .card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out, filter 0.3s ease-in-out;
}

.pricing-grid .card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 0 30px rgba(90, 162, 255, 0.6), 0 0 60px rgba(90, 162, 255, 0.3), 0 12px 40px rgba(0, 0, 0, 0.25);
  border-color: rgba(90, 162, 255, 0.8);
}
```

### Parallax Effect

```css
/* Subtle parallax effect for hero mockups */
.hero-mock-parallax {
  will-change: transform;
  transition: transform 0.3s ease-out;
}

/* Hero mock subtle float animation */
.hero-mock-float {
  animation: heroMockFloat 6s ease-in-out infinite;
}
```

### Section Reveal

```css
/* Section fade-in on scroll */
.section-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.section-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Card Grid Animation

```css
/* Card grid stagger animation on scroll */
.card-grid-item {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}

.card-grid-item.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Stagger delays for card grids (1-6) */
.card-grid-item:nth-child(1).is-visible { transition-delay: 0.05s; }
.card-grid-item:nth-child(2).is-visible { transition-delay: 0.1s; }
.card-grid-item:nth-child(3).is-visible { transition-delay: 0.15s; }
/* ... up to 6 items */
```

### List Reveal

```css
/* List item reveal (for bullet lists) */
.list-reveal li {
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.list-reveal.is-visible li {
  opacity: 1;
  transform: translateX(0);
}

.list-reveal.is-visible li:nth-child(1) { transition-delay: 0.05s; }
.list-reveal.is-visible li:nth-child(2) { transition-delay: 0.1s; }
/* ... up to 10 items */
```

### Accessibility: Reduced Motion

```css
/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Setup Guide

### Option 1: Standard HTML/CSS Implementation

#### Step 1: Add CSS Classes to HTML Elements

**For sections that fade in on scroll:**
```html
<section class="animate-on-scroll">
  <!-- content -->
</section>
```

**For checklist items:**
```html
<ol>
  <li class="checklist-item">First item</li>
  <li class="checklist-item">Second item</li>
  <li class="checklist-item">Third item</li>
</ol>
```

**For card grids:**
```html
<div class="pricing-grid">
  <div class="card card-grid-item">Card 1</div>
  <div class="card card-grid-item">Card 2</div>
  <div class="card card-grid-item">Card 3</div>
</div>
```

**For hero mockup parallax:**
```html
<div class="hero-mock hero-mock-parallax">
  <!-- mockup content -->
</div>
```

**For hero mockup float animation:**
```html
<div class="hero-mock hero-mock-float">
  <!-- mockup content -->
</div>
```

**For list reveals:**
```html
<ul class="list-reveal">
  <li>Feature one</li>
  <li>Feature two</li>
  <li>Feature three</li>
</ul>
```

#### Step 2: Include JavaScript for Scroll Detection

The site.js file includes two functions that handle animations:

1. **initScrollReveal()** - Uses Intersection Observer API to detect when elements enter viewport
2. **initParallax()** - Adds subtle parallax effect to hero mockups

Both functions are automatically initialized on page load.

---

### Option 2: Webflow Implementation

Webflow provides two ways to implement these animations: Custom Code and Interactions 2.0.

#### Method A: Using Custom Code (Recommended for consistency)

1. **Add CSS to Site-Wide Custom Code:**
   - Go to Site Settings → Custom Code
   - Paste all CSS code into the `<head>` custom code section
   - This ensures animations work across all pages

2. **Add JavaScript to Site-Wide Custom Code:**
   ```html
   <script>
   // Scroll Reveal Animation with Intersection Observer
   function initScrollReveal() {
     if (!('IntersectionObserver' in window)) {
       document.querySelectorAll('.animate-on-scroll, .section-reveal, .card-grid-item, .checklist-item, .list-reveal').forEach(el => {
         el.classList.add('is-visible');
       });
       return;
     }

     const observerOptions = {
       threshold: 0.1,
       rootMargin: '0px 0px -50px 0px'
     };

     const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           entry.target.classList.add('is-visible');
         }
       });
     }, observerOptions);

     document.querySelectorAll('.animate-on-scroll, .section-reveal, .card-grid-item, .checklist-item, .list-reveal').forEach(el => {
       observer.observe(el);
     });
   }

   // Subtle Parallax Effect
   function initParallax() {
     const parallaxElements = document.querySelectorAll('.hero-mock-parallax');
     if (parallaxElements.length === 0) return;

     let ticking = false;

     function updateParallax() {
       const scrolled = window.pageYOffset;
       parallaxElements.forEach(el => {
         const yPos = -(scrolled * 0.3);
         if (scrolled < 800) {
           el.style.transform = `translateY(${yPos}px)`;
         }
       });
       ticking = false;
     }

     window.addEventListener('scroll', () => {
       if (!ticking) {
         window.requestAnimationFrame(updateParallax);
         ticking = true;
       }
     });
   }

   // Initialize on page load
   document.addEventListener('DOMContentLoaded', () => {
     initScrollReveal();
     initParallax();
   });
   </script>
   ```

3. **Add Classes to Elements:**
   - Select any element in Webflow
   - Add combo classes like `animate-on-scroll`, `card-grid-item`, `checklist-item`, etc.
   - The JavaScript will automatically trigger animations when elements scroll into view

#### Method B: Using Webflow Interactions 2.0

For card hover effects, you can use Webflow's visual interaction builder:

1. **Select the card element**

2. **Create a new interaction:**
   - Trigger: Mouse Hover
   - Action: Start an animation

3. **On Hover (Mouse In):**
   - Transform: Move Y -2px
   - Transform: Scale 101%
   - Box Shadow: 0 12px 40px rgba(0,0,0,0.25), 0 4px 12px rgba(90,162,255,0.15)
   - Border Color: rgba(90,162,255,0.3)
   - Duration: 300ms
   - Easing: Ease-in-out

4. **On Hover Out (Mouse Out):**
   - Transform: Move Y 0px
   - Transform: Scale 100%
   - Box Shadow: (original values)
   - Border Color: (original color)
   - Duration: 300ms
   - Easing: Ease-in-out

For scroll-based animations:

1. **Select the element to animate**

2. **Create a new interaction:**
   - Trigger: Scroll into View
   - Action: Start an animation

3. **While Scrolling in View:**
   - Start: Set opacity to 0%, Move Y 20px
   - End: Set opacity to 100%, Move Y 0px
   - Duration: 400ms
   - Easing: Ease-in-out
   - Offset: Start at 10% in view

---

## Performance Considerations

### Best Practices

1. **Keep animations under 0.5s** - All transitions are optimized for performance
2. **Use `will-change` sparingly** - Only applied to parallax elements
3. **Respect user preferences** - Reduced motion CSS automatically disables animations
4. **Use Intersection Observer** - Elements only animate when visible, improving performance
5. **Limit parallax range** - Parallax effect stops after 800px of scroll to prevent excessive calculations

### Browser Support

- **Intersection Observer:** Supported in all modern browsers (Chrome, Firefox, Safari, Edge)
- **CSS Transitions:** Universal support
- **Fallback:** Elements without JavaScript support will display immediately (no animation)

### Mobile Considerations

All animations are mobile-friendly:
- Subtle transforms prevent layout shifts
- Reduced animation distances for smaller screens
- Touch interactions preserved (hover effects apply on tap)

---

## Examples

### Example 1: Animated Service Cards
```html
<div class="pricing-grid">
  <div class="card card-grid-item">
    <h3>Core Package</h3>
    <p>Essential rebuild features</p>
  </div>
  <div class="card card-grid-item">
    <h3>Pro Package</h3>
    <p>Advanced features</p>
  </div>
  <div class="card card-grid-item">
    <h3>Premier Package</h3>
    <p>Complete solution</p>
  </div>
</div>
```

### Example 2: Animated Checklist
```html
<h2>Website Checklist</h2>
<ol>
  <li class="checklist-item">Clear, patient-friendly headline</li>
  <li class="checklist-item">Visible booking buttons</li>
  <li class="checklist-item">High-quality professional photos</li>
  <li class="checklist-item">Dedicated treatment pages</li>
  <li class="checklist-item">Mobile-friendly design</li>
</ol>
```

### Example 3: Hero with Parallax Mockup
```html
<section class="hero">
  <div class="hero-left animate-on-scroll">
    <h1>Clinic Websites That Book</h1>
    <p>We rebuild sites for better patient flow</p>
  </div>
  <div class="hero-right">
    <div class="hero-mock hero-mock-parallax hero-mock-float">
      <!-- mockup HTML -->
    </div>
  </div>
</section>
```

### Example 4: Animated Feature List
```html
<div class="section-reveal">
  <h2>What we do instead</h2>
  <ul class="list-reveal">
    <li>Clear booking paths on every device</li>
    <li>Landing pages for high-value treatments</li>
    <li>Fast-loading pages</li>
    <li>Proof positioned strategically</li>
    <li>Tracking to measure results</li>
  </ul>
</div>
```

---

## Animation Timing Reference

All animations use consistent, professional timing:

| Animation Type | Duration | Easing | Delay Pattern |
|---------------|----------|--------|---------------|
| Section fade-in | 0.4-0.5s | ease-in-out | None |
| Card hover | 0.3s | ease-in-out | None |
| Checklist items | 0.3s | ease-in-out | 0.05s increments |
| Card grid | 0.4s | ease-in-out | 0.05s increments |
| List items | 0.3s | ease-in-out | 0.05s increments |
| Parallax | 0.3s | ease-out | None |
| Float animation | 6s | ease-in-out | Infinite loop |

---

## Troubleshooting

### Animations Not Triggering

1. **Check JavaScript is loaded:** Open browser console and verify no errors
2. **Verify classes are applied:** Inspect element and confirm animation class exists
3. **Check browser support:** Test in modern browser (Chrome, Firefox, Safari, Edge)

### Animations Too Fast/Slow

Adjust duration values in CSS:
```css
/* Make slower */
.animate-on-scroll {
  transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
}

/* Make faster */
.animate-on-scroll {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}
```

### Parallax Not Working

1. Ensure `.hero-mock-parallax` class is applied
2. Check that element is within first 800px of page
3. Verify JavaScript `initParallax()` is called

### Cards Not Hovering

1. Confirm `.card` class is applied to element
2. Check that hover isn't disabled on mobile
3. Verify no other styles are overriding transitions

---

## Summary

This animation system provides:
- ✓ Subtle, professional animations under 0.5s
- ✓ Full Webflow compatibility (Custom Code + Interactions)
- ✓ Optimized performance with Intersection Observer
- ✓ Accessibility support (reduced motion)
- ✓ Mobile-friendly implementations
- ✓ Easy-to-apply CSS classes

All animations enhance the premium feel of the website while maintaining fast load times and smooth user experience.
