/**
 * Petra Dubai - Main JavaScript
 * Luxury Real Estate Website
 * GSAP animations and interactions
 * 
 * Dependencies:
 * - GSAP 3.12.2
 * - ScrollTrigger plugin
 */

// Wait for DOM and GSAP to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded. Animations disabled.');
        // Show content without animations
        document.querySelectorAll('.hero-tagline .line, .hero-subtitle, .hero-cta, .scroll-indicator, .section-label, .section-title, .difference-text p, .difference-image, .service-card, .portfolio-item, .testimonial, .testimonial-author, .faq-item').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    initAnimations();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initDynamicYear();
    initEmailProtection();
    initLanguageDetection();
});

/* ========================================
   Dynamic Copyright Year
   ======================================== */
function initDynamicYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/* ========================================
   Email Protection (Anti-Spam)
   ======================================== */
function initEmailProtection() {
    document.querySelectorAll('.email-link').forEach(link => {
        const user = link.dataset.user;
        const domain = link.dataset.domain;

        if (user && domain) {
            const email = user + '@' + domain;
            link.href = 'mailto:' + email;

            // Update visible text if it exists
            const textSpan = link.querySelector('.email-text');
            if (textSpan) {
                textSpan.textContent = email;
            }
        }
    });
}

/* ========================================
   Navbar Scroll Effect
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Use passive listener for better scroll performance
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ========================================
   Mobile Menu Toggle
   ======================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    if (!menuBtn || !navLinks) return;

    function toggleMenu() {
        const isOpen = navLinks.classList.contains('active');

        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');

        // Update ARIA
        menuBtn.setAttribute('aria-expanded', !isOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    function closeMenu() {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Toggle on button click
    menuBtn.addEventListener('click', toggleMenu);

    // Close on overlay click
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
}

/* ========================================
   Initialize All Animations
   ======================================== */
function initAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Show all content immediately without animations
        gsap.set('.hero-tagline .line, .hero-subtitle, .hero-cta, .scroll-indicator', {
            opacity: 1,
            y: 0,
            clearProps: 'transform'
        });
        gsap.set('.section-label, .section-title, .difference-text p, .difference-image, .service-card, .portfolio-item, .testimonial, .testimonial-author, .faq-item', {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            clearProps: 'transform'
        });
        return;
    }

    initHeroAnimations();
    initSectionAnimations();
    initParallaxEffects();
}

/* ========================================
   Hero Animations
   ======================================== */
function initHeroAnimations() {
    const heroTl = gsap.timeline({ delay: 0.3 });

    heroTl
        .to('.hero-tagline .line', {
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out'
        })
        .to('.hero-subtitle', {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6')
        .to('.hero-cta', {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.scroll-indicator', {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.2');
}

/* ========================================
   Section Header Animation Helper
   ======================================== */
function animateSectionHeader(trigger) {
    if (!trigger) return;

    gsap.to(trigger.querySelectorAll('.section-label, .section-title'), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: trigger,
            start: 'top 75%',
        }
    });
}

/* ========================================
   Section Animations
   ======================================== */
function initSectionAnimations() {
    // Difference Section
    const differenceSection = document.querySelector('.difference');
    if (differenceSection) {
        animateSectionHeader(differenceSection);

        gsap.to('.difference-text p', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.difference-text',
                start: 'top 70%',
            }
        });

        gsap.to('.difference-image', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.difference-image',
                start: 'top 75%',
            }
        });
    }

    // Services Section
    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
        animateSectionHeader(servicesSection);

        gsap.to('.service-card', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 70%',
            }
        });
    }

    // Portfolio Section
    const portfolioSection = document.querySelector('.portfolio');
    if (portfolioSection) {
        animateSectionHeader(portfolioSection);

        gsap.to('.portfolio-item', {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.portfolio-grid',
                start: 'top 70%',
            }
        });
    }

    // Testimonials Section
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
        animateSectionHeader(testimonialsSection);

        // Animate testimonial cards
        gsap.to('.testimonial', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.testimonials-grid',
                start: 'top 70%',
            }
        });

        // Animate author names with delay
        gsap.to('.testimonial-author', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.testimonials-grid',
                start: 'top 70%',
            }
        });
    }

    // Developers Section
    const developersSection = document.querySelector('.developers');
    if (developersSection) {
        animateSectionHeader(developersSection);
    }

    // FAQ Section
    const faqSection = document.querySelector('.faq');
    if (faqSection) {
        animateSectionHeader(faqSection);

        // Animate FAQ items with stagger
        gsap.to('.faq-item', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.faq-grid',
                start: 'top 75%',
            }
        });
    }
}

/* ========================================
   Parallax Effects
   ======================================== */
function initParallaxEffects() {
    // Parallax on difference image
    const differenceImage = document.querySelector('.difference-image img');
    if (differenceImage) {
        gsap.to(differenceImage, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: '.difference-image',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    // Parallax on portfolio items
    document.querySelectorAll('.portfolio-item').forEach((item, i) => {
        const img = item.querySelector('img');
        if (img) {
            gsap.to(img, {
                yPercent: i % 2 === 0 ? -8 : -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }
    });
}

/* ========================================
   Smooth Scroll for Anchor Links
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                // Calculate offset for fixed navbar
                const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });
}
/* ========================================
   Language Detection
   ======================================== */
function initLanguageDetection() {
    const currentPath = window.location.pathname;
    const isHungarianPage = currentPath.includes('/hu/');
    const preferredLang = localStorage.getItem('petra-lang-pref');

    // Language switcher handling - save preference when user clicks
    document.querySelectorAll('.lang-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const isHuLink = link.getAttribute('aria-label') === 'Magyar';
            localStorage.setItem('petra-lang-pref', isHuLink ? 'hu' : 'en');
        });
    });

    // Only auto-redirect if no preference set and user is on the root/English page
    if (!preferredLang && !isHungarianPage) {
        const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

        if (browserLang && (browserLang.toLowerCase().startsWith('hu'))) {
            // Check if we are on index.html or root to avoid complex path logic
            const isRoot = currentPath === '/' || currentPath.endsWith('index.html');
            if (isRoot) {
                // Determine redirect path (handles local file testing and server)
                const redirectPath = currentPath.endsWith('index.html') ? 'hu/index.html' : 'hu/';
                window.location.href = redirectPath;
            }
        }
    }
}
