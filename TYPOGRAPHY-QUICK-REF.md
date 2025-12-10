# Typography Quick Reference

**Premium dark-themed typography with Playfair Display + Inter**

---

## 📚 Documentation Files

| File | Purpose | Use When... |
|------|---------|-------------|
| **PREMIUM-TYPOGRAPHY-CSS.md** | Ready-to-use CSS code snippets | You need copy-paste CSS code organized by section |
| **TYPOGRAPHY-UPGRADE.md** | Comprehensive tutorial | You want detailed explanations and Webflow instructions |
| **TYPOGRAPHY-IMPLEMENTATION-SUMMARY.md** | Status report | You want to verify what's implemented |
| **TYPOGRAPHY-QUICK-REF.md** (this file) | Quick lookup | You need a fast reference |

---

## 🎨 Font Stack

```css
/* Headings - Sophisticated Serif */
--font-heading: 'Playfair Display', Georgia, serif;

/* Body - Clean Sans-Serif */
--font: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
```

---

## 📏 Typography Scale

| Element | Font | Size | Weight | Letter-spacing |
|---------|------|------|--------|----------------|
| Hero Title (H1) | Playfair | 36-72px | 700 | 1px |
| Heading (H2) | Playfair | 28-36px | 600 | 0.5px |
| Card Title | Playfair | 20px | 700 | 0.5px |
| Body | Inter | 17px | 400 | 0 |
| Lead Text | Inter | 17-20px | 400 | 0 |

---

## 🎯 Essential CSS

### Import Fonts (Add to HTML `<head>`)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
```

### All Headings
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
  line-height: 1.3;
  font-weight: 600;
}
```

### Hero Title
```css
.hero-title {
  font-family: var(--font-heading);
  letter-spacing: 1px;
  font-weight: 700;
}
```

### Body Text
```css
body {
  font-family: var(--font);
  font-size: 17px;
  line-height: 1.6;
}
```

---

## 🌙 Dark Theme Colors

```css
--brand-bg: #0a1220;        /* Navy background */
--brand-text: #e6ebf5;      /* Light text */
--brand-muted: #a6b3cf;     /* Muted text */
--brand-primary: #5aa2ff;   /* Blue accent */
```

---

## ✅ Quick Check

Already implemented? Check:
- [ ] Google Fonts loaded in HTML
- [ ] CSS variables defined in `:root`
- [ ] Headings use Playfair Display
- [ ] Letter-spacing on headings (0.5-1px)
- [ ] Body uses Inter

---

## 🔗 Related Files

- **styles.css** - Lines 66-67 (variables), 97 (body), 103-109 (headings), 243-249 (hero)
- **index.html** - Lines 18-20 (Google Fonts import)

---

**Status**: ✅ Fully Implemented  
**Last Updated**: 2025-12-10
