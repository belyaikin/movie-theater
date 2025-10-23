document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    const accordion = document.querySelector('.accordion');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const addReviewBtn = document.getElementById('addReviewBtn');
    const reviewModal = document.getElementById('reviewModal');
    const reviewForm = document.getElementById('reviewForm');
    const dayNightToggle = document.getElementById('dayNightToggle');
    const body = document.body;

    accordionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); 
            const header = this.closest('.accordion-header');
            const collapseElement = header.nextElementSibling;
            const isCollapsed = this.classList.contains('collapsed');

            if (isCollapsed) {
                const allCollapseElements = document.querySelectorAll('.accordion-collapse');
                allCollapseElements.forEach(el => {
                    if (el !== collapseElement) {
                        el.classList.remove('show');
                        const btn = el.previousElementSibling.querySelector('.accordion-button');
                        btn.classList.add('collapsed');
                        btn.setAttribute('aria-expanded', 'false');
                    }
                });

                collapseElement.classList.add('show');
                this.classList.remove('collapsed');
                this.setAttribute('aria-expanded', 'true');
            } else {
                collapseElement.classList.remove('show');
                this.classList.add('collapsed');
                this.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const collapse = item.querySelector('.accordion-collapse');
        button.setAttribute('aria-expanded', 'false');
        collapse.setAttribute('aria-labelledby', button.id || 'default');
    });

    const moreFeedbacks = [
        { title: "The sound is great! - Dimash, July 2025", body: "The sound was simply incredible, as if I was in the center of the action!" },
        { title: "Comfortable chairs - Anakonda, September 2025", body: "The chairs are very comfortable, perfect for a long movie." },
        { title: "Friendly staff - Shahrux, May 2025", body: "The staff are very friendly and efficient." },
        { title: "The best popcorn - Myrzayev, October 2025", body: "The most delicious popcorn in the cinema, I'll definitely be back!" },
        { title: "Cleanliness is up to par - Nazarbayev, May 2025", body: "Everything is perfectly clean, very nice." },
        { title: "Amazing 3D - Tokaev, February 2025", body: "The 3D effects were simply mind-blowing!" },
        { title: "Quick ticket purchase - Erasyl, January 2025", body: "I bought tickets in a minute, without queues." },
        { title: "Nice atmosphere - Abay Kunanbai, December 2024", body: "The lighting and interior create a great mood." },
        { title: "Children's menu in the cafe - Archin, November 2024", body: "Children are delighted with the special children's menu." }
    ];

    loadMoreBtn.addEventListener('click', function() {
        if (loadMoreBtn && accordion) {
            moreFeedbacks.forEach(feedback => {
                const item = document.createElement('div');
                item.className = 'accordion-item';
                const collapseId = `collapse-${Date.now()}-${Math.random()}`;
                item.innerHTML = `
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" id="${collapseId}-btn" aria-expanded="false">
                            ${feedback.title}
                        </button>
                    </h2>
                    <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${collapseId}-btn">
                        <div class="accordion-body">
                            ${feedback.body}
                        </div>
                    </div>
                `;
                accordion.appendChild(item);

                const newButton = item.querySelector('.accordion-button');
                newButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    const header = this.closest('.accordion-header');
                    const collapseElement = header.nextElementSibling;
                    const isCollapsed = this.classList.contains('collapsed');

                    if (isCollapsed) {
                        const allCollapseElements = document.querySelectorAll('.accordion-collapse');
                        allCollapseElements.forEach(el => {
                            if (el !== collapseElement) {
                                el.classList.remove('show');
                                const btn = el.previousElementSibling.querySelector('.accordion-button');
                                btn.classList.add('collapsed');
                                btn.setAttribute('aria-expanded', 'false');
                            }
                        });

                        collapseElement.classList.add('show');
                        this.classList.remove('collapsed');
                        this.setAttribute('aria-expanded', 'true');
                    } else {
                        collapseElement.classList.remove('show');
                        this.classList.add('collapsed');
                        this.setAttribute('aria-expanded', 'false');
                    }
                });
            });
            loadMoreBtn.style.display = 'none';
        } else {
            console.error('loadMoreBtn или accordion не найдены');
        }
    });


    if (addReviewBtn && reviewModal && reviewForm && accordion && typeof bootstrap !== 'undefined') {
        const modalInstance = new bootstrap.Modal(reviewModal);

        function handleReviewSubmit(callback) {
            const name = document.getElementById('reviewName').value.trim();
            const text = document.getElementById('reviewText').value.trim();
            const rating = document.querySelector('input[name="rating"]:checked')?.value || 0;

            if (name && text) {
                setTimeout(() => {
                    callback({ success: true, name, text, rating });
                }, 500);
            } else {
                callback({ success: false });
            }
        }

        addReviewBtn.addEventListener('click', () => {
            modalInstance.show();
        });

        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleReviewSubmit((response) => {
                if (response.success) {
                    const item = document.createElement('div');
                    item.className = 'accordion-item';
                    const collapseId = `collapse-${Date.now()}-${Math.random()}`;
                    item.innerHTML = `
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" id="${collapseId}-btn" aria-expanded="false">
                                ${response.name} - Рейтинг: ${response.rating} звезд - ${new Date().toLocaleDateString('ru-RU')}
                            </button>
                        </h2>
                        <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${collapseId}-btn">
                            <div class="accordion-body">
                                ${response.text}
                            </div>
                        </div>
                    `;
                    accordion.appendChild(item);

                    const newButton = item.querySelector('.accordion-button');
                    newButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        const header = this.closest('.accordion-header');
                        const collapseElement = header.nextElementSibling;
                        const isCollapsed = this.classList.contains('collapsed');

                        if (isCollapsed) {
                            const allCollapseElements = document.querySelectorAll('.accordion-collapse');
                            allCollapseElements.forEach(el => {
                                if (el !== collapseElement) {
                                    el.classList.remove('show');
                                    const btn = el.previousElementSibling.querySelector('.accordion-button');
                                    btn.classList.add('collapsed');
                                    btn.setAttribute('aria-expanded', 'false');
                                }
                            });

                            collapseElement.classList.add('show');
                            this.classList.remove('collapsed');
                            this.setAttribute('aria-expanded', 'true');
                        } else {
                            collapseElement.classList.remove('show');
                            this.classList.add('collapsed');
                            this.setAttribute('aria-expanded', 'false');
                        }
                    });

                    reviewForm.reset();
                    modalInstance.hide();
                    alert('Отзыв успешно добавлен!');
                } else {
                    alert('Пожалуйста, заполните все поля.');
                }
            });
        });


        document.addEventListener('keydown', (e) => {
            if (modalInstance._isShown) {
                const ratingInputs = document.querySelectorAll('input[name="rating"]');
                const focused = document.activeElement;

                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    for (let i = 0; i < ratingInputs.length; i++) {
                        if (ratingInputs[i] === focused) {
                            const next = ratingInputs[(i + 1) % ratingInputs.length];
                            next.focus();
                            next.checked = true;
                            break;
                        }
                    }
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    for (let i = 0; i < ratingInputs.length; i++) {
                        if (ratingInputs[i] === focused) {
                            const prev = ratingInputs[(i - 1 + ratingInputs.length) % ratingInputs.length];
                            prev.focus();
                            prev.checked = true;
                            break;
                        }
                    }
                } else if (e.key === 'Enter' && focused.tagName === 'BUTTON' && focused.type === 'submit') {
                    reviewForm.dispatchEvent(new Event('submit'));
                }
            }
        });
    } else {
        console.error('Один или несколько элементов не найдены или bootstrap не загружен:', { addReviewBtn, reviewModal, reviewForm, accordion, bootstrap: typeof bootstrap });
    }

    // Star Rating System
    function initializeStarRating() {
        const stars = document.querySelectorAll('.star');
        const ratingInput = document.getElementById('ratingInput');
        const ratingText = document.getElementById('ratingText');
        
        if (!stars.length || !ratingInput || !ratingText) return;

        let currentRating = 5; // Default rating

        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                currentRating = parseInt(this.dataset.rating);
                updateStarDisplay();
                updateRatingText();
            });

            star.addEventListener('mouseenter', function() {
                const hoverRating = parseInt(this.dataset.rating);
                highlightStars(hoverRating);
            });
        });

        document.getElementById('starRating').addEventListener('mouseleave', function() {
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
            ratingInput.value = currentRating;
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
            ratingText.textContent = ratingTexts[currentRating] || 'Click to rate';
        }

        // Initialize with default rating
        updateStarDisplay();
        updateRatingText();
    }

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

    // Initialize features
    initializeStarRating();
    initializeDayNightToggle();
});
