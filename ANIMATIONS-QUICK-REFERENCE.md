# Premium Animations - Quick CSS Reference

## Copy-Paste Ready CSS Snippets

### 1. Scroll Reveal Animation
```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 2. Checklist Item Reveal
```css
.checklist-item {
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.checklist-item.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.checklist-item:nth-child(1).is-visible { transition-delay: 0.05s; }
.checklist-item:nth-child(2).is-visible { transition-delay: 0.1s; }
.checklist-item:nth-child(3).is-visible { transition-delay: 0.15s; }
.checklist-item:nth-child(4).is-visible { transition-delay: 0.2s; }
.checklist-item:nth-child(5).is-visible { transition-delay: 0.25s; }
.checklist-item:nth-child(6).is-visible { transition-delay: 0.3s; }
.checklist-item:nth-child(7).is-visible { transition-delay: 0.35s; }
.checklist-item:nth-child(8).is-visible { transition-delay: 0.4s; }
.checklist-item:nth-child(9).is-visible { transition-delay: 0.45s; }
.checklist-item:nth-child(10).is-visible { transition-delay: 0.5s; }
```

### 3. Enhanced Card Hover
```css
.card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(90, 162, 255, 0.15);
  border-color: rgba(90, 162, 255, 0.3);
}
```

### 4. Premium Pricing Card Hover
```css
.pricing-grid .card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out, filter 0.3s ease-in-out;
}

.pricing-grid .card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 0 30px rgba(90, 162, 255, 0.6), 0 0 60px rgba(90, 162, 255, 0.3), 0 12px 40px rgba(0, 0, 0, 0.25);
  border-color: rgba(90, 162, 255, 0.8);
}
```

### 5. Parallax Hero Mockup
```css
.hero-mock-parallax {
  will-change: transform;
  transition: transform 0.3s ease-out;
}
```

### 6. Floating Hero Mockup
```css
@keyframes heroMockFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.hero-mock-float {
  animation: heroMockFloat 6s ease-in-out infinite;
}
```

### 7. Section Reveal
```css
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

### 8. Card Grid Stagger
```css
.card-grid-item {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}

.card-grid-item.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.card-grid-item:nth-child(1).is-visible { transition-delay: 0.05s; }
.card-grid-item:nth-child(2).is-visible { transition-delay: 0.1s; }
.card-grid-item:nth-child(3).is-visible { transition-delay: 0.15s; }
.card-grid-item:nth-child(4).is-visible { transition-delay: 0.2s; }
.card-grid-item:nth-child(5).is-visible { transition-delay: 0.25s; }
.card-grid-item:nth-child(6).is-visible { transition-delay: 0.3s; }
```

### 9. List Reveal
```css
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
.list-reveal.is-visible li:nth-child(3) { transition-delay: 0.15s; }
.list-reveal.is-visible li:nth-child(4) { transition-delay: 0.2s; }
.list-reveal.is-visible li:nth-child(5) { transition-delay: 0.25s; }
.list-reveal.is-visible li:nth-child(6) { transition-delay: 0.3s; }
.list-reveal.is-visible li:nth-child(7) { transition-delay: 0.35s; }
.list-reveal.is-visible li:nth-child(8) { transition-delay: 0.4s; }
.list-reveal.is-visible li:nth-child(9) { transition-delay: 0.45s; }
.list-reveal.is-visible li:nth-child(10) { transition-delay: 0.5s; }
```

### 10. Accessibility - Reduced Motion
```css
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

## Required JavaScript (Webflow Custom Code)

Paste this into **Site Settings → Custom Code → Before </body> tag**:

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

---

## Quick Usage Examples

### Fade in a section on scroll:
```html
<section class="animate-on-scroll">
  <h2>Your heading</h2>
  <p>Your content</p>
</section>
```

### Animated checklist:
```html
<ol>
  <li class="checklist-item">Item 1</li>
  <li class="checklist-item">Item 2</li>
  <li class="checklist-item">Item 3</li>
</ol>
```

### Animated card grid:
```html
<div class="pricing-grid">
  <div class="card card-grid-item">Card 1</div>
  <div class="card card-grid-item">Card 2</div>
  <div class="card card-grid-item">Card 3</div>
</div>
```

### Parallax hero mockup:
```html
<div class="hero-mock hero-mock-parallax">
  <!-- mockup content -->
</div>
```

### Floating hero mockup:
```html
<div class="hero-mock hero-mock-float">
  <!-- mockup content -->
</div>
```

### Animated bullet list:
```html
<ul class="list-reveal">
  <li>Feature one</li>
  <li>Feature two</li>
  <li>Feature three</li>
</ul>
```

---

## Animation Timing Overview

| Element | Duration | Easing | Stagger |
|---------|----------|--------|---------|
| Sections | 0.4-0.5s | ease-in-out | None |
| Cards | 0.3s | ease-in-out | None |
| Card Grid | 0.4s | ease-in-out | 0.05s |
| Checklist | 0.3s | ease-in-out | 0.05s |
| Lists | 0.3s | ease-in-out | 0.05s |
| Parallax | 0.3s | ease-out | None |
| Float | 6s | ease-in-out | Infinite |
