# Visual Integration Guide - HTML/CSS Snippets

This guide provides ready-to-use HTML and CSS code for integrating the visual upgrades into your website.

---

## 📸 Case Study Images Integration

### 1. Hero Section with Background Image

**HTML:**
```html
<section class="hero hero-with-image">
  <div class="hero-image-overlay"></div>
  <div class="container hero-content">
    <div class="hero-layout">
      <div class="hero-left">
        <h1 class="hero-title">
          Turn your clinic website into a patient-booking system.
        </h1>
        <p class="hero-lede">We rebuild clinic and medspa websites so more visitors become booked patients.</p>
        <div class="hero-ctas">
          <a class="btn btn-primary" href="/quote.html#blueprint">Start with a Blueprint</a>
          <a class="btn btn-ghost" href="/pricing.html">View pricing</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

**CSS:**
```css
/* Hero with background image */
.hero-with-image {
  position: relative;
  background-image: url('/images/case-studies/luxury-medspa-01.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 90vh;
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

/* Responsive background */
@media (max-width: 768px) {
  .hero-with-image {
    background-position: 65% center;
  }
}
```

---

### 2. Case Study Card with Image

**HTML:**
```html
<div class="case-study-card">
  <div class="case-study-image-wrapper">
    <img 
      src="/images/case-studies/consultation-02.jpg" 
      alt="Medical professional consultation"
      class="case-study-image"
      loading="lazy"
    />
  </div>
  <div class="case-study-content">
    <h3 class="case-study-title">Case Study: Aesthetic Clinic</h3>
    <p class="case-study-description">
      How we increased online bookings by 107% in 90 days.
    </p>
    <div class="case-study-stats-strip">
      <div class="case-study-stat">
        <div class="case-study-stat-value">~22–25%</div>
        <div class="case-study-stat-label">Direct bookings</div>
      </div>
      <div class="case-study-stat">
        <div class="case-study-stat-value">+107%</div>
        <div class="case-study-stat-label">More clicks from Google</div>
      </div>
    </div>
    <a href="/proof.html" class="btn btn-primary">View full case study</a>
  </div>
</div>
```

**CSS:**
```css
.case-study-card {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  overflow: hidden;
  padding: 0;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.case-study-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.case-study-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.case-study-content {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Responsive */
@media (max-width: 968px) {
  .case-study-card {
    grid-template-columns: 1fr;
  }
  
  .case-study-image-wrapper {
    min-height: 300px;
  }
}
```

---

### 3. Image Gallery / Portfolio Grid

**HTML:**
```html
<section class="portfolio-section container section">
  <h2 class="section-title">Our Work</h2>
  <div class="portfolio-grid">
    <div class="portfolio-item">
      <img 
        src="/images/case-studies/treatment-room-03.jpg" 
        alt="Modern treatment room"
        loading="lazy"
      />
      <div class="portfolio-overlay">
        <h3>Treatment Rooms</h3>
        <p>State-of-the-art facilities</p>
      </div>
    </div>
    <div class="portfolio-item">
      <img 
        src="/images/case-studies/reception-04.jpg" 
        alt="Reception area"
        loading="lazy"
      />
      <div class="portfolio-overlay">
        <h3>Reception Areas</h3>
        <p>Welcoming first impressions</p>
      </div>
    </div>
    <div class="portfolio-item">
      <img 
        src="/images/case-studies/lifestyle-05.jpg" 
        alt="Patient care"
        loading="lazy"
      />
      <div class="portfolio-overlay">
        <h3>Patient Care</h3>
        <p>Premium service experience</p>
      </div>
    </div>
  </div>
</section>
```

**CSS:**
```css
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.portfolio-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.portfolio-item:hover {
  transform: translateY(-4px);
}

.portfolio-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.portfolio-item:hover img {
  transform: scale(1.05);
}

.portfolio-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(13, 27, 42, 0.9) 0%,
    rgba(13, 27, 42, 0.4) 50%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-overlay h3 {
  font-size: 1.5rem;
  margin: 0 0 8px 0;
  font-family: 'Playfair Display', serif;
}

.portfolio-overlay p {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
}
```

---

## 🎯 SVG Icons Integration

### 1. Checkmark Icons (Heroicons)

**HTML with Inline SVG:**
```html
<ul class="feature-list">
  <li class="feature-item">
    <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
    </svg>
    <span>Audit your current site for increasing flow</span>
  </li>
  <li class="feature-item">
    <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
    </svg>
    <span>Simple fixes for links and direct bookings</span>
  </li>
  <li class="feature-item">
    <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
    </svg>
    <span>Clear next steps for rebuild</span>
  </li>
</ul>
```

**CSS:**
```css
.feature-list {
  list-style: none;
  padding: 0;
  margin: 24px 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  color: var(--brand-text, rgba(255, 255, 255, 0.9));
  line-height: 1.7;
}

.icon-check {
  width: 24px;
  height: 24px;
  min-width: 24px;
  color: #D4AF37; /* Gold accent */
  flex-shrink: 0;
  margin-top: 2px;
}

/* Alternative: Outline style */
.icon-check-outline {
  width: 24px;
  height: 24px;
  min-width: 24px;
  color: #5AA2FF; /* Blue accent */
  stroke-width: 2;
}
```

---

### 2. Bullet Points with Chevron Icons

**HTML:**
```html
<ul class="benefits-list">
  <li class="benefit-item">
    <svg class="icon-chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
    <span>Built for bookings</span>
  </li>
  <li class="benefit-item">
    <svg class="icon-chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
    <span>Payback-first planning</span>
  </li>
  <li class="benefit-item">
    <svg class="icon-chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
    <span>3–5 week rebuild</span>
  </li>
</ul>
```

**CSS:**
```css
.benefits-list {
  list-style: none;
  padding: 0;
  margin: 24px 0;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-weight: 600;
  color: white;
}

.icon-chevron {
  width: 20px;
  height: 20px;
  min-width: 20px;
  color: #D4AF37;
}
```

---

### 3. Process Steps with Icons

**HTML:**
```html
<div class="process-steps">
  <div class="process-step">
    <div class="process-icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    </div>
    <h3 class="process-title">1. Audit</h3>
    <p class="process-description">We analyze your current site and booking flow</p>
  </div>

  <div class="process-step">
    <div class="process-icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    </div>
    <h3 class="process-title">2. Design</h3>
    <p class="process-description">Create premium layouts focused on conversions</p>
  </div>

  <div class="process-step">
    <div class="process-icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    </div>
    <h3 class="process-title">3. Launch</h3>
    <p class="process-description">Deploy and track booking improvements</p>
  </div>
</div>
```

**CSS:**
```css
.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  margin-top: 48px;
}

.process-step {
  text-align: center;
  padding: 32px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.process-step:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.process-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  padding: 16px;
  background: linear-gradient(135deg, #D4AF37 0%, #C4A137 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.process-icon svg {
  width: 32px;
  height: 32px;
  color: #0D1B2A;
  stroke-width: 2;
}

.process-title {
  margin: 0 0 12px 0;
  font-size: 1.25rem;
  font-family: 'Playfair Display', serif;
  color: white;
}

.process-description {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}
```

---

## 🎬 Hero Video Background Integration

### Full-Width Hero Video

**HTML:**
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

**CSS:**
```css
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

/* Pause video on reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .hero-video-bg {
    animation: none;
    display: none;
  }
  
  .hero-video {
    background-image: url('/images/case-studies/luxury-medspa-01.jpg');
    background-size: cover;
    background-position: center;
  }
}

/* Mobile optimization - hide video, show poster */
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

**JavaScript (Optional - Video Controls):**
```javascript
// Ensure video plays smoothly
document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.hero-video-bg');
  
  if (video) {
    // Play video
    video.play().catch(error => {
      console.log('Video autoplay prevented:', error);
    });
    
    // Restart video when it ends (ensures perfect loop)
    video.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    });
  }
});
```

---

## ✨ Lottie Animation Integration

### Method 1: Using Lottie Player (Recommended - Easiest)

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <!-- Include Lottie Player -->
  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</head>
<body>

<!-- Process Step Animation -->
<div class="process-animation-wrapper">
  <lottie-player
    src="/animations/lottie/process-flow.json"
    background="transparent"
    speed="1"
    style="width: 300px; height: 300px;"
    loop
    autoplay>
  </lottie-player>
</div>

<!-- Success Checkmark Animation -->
<div class="success-animation">
  <lottie-player
    src="/animations/lottie/checkmark-success.json"
    background="transparent"
    speed="1"
    style="width: 150px; height: 150px;"
    autoplay>
  </lottie-player>
  <p>Booking Confirmed!</p>
</div>

</body>
</html>
```

---

### Method 2: Using Lottie Web Library (More Control)

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <!-- Include Lottie Web -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
</head>
<body>

<!-- Animation Container -->
<div id="process-animation"></div>

<script>
  // Initialize Lottie Animation
  const animation = lottie.loadAnimation({
    container: document.getElementById('process-animation'),
    renderer: 'svg', // 'svg', 'canvas', or 'html'
    loop: true,
    autoplay: true,
    path: '/animations/lottie/process-flow.json'
  });
  
  // Optional: Control animation
  // animation.play();
  // animation.pause();
  // animation.stop();
  // animation.setSpeed(0.5); // Half speed
</script>

</body>
</html>
```

---

### Method 3: Trigger Animation on Scroll

**HTML:**
```html
<div class="process-steps-with-animation">
  <div class="process-step fade-in-section" data-animation="/animations/lottie/step-1.json">
    <div id="step-1-animation" class="step-animation"></div>
    <h3>Step 1: Audit</h3>
    <p>Analyze your current site</p>
  </div>
  
  <div class="process-step fade-in-section" data-animation="/animations/lottie/step-2.json">
    <div id="step-2-animation" class="step-animation"></div>
    <h3>Step 2: Design</h3>
    <p>Create premium layouts</p>
  </div>
  
  <div class="process-step fade-in-section" data-animation="/animations/lottie/step-3.json">
    <div id="step-3-animation" class="step-animation"></div>
    <h3>Step 3: Launch</h3>
    <p>Deploy and track</p>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
<script>
  // Play animation when element comes into view
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animationPath = entry.target.dataset.animation;
        const container = entry.target.querySelector('.step-animation');
        
        if (container && animationPath) {
          lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: animationPath
          });
          
          // Stop observing after animation loads
          animationObserver.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);
  
  // Observe all process steps
  document.querySelectorAll('.process-step').forEach(step => {
    animationObserver.observe(step);
  });
</script>
```

**CSS:**
```css
.step-animation {
  width: 200px;
  height: 200px;
  margin: 0 auto 24px;
}

.process-steps-with-animation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.process-step {
  text-align: center;
  padding: 32px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.process-step.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 🎨 Combined Example: Premium Section with All Elements

**HTML:**
```html
<section class="premium-section">
  <!-- Background Video -->
  <video class="section-video-bg" autoplay muted loop playsinline>
    <source src="/videos/hero-background.mp4" type="video/mp4">
  </video>
  
  <!-- Overlay -->
  <div class="section-overlay"></div>
  
  <!-- Content -->
  <div class="container section-content">
    <div class="section-header">
      <h2 class="section-title">How We Transform Your Clinic Website</h2>
      <p class="section-subtitle">Our proven 3-step process</p>
    </div>
    
    <!-- Process Steps with Lottie Animations -->
    <div class="process-grid">
      <div class="process-card">
        <div class="process-animation">
          <lottie-player
            src="/animations/lottie/audit-animation.json"
            background="transparent"
            speed="1"
            style="width: 180px; height: 180px;"
            loop
            autoplay>
          </lottie-player>
        </div>
        <h3 class="process-card-title">
          <svg class="process-number-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <text x="12" y="16" text-anchor="middle" fill="#0D1B2A" font-size="12" font-weight="bold">1</text>
          </svg>
          Audit & Analysis
        </h3>
        <ul class="process-features">
          <li>
            <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
            Site flow analysis
          </li>
          <li>
            <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
            Booking path review
          </li>
        </ul>
      </div>
      
      <div class="process-card">
        <div class="process-animation">
          <lottie-player
            src="/animations/lottie/design-animation.json"
            background="transparent"
            speed="1"
            style="width: 180px; height: 180px;"
            loop
            autoplay>
          </lottie-player>
        </div>
        <h3 class="process-card-title">
          <svg class="process-number-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <text x="12" y="16" text-anchor="middle" fill="#0D1B2A" font-size="12" font-weight="bold">2</text>
          </svg>
          Design & Build
        </h3>
        <ul class="process-features">
          <li>
            <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
            Premium layouts
          </li>
          <li>
            <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
            Conversion focus
          </li>
        </ul>
      </div>
      
      <div class="process-card">
        <div class="process-animation">
          <lottie-player
            src="/animations/lottie/launch-animation.json"
            background="transparent"
            speed="1"
            style="width: 180px; height: 180px;"
            loop
            autoplay>
          </lottie-player>
        </div>
        <h3 class="process-card-title">
          <svg class="process-number-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <text x="12" y="16" text-anchor="middle" fill="#0D1B2A" font-size="12" font-weight="bold">3</text>
          </svg>
          Launch & Track
        </h3>
        <ul class="process-features">
          <li>
            <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
            Deploy website
          </li>
          <li>
            <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
            Track bookings
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Case Study Image -->
    <div class="case-study-showcase">
      <img 
        src="/images/case-studies/consultation-02.jpg" 
        alt="Real results from our clinic redesigns"
        loading="lazy"
      />
      <div class="showcase-overlay">
        <h3>Real Results</h3>
        <p>+107% more patient bookings in 90 days</p>
        <a href="/proof.html" class="btn btn-primary">View Case Study</a>
      </div>
    </div>
  </div>
</section>

<!-- Include Lottie Player -->
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
```

**CSS:**
```css
.premium-section {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
}

.section-video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.section-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(13, 27, 42, 0.92) 0%,
    rgba(27, 38, 59, 0.88) 100%
  );
  z-index: 1;
}

.section-content {
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-family: 'Playfair Display', serif;
  color: white;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 60px;
}

.process-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;
}

.process-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
}

.process-animation {
  margin: 0 auto 24px;
  display: flex;
  justify-content: center;
}

.process-card-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 20px;
}

.process-number-icon {
  width: 32px;
  height: 32px;
  color: #D4AF37;
}

.process-features {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.process-features li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.9);
}

.case-study-showcase {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  max-width: 900px;
  margin: 0 auto;
}

.case-study-showcase img {
  width: 100%;
  height: auto;
  display: block;
}

.showcase-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(13, 27, 42, 0.95) 0%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.case-study-showcase:hover .showcase-overlay {
  opacity: 1;
}

.showcase-overlay h3 {
  color: white;
  font-size: 2rem;
  margin: 0 0 12px 0;
}

.showcase-overlay p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  margin: 0 0 24px 0;
}
```

---

## 🚀 Performance Optimization Tips

### Image Optimization
```html
<!-- Use WebP with fallback -->
<picture>
  <source srcset="/images/case-studies/luxury-medspa-01.webp" type="image/webp">
  <img src="/images/case-studies/luxury-medspa-01.jpg" alt="Luxury medspa interior" loading="lazy">
</picture>

<!-- Responsive images -->
<img 
  srcset="
    /images/case-studies/consultation-02-400w.jpg 400w,
    /images/case-studies/consultation-02-800w.jpg 800w,
    /images/case-studies/consultation-02-1200w.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 800px"
  src="/images/case-studies/consultation-02-800w.jpg"
  alt="Medical consultation"
  loading="lazy"
>
```

### Video Optimization
```html
<!-- Preload for hero video -->
<link rel="preload" as="video" href="/videos/hero-background.mp4">

<!-- Mobile-optimized version -->
<video class="hero-video-bg" autoplay muted loop playsinline preload="metadata">
  <source src="/videos/hero-background-mobile.mp4" type="video/mp4" media="(max-width: 768px)">
  <source src="/videos/hero-background.mp4" type="video/mp4">
</video>
```

### Lottie Optimization
```javascript
// Load animation only when in viewport
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Load animation
      const player = entry.target;
      player.load();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('lottie-player').forEach(player => {
  observer.observe(player);
});
```

---

**Next:** See `VISUAL-UPGRADE-DEPLOYMENT.md` for GitHub deployment steps.
