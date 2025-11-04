document.addEventListener('DOMContentLoaded', function() {
    initializeStarRatings();
    initializeDescriptionToggles();
});

function initializeStarRatings() {
    const starRatings = document.querySelectorAll('.star-rating');
    
    starRatings.forEach(ratingContainer => {
        const stars = ratingContainer.querySelectorAll('.star');
        const ratingText = ratingContainer.parentElement.querySelector('.rating-text');
        const movieId = ratingContainer.dataset.movie;
        
        let currentRating = 0;
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                currentRating = parseInt(this.dataset.rating);
                updateStarDisplay();
                updateRatingText();
                saveRating(movieId, currentRating);
            });
            
            star.addEventListener('mouseenter', function() {
                highlightStars(parseInt(this.dataset.rating));
            });
        });
        
        ratingContainer.addEventListener('mouseleave', function() {
            updateStarDisplay();
        });
        
        function updateStarDisplay() {
            stars.forEach(star => {
                const starRating = parseInt(star.dataset.rating);
                star.classList.remove('active');
                
                if (starRating <= currentRating) {
                    star.classList.add('rated');
                } else {
                    star.classList.remove('rated');
                }
            });
        }
        
        function highlightStars(rating) {
            stars.forEach(star => {
                const starRating = parseInt(star.dataset.rating);
                star.classList.remove('active');
                
                if (starRating <= rating) {
                    star.classList.add('active');
                }
            });
        }
        
        function updateRatingText() {
            const ratingTexts = {
                1: 'Poor (1/5)', 
                2: 'Fair (2/5)', 
                3: 'Good (3/5)',
                4: 'Very Good (4/5)',
                5: 'Excellent (5/5)'
            };
            ratingText.textContent = ratingTexts[currentRating] || 'Rate this movie';
        }
        
        function saveRating(movieId, rating) {
            localStorage.setItem(`movie_rating_${movieId}`, rating);
        }
        
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
    
        
        button.addEventListener('click', function(e) {
            e.stopPropagation(); 
            
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