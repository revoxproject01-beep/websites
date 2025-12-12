// Property Details Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    initPropertyThumbnails();
    initImageGallery();
    initContactForm();
});

// Property thumbnail gallery
function initPropertyThumbnails() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.property-thumb');
    
    if (!mainImage || !thumbnails.length) return;
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumb.classList.add('active');
            
            // Update main image
            mainImage.src = thumb.src;
            mainImage.alt = thumb.alt;
            
            // Add fade effect
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 150);
        });
    });
}

// Image gallery modal (could be extended)
function initImageGallery() {
    const mainImage = document.getElementById('mainImage');
    
    if (mainImage) {
        mainImage.addEventListener('click', () => {
            // Here you could implement a full-screen image gallery
            showNotification('Full gallery view coming soon!', 'info');
        });
    }
}

// Contact form for property inquiry
function initContactForm() {
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = form.querySelector('input[placeholder*="Name"]')?.value;
            const email = form.querySelector('input[type="email"]')?.value;
            const message = form.querySelector('textarea')?.value;
            
            if (!email) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Simulate sending inquiry
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.classList.add('btn-loading');
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.classList.remove('btn-loading');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    showNotification('Your inquiry has been sent to the agent!', 'success');
                    form.reset();
                }, 2000);
            }
        });
    });
}

// Save property functionality
function saveProperty(propertyId) {
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    
    if (!savedProperties.includes(propertyId)) {
        savedProperties.push(propertyId);
        localStorage.setItem('savedProperties', JSON.stringify(savedProperties));
        showNotification('Property saved to your favorites!', 'success');
        
        // Update heart icon
        const heartBtn = document.querySelector('.fa-heart');
        if (heartBtn) {
            heartBtn.classList.add('text-red-500');
        }
    } else {
        showNotification('Property already in your favorites', 'info');
    }
}

// Load saved properties status
function loadSavedStatus() {
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    const currentPropertyId = window.location.pathname; // Simple ID based on URL
    
    if (savedProperties.includes(currentPropertyId)) {
        const heartBtn = document.querySelector('.fa-heart');
        if (heartBtn) {
            heartBtn.classList.add('text-red-500');
        }
    }
}

// Schedule viewing
function scheduleViewing() {
    showNotification('Viewing scheduled! We will contact you soon.', 'success');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSavedStatus();
    
    // Add click handlers for action buttons
    const saveBtn = document.querySelector('[class*="fa-heart"]')?.parentElement;
    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            saveProperty(window.location.pathname);
        });
    }
    
    const scheduleBtn = document.querySelector('button:contains("Schedule Viewing")');
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', scheduleViewing);
    }
});

// Utility function to check if element contains text
function elementContains(element, text) {
    return element && element.textContent.includes(text);
}