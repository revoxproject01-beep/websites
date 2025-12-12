// Theme Management
class ThemeManager {
    constructor() {
        this.rtlMode = localStorage.getItem('rtlMode') === 'true' || false;
        this.init();
    }

    init() {
        this.applyRTL();
        this.bindEvents();
    }

    bindEvents() {
        // RTL toggle
        const rtlToggle = document.getElementById('rtlToggle');
        if (rtlToggle) {
            rtlToggle.addEventListener('click', () => this.toggleRTL());
        }

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    toggleRTL() {
        this.rtlMode = !this.rtlMode;
        localStorage.setItem('rtlMode', this.rtlMode);
        this.applyRTL();
    }

    applyRTL() {
        if (this.rtlMode) {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.classList.add('rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.classList.remove('rtl');
        }
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const target = document.querySelector(anchor.getAttribute('href'));
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
}

// Portfolio Filter
class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.portfolio-filter');
        this.portfolioItems = document.querySelectorAll('.group'); // Updated selector to match actual portfolio items
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterPortfolio(filter);
                this.updateActiveFilter(e.target);
            });
        });
    }

    filterPortfolio(filter) {
        this.portfolioItems.forEach(item => {
            const categories = item.getAttribute('data-category').split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                item.style.display = 'block';
                item.classList.add('animate-fade-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('animate-fade-in');
            }
        });
    }

    updateActiveFilter(activeButton) {
        // Remove active class from all buttons
        this.filterButtons.forEach(button => {
            button.classList.remove('filter-btn-active');
            button.classList.add('filter-btn');
        });

        // Add active class to clicked button
        activeButton.classList.remove('filter-btn');
        activeButton.classList.add('filter-btn-active');
    }
}

// FAQ Accordion
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');

            question.addEventListener('click', () => {
                const isOpen = !answer.classList.contains('hidden');
                
                // Close all other items
                this.faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.faq-answer').classList.add('hidden');
                        otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                    }
                });

                // Toggle current item
                if (isOpen) {
                    answer.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    answer.classList.remove('hidden');
                    icon.style.transform = 'rotate(45deg)';
                }
            });
        });
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitButton.disabled = true;

        // Simulate form submission
        try {
            await this.simulateSubmission();
            this.showSuccessMessage();
            this.contactForm.reset();
        } catch (error) {
            this.showErrorMessage();
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    simulateSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000); // Simulate network delay
        });
    }

    showSuccessMessage() {
        this.showMessage('Thank you! Your message has been sent successfully.', 'success');
    }

    showErrorMessage() {
        this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    }

    showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `fixed top-4 right-4 p-4 rounded-lg z-50 ${
            type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
        }`;
        message.textContent = text;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

// Countdown Timer
class CountdownTimer {
    constructor(endDate) {
        this.endDate = new Date(endDate).getTime();
        this.init();
    }

    init() {
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.endDate - now;

        if (distance < 0) {
            this.displayExpired();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.displayTime(days, hours, minutes, seconds);
    }

    displayTime(days, hours, minutes, seconds) {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = this.padZero(days);
        if (hoursEl) hoursEl.textContent = this.padZero(hours);
        if (minutesEl) minutesEl.textContent = this.padZero(minutes);
        if (secondsEl) secondsEl.textContent = this.padZero(seconds);
    }

    displayExpired() {
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            countdownEl.innerHTML = '<h2 class="text-2xl font-bold text-white">We\'re Live!</h2>';
        }
    }

    padZero(num) {
        return num < 10 ? `0${num}` : num;
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create geometric background shapes
    const geometricBg = document.getElementById('geometricBg');
    if (geometricBg) {
        createGeometricShapes(geometricBg);
    }
    
    // Create particle background
    const particleBg = document.getElementById('particleBg');
    if (particleBg) {
        createParticles(particleBg);
    }
    new ThemeManager();
    new SmoothScroll();
    new PortfolioFilter();
    new FAQAccordion();
    new FormHandler();
    new ScrollAnimations();

    // Initialize countdown timer if on coming-soon page
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        // Set countdown to 30 days from now
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        new CountdownTimer(futureDate);
    }
    
    // Create stars for background if on 404 page
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        const starCount = 150;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 3;
            
            // Random animation duration
            const duration = 2 + Math.random() * 5;
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.setProperty('--duration', `${duration}s`);
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            starsContainer.appendChild(star);
        }
    }
});

// Function to create geometric background shapes
function createGeometricShapes(container) {
    const shapeCount = 15;
    
    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        shape.classList.add('geometric-shape');
        
        // Random shape type
        const shapeTypes = ['circle', 'square', 'triangle'];
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        
        // Random size
        const size = 20 + Math.random() * 80;
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random animation
        const animations = ['floating-shape', 'moving-shape'];
        const animation = animations[Math.floor(Math.random() * animations.length)];
        
        // Random animation duration
        const duration = 8 + Math.random() * 12;
        
        // Apply styles based on shape type
        switch(shapeType) {
            case 'circle':
                shape.classList.add('geometric-circle');
                shape.style.width = `${size}px`;
                shape.style.height = `${size}px`;
                break;
            case 'square':
                shape.classList.add('geometric-square');
                shape.style.width = `${size}px`;
                shape.style.height = `${size}px`;
                break;
            case 'triangle':
                shape.classList.add('geometric-triangle');
                shape.style.borderWidth = `${size/2}px ${size/2}px ${size}px ${size/2}px`;
                break;
        }
        
        // Apply common styles
        shape.style.left = `${x}%`;
        shape.style.top = `${y}%`;
        shape.style.animation = `${animation} ${duration}s infinite`;
        shape.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(shape);
    }
}

// Function to create particle background
function createParticles(container) {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle', 'floating-particle');
        
        // Random size
        const size = 2 + Math.random() * 8;
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random animation duration
        const duration = 10 + Math.random() * 20;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random color from theme
        const colors = ['#6366f1', '#8b5cf6', '#ec4899'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        
        container.appendChild(particle);
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});