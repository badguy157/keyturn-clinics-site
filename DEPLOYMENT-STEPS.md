# Premium Layouts Deployment Steps

## Step-by-Step GitHub Commands

Follow these commands exactly to add the premium layouts to your `styles.css`, commit with the message "Add premium layouts", and push to the main branch.

---

### **Step 1: Navigate to Your Repository**

```bash
cd /path/to/keyturn-clinics-site
```

Replace `/path/to/keyturn-clinics-site` with your actual repository path.

---

### **Step 2: Ensure You're on the Main Branch**

```bash
git checkout main
```

This switches you to the main branch.

---

### **Step 3: Pull Latest Changes**

```bash
git pull origin main
```

This ensures you have the latest code from the remote repository.

---

### **Step 4: Open styles.css and Add the Premium Layouts CSS**

Option A - **Manual Addition:**
1. Open `styles.css` in your text editor
2. Copy the entire contents of `PREMIUM-LAYOUTS-CSS-CODE.css`
3. Paste it at the end of `styles.css` (or in the appropriate location)
4. Save the file

Option B - **Command Line Append:**

```bash
cat PREMIUM-LAYOUTS-CSS-CODE.css >> styles.css
```

This appends the premium layouts CSS to the end of your styles.css file.

---

### **Step 5: Verify the Changes**

```bash
git diff styles.css
```

This shows you what was added. Review to ensure the CSS was added correctly.

---

### **Step 6: Stage the Modified File**

```bash
git add styles.css
```

This stages `styles.css` for commit.

---

### **Step 7: Commit with the Specified Message**

```bash
git commit -m "Add premium layouts"
```

This creates a commit with your changes.

---

### **Step 8: Push to Main Branch**

```bash
git push origin main
```

This pushes your commit to the remote main branch on GitHub.

---

## Alternative: Using Git Add All

If you made changes to multiple files or want to commit everything:

```bash
# Stage all changes
git add .

# Commit with message
git commit -m "Add premium layouts"

# Push to main
git push origin main
```

---

## Verification Commands

After pushing, verify your changes:

```bash
# Check commit history
git log --oneline -5

# Verify remote status
git status
```

---

## Rollback (If Needed)

If you need to undo the commit (before pushing):

```bash
# Undo the last commit but keep changes
git reset --soft HEAD~1

# Undo the last commit and discard changes
git reset --hard HEAD~1
```

If already pushed:

```bash
# Revert the commit (creates a new commit that undoes the changes)
git revert HEAD
git push origin main
```

---

## Complete Command Sequence (Quick Reference)

```bash
# 1. Navigate and prepare
cd /path/to/keyturn-clinics-site
git checkout main
git pull origin main

# 2. Add CSS to styles.css (choose one method)
# Method A: Append via command line
cat PREMIUM-LAYOUTS-CSS-CODE.css >> styles.css

# Method B: Or manually edit styles.css in your editor
# (copy contents from PREMIUM-LAYOUTS-CSS-CODE.css)

# 3. Commit and push
git add styles.css
git commit -m "Add premium layouts"
git push origin main

# 4. Verify
git log --oneline -5
```

---

## Important Notes

1. **Backup First**: Always create a backup of `styles.css` before making changes
2. **Test Locally**: Test the changes in your local environment before pushing
3. **Review Diff**: Use `git diff` to review changes before committing
4. **Branch Strategy**: For production sites, consider creating a feature branch first:
   ```bash
   git checkout -b feature/premium-layouts
   # Make changes, commit
   git push origin feature/premium-layouts
   # Then create a Pull Request on GitHub
   ```

---

## CSS Features Included

✅ **Section Padding**: 80px mobile → 88px tablet → 100px desktop  
✅ **Hero Height**: 80vh mobile → 90vh tablet → 100vh desktop  
✅ **Asymmetric Grids**: 
  - 2-column: `1fr 1.2fr`
  - 3-column: `0.95fr 1.1fr 0.95fr`  
✅ **Subtle Shadows**: Layered shadows (ambient + contact + inset)  
✅ **Enhanced Borders**: `rgba(255,255,255,.12)` for dark backgrounds  
✅ **Smooth Transitions**: 0.3s ease for hover effects  
✅ **Responsive Design**: Mobile-first with tablet and desktop breakpoints

---

## Support

If you encounter any issues:
- Check `git status` to see current state
- Use `git log` to review commit history
- Use `git diff` to see uncommitted changes
- Refer to `PREMIUM-LAYOUTS-CSS-CODE.css` for the complete CSS code
