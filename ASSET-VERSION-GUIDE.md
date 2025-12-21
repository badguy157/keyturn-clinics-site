# Quick Reference: Updating Asset Versions

## When to Update Versions
Update the version querystring whenever you modify CSS or JavaScript files to ensure users get the latest version.

## How to Update

### Option 1: Manual Find & Replace
1. Open your HTML files
2. Find: `?v=1.0.0`
3. Replace with: `?v=1.0.1` (or next version number)

### Option 2: Command Line (Linux/Mac)
```bash
# Update all HTML files at once
find . -name "*.html" -type f -exec sed -i 's/?v=1.0.0/?v=1.0.1/g' {} +
```

### Option 3: Command Line (using perl for cross-platform)
```bash
# Works on Linux, Mac, and Windows (with Git Bash)
find . -name "*.html" -type f -exec perl -i -pe 's/\?v=1\.0\.0/?v=1.0.1/g' {} +
```

## Version Number Scheme
Use semantic versioning:
- **Patch** (1.0.X): Minor CSS/JS tweaks
- **Minor** (1.X.0): New features or significant changes
- **Major** (X.0.0): Complete redesign or breaking changes

## Example Workflow
```bash
# 1. Make changes to your CSS/JS files
vim styles.css

# 2. Update version in all HTML files
find . -name "*.html" -type f -exec sed -i 's/?v=1.0.0/?v=1.0.1/g' {} +

# 3. Test locally
npm start

# 4. Commit and deploy
git add .
git commit -m "Update styles.css - bump version to 1.0.1"
git push
```

## Files Affected
All HTML files with these patterns:
- `href="*.css?v=X.X.X"`
- `src="/*.js?v=X.X.X"`

Total: 35 HTML files across the repository

## Verification
After updating and deploying, verify the new version is loaded:
```bash
# Check the HTML source
curl https://your-domain.com/ | grep "?v="

# You should see: ?v=1.0.1 (or your new version)
```

## Common Mistakes to Avoid
❌ Don't update only some files - update all HTML files
❌ Don't forget to test after updating versions
❌ Don't use the same version number after making changes
✅ Do update the version consistently across all files
✅ Do test locally before deploying
✅ Do increment the version logically
