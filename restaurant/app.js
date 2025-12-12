// Global RTL/LTR Toggle Functionality
function toggleRTL() {
    const html = document.documentElement;
    
    if (html.getAttribute('dir') === 'rtl') {
        html.setAttribute('dir', 'ltr');
    } else {
        html.setAttribute('dir', 'rtl');
    }
    
    // Note: We're using the globe symbol directly in HTML, so no icon update needed here
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('.mobile-menu-button i');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.remove('opacity-0', '-translate-y-4');
            mobileMenu.classList.add('opacity-100', 'translate-y-0');
        }, 10);
        if (menuIcon) menuIcon.className = 'fas fa-times';
    } else {
        mobileMenu.classList.remove('opacity-100', 'translate-y-0');
        mobileMenu.classList.add('opacity-0', '-translate-y-4');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
        if (menuIcon) menuIcon.className = 'fas fa-bars';
    }
}

// Desktop Dropdown Toggle for touch devices
function toggleDesktopDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const button = event.currentTarget;
    const dropdown = button.parentElement;
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    
    // Check if dropdown is currently open
    const isOpen = dropdownContent.classList.contains('dropdown-open');
    
    // Close all open dropdowns
    document.querySelectorAll('.dropdown-content').forEach(content => {
        if (content !== dropdownContent) {
            content.classList.remove('dropdown-open');
            content.style.removeProperty('max-height');
        }
    });
    
    // Toggle this dropdown - open if it was closed
    if (!isOpen) {
        dropdownContent.classList.add('dropdown-open');
        dropdownContent.style.maxHeight = '300px';
    } else {
        dropdownContent.classList.remove('dropdown-open');
        dropdownContent.style.removeProperty('max-height');
    }
}

// Close dropdowns when clicking outside
function closeDropdowns(event) {
    if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-content').forEach(content => {
            content.classList.remove('dropdown-open');
            content.style.removeProperty('max-height');
        });
    }
}

// Smooth Scroll
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to dropdown buttons for touch device support
    document.querySelectorAll('.dropdown > button').forEach(button => {
        button.addEventListener('click', toggleDesktopDropdown);
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', closeDropdowns);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add a small delay to ensure DOM is fully loaded
    setTimeout(() => {
        document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .zoom-in, .bounce-in').forEach(el => {
            observer.observe(el);
        });
    }, 100);
    
    // Navbar scroll effect

});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
}

function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    if (cartCounts.length > 0) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounts.forEach(cartCount => {
            cartCount.textContent = total;
            if (total > 0) {
                cartCount.classList.remove('hidden');
            } else {
                cartCount.classList.add('hidden');
            }
        });
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-0 transition-all duration-300';
    notification.innerHTML = `
        <div class="flex items-center gap-2">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Countdown Timer for Coming Soon page
function startCountdown(targetDate) {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownEl.innerHTML = '<h2 class="text-4xl font-bold">We are Live!</h2>';
        }
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}


// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

// Also update cart count when the page is loaded
window.addEventListener('load', () => {
    updateCartCount();
});

// Make functions globally available
window.toggleRTL = toggleRTL;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleDesktopDropdown = toggleDesktopDropdown;
window.addToCart = addToCart;
window.toggleFAQ = toggleFAQ;