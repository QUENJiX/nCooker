// Main JavaScript file for nCooker website

// DOM Elements
const mainNav = document.getElementById('main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Prevent right-click on images to protect content
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (
        navLinks && 
        navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.menu-toggle')
    ) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            // Calculate header height for offset
            const headerHeight = mainNav.offsetHeight;
            
            // Scroll to target with offset for header
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll detection
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.85;
        
        if (elementTop < triggerPoint) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add seductive hover effects to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseover', function(e) {
        const x = e.pageX - this.offsetLeft;
        const y = e.pageY - this.offsetTop;
        
        this.style.setProperty('--x', `${x}px`);
        this.style.setProperty('--y', `${y}px`);
    });
});

// Preload images for smoother experience
function preloadImages() {
    const imagesToPreload = document.querySelectorAll('[data-src]');
    
    imagesToPreload.forEach(image => {
        const src = image.getAttribute('data-src');
        if (src) {
            const newImage = new Image();
            newImage.src = src;
            newImage.onload = function() {
                image.src = src;
                image.removeAttribute('data-src');
            };
        }
    });
}

window.addEventListener('load', preloadImages);

// Add elegant loading transitions
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});
