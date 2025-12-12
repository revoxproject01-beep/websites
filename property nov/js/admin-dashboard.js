// Admin Dashboard Functionality
document.addEventListener('DOMContentLoaded', () => {
    initPropertyManagement();
    initBlogManagement();
    initQuickActions();
    loadDashboardData();
});

// Property Management
function initPropertyManagement() {
    const addPropertyBtn = document.querySelector('button:has(.fa-plus)');
    const editBtns = document.querySelectorAll('.fa-edit');
    const deleteBtns = document.querySelectorAll('.fa-trash');
    
    if (addPropertyBtn) {
        addPropertyBtn.addEventListener('click', () => {
            showAddPropertyModal();
        });
    }
    
    editBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const propertyElement = btn.closest('.flex');
            const propertyName = propertyElement.querySelector('h3').textContent;
            showNotification(`Editing ${propertyName}...`, 'info');
        });
    });
    
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const propertyElement = btn.closest('.flex');
            const propertyName = propertyElement.querySelector('h3').textContent;
            
            if (confirm(`Are you sure you want to delete ${propertyName}?`)) {
                propertyElement.style.opacity = '0.5';
                setTimeout(() => {
                    propertyElement.remove();
                    showNotification(`${propertyName} deleted successfully`, 'success');
                }, 300);
            }
        });
    });
}

// Blog Management
function initBlogManagement() {
    const newPostBtn = document.querySelector('button:contains("New Post")');
    const blogEditBtns = document.querySelectorAll('.grid .fa-edit');
    const blogDeleteBtns = document.querySelectorAll('.grid .fa-trash');
    
    if (newPostBtn) {
        newPostBtn.addEventListener('click', () => {
            showNotification('Opening blog editor...', 'info');
        });
    }
    
    blogEditBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const blogCard = btn.closest('.border');
            const blogTitle = blogCard.querySelector('h3').textContent;
            showNotification(`Editing "${blogTitle}"...`, 'info');
        });
    });
    
    blogDeleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const blogCard = btn.closest('.border');
            const blogTitle = blogCard.querySelector('h3').textContent;
            
            if (confirm(`Are you sure you want to delete "${blogTitle}"?`)) {
                blogCard.style.opacity = '0.5';
                setTimeout(() => {
                    blogCard.remove();
                    showNotification(`Blog post deleted successfully`, 'success');
                }, 300);
            }
        });
    });
}

// Quick Actions
function initQuickActions() {
    const quickActionBtns = document.querySelectorAll('.space-y-3 button');
    
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.textContent.trim();
            
            if (action.includes('Add New Property')) {
                showAddPropertyModal();
            } else if (action.includes('Manage Categories')) {
                showNotification('Opening category management...', 'info');
            } else if (action.includes('Create Blog Post')) {
                showNotification('Opening blog editor...', 'info');
            }
        });
    });
}

// Show Add Property Modal (simplified)
function showAddPropertyModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-dark dark:text-white">Add New Property</h2>
                <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Property Title</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price</label>
                    <input type="number" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
                </div>
                <div class="flex space-x-4">
                    <button type="button" class="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700" onclick="this.closest('.fixed').remove()">
                        Cancel
                    </button>
                    <button type="submit" class="flex-1 bg-primary text-white py-2 rounded-md hover:bg-blue-600">
                        Add Property
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        modal.remove();
        showNotification('Property added successfully!', 'success');
    });
}

// Load Dashboard Data
function loadDashboardData() {
    // Simulate loading dashboard statistics
    const stats = {
        totalProperties: 127,
        activeUsers: 1284,
        salesThisMonth: '$2.4M',
        pageViews: 45678
    };
    
    // Update stats with animation
    animateCountUp('totalProperties', stats.totalProperties);
    animateCountUp('activeUsers', stats.activeUsers);
    
    // Load recent activity
    loadRecentActivity();
}

// Animate count up effect
function animateCountUp(elementId, targetValue) {
    const element = document.querySelector(`[data-stat="${elementId}"]`);
    if (!element) return;
    
    const startValue = 0;
    const duration = 2000;
    const startTime = Date.now();
    
    function updateCount() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }
    
    updateCount();
}

// Load Recent Activity
function loadRecentActivity() {
    const activities = [
        { type: 'success', message: 'New property added', time: '2 minutes ago' },
        { type: 'info', message: 'User inquiry received', time: '5 minutes ago' },
        { type: 'warning', message: 'Property updated', time: '10 minutes ago' }
    ];
    
    // This would typically update the recent activity section
    console.log('Recent activities loaded:', activities);
}

// Export functions for global use
window.AdminDashboard = {
    showAddPropertyModal,
    loadDashboardData,
    animateCountUp
};