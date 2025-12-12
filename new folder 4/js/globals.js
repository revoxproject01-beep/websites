// Function to highlight current page in navigation
function highlightCurrentPage() {
    try {
        // Get current page filename
        const pathParts = window.location.pathname.split('/');
        const currentPage = pathParts[pathParts.length - 1] || 'index.html';
        
        // Desktop navigation links - select all anchor tags within the desktop menu
        const desktopMenu = document.querySelector('.hidden.lg\\:flex.items-center.space-x-8');
        if (desktopMenu) {
            const desktopLinks = desktopMenu.querySelectorAll('a');
            desktopLinks.forEach(link => {
                const href = link.getAttribute('href');
                // Remove any existing highlighting first
                link.classList.remove('text-primary', 'font-bold');
                link.classList.add('hover:text-primary');
                
                // Special handling for home pages - highlight the main Home link for both index.html and index2.html
                if ((currentPage === 'index.html' || currentPage === 'index2.html') && href === '#' && link.textContent.trim().includes('Home')) {
                    link.classList.add('text-primary', 'font-bold');
                    link.classList.remove('hover:text-primary');
                } else if (href && href === currentPage && !href.includes('dashboard')) {
                    link.classList.add('text-primary', 'font-bold');
                    link.classList.remove('hover:text-primary');
                }
            });
        }
        
        // Mobile navigation links
        const mobileLinks = document.querySelectorAll('#mobileMenu a');
        mobileLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Remove any existing highlighting first
            link.classList.remove('text-primary', 'font-bold');
            link.classList.add('hover:text-primary');
            
            // Special handling for home pages
            if ((currentPage === 'index.html' || currentPage === '') && href === 'index.html') {
                link.classList.add('text-primary', 'font-bold');
                link.classList.remove('hover:text-primary');
            } else if (currentPage === 'index2.html' && href === 'index2.html') {
                link.classList.add('text-primary', 'font-bold');
                link.classList.remove('hover:text-primary');
            } else if (href && href === currentPage && !href.includes('dashboard')) {
                link.classList.add('text-primary', 'font-bold');
                link.classList.remove('hover:text-primary');
            }
        });
        
        // Dropdown menu links (Home 1, Home 2, Dashboard links)
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Remove any existing highlighting first
            link.classList.remove('text-primary', 'font-bold');
            
            // Highlight active dropdown links
            if (href && href === currentPage) {
                link.classList.add('text-primary', 'font-bold');
            }
        });
    } catch (error) {
        console.error('Error in highlightCurrentPage function:', error);
    }
}

// Add special effects to buttons on hover
function addSpecialEffects() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('animate-pulse-subtle');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('animate-pulse-subtle');
        });
    });
}

// Call the functions when the page loads
document.addEventListener('DOMContentLoaded', function() {
    highlightCurrentPage();
    addSpecialEffects();
});