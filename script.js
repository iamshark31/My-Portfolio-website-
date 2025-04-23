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

// Active menu item handling
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

// Update active menu item based on scroll position
function updateActiveMenuItem() {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Listen for scroll events to update active menu item
window.addEventListener('scroll', updateActiveMenuItem);
// Initial check for active menu item
updateActiveMenuItem();

// Menu hover effect with particles
const menuParticles = [];
let isHoveringMenu = false;
let hoverX = 0;
let hoverY = 0;

navLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        isHoveringMenu = true;
        const rect = link.getBoundingClientRect();
        hoverX = rect.left + rect.width / 2;
        hoverY = rect.top + rect.height / 2;

        // Create particle burst effect
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'menu-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #3b82f6;
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                opacity: 0;
                top: ${hoverY}px;
                left: ${hoverX}px;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 / 5) * i;
            const velocity = 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            menuParticles.push({
                element: particle,
                vx,
                vy,
                life: 1
            });
        }
    });

    link.addEventListener('mouseleave', () => {
        isHoveringMenu = false;
    });
});

// Animate menu particles
function animateMenuParticles() {
    for (let i = menuParticles.length - 1; i >= 0; i--) {
        const particle = menuParticles[i];
        particle.life -= 0.02;
        
        if (particle.life <= 0) {
            particle.element.remove();
            menuParticles.splice(i, 1);
            continue;
        }
        
        const currentLeft = parseFloat(particle.element.style.left);
        const currentTop = parseFloat(particle.element.style.top);
        
        particle.element.style.left = `${currentLeft + particle.vx}px`;
        particle.element.style.top = `${currentTop + particle.vy}px`;
        particle.element.style.opacity = particle.life;
    }
    
    requestAnimationFrame(animateMenuParticles);
}

animateMenuParticles(); 