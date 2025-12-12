// Main JavaScript functionality for Apex Solutions

// Dark mode functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.classList.toggle('dark', savedTheme === 'dark');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
}

// RTL toggle functionality
function initRTLToggle() {
    const rtlToggle = document.getElementById('rtlToggle');
    const html = document.documentElement;
    
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            html.setAttribute('dir', newDir);
            localStorage.setItem('direction', newDir);
        });
    }
    
    // Apply saved direction
    const savedDirection = localStorage.getItem('direction');
    if (savedDirection) {
        html.setAttribute('dir', savedDirection);
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Add animation class
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('animate-fadeIn');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// User menu dropdown functionality
function initUserMenu() {
    const userMenuToggle = document.getElementById('userMenuToggle');
    const userMenu = document.getElementById('userMenu');
    
    if (userMenuToggle && userMenu) {
        userMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('hidden');
            // Add animation class
            if (!userMenu.classList.contains('hidden')) {
                userMenu.classList.add('animate-fadeIn');
            }
        });
        
        // Close user menu when clicking outside
        document.addEventListener('click', () => {
            userMenu.classList.add('hidden');
        });
    }
}

// Testimonial carousel functionality
function initTestimonialCarousel() {
    const testimonials = [
        {
            text: "Apex Solutions transformed our operations completely. Their strategic insights and implementation expertise helped us increase efficiency by 40% in just 6 months.",
            author: "Sarah Johnson",
            position: "CEO, TechCorp",
            image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150"
        },
        {
            text: "The digital transformation project exceeded our expectations. Apex Solutions' team was professional, knowledgeable, and delivered results that directly impacted our bottom line.",
            author: "Michael Chen",
            position: "CTO, InnovateTech",
            image: "https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=150"
        },
        {
            text: "Working with Apex Solutions was a game-changer for our company. Their change management approach ensured smooth adoption of new processes across all departments.",
            author: "Emily Rodriguez",
            position: "VP Operations, GlobalCorp",
            image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150"
        }
    ];
    
    let currentTestimonial = 0;
    const testimonialSlide = document.querySelector('.testimonial-slide');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    function updateTestimonial() {
        if (testimonialSlide) {
            // Add fade out effect
            testimonialSlide.style.opacity = '0';
            setTimeout(() => {
                const testimonial = testimonials[currentTestimonial];
                testimonialSlide.innerHTML = `
                    <div class="text-center">
                        <p class="text-xl italic mb-6">"${testimonial.text}"</p>
                        <div class="flex items-center justify-center">
                            <img src="${testimonial.image}" alt="${testimonial.author}" class="w-12 h-12 rounded-full mr-4">
                            <div>
                                <h4 class="font-semibold">${testimonial.author}</h4>
                                <p class="text-gray-600 dark:text-gray-400">${testimonial.position}</p>
                            </div>
                        </div>
                    </div>
                `;
                // Add fade in effect
                testimonialSlide.style.opacity = '1';
            }, 300);
        }
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonial();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        });
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        if (nextBtn) {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial();
        }
    }, 5000);
    
    // Initialize first testimonial
    updateTestimonial();
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

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg smooth-transition transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced hover effects
function initHoverEffects() {
    // Add scale effect to buttons and cards
    const scaleElements = document.querySelectorAll('.scale-hover');
    scaleElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.05)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)';
        });
    });
    
    // Add fade-in effect to elements when they come into view
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    initRTLToggle();
    initMobileMenu();
    initUserMenu();
    initTestimonialCarousel();
    initSmoothScrolling();
    initHoverEffects();
    
    // Add loading animation to buttons
    document.querySelectorAll('button[type="submit"]').forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
});

// Export functions for use in other scripts
window.ApexSolutions = {
    validateEmail,
    showNotification,
    initDarkMode,
    initRTLToggle,
    initMobileMenu,
    initUserMenu,
    initTestimonialCarousel,
    initSmoothScrolling,
    initHoverEffects
};