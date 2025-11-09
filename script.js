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
    const togglerIcon = navbarToggler.querySelector('.navbar-toggler-icon');

    navbarToggler.addEventListener('click', function () {
        navbarMenu.classList.toggle('collapse');

        // Меняем класс для иконки, чтобы переключить состояние
        togglerIcon.classList.toggle('opened');
    });
});
