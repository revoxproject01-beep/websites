// Global RTL/LTR state management
// Uses localStorage with key 'techsolutions_direction' to persist user preference

// Global symbol for direction state
const DIRECTION_STATE = {
    LTR: 'ltr',
    RTL: 'rtl'
};

// Initialize direction on page load
document.addEventListener('DOMContentLoaded', () => {
    try {
        const savedDirection = localStorage.getItem('techsolutions_direction');
        if (savedDirection === DIRECTION_STATE.RTL) {
            document.documentElement.setAttribute('dir', DIRECTION_STATE.RTL);
        } else {
            // Default to LTR
            document.documentElement.setAttribute('dir', DIRECTION_STATE.LTR);
            localStorage.setItem('techsolutions_direction', DIRECTION_STATE.LTR);
        }
    } catch (error) {
        console.error('Error initializing direction:', error);
        // Default to LTR in case of error
        document.documentElement.setAttribute('dir', DIRECTION_STATE.LTR);
    }
});

// Global function to toggle direction
function toggleDirection() {
    try {
        const htmlElement = document.documentElement;
        const currentDirection = htmlElement.getAttribute('dir');
        
        if (currentDirection === DIRECTION_STATE.RTL) {
            htmlElement.setAttribute('dir', DIRECTION_STATE.LTR);
            localStorage.setItem('techsolutions_direction', DIRECTION_STATE.LTR);
        } else {
            htmlElement.setAttribute('dir', DIRECTION_STATE.RTL);
            localStorage.setItem('techsolutions_direction', DIRECTION_STATE.RTL);
        }
    } catch (error) {
        console.error('Error toggling direction:', error);
    }
}

// Global function to get current direction
function getCurrentDirection() {
    try {
        return document.documentElement.getAttribute('dir') || DIRECTION_STATE.LTR;
    } catch (error) {
        console.error('Error getting current direction:', error);
        return DIRECTION_STATE.LTR;
    }
}

// Global function to set direction
function setDirection(direction) {
    try {
        if (direction === DIRECTION_STATE.RTL || direction === DIRECTION_STATE.LTR) {
            document.documentElement.setAttribute('dir', direction);
            localStorage.setItem('techsolutions_direction', direction);
        }
    } catch (error) {
        console.error('Error setting direction:', error);
    }
}