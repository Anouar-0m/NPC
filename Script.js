//JAVASCRIPT

// ─── Custom Cursor ───
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.background = 'var(--neon-pink)';
        cursorRing.style.width = '50px';
        cursorRing.style.height = '50px';
        cursorRing.style.borderColor = 'rgba(255,45,120,0.4)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'var(--neon-blue)';
        cursorRing.style.width = '36px';
        cursorRing.style.height = '36px';
        cursorRing.style.borderColor = 'rgba(0,212,255,0.5)';
    });
});

// ─── Navbar scroll ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.75rem 0';
        navbar.style.background = 'rgba(2,2,6,0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(0,212,255,0.06)';
    } else {
        navbar.style.padding = '1.5rem 0';
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.borderBottom = 'none';
    }
});

// ─── Scroll to top button ───
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// ─── Reveal on scroll ───
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.style.animationDelay || '0s';
            const delayMs = parseFloat(delay) * 1000;
            setTimeout(() => entry.target.classList.add('visible'), delayMs);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ─── Parallax ───
function lerp(a, b, t) { return a + (b - a) * t; }
let currentScroll = 0, targetScroll = 0;

window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
});

function parallaxLoop() {
    currentScroll = lerp(currentScroll, targetScroll, 0.1);

    // Parallax slow elements (background)
    document.querySelectorAll('.parallax-slow').forEach(el => {
        el.style.transform = `translateY(${currentScroll * 0.2}px)`;
    });

    // Parallax fast elements (foreground)
    document.querySelectorAll('.parallax-fast').forEach(el => {
        el.style.transform = `translateY(${currentScroll * -0.1}px)`;
    });

    requestAnimationFrame(parallaxLoop);
}
parallaxLoop();

// ─── FAQ Toggle ───
function toggleFaq(trigger) {
    const item = trigger.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));

    // Open clicked if it was closed
    if (!isOpen) {
        item.classList.add('open');
    }
}

// ─── Mobile Menu ───
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}
function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.remove('open');
    document.body.style.overflow = '';
}

// Close mobile menu on ESC
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
});

// ─── Smooth scroll for anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ─── Active nav link on scroll ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.style.color = 'var(--neon-blue)';
                }
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// ─── Glitch text on hover ───
document.querySelectorAll('.glitch').forEach(el => {
    el.setAttribute('data-text', el.textContent);
});

// ─── Init reveal for elements already in view ───
window.addEventListener('load', () => {
    revealEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            const delay = el.style.animationDelay || '0s';
            const delayMs = parseFloat(delay) * 1000;
            setTimeout(() => el.classList.add('visible'), delayMs);
        }
    });
});

// ─── Slideshow concept (défilement aléatoire) ───
(function () {
    const slides = document.querySelectorAll('.concept-slide');
    if (!slides.length) return;
    let current = 0;

    function showRandom() {
        slides[current].style.opacity = '0';
        let next;
        do { next = Math.floor(Math.random() * slides.length); } while (next === current);
        current = next;
        slides[current].style.opacity = '1';
    }

    setInterval(showRandom, 3000);
})();

// ─── Voyages carousel arrows (optionnel, pour future pagination) ───
function prevVoyage() {
    const grid = document.querySelector('#voyages .grid');
    if (grid) grid.scrollBy({ left: -300, behavior: 'smooth' });
}
function nextVoyage() {
    const grid = document.querySelector('#voyages .grid');
    if (grid) grid.scrollBy({ left: 300, behavior: 'smooth' });
}
