# AGENTS.md

Instructions for AI coding agents working on this codebase.

## Project Overview

Petra Dubai is a luxury real estate website for a Dubai-based property brokerage. This is a **static HTML/CSS/JS project** with no build process or package manager.

| Category | Details |
|----------|---------|
| Stack | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Animations | GSAP 3.12.2 + ScrollTrigger (CDN) |
| Fonts | Google Fonts: Cormorant Garamond, Sarabun |

## Build/Lint/Test Commands

```bash
# Preview locally - no build required
open index.html
python3 -m http.server 8000
npx serve .

# No automated tests - manual validation only
# Check responsive breakpoints (1200px, 768px)
# Verify GSAP animations
# Test accessibility with browser DevTools
```

This project has **no** `package.json`, linting tools, TypeScript, or CI/CD pipeline.

## Code Style Guidelines

### JavaScript (`js/main.js`)

```javascript
// Function naming: initXxx() pattern
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;  // Always null-check DOM elements
}

// Check external library availability
if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded.');
    return;
}

// Passive listeners for scroll performance
window.addEventListener('scroll', handler, { passive: true });

// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return;
```

**Conventions:**
- Section dividers: `/* ======== Section Name ======== */`
- Graceful fallbacks when GSAP not loaded
- `requestAnimationFrame` for scroll handlers

### CSS (`css/styles.css`)

```css
:root {
    --black: #060606;
    --gold: #C9A962;
    --off-white: #EAECEE;
    --font-display: 'Cormorant Garamond', serif;
    --font-body: 'Sarabun', sans-serif;
}

/* Responsive breakpoints */
@media (max-width: 1200px) { }  /* Tablet */
@media (max-width: 768px) { }   /* Mobile */

/* Required: Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
    }
}
```

**Naming:** BEM-like classes (`.portfolio-item-content`, `.nav-cta`)

### HTML

**Required patterns:**
```html
<!-- Skip link first -->
<a href="#main-content" class="skip-link">Skip to content</a>

<!-- Lazy load images -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- Secure external links -->
<a href="https://..." target="_blank" rel="noopener noreferrer">

<!-- Defer scripts -->
<script defer src="js/main.js"></script>
```

**Accessibility:** ARIA labels, role attributes, proper heading hierarchy (h1->h2->h3)

**SEO:** Meta description, Open Graph tags, canonical URL, descriptive alt text

## Project Structure

```
website-petradubai/
├── index.html              # Main English site
├── hu/index.html           # Hungarian version
├── css/styles.css          # Shared stylesheet
├── js/main.js              # GSAP animations
├── assets/                 # Images, videos, logos
├── bold-immersive.html     # Design variant (dark)
├── editorial-magazine.html # Design variant (cream)
├── minimal-clean.html      # Design variant (light)
└── CLAUDE.md               # Additional instructions
```

## Important Rules

1. **No inline styles** - Use CSS classes only
2. **Null-check all DOM elements** before use
3. **Graceful fallbacks** when GSAP not available
4. **External links** must have `rel="noopener noreferrer"`
5. **Do NOT modify design variants** unless explicitly requested
6. **Do NOT convert CDN dependencies to npm**

## Error Handling Pattern

```javascript
// Graceful fallback when GSAP unavailable
if (typeof gsap === 'undefined') {
    document.querySelectorAll('.hero-tagline, .section-title').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
    return;
}
```

## Contact Integration

- WhatsApp: `https://wa.me/971525467525`
- Email: `petra@petradubai.ae`

## External Dependencies (CDN only)

- Google Fonts (Cormorant Garamond, Sarabun)
- GSAP 3.12.2 + ScrollTrigger plugin
