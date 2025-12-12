// Add active class to current page in navigation
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Get all navigation links
        const navLinks = document.querySelectorAll('nav a[href]');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Add active class to current page link
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Skip if href is null or empty
            if (!href) return;
            
            // Check if this link matches the current page
            if (href === currentPage) {
                // For main navigation links (not in dropdowns)
                if (!link.closest('.absolute') && !link.closest('.hidden')) {
                    link.classList.add('nav-active');
                }
                // For dropdown links
                else if (link.closest('.absolute')) {
                    link.classList.add('dropdown-active');
                }
            }
        });
        
        // Special handling for index2.html to also highlight the Home link
        if (currentPage === 'index2.html') {
            const homeLinks = document.querySelectorAll('nav a[href="index.html"]');
            homeLinks.forEach(link => {
                if (!link.closest('.absolute') && !link.closest('.hidden')) {
                    link.classList.add('nav-active');
                }
            });
        }
        
        // Handle dashboard pages highlighting
        if (currentPage === 'admin-dashboard.html' || currentPage === 'user-dashboard.html') {
            // Find dashboard dropdown buttons and highlight them
            const dashboardDropdowns = document.querySelectorAll('nav button');
            dashboardDropdowns.forEach(button => {
                const text = button.textContent || button.innerText;
                if (text && text.trim().toLowerCase().includes('dashboard')) {
                    button.classList.add('text-primary');
                }
            });
        }
        
        // Handle home pages highlighting the Home dropdown
        if (currentPage === 'index.html' || currentPage === 'index2.html') {
            // Find home dropdown buttons and highlight them
            const homeDropdowns = document.querySelectorAll('nav button');
            homeDropdowns.forEach(button => {
                const text = button.textContent || button.innerText;
                if (text && text.trim().toLowerCase().includes('home')) {
                    button.classList.add('text-primary');
                }
            });
        }
    } catch (error) {
        console.error('Navigation highlighting error:', error);
    }
});