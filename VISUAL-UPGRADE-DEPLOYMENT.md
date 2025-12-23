# Visual Upgrade Deployment Guide

Complete step-by-step guide for uploading assets and deploying visual upgrades to your GitHub repository.

---

## 📋 Pre-Deployment Checklist

Before you begin, ensure you have:

- [ ] Downloaded all images from Unsplash/Pexels or generated with AI
- [ ] Optimized images (compressed to web-friendly sizes)
- [ ] Downloaded SVG icon sets
- [ ] Downloaded video files from Pexels
- [ ] Downloaded Lottie JSON animation files
- [ ] Git installed on your computer
- [ ] Access to your GitHub repository

---

## 📁 Step 1: Organize Your Assets Locally

### 1.1 Create Local Folder Structure

On your computer, create this folder structure before uploading:

```
visual-upgrade-assets/
├── images/
│   ├── case-studies/
│   │   ├── luxury-medspa-01.jpg
│   │   ├── consultation-02.jpg
│   │   ├── treatment-room-03.jpg
│   │   ├── reception-04.jpg
│   │   └── lifestyle-05.jpg
│   ├── icons/
│   │   ├── heroicons/
│   │   │   ├── check-circle.svg
│   │   │   ├── chevron-right.svg
│   │   │   └── sparkles.svg
│   │   ├── lucide/
│   │   └── phosphor/
│   └── backgrounds/
│       └── abstract-navy-pattern.jpg
├── videos/
│   ├── hero-background.mp4
│   └── hero-background-mobile.mp4
└── animations/
    └── lottie/
        ├── process-flow.json
        ├── checkmark-success.json
        ├── calendar-booking.json
        └── loading-minimal.json
```

### 1.2 Optimize Your Assets

**Images:**
- Use TinyPNG (https://tinypng.com/) or ImageOptim to compress
- Target: JPG files under 500KB, PNG files under 300KB
- Maintain quality at 80-90%

**Videos:**
- Use Handbrake to compress MP4 files
- Target: Under 5MB for hero videos
- Resolution: 1920x1080 (desktop), 1280x720 (mobile)
- Format: H.264, 30fps

**Lottie Files:**
- Already optimized (JSON files are small)
- Typical size: 10-100KB

---

## 🔧 Step 2: Set Up Git (If Not Already Done)

### 2.1 Check Git Installation

Open Terminal (Mac/Linux) or Command Prompt (Windows):

```bash
git --version
```

If Git is not installed:
- **Mac:** Install via Homebrew: `brew install git`
- **Windows:** Download from https://git-scm.com/
- **Linux:** `sudo apt-get install git`

### 2.2 Configure Git (First Time Only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## 📥 Step 3: Clone Your Repository

### 3.1 Clone from GitHub

```bash
# Navigate to where you want the project
cd ~/Documents/projects

# Clone your repository
git clone https://github.com/badguy157/keyturn-clinics-site.git

# Navigate into the repository
cd keyturn-clinics-site
```

### 3.2 Check Current Branch

```bash
git branch
```

You should see the current branch (likely `main` or `copilot/upgrade-website-visuals`).

---

## 📤 Step 4: Upload Assets to Repository

### 4.1 Create Folder Structure in Repository

```bash
# From the root of your repository
cd /path/to/keyturn-clinics-site

# Create image directories
mkdir -p images/case-studies
mkdir -p images/icons/heroicons
mkdir -p images/icons/lucide
mkdir -p images/icons/phosphor
mkdir -p images/backgrounds

# Create video directory
mkdir -p videos

# Create animations directory
mkdir -p animations/lottie
```

### 4.2 Copy Assets from Local Folder to Repository

**Option A: Using Terminal/Command Line**

```bash
# Copy case study images
cp ~/visual-upgrade-assets/images/case-studies/*.jpg images/case-studies/

# Copy icons
cp ~/visual-upgrade-assets/images/icons/heroicons/*.svg images/icons/heroicons/
cp ~/visual-upgrade-assets/images/icons/lucide/*.svg images/icons/lucide/
cp ~/visual-upgrade-assets/images/icons/phosphor/*.svg images/icons/phosphor/

# Copy backgrounds
cp ~/visual-upgrade-assets/images/backgrounds/*.jpg images/backgrounds/

# Copy videos
cp ~/visual-upgrade-assets/videos/*.mp4 videos/

# Copy Lottie animations
cp ~/visual-upgrade-assets/animations/lottie/*.json animations/lottie/
```

**Option B: Using File Explorer/Finder (GUI)**

1. Open your file manager
2. Navigate to `keyturn-clinics-site` folder
3. Drag and drop files from `visual-upgrade-assets` to the appropriate folders

### 4.3 Verify Files Were Copied

```bash
# List case study images
ls -lh images/case-studies/

# List videos
ls -lh videos/

# List animations
ls -lh animations/lottie/
```

---

## 🎨 Step 5: Update HTML Files (Optional)

If you want to immediately integrate some visuals, update your HTML files:

### 5.1 Update index.html with Hero Image

**Edit:** `/path/to/keyturn-clinics-site/index.html`

Find the hero section (around line 101) and update:

```html
<!-- Before -->
<section class="hero">
  <div class="container">
    ...
  </div>
</section>

<!-- After - Add background image -->
<section class="hero hero-with-image">
  <div class="hero-image-overlay"></div>
  <div class="container hero-content">
    ...
  </div>
</section>
```

### 5.2 Update styles.css with Hero Background

**Edit:** `/path/to/keyturn-clinics-site/styles.css`

Add at the end of the file:

```css
/* Premium hero background image */
.hero-with-image {
  position: relative;
  background-image: url('/images/case-studies/luxury-medspa-01.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(13, 27, 42, 0.92) 0%,
    rgba(27, 38, 59, 0.85) 100%
  );
  pointer-events: none;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .hero-with-image {
    background-position: 65% center;
  }
}
```

---

## 💾 Step 6: Commit Changes to Git

### 6.1 Check What Files Changed

```bash
# See what's new or modified
git status
```

You should see your new assets listed as "Untracked files".

### 6.2 Stage All New Assets

```bash
# Add all new files
git add images/
git add videos/
git add animations/

# Or add everything at once
git add .
```

### 6.3 Review Staged Changes

```bash
# See what will be committed
git status
```

Should show files under "Changes to be committed".

### 6.4 Commit Changes

```bash
# Commit with descriptive message
git commit -m "Upgrade site visuals: Add premium stock images, icons, videos, and animations"
```

**Alternative: Separate commits for different asset types**

```bash
# Commit images
git add images/
git commit -m "Add premium case study images and icon sets"

# Commit videos
git add videos/
git commit -m "Add hero background video assets"

# Commit animations
git add animations/
git commit -m "Add Lottie animations for process steps"
```

---

## 🚀 Step 7: Push to GitHub

### 7.1 Push to Main Branch

```bash
# Push to main branch
git push origin main
```

**If you're on a different branch:**

```bash
# Check current branch
git branch

# Push to your current branch
git push origin copilot/upgrade-website-visuals
```

### 7.2 Verify Upload on GitHub

1. Go to https://github.com/badguy157/keyturn-clinics-site
2. Navigate to folders: `images/`, `videos/`, `animations/`
3. Verify files are visible

---

## 🔄 Step 8: Update HTML with Integrations (Full Implementation)

Now that assets are uploaded, integrate them into your pages.

### 8.1 Create a New HTML File for Testing

Create `visual-upgrade-demo.html`:

```bash
# Create new demo file
touch visual-upgrade-demo.html
```

**Edit:** `visual-upgrade-demo.html`

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Visual Upgrade Demo | Keyturn Studio</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="styles.css">
  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</head>
<body>

<!-- Hero with Background Image -->
<section class="hero hero-with-image">
  <div class="hero-image-overlay"></div>
  <div class="container hero-content">
    <h1 class="hero-title">Visual Upgrade Demo</h1>
    <p class="hero-lede">Premium images, icons, and animations</p>
  </div>
</section>

<!-- Icon Examples -->
<section class="container section">
  <h2>Icon Examples</h2>
  <ul class="feature-list">
    <li class="feature-item">
      <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
      </svg>
      <span>Premium checkmark icon</span>
    </li>
  </ul>
</section>

<!-- Lottie Animation Example -->
<section class="container section">
  <h2>Lottie Animation</h2>
  <div style="text-align: center;">
    <lottie-player
      src="/animations/lottie/process-flow.json"
      background="transparent"
      speed="1"
      style="width: 300px; height: 300px; margin: 0 auto;"
      loop
      autoplay>
    </lottie-player>
  </div>
</section>

<!-- Case Study Image -->
<section class="container section">
  <h2>Case Study Image</h2>
  <img 
    src="/images/case-studies/consultation-02.jpg" 
    alt="Medical consultation"
    style="width: 100%; max-width: 800px; border-radius: 12px;"
  />
</section>

</body>
</html>
```

### 8.2 Commit the Demo File

```bash
git add visual-upgrade-demo.html
git commit -m "Add visual upgrade demo page"
git push origin main
```

---

## 🎬 Step 9: Add Hero Video (Optional)

### 9.1 Update index.html for Video Background

Find your hero section and replace with:

```html
<section class="hero hero-video">
  <!-- Video Background -->
  <video 
    class="hero-video-bg" 
    autoplay 
    muted 
    loop 
    playsinline
    poster="/images/case-studies/luxury-medspa-01.jpg"
  >
    <source src="/videos/hero-background.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  
  <!-- Overlay -->
  <div class="hero-video-overlay"></div>
  
  <!-- Content -->
  <div class="container hero-video-content">
    <div class="hero-layout">
      <div class="hero-left">
        <h1 class="hero-title">
          Turn your clinic website into a patient-booking system.
        </h1>
        <p class="hero-lede">
          We rebuild clinic and medspa websites so more visitors become booked patients.
        </p>
        <div class="hero-ctas">
          <a class="btn btn-primary" href="/quote.html#blueprint">Start with a Blueprint</a>
          <a class="btn btn-ghost" href="/pricing.html">View pricing</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 9.2 Add Video CSS to styles.css

Add to the end of `styles.css`:

```css
/* Hero video background */
.hero-video {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-video-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 0;
  object-fit: cover;
}

.hero-video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(13, 27, 42, 0.88) 0%,
    rgba(27, 38, 59, 0.82) 100%
  );
  z-index: 1;
}

.hero-video-content {
  position: relative;
  z-index: 2;
  width: 100%;
}

@media (max-width: 768px) {
  .hero-video-bg {
    display: none;
  }
  
  .hero-video {
    background-image: url('/images/case-studies/luxury-medspa-01.jpg');
    background-size: cover;
    background-position: center;
  }
}
```

### 9.3 Commit Video Integration

```bash
git add index.html styles.css
git commit -m "Add hero video background integration"
git push origin main
```

---

## ✅ Step 10: Final Verification

### 10.1 Test Locally (Optional)

If you have a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server -p 8000
```

Visit: http://localhost:8000

### 10.2 Check Live Site

If your site is deployed:
1. Wait 2-5 minutes for deployment
2. Visit your live URL
3. Force refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. Verify images, videos, and animations load

### 10.3 Verify Asset URLs

Check in browser console (F12):
- No 404 errors for images/videos/animations
- Assets loading from correct paths
- Videos playing smoothly

---

## 🔄 Step 11: Alternative - Using GitHub Web Interface

If you prefer not to use command line:

### 11.1 Upload via GitHub.com

1. Go to https://github.com/badguy157/keyturn-clinics-site
2. Navigate to folder (e.g., `images/`)
3. Click "Add file" → "Upload files"
4. Drag and drop your files
5. Add commit message: "Upload case study images"
6. Click "Commit changes"

### 11.2 Edit Files via GitHub.com

1. Navigate to file (e.g., `index.html`)
2. Click pencil icon "Edit this file"
3. Make changes
4. Scroll down, add commit message
5. Click "Commit changes"

**Note:** This works for small changes but command line is better for multiple files.

---

## 📊 Quick Command Reference

### Essential Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Add specific folder
git add images/

# Commit with message
git commit -m "Your message here"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# See commit history
git log --oneline

# Discard changes to a file
git checkout -- filename.html

# See differences
git diff
```

---

## 🚨 Troubleshooting

### Problem: "Permission denied" when pushing

**Solution:**
```bash
# Set up SSH keys or use HTTPS with personal access token
# GitHub now requires token authentication
```

### Problem: Files too large (>100MB)

**Solution:**
- Compress videos further (target under 5MB)
- Use Git LFS for large files: `git lfs install`
- Or host large videos externally (YouTube, Vimeo)

### Problem: Images not showing on live site

**Solution:**
- Check file paths are correct (case-sensitive!)
- Force refresh browser: `Ctrl+Shift+R`
- Clear CDN cache if using one
- Verify files actually uploaded to GitHub

### Problem: Merge conflicts

**Solution:**
```bash
# Pull latest changes first
git pull origin main

# Resolve conflicts in files
# Then commit and push
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

---

## 📝 Complete Workflow Summary

```bash
# 1. Clone repository
git clone https://github.com/badguy157/keyturn-clinics-site.git
cd keyturn-clinics-site

# 2. Create folders
mkdir -p images/case-studies images/icons/heroicons videos animations/lottie

# 3. Copy your assets
cp ~/Downloads/luxury-medspa-01.jpg images/case-studies/
cp ~/Downloads/hero-background.mp4 videos/
# ... etc

# 4. Stage changes
git add .

# 5. Commit
git commit -m "Upgrade site visuals: Add premium images, icons, videos, and animations"

# 6. Push to GitHub
git push origin main

# 7. Verify on GitHub
# Visit https://github.com/badguy157/keyturn-clinics-site
```

---

## 🎯 Next Steps After Deployment

1. ✅ Verify all assets uploaded successfully
2. ✅ Test live site for loading speed
3. ✅ Optimize any large files if needed
4. ✅ Update documentation with asset sources
5. ✅ Create backup of original files
6. ✅ Test on mobile devices
7. ✅ Run Lighthouse audit for performance
8. ✅ Update sitemap if new pages added

---

## 📚 Additional Resources

- **Git Documentation:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com/
- **Image Optimization:** https://tinypng.com/
- **Video Compression:** https://handbrake.fr/
- **Lottie Player Docs:** https://github.com/LottieFiles/lottie-player

---

## 🆘 Need Help?

If you encounter issues:

1. Check GitHub repository settings
2. Verify file paths and names
3. Test locally before pushing
4. Review Git status and error messages
5. Consult the troubleshooting section above

---

**Deployment Complete! 🎉**

Your visual upgrades are now live on GitHub. Test thoroughly and enjoy your premium new look!
