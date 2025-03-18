const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const primaryButton = document.querySelector('.primary-button');

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
}

function toggleTheme() {
    body.classList.add('theme-transition');
    
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
    
    addRippleEffect(themeToggle);
}

function addRippleEffect(button) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    ripple.style.width = ripple.style.height = `${diameter}px`;
    
    ripple.style.left = `${button.clientWidth / 2 - diameter / 2}px`;
    ripple.style.top = `${button.clientHeight / 2 - diameter / 2}px`;
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

if (primaryButton) {
    primaryButton.addEventListener('click', function(e) {
        addRippleEffect(this);
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .hero-content, .hero-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.classList.add('pre-animation');
        observer.observe(element);
    });
}

function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function setupNavHighlight() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

themeToggle.addEventListener('click', toggleTheme);

document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    animateOnScroll();
    setupSmoothScrolling();
    setupNavHighlight();
    
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);
});