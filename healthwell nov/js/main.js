// Main JavaScript functionality
class HarmonyWellApp {
  constructor() {
    this.init();
  }

  init() {
    this.initTheme();
    this.initRTL();
    this.initNavigation();
    this.initAnimations();
    this.initScrollEffects();
    this.initInteractiveElements();
    this.initActiveLinkHighlighting();
  }

  // Theme Management
  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (systemPrefersDark) {
      document.documentElement.classList.add('dark');
    }

    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Update theme toggle icon
    this.updateThemeIcon();
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (sunIcon && moonIcon) {
      sunIcon.style.display = isDark ? 'none' : 'block';
      moonIcon.style.display = isDark ? 'block' : 'none';
    }
  }

  // RTL Management
  initRTL() {
    const savedDirection = localStorage.getItem('direction') || 'ltr';
    document.documentElement.setAttribute('dir', savedDirection);

    const rtlToggle = document.getElementById('rtl-toggle');
    if (rtlToggle) {
      rtlToggle.addEventListener('click', () => this.toggleRTL());
    }
  }

  toggleRTL() {
    const currentDir = document.documentElement.getAttribute('dir');
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('direction', newDir);
  }

  // Navigation Management
  initNavigation() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden', !isOpen);
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('rotate-45'));
      });
    }

    // Dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.dropdown-trigger');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      if (trigger && menu) {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = !menu.classList.contains('hidden');
          
          // Close all other dropdowns
          document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
            if (otherMenu !== menu) {
              otherMenu.classList.add('hidden');
            }
          });
          
          menu.classList.toggle('hidden', isOpen);
        });
      }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.add('hidden');
      });
    });

    // Sticky navigation
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      if (nav) {
        nav.classList.toggle('bg-white/95', window.scrollY > 50);
        nav.classList.toggle('dark:bg-gray-900/95', window.scrollY > 50);
        nav.classList.toggle('backdrop-blur-sm', window.scrollY > 50);
        nav.classList.toggle('shadow-lg', window.scrollY > 50);
      }
    });
  }

  // Animation Management
  initAnimations() {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => {
      const animationType = element.getAttribute('data-animate');
      element.classList.add(`fade-in-${animationType}`);
    });
  }

  initScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    // Parallax effect for hero sections
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  // Interactive Elements
  initInteractiveElements() {
    // Smooth scroll for anchor links
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

    // Form animations and validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Focus effects
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
          if (!input.value) {
            input.parentElement.classList.remove('focused');
          }
        });

        // Real-time validation
        input.addEventListener('input', () => {
          this.validateField(input);
        });
      });
    });

    // Loading states for buttons
    document.querySelectorAll('.btn-loading').forEach(button => {
      button.addEventListener('click', () => {
        button.classList.add('loading');
        setTimeout(() => {
          button.classList.remove('loading');
        }, 2000);
      });
    });

    // Testimonial carousel
    this.initTestimonialCarousel();
  }

  // Active Link Highlighting
  initActiveLinkHighlighting() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Select all navigation links
    const navLinks = document.querySelectorAll('nav a[href]');
    
    navLinks.forEach(link => {
      // Get the href attribute and extract filename
      const href = link.getAttribute('href');
      
      // Skip links without href or external links
      if (!href || href.startsWith('http') || href.startsWith('#')) return;
      
      const linkPage = href.split('/').pop();
      
      // Check if this link matches the current page
      if (linkPage === currentPage) {
        // Add active classes only if it's not a CTA button
        if (!link.classList.contains('btn-primary')) {
          link.classList.add('text-primary', 'font-semibold');
          // Remove inactive classes if they exist
          link.classList.remove('text-gray-700', 'dark:text-gray-300');
        }
      } else {
        // Ensure inactive links have the correct classes only if they don't already have active classes
        // and they're not CTA buttons
        if (!link.classList.contains('text-primary') && !link.classList.contains('btn-primary')) {
          link.classList.add('text-gray-700', 'dark:text-gray-300');
        }
      }
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';

    // Basic validation rules
    if (field.required && !value) {
      isValid = false;
      message = 'This field is required';
    } else if (type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      message = 'Please enter a valid email address';
    } else if (type === 'tel' && value && !this.isValidPhone(value)) {
      isValid = false;
      message = 'Please enter a valid phone number';
    }

    // Update field appearance
    field.classList.toggle('border-red-500', !isValid);
    field.classList.toggle('border-green-500', isValid && value);

    // Show/hide error message
    let errorElement = field.parentElement.querySelector('.error-message');
    if (!isValid && message) {
      if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message text-red-500 text-sm mt-1';
        field.parentElement.appendChild(errorElement);
      }
      errorElement.textContent = message;
    } else if (errorElement) {
      errorElement.remove();
    }
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isValidPhone(phone) {
    return /^[\+]?[\s\-\(\)]?[\d\s\-\(\)]{10,}$/.test(phone);
  }

  initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.testimonial-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const indicators = carousel.querySelector('.carousel-indicators');

    let currentSlide = 0;

    // Create indicators
    if (indicators) {
      slides.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = `w-3 h-3 rounded-full transition-colors ${index === 0 ? 'bg-primary' : 'bg-gray-300'}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
      });
    }

    const updateCarousel = () => {
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
      });

      // Update indicators
      if (indicators) {
        indicators.querySelectorAll('button').forEach((indicator, index) => {
          indicator.className = `w-3 h-3 rounded-full transition-colors ${
            index === currentSlide ? 'bg-primary' : 'bg-gray-300'
          }`;
        });
      }
    };

    const goToSlide = (index) => {
      currentSlide = index;
      updateCarousel();
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    };

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-advance carousel
    setInterval(nextSlide, 5000);
    updateCarousel();
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HarmonyWellApp();
});

// Additional utility functions
const utils = {
  formatCurrency: (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  formatDate: (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  },

  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};