// Main JavaScript File
class EducationWebsite {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.direction = localStorage.getItem('direction') || 'ltr';
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupRTL();
        this.setupNavigation();
        this.setupAnimations();
        this.setupForms();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupInteractiveElements();
    }

    // Theme Management
    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', this.theme);
        if (this.theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            document.documentElement.classList.remove('dark');
            if (themeIcon) themeIcon.textContent = '🌙';
        }

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        
        const themeIcon = document.getElementById('theme-icon');
        if (this.theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            document.documentElement.classList.remove('dark');
            if (themeIcon) themeIcon.textContent = '🌙';
        }
        
        localStorage.setItem('theme', this.theme);
    }

    // RTL Management
    setupRTL() {
        const rtlToggle = document.getElementById('rtl-toggle');
        
        // Apply saved direction
        document.documentElement.setAttribute('dir', this.direction);
        
        if (rtlToggle) {
            rtlToggle.addEventListener('click', () => {
                this.toggleRTL();
            });
        }
    }

    toggleRTL() {
        this.direction = this.direction === 'ltr' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', this.direction);
        localStorage.setItem('direction', this.direction);
    }

    // Navigation
    setupNavigation() {
        // Set active navigation link
        this.setActiveNavLink();
        
        // Dropdown menus
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (trigger && menu) {
                trigger.addEventListener('mouseenter', () => {
                    menu.classList.remove('hidden');
                    menu.classList.add('fade-in-scale');
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    menu.classList.add('hidden');
                    menu.classList.remove('fade-in-scale');
                });
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Set active navigation link based on current page
    setActiveNavLink() {
        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Select all navigation links - using class selector since not all pages use the id
        const navbar = document.querySelector('nav.navbar') || document.getElementById('navbar');
        if (!navbar) return;
        
        const navLinks = navbar.querySelectorAll('a');
        
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active', 'text-blue-600', 'dark:text-blue-400', 'font-semibold');
        });
        
        // Add active class to matching link
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href === currentPage || (currentPage === 'index.html' && href === 'index.html'))) {
                link.classList.add('active', 'text-blue-600', 'dark:text-blue-400', 'font-semibold');
            }
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('fade-in-scale');
            });
        }
        
        if (mobileMenuClose && mobileMenu) {
            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('fade-in-scale');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('fade-in-scale');
            }
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe all elements with animation class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Navbar background on scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-white/95', 'dark:bg-gray-900/95', 'backdrop-blur-sm', 'shadow-lg');
                } else {
                    navbar.classList.remove('bg-white/95', 'dark:bg-gray-900/95', 'backdrop-blur-sm', 'shadow-lg');
                }
            });
        }
    }

    // Form Handling
    setupForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<div class="spinner mx-auto"></div>';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Show success message
                this.showNotification('Form submitted successfully!', 'success');
            }, 2000);
        }
    }

    // Animations
    setupAnimations() {
        // Counter animation
        this.animateCounters();
        
        // Progress bars animation
        this.animateProgressBars();
        
        // Typing effect
        this.setupTypingEffect();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.countUp(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    countUp(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = progress + '%';
                }
            });
        });

        progressBars.forEach(bar => observer.observe(bar));
    }

    setupTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-effect');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const timer = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                
                if (i > text.length) {
                    clearInterval(timer);
                }
            }, 50);
        });
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 fade-in-scale ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            'bg-blue-500'
        } text-white`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // New Interactive Elements
    setupInteractiveElements() {
        // Add 3D tilt effect to cards
        this.setupCardInteractions();
        
        // Add button feedback
        this.setupButtonFeedback();
    }

    setupCardInteractions() {
        // Card interactions removed to prevent disappearing effect
        const cards = document.querySelectorAll('.card-3d, .card-animated, .card-glow, .card-spin, .card-wobble, .card, .card-hover');
        
        // No hover effects to ensure cards don't disappear
    }

    setupButtonFeedback() {
        const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-accent');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.add('shake');
                setTimeout(() => {
                    button.classList.remove('shake');
                }, 500);
            });
        });
    }

    // Filter functionality for courses
    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const courseCards = document.querySelectorAll('.course-card');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('bg-blue-600', 'text-white'));
                btn.classList.add('bg-blue-600', 'text-white');
                
                // Filter courses
                courseCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.classList.add('fade-in-scale');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Search functionality
    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.querySelectorAll('.searchable');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                
                searchResults.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(query)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    }

    // FAQ Accordion
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
                    
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-icon');
                        if (otherAnswer && otherItem !== item) {
                            otherAnswer.style.maxHeight = '0px';
                            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    // Toggle current item
                    if (isOpen) {
                        answer.style.maxHeight = '0px';
                        if (icon) icon.style.transform = 'rotate(0deg)';
                    } else {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        if (icon) icon.style.transform = 'rotate(180deg)';
                    }
                });
            }
        });
    }

    // Countdown Timer
    setupCountdown(targetDate) {
        const countdown = document.getElementById('countdown');
        
        if (!countdown) return;
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(targetDate).getTime();
            const distance = target - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdown.innerHTML = `
                <div class="text-center">
                    <span class="text-4xl font-bold text-blue-600">${days}</span>
                    <div class="text-sm">Days</div>
                </div>
                <div class="text-center">
                    <span class="text-4xl font-bold text-blue-600">${hours}</span>
                    <div class="text-sm">Hours</div>
                </div>
                <div class="text-center">
                    <span class="text-4xl font-bold text-blue-600">${minutes}</span>
                    <div class="text-sm">Minutes</div>
                </div>
                <div class="text-center">
                    <span class="text-4xl font-bold text-blue-600">${seconds}</span>
                    <div class="text-sm">Seconds</div>
                </div>
            `;
            
            if (distance < 0) {
                clearInterval(timer);
                countdown.innerHTML = '<h2 class="text-2xl font-bold text-center">We\'re Live!</h2>';
            }
        }, 1000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const website = new EducationWebsite();
    
    // Page-specific initialization
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'courses.html':
            website.setupFilters();
            website.setupSearch();
            break;
        case 'faq.html':
            website.setupFAQ();
            break;
        case 'coming-soon.html':
            website.setupCountdown('2025-12-31 23:59:59');
            break;
    }
});