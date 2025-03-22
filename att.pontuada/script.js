const themeToggle = document.getElementById('themeToggle');
const toggleText = document.querySelector('.toggle-text');
const toggleIcon = document.querySelector('.theme-icon');
const contactForm = document.getElementById('contactForm');
const greetingElement = document.getElementById('greeting');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const successMessage = document.getElementById('successMessage');

function setInitialTheme() {
    const currentHour = new Date().getHours();
    const isDarkModeTime = currentHour >= 18 || currentHour < 6;
    
    if (isDarkModeTime) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleText.textContent = 'Modo Claro';
        toggleIcon.classList.remove('fa-moon');
        toggleIcon.classList.add('fa-sun');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        toggleText.textContent = 'Modo Escuro';
        toggleIcon.classList.remove('fa-sun');
        toggleIcon.classList.add('fa-moon');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        toggleText.textContent = 'Modo Escuro';
        toggleIcon.classList.remove('fa-sun');
        toggleIcon.classList.add('fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleText.textContent = 'Modo Claro';
        toggleIcon.classList.remove('fa-moon');
        toggleIcon.classList.add('fa-sun');
    }
}

function getGreeting(name) {
    const hour = new Date().getHours();
    let greeting;
    let icon;
    
    if (hour >= 6 && hour < 12) {
        greeting = `Bom dia, ${name}!`;
        icon = '☀️';
    } else if (hour >= 12 && hour < 18) {
        greeting = `Boa tarde, ${name}!`;
        icon = '🌤️';
    } else {
        greeting = `Boa noite, ${name}!`;
        icon = '🌙';
    }
    
    return `${icon} ${greeting}`;
}

function showGreeting(name) {
    greetingElement.textContent = getGreeting(name);
    greetingElement.classList.add('visible');
    
    setTimeout(() => {
        greetingElement.classList.remove('visible');
    }, 5500);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === '' || emailRegex.test(email);
}

function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    
    if (nameInput.value.trim() === '') {
        nameInput.classList.add('error');
        nameError.innerHTML = '<i class="fas fa-exclamation-circle"></i> Por favor, informe seu nome.';
        isValid = false;
    } else {
        nameInput.classList.remove('error');
        nameError.textContent = '';
    }
    
    if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value.trim())) {
        emailInput.classList.add('error');
        emailError.innerHTML = '<i class="fas fa-exclamation-circle"></i> Por favor, informe um e-mail válido.';
        isValid = false;
    } else {
        emailInput.classList.remove('error');
        emailError.textContent = '';
    }
    
    if (isValid) {
        showGreeting(nameInput.value.trim());
        
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        
        console.log('Formulário enviado:', {
            name: nameInput.value,
            email: emailInput.value,
            message: document.getElementById('message').value
        });
        
        contactForm.reset();
    }
}

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - diameter / 2}px`;
    circle.style.top = `${event.clientY - button.offsetTop - diameter / 2}px`;
    circle.classList.add('ripple');
    
    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

document.addEventListener('DOMContentLoaded', setInitialTheme);
themeToggle.addEventListener('click', toggleTheme);
contactForm.addEventListener('submit', validateForm);

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});