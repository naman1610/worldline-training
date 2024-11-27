// Product Carousel Functionality
const carouselSlides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

function nextSlide() {
    carouselSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    carouselSlides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 5000);

// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert('Thank you for your inquiry! We will get back to you soon.');
        this.reset();
    }
});

// Dynamic Statistics Counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const counter = setInterval(() => {
        current += increment;
        element.textContent = Math.round(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        }
    }, 20);
}

// Trigger counters when page loads
window.addEventListener('load', () => {
    animateCounter(
        document.getElementById('clients-served'), 
        250
    );
    animateCounter(
        document.getElementById('ai-models'), 
        150
    );
    animateCounter(
        document.getElementById('industries-impacted'), 
        50
    );
});