/* ============================================
   ROUNDTABLE.JS - Main Hub Page Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeRoundtablePage();
});

function initializeRoundtablePage() {
    // Add smooth scroll behavior
    addSmoothScroll();
    
    // Add interactive card effects
    addCardInteractions();
    
    // Add scroll animations
    addScrollAnimations();
}

/**
 * Add smooth scrolling for anchor links
 */
function addSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for navigation links
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add interactive effects to cards
 */
function addCardInteractions() {
    const cards = document.querySelectorAll('.info-card, .npc-card, .service-item');
    
    cards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'cardHover 0.3s ease-out';
            }, 10);
        });
        
        // Make cards keyboard accessible
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.classList.add('focused');
            }
        });
        
        card.addEventListener('keyup', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.classList.remove('focused');
            }
        });
    });
    
    // Add CSS animation if not already in stylesheet
    addCardHoverAnimation();
}

/**
 * Add card hover animation dynamically
 */
function addCardHoverAnimation() {
    if (!document.getElementById('cardHoverAnimation')) {
        const style = document.createElement('style');
        style.id = 'cardHoverAnimation';
        style.textContent = `
            @keyframes cardHover {
                from {
                    transform: translateY(0);
                }
                to {
                    transform: translateY(-5px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Add scroll animations for elements
 */
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const elementsToObserve = document.querySelectorAll(
        '.info-card, .npc-card, .service-item, .fact'
    );
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
    
    // Add animation styles
    if (!document.getElementById('scrollAnimations')) {
        const style = document.createElement('style');
        style.id = 'scrollAnimations';
        style.textContent = `
            .fade-in-up {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Track page performance and logging
 */
function trackPageMetrics() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
}

// Track metrics when page is fully loaded
window.addEventListener('load', function() {
    trackPageMetrics();
});

/**
 * Add back-to-top button functionality
 */
function initializeBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '↑ Top';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 10px 15px;
        background: rgba(201, 170, 91, 0.8);
        color: #1a1a1a;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        font-weight: bold;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
            setTimeout(() => {
                backToTopBtn.style.display = 'none';
            }, 300);
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(212, 175, 55, 1)';
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(201, 170, 91, 0.8)';
        this.style.transform = 'scale(1)';
    });
}

// Initialize back-to-top button
window.addEventListener('DOMContentLoaded', function() {
    initializeBackToTop();
});

/**
 * Handle keyboard navigation
 */
document.addEventListener('keydown', function(e) {
    // Alt + H to go to home section
    if (e.altKey && e.key === 'h') {
        const header = document.querySelector('.main-header');
        if (header) {
            header.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Alt + N to go to NPCs section
    if (e.altKey && e.key === 'n') {
        const npcsSection = document.getElementById('featured-npcs');
        if (npcsSection) {
            npcsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

/**
 * Add analytics tracking
 */
function trackUserInteraction(eventName, data = {}) {
    const event = new CustomEvent('userInteraction', {
        detail: {
            event: eventName,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            ...data
        }
    });
    
    document.dispatchEvent(event);
    
    // Log to console in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('User Interaction:', eventName, data);
    }
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.classList.contains('view-profile')) {
        trackUserInteraction('button_click', {
            buttonText: e.target.textContent,
            buttonClass: e.target.className
        });
    }
});

// Track section views
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            if (!section.dataset.tracked) {
                section.dataset.tracked = 'true';
                trackUserInteraction('section_viewed', {
                    sectionId: section.id,
                    sectionTitle: section.querySelector('h2')?.textContent
                });
            }
        }
    });
});

console.log('Roundtable Hub page initialized successfully');
