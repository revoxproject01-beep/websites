// Coming Soon Page JavaScript for Apex Solutions

// Set the date we're counting down to (30 days from now)
const countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + 30);

// Update the count down every 1 second
const countdownFunction = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();
    
    // Find the distance between now and the count down date
    const distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result with animation
    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
    
    // Add pulse animation to numbers
    const elements = [document.getElementById("days"), document.getElementById("hours"), 
                     document.getElementById("minutes"), document.getElementById("seconds")];
    
    elements.forEach(el => {
        el.classList.add('pulse-animation');
        setTimeout(() => {
            el.classList.remove('pulse-animation');
        }, 500);
    });
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}, 1000);

// Form submission handler
document.getElementById('subscriptionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const successMessage = document.getElementById('successMessage');
    
    // Simple email validation
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show success message with animation
    successMessage.classList.remove('hidden');
    successMessage.style.opacity = '0';
    successMessage.style.transform = 'translateY(20px)';
    
    // Animate in
    setTimeout(() => {
        successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(0)';
    }, 10);
    
    // Reset form
    this.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(20px)';
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 500);
    }, 5000);
});

// Add hover effects to feature cards
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.scale-hover');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
});