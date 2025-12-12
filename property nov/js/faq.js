// FAQ Functionality
document.addEventListener('DOMContentLoaded', () => {
    initFAQAccordion();
});

// FAQ Accordion functionality
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Toggle the answer visibility
            if (answer.classList.contains('hidden')) {
                // Close all other open answers
                document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                    if (otherAnswer !== answer) {
                        otherAnswer.classList.add('hidden');
                        const otherIcon = otherAnswer.previousElementSibling.querySelector('i');
                        if (otherIcon) {
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                
                // Open this answer
                answer.classList.remove('hidden');
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
            } else {
                // Close this answer
                answer.classList.add('hidden');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}

// Search FAQ functionality
function initFAQSearch() {
    const searchInput = document.getElementById('faqSearch');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (searchInput && faqItems.length) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = searchTerm === '' ? 'block' : 'none';
                }
            });
        });
    }
}

// FAQ category filtering (if implemented)
function initFAQFiltering() {
    const filterBtns = document.querySelectorAll('.faq-filter');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter FAQ items
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Load more FAQs (if pagination is implemented)
function loadMoreFAQs() {
    // Simulate loading more FAQ items
    showNotification('Loading more FAQs...', 'info');
    
    setTimeout(() => {
        showNotification('All FAQs loaded!', 'success');
    }, 1500);
}

// Export functions for global use
window.FAQModule = {
    initFAQAccordion,
    initFAQSearch,
    initFAQFiltering,
    loadMoreFAQs
};