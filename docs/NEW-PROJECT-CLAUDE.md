# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**Project Name:** [PROJECT_NAME]
**Type:** Static marketing/brochure website
**Languages:** [e.g., English, Hungarian]
**Live URL:** [DOMAIN]

---

## 1. Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Framework** | Astro | 4.x | Static site generation, components, image optimization |
| **Styling** | Tailwind CSS | 3.x | Utility-first CSS, responsive design |
| **Animations** | CSS + Intersection Observer | - | Scroll-triggered animations (no heavy libraries) |
| **Fonts** | Google Fonts | - | [DISPLAY_FONT] (display), [BODY_FONT] (body) |
| **Hosting** | Vercel | - | Auto-deploy from GitHub, edge CDN |

### What We DON'T Use
- ❌ GSAP (overkill for simple animations)
- ❌ jQuery (unnecessary)
- ❌ Bootstrap (using Tailwind instead)
- ❌ React/Vue/Svelte (static site, no reactivity needed)

---

## 2. Project Structure

```
[project-name]/
├── src/
│   ├── components/
│   │   ├── Nav.astro              # Navigation with mobile menu
│   │   ├── Hero.astro             # Hero section
│   │   ├── SectionHeader.astro    # Reusable section label + title
│   │   ├── Card.astro             # Generic card component
│   │   └── Footer.astro           # Site footer
│   │
│   ├── layouts/
│   │   └── Base.astro             # HTML shell, <head>, meta tags
│   │
│   ├── pages/
│   │   ├── index.astro            # Homepage (default language)
│   │   └── [lang]/
│   │       └── index.astro        # Alternate language homepage
│   │
│   ├── content/
│   │   ├── en.json                # English content
│   │   └── [lang].json            # Other language content
│   │
│   ├── styles/
│   │   └── global.css             # Tailwind imports + custom CSS
│   │
│   └── scripts/
│       └── main.js                # Intersection Observer, interactions
│
├── public/
│   ├── images/                    # Static images
│   ├── video/                     # Video files
│   ├── robots.txt
│   ├── llms.txt                   # AI crawler info
│   └── .well-known/
│       └── security.txt           # Security contact (RFC 9116)
│
├── astro.config.mjs               # Astro configuration
├── tailwind.config.mjs            # Tailwind theme customization
├── package.json
└── CLAUDE.md                      # This file
```

---

## 3. Design System

### Colors

Define project colors in Tailwind config:

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary
        'primary': '#000000',
        'primary-light': '#333333',

        // Neutral
        'gray-dark': '#59595C',
        'gray-mid': '#727476',
        'gray-light': '#C4C4C4',
        'off-white': '#EAECEE',

        // Accent
        'accent': '#C9A962',
        'accent-light': '#D4B978',
      },
      fontFamily: {
        display: ['[DISPLAY_FONT]', 'serif'],
        body: ['[BODY_FONT]', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Typography Scale

| Element | Font | Weight | Tailwind Class |
|---------|------|--------|----------------|
| Hero heading | Display | 300 | `font-display text-5xl md:text-6xl font-light` |
| Section title | Display | 300-400 | `font-display text-3xl md:text-4xl` |
| Body text | Body | 300-400 | `font-body text-base md:text-lg` |
| Labels | Body | 400-500 | `font-body text-xs uppercase tracking-widest` |

---

## 4. Content Management (i18n)

### Content Structure

All translatable text lives in JSON files:

```json
// src/content/en.json
{
  "meta": {
    "title": "[PAGE_TITLE]",
    "description": "[PAGE_DESCRIPTION]"
  },
  "nav": {
    "item1": "About",
    "item2": "Services",
    "item3": "Portfolio",
    "cta": "Contact"
  },
  "hero": {
    "headline": "[HERO_HEADLINE]",
    "subheadline": "[HERO_SUBHEADLINE]",
    "cta": "[CTA_TEXT]"
  },
  "sections": {
    "about": {
      "label": "About Us",
      "title": "[SECTION_TITLE]",
      "content": ["Paragraph 1", "Paragraph 2"]
    }
  },
  "footer": {
    "tagline": "[FOOTER_TAGLINE]",
    "copyright": "[COMPANY_NAME]. All rights reserved."
  }
}
```

### Usage in Components

```astro
---
// src/pages/index.astro
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import content from '../content/en.json';
---

<Base meta={content.meta} lang="en">
  <Hero content={content.hero} />
</Base>
```

### Adding a New Language

1. Copy `src/content/en.json` → `src/content/[lang].json`
2. Translate all values
3. Create `src/pages/[lang]/index.astro`
4. Add hreflang links to Base layout
5. Sitemap updates automatically

---

## 5. Animation System

### Philosophy
- Use CSS transitions + Intersection Observer (no heavy JS libraries)
- Only animate `transform` and `opacity` (GPU-accelerated)
- Respect `prefers-reduced-motion`

### CSS Classes

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ================================
   Scroll-triggered Animations
   ================================ */

/* Fade up */
.animate-fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.animate-fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Fade in */
.animate-fade-in {
  opacity: 0;
  transition: opacity 0.8s ease-out;
}

.animate-fade-in.visible {
  opacity: 1;
}

/* Slide from left */
.animate-slide-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.animate-slide-left.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Slide from right */
.animate-slide-right {
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.animate-slide-right.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Scale up */
.animate-scale {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-scale.visible {
  opacity: 1;
  transform: scale(1);
}

/* Stagger delays */
.stagger-1 { transition-delay: 0.1s; }
.stagger-2 { transition-delay: 0.2s; }
.stagger-3 { transition-delay: 0.3s; }
.stagger-4 { transition-delay: 0.4s; }
.stagger-5 { transition-delay: 0.5s; }
.stagger-6 { transition-delay: 0.6s; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  [class*="animate-"] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

### JavaScript (Intersection Observer)

```js
// src/scripts/main.js

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  document.querySelectorAll('[class*="animate-"]').forEach((el) => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);
```

### Usage

```astro
<!-- Single element -->
<h2 class="text-4xl animate-fade-up">Section Title</h2>

<!-- Staggered list -->
{items.map((item, i) => (
  <div class={`animate-fade-up stagger-${i + 1}`}>
    {item.content}
  </div>
))}
```

---

## 6. Component Patterns

### Base Layout

```astro
---
// src/layouts/Base.astro
interface Props {
  meta: {
    title: string;
    description: string;
  };
  lang: string;
}

const { meta, lang } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!DOCTYPE html>
<html lang={lang}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{meta.title}</title>
  <meta name="description" content={meta.description}>

  <link rel="canonical" href={canonicalURL}>

  <!-- Open Graph -->
  <meta property="og:title" content={meta.title}>
  <meta property="og:description" content={meta.description}>
  <meta property="og:type" content="website">
  <meta property="og:url" content={canonicalURL}>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- Add your Google Fonts link here -->

  <!-- Styles -->
  <link rel="stylesheet" href="/styles/global.css">
</head>
<body class="font-body font-light">
  <slot />
  <script src="/scripts/main.js"></script>
</body>
</html>
```

### Section Header Component

```astro
---
// src/components/SectionHeader.astro
interface Props {
  label: string;
  title: string;
  centered?: boolean;
  light?: boolean;
}

const { label, title, centered = false, light = false } = Astro.props;
---

<div class={centered ? 'text-center' : ''}>
  <span class={`
    text-xs font-medium tracking-[0.3em] uppercase mb-4 block
    animate-fade-up text-accent
  `}>
    {label}
  </span>
  <h2 class={`
    font-display text-3xl md:text-4xl font-light leading-tight mb-8
    animate-fade-up stagger-1
    ${light ? 'text-white' : 'text-primary'}
  `}>
    {title}
  </h2>
</div>
```

### Card Component

```astro
---
// src/components/Card.astro
interface Props {
  title: string;
  description: string;
  index?: number;
}

const { title, description, index = 0 } = Astro.props;
---

<article class={`
  p-8 bg-white border border-gray-light
  hover:border-accent hover:-translate-y-1
  transition-all duration-300
  animate-fade-up stagger-${index + 1}
`}>
  <h3 class="font-display text-xl mb-4">{title}</h3>
  <p class="text-gray-dark text-sm leading-relaxed">{description}</p>
</article>
```

---

## 7. Image Handling

### Using Astro's Image Component

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero.jpg';
---

<Image
  src={heroImage}
  alt="Descriptive alt text"
  width={1200}
  height={800}
  format="webp"
  quality={80}
  loading="lazy"
  class="w-full h-auto object-cover"
/>
```

### Rules
- ✅ Use `astro:assets` for images in `src/` (auto-optimized)
- ✅ Always provide descriptive `alt` text
- ✅ Use `loading="lazy"` for below-fold images
- ✅ Use `loading="eager"` for above-fold/hero images
- ✅ Specify `width` and `height` to prevent CLS
- ✅ Prefer WebP/AVIF formats
- ❌ Don't put images in `public/` unless they must be unprocessed

---

## 8. SEO Checklist

### Every Page Must Have
- [ ] Unique `<title>` (50-60 characters)
- [ ] Unique `<meta name="description">` (150-160 characters)
- [ ] Canonical URL
- [ ] Open Graph tags (title, description, image, url)
- [ ] Twitter Card tags
- [ ] Semantic HTML (one `<h1>`, logical heading hierarchy)
- [ ] hreflang tags (if multilingual)
- [ ] JSON-LD structured data (if applicable)

### Required Static Files
- `robots.txt` - Crawler instructions
- `sitemap.xml` - Auto-generated by `@astrojs/sitemap`
- `llms.txt` - AI crawler information (optional)
- `.well-known/security.txt` - Security contact

### JSON-LD Template

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[COMPANY_NAME]",
  "description": "[DESCRIPTION]",
  "url": "[WEBSITE_URL]",
  "logo": "[LOGO_URL]",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "[PHONE]",
    "email": "[EMAIL]"
  },
  "sameAs": [
    "[SOCIAL_URL_1]",
    "[SOCIAL_URL_2]"
  ]
}
</script>
```

---

## 9. Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 95 |
| Lighthouse Accessibility | > 95 |
| Lighthouse SEO | > 95 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Total JS Bundle | < 10KB |
| Total CSS Bundle | < 20KB |

---

## 10. Security

### HTTP Headers (vercel.json)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
      ]
    }
  ]
}
```

### Rules
- ✅ All external links: `target="_blank" rel="noopener noreferrer"`
- ✅ Email obfuscation (assemble via JS from data attributes)
- ✅ No inline scripts where possible (CSP-ready)
- ✅ SRI hashes on CDN resources

### Email Obfuscation Pattern

```html
<a href="#" class="email-link" data-user="hello" data-domain="example.com">
  <span class="email-text">hello[at]example.com</span>
</a>

<script>
  document.querySelectorAll('.email-link').forEach(link => {
    const email = `${link.dataset.user}@${link.dataset.domain}`;
    link.href = `mailto:${email}`;
    const text = link.querySelector('.email-text');
    if (text) text.textContent = email;
  });
</script>
```

---

## 11. Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type-check
npm run astro check
```

---

## 12. Deployment (Vercel)

### Setup
1. Push code to GitHub
2. Connect repo to Vercel
3. Vercel auto-detects Astro
4. Push to `main` → auto-deploys

### Environment Variables
Set in Vercel dashboard: Project Settings → Environment Variables

### Custom Domain
1. Add domain in Vercel dashboard
2. Update DNS records
3. SSL auto-provisioned

---

## 13. Quick Reference

### Create New Component
```bash
touch src/components/NewComponent.astro
```

### Add New Language
1. Copy `src/content/en.json` → `src/content/[lang].json`
2. Translate all values
3. Create `src/pages/[lang]/index.astro`
4. Add hreflang to Base layout

### Add New Page
1. Create `src/pages/[slug].astro`
2. Use Base layout
3. Add to navigation
4. Sitemap updates automatically

### Modify Theme Colors
1. Edit `tailwind.config.mjs`
2. Rebuild: `npm run dev`

---

## 14. Troubleshooting

| Problem | Solution |
|---------|----------|
| Images not loading | Check path (case-sensitive), ensure in `src/assets/` |
| Styles not applying | Check class names, ensure Tailwind imported in `global.css` |
| Animations not working | Verify `main.js` loaded, check `animate-*` classes applied |
| Build fails | Run `npm run astro check`, verify JSON syntax |
| Fonts not loading | Check Google Fonts link in Base layout |

---

## 15. Project Initialization

```bash
# Create new Astro project
npm create astro@latest [project-name]

# Navigate to project
cd [project-name]

# Add Tailwind
npx astro add tailwind

# Add sitemap (optional)
npx astro add sitemap

# Install dependencies
npm install

# Start development
npm run dev
```
