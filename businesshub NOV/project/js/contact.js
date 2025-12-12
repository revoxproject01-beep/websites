// Contact Page JavaScript for Apex Solutions

document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!firstName || !lastName || !email || !message) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showAlert('Thank you for your message! We will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            }, 2000);
        });
    }
    
    // Alert function with animations
    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.contact-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `contact-alert fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
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
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
    
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