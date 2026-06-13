/* ============================================
   NPCS.JS - NPC Profiles Page Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeNPCsPage();
});

function initializeNPCsPage() {
    // Initialize filter functionality
    initializeFilters();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add keyboard navigation
    addKeyboardNavigation();
    
    // Initialize FAQ functionality if needed
    initializeFAQ();
}

/**
 * Initialize NPC filtering system
 */
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const npcProfiles = document.querySelectorAll('.npc-profile');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter NPCs
            npcProfiles.forEach(profile => {
                const category = profile.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    profile.classList.remove('hidden');
                    profile.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    profile.classList.add('hidden');
                }
            });
            
            // Track filter usage
            trackUserInteraction('npc_filter', {
                filterApplied: filter,
                resultsCount: document.querySelectorAll('.npc-profile:not(.hidden)').length
            });
        });
    });
    
    // Add animation styles
    if (!document.getElementById('filterAnimations')) {
        const style = document.createElement('style');
        style.id = 'filterAnimations';
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .npc-profile.hidden {
                display: none;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Add scroll animations for NPC cards
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
    
    const npcProfiles = document.querySelectorAll('.npc-profile');
    npcProfiles.forEach(profile => {
        observer.observe(profile);
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
 * Add keyboard navigation for filters
 */
function addKeyboardNavigation() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let nextButton;
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                nextButton = filterButtons[index + 1] || filterButtons[0];
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                nextButton = filterButtons[index - 1] || filterButtons[filterButtons.length - 1];
            }
            
            if (nextButton) {
                nextButton.focus();
                nextButton.click();
            }
        });
    });
    
    // Allow Enter/Space to activate button
    filterButtons.forEach(button => {
        button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
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
            question.addEventListener('click', function() {
                // Toggle answer visibility
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
                
                // Add animation
                if (!isOpen) {
                    answer.style.animation = 'slideDown 0.3s ease-out';
                }
                
                // Track FAQ interaction
                trackUserInteraction('faq_toggle', {
                    question: this.textContent,
                    isOpen: !isOpen
                });
            });
            
            // Make keyboard accessible
            question.setAttribute('tabindex', '0');
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
            .faq-answer {
                display: none;
            }
            
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
 * Search functionality for NPCs
 */
function initializeSearch() {
    const searchInput = document.getElementById('npcSearch');
    const npcProfiles = document.querySelectorAll('.npc-profile');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        let visibleCount = 0;
        
        npcProfiles.forEach(profile => {
            const npcName = profile.querySelector('.npc-name')?.textContent.toLowerCase() || '';
            const npcRole = profile.querySelector('.npc-role')?.textContent.toLowerCase() || '';
            const npcDescription = profile.querySelector('.npc-description')?.textContent.toLowerCase() || '';
            
            if (npcName.includes(searchTerm) || npcRole.includes(searchTerm) || npcDescription.includes(searchTerm)) {
                profile.classList.remove('hidden');
                visibleCount++;
            } else {
                profile.classList.add('hidden');
            }
        });
        
        // Show "no results" message if needed
        const noResults = document.getElementById('noResults');
        if (visibleCount === 0 && searchTerm.length > 0) {
            if (!noResults) {
                const message = document.createElement('div');
                message.id = 'noResults';
                message.style.cssText = 'text-align: center; color: #e8e8e8; padding: 2rem;';
                message.textContent = `No NPCs found matching "${searchTerm}"`;
                document.querySelector('.npc-list-grid').parentElement.insertBefore(message, document.querySelector('.npc-list-grid'));
            }
        } else if (noResults) {
            noResults.remove();
        }
        
        trackUserInteraction('npc_search', {
            searchTerm: searchTerm,
            resultsCount: visibleCount
        });
    });
}

/**
 * Add NPC profile detail view
 */
function initializeDetailView() {
    const npcProfiles = document.querySelectorAll('.npc-profile');
    
    npcProfiles.forEach(profile => {
        // Make profiles keyboard accessible
        profile.setAttribute('tabindex', '0');
        
        profile.addEventListener('click', function() {
            trackUserInteraction('npc_profile_view', {
                npcName: this.querySelector('.npc-name')?.textContent,
                npcId: this.id
            });
        });
    });
}

/**
 * Add smooth scroll for anchor links
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
            }
        });
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
 * Track user interactions
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

// Initialize back-to-top
window.addEventListener('DOMContentLoaded', function() {
    initializeBackToTop();
    addSmoothScroll();
    initializeSearch();
    initializeDetailView();
});

console.log('NPCs page initialized successfully');
