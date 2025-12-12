// Dashboard JavaScript file for the NexusWealth website

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar && window.scrollY > 50) {
            navbar.classList.add('shadow-md');
        } else if (navbar) {
            navbar.classList.remove('shadow-md');
        }
    });

    // Sidebar toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (mobileMenuToggle && closeSidebar && sidebar && overlay) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('-translate-x-full');
            overlay.classList.toggle('hidden');
        });
        
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        });
        
        overlay.addEventListener('click', function() {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        });
        
        // Close sidebar when clicking outside on desktop
        document.addEventListener('click', function(event) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnMenuToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnMenuToggle && !sidebar.classList.contains('-translate-x-full')) {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            }
        });
    }

    // Note: RTL Toggle functionality has been moved to inline scripts in dashboard HTML files
    // to avoid conflicts and ensure proper execution timing
    
    // Enhanced dropdown functionality to prevent disappearing when moving cursor
    // Select all dropdown groups
    const dropdownGroups = document.querySelectorAll('.group');
    
    dropdownGroups.forEach(group => {
        const button = group.querySelector('button');
        const dropdownMenu = group.querySelector('div');
        
        if (button && dropdownMenu) {
            let timeoutId;
            
            // Show dropdown on button hover
            button.addEventListener('mouseenter', function() {
                clearTimeout(timeoutId);
                dropdownMenu.classList.remove('pointer-events-none');
                dropdownMenu.classList.add('pointer-events-auto');
                // Force reflow to ensure transition works
                dropdownMenu.offsetHeight;
                dropdownMenu.classList.remove('opacity-0', 'translate-y-2');
                dropdownMenu.classList.add('opacity-100', 'translate-y-0');
            });
            
            // Handle dropdown menu hover
            dropdownMenu.addEventListener('mouseenter', function() {
                clearTimeout(timeoutId);
                dropdownMenu.classList.remove('opacity-0', 'translate-y-2');
                dropdownMenu.classList.add('opacity-100', 'translate-y-0');
            });
            
            // Hide dropdown with delay when leaving both button and menu
            const hideDropdown = function() {
                timeoutId = setTimeout(() => {
                    dropdownMenu.classList.remove('opacity-100', 'translate-y-0');
                    dropdownMenu.classList.add('opacity-0', 'translate-y-2');
                    dropdownMenu.classList.remove('pointer-events-auto');
                    dropdownMenu.classList.add('pointer-events-none');
                }, 150); // 150ms delay
            };
            
            button.addEventListener('mouseleave', hideDropdown);
            dropdownMenu.addEventListener('mouseleave', hideDropdown);
        }
    });
    
    // Chart.js Radar Chart
    const interestsCtx = document.getElementById('interestsChart');
    if (interestsCtx) {
        new Chart(interestsCtx, {
            type: 'radar',
            data: {
                labels: ['Tax Planning', 'Investment', 'Retirement', 'Insurance', 'Estate Planning', 'Business Finance'],
                datasets: [{
                    label: 'Interest Level',
                    data: [85, 70, 60, 50, 40, 75],
                    backgroundColor: 'rgba(139, 92, 246, 0.2)', // purple-500 with opacity
                    borderColor: 'rgba(139, 92, 246, 1)', // purple-500
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(139, 92, 246, 1)', // purple-500
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(139, 92, 246, 1)' // purple-500
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                elements: {
                    line: {
                        borderWidth: 3
                    }
                }
            }
        });
    }
    
    // Chart.js Line Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [65000, 72000, 68000, 75000, 82000, 79000, 85000, 92000, 88000, 95000, 102000, 86420],
                    borderColor: 'rgba(139, 92, 246, 1)', // purple-500
                    backgroundColor: 'rgba(139, 92, 246, 0.1)', // purple-500 with opacity
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Countdown Timer
    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        // In a real app, this would be set to a specific future date
        // For demo purposes, we'll just show static numbers
        // In a real implementation, you would calculate the time remaining
    }
    
    // Update countdown every minute
    setInterval(updateCountdown, 60000);
    updateCountdown(); // Initial call
    
    // Add interactive elements for dashboard
    initDashboardInteractions();
});

// Initialize dashboard interactions
function initDashboardInteractions() {
    // Add hover effects to dashboard cards
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('animate-popIn');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('animate-popIn');
        });
    });
    
    // Add animation to notification badges
    const notificationBadges = document.querySelectorAll('.notification-badge');
    notificationBadges.forEach(badge => {
        badge.classList.add('animate-pulse');
    });
    
    // Add animation to progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        bar.classList.add('animate-fadeInRight');
    });
}