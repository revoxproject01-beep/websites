// Login Page JavaScript for Apex Solutions

document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            const eyeIcon = this.querySelector('i');
            if (type === 'password') {
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            } else {
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            }
        });
    }
    
    // Form submission handlers
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Simple validation
            if (!email || !password) {
                showAlert('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate login process
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Signing in...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showAlert('Login successful! Redirecting...', 'success');
                
                // Simulate redirect
                setTimeout(() => {
                    window.location.href = 'user-dashboard.html';
                }, 1500);
            }, 2000);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelectorAll('input[type="email"]')[0].value;
            const password = this.querySelectorAll('input[type="password"]')[0].value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
            
            // Simple validation
            if (!name || !email || !password || !confirmPassword) {
                showAlert('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // Password validation
            if (password.length < 6) {
                showAlert('Password must be at least 6 characters long.', 'error');
                return;
            }
            
            // Confirm password match
            if (password !== confirmPassword) {
                showAlert('Passwords do not match.', 'error');
                return;
            }
            
            // Simulate registration process
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Creating account...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showAlert('Account created successfully! Redirecting to login...', 'success');
                
                // Simulate redirect
                setTimeout(() => {
                    document.getElementById("showLogin").click();
                }, 1500);
            }, 2000);
        });
    }
    
    // Alert function with animations
    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.login-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `login-alert fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
        }`;
        alert.innerHTML = `
            <div class="flex items-center">
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(alert);
        
        // Animate in
        alert.style.opacity = '0';
        alert.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            alert.style.opacity = '1';
            alert.style.transform = 'translateX(0)';
        }, 10);
        
        // Add close button functionality
        const closeBtn = alert.querySelector('button');
        closeBtn.addEventListener('click', function() {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                alert.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.opacity = '0';
                alert.style.transform = 'translateX(100%)';
                
                setTimeout(() => {
                    alert.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Add focus effects to form inputs
    const formInputs = document.querySelectorAll('#loginForm input, #registerForm input');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('ring-2', 'ring-primary', 'border-transparent');
        });
        
        // Remove focus effect
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('ring-2', 'ring-primary', 'border-transparent');
        });
    });
});