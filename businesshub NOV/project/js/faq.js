// FAQ Page JavaScript for Apex Solutions

document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon');
            
            // Toggle answer visibility with smooth transition
            if (answer.classList.contains('hidden')) {
                // Close all other answers
                document.querySelectorAll('.faq-answer').forEach(a => {
                    if (a !== answer) {
                        a.classList.add('hidden');
                        a.previousElementSibling.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                    }
                });
                
                // Open this answer
                answer.classList.remove('hidden');
                answer.style.maxHeight = '0';
                answer.style.overflow = 'hidden';
                
                // Force reflow
                answer.offsetHeight;
                
                // Animate open
                answer.style.transition = 'max-height 0.3s ease-out';
                answer.style.maxHeight = answer.scrollHeight + 'px';
                
                // Rotate icon
                icon.style.transform = 'rotate(180deg)';
                icon.style.transition = 'transform 0.3s ease';
            } else {
                // Close this answer
                answer.style.maxHeight = '0';
                
                // After transition, hide the element
                setTimeout(() => {
                    if (answer.style.maxHeight === '0px') {
                        answer.classList.add('hidden');
                    }
                }, 300);
                
                // Rotate icon back
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // FAQ category filtering
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    const faqItems = document.querySelectorAll('.faq-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            });
            
            this.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
            this.classList.add('bg-primary', 'text-white');
            
            // Filter FAQ items
            faqItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    // Add fade in animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    // Add fade out animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // FAQ search functionality
    const searchInput = document.getElementById('faqSearch');
    const noResults = document.getElementById('noResults');
    const clearSearch = document.getElementById('clearSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            let hasResults = false;
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    hasResults = true;
                    
                    // Add fade in animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    // Add fade out animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show/hide no results message
            if (searchTerm && !hasResults) {
                noResults.classList.remove('hidden');
                noResults.style.opacity = '0';
                noResults.style.transform = 'translateY(20px)';
                noResults.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                setTimeout(() => {
                    noResults.style.opacity = '1';
                    noResults.style.transform = 'translateY(0)';
                }, 10);
            } else {
                noResults.style.opacity = '0';
                noResults.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    noResults.classList.add('hidden');
                }, 300);
            }
        });
    }
    
    // Clear search functionality
    if (clearSearch) {
        clearSearch.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            }
            
            // Reset to show all categories
            categoryButtons[0].click();
        });
    }
});