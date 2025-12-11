# Hero Gradients - Output

## CSS Code

```css
/* Add to :root {} section in styles.css */

/* Hero gradient backgrounds */
--hero-gradient-navy: linear-gradient(135deg, #0c1a3a 0%, #0A0F1E 50%, #0c1a3a 100%);
--hero-gradient-dark: linear-gradient(180deg, #0A0F1E 0%, #060a14 100%);
--hero-overlay-gold: rgba(212, 175, 55, 0.1); /* 10% opacity gold overlay */
```

```css
/* Add after hero section styles in styles.css */

/* ---- Hero Gradient Backgrounds ---- */
/* Premium navy-to-dark gradient with gold overlay for hero sections */
.hero,
.hero-section {
  position: relative;
  background: var(--hero-gradient-navy);
  overflow: hidden;
}

/* Gold overlay using position absolute */
.hero::before,
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--hero-overlay-gold);
  pointer-events: none;
  z-index: 0;
}

/* Ensure content stays above the overlay */
.hero > *,
.hero-section > * {
  position: relative;
  z-index: 1;
}

/* Responsive gradient adjustments */
@media (min-width: 768px) {
  .hero,
  .hero-section {
    background: linear-gradient(135deg, #0c1a3a 0%, #0A0F1E 40%, #060a14 100%);
  }
}

@media (min-width: 1100px) {
  .hero,
  .hero-section {
    background: linear-gradient(135deg, #0d1f42 0%, #0A0F1E 30%, #0A0F1E 70%, #060a14 100%);
  }
}
```

---

## Deployment Steps

### GitHub Commands

```bash
# 1. Navigate to repository
cd /path/to/keyturn-clinics-site

# 2. Checkout main branch
git checkout main

# 3. Pull latest changes
git pull origin main

# 4. Open styles.css and add the CSS code above
# - Add variables (lines 1-3) to the :root section
# - Add hero gradient styles (lines 6-62) after hero section styles

# 5. Check your changes
git status
git diff styles.css

# 6. Stage the file
git add styles.css

# 7. Commit with message
git commit -m "Add hero gradients"

# 8. Push to main
git push origin main
```

### Complete One-Line Sequence

```bash
cd /path/to/keyturn-clinics-site && git checkout main && git pull origin main && git add styles.css && git commit -m "Add hero gradients" && git push origin main
```

---

## Summary

✅ **CSS Variables**: 3 variables for navy gradient and gold overlay  
✅ **Position Pattern**: Relative parent + absolute overlay ::before  
✅ **Responsive**: 3 breakpoints (mobile, tablet, desktop)  
✅ **Target Classes**: `.hero` and `.hero-section`  
✅ **Preserved**: Button and link colors unchanged  

**Result**: Premium navy-to-dark gradient (#0A0F1E base) with subtle gold overlay (#D4AF37 at 10% opacity) on all hero sections.
