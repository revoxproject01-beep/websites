// Main JavaScript file for the NexusWealth website

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });

    // RTL Toggle
    const rtlToggle = document.getElementById('rtl-toggle');
    const htmlElement = document.documentElement;

    // Check for saved preference
    if (localStorage.getItem('rtl') === 'true') {
        htmlElement.setAttribute('dir', 'rtl');
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', function() {
            if (htmlElement.getAttribute('dir') === 'rtl') {
                htmlElement.setAttribute('dir', 'ltr');
                localStorage.setItem('rtl', 'false');
            } else {
                htmlElement.setAttribute('dir', 'rtl');
                localStorage.setItem('rtl', 'true');
            }
        });
    }
    
    // Set active navigation item based on current page
    setActiveNavigation();
    
    // Enhanced dropdown functionality to prevent disappearing when moving cursor
    // Select all dropdown groups
    const dropdownGroups = document.querySelectorAll('.group');
    
    dropdownGroups.forEach(group => {
        const button = group.querySelector('button');
        const dropdownMenu = group.querySelector('div');
        
        if (button && dropdownMenu) {
            let timeoutId;
            
            // Show dropdown on button hover
            button.addEventListener('mouseenter', function() {
                clearTimeout(timeoutId);
                dropdownMenu.classList.remove('pointer-events-none');
                dropdownMenu.classList.add('pointer-events-auto');
                // Force reflow to ensure transition works
                dropdownMenu.offsetHeight;
                dropdownMenu.classList.remove('opacity-0', 'translate-y-2');
                dropdownMenu.classList.add('opacity-100', 'translate-y-0');
            });
            
            // Handle dropdown menu hover
            dropdownMenu.addEventListener('mouseenter', function() {
                clearTimeout(timeoutId);
                dropdownMenu.classList.remove('opacity-0', 'translate-y-2');
                dropdownMenu.classList.add('opacity-100', 'translate-y-0');
            });
            
            // Hide dropdown with delay when leaving both button and menu
            const hideDropdown = function() {
                timeoutId = setTimeout(() => {
                    dropdownMenu.classList.remove('opacity-100', 'translate-y-0');
                    dropdownMenu.classList.add('opacity-0', 'translate-y-2');
                    dropdownMenu.classList.remove('pointer-events-auto');
                    dropdownMenu.classList.add('pointer-events-none');
                }, 150); // 150ms delay
            };
            
            button.addEventListener('mouseleave', hideDropdown);
            dropdownMenu.addEventListener('mouseleave', hideDropdown);
        }
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle && mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
    
    // Handle mobile menu dropdowns
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            const dropdownButton = event.target.closest('button');
            if (dropdownButton && dropdownButton.nextElementSibling && dropdownButton.nextElementSibling.classList.contains('space-y-2')) {
                const dropdownMenu = dropdownButton.nextElementSibling;
                dropdownMenu.classList.toggle('hidden');
                
                // Rotate chevron icon
                const icon = dropdownButton.querySelector('i');
                if (icon) {
                    icon.classList.toggle('rotate-180');
                }
            }
        }
    });
    
    // Close mobile menu when resizing to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024 && mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    // FAQ Accordion functionality with mobile support
    const faqButtons = document.querySelectorAll('.bg-white.rounded-lg button');
    faqButtons.forEach(button => {
        // Add both click and touch events for better mobile support
        button.addEventListener('click', toggleFAQ);
        button.addEventListener('touchstart', toggleFAQ);
    });
    
    function toggleFAQ(e) {
        // Prevent default behavior for touch events
        if (e.type === 'touchstart') {
            e.preventDefault();
        }
        
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        // Toggle content visibility
        content.classList.toggle('hidden');
        
        // Rotate icon
        icon.classList.toggle('rotate-180');
    }
    
    // FAQ Search functionality
    const searchInput = document.getElementById('faq-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const faqItems = document.querySelectorAll('.bg-white.rounded-lg');
            
            faqItems.forEach(item => {
                const question = item.querySelector('h3').textContent.toLowerCase();
                const answer = item.querySelector('div').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation for required fields
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                // In a real application, you would submit the form here
                showNotification('Form submitted successfully!', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
    
    // Initialize Chart.js charts if present
    initializeCharts();
    
    // Add scroll-triggered animations
    initScrollAnimations();
    
    // Add interactive elements animations
    initInteractiveElements();
});

// Function to set active navigation item based on current page
function setActiveNavigation() {
    // Get current page filename
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.hidden.lg\\:flex a, .hidden.lg\\:flex button');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a, #mobile-menu button');
    
    // Define page mappings
    const pageMappings = {
        'index.html': 'Home',
        'index2.html': 'Home',
        'about.html': 'About',
        'services.html': 'Services',
        'pricing.html': 'Pricing',
        'faq.html': 'FAQ',
        'contact.html': 'Contact',
        'user-dashboard.html': 'Dashboard',
        'admin-dashboard.html': 'Dashboard',
        'test-active-nav.html': 'Home'
    };
    
    // Get the active page name
    const activePage = pageMappings[currentPage] || 'Home';
    
    // Set active state for desktop navigation
    navLinks.forEach(link => {
        // Remove any existing active classes
        link.classList.remove('nav-active');
        
        // Check if it's a dropdown button
        if (link.tagName === 'BUTTON') {
            // For dropdown buttons, check if the active page matches
            if (link.textContent.trim().includes(activePage)) {
                link.classList.add('nav-active');
            }
        } else {
            // For regular links, check the href
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('nav-active');
            }
            
            // Special handling for dashboard pages
            if ((currentPage === 'user-dashboard.html' || currentPage === 'admin-dashboard.html') && 
                link.textContent.trim().includes('Dashboard')) {
                link.classList.add('nav-active');
            }
            
            // Special handling for home pages
            if ((currentPage === 'index.html' || currentPage === 'index2.html' || currentPage === 'test-active-nav.html') && 
                link.textContent.trim().includes('Home')) {
                link.classList.add('nav-active');
            }
        }
    });
    
    // Set active state for mobile navigation
    mobileNavLinks.forEach(link => {
        // Remove any existing active classes
        link.classList.remove('nav-active');
        
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('nav-active');
        }
        
        // Special handling for dashboard pages
        if ((currentPage === 'user-dashboard.html' || currentPage === 'admin-dashboard.html') && 
            link.textContent.trim().includes('Dashboard')) {
            link.classList.add('nav-active');
        }
        
        // Special handling for home pages
        if ((currentPage === 'index.html' || currentPage === 'index2.html' || currentPage === 'test-active-nav.html') && 
            link.textContent.trim().includes('Home')) {
            link.classList.add('nav-active');
        }
    });
}

// Function to initialize charts
function initializeCharts() {
    // Interests Chart for user dashboard
    const interestsCtx = document.getElementById('interestsChart');
    if (interestsCtx) {
        new Chart(interestsCtx, {
            type: 'radar',
            data: {
                labels: ['Tax Planning', 'Investment', 'Retirement', 'Insurance', 'Estate Planning', 'Business Finance'],
                datasets: [{
                    label: 'Interest Level',
                    data: [85, 70, 60, 50, 40, 75],
                    backgroundColor: 'rgba(139, 92, 246, 0.2)', // purple-500 with opacity
                    borderColor: 'rgba(139, 92, 246, 1)', // purple-500
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(139, 92, 246, 1)', // purple-500
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(139, 92, 246, 1)' // purple-500
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                elements: {
                    line: {
                        borderWidth: 3
                    }
                }
            }
        });
    }
    
    // Revenue Chart for admin dashboard
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [65000, 72000, 68000, 75000, 82000, 79000, 85000, 92000, 88000, 95000, 102000, 86420],
                    borderColor: 'rgba(139, 92, 246, 1)', // purple-500
                    backgroundColor: 'rgba(139, 92, 246, 0.1)', // purple-500 with opacity
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-md shadow-lg text-white animate-fadeIn`;
    
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-500');
            break;
        case 'error':
            notification.classList.add('bg-red-500');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500');
            break;
        default:
            notification.classList.add('bg-purple-500'); // Changed to purple for brand consistency
    }
    
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('animate-fadeOut');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize scroll-triggered animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                entry.target.classList.remove('opacity-0');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize interactive elements
function initInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('animate-popIn');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('animate-popIn');
        });
    });
    
    // Add tilt effect to icons
    const icons = document.querySelectorAll('.icon-bounce');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.classList.add('animate-tilt');
        });
        
        icon.addEventListener('mouseleave', function() {
            this.classList.remove('animate-tilt');
        });
    });
    
    // Add floating effect to team member images
    const teamImages = document.querySelectorAll('.team-member img');
    teamImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.classList.add('animate-float');
        });
        
        img.addEventListener('mouseleave', function() {
            this.classList.remove('animate-float');
        });
    });
}