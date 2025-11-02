document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('languageSelect');
    
    loadSavedLanguage();
    
    languageSelect.addEventListener('change', function() {
        const selectedLang = this.value;
        changeLanguage(selectedLang);
        saveLanguage(selectedLang);
    });
    
    function changeLanguage(lang) {
        switch (lang) {
            case 'ru':
                updateContentRussian();
                break;
            case 'kk':
                updateContentKazakh();
                break;
            case 'en':
                updateContentEnglish();
                break;
            default:
                updateContentRussian(); 
        }
    }
    
    function updateContentRussian() {
        document.querySelector('.hero-title').innerHTML = 
            '<span class="star">★</span>Добро пожаловать в Duo.kz!<span class="star">★</span>';
        document.querySelector('.hero-text').textContent = 
            'Мы команда киноманов, создающая удобный сайт для любителей кино.';
        document.querySelector('.hero-subtitle').textContent = 
            'На нашем портале вы можете найти информацию о новых фильмах, купить билеты и следить за рейтингами любимых фильмов.';
        
        document.querySelector('.section-title').innerHTML = 
            '<span class="title-line"></span>Наша команда<span class="title-line"></span>';
        
        const teamNames = document.querySelectorAll('.card-name');
        const teamRoles = document.querySelectorAll('.card-role');
        
        teamNames[0].textContent = 'Дмитрий Белякин';
        teamNames[1].textContent = 'Даниал Мырзатаев';
        
        teamRoles[0].textContent = 'UX/UI дизайнер';
        teamRoles[1].textContent = 'UX/UI дизайнер и Frontend разработчик';
        
        document.querySelector('.footer-text').innerHTML = 
            'Этот сайт создан <span class="highlight">Даниалом Мырзатаевым</span> и <span class="highlight">Дмитрием Белякиным</span>';
        
        updateNavbarRussian();
    }
    
    function updateContentKazakh() {
        document.querySelector('.hero-title').innerHTML = 
            '<span class="star">★</span>Duo.kz-ге қош келдіңіз!<span class="star">★</span>';
        document.querySelector('.hero-text').textContent = 
            'Біз кино сүйер адамдар тобымыз, кино сүйгіштерге арналған ыңғайлы сайт жасаймыз.';
        document.querySelector('.hero-subtitle').textContent = 
            'Порталымызда жаңа фильмдер туралы ақпарат табуға, билет сатып алуға және сүйікті фильмдеріңіздің рейтингтерін бақылауға болады.';
        
        document.querySelector('.section-title').innerHTML = 
            '<span class="title-line"></span>Біздің команда<span class="title-line"></span>';
        
        const teamNames = document.querySelectorAll('.card-name');
        const teamRoles = document.querySelectorAll('.card-role');
        
        teamNames[0].textContent = 'Дмитрий Белякин';
        teamNames[1].textContent = 'Даниал Мырзатаев';
        
        teamRoles[0].textContent = 'UX/UI дизайнер';
        teamRoles[1].textContent = 'UX/UI дизайнер және Frontend әзірлеуші';
        
        document.querySelector('.footer-text').innerHTML = 
            'Бұл сайт <span class="highlight">Даниал Мырзатаев</span> және <span class="highlight">Дмитрий Белякин</span> жасаған';
        
        updateNavbarKazakh();
    }
    
    function updateContentEnglish() {
        document.querySelector('.hero-title').innerHTML = 
            '<span class="star">★</span>Welcome to Duo.kz!<span class="star">★</span>';
        document.querySelector('.hero-text').textContent = 
            'We are a team of film enthusiasts creating a convenient website for movie lovers.';
        document.querySelector('.hero-subtitle').textContent = 
            'On our portal you can find information about new films, buy tickets and follow the ratings of your favorite films.';
        
        document.querySelector('.section-title').innerHTML = 
            '<span class="title-line"></span>Our Team<span class="title-line"></span>';
        
        const teamNames = document.querySelectorAll('.card-name');
        const teamRoles = document.querySelectorAll('.card-role');
        
        teamNames[0].textContent = 'Dmitriy Belyaikin';
        teamNames[1].textContent = 'Danial Myrzatayev';
        
        teamRoles[0].textContent = 'UX/UI Designer';
        teamRoles[1].textContent = 'UX/UI Designer & Frontend Developer';
        
        document.querySelector('.footer-text').innerHTML = 
            'This website was made by <span class="highlight">Danial Myrzatayev</span> and <span class="highlight">Dmitriy Belyaikin</span>';
        
        updateNavbarEnglish();
    }
    
    function updateNavbarRussian() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks[0].textContent = 'Фильмы';
        navLinks[1].textContent = 'Билеты';
        navLinks[2].textContent = 'Популярное';
        navLinks[3].textContent = 'Кафе';
        navLinks[4].textContent = 'О нас';
        navLinks[5].textContent = 'Отзывы';
    }
    
    function updateNavbarKazakh() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks[0].textContent = 'Фильмдер';
        navLinks[1].textContent = 'Билеттер';
        navLinks[2].textContent = 'Популярлы';
        navLinks[3].textContent = 'Кафе';
        navLinks[4].textContent = 'Біз туралы';
        navLinks[5].textContent = 'Пікірлер';
    }
    
    function updateNavbarEnglish() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks[0].textContent = 'Movies';
        navLinks[1].textContent = 'Tickets';
        navLinks[2].textContent = 'Popular';
        navLinks[3].textContent = 'Cafe';
        navLinks[4].textContent = 'About';
        navLinks[5].textContent = 'Feedbacks';
    }
    
    function saveLanguage(lang) {
        localStorage.setItem('selectedLanguage', lang);
    }
    
    function loadSavedLanguage() {
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang) {
            languageSelect.value = savedLang;
            changeLanguage(savedLang);
        }
    }
});

$(document).ready(function() {
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height();
        var winHeight = $(window).height();
        var scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        $('#progress-bar').css('width', scrollPercent + '%');
    });
});
