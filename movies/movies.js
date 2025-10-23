// JavaScript file for movies.html
// Popup Subscription Form and Theme Change Functionality

// Get DOM elements
const subscribeBtn = document.getElementById('subscribeBtn');
const popupForm = document.getElementById('popupForm');
const closeBtn = document.getElementById('closeBtn');
const subscriptionForm = document.getElementById('subscriptionForm');
const colorBtn = document.getElementById('colorBtn');
const body = document.body;

// Popup handlers (guarded if elements are absent in this page)
if (subscribeBtn && popupForm && closeBtn && subscriptionForm) {
    // Show popup when subscribe button is clicked
    subscribeBtn.addEventListener('click', function() {
        popupForm.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Hide popup when close button is clicked
    closeBtn.addEventListener('click', function() {
        popupForm.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Hide popup when clicking outside the form
    popupForm.addEventListener('click', function(e) {
        if (e.target === popupForm) {
            popupForm.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Hide popup when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupForm.style.display === 'block') {
            popupForm.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle form submission
    subscriptionForm.addEventListener('submit', function(e) {
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
}

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
    if (colorBtn) {
        colorBtn.innerHTML = `🎨 ${theme.name}`;
    }
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

// Add click event listener to color button (guarded)
if (colorBtn) {
    colorBtn.addEventListener('click', changeBackgroundColor);
}

// Load saved theme when page loads
loadSavedTheme();

// Add keyboard shortcut (Ctrl/Cmd + T) for theme change
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        changeBackgroundColor();
    }
});

// Enhanced Movie Card Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize movie card interactions
    initializeMovieCards();
    initializeStarRatings();
    initializeDescriptionToggles();
    initializeDynamicContent();
    initializeDayNightToggle();
});

function initializeMovieCards() {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeStarRatings() {
    const starRatings = document.querySelectorAll('.star-rating');
    
    starRatings.forEach(ratingContainer => {
        const stars = ratingContainer.querySelectorAll('.star');
        const ratingText = ratingContainer.parentElement.querySelector('.rating-text');
        const movieId = ratingContainer.dataset.movie;
        
        let currentRating = 0;
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                currentRating = parseInt(this.dataset.rating);
                updateStarDisplay();
                updateRatingText();
                saveRating(movieId, currentRating);
            });
            
            star.addEventListener('mouseenter', function() {
                const hoverRating = parseInt(this.dataset.rating);
                highlightStars(hoverRating);
            });
        });
        
        ratingContainer.addEventListener('mouseleave', function() {
            updateStarDisplay();
        });
        
        function updateStarDisplay() {
            stars.forEach((star, index) => {
                const starRating = parseInt(star.dataset.rating);
                star.classList.remove('active', 'rated');
                
                if (starRating <= currentRating) {
                    star.classList.add('rated');
                }
            });
        }
        
        function highlightStars(rating) {
            stars.forEach((star, index) => {
                const starRating = parseInt(star.dataset.rating);
                star.classList.remove('active');
                
                if (starRating <= rating) {
                    star.classList.add('active');
                }
            });
        }
        
        function updateRatingText() {
            const ratingTexts = {
                1: 'Poor',
                2: 'Fair', 
                3: 'Good',
                4: 'Very Good',
                5: 'Excellent'
            };
            ratingText.textContent = ratingTexts[currentRating] || 'Rate this movie';
        }
        
        function saveRating(movieId, rating) {
            localStorage.setItem(`movie_rating_${movieId}`, rating);
        }
        
        // Load saved rating
        const savedRating = localStorage.getItem(`movie_rating_${movieId}`);
        if (savedRating) {
            currentRating = parseInt(savedRating);
            updateStarDisplay();
            updateRatingText();
        }
    });
}

function initializeDescriptionToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-description');
    
    toggleButtons.forEach(button => {
        const card = button.closest('.movie-card');
        const description = card.querySelector('.card-text');
        
        // Initially collapse description
        description.classList.add('collapsed');
        
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            
            if (description.classList.contains('collapsed')) {
                description.classList.remove('collapsed');
                description.classList.add('expanded');
                button.textContent = 'Show Less';
            } else {
                description.classList.remove('expanded');
                description.classList.add('collapsed');
                button.textContent = 'Show More';
            }
        });
    });
}

function initializeDynamicContent() {
    // Add dynamic content updates
    const daBigText = document.querySelector('.da-big-text p');
    const daSmallText = document.querySelector('.da-small-text p');
    
    // Update main heading with dynamic content
    const originalText = daBigText.textContent;
    let textVariations = [
        "Here's our movies",
        "Check out our amazing collection",
        "Discover the best shows",
        "Explore our movie library"
    ];
    
    let currentVariation = 0;
    
    // Change text every 5 seconds
    setInterval(() => {
        currentVariation = (currentVariation + 1) % textVariations.length;
        daBigText.style.opacity = '0';
        daBigText.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            daBigText.textContent = textVariations[currentVariation];
            daBigText.style.opacity = '1';
            daBigText.style.transform = 'translateY(0)';
        }, 300);
    }, 5000);
    
    // Add click to change text functionality
    daBigText.addEventListener('click', function() {
        currentVariation = (currentVariation + 1) % textVariations.length;
        this.style.transition = 'all 0.3s ease';
        this.style.transform = 'scale(1.1)';
        this.textContent = textVariations[currentVariation];
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
    
    // Add dynamic movie count
    const movieCards = document.querySelectorAll('.movie-card');
    const movieCount = movieCards.length;
    
    // Update small text with dynamic content
    const smallTextVariations = [
        `Nothing more. Only Breaking Bad series. Who needs more?`,
        `We have ${movieCount} amazing shows for you!`,
        `Quality over quantity - that's our motto!`,
        `Breaking Bad universe at its finest!`
    ];
    
    let smallTextIndex = 0;
    
    daSmallText.addEventListener('click', function() {
        smallTextIndex = (smallTextIndex + 1) % smallTextVariations.length;
        this.style.transition = 'all 0.3s ease';
        this.style.color = '#ff6b6b';
        this.textContent = smallTextVariations[smallTextIndex];
        
        setTimeout(() => {
            this.style.color = '#e74c3c';
        }, 1000);
    });
}

function initializeDayNightToggle() {
    const dayNightToggle = document.getElementById('dayNightToggle');
    const body = document.body;
    
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
