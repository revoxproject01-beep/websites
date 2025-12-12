// Global variables
let currentTheme = localStorage.getItem('theme') || 'light';
let currentDirection = localStorage.getItem('direction') || 'ltr';

// Initialize theme and direction
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeDirection();
    initializeMobileMenu();
    initializeAnimations();
    initializeFormValidation();
});

// Theme Management
function initializeTheme() {
    const html = document.documentElement;
    const darkToggle = document.getElementById('dark-toggle');
    
    if (currentTheme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    if (darkToggle) {
        darkToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const html = document.documentElement;
    
    if (currentTheme === 'light') {
        html.classList.add('dark');
        currentTheme = 'dark';
    } else {
        html.classList.remove('dark');
        currentTheme = 'light';
    }
    
    localStorage.setItem('theme', currentTheme);
}

// RTL/LTR Direction Management
function initializeDirection() {
    const html = document.documentElement;
    const body = document.body;
    const rtlToggle = document.getElementById('rtl-toggle');
    
    html.setAttribute('dir', currentDirection);
    body.setAttribute('dir', currentDirection);
    
    if (rtlToggle) {
        rtlToggle.addEventListener('click', toggleDirection);
    }
}

function toggleDirection() {
    const html = document.documentElement;
    const body = document.body;
    
    if (currentDirection === 'ltr') {
        currentDirection = 'rtl';
    } else {
        currentDirection = 'ltr';
    }
    
    html.setAttribute('dir', currentDirection);
    body.setAttribute('dir', currentDirection);
    localStorage.setItem('direction', currentDirection);
    
    // Animate the transition
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

// Mobile Menu Management
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
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

// Animation Observers
function initializeAnimations() {
    // Fade in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Parallax effect for hero images
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Form Validation
function initializeFormValidation() {
    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const firstName = this.querySelector('#firstName').value;
            const lastName = this.querySelector('#lastName').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            if (!firstName || !lastName || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
    
    // Set notification style based on type
    if (type === 'success') {
        notification.className += ' bg-green-500 text-white';
        notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
    } else if (type === 'error') {
        notification.className += ' bg-red-500 text-white';
        notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
    } else {
        notification.className += ' bg-blue-500 text-white';
        notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Loading states
function setLoadingState(element, isLoading) {
    if (isLoading) {
        element.disabled = true;
        element.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
    } else {
        element.disabled = false;
        element.innerHTML = element.dataset.originalText || 'Submit';
    }
}

// Smooth reveal animations
function addRevealAnimation() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15
    });
    
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', addRevealAnimation);

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (navbar && !navbar.classList.contains('fixed')) {
        if (window.scrollY > 100) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    }
});

// Button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Preloader (if needed)
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    hidePreloader();
    initializeSmoothScrolling();
    
    // Add animation delays to elements
    const delayElements = document.querySelectorAll('.animate-fade-in-delay');
    delayElements.forEach((element, index) => {
        element.style.animationDelay = `${(index + 1) * 0.2}s`;
    });
});

// Performance optimization - lazy load images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker Registration (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Testimonial slider functionality
function initializeTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;

  if (slides.length === 0) return;

  // Show first slide
  slides[0].classList.add('active');
  if (dots.length > 0) dots[0].classList.add('active');

  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    
    currentSlide = index;
  }

  // Auto slide change
  setInterval(() => {
    const nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
  }, 5000);

  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });
}

// Newsletter form submission
function initializeNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('.newsletter-input');
    const email = emailInput.value.trim();

    if (!email) {
      showNotification('Please enter your email address', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector('.newsletter-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showNotification('Thank you for subscribing to our newsletter!', 'success');
      emailInput.value = '';
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Stats counter animation
function initializeStatsCounter() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.innerText = Math.ceil(current);
            setTimeout(updateCounter, 20);
          } else {
            counter.innerText = target;
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Back to top button
function initializeBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');
  if (!backToTopButton) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize all new features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeTestimonialSlider();
  initializeNewsletterForm();
  initializeStatsCounter();
  initializeBackToTop();
});

// SEO Score Calculator
function initializeSEOScoreCalculator() {
  const calculatorForm = document.querySelector('.calculator-form');
  if (!calculatorForm) return;

  calculatorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const domain = document.getElementById('domain').value;
    const keywords = document.getElementById('keywords').value;
    const traffic = document.getElementById('traffic').value;
    const backlinks = document.getElementById('backlinks').value;
    
    if (!domain) {
      showNotification('Please enter your domain', 'error');
      return;
    }
    
    // Calculate SEO score (simplified algorithm)
    let score = 0;
    score += Math.min(keywords.length * 2, 30);
    score += Math.min(traffic / 100, 20);
    score += Math.min(backlinks / 10, 50);
    
    // Ensure score is between 0 and 100
    score = Math.min(Math.max(score, 0), 100);
    
    // Display result
    const resultElement = document.querySelector('.seo-score-result');
    const scoreElement = document.querySelector('.score-inner');
    const scoreCircle = document.querySelector('.score-circle');
    
    scoreElement.textContent = Math.round(score);
    
    // Update circle color based on score
    let color;
    if (score >= 80) {
      color = '#2ECC71'; // Green
    } else if (score >= 60) {
      color = '#F1C40F'; // Yellow
    } else {
      color = '#E74C3C'; // Red
    }
    
    scoreCircle.style.background = `conic-gradient(${color} ${score * 3.6}deg, rgba(255, 255, 255, 0.1) 0)`;
    
    // Update description based on score
    const descriptionElement = document.querySelector('.score-description');
    if (score >= 80) {
      descriptionElement.textContent = 'Excellent! Your website has strong SEO fundamentals.';
    } else if (score >= 60) {
      descriptionElement.textContent = 'Good foundation, but there\'s room for improvement.';
    } else {
      descriptionElement.textContent = 'Needs significant SEO improvements to rank well.';
    }
    
    // Show result
    resultElement.style.display = 'block';
    
    // Scroll to result
    resultElement.scrollIntoView({ behavior: 'smooth' });
  });
}

// Interactive FAQ
function initializeInteractiveFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
}

// SEO Tips Carousel
function initializeSEOTipsCarousel() {
  const tipSlides = document.querySelectorAll('.tip-slide');
  const prevBtn = document.querySelector('.tip-prev');
  const nextBtn = document.querySelector('.tip-next');
  
  if (tipSlides.length === 0 || !prevBtn || !nextBtn) return;
  
  let currentTip = 0;
  
  // Show first tip
  tipSlides[0].style.display = 'block';
  
  function showTip(index) {
    tipSlides.forEach(slide => slide.style.display = 'none');
    tipSlides[index].style.display = 'block';
    currentTip = index;
  }
  
  prevBtn.addEventListener('click', () => {
    const newIndex = currentTip === 0 ? tipSlides.length - 1 : currentTip - 1;
    showTip(newIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    const newIndex = currentTip === tipSlides.length - 1 ? 0 : currentTip + 1;
    showTip(newIndex);
  });
}

// Progress Steps
function initializeProgressSteps() {
  const steps = document.querySelectorAll('.step');
  if (steps.length === 0) return;
  
  // Activate first step
  steps[0].classList.add('active');
  
  // Simulate progress (in a real app, this would be based on user actions)
  let currentStep = 0;
  const progressBar = document.querySelector('.progress-bar');
  
  function updateProgress() {
    if (currentStep < steps.length) {
      steps[currentStep].classList.add('completed');
      steps[currentStep].classList.remove('active');
      
      if (currentStep + 1 < steps.length) {
        steps[currentStep + 1].classList.add('active');
      }
      
      if (progressBar) {
        const percentage = ((currentStep + 1) / steps.length) * 100;
        progressBar.style.width = `${percentage}%`;
      }
      
      currentStep++;
      
      if (currentStep < steps.length) {
        setTimeout(updateProgress, 3000);
      }
    }
  }
  
  // Start progress after 2 seconds
  setTimeout(updateProgress, 2000);
}

// Dark mode toggle
function initializeDarkModeToggle() {
  const toggleBtn = document.querySelector('.dark-mode-toggle');
  if (!toggleBtn) return;
  
  toggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update button icon
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
  });
  
  // Set initial icon based on current theme
  const isDark = document.documentElement.classList.contains('dark');
  const icon = toggleBtn.querySelector('i') || document.createElement('i');
  icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  if (!toggleBtn.querySelector('i')) {
    toggleBtn.appendChild(icon);
  }
}

// Initialize all new features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeSEOScoreCalculator();
  initializeInteractiveFAQ();
  initializeSEOTipsCarousel();
  initializeProgressSteps();
  initializeDarkModeToggle();
});
