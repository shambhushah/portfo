// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Typewriter Effect
function typeWriter(element, texts, speed = 100, delayBetweenTexts = 2000) {
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        const currentText = texts[textIndex];
        element.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            setTimeout(() => {
                element.style.opacity = '0';
                setTimeout(() => {
                    textIndex = (textIndex + 1) % texts.length;
                    charIndex = 0;
                    element.textContent = '';
                    element.style.opacity = '1';
                    type();
                }, 300);
            }, delayBetweenTexts);
            return;
        }

        setTimeout(type, speed);
    }

    type();
}

// Initialize typewriter
const typewriterElement = document.getElementById('typewriter');
const jobTitleElement = document.getElementById('jobTitle');

if (typewriterElement) {
    // Static text for name
    typewriterElement.textContent = 'Shambhu';
}

if (jobTitleElement) {
    typeWriter(jobTitleElement, ['I am Software Engineer', 'I am a Passionate Developer'], 60, 2400);
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
const cvToggle = document.querySelector('.cv-toggle');
const cvMenu = document.querySelector('.cv-menu');

function updateActiveNav(sectionId) {
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

if (cvToggle && cvMenu) {
    cvToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        cvMenu.classList.toggle('active');
    });
}

document.addEventListener('click', function() {
    if (cvMenu) {
        cvMenu.classList.remove('active');
    }
});

// Close menu when a link is clicked

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (!this.classList.contains('cv-toggle')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ==================== EXPERIENCE CARD TOGGLE ====================
// Simple and direct experience card toggle
document.addEventListener('DOMContentLoaded', function() {
    // Get all experience toggle buttons
    const experienceButtons = document.querySelectorAll('.experience-toggle');
    
    experienceButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Get the parent card
            const card = this.closest('.experience-card');
            if (!card) return;
            
            // Check if this card is open
            const isOpen = card.classList.contains('open');
            
            // Close all experience cards
            document.querySelectorAll('.experience-card').forEach(c => {
                c.classList.remove('open');
            });
            
            // Open this card if it wasn't already open
            if (!isOpen) {
                card.classList.add('open');
            }
        });
    });
});

// ==================== SCROLL HIGHLIGHTING ====================
// Highlight nav link based on scroll position
function highlightActiveSection() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 70;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('a.nav-link[href^="#"]');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Check if section is currently in view
        if (window.scrollY >= sectionTop - navbarHeight - 100 && 
            window.scrollY < sectionTop + sectionHeight - navbarHeight - 100) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSectionId) {
            link.classList.add('active');
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', highlightActiveSection);

// Call on scroll with throttling
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        highlightActiveSection();
    }, 50);
}, { passive: true });

// ==================== SMOOTH SCROLLING ====================
// Smooth scroll when clicking nav links and update active state
document.querySelectorAll('a[href^="#"]:not(.cv-link)').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Update active nav link
            document.querySelectorAll('a.nav-link[href^="#"]').forEach(l => {
                l.classList.remove('active');
            });
            document.querySelector(`a.nav-link[href="${href}"]`)?.classList.add('active');
            
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const hamburger = document.getElementById('hamburger');
                if (hamburger) hamburger.classList.remove('active');
            }
        }
    });
});

// EmailJS Configuration
emailjs.init('q1hWBVAWRcbEnnRMY'); // Replace with your EmailJS public key

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Send email using EmailJS
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_email: 'shambhushah455@gmail.com'
        };
        
        emailjs.send('service_6sp56qg', 'template_2xvdx2p', templateParams)
            .then(function(response) {
                alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);
                contactForm.reset();
            }, function(error) {
                alert('Oops! Something went wrong. Please try again.');
                console.error('EmailJS error:', error);
            });
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill cards and education cards
document.querySelectorAll('.skill-card, .education-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add keyframe animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Scroll-spy navigation: update active nav based on scroll position
const sections = document.querySelectorAll('.section');

function getCurrentSection() {
    let currentSection = 'home';
    const triggerPoint = 140; // section begins around this point from top

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
            currentSection = section.id;
        }
    });

    return currentSection;
}

window.addEventListener('scroll', function() {
    updateActiveNav(getCurrentSection());
});

window.addEventListener('load', function() {
    updateActiveNav(getCurrentSection());
});
