document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.btn');
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-messages');
    errorContainer.style.color = 'red';
    errorContainer.style.marginBottom = '10px';
    form.insertBefore(errorContainer, form.querySelector('.form-footer'));

    const validUser = {
        username: 'admin',
        password: '123456'
    };

    function showError(message) {
        errorContainer.innerHTML = message;
        errorContainer.style.display = 'block';
    }

    function clearErrors() {
        errorContainer.innerHTML = '';
        errorContainer.style.display = 'none';
    }

    function validateForm() {
        let isValid = true;
        let errorMessage = '';

        const username = usernameInput.value.trim();
        if (username === '') {
            errorMessage += 'Login cannot be empty.<br>';
            isValid = false;
        } else if (username.length < 3) {
            errorMessage += 'The login must contain at least 3 characters.<br>';
            isValid = false;
        }

        const password = passwordInput.value.trim();
        if (password === '') {
            errorMessage += 'The password cannot be empty.<br>';
            isValid = false;
        } else if (password.length < 6) {
            errorMessage += 'The password must contain at least 6 characters.<br>';
            isValid = false;
        }

        if (isValid && (username !== validUser.username || password !== validUser.password)) {
            errorMessage += 'Incorrect username or password.<br>';
            isValid = false;
        }

        if (!isValid) {
            showError(errorMessage);
        } else {
            clearErrors();
        }

        return isValid;
    }

    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        if (validateForm()) {

            window.location.href = '../index.html';
        }
    });

    usernameInput.addEventListener('input', clearErrors);
    passwordInput.addEventListener('input', clearErrors);
});


