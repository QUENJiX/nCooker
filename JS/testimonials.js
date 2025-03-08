// Testimonials Slider JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Testimonials Slider functionality
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    if (!testimonialsSlider) return; // Exit if testimonials slider doesn't exist on page
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Create dots based on number of slides
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('data-index', index);
        dotsContainer.appendChild(dot);
        
        // Add click event to each dot
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    const allDots = document.querySelectorAll('.dot');
    
    // Previous slide button functionality
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }
    
    // Next slide button functionality
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }
    
    // Function to navigate to specific slide
    function goToSlide(index) {
        // Handle wrapping around slides
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        
        // Calculate slide position
        const slidePosition = -index * 100 + '%';
        testimonialsSlider.style.transform = `translateX(${slidePosition})`;
        
        // Update dots to show current slide
        allDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Update current index
        currentIndex = index;
    }
    
    // Auto slide functionality
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto sliding
    startAutoSlide();
    
    // Pause auto slide on hover
    testimonialsSlider.addEventListener('mouseenter', stopAutoSlide);
    testimonialsSlider.addEventListener('mouseleave', startAutoSlide);
    
    // Add swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialsSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoSlide();
    });
    
    testimonialsSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
        startAutoSlide();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe
        const difference = touchStartX - touchEndX;
        
        if (difference > swipeThreshold) {
            // Swipe left - go to next slide
            goToSlide(currentIndex + 1);
        } else if (difference < -swipeThreshold) {
            // Swipe right - go to previous slide
            goToSlide(currentIndex - 1);
        }
    }
    
    // Add elegant fade-in effect to testimonials when they come into view
    const testimonialSection = document.querySelector('.testimonials-section');
    
    const fadeInOnScroll = () => {
        if (!testimonialSection) return;
        
        const sectionTop = testimonialSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (sectionTop < triggerPoint) {
            testimonialSection.classList.add('fade-in-visible');
            window.removeEventListener('scroll', fadeInOnScroll);
        }
    };
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Check on initial load
    
    // Add seductive pulsing effect to active dot
    function addPulseToActiveDot() {
        document.querySelectorAll('.dot.active').forEach(dot => {
            dot.classList.add('pulse');
            
            // Remove the class after animation completes to allow it to be added again
            setTimeout(() => {
                dot.classList.remove('pulse');
            }, 1000);
        });
    }
    
    setInterval(addPulseToActiveDot, 2000);
});

// Add CSS styles for testimonial animations directly via JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        /* Testimonial Animations */
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .testimonials-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .testimonials-section.fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .dot.pulse {
            animation: pulse 1s ease;
        }
        
        .testimonial-slide {
            opacity: 0;
            animation: fadeIn 0.5s forwards;
        }
        
        .testimonial-slide:nth-child(1) {
            animation-delay: 0.2s;
        }
        
        .testimonial-slide:nth-child(2) {
            animation-delay: 0.3s;
        }
        
        .testimonial-slide:nth-child(3) {
            animation-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
});
