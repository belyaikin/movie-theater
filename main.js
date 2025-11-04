const subscribeBtn = document.getElementById('subscribeBtn');
const popupForm = document.getElementById('popupForm');
const closeBtn = document.getElementById('closeBtn');
const subscriptionForm = document.getElementById('subscriptionForm');
const colorBtn = document.getElementById('colorBtn');
const dayNightToggle = document.getElementById('dayNightToggle');
const body = document.body;
const timeText = document.getElementById('time');

// Date display
const date = new Date();
const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
};
timeText.textContent = `Today is ${date.getDate()} of ${months[date.getMonth()]}, ${date.getFullYear()}`;

// Popup form handling
subscribeBtn.addEventListener('click', () => {
    popupForm.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    popupForm.style.display = 'none';
    document.body.style.overflow = 'auto';
});

popupForm.addEventListener('click', (e) => {
    if (e.target === popupForm) {
        popupForm.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupForm.style.display === 'block') {
        popupForm.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

subscriptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(subscriptionForm);
    const data = Object.fromEntries(formData);
    if (!data.firstName || !data.lastName || !data.email) {
        alert('Please fill in all required fields.');
        return;
    }
    alert('Thank you for subscribing! You will receive updates soon.');
    subscriptionForm.reset();
    popupForm.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Theme switching
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

function applyTheme(theme) {
    body.style.backgroundColor = theme.background;
    body.style.color = theme.color;
    document.documentElement.style.setProperty('--accent-color', theme.accent);
    colorBtn.innerHTML = `🎨 ${theme.name}`;
}

function changeBackgroundColor() {
    currentThemeIndex = (currentThemeIndex + 1) % colorThemes.length;
    const newTheme = colorThemes[currentThemeIndex];
    applyTheme(newTheme);
    localStorage.setItem('selectedTheme', currentThemeIndex);
    body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 500);
}

function loadSavedTheme() {
    const savedThemeIndex = localStorage.getItem('selectedTheme');
    if (savedThemeIndex !== null) {
        currentThemeIndex = parseInt(savedThemeIndex);
        applyTheme(colorThemes[currentThemeIndex]);
    } else {
        applyTheme(colorThemes[0]);
    }
}

colorBtn.addEventListener('click', changeBackgroundColor);
loadSavedTheme();

// Day/Night Theme Toggle
function initializeDayNightToggle() {
    if (!dayNightToggle) return;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('dayNightTheme');
    if (savedTheme === 'day') {
        body.classList.add('day-theme');
        dayNightToggle.innerHTML = '☀️ Day Mode';
    } else {
        dayNightToggle.innerHTML = '🌙 Night Mode';
    }

    dayNightToggle.addEventListener('click', function() {
        if (body.classList.contains('day-theme')) {
            // Switch to night mode
            body.classList.remove('day-theme');
            this.innerHTML = '🌙 Night Mode';
            localStorage.setItem('dayNightTheme', 'night');
        } else {
            // Switch to day mode
            body.classList.add('day-theme');
            this.innerHTML = '☀️ Day Mode';
            localStorage.setItem('dayNightTheme', 'day');
        }
    });
}

// Initialize day/night toggle
initializeDayNightToggle();

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        changeBackgroundColor();
    }
});


