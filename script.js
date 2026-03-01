// AOS initialization
AOS.init({
    duration: 1000,
    once: true,
    offset: 80
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking a link (mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll to top button
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Typing animation (only on index)
const typingElement = document.getElementById('typing-text');
if (typingElement) {
    const phrases = [
        "Professional Construction Services",
        "Architectural & Structural Experts",
        "Building Dreams Across South Sudan",
        "Quality. Durability. Excellence."
    ];
    let i = 0, j = 0, isDeleting = false;

    function type() {
        if (i < phrases.length) {
            if (!isDeleting && j <= phrases[i].length) {
                typingElement.textContent = phrases[i].substring(0, j);
                j++;
                setTimeout(type, 100);
            } else if (isDeleting && j > 0) {
                typingElement.textContent = phrases[i].substring(0, j-1);
                j--;
                setTimeout(type, 60);
            } else {
                if (!isDeleting && j === phrases[i].length+1) {
                    isDeleting = true;
                    setTimeout(type, 1500);
                } else if (isDeleting && j === 0) {
                    isDeleting = false;
                    i = (i + 1) % phrases.length;
                    setTimeout(type, 300);
                }
            }
        }
    }
    type();
}

// Counters (only on pages with .count)
const counters = document.querySelectorAll('.count');
if (counters.length > 0) {
    const counterSection = document.getElementById('counter-section');
    let counted = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const current = +counter.innerText;
                        const increment = target / 80;
                        if (current < target) {
                            counter.innerText = Math.ceil(current + increment);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    }, { threshold: 0.3 });
    if (counterSection) observer.observe(counterSection);
}

// Lightbox (if exists)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('closeLightbox');

if (lightbox) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        });
    });

    closeLightbox.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });
}

// Contact form demo
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out. We will contact you shortly.');
    });
}
