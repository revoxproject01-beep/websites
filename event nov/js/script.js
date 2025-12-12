// Event Management Website - JavaScript Functionality
// Main JavaScript file for interactive features

class EventWebsite {
  constructor() {
    this.currentDirection = localStorage.getItem('direction') || 'ltr';
    this.mobileMenuOpen = false;
    this.currentSlide = 0;
    
    this.init();
  }

  init() {
    this.applyDirection();
    this.initNavigation();
    this.highlightCurrentPage();
    this.initAnimations();
    this.initCarousels();
    this.initCounters();
    this.initForms();
    this.initDropdowns();
    this.initScrollEffects();
    this.initCountdowns();
    this.initFAQ();
    this.initDashboard();
    this.initStaggeredAnimations();
  }

  // RTL Management
  toggleDirection() {
    this.currentDirection = this.currentDirection === 'ltr' ? 'rtl' : 'ltr';
    localStorage.setItem('direction', this.currentDirection);
    this.applyDirection();
  }

  applyDirection() {
    document.documentElement.setAttribute('dir', this.currentDirection);
  }

  // Navigation
  initNavigation() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const rtlToggle = document.getElementById('rtl-toggle');

    if (mobileMenuToggle && mobileMenu) {
      // Toggle mobile menu
      mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.mobileMenuOpen = !this.mobileMenuOpen;
        mobileMenu.classList.toggle('open', this.mobileMenuOpen);
        
        // Update hamburger icon
        const icon = mobileMenuToggle.querySelector('i');
        if (this.mobileMenuOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        
        // Prevent body scroll when menu is open
        if (this.mobileMenuOpen) {
          document.body.classList.add('mobile-menu-open');
        } else {
          document.body.classList.remove('mobile-menu-open');
        }
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (this.mobileMenuOpen && mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
          this.mobileMenuOpen = false;
          mobileMenu.classList.remove('open');
          const icon = mobileMenuToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
          document.body.classList.remove('mobile-menu-open');
        }
      });
      
      // Close mobile menu when clicking on menu links
      const mobileMenuLinks = mobileMenu.querySelectorAll('a');
      mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.mobileMenuOpen = false;
          mobileMenu.classList.remove('open');
          const icon = mobileMenuToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
          document.body.classList.remove('mobile-menu-open');
        });
      });
      
      // Close mobile menu on window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && this.mobileMenuOpen) {
          this.mobileMenuOpen = false;
          mobileMenu.classList.remove('open');
          const icon = mobileMenuToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
          document.body.classList.remove('mobile-menu-open');
        }
      });
    }

    if (rtlToggle) {
      rtlToggle.addEventListener('click', () => this.toggleDirection());
    }

    // Sticky navbar
    this.initStickyNav();
  }

  // Highlight current page in navigation
  highlightCurrentPage() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove any existing active classes first, but exclude buttons
    const allLinks = document.querySelectorAll('.navbar a:not(.btn-primary), .mobile-menu a:not(.btn-primary)');
    allLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Highlight desktop navigation links
    const desktopLinks = document.querySelectorAll('.navbar a[href]:not(.btn-primary)');
    desktopLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      
      // Handle home pages - only highlight the exact current page
      if (currentPage === 'index.html') {
        // Only highlight index.html links
        if (linkHref && (linkHref === 'index.html' || linkHref === './index.html')) {
          link.classList.add('active');
        }
      } else if (currentPage === 'index2.html') {
        // Only highlight index2.html links
        if (linkHref && (linkHref === 'index2.html' || linkHref === './index2.html')) {
          link.classList.add('active');
        }
      } 
      // Handle dashboard pages
      else if (currentPage === 'user-dashboard.html' || currentPage === 'admin-dashboard.html') {
        // Highlight exact matches
        if (linkHref && (linkHref === currentPage || linkHref === './' + currentPage)) {
          link.classList.add('active');
        }
        // Also highlight the "Dashboard" dropdown parent
        if (link.textContent.trim().includes('Dashboard') && link.closest('.dropdown')) {
          link.classList.add('active');
        }
      }
      // Handle all other pages
      else {
        // Highlight exact matches
        if (linkHref && (linkHref === currentPage || linkHref === './' + currentPage)) {
          link.classList.add('active');
        }
      }
    });
    
    // Highlight mobile navigation links
    const mobileLinks = document.querySelectorAll('.mobile-menu a[href]:not(.btn-primary)');
    mobileLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      // Only highlight the exact current page for home pages
      if ((currentPage === 'index.html' && linkHref && (linkHref === 'index.html' || linkHref === './index.html')) ||
          (currentPage === 'index2.html' && linkHref && (linkHref === 'index2.html' || linkHref === './index2.html')) ||
          (currentPage !== 'index.html' && currentPage !== 'index2.html' && linkHref && (linkHref === currentPage || linkHref === './' + currentPage))) {
        link.classList.add('active');
      }
    });
    
    // Also highlight any links that match the current page in dropdown menus, but exclude buttons
    const allNavLinks = document.querySelectorAll('.navbar a, .mobile-menu a');
    allNavLinks.forEach(link => {
      // Skip buttons
      if (link.classList.contains('btn-primary') || link.classList.contains('btn-secondary')) {
        return;
      }
      
      const linkHref = link.getAttribute('href');
      if (linkHref && (linkHref === currentPage || linkHref === './' + currentPage)) {
        link.classList.add('active');
      }
    });
  }

  initStickyNav() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navbar.style.transform = currentScrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Dropdown Management
  initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const content = dropdown.querySelector('.dropdown-content');
      
      if (content) {
        // Position dropdowns correctly on hover
        dropdown.addEventListener('mouseenter', () => {
          // Get dropdown position relative to viewport
          const rect = dropdown.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const contentWidth = content.offsetWidth || 200; // Default to 200px if not yet rendered
          
          // Reset positioning classes
          content.classList.remove('right-aligned');
          
          // If dropdown would go off the right edge, align it to the right
          if (rect.left + contentWidth > viewportWidth) {
            content.classList.add('right-aligned');
          }
          
          // Show dropdown
          content.style.opacity = '1';
          content.style.visibility = 'visible';
          content.style.transform = 'translateY(0)';
        });

        dropdown.addEventListener('mouseleave', () => {
          content.style.opacity = '0';
          content.style.visibility = 'hidden';
          content.style.transform = 'translateY(-10px)';
        });
      }
    });
  }

  // Animation on Scroll
  initAnimations() {
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

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    animatedElements.forEach(el => observer.observe(el));
  }

  // Staggered Animations
  initStaggeredAnimations() {
    const staggeredElements = document.querySelectorAll('.staggered-animation');
    
    if (staggeredElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add delay based on index
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, index * 100); // 100ms delay between each element
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      staggeredElements.forEach(el => observer.observe(el));
    }
  }

  // Carousel Management
  initCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
      const track = carousel.querySelector('.carousel-track');
      const slides = carousel.querySelectorAll('.carousel-slide');
      const prevBtn = carousel.querySelector('.carousel-prev');
      const nextBtn = carousel.querySelector('.carousel-next');
      
      if (!track || slides.length === 0) return;

      let currentSlide = 0;
      const totalSlides = slides.length;

      const updateCarousel = () => {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
      };

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
          updateCarousel();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
          updateCarousel();
        });
      }

      // Auto-play carousel
      setInterval(() => {
        currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
        updateCarousel();
      }, 5000);
    });
  }

  // Counter Animation
  initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Form Validation
  initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validateForm(form);
      });
    });

    // Password toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const input = toggle.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        toggle.textContent = type === 'password' ? '👁️' : '🙈';
      });
    });
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      const value = input.value.trim();
      const errorElement = input.nextElementSibling;

      // Remove existing error styling
      input.classList.remove('border-red-500');
      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
      }

      // Validate email
      if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          this.showFieldError(input, 'Please enter a valid email address');
          isValid = false;
        }
      }

      // Check required fields
      if (!value) {
        this.showFieldError(input, 'This field is required');
        isValid = false;
      }
    });

    if (isValid) {
      this.showSuccessMessage(form);
    }
  }

  showFieldError(input, message) {
    input.classList.add('border-red-500');
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
    errorElement.textContent = message;
    input.parentNode.insertBefore(errorElement, input.nextSibling);
  }

  showSuccessMessage(form) {
    const message = document.createElement('div');
    message.classList.add('bg-green-100', 'border', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'mt-4', 'animate-fadeInUp');
    message.textContent = 'Form submitted successfully!';
    form.appendChild(message);

    setTimeout(() => message.remove(), 3000);
  }

  // Scroll Effects
  initScrollEffects() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Countdown Timer
  initCountdowns() {
    const countdowns = document.querySelectorAll('.countdown');
    
    countdowns.forEach(countdown => {
      const targetDate = new Date(countdown.getAttribute('data-date')).getTime();
      
      const updateCountdown = () => {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft > 0) {
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

          const daysEl = countdown.querySelector('.days');
          const hoursEl = countdown.querySelector('.hours');
          const minutesEl = countdown.querySelector('.minutes');
          const secondsEl = countdown.querySelector('.seconds');

          if (daysEl) daysEl.textContent = days;
          if (hoursEl) hoursEl.textContent = hours;
          if (minutesEl) minutesEl.textContent = minutes;
          if (secondsEl) secondsEl.textContent = seconds;
        } else {
          countdown.innerHTML = '<p class="text-xl font-semibold">Event has started!</p>';
        }
      };

      updateCountdown();
      setInterval(updateCountdown, 1000);
    });
  }

  // FAQ Accordion
  initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      question.addEventListener('click', () => {
        const isOpen = answer.classList.contains('open');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.querySelector('.faq-answer').classList.remove('open');
            otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
          }
        });
        
        // Toggle current item
        answer.classList.toggle('open', !isOpen);
        const icon = question.querySelector('.faq-icon');
        icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    });
  }

  // Dashboard Sidebar
  initDashboard() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
      // Update the icon when toggling sidebar
      const updateIcon = () => {
        const icon = sidebarToggle.querySelector('i');
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        
        if (window.innerWidth < 1024) {
          // Mobile view - check if sidebar is visible
          const isVisible = isRTL ? 
            !sidebar.classList.contains('translate-x-full') : 
            !sidebar.classList.contains('-translate-x-full');
            
          if (icon) {
            if (isVisible) {
              icon.classList.remove('fa-bars');
              icon.classList.add('fa-times');
            } else {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
            }
          }
        } else {
          // Desktop view - always show bars icon
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      };
      
      sidebarToggle.addEventListener('click', () => {
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        
        // Toggle sidebar for mobile
        if (window.innerWidth < 1024) {
          if (isRTL) {
            // In RTL mode, toggle translate-x-full class for right-side sliding
            sidebar.classList.toggle('translate-x-full');
          } else {
            // In LTR mode, toggle -translate-x-full class for left-side sliding
            sidebar.classList.toggle('-translate-x-full');
          }
        } else {
          sidebar.classList.toggle('collapsed');
        }
        
        // Update icon after toggle
        updateIcon();
      });
      
      // Update icon on window resize
      window.addEventListener('resize', updateIcon);
      
      // Initialize icon state
      updateIcon();
    }
    
    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', (e) => {
      const sidebar = document.getElementById('sidebar');
      const sidebarToggle = document.getElementById('sidebar-toggle');
      
      if (window.innerWidth < 1024 && sidebar && !sidebar.contains(e.target) && 
          sidebarToggle && !sidebarToggle.contains(e.target)) {
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        
        if (isRTL) {
          sidebar.classList.add('translate-x-full');
        } else {
          sidebar.classList.add('-translate-x-full');
        }
        
        // Update icon
        const icon = sidebarToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
    
    // Handle RTL direction changes
    const rtlToggle = document.getElementById('rtl-toggle');
    if (rtlToggle) {
      rtlToggle.addEventListener('click', () => {
        // Update sidebar positioning after RTL toggle
        setTimeout(() => {
          const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
          const sidebar = document.getElementById('sidebar');
          const sidebarToggle = document.getElementById('sidebar-toggle');
          
          if (window.innerWidth < 1024 && sidebar) {
            // Reset sidebar transforms based on new direction
            sidebar.classList.remove('-translate-x-full', 'translate-x-full');
            
            // In RTL mode, sidebar should be hidden by default (translate-x-full)
            // In LTR mode, sidebar should be hidden by default (-translate-x-full)
            if (isRTL) {
              sidebar.classList.add('translate-x-full');
            } else {
              sidebar.classList.add('-translate-x-full');
            }
            
            // Update icon to show bars (since sidebar is now hidden)
            const icon = sidebarToggle.querySelector('i');
            if (icon) {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
            }
          }
        }, 50);
      });
    }
    
    // Handle sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        sidebarLinks.forEach(l => {
          l.classList.remove('active', 'text-indigo-600', 'bg-indigo-50', 'dark:bg-indigo-900/20');
          l.classList.add('text-gray-700', 'dark:text-gray-300');
        });
        
        // Add active class to clicked link
        link.classList.add('active', 'text-indigo-600', 'bg-indigo-50', 'dark:bg-indigo-900/20');
        link.classList.remove('text-gray-700', 'dark:text-gray-300');
        
        // Close sidebar on mobile after clicking a link
        if (window.innerWidth < 1024) {
          const sidebar = document.getElementById('sidebar');
          const sidebarToggle = document.getElementById('sidebar-toggle');
          const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
          
          if (isRTL) {
            sidebar.classList.add('translate-x-full');
          } else {
            sidebar.classList.add('-translate-x-full');
          }
          
          // Update icon
          const icon = sidebarToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      });
    });
  }

  // Chart Generation (Simple implementation)
  generateChart(canvasId, data, type = 'bar') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Simple bar chart implementation
    if (type === 'bar') {
      const maxValue = Math.max(...data.values);
      const barWidth = width / data.values.length;
      
      data.values.forEach((value, index) => {
        const barHeight = (value / maxValue) * (height - 50);
        const x = index * barWidth;
        const y = height - barHeight - 25;
        
        // Draw bar
        ctx.fillStyle = '#6366f1';
        ctx.fillRect(x + 10, y, barWidth - 20, barHeight);
        
        // Draw label
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(data.labels[index], x + barWidth/2, height - 5);
        ctx.fillText(value, x + barWidth/2, y - 5);
      });
    }
  }

  // Loading Animation
  showLoading(element) {
    const spinner = document.createElement('div');
    spinner.classList.add('loading-spinner');
    element.appendChild(spinner);
  }

  hideLoading(element) {
    const spinner = element.querySelector('.loading-spinner');
    if (spinner) {
      spinner.remove();
    }
  }
}

// Initialize the website functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const website = new EventWebsite();
  
  // Make website instance globally available
  window.eventWebsite = website;
  
  // Initialize schedule tabs if on schedule page
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length > 0) {
    const scheduleDays = document.querySelectorAll('.schedule-day');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and days
        tabBtns.forEach(b => b.classList.remove('active'));
        scheduleDays.forEach(day => day.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding day
        const dayId = btn.getAttribute('data-day');
        const targetDay = document.getElementById(dayId);
        if (targetDay) {
          targetDay.classList.add('active');
        }
      });
    });
  }
  
  // Ensure navigation highlighting is applied
  setTimeout(() => {
    if (website && typeof website.highlightCurrentPage === 'function') {
      website.highlightCurrentPage();
    }
  }, 100);
});

// Also initialize on page show event (for back/forward navigation)
window.addEventListener('pageshow', () => {
  setTimeout(() => {
    if (window.eventWebsite && typeof window.eventWebsite.highlightCurrentPage === 'function') {
      window.eventWebsite.highlightCurrentPage();
    }
  }, 100);
});

// Utility Functions
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatTime(time) {
  return new Date(`2000-01-01 ${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EventWebsite;
}

// Add a global function to refresh navigation highlighting
function refreshNavigationHighlight() {
  if (window.eventWebsite && typeof window.eventWebsite.highlightCurrentPage === 'function') {
    window.eventWebsite.highlightCurrentPage();
  }
}
