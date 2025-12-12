// User Dashboard Functionality
document.addEventListener('DOMContentLoaded', () => {
    initSavedProperties();
    initQuickActions();
    initProfileManagement();
    loadUserData();
});

// Saved Properties Management
function initSavedProperties() {
    const removeButtons = document.querySelectorAll('.fa-heart-broken');
    
    removeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const propertyElement = btn.closest('.flex');
            const propertyName = propertyElement.querySelector('h3').textContent;
            
            if (confirm(`Remove ${propertyName} from saved properties?`)) {
                propertyElement.style.opacity = '0.5';
                setTimeout(() => {
                    propertyElement.remove();
                    showNotification(`${propertyName} removed from saved properties`, 'success');
                    updateSavedCount();
                }, 300);
            }
        });
    });
}

// Quick Actions
function initQuickActions() {
    const actionButtons = document.querySelectorAll('.space-y-3 button');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.textContent.trim();
            
            if (action.includes('Search Properties')) {
                window.location.href = 'index.html#search';
            } else if (action.includes('Schedule Viewing')) {
                showScheduleModal();
            } else if (action.includes('Contact Agent')) {
                window.location.href = 'contact.html';
            }
        });
    });
}

// Profile Management
function initProfileManagement() {
    const editProfileBtn = document.querySelector('button:contains("Edit Profile")');
    const settingsBtn = document.querySelector('button:contains("Settings")');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            showEditProfileModal();
        });
    }
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showSettingsModal();
        });
    }
}

// Show Schedule Viewing Modal
function showScheduleModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-dark dark:text-white">Schedule Viewing</h2>
                <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Property</label>
                    <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
                        <option>Luxury Villa - Beverly Hills</option>
                        <option>Modern Apartment - NYC</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Date</label>
                    <input type="date" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Time</label>
                    <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
                        <option>Morning (9 AM - 12 PM)</option>
                        <option>Afternoon (12 PM - 5 PM)</option>
                        <option>Evening (5 PM - 8 PM)</option>
                    </select>
                </div>
                <div class="flex space-x-4">
                    <button type="button" class="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700" onclick="this.closest('.fixed').remove()">
                        Cancel
                    </button>
                    <button type="submit" class="flex-1 bg-primary text-white py-2 rounded-md hover:bg-blue-600">
                        Schedule
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
        showNotification('Viewing scheduled successfully!', 'success');
    });
}

// Show Edit Profile Modal
function showEditProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-dark dark:text-white">Edit Profile</h2>
                <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input type="text" value="John Doe" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input type="email" value="john.doe@email.com" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                    <input type="tel" value="(555) 123-4567" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
                </div>
                <div class="flex space-x-4">
                    <button type="button" class="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700" onclick="this.closest('.fixed').remove()">
                        Cancel
                    </button>
                    <button type="submit" class="flex-1 bg-primary text-white py-2 rounded-md hover:bg-blue-600">
                        Save Changes
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
        showNotification('Profile updated successfully!', 'success');
    });
}

// Show Settings Modal
function showSettingsModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-dark dark:text-white">Settings</h2>
                <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="space-y-6">
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">Email Notifications</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">SMS Notifications</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">Marketing Emails</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked class="sr-only peer">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <button class="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600" onclick="this.closest('.fixed').remove(); showNotification('Settings saved!', 'success')">
                    Save Settings
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Update saved properties count
function updateSavedCount() {
    const savedCountElement = document.querySelector('[data-stat="savedProperties"]');
    if (savedCountElement) {
        const currentCount = parseInt(savedCountElement.textContent);
        savedCountElement.textContent = Math.max(0, currentCount - 1);
    }
}

// Load User Data
function loadUserData() {
    // Simulate loading user data
    const userData = {
        name: 'John Doe',
        email: 'john.doe@email.com',
        membershipType: 'Premium Member',
        savedProperties: 8,
        recentSearches: 15,
        inquiriesSent: 3
    };
    
    // Update user stats with animation
    animateCountUp('savedProperties', userData.savedProperties);
    animateCountUp('recentSearches', userData.recentSearches);
    animateCountUp('inquiriesSent', userData.inquiriesSent);
}

// Animate count up effect
function animateCountUp(statType, targetValue) {
    const element = document.querySelector(`[data-stat="${statType}"]`);
    if (!element) return;
    
    const startValue = 0;
    const duration = 1500;
    const startTime = Date.now();
    
    function updateCount() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }
    
    updateCount();
}

// Property search from dashboard
function searchProperties(criteria) {
    showNotification('Searching properties...', 'info');
    
    setTimeout(() => {
        showNotification('Search completed! Redirecting to results...', 'success');
        // Here you would typically redirect to search results
    }, 2000);
}

// Export functions for global use
window.UserDashboard = {
    showScheduleModal,
    showEditProfileModal,
    showSettingsModal,
    updateSavedCount,
    searchProperties
};