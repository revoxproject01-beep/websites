// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        });
    }
}

// RTL Toggle
function initRTL() {
    const rtlToggle = document.getElementById('rtlToggle');
    const html = document.documentElement;
    
    // Check for saved RTL preference
    const savedDir = localStorage.getItem('direction');
    if (savedDir === 'rtl') {
        html.setAttribute('dir', 'rtl');
    }
    
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            html.setAttribute('dir', newDir);
            localStorage.setItem('direction', newDir);
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Carousel functionality
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const slides = track.children;
    const totalSlides = slides.length;
    
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
        updateCarousel();
    });
    
    // Auto-play carousel
    setInterval(() => {
        currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000);
    
    // Update on window resize
    window.addEventListener('resize', updateCarousel);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// Form validation and submission
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.classList.add('btn-loading');
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.classList.remove('btn-loading');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    // Show success message
                    showNotification('Request submitted successfully! Our team will contact you shortly.', 'success');
                }, 2000);
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
    
    // Updated color scheme for premium theme
    let bgColor;
    switch(type) {
        case 'success':
            bgColor = 'bg-primary'; // Royal blue
            break;
        case 'error':
            bgColor = 'bg-red-500';
            break;
        case 'warning':
            bgColor = 'bg-secondary'; // Gold
            break;
        default:
            bgColor = 'bg-primary'; // Royal blue
    }
    
    notification.className += ` ${bgColor} text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : type === 'warning' ? 'exclamation-triangle' : 'info'} mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in with premium transition
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('transition-premium');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Search functionality
function initSearch() {
    const searchForms = document.querySelectorAll('form');
    
    searchForms.forEach(form => {
        const searchInput = form.querySelector('input[type="text"]');
        if (searchInput && searchInput.placeholder.includes('location')) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const location = searchInput.value;
                if (location.trim()) {
                    showNotification(`Searching premium properties in ${location}...`, 'info');
                    // Here you would typically redirect to search results
                    setTimeout(() => {
                        showNotification('Search completed! Exclusive listings found.', 'success');
                    }, 2000);
                }
            });
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initRTL();
    initMobileMenu();
    initCarousel();
    initSmoothScrolling();
    initForms();
    initSearch();
    highlightCurrentPage();
});

// Highlight current page in navigation
function highlightCurrentPage() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Highlight desktop navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
            link.classList.add('current-page');
        }
    });
    
    // Highlight mobile navigation links
    const mobileLinks = document.querySelectorAll('#mobileMenu a');
    mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
            link.classList.add('current-page');
        }
    });
    
    // Special handling for dropdown menus
    if (currentPage.includes('index')) {
        // Highlight Home dropdown
        const homeButtons = document.querySelectorAll('.nav-link');
        homeButtons.forEach(button => {
            if (button.textContent.includes('Home')) {
                button.classList.add('current-page');
            }
        });
    } else if (currentPage.includes('dashboard')) {
        // Highlight Dashboard dropdown
        const dashboardButtons = document.querySelectorAll('.nav-link');
        dashboardButtons.forEach(button => {
            if (button.textContent.includes('Dashboard')) {
                button.classList.add('current-page');
            }
        });
    }
}

// Utility functions
function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

// Export functions for use in other scripts
window.PropertyHub = {
    showNotification,
    toggleClass,
    addClass,
    removeClass
};