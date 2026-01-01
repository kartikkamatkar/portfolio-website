// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initEntryAnimation();
    initSideMenu();
    initScrollAnimations();
    initCurrentYear();
    initContactForm();
    initProjectFilters();
    initHeroEffects();
});

// Entry Animation
function initEntryAnimation() {
    const entryAnimation = document.querySelector('.entry-animation');
    const confettiContainer = document.querySelector('.confetti-container');

    if (!entryAnimation || !confettiContainer) return;

    confettiContainer.innerHTML = "";

    // Firecracker blast
    for (let i = 0; i < 120; i++) {
        const confetti = document.createElement('span');

        confetti.style.background =
            `hsl(${Math.random() * 360}, 100%, 60%)`;

        // Random blast direction
        confetti.style.setProperty('--x', Math.random());
        confetti.style.setProperty('--y', Math.random());

        confettiContainer.appendChild(confetti);
    }

    // Hide after 2 seconds
    setTimeout(() => {
        entryAnimation.classList.add('hide');
    }, 2000);
}

function initSideMenu() {
    const menuToggle = document.querySelector('.side-menu-toggle');
    const sideNav = document.querySelector('.side-nav');
    const closeBtn = document.querySelector('.side-nav-close');

    // OPEN menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sideNav.classList.add('active');
        menuToggle.classList.add('hide'); // 👈 hamburger gayab
    });

    // CLOSE menu (button)
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sideNav.classList.remove('active');
        menuToggle.classList.remove('hide'); // 👈 hamburger wapas
    });

    // CLOSE on outside click
    document.addEventListener('click', (e) => {
        if (!sideNav.contains(e.target) && !menuToggle.contains(e.target)) {
            sideNav.classList.remove('active');
            menuToggle.classList.remove('hide'); // 👈 hamburger wapas
        }
    });

    // Hide menu icon on scroll (tera logic)
    const sideMenu = document.querySelector('.side-menu');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            sideMenu.classList.add('hide-on-scroll');
        } else {
            sideMenu.classList.remove('hide-on-scroll');
        }
    });
}


// Scroll Animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// Current Year in Footer
function initCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        formMessage.textContent = 'Sending message...';
        formMessage.style.color = 'var(--accent)';

        setTimeout(() => {
            formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formMessage.style.color = 'var(--accent-light)';
            form.reset();

            // Reset message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        }, 1500);
    });
}

// Project Filters
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Hero Effects
function initHeroEffects() {
    const heroTitle = document.getElementById('heroTitle');
    const galleryImages = document.querySelectorAll('.gallery-image');

    // Typing effect for changing text
    const texts = ['Java Learner', 'Backend Developer', 'Problem Solver', 'Tech Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    function typeEffect() {
        const currentText = texts[textIndex];
        const changingText = document.getElementById('changing-text');

        if (isDeleting) {
            changingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            changingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseTime);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        const speed = isDeleting ? deleteSpeed : typingSpeed;
        setTimeout(typeEffect, speed);
    }

    // Start typing effect after a delay
    setTimeout(typeEffect, 1000);
}// Scramble Image Gallery Effect
document.addEventListener('mousemove', (e) => {
    const images = document.querySelectorAll('.gallery-img');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    images.forEach((img, index) => {
        const speed = (index % 5 + 1) * 0.02;

        const moveX = (e.clientX - centerX) * speed;
        const moveY = (e.clientY - centerY) * speed;

        img.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.05}deg)`;
    });
});

// Random scattered layout
window.addEventListener('load', () => {
    const images = document.querySelectorAll('.gallery-img');
    const gallery = document.querySelector('.scramble-gallery');

    images.forEach(img => {
        const x = Math.random() * (gallery.clientWidth - 150);
        const y = Math.random() * (gallery.clientHeight - 200);
        const rotate = Math.random() * 20 - 10;

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.transform = `rotate(${rotate}deg)`;
    });
});
// Hero Image Auto Slider
const heroImages = document.querySelectorAll('.hero-img');
let currentIndex = 0;

setInterval(() => {
    heroImages[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % heroImages.length;
    heroImages[currentIndex].classList.add('active');
}, 3000); // ⏱ 3 seconds

// Dynamic subtitle text rotation
const words = [
    "Tech Enthusiast",
    "Java Learner",
    "Backend Developer",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingText = document.getElementById("typing-text");

function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {
        typingText.textContent = currentWord.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 1200);
        }
    } else {
        typingText.textContent = currentWord.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    const speed = isDeleting ? 60 : 100;
    setTimeout(typeEffect, speed);
}

typeEffect();

