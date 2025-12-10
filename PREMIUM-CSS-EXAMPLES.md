# Premium CSS Examples - Webflow Compatible

This file contains ready-to-use CSS snippets for implementing the premium gold and silver color palette. All snippets are compatible with Webflow's custom code sections.

---

## Table of Contents
1. [CSS Variables Setup](#css-variables-setup)
2. [Premium Button Examples](#premium-button-examples)
3. [Premium Link Examples](#premium-link-examples)
4. [Hero Section Gradients](#hero-section-gradients)
5. [Background Patterns](#background-patterns)
6. [Webflow Integration Notes](#webflow-integration-notes)

---

## CSS Variables Setup

Add these variables to your Webflow site's custom code (Settings → Custom Code → Head Code):

```html
<style>
:root {
  /* Premium metallic accents */
  --premium-gold: #D4AF37;
  --premium-gold-dark: #B8941F;
  --premium-gold-light: #E8C968;
  --premium-silver: #E0E0E0;
  --premium-silver-dark: #C0C0C0;
  
  /* Premium gradients */
  --gradient-gold: linear-gradient(135deg, #D4AF37 0%, #E8C968 50%, #D4AF37 100%);
  --gradient-gold-subtle: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(232, 201, 104, 0.25) 50%, rgba(212, 175, 55, 0.15) 100%);
  --gradient-hero-premium: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(90, 162, 255, 0.08) 50%, rgba(212, 175, 55, 0.08) 100%);
  --gradient-silver: linear-gradient(135deg, #E0E0E0 0%, #F5F5F5 50%, #E0E0E0 100%);
}
</style>
```

---

## Premium Button Examples

### 1. Premium Gold Button (Solid)

**Webflow Instructions:**
1. Add a button element
2. Give it a class name: `btn-premium-gold`
3. Add this CSS to your page or site-wide custom code:

```css
.btn-premium-gold {
  background: linear-gradient(135deg, #D4AF37 0%, #E8C968 50%, #D4AF37 100%);
  color: #0a1220;
  border: 1px solid #D4AF37;
  font-weight: 700;
  padding: 13px 20px;
  border-radius: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.btn-premium-gold:hover {
  background: #E8C968;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(212, 175, 55, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-color: #E8C968;
}

.btn-premium-gold:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

**HTML Example:**
```html
<a href="#contact" class="btn-premium-gold">Get Started Now</a>
```

---

### 2. Premium Gold Outline Button

**Webflow Instructions:**
1. Add a button element
2. Give it a class name: `btn-premium-gold-outline`
3. Add this CSS:

```css
.btn-premium-gold-outline {
  background: transparent;
  color: #D4AF37;
  border: 2px solid #D4AF37;
  font-weight: 600;
  padding: 13px 20px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.btn-premium-gold-outline::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(232, 201, 104, 0.25) 50%, rgba(212, 175, 55, 0.15) 100%);
  transition: left 0.4s ease;
  z-index: 0;
}

.btn-premium-gold-outline:hover {
  color: #E8C968;
  border-color: #E8C968;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
}

.btn-premium-gold-outline:hover::before {
  left: 0;
}
```

**HTML Example:**
```html
<a href="#learn-more" class="btn-premium-gold-outline">Learn More</a>
```

---

### 3. Premium Silver Button (Solid)

```css
.btn-premium-silver {
  background: linear-gradient(135deg, #E0E0E0 0%, #F5F5F5 50%, #E0E0E0 100%);
  color: #0a1220;
  border: 1px solid #E0E0E0;
  font-weight: 700;
  padding: 13px 20px;
  border-radius: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(224, 224, 224, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.btn-premium-silver:hover {
  background: #F5F5F5;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(224, 224, 224, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border-color: #F5F5F5;
}

.btn-premium-silver:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(224, 224, 224, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
}
```

**HTML Example:**
```html
<a href="#contact" class="btn-premium-silver">Contact Us</a>
```

---

### 4. Premium Silver Outline Button

```css
.btn-premium-silver-outline {
  background: transparent;
  color: #E0E0E0;
  border: 2px solid #E0E0E0;
  font-weight: 600;
  padding: 13px 20px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.btn-premium-silver-outline:hover {
  background: rgba(224, 224, 224, 0.1);
  color: #F5F5F5;
  border-color: #F5F5F5;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(224, 224, 224, 0.3);
}
```

**HTML Example:**
```html
<a href="#services" class="btn-premium-silver-outline">View Services</a>
```

---

## Premium Link Examples

### 1. Premium Gold Link with Underline Animation

**Webflow Instructions:**
1. Add a text link element
2. Give it a class name: `link-premium-gold`
3. Add this CSS:

```css
a.link-premium-gold {
  color: #D4AF37;
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
  background: linear-gradient(90deg, #D4AF37 0%, #E8C968 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 100%;
  background-position: 0% 50%;
}

a.link-premium-gold::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #D4AF37 0%, #E8C968 50%, #D4AF37 100%);
  transition: width 0.3s ease;
}

a.link-premium-gold:hover {
  background-position: 100% 50%;
  transform: translateX(2px);
}

a.link-premium-gold:hover::after {
  width: 100%;
}
```

**HTML Example:**
```html
<a href="#premium-services" class="link-premium-gold">Explore Premium Services</a>
```

---

### 2. Premium Silver Link

```css
a.link-premium-silver {
  color: #E0E0E0;
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
}

a.link-premium-silver::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #E0E0E0 0%, #F5F5F5 50%, #E0E0E0 100%);
  transition: width 0.3s ease;
}

a.link-premium-silver:hover {
  color: #F5F5F5;
  transform: translateX(2px);
}

a.link-premium-silver:hover::after {
  width: 100%;
}
```

**HTML Example:**
```html
<a href="#about" class="link-premium-silver">Learn More About Us</a>
```

---

### 3. Premium Link with Animated Arrow Icon

```css
a.link-premium-icon {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #D4AF37;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

a.link-premium-icon::after {
  content: '→';
  transition: transform 0.3s ease;
  display: inline-block;
}

a.link-premium-icon:hover {
  color: #E8C968;
}

a.link-premium-icon:hover::after {
  transform: translateX(4px);
}
```

**HTML Example:**
```html
<a href="#case-studies" class="link-premium-icon">View Case Studies</a>
```

---

## Hero Section Gradients

### 1. Premium Gold Gradient Overlay (Diagonal)

**Webflow Instructions:**
1. Create a section for your hero
2. Add a div inside with class: `hero-premium-gold`
3. Place your hero content inside this div
4. Add this CSS:

```css
.hero-premium-gold {
  position: relative;
  overflow: hidden;
  padding: 80px 20px;
}

.hero-premium-gold::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(90, 162, 255, 0.08) 50%, rgba(212, 175, 55, 0.08) 100%);
  pointer-events: none;
  z-index: 0;
}

.hero-premium-gold > * {
  position: relative;
  z-index: 1;
}
```

**HTML Structure:**
```html
<div class="hero-premium-gold">
  <h1>Your Premium Hero Title</h1>
  <p>Your hero description goes here</p>
  <a href="#" class="btn-premium-gold">Get Started</a>
</div>
```

---

### 2. Premium Gold Radial Gradient (Spotlight Effect)

```css
.hero-premium-gold-radial {
  position: relative;
  overflow: hidden;
  padding: 80px 20px;
}

.hero-premium-gold-radial::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 150%;
  height: 200%;
  background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.15) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.hero-premium-gold-radial > * {
  position: relative;
  z-index: 1;
}
```

---

### 3. Premium Dual-Tone Gradient (Gold + Blue)

```css
.hero-premium-dual {
  position: relative;
  overflow: hidden;
  padding: 80px 20px;
}

.hero-premium-dual::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(212, 175, 55, 0.1) 0%, 
    rgba(90, 162, 255, 0.08) 30%,
    rgba(212, 175, 55, 0.05) 60%,
    rgba(90, 162, 255, 0.1) 100%
  );
  pointer-events: none;
  z-index: 0;
}

.hero-premium-dual > * {
  position: relative;
  z-index: 1;
}
```

---

### 4. Premium Animated Shimmer Effect

```css
.hero-premium-shimmer {
  position: relative;
  overflow: hidden;
  padding: 80px 20px;
}

.hero-premium-shimmer::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(212, 175, 55, 0.1) 45%,
    rgba(232, 201, 104, 0.2) 50%,
    rgba(212, 175, 55, 0.1) 55%,
    transparent 100%
  );
  animation: shimmer 8s linear infinite;
  pointer-events: none;
  z-index: 0;
}

.hero-premium-shimmer > * {
  position: relative;
  z-index: 1;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}
```

---

## Background Patterns

### 1. Premium Gold Accent Bar

**For featured content blocks, callouts, or quotes:**

```css
.hero-accent-bar {
  border-left: 4px solid #D4AF37;
  padding-left: 20px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(232, 201, 104, 0.25) 50%, rgba(212, 175, 55, 0.15) 100%);
  border-radius: 0 12px 12px 0;
  padding: 20px 20px 20px 24px;
}
```

**HTML Example:**
```html
<div class="hero-accent-bar">
  <h3>Premium Feature</h3>
  <p>Highlighted content with gold accent.</p>
</div>
```

---

### 2. Gold Highlight Box

```css
.gold-highlight-box {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(232, 201, 104, 0.15) 100%);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.1);
}
```

---

## Webflow Integration Notes

### Method 1: Page-Level Custom Code
1. Go to Page Settings → Custom Code
2. Add CSS snippets in the "Before </head> tag" section wrapped in `<style>` tags

### Method 2: Site-Wide Custom Code
1. Go to Project Settings → Custom Code
2. Add to "Head Code" section for site-wide availability

### Method 3: Embed Element
1. Drag an Embed element onto your page
2. Paste CSS wrapped in `<style>` tags
3. Paste HTML for the component

### Method 4: Designer Styles (Recommended for reusability)
1. Create a combo class in Webflow Designer
2. Use the custom code as a reference
3. Manually set properties in the Designer for Webflow's visual editor compatibility

### Important Notes
- Test gradient support in different browsers
- Use the ::before pseudo-element approach for overlay effects
- Always set position: relative on parent containers for absolute positioned overlays
- Use z-index to control layering of gradients and content

---

## Browser Support
All CSS examples are tested and compatible with:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android

---

## Customization Tips

### Adjusting Gold Intensity
Change the alpha values in rgba() to make gradients more or less prominent:
- `rgba(212, 175, 55, 0.08)` → Subtle
- `rgba(212, 175, 55, 0.15)` → Medium
- `rgba(212, 175, 55, 0.25)` → Strong

### Animation Speed
Adjust animation duration:
- Fast: `0.2s`
- Medium: `0.3s` (default)
- Slow: `0.5s`

### Shadow Intensity
Modify box-shadow blur and spread:
```css
/* Subtle shadow */
box-shadow: 0 2px 8px rgba(212, 175, 55, 0.2);

/* Strong shadow */
box-shadow: 0 8px 24px rgba(212, 175, 55, 0.5);
```
