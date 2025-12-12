// Coming Soon Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initEmailSignup();
});

// Countdown Timer
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    // Set launch date (30 days from now for demo)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = launchDate.getTime() - now;
        
        if (timeLeft < 0) {
            // Launch date reached
            daysEl.textContent = '0';
            hoursEl.textContent = '0';
            minutesEl.textContent = '0';
            secondsEl.textContent = '0';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Add animation effect when numbers change
        updateNumberWithAnimation(daysEl, days);
        updateNumberWithAnimation(hoursEl, hours);
        updateNumberWithAnimation(minutesEl, minutes);
        updateNumberWithAnimation(secondsEl, seconds);
    }
    
    // Update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Animate number changes
function updateNumberWithAnimation(element, newValue) {
    const currentValue = parseInt(element.textContent);
    
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#FACC15'; // Secondary color
        
        setTimeout(() => {
            element.textContent = newValue.toString().padStart(2, '0');
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 150);
    }
}

// Email signup functionality
function initEmailSignup() {
    const signupForm = document.querySelector('form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = signupForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Check if already signed up
            const signedUpEmails = JSON.parse(localStorage.getItem('signedUpEmails') || '[]');
            if (signedUpEmails.includes(email)) {
                showNotification('You\'re already signed up for notifications!', 'info');
                return;
            }
            
            // Simulate signup process
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Save email to localStorage
                signedUpEmails.push(email);
                localStorage.setItem('signedUpEmails', JSON.stringify(signedUpEmails));
                
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                showNotification('Thank you! You\'ll be notified when we launch.', 'success');
                emailInput.value = '';
                
                // Update button text
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Subscribed!';
                submitBtn.classList.remove('bg-primary', 'hover:bg-blue-600');
                submitBtn.classList.add('bg-blue-500');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.add('bg-primary', 'hover:bg-blue-600');
                    submitBtn.classList.remove('bg-blue-500');
                }, 3000);
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Social media click tracking
function initSocialTracking() {
    const socialLinks = document.querySelectorAll('a[href="#"]');
    
    socialLinks.forEach(link => {
        if (link.querySelector('.fab')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = link.querySelector('.fab').className.split('-')[1];
                showNotification(`Follow us on ${platform} for updates!`, 'info');
            });
        }
    });
}

// Background animation (optional enhancement)
function initBackgroundAnimation() {
    const body = document.body;
    
    // Add subtle background animation
    let animationFrame;
    let time = 0;
    
    function animate() {
        time += 0.01;
        const gradient = `linear-gradient(${45 + Math.sin(time) * 10}deg, #16A34A, #15803d)`;
        body.style.background = gradient;
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    // Start animation only if user prefers reduced motion is not set
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animate();
    }
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    initSocialTracking();
    initBackgroundAnimation();
});