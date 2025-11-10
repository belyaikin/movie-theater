// ╔══════════════════════════════════════════════════╗
// ║      ВСЁ В ОДНОМ ФАЙЛЕ — РАБОТАЕТ НА 100%         ║
// ║  Тема + Авторизация + Navbar + Бургер + Дропдаун ║
// ╚══════════════════════════════════════════════════╝

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleBtn = document.getElementById('toggle-btn');
    const loginBtnNav = document.getElementById('loginBtnNav');
    const userGreeting = document.getElementById('userGreeting');
    const logoutBtn = document.getElementById('logoutBtn');
    const authContainer = document.querySelector('.auth-container');
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    // ==================== 1. ТЕМА ====================
    if (toggleBtn) {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'day') {
            body.classList.add('day-theme');
            toggleBtn.innerText = '☀️';
        } else {
            body.classList.remove('day-theme');
            toggleBtn.innerText = '🌙';
            if (!savedTheme) localStorage.setItem('theme', 'night');
        }

        toggleBtn.addEventListener('click', () => {
            if (body.classList.contains('day-theme')) {
                body.classList.remove('day-theme');
                toggleBtn.innerText = '🌙';
                localStorage.setItem('theme', 'night');
            } else {
                body.classList.add('day-theme');
                toggleBtn.innerText = '☀️';
                localStorage.setItem('theme', 'day');
            }
            toggleBtn.style.transform = 'scale(0.9)';
            setTimeout(() => toggleBtn.style.transform = '', 150);
        });
    }

    // ==================== 2. АВТОРИЗАЦИЯ ====================
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        if (loginBtnNav) loginBtnNav.style.display = 'none';
        if (userGreeting) {
            userGreeting.textContent = `Привет, ${user.username}!`;
            userGreeting.style.display = 'inline';
        }
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (authContainer) authContainer.style.display = 'none';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            location.reload();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username === 'admin' && password === '123456') {
                localStorage.setItem('user', JSON.stringify({ username: 'admin' }));
                document.querySelector('#loginBtn').textContent = 'Успех!';
                setTimeout(() => location.href = '../index.html', 800);
            } else {
                errorMsg.textContent = 'Incorrect username or password';
                errorMsg.style.animation = 'shake 0.5s';
                setTimeout(() => errorMsg.style.animation = '', 500);
            }
        });
    }

    // ==================== 3. NAVBAR (бургер + дропдаун) ====================
    // Бургер
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = dropdownToggle?.nextElementSibling;

    if (dropdownToggle && dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
        dropdownToggle.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', e => {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') dropdownMenu.classList.remove('show');
        });
    }
});

// Анимация shake (если нет в CSS)
if (!document.getElementById('shake-style')) {
    const style = document.createElement('style');
    style.id = 'shake-style';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .day-theme { 
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important; 
            transition: all 0.4s ease; 
        }
        .day-theme .navbar { background: white !important; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .day-theme .navbar-brand img { filter: brightness(0); }
    `;
    document.head.appendChild(style);
}