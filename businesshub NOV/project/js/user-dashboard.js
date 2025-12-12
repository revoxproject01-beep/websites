// User Dashboard JavaScript for Apex Solutions

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.user-tab-btn');
    const tabContents = document.querySelectorAll('.user-tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active classes from all buttons
            tabButtons.forEach(b => {
                b.classList.remove('text-primary', 'bg-blue-50', 'dark:bg-blue-900', 'border-r-2', 'border-primary');
                b.classList.add('text-gray-700', 'dark:text-gray-300');
            });
            
            // Add active classes to clicked button
            this.classList.remove('text-gray-700', 'dark:text-gray-300');
            this.classList.add('text-primary', 'bg-blue-50', 'dark:bg-blue-900', 'border-r-2', 'border-primary');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show selected tab content with animation
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.classList.remove('hidden');
                target.style.opacity = '0';
                target.style.transform = 'translateY(20px)';
                target.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                setTimeout(() => {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }, 10);
            }
        });
    });
    
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.scale-hover');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Add animation to activity list items
    const activityItems = document.querySelectorAll('.bg-white.dark\\:bg-gray-800 li');
    
    activityItems.forEach((item, index) => {
        // Add staggered animation delay
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        
        // Trigger animation
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100);
    });
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="flex items-center"><span class="animate-spin mr-2">●</span> Loading...</span>';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
});