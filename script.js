// Mobile Menu Toggle
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('mobile-menu-active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('mobile-menu-active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('mobile-menu-active');
        }
    });
});

// Section transitions
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const section = entry.target;
        section.classList.remove('section-hidden');
        
        // Add animation classes to children
        section.querySelectorAll('.animate-on-scroll').forEach((element, index) => {
            element.style.animationDelay = `${index * 200}ms`;
            element.classList.add('animate-fadeIn');
        });

        // Stop observing after animation
        observer.unobserve(section);
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-hidden');
    observer.observe(section);
});

// Skill icons animation
document.querySelectorAll('.skill-icon').forEach((icon, index) => {
    icon.style.animationDelay = `${index * 100}ms`;
    icon.classList.add('animate-scaleIn');
});

// Project cards animation
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 200}ms`;
    card.classList.add('animate-slideIn');
});

// Form submission handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        
        // Show success message with animation
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg animate-fadeIn';
        successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        document.body.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('animate-fadeOut');
            setTimeout(() => successMessage.remove(), 1000);
        }, 5000);
        
        // Clear form
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg animate-fadeIn';
        errorMessage.textContent = 'There was an error sending your message. Please try again.';
        document.body.appendChild(errorMessage);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('animate-fadeOut');
            setTimeout(() => errorMessage.remove(), 1000);
        }, 5000);
    }
}); 