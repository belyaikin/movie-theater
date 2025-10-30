// jQuery functionality for movie theater website
$(document).ready(function(){
    console.log("jQuery is ready!");
    
    // Initialize all jQuery functionality
    initializeSearchFunctionality();
    initializeAutocomplete();
    initializeSearchHighlighting();
    initializeFeedbackSearch();
});

// Task 1: Real-time Search and Live Filter
function initializeSearchFunctionality() {
    // Add search bar to the movies page
    addSearchBar();
    
    // Initialize live filtering
    initializeLiveFilter();
}

function addSearchBar() {
    // Add search bar to movies page if it doesn't exist
    if ($('#movies-search-container').length === 0) {
        const searchHTML = `
            <div id="movies-search-container" class="container mt-4 mb-4">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="search-wrapper">
                            <input type="text" id="movie-search" class="form-control form-control-lg" 
                                   placeholder="Search movies by title or description...">
                            <div class="search-icon">
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert search bar before the movie cards
        $('.da-big-text').after(searchHTML);
    }
}

function initializeLiveFilter() {
    $('#movie-search').on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase();
        
        $('.movie-card').each(function() {
            const card = $(this);
            const title = card.find('.card-title').text().toLowerCase();
            const description = card.find('.card-text').text().toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.show().addClass('search-match');
            } else {
                card.hide().removeClass('search-match');
            }
        });
        
        // Show/hide "no results" message
        const visibleCards = $('.movie-card:visible').length;
        if (visibleCards === 0 && searchTerm.length > 0) {
            showNoResultsMessage();
        } else {
            hideNoResultsMessage();
        }
    });
}

function showNoResultsMessage() {
    if ($('#no-results-message').length === 0) {
        const noResultsHTML = `
            <div id="no-results-message" class="container mt-4">
                <div class="row justify-content-center">
                    <div class="col-md-8 text-center">
                        <div class="alert alert-info">
                            <h5>No movies found</h5>
                            <p>Try searching with different keywords or check your spelling.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('.card-group').after(noResultsHTML);
    }
}

function hideNoResultsMessage() {
    $('#no-results-message').remove();
}

// Task 2: Autocomplete Search Suggestions
function initializeAutocomplete() {
    const movieSuggestions = [
        "Breaking Bad",
        "Better Call Saul", 
        "El Camino",
        "Action Movies",
        "Drama Series",
        "Crime Shows",
        "Netflix Originals",
        "TV Series",
        "Movie Collection",
        "Cinema Experience"
    ];
    
    let autocompleteContainer;
    
    $('#movie-search').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        
        if (searchTerm.length < 2) {
            hideAutocomplete();
            return;
        }
        
        const filteredSuggestions = movieSuggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(searchTerm)
        );
        
        if (filteredSuggestions.length > 0) {
            showAutocomplete(filteredSuggestions);
        } else {
            hideAutocomplete();
        }
    });
    
    // Hide autocomplete when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#movie-search, #autocomplete-dropdown').length) {
            hideAutocomplete();
        }
    });
    
    function showAutocomplete(suggestions) {
        hideAutocomplete(); // Remove existing dropdown
        
        autocompleteContainer = $('<div id="autocomplete-dropdown" class="autocomplete-dropdown"></div>');
        
        suggestions.slice(0, 5).forEach(suggestion => {
            const item = $(`<div class="autocomplete-item">${suggestion}</div>`);
            item.on('click', function() {
                $('#movie-search').val(suggestion);
                hideAutocomplete();
                $('#movie-search').trigger('keyup'); // Trigger search
            });
            autocompleteContainer.append(item);
        });
        
        $('#movie-search').after(autocompleteContainer);
    }
    
    function hideAutocomplete() {
        $('#autocomplete-dropdown').remove();
    }
}

// Task 3: Search Highlighting
function initializeSearchHighlighting() {
    let originalContent = {};
    
    $('#movie-search').on('keyup', function() {
        const searchTerm = $(this).val().trim();
        
        if (searchTerm.length === 0) {
            // Restore original content
            restoreOriginalContent();
            return;
        }
        
        // Store original content if not already stored
        $('.movie-card').each(function() {
            const card = $(this);
            const cardId = card.attr('data-movie');
            
            if (!originalContent[cardId]) {
                originalContent[cardId] = {
                    title: card.find('.card-title').html(),
                    description: card.find('.card-text').html()
                };
            }
        });
        
        // Highlight matching text
        highlightSearchTerm(searchTerm);
    });
    
    function highlightSearchTerm(searchTerm) {
        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
        
        $('.movie-card').each(function() {
            const card = $(this);
            const cardId = card.attr('data-movie');
            
            // Highlight in title
            const originalTitle = originalContent[cardId].title;
            const highlightedTitle = originalTitle.replace(regex, '<mark class="search-highlight">$1</mark>');
            card.find('.card-title').html(highlightedTitle);
            
            // Highlight in description
            const originalDescription = originalContent[cardId].description;
            const highlightedDescription = originalDescription.replace(regex, '<mark class="search-highlight">$1</mark>');
            card.find('.card-text').html(highlightedDescription);
        });
    }
    
    function restoreOriginalContent() {
        $('.movie-card').each(function() {
            const card = $(this);
            const cardId = card.attr('data-movie');
            
            if (originalContent[cardId]) {
                card.find('.card-title').html(originalContent[cardId].title);
                card.find('.card-text').html(originalContent[cardId].description);
            }
        });
    }
    
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Additional jQuery enhancements
$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800);
        }
    });
    
    // Enhanced form validation with jQuery
    $('#subscriptionForm').on('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const errors = [];
        
        // Validate first name
        if (!$('#firstName').val().trim()) {
            errors.push('First name is required');
            isValid = false;
        }
        
        // Validate last name
        if (!$('#lastName').val().trim()) {
            errors.push('Last name is required');
            isValid = false;
        }
        
        // Validate email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.push('Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            errors.push('Please enter a valid email address');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message with animation
            showSuccessMessage();
        } else {
            // Show error messages
            showErrorMessage(errors);
        }
    });
    
    function showSuccessMessage() {
        const successHTML = `
            <div id="success-message" class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Thank you for subscribing! You will receive updates soon.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        $('#subscriptionForm').before(successHTML);
        $('#subscriptionForm')[0].reset();
        $('#popupForm').hide();
        $('body').css('overflow', 'auto');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            $('#success-message').alert('close');
        }, 5000);
    }
    
    function showErrorMessage(errors) {
        const errorHTML = `
            <div id="error-message" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Please fix the following errors:</strong>
                <ul class="mb-0">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        $('#subscriptionForm').before(errorHTML);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            $('#error-message').alert('close');
        }, 8000);
    }
    
    // Enhanced movie card interactions with jQuery
    $('.movie-card').hover(
        function() {
            $(this).addClass('card-hover');
        },
        function() {
            $(this).removeClass('card-hover');
        }
    );
    
    // Animate elements on scroll
    $(window).on('scroll', function() {
        $('.movie-card').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    });
});

// Feedback Search Functionality
function initializeFeedbackSearch() {
    // Add search bar to feedback page if it exists
    if ($('.feedback-container').length > 0) {
        addFeedbackSearchBar();
        initializeFeedbackLiveFilter();
    }
}

function addFeedbackSearchBar() {
    // Add search bar to feedback page if it doesn't exist
    if ($('#feedback-search-container').length === 0) {
        const searchHTML = `
            <div id="feedback-search-container" class="container mt-4 mb-4">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="search-wrapper">
                            <input type="text" id="feedback-search" class="form-control form-control-lg" 
                                   placeholder="Search feedback by name, content, or rating...">
                            <div class="search-icon">
                                <i class="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert search bar before feedback content
        $('.feedback-container').before(searchHTML);
    }
}

function initializeFeedbackLiveFilter() {
    $('#feedback-search').on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase();
        
        $('.feedback-item, .feedback-card').each(function() {
            const item = $(this);
            const name = item.find('.feedback-name, .name').text().toLowerCase();
            const content = item.find('.feedback-content, .content, .message').text().toLowerCase();
            const rating = item.find('.rating, .stars').text().toLowerCase();
            
            if (name.includes(searchTerm) || content.includes(searchTerm) || rating.includes(searchTerm)) {
                item.show().addClass('search-match');
            } else {
                item.hide().removeClass('search-match');
            }
        });
        
        // Show/hide "no results" message
        const visibleItems = $('.feedback-item:visible, .feedback-card:visible').length;
        if (visibleItems === 0 && searchTerm.length > 0) {
            showFeedbackNoResultsMessage();
        } else {
            hideFeedbackNoResultsMessage();
        }
    });
}

function showFeedbackNoResultsMessage() {
    if ($('#feedback-no-results-message').length === 0) {
        const noResultsHTML = `
            <div id="feedback-no-results-message" class="container mt-4">
                <div class="row justify-content-center">
                    <div class="col-md-8 text-center">
                        <div class="alert alert-info">
                            <h5>No feedback found</h5>
                            <p>Try searching with different keywords or check your spelling.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('.feedback-container').after(noResultsHTML);
    }
}

function hideFeedbackNoResultsMessage() {
    $('#feedback-no-results-message').remove();
}
