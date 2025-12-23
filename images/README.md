# Asset Folders README

This directory structure is ready for your visual upgrade assets.

## 📁 Folder Structure

```
images/
├── case-studies/       → High-res stock images for case studies
├── icons/
│   ├── heroicons/      → SVG icons from Heroicons
│   ├── lucide/         → SVG icons from Lucide
│   └── phosphor/       → SVG icons from Phosphor
└── backgrounds/        → Background images and patterns

videos/                 → Hero video backgrounds (MP4 files)

animations/
└── lottie/            → Lottie JSON animation files
```

## 🎯 What to Upload Where

### images/case-studies/
Upload your 5 high-resolution case study images:
- `luxury-medspa-01.jpg` - Hero section background
- `consultation-02.jpg` - Medical consultation photo
- `treatment-room-03.jpg` - Treatment facility
- `reception-04.jpg` - Reception/waiting area
- `lifestyle-05.jpg` - Wellness lifestyle shot

**Recommended specs:**
- Format: JPG
- Dimensions: 1920x1080px minimum
- File size: Under 500KB (optimized)

### images/icons/heroicons/
Upload SVG icons from https://heroicons.com/
- `check-circle.svg` - For checkmarks
- `chevron-right.svg` - For bullet points
- `sparkles.svg` - For feature highlights
- Add more as needed

### images/icons/lucide/
Upload SVG icons from https://lucide.dev/
- Alternative icon set
- Same naming convention

### images/icons/phosphor/
Upload SVG icons from https://phosphoricons.com/
- Third alternative set
- Multiple weights available

### images/backgrounds/
Upload background patterns and textures:
- `abstract-navy-pattern.jpg` - Geometric pattern
- `subtle-texture.png` - Subtle texture overlay

### videos/
Upload hero background videos:
- `hero-background.mp4` - Desktop version (1920x1080, under 5MB)
- `hero-background-mobile.mp4` - Mobile version (1280x720, under 3MB)

**Recommended specs:**
- Format: MP4 (H.264 codec)
- Duration: 10-20 seconds
- Loop: Seamless
- Frame rate: 30fps

### animations/lottie/
Upload Lottie JSON animations from https://lottiefiles.com/
- `process-flow.json` - Process step animations
- `checkmark-success.json` - Success confirmation
- `calendar-booking.json` - Booking animations
- `loading-minimal.json` - Loading indicators

## 📖 How to Use

1. **Download Assets:** Follow `VISUAL-UPGRADE-RESOURCES.md` for links
2. **Optimize Assets:** Compress images/videos before uploading
3. **Upload Assets:** Copy files to these folders
4. **Integrate:** Use code from `VISUAL-INTEGRATION-GUIDE.md`
5. **Deploy:** Follow `VISUAL-UPGRADE-DEPLOYMENT.md`

## 🚀 Quick Upload Commands

Using Git command line:

```bash
# Copy images
cp ~/Downloads/luxury-medspa-01.jpg images/case-studies/
cp ~/Downloads/consultation-02.jpg images/case-studies/

# Copy icons
cp ~/Downloads/heroicons/*.svg images/icons/heroicons/

# Copy videos
cp ~/Downloads/hero-background.mp4 videos/

# Copy animations
cp ~/Downloads/*.json animations/lottie/

# Stage and commit
git add images/ videos/ animations/
git commit -m "Add visual upgrade assets"
git push origin main
```

Or use GitHub web interface:
1. Navigate to folder on GitHub.com
2. Click "Add file" → "Upload files"
3. Drag and drop your files
4. Commit changes

## ✅ Verification

After uploading, verify:
- [ ] All image files are JPG (photos) or PNG (graphics)
- [ ] All icon files are SVG
- [ ] All video files are MP4
- [ ] All animation files are JSON
- [ ] File names match documentation examples
- [ ] Files are optimized (reasonable sizes)

## 📚 Documentation Reference

- **Asset Sources:** `VISUAL-UPGRADE-RESOURCES.md`
- **Integration Code:** `VISUAL-INTEGRATION-GUIDE.md`
- **Deployment Steps:** `VISUAL-UPGRADE-DEPLOYMENT.md`
- **Master Index:** `VISUAL-UPGRADE-MASTER-INDEX.md`

---

**Ready to Upload?** Start with `VISUAL-UPGRADE-RESOURCES.md` to find your assets!
