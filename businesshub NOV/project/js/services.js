// Services Page JavaScript for Apex Solutions

document.addEventListener('DOMContentLoaded', function() {
    // Service filtering functionality
    const industryFilter = document.getElementById('industryFilter');
    const serviceFilter = document.getElementById('serviceFilter');
    const budgetFilter = document.getElementById('budgetFilter');
    const searchButton = document.getElementById('searchServices');
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Apply filters function
    function applyFilters() {
        const industryValue = industryFilter.value;
        const serviceValue = serviceFilter.value;
        const budgetValue = budgetFilter.value;
        
        serviceCards.forEach(card => {
            const cardIndustry = card.getAttribute('data-industry');
            const cardService = card.getAttribute('data-service');
            const cardBudget = card.getAttribute('data-budget');
            
            let showCard = true;
            
            // Apply industry filter
            if (industryValue && industryValue !== 'all' && cardIndustry !== 'all' && cardIndustry !== industryValue) {
                showCard = false;
            }
            
            // Apply service filter
            if (serviceValue && serviceValue !== 'all' && cardService !== serviceValue) {
                showCard = false;
            }
            
            // Apply budget filter
            if (budgetValue && budgetValue !== 'all' && cardBudget !== budgetValue) {
                showCard = false;
            }
            
            // Show/hide card with animation
            if (showCard) {
                card.style.display = 'block';
                // Add fade in animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                // Add fade out animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Add event listeners to filters
    if (industryFilter) {
        industryFilter.addEventListener('change', applyFilters);
    }
    
    if (serviceFilter) {
        serviceFilter.addEventListener('change', applyFilters);
    }
    
    if (budgetFilter) {
        budgetFilter.addEventListener('change', applyFilters);
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            applyFilters();
            
            // Add button animation
            this.classList.add('scale-hover');
            setTimeout(() => {
                this.classList.remove('scale-hover');
            }, 300);
        });
    }
    
    // Add hover effects to service cards
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
});