// Global RTL toggle functionality
function initRTLToggle() {
    // Check if RTL toggle buttons exist on the page
    const rtlToggle = document.getElementById('rtlToggle');
    const rtlToggleMobile = document.getElementById('rtlToggleMobile');
    
    // Function to update icons based on direction
    function updateIcons(direction) {
        const icon = rtlToggle ? rtlToggle.querySelector('i') : null;
        const iconMobile = rtlToggleMobile ? rtlToggleMobile.querySelector('i') : null;
        
        if (direction === 'rtl') {
            if (icon) {
                icon.classList.remove('fa-globe');
                icon.classList.add('fa-globe-asia');
            }
            if (iconMobile) {
                iconMobile.classList.remove('fa-globe');
                iconMobile.classList.add('fa-globe-asia');
            }
        } else {
            if (icon) {
                icon.classList.remove('fa-globe-asia');
                icon.classList.add('fa-globe');
            }
            if (iconMobile) {
                iconMobile.classList.remove('fa-globe-asia');
                iconMobile.classList.add('fa-globe');
            }
        }
    }
    
    // Function to handle RTL toggle
    function handleRTLToggle() {
        const htmlElement = document.documentElement;
        
        // Toggle between LTR and RTL
        if (htmlElement.getAttribute('dir') === 'rtl') {
            htmlElement.setAttribute('dir', 'ltr');
            // Save preference to localStorage
            localStorage.setItem('layoutDirection', 'ltr');
            // Update icons
            updateIcons('ltr');
        } else {
            htmlElement.setAttribute('dir', 'rtl');
            // Save preference to localStorage
            localStorage.setItem('layoutDirection', 'rtl');
            // Update icons
            updateIcons('rtl');
        }
    }
    
    // Add click event listeners to both toggle buttons
    if (rtlToggle) {
        // Remove any existing event listeners to prevent duplicates
        rtlToggle.removeEventListener('click', handleRTLClick);
        rtlToggle.addEventListener('click', handleRTLClick);
    }
    
    if (rtlToggleMobile) {
        // Remove any existing event listeners to prevent duplicates
        rtlToggleMobile.removeEventListener('click', handleRTLClick);
        rtlToggleMobile.addEventListener('click', handleRTLClick);
    }
    
    // Click handler function
    function handleRTLClick(e) {
        e.stopPropagation(); // Prevent event bubbling
        handleRTLToggle();
        
        // Add animation to the toggle button
        this.classList.add('rotate-180');
        setTimeout(() => {
            this.classList.remove('rotate-180');
        }, 300);
    }
    
    // Check for saved layout preference
    const savedLayout = localStorage.getItem('layoutDirection');
    if (savedLayout) {
        document.documentElement.setAttribute('dir', savedLayout);
        // Update icons on page load
        updateIcons(savedLayout);
    }
}

// Initialize RTL toggle functionality
// We initialize in multiple ways to ensure it works regardless of when the script loads

// Method 1: DOMContentLoaded event
document.addEventListener('DOMContentLoaded', initRTLToggle);

// Method 2: Direct initialization if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // DOM is already loaded, initialize immediately
    setTimeout(initRTLToggle, 1);
}

// Method 3: Window load event as a fallback
window.addEventListener('load', initRTLToggle);

// Mobile menu toggle functionality - SIMPLIFIED AND ROBUST VERSION
function initMobileMenu() {
    // Function to set up mobile menu functionality
    function setupMobileMenu() {
        // Get the mobile menu button and menu
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        // If either element doesn't exist, exit early
        if (!mobileMenuButton || !mobileMenu) {
            return;
        }
        
        // Add click event to mobile menu button
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the 'hidden' class on the mobile menu
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            // If the click is outside the mobile menu and not on the mobile menu button
            if (!mobileMenu.contains(e.target) && e.target !== mobileMenuButton && !mobileMenuButton.contains(e.target)) {
                // Add the 'hidden' class to hide the mobile menu
                mobileMenu.classList.add('hidden');
            }
        });
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        // DOM is still loading, wait for it to complete
        document.addEventListener('DOMContentLoaded', setupMobileMenu);
    } else {
        // DOM is already ready, set up immediately
        setupMobileMenu();
    }
}

// Dropdown functionality
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.py-4.px-3, .block.px-4.py-2'); // More specific selectors
        if (trigger) {
            // Remove any existing event listeners to prevent duplicates
            trigger.removeEventListener('click', handleDropdownClick);
            trigger.addEventListener('click', handleDropdownClick);
        }
    });
    
    function handleDropdownClick(e) {
        // Only for mobile menu dropdowns
        if (this.closest('.mobile-menu')) {
            e.preventDefault();
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.classList.toggle('hidden');
            }
        }
    }
}

// Enhanced RTL support for dashboard layouts
function enhanceRTLSupport() {
    // Apply RTL-specific styles dynamically
    const htmlElement = document.documentElement;
    
    // Function to apply RTL styles
    function applyRTLStyles() {
        const isRTL = htmlElement.getAttribute('dir') === 'rtl';
        
        // Get all elements that need RTL adjustments
        const sidebarElements = document.querySelectorAll('.sidebar');
        const contentElements = document.querySelectorAll('.flex-1.ml-64');
        const textRightElements = document.querySelectorAll('.text-right');
        const textLeftElements = document.querySelectorAll('.text-left');
        
        // Apply RTL adjustments
        if (isRTL) {
            // Sidebar positioning
            sidebarElements.forEach(el => {
                el.style.right = '0';
                el.style.left = 'auto';
            });
            
            // Content margin adjustments
            contentElements.forEach(el => {
                el.style.marginLeft = '0';
                el.style.marginRight = '16rem';
            });
            
            // Text alignment
            textRightElements.forEach(el => {
                el.style.textAlign = 'left';
            });
            
            textLeftElements.forEach(el => {
                el.style.textAlign = 'right';
            });
        } else {
            // Reset RTL adjustments
            sidebarElements.forEach(el => {
                el.style.right = '';
                el.style.left = '';
            });
            
            contentElements.forEach(el => {
                el.style.marginLeft = '';
                el.style.marginRight = '';
            });
            
            textRightElements.forEach(el => {
                el.style.textAlign = '';
            });
            
            textLeftElements.forEach(el => {
                el.style.textAlign = '';
            });
        }
    }
    
    // Apply styles on load and when RTL is toggled
    applyRTLStyles();
    
    // Watch for attribute changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
                applyRTLStyles();
            }
        });
    });
    
    observer.observe(htmlElement, {
        attributes: true
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initRTLToggle();
    initMobileMenu();
    initDropdowns();
    enhanceRTLSupport();
});

// Also initialize after page load to ensure everything is ready
window.addEventListener('load', function() {
    initRTLToggle();
    initMobileMenu();
    initDropdowns();
    enhanceRTLSupport();
});