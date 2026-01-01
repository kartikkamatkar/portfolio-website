// Mouse Interactions
document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initParallaxEffects();
    initRippleEffects();
    initHoverEffects();
});

// Custom Cursor
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Interactive elements hover effect
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .future-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.width = '16px';
            cursorDot.style.height = '16px';
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = 'var(--accent-light)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'var(--accent)';
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Hero title parallax
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            heroTitle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        // Gallery images parallax
        galleryImages.forEach((img, index) => {
            const speed = 0.05 * (index + 1);
            const moveX = (mouseX - 0.5) * 30 * speed;
            const moveY = (mouseY - 0.5) * 30 * speed;
            img.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Other parallax elements
        parallaxElements.forEach(el => {
            const depth = parseFloat(el.dataset.depth) || 0.5;
            const moveX = (mouseX - 0.5) * 50 * depth;
            const moveY = (mouseY - 0.5) * 50 * depth;
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Ripple Effects
function initRippleEffects() {
    const buttons = document.querySelectorAll('.btn, .skill-card, .project-card');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Hover Effects
function initHoverEffects() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .future-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}