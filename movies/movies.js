$(() => {
  $.ajax({
    url: 'http://localhost:8081/movies/all',
    method: 'GET',
    success: (data) => {
      data.forEach((movie) => {
        $('.movie-row').append(`<div class="col">
            <div class="card h-100 mv-one movie-card" data-movie="breaking-bad">
                <img src="` + movie.imageUrl + `" class="card-img-top" alt="Movie image">
                <div class="card-body">
                    <h5 class="card-title">` + movie.name + `</h5>
                    <p class="card-text collapsed">` + movie.description + `</p>
                    <div class="movie-rating">
                        <div class="star-rating" data-movie="breaking-bad">
                            <span class="star" data-rating="1">★</span>
                            <span class="star" data-rating="2">★</span>
                            <span class="star" data-rating="3">★</span>
                            <span class="star" data-rating="4">★</span>
                            <span class="star" data-rating="5">★</span>
                        </div>
                        <span class="rating-text">Rate this movie</span>
                    </div>
                    <p class="card-text"><small class="text-body-secondary">Watch price in <a href="../tickets/ticket_sale.html">Tickets page</a>.</small></p>
                    <button class="btn btn-danger btn-sm toggle-description">Show More</button>
                </div>
            </div>
        </div>`
        );
      })
    },
    error: (status, error) => {
      console.error('AJAX Error:', status, error);
      $('.movie-row').append("<p>Oops!<br>Our sysadmin have spilled beer on servers again.<br>We're sorry for the inconvinience.</p>");
    },
  })
});

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
