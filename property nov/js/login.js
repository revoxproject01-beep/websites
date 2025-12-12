// Login Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    initPasswordToggle();
    initLoginForm();
    initPremiumTransitions();
});

// Toggle password visibility
function initPasswordToggle() {
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = type === 'password' ? 'fas fa-eye text-gray-400 hover:text-gray-600' : 'fas fa-eye-slash text-gray-400 hover:text-gray-600';
            }
        });
    }
}

// Login form submission
function initLoginForm() {
    const loginForm = document.querySelector('form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            
            if (!email || !password) {
                showNotification('Please complete all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please provide a valid email address', 'error');
                return;
            }
            
            // Simulate login process
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Simulate successful login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                
                showNotification('Authentication successful! Redirecting to your premium dashboard...', 'success');
                
                setTimeout(() => {
                    // Redirect based on user type (you could implement role-based redirection)
                    if (email.includes('admin')) {
                        window.location.href = 'admin-dashboard.html';
                    } else {
                        window.location.href = 'user-dashboard.html';
                    }
                }, 1500);
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Social login simulation
function initSocialLogin() {
    const socialBtns = document.querySelectorAll('button:has(.fab)');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const provider = btn.textContent.trim();
            showNotification(`${provider} login coming soon!`, 'info');
        });
    });
}

// Premium transitions for login page
function initPremiumTransitions() {
    // Add premium hover effects to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.add('transition-premium');
    });
    
    // Add premium card effects to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.classList.add('card-premium');
    });
    
    // Add premium animation to logo
    const logo = document.querySelector('a[href="index.html"]');
    if (logo) {
        logo.classList.add('transform-premium');
    }
}

// Initialize social login
document.addEventListener('DOMContentLoaded', () => {
    initSocialLogin();
});