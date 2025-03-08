// Gallery Page JavaScript - Handles the Before/After slider and filtering

// DOM Elements
const sliders = document.querySelectorAll('.slider');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// Handle scroll indicator click
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the first section after the header
            const galleryFilterContainer = document.querySelector('.gallery-filter-container');
            
            if (galleryFilterContainer) {
                // Calculate header height for offset
                const headerHeight = document.getElementById('main-nav').offsetHeight;
                
                // Scroll to the filter section
                window.scrollTo({
                    top: galleryFilterContainer.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
        
        // Make sure the cursor changes to pointer to indicate it's clickable
        scrollIndicator.style.cursor = 'pointer';
    }
});

// Initialize before-after sliders
sliders.forEach(slider => {
    const beforeAfter = slider.closest('.before-after');
    const beforeImg = beforeAfter.querySelector('.before-img');
    
    // Set initial position
    let sliderPosition = 50; // percentage
    updateSliderPosition(beforeImg, slider, sliderPosition);
    
    let isActive = false;
    
    // Mouse events
    slider.addEventListener('mousedown', () => {
        isActive = true;
        beforeAfter.classList.add('active');
    });
    
    window.addEventListener('mouseup', () => {
        if (isActive) {
            isActive = false;
            beforeAfter.classList.remove('active');
        }
    });
    
    beforeAfter.addEventListener('mousemove', (e) => {
        if (!isActive) return;
        
        e.preventDefault(); // Prevent selection during drag
        let position = getCursorPosition(beforeAfter, e);
        sliderPosition = (position / beforeAfter.offsetWidth) * 100;
        
        // Restrict slider position
        if (sliderPosition < 0) sliderPosition = 0;
        if (sliderPosition > 100) sliderPosition = 100;
        
        // Update slider and image position
        updateSliderPosition(beforeImg, slider, sliderPosition);
    });
    
    // Touch events for mobile
    slider.addEventListener('touchstart', () => {
        isActive = true;
        beforeAfter.classList.add('active');
    });
    
    window.addEventListener('touchend', () => {
        if (isActive) {
            isActive = false;
            beforeAfter.classList.remove('active');
        }
    });
    
    window.addEventListener('touchcancel', () => {
        if (isActive) {
            isActive = false;
            beforeAfter.classList.remove('active');
        }
    });
    
    beforeAfter.addEventListener('touchmove', (e) => {
        if (!isActive) return;
        
        e.preventDefault(); // Prevent scrolling during drag
        let position = getTouchPosition(beforeAfter, e);
        sliderPosition = (position / beforeAfter.offsetWidth) * 100;
        
        // Restrict slider position
        if (sliderPosition < 0) sliderPosition = 0;
        if (sliderPosition > 100) sliderPosition = 100;
        
        // Update slider and image position
        updateSliderPosition(beforeImg, slider, sliderPosition);
    });
    
    // Double click to reset to middle
    beforeAfter.addEventListener('dblclick', () => {
        sliderPosition = 50;
        updateSliderPosition(beforeImg, slider, sliderPosition);
    });
});

// Helper function to update slider position
function updateSliderPosition(beforeImg, slider, position) {
    // Position is a percentage (0-100)
    slider.style.left = `${position}%`;
    beforeImg.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
}

// Helper function to get cursor position
function getCursorPosition(element, event) {
    const rect = element.getBoundingClientRect();
    return event.clientX - rect.left;
}

// Helper function to get touch position
function getTouchPosition(element, event) {
    const rect = element.getBoundingClientRect();
    return event.touches[0].clientX - rect.left;
}

// Gallery filter functionality
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter the gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    
                    // Reset the slider positions when items become visible
                    const beforeImg = item.querySelector('.before-img');
                    const slider = item.querySelector('.slider');
                    if (beforeImg && slider) {
                        updateSliderPosition(beforeImg, slider, 50);
                    }
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Add seductive reveal animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Animate gallery headers
    const galleryHeader = document.querySelector('.gallery-header-content');
    if (galleryHeader) {
        galleryHeader.classList.add('revealed');
    }
    
    // Delay gallery item animations
    setTimeout(() => {
        galleryItems.forEach((item, index) => {
            // Set animation delay based on item position
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('revealed');
        });
    }, 300);
});

// Enhanced hover effects for gallery items
galleryItems.forEach(item => {
    const beforeAfter = item.querySelector('.before-after');
    
    beforeAfter.addEventListener('mouseenter', () => {
        // Add subtle motion to the slider when hovering
        const slider = item.querySelector('.slider');
        slider.classList.add('pulse');
        
        // Lighting effect
        beforeAfter.classList.add('highlighted');
    });
    
    beforeAfter.addEventListener('mouseleave', () => {
        const slider = item.querySelector('.slider');
        slider.classList.remove('pulse');
        beforeAfter.classList.remove('highlighted');
    });
});
