/* ============================================
   MAIN.JS - Roundtable Hold Website
   ============================================ */

// Data object containing NPCs
const npcData = [
    {
        name: "Gideon Ofnir",
        role: "The All-Knowing",
        description: "Senior member and leader of the Roundtable Hold."
    },
    {
        name: "Smithing Master Hewg",
        role: "Blacksmith",
        description: "Upgrades weapons and spirit ashes with Smithing Stones."
    },
    {
        name: "Twin Maiden Husks",
        role: "Merchants",
        description: "Vendors offering goods expandable through Bell Bearings."
    },
    {
        name: "Roderika",
        role: "Spirit Tuner",
        description: "Enhances and improves your Spirit Ashes."
    }
];

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    displayNPCs();
    setupFormHandler();
    loadUserData();
});

/**
 * Function: Display NPCs using template literals and DOM manipulation
 */
function displayNPCs() {
    const container = document.getElementById('npcContainer');
    
    // Array method: map to transform data
    const npcHTML = npcData.map(npc => {
        // Template literal for creating NPC elements
        return `
            <article class="npc-item">
                <h3>${npc.name}</h3>
                <p class="npc-role">${npc.role}</p>
                <p>${npc.description}</p>
                <a href="npcs.html#${npc.name.toLowerCase().replace(/\s+/g, '-')}" class="btn">View Profile</a>
            </article>
        `;
    }).join('');
    
    // DOM manipulation: set innerHTML
    container.innerHTML = npcHTML;
}

/**
 * Function: Setup form handler with validation and localStorage
 */
function setupFormHandler() {
    const form = document.getElementById('newsletterForm');
    const messageDiv = document.getElementById('formMessage');
    
    // Event listener for form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            interest: document.getElementById('interest').value
        };
        
        // Conditional branching: validate form
        if (!formData.name || !formData.email) {
            showMessage('Please fill out all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Save to localStorage
        saveSubscriber(formData);
        
        // Show success message
        showMessage(`Thank you ${formData.name}! Check your email for confirmation.`, 'success');
        
        // Reset form
        form.reset();
    });
}

/**
 * Function: Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Function: Save subscriber to localStorage
 */
function saveSubscriber(subscriber) {
    // Get existing subscribers from localStorage
    let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    
    // Add new subscriber to array
    subscribers.push({
        ...subscriber,
        timestamp: new Date().toISOString()
    });
    
    // Save updated array back to localStorage
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
}

/**
 * Function: Load user data from localStorage
 */
function loadUserData() {
    const subscribers = localStorage.getItem('subscribers');
    
    // Conditional: Check if data exists
    if (subscribers) {
        const count = JSON.parse(subscribers).length;
        console.log(`Loaded ${count} subscriber(s) from localStorage`);
    }
}

/**
 * Function: Show message using DOM manipulation
 */
function showMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    
    // Remove existing classes
    messageDiv.classList.remove('success', 'error');
    
    // Add appropriate class based on type
    if (type === 'success' || type === 'error') {
        messageDiv.classList.add(type);
    }
    
    // Set message text using template literal
    messageDiv.textContent = text;
}

// Console log for development
console.log('Roundtable Hold website loaded');
