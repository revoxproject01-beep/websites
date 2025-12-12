// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            body.classList.toggle('mobile-menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.contains(event.target) && 
            mobileMenuButton && !mobileMenuButton.contains(event.target) && 
            !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            body.classList.remove('mobile-menu-open');
        }
    });
    
    // Process Tabs Functionality
    const processTabs = document.querySelectorAll('.process-tab');
    const processContents = document.querySelectorAll('.process-content');
    
    if (processTabs.length > 0 && processContents.length > 0) {
        processTabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and contents
                processTabs.forEach(t => {
                    t.classList.remove('bg-indigo-600', 'text-white');
                    t.classList.add('bg-gray-100', 'text-gray-700');
                });
                
                processContents.forEach(c => c.classList.add('hidden'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.remove('bg-gray-100', 'text-gray-700');
                this.classList.add('bg-indigo-600', 'text-white');
                
                processContents[index].classList.remove('hidden');
            });
        });
    }
    
    // RTL Toggle - Only for pages other than login.html
    // Login page has its own RTL toggle implementation
    if (!window.location.pathname.includes('login.html')) {
        const rtlToggle = document.getElementById('rtl-toggle');
        const mobileRtlToggle = document.getElementById('mobile-rtl-toggle');
        
        // Check for saved RTL preference
        const isRTL = localStorage.getItem('rtl') === 'true';
        if (isRTL) {
            document.documentElement.setAttribute('dir', 'rtl');
        }
        
        // Toggle RTL function
        function toggleRTL() {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            document.documentElement.setAttribute('dir', isRTL ? 'ltr' : 'rtl');
            localStorage.setItem('rtl', !isRTL);
        }
        
        if (rtlToggle) {
            rtlToggle.addEventListener('click', toggleRTL);
        }
        
        if (mobileRtlToggle) {
            mobileRtlToggle.addEventListener('click', toggleRTL);
        }
    }
    
    // Scroll Animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.scroll-animate');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check
    animateOnScroll();
    
    // Dashboard Sidebar Toggle (for mobile)
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.add('slide-in');
            document.addEventListener('click', closeSidebarOnClickOutside);
        });
    }
    
    if (closeSidebar && sidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('slide-in');
            document.removeEventListener('click', closeSidebarOnClickOutside);
        });
    }
    
    function closeSidebarOnClickOutside(event) {
        if (sidebar && !sidebar.contains(event.target) && 
            sidebarToggle && !sidebarToggle.contains(event.target) && 
            sidebar.classList.contains('slide-in')) {
            sidebar.classList.remove('slide-in');
            document.removeEventListener('click', closeSidebarOnClickOutside);
        }
    }
    
    // Close sidebar on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && sidebar && sidebar.classList.contains('slide-in')) {
            sidebar.classList.remove('slide-in');
            document.removeEventListener('click', closeSidebarOnClickOutside);
        }
    });
    
    // Chart.js Initialization (for dashboard pages)
    const ctx = document.getElementById('stats-chart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Cases Handled',
                    data: [12, 19, 15, 17, 22, 25],
                    borderColor: '#DC2626',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Radar Chart for User Dashboard
    const radarCtx = document.getElementById('radar-chart');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Legal Knowledge', 'Communication', 'Experience', 'Ethics', 'Efficiency', 'Client Satisfaction'],
                datasets: [{
                    label: 'Performance Metrics',
                    data: [85, 92, 78, 95, 88, 90],
                    borderColor: '#DC2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.2)',
                    pointBackgroundColor: '#6366F1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            color: '#1F2937'
                        }
                    }
                }
            }
        });
    }
    
    // Countdown Timer (for coming soon page and user dashboard)
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        // Set the date we're counting down to (30 days from now)
        const countDownDate = new Date();
        countDownDate.setDate(countDownDate.getDate() + 30);
        
        const updateCountdown = function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            countdownElement.innerHTML = `
                <div class="flex justify-center space-x-4 md:space-x-8 rtl:space-x-reverse">
                    <div class="text-center">
                        <div class="countdown-value">${days}</div>
                        <div class="mt-2">Days</div>
                    </div>
                    <div class="text-center">
                        <div class="countdown-value">${hours}</div>
                        <div class="mt-2">Hours</div>
                    </div>
                    <div class="text-center">
                        <div class="countdown-value">${minutes}</div>
                        <div class="mt-2">Minutes</div>
                    </div>
                    <div class="text-center">
                        <div class="countdown-value">${seconds}</div>
                        <div class="mt-2">Seconds</div>
                    </div>
                </div>
            `;
            
            // If the count down is finished
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = "EXPIindigo";
            }
        };
        
        // Update the count down every 1 second
        const countdownInterval = setInterval(updateCountdown, 1000);
        // Initial call
        updateCountdown();
    }
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // In a real application, you would send the form data to a server here
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Login Form Validation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (username && password) {
                // In a real application, you would authenticate the user here
                alert('Login successful!');
                loginForm.reset();
                // indigoirect to dashboard or home page
                window.location.href = 'user-dashboard.html';
            } else {
                alert('Please enter both username and password.');
            }
        });
    }
    
    // Image Hover Effects
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(container => {
        const img = container.querySelector('img');
        if (img) {
            container.addEventListener('mouseenter', function() {
                img.style.transform = 'scale(1.05)';
            });
            
            container.addEventListener('mouseleave', function() {
                img.style.transform = 'scale(1)';
            });
        }
    });

    // Card Hover Effects
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Enhanced team member card effects
    const teamMemberCards = document.querySelectorAll('.team-member-card');
    teamMemberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 20px 25px -5px rgba(79, 70, 229, 0.1), 0 10px 10px -5px rgba(79, 70, 229, 0.04)';
        });
    });

    // Dropdown Menu Functionality - Click only for both desktop and mobile
    const dropdowns = document.querySelectorAll('.group');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('button');
        const desktopContent = dropdown.querySelector('.dropdown-content');
        const mobileContent = dropdown.querySelector('.mobile-dropdown');
        
        // Ensure all dropdowns are hidden on page load
        if (desktopContent) {
            desktopContent.classList.add('hidden');
        }
        if (mobileContent) {
            mobileContent.classList.add('hidden');
        }
        
        if (trigger) {
            // Toggle dropdown on click for both desktop and mobile
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle desktop dropdown
                if (desktopContent) {
                    desktopContent.classList.toggle('hidden');
                }
                
                // Toggle mobile dropdown
                if (mobileContent) {
                    mobileContent.classList.toggle('hidden');
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('button');
            const desktopContent = dropdown.querySelector('.dropdown-content');
            const mobileContent = dropdown.querySelector('.mobile-dropdown');
            
            if (!dropdown.contains(event.target)) {
                // Close desktop dropdown
                if (desktopContent) {
                    desktopContent.classList.add('hidden');
                }
                
                // Close mobile dropdown
                if (mobileContent) {
                    mobileContent.classList.add('hidden');
                }
            }
        });
    });

    // Ensure proper z-index for navbar and sidebar
    const navbar = document.querySelector('nav');

    if (navbar) {
        navbar.style.zIndex = '30';
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
    }

    // Sidebar z-index is handled in HTML and CSS
    // The sidebar already has pt-16 class to ensure it starts below navbar

    // Add scroll animation for team member cards
    const animateTeamCardsOnScroll = function() {
        const elements = document.querySelectorAll('.team-member-card');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateTeamCardsOnScroll);
    // Initial check
    animateTeamCardsOnScroll();
    
    // Initialize particle systems for each section
    initializeSectionParticles();
});

// Function to initialize particle systems for each section
function initializeSectionParticles() {
    // Create separate particle configurations for each section
    
    // Services section particles
    const servicesParticles = document.getElementById('services-particles');
    if (servicesParticles) {
        const servicesCanvas = document.createElement('canvas');
        servicesCanvas.style.position = 'absolute';
        servicesCanvas.style.top = '0';
        servicesCanvas.style.left = '0';
        servicesCanvas.style.width = '100%';
        servicesCanvas.style.height = '100%';
        servicesParticles.appendChild(servicesCanvas);
        createSectionParticles(servicesCanvas, '#6366F1', 15, 0.3);
    }
    
    // About section particles
    const aboutParticles = document.getElementById('about-particles');
    if (aboutParticles) {
        const aboutCanvas = document.createElement('canvas');
        aboutCanvas.style.position = 'absolute';
        aboutCanvas.style.top = '0';
        aboutCanvas.style.left = '0';
        aboutCanvas.style.width = '100%';
        aboutCanvas.style.height = '100%';
        aboutParticles.appendChild(aboutCanvas);
        createSectionParticles(aboutCanvas, '#8B5CF6', 20, 0.4);
    }
    
    // Why Choose section particles
    const whyChooseParticles = document.getElementById('why-choose-particles');
    if (whyChooseParticles) {
        const whyChooseCanvas = document.createElement('canvas');
        whyChooseCanvas.style.position = 'absolute';
        whyChooseCanvas.style.top = '0';
        whyChooseCanvas.style.left = '0';
        whyChooseCanvas.style.width = '100%';
        whyChooseCanvas.style.height = '100%';
        whyChooseParticles.appendChild(whyChooseCanvas);
        createSectionParticles(whyChooseCanvas, '#A5B4FC', 12, 0.25);
    }
    
    // Success Stories section particles
    const successStoriesParticles = document.getElementById('success-stories-particles');
    if (successStoriesParticles) {
        const successStoriesCanvas = document.createElement('canvas');
        successStoriesCanvas.style.position = 'absolute';
        successStoriesCanvas.style.top = '0';
        successStoriesCanvas.style.left = '0';
        successStoriesCanvas.style.width = '100%';
        successStoriesCanvas.style.height = '100%';
        successStoriesParticles.appendChild(successStoriesCanvas);
        createSectionParticles(successStoriesCanvas, '#6366F1', 16, 0.35);
    }
    
    // Projects section particles
    const projectsParticles = document.getElementById('projects-particles');
    if (projectsParticles) {
        const projectsCanvas = document.createElement('canvas');
        projectsCanvas.style.position = 'absolute';
        projectsCanvas.style.top = '0';
        projectsCanvas.style.left = '0';
        projectsCanvas.style.width = '100%';
        projectsCanvas.style.height = '100%';
        projectsParticles.appendChild(projectsCanvas);
        createSectionParticles(projectsCanvas, '#6366F1', 18, 0.35);
    }
    
    // Testimonials section particles
    const testimonialsParticles = document.getElementById('testimonials-particles');
    if (testimonialsParticles) {
        const testimonialsCanvas = document.createElement('canvas');
        testimonialsCanvas.style.position = 'absolute';
        testimonialsCanvas.style.top = '0';
        testimonialsCanvas.style.left = '0';
        testimonialsCanvas.style.width = '100%';
        testimonialsCanvas.style.height = '100%';
        testimonialsParticles.appendChild(testimonialsCanvas);
        createSectionParticles(testimonialsCanvas, '#8B5CF6', 10, 0.2);
    }
    
    // Pricing section particles
    const pricingParticles = document.getElementById('pricing-particles');
    if (pricingParticles) {
        const pricingCanvas = document.createElement('canvas');
        pricingCanvas.style.position = 'absolute';
        pricingCanvas.style.top = '0';
        pricingCanvas.style.left = '0';
        pricingCanvas.style.width = '100%';
        pricingCanvas.style.height = '100%';
        pricingParticles.appendChild(pricingCanvas);
        createSectionParticles(pricingCanvas, '#A5B4FC', 22, 0.4);
    }
    
    // Blog section particles
    const blogParticles = document.getElementById('blog-particles');
    if (blogParticles) {
        const blogCanvas = document.createElement('canvas');
        blogCanvas.style.position = 'absolute';
        blogCanvas.style.top = '0';
        blogCanvas.style.left = '0';
        blogCanvas.style.width = '100%';
        blogCanvas.style.height = '100%';
        blogParticles.appendChild(blogCanvas);
        createSectionParticles(blogCanvas, '#6366F1', 14, 0.3);
    }
    
    // CTA section particles
    const ctaParticles = document.getElementById('cta-particles');
    if (ctaParticles) {
        const ctaCanvas = document.createElement('canvas');
        ctaCanvas.style.position = 'absolute';
        ctaCanvas.style.top = '0';
        ctaCanvas.style.left = '0';
        ctaCanvas.style.width = '100%';
        ctaCanvas.style.height = '100%';
        ctaParticles.appendChild(ctaCanvas);
        createSectionParticles(ctaCanvas, '#FFFFFF', 25, 0.5);
    }
}

// Function to create floating particles for a specific section
function createSectionParticles(canvas, color, count, opacity) {
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    // Initial resize
    resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    const particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 0.5 + 0.1,
            angle: Math.random() * Math.PI * 2,
            opacity: Math.random() * opacity + 0.1
        });
    }
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            // Move particle
            particle.y -= particle.speed;
            particle.x += Math.sin(particle.angle) * 0.3;
            
            // Reset particle position if it goes off screen
            if (particle.y < -10) {
                particle.y = canvas.height + 10;
                particle.x = Math.random() * canvas.width;
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
        });
        
        ctx.globalAlpha = 1;
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
}

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Highlight current page in navigation
function highlightCurrentPage() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('nav a[href]');
    
    // Highlight matching link
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('text-indigo-600', 'font-medium');
        }
    });
}

// Process Tab Functionality for Services Page
function initProcessTabs() {
    const processTabs = document.querySelectorAll('.process-tab');
    const processContents = document.querySelectorAll('.process-content');
    
    if (processTabs.length > 0 && processContents.length > 0) {
        processTabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                processTabs.forEach(t => {
                    t.classList.remove('bg-gradient-to-r', 'from-indigo-600', 'to-purple-700', 'text-white');
                    t.classList.add('bg-gray-100', 'text-gray-700');
                });
                
                // Add active class to clicked tab
                this.classList.remove('bg-gray-100', 'text-gray-700');
                this.classList.add('bg-gradient-to-r', 'from-indigo-600', 'to-purple-700', 'text-white');
                
                // Hide all content sections
                processContents.forEach(content => {
                    content.classList.add('hidden');
                    content.classList.remove('active');
                });
                
                // Show corresponding content section
                processContents[index].classList.remove('hidden');
                processContents[index].classList.add('active');
            });
        });
    }
}

// Run highlight function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    highlightCurrentPage();
    initProcessTabs();
});