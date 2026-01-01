# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Petra Dubai is a luxury real estate website for a Dubai-based property brokerage targeting European investors. The site is a static HTML/CSS/JS project with multiple design variants and a main optimized version.

## Architecture

### Main Site (Optimized)
- `index.html` - Main site with external CSS/JS, SEO optimized, accessible
- `/hu/index.html` - Hungarian language version (mirrors main site structure)
- `/css/styles.css` - Main stylesheet with design system and responsive breakpoints
- `/js/main.js` - GSAP animations with error handling and reduced motion support

### Design Variants (Self-contained)
These are alternate designs with inline CSS/JS for comparison:
- `editorial-magazine.html` - Editorial/magazine style with cream background
- `bold-immersive.html` - Dark theme with gold accents, custom cursor
- `minimal-clean.html` - Light minimal design

### Shared Elements Across All Versions
- Hero section with video background (`assets/petra_dubai_intro_video.mp4`)
- Navigation with logo and anchor links
- Sections: About, Services, Portfolio, Testimonials, FAQ, Developers marquee, Footer
- GSAP + ScrollTrigger for animations
- Responsive breakpoints at 1200px and 768px

### Design System (from `website_schema.json`)
Color palette:
- Primary: `#060606` (black), `#132116` (dark green), `#222222` (charcoal)
- Grays: `#59595C`, `#727476`, `#C4C4C4`, `#D3D3D3`
- Light: `#EAECEE` (off-white), `#FFFFFF` (white)
- Accent: `#C9A962` (gold)
- Fonts: Sarabun (body), Cormorant Garamond (display)

### Assets
- `/assets/` - Contains logo, property images, developer logos, social icons, and intro video
- Developer partner logos: Emaar, Damac, Sobha, Meraas, HH, Omniyat, Binghatti, Nakheel, Ellington, MAF
- Content source data in `webiste-text.csv`

### SEO Files
- `sitemap.xml` - XML sitemap for search engines
- `robots.txt` - Crawler instructions
- `llms.txt` - AI/LLM crawler information (llmstxt.org format)

## Development

### Local Preview
Open `index.html` directly in a browser - no build process required.

### External Dependencies (CDN)
- Google Fonts (Cormorant Garamond, Sarabun)
- GSAP 3.12.2 + ScrollTrigger plugin

### Contact Integration
- WhatsApp: `https://wa.me/971501140972`
- Email: `petra@petradubai.ae`

### Email Obfuscation Pattern
Emails use data attributes to prevent spam scraping:
```html
<a class="email-link" data-user="petra" data-domain="petradubai.ae">
```
JavaScript in `main.js` (`initEmailProtection()`) assembles these at runtime.

### Language Detection
- Auto-redirects Hungarian browsers to `/hu/` on first visit (no preference stored)
- Language preference saved to localStorage when user clicks language switcher
- See `initLanguageDetection()` in `main.js`

## Optimizations Implemented

### Performance
- Images use `loading="lazy"` for below-fold content
- Video has `preload="metadata"` and `poster` attribute
- Scripts loaded with `defer` at end of body
- CSS uses `will-change` for animated elements
- Passive scroll listeners with requestAnimationFrame

### SEO
- Meta description and keywords
- Open Graph tags for social sharing
- Canonical URL
- Semantic HTML (article, section, nav, footer)
- Descriptive alt text for images

### Accessibility
- Skip-to-content link
- ARIA labels and roles
- Focus states on all interactive elements
- Keyboard navigation support
- Reduced motion media query support
- Print stylesheet

### Security
- All external links have `rel="noopener noreferrer"`
- target="_blank" links are secured

### Code Quality
- No inline styles (moved to CSS classes)
- Error handling for GSAP loading
- Null checks on DOM elements
- Dynamic copyright year

## Documentation

- `docs/marketing-improvements.md` - Marketing roadmap with completed items and to-do priorities
