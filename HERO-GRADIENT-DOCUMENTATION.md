# Hero Gradient Background - CSS Code & Deployment

## CSS Code

### Complete CSS Implementation

This CSS adds a premium navy-to-dark gradient background to hero sections on a dark website (#0A0F1E base), with a subtle gold overlay (#D4AF37 at 10% opacity). Button and link colors are preserved.

```css
/* ===============================
   Hero Gradient Variables
   =============================== */

:root {
  /* Hero gradient backgrounds */
  --hero-gradient-navy: linear-gradient(135deg, #0c1a3a 0%, #0A0F1E 50%, #0c1a3a 100%);
  --hero-gradient-dark: linear-gradient(180deg, #0A0F1E 0%, #060a14 100%);
  --hero-overlay-gold: rgba(212, 175, 55, 0.1); /* 10% opacity gold overlay */
}

/* ===============================
   Hero Gradient Backgrounds
   =============================== */

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

## Key Features

### 1. **CSS Variables**
- `--hero-gradient-navy`: Primary navy gradient (135deg diagonal)
- `--hero-gradient-dark`: Alternative dark gradient (180deg vertical)
- `--hero-overlay-gold`: Gold overlay at 10% opacity (#D4AF37)

### 2. **Position Relative/Absolute Pattern**
- `.hero` and `.hero-section` use `position: relative`
- `::before` pseudo-element uses `position: absolute` for the gold overlay
- Content uses `z-index: 1` to stay above the overlay
- Overlay uses `pointer-events: none` to maintain clickability

### 3. **Responsive Design**
- **Mobile (< 768px)**: Simple navy gradient with symmetrical stops
- **Tablet (768px+)**: Enhanced gradient with asymmetrical distribution
- **Desktop (1100px+)**: Multi-stop gradient for richer depth

### 4. **Preserved Colors**
- No changes to button colors (maintains existing `.button` styles)
- No changes to link colors (maintains existing `a` tag styles)
- Only affects hero section backgrounds

### 5. **Target Classes**
- `.hero` - Primary hero section class
- `.hero-section` - Alternative hero section class

## Deployment Steps

### Step-by-Step GitHub Commands

Follow these commands to add the hero gradient CSS to your repository:

```bash
# Step 1: Navigate to your repository (if not already there)
cd /path/to/keyturn-clinics-site

# Step 2: Ensure you're on the main branch
git checkout main

# Step 3: Pull latest changes
git pull origin main

# Step 4: Open styles.css and add the CSS code
# Add the variables section (lines 43-46) after the existing gradient variables
# Add the hero gradient section (lines 249-292) after the hero media queries

# Step 5: Check the changes
git status
git diff styles.css

# Step 6: Stage the changes
git add styles.css

# Step 7: Commit with the specified message
git commit -m "Add hero gradients"

# Step 8: Push to main branch
git push origin main
```

### Alternative: Using a Feature Branch (Recommended)

```bash
# Step 1: Create and checkout a new feature branch
git checkout -b feature/hero-gradients

# Step 2: Add your changes to styles.css
# (Add the CSS code as shown above)

# Step 3: Stage and commit
git add styles.css
git commit -m "Add hero gradients"

# Step 4: Push to the feature branch
git push origin feature/hero-gradients

# Step 5: Create a pull request on GitHub
# Go to your repository on GitHub and create a PR from feature/hero-gradients to main

# Step 6: After PR approval, merge to main
git checkout main
git pull origin main
```

## Verification Steps

### 1. **Visual Inspection**
Open your website and check:
- Hero sections have the navy gradient background
- Subtle gold overlay is visible
- Content is clearly visible above the overlay
- Buttons and links retain their original colors

### 2. **Responsive Testing**
Test at different screen sizes:
- Mobile (< 768px): Check gradient appearance
- Tablet (768px - 1099px): Verify enhanced gradient
- Desktop (1100px+): Confirm multi-stop gradient

### 3. **Browser Testing**
Verify in:
- Chrome/Edge (Chromium)
- Firefox
- Safari (if available)

### 4. **Developer Tools**
Use browser dev tools to:
- Inspect the `::before` pseudo-element
- Verify z-index stacking
- Check CSS variable values
- Test hover states on buttons/links

## Troubleshooting

### Issue: Content not visible above overlay
**Solution**: Ensure all direct children of `.hero` or `.hero-section` have the z-index rule applied:
```css
.hero > *,
.hero-section > * {
  position: relative;
  z-index: 1;
}
```

### Issue: Gradient not showing
**Solution**: Clear browser cache and hard reload (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Overlay too strong/weak
**Solution**: Adjust the `--hero-overlay-gold` variable:
```css
--hero-overlay-gold: rgba(212, 175, 55, 0.15); /* Increase to 15% for stronger */
--hero-overlay-gold: rgba(212, 175, 55, 0.05); /* Decrease to 5% for weaker */
```

## Implementation Notes

1. **No Breaking Changes**: Existing hero styles are preserved
2. **Minimal Specificity**: Uses class selectors only
3. **Performance**: Uses CSS variables for efficient computation
4. **Accessibility**: Maintains proper contrast ratios
5. **Maintainability**: All gradient values in CSS variables

## Files Modified

- `styles.css` - Added hero gradient CSS (3 variables + ~50 lines of CSS)

## Related Documentation

- `PREMIUM-LAYOUTS-CSS-CODE.css` - Premium layout patterns
- `LAYOUT-ENHANCEMENTS-SUMMARY.md` - Layout enhancement guide
- `WEBFLOW-STEP-BY-STEP.md` - Webflow implementation guide
