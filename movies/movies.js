// JavaScript file for movies.html
// Popup Subscription Form and Theme Change Functionality

// Get DOM elements
const subscribeBtn = document.getElementById('subscribeBtn');
const popupForm = document.getElementById('popupForm');
const closeBtn = document.getElementById('closeBtn');
const subscriptionForm = document.getElementById('subscriptionForm');
const colorBtn = document.getElementById('colorBtn');
const body = document.body;

// Show popup when subscribe button is clicked
subscribeBtn.addEventListener('click', function() {
    popupForm.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// Hide popup when close button is clicked
closeBtn.addEventListener('click', function() {
    popupForm.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Hide popup when clicking outside the form
popupForm.addEventListener('click', function(e) {
    if (e.target === popupForm) {
        popupForm.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

// Hide popup when pressing Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupForm.style.display === 'block') {
        popupForm.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

// Handle form submission
subscriptionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(subscriptionForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.firstName || !data.lastName || !data.email) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission (in real app, you'd send to server)
    alert('Thank you for subscribing! You will receive updates soon.');
    
    // Reset form and hide popup
    subscriptionForm.reset();
    popupForm.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Background Color Change Functionality
const colorThemes = [
    {
        name: 'Dark Theme',
        background: '#121212',
        color: '#f4f4f4',
        accent: '#e74c3c'
    },
    {
        name: 'Ocean Blue',
        background: '#0a1929',
        color: '#e3f2fd',
        accent: '#2196f3'
    },
    {
        name: 'Forest Green',
        background: '#1b2e1b',
        color: '#e8f5e8',
        accent: '#4caf50'
    },
    {
        name: 'Sunset Orange',
        background: '#2d1b1b',
        color: '#fff3e0',
        accent: '#ff9800'
    },
    {
        name: 'Royal Purple',
        background: '#1a1a2e',
        color: '#f3e5f5',
        accent: '#9c27b0'
    },
    {
        name: 'Midnight Navy',
        background: '#0f1419',
        color: '#e1f5fe',
        accent: '#03a9f4'
    }
];

let currentThemeIndex = 0;

// Function to apply theme
function applyTheme(theme) {
    body.style.backgroundColor = theme.background;
    body.style.color = theme.color;
    
    // Update CSS custom properties for accent colors
    document.documentElement.style.setProperty('--accent-color', theme.accent);
    
    // Update button text to show current theme
    colorBtn.innerHTML = `🎨 ${theme.name}`;
}

// Function to cycle through themes
function changeBackgroundColor() {
    currentThemeIndex = (currentThemeIndex + 1) % colorThemes.length;
    const newTheme = colorThemes[currentThemeIndex];
    applyTheme(newTheme);
    
    // Save theme preference to localStorage
    localStorage.setItem('selectedTheme', currentThemeIndex);
    
    // Add a subtle animation effect
    body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 500);
}

// Load saved theme on page load
function loadSavedTheme() {
    const savedThemeIndex = localStorage.getItem('selectedTheme');
    if (savedThemeIndex !== null) {
        currentThemeIndex = parseInt(savedThemeIndex);
        applyTheme(colorThemes[currentThemeIndex]);
    } else {
        // Default theme
        applyTheme(colorThemes[0]);
    }
}

// Add click event listener to color button
colorBtn.addEventListener('click', changeBackgroundColor);

// Load saved theme when page loads
loadSavedTheme();

// Add keyboard shortcut (Ctrl/Cmd + T) for theme change
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        changeBackgroundColor();
    }
});
