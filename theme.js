const toggle = document.getElementById('toggle-btn');
const body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'day') {
    toggle.innerText = "☀️";
    body.classList.toggle('day-theme');
  }
  else if (currentTheme === 'night') {
    toggle.innerText = "🌙";
  }
  else {
    toggle.innerText = "🌙";
  }
});

toggle.addEventListener('click', () => {
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'day') {
    toggle.innerText = "🌙";
    localStorage.setItem('theme', 'night');
  }
  else if (currentTheme === 'night') {
    toggle.innerText = "☀️";
    localStorage.setItem('theme', 'day');
  }

  body.classList.toggle('day-theme')
});
