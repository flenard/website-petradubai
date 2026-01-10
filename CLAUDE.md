# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Petra Dubai is a luxury real estate website for a Dubai-based property brokerage targeting European investors. This is a **static HTML/CSS/JS project** with no build process or package manager.

| Category | Details |
|----------|---------|
| Stack | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Animations | GSAP 3.12.2 + ScrollTrigger (CDN) |
| Fonts | Google Fonts: Cormorant Garamond (display), Sarabun (body) |

## Development

```bash
# Preview locally - no build required
open index.html
python3 -m http.server 8000
npx serve .

# No automated tests - manual browser validation only
```

This project has **no** `package.json`, linting tools, TypeScript, or CI/CD pipeline.

## Architecture

### Main Site
- `index.html` - Main English site with external CSS/JS
- `/hu/index.html` - Hungarian language version
- `/css/styles.css` - Main stylesheet with design system
- `/js/main.js` - GSAP animations with error handling

### Design Variants (Self-contained)
Alternate designs with inline CSS/JS for comparison - **do NOT modify** unless explicitly requested:
- `editorial-magazine.html` - Editorial/magazine style, cream background
- `bold-immersive.html` - Dark theme with gold accents, custom cursor
- `minimal-clean.html` - Light minimal design

### Design System
```
Colors:
  Primary: #060606 (black), #132116 (dark green), #222222 (charcoal)
  Grays: #59595C, #727476, #C4C4C4, #D3D3D3
  Light: #EAECEE (off-white), #FFFFFF
  Accent: #C9A962 (gold)

Fonts: Cormorant Garamond (display), Sarabun (body)
Breakpoints: 1200px (tablet), 768px (mobile)
```

## Code Style

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

// Section dividers
/* ======== Section Name ======== */
```

### CSS (`css/styles.css`)

```css
/* Use CSS custom properties */
:root {
    --black: #060606;
    --gold: #C9A962;
    --off-white: #EAECEE;
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

### HTML Patterns

```html
<!-- Skip link first in body -->
<a href="#main-content" class="skip-link">Skip to content</a>

<!-- Lazy load below-fold images -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- Secure external links -->
<a href="https://..." target="_blank" rel="noopener noreferrer">

<!-- Defer scripts -->
<script defer src="js/main.js"></script>
```

## Key Patterns

### Email Obfuscation
Emails use data attributes to prevent spam scraping:
```html
<a class="email-link" data-user="petra" data-domain="petradubai.ae">
```
JavaScript `initEmailProtection()` in `main.js` assembles at runtime.

### Language Detection
- Auto-redirects Hungarian browsers to `/hu/` on first visit
- Preference saved to localStorage when user clicks language switcher
- See `initLanguageDetection()` in `main.js`

### GSAP Fallback
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

## Important Rules

1. **No inline styles** - Use CSS classes only
2. **Null-check all DOM elements** before use
3. **Graceful fallbacks** when GSAP not available
4. **External links** must have `rel="noopener noreferrer"`
5. **Do NOT modify design variants** unless explicitly requested
6. **Do NOT convert CDN dependencies to npm**

## Contact Integration

- WhatsApp: `https://wa.me/971525467525`
- Email: `petra@petradubai.ae`

## Documentation

- `docs/marketing-improvements.md` - Marketing roadmap with to-do priorities
