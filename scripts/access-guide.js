/* ============================================
   ACCESS-GUIDE.JS - Access Guide Page Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeAccessGuidePage();
});

function initializeAccessGuidePage() {
    // Initialize method accordions
    initializeMethodAccordions();
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add smooth scrolling
    addSmoothScroll();
    
    // Initialize copy-to-clipboard for code snippets
    initializeClipboard();
    
    // Add keyboard navigation
    addKeyboardNavigation();
}

/**
 * Initialize collapsible method sections
 */
function initializeMethodAccordions() {
    const methods = document.querySelectorAll('.access-method');
    
    methods.forEach(method => {
        const header = method.querySelector('.method-header');
        const content = method.querySelector('.method-content');
        
        if (header && content) {
            // Create toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'method-toggle';
            toggleBtn.innerHTML = '▼';
            toggleBtn.style.cssText = `
                background: none;
                border: none;
                color: #d4af37;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: auto;
                transition: transform 0.3s ease;
            `;
            
            header.appendChild(toggleBtn);
            
            // Initially collapse all but first
            const isFirst = method === methods[0];
            if (!isFirst) {
                content.style.display = 'none';
                content.style.maxHeight = '0';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
            
            // Toggle functionality
            header.addEventListener('click', function() {
                const isOpen = content.style.display !== 'none';
                
                // Close all other methods
                methods.forEach(m => {
                    const mc = m.querySelector('.method-content');
                    const mt = m.querySelector('.method-toggle');
                    if (m !== method) {
                        mc.style.display = 'none';
                        mc.style.maxHeight = '0';
                        if (mt) mt.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle current method
                if (isOpen) {
                    content.style.display = 'none';
                    content.style.maxHeight = '0';
                    toggleBtn.style.transform = 'rotate(0deg)';
                } else {
                    content.style.display = 'block';
                    content.style.maxHeight = content.scrollHeight + 'px';
                    toggleBtn.style.transform = 'rotate(180deg)';
                }
                
                // Track interaction
                trackUserInteraction('method_toggle', {
                    method: header.querySelector('h3')?.textContent,
                    isOpen: !isOpen
                });
            });
            
            // Keyboard accessibility
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleBtn.click();
                }
            });
        }
    });
    
    // Add styles for toggle button
    if (!document.getElementById('accordionStyles')) {
        const style = document.createElement('style');
        style.id = 'accordionStyles';
        style.textContent = `
            .method-header {
                cursor: pointer;
                user-select: none;
            }
            
            .method-content {
                transition: all 0.3s ease;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initialize FAQ accordion functionality
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            // Initially hide answers
            answer.style.display = 'none';
            
            question.addEventListener('click', function() {
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.display = 'none';
                    }
                });
                
                // Open/close current FAQ
                answer.style.display = isOpen ? 'none' : 'block';
                
                if (!isOpen) {
                    answer.style.animation = 'slideDown 0.3s ease-out';
                }
                
                // Track interaction
                trackUserInteraction('faq_toggle', {
                    question: this.textContent,
                    isOpen: !isOpen
                });
            });
            
            // Keyboard accessibility
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });
    
    // Add animation styles
    if (!document.getElementById('faqAnimations')) {
        const style = document.createElement('style');
        style.id = 'faqAnimations';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
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
 * Add scroll animations
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
        '.access-method, .requirement-card, .tip, .faq-item'
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
 * Add smooth scrolling for anchor links
 */
function addSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Track navigation
                trackUserInteraction('anchor_click', {
                    target: href,
                    text: this.textContent
                });
            }
        });
    });
}

/**
 * Initialize clipboard functionality for code snippets
 */
function initializeClipboard() {
    // Look for code blocks that need copy functionality
    const codeElements = document.querySelectorAll('code');
    
    codeElements.forEach((code, index) => {
        const container = code.parentElement;
        if (container) {
            // Create copy button
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '📋 Copy';
            copyBtn.style.cssText = `
                position: absolute;
                top: 5px;
                right: 5px;
                padding: 5px 10px;
                background: rgba(201, 170, 91, 0.8);
                color: #1a1a1a;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                font-size: 0.8rem;
                display: none;
                z-index: 10;
            `;
            
            // Show copy button on hover
            container.style.position = 'relative';
            container.addEventListener('mouseenter', () => {
                copyBtn.style.display = 'block';
            });
            container.addEventListener('mouseleave', () => {
                copyBtn.style.display = 'none';
            });
            
            // Copy functionality
            copyBtn.addEventListener('click', function() {
                const text = code.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    copyBtn.innerHTML = '✓ Copied!';
                    setTimeout(() => {
                        copyBtn.innerHTML = '📋 Copy';
                    }, 2000);
                    
                    trackUserInteraction('code_copied', {
                        codeSnippet: text.substring(0, 50)
                    });
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            });
            
            container.appendChild(copyBtn);
        }
    });
}

/**
 * Add keyboard navigation
 */
function addKeyboardNavigation() {
    // Alt + A to go to access methods
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'a') {
            const methodsSection = document.querySelector('.methods-section');
            if (methodsSection) {
                methodsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Alt + F to go to FAQ
        if (e.altKey && e.key === 'f') {
            const faqSection = document.querySelector('.faq-section');
            if (faqSection) {
                faqSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Alt + H to go to home
        if (e.altKey && e.key === 'h') {
            const header = document.querySelector('.main-header');
            if (header) {
                header.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

/**
 * Add back-to-top button
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
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Track user interactions for analytics
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
    
    // Log in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('User Interaction:', eventName, data);
    }
}

/**
 * Generate table of contents
 */
function generateTableOfContents() {
    const headings = document.querySelectorAll('h2[id], h3[id]');
    const tocContainer = document.querySelector('.table-of-contents');
    
    if (tocContainer && headings.length > 0) {
        const list = document.createElement('ul');
        
        headings.forEach(heading => {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.textContent = heading.textContent;
            
            item.appendChild(link);
            list.appendChild(item);
        });
        
        tocContainer.appendChild(list);
    }
}

// Initialize back-to-top
window.addEventListener('DOMContentLoaded', function() {
    initializeBackToTop();
    generateTableOfContents();
});

console.log('Access Guide page initialized successfully');
