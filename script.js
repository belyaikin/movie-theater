document.addEventListener('DOMContentLoaded', function() {
    displayTime(); 
    initializeThemeToggle(); 
});

function initializeThemeToggle() {
    const dayNightToggle = document.getElementById('dayNightToggle');
    const body = document.body;
    
    if (!dayNightToggle) return;

    const savedTheme = localStorage.getItem('siteTheme');

    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        dayNightToggle.innerHTML = '🌙 Night Mode';
    } else {
        dayNightToggle.innerHTML = '☀️ Day Mode';
    }
    dayNightToggle.addEventListener('click', function() {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            this.innerHTML = '☀️ Day Mode';
            localStorage.setItem('siteTheme', 'dark');
        } else {
            body.classList.add('light-theme');
            this.innerHTML = '🌙 Night Mode';
            localStorage.setItem('siteTheme', 'light');
        }
    });
}



function displayTime() {
    const timeElement = document.getElementById('time');
    if (timeElement) {
        function updateTime() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}`;
        }
        updateTime();
        setInterval(updateTime, 1000);
    }
}
// для управления выпадающим меню навигационной панели

document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.getElementById('navbarDropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');


    dropdownToggle.addEventListener('click', function () {
        dropdownMenu.classList.toggle('show');
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.getElementById('navbarSupportedContent');
    const togglerIcon = navbarToggler.querySelector('.navbar-toggler-icon'); // Находим иконку кнопки

    navbarToggler.addEventListener('click', function () {
        navbarMenu.classList.toggle('collapse');

        // Меняем класс для иконки, чтобы переключить состояние
        togglerIcon.classList.toggle('opened'); // Можно добавить свой класс для изменения иконки
    });
});