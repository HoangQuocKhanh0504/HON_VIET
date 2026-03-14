// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    disable: window.innerWidth < 640
});

// Loading screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading').classList.add('hidden');
    }, 800);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');
const menuIcon = menuToggle.querySelector('i');

function toggleMenu() {
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
    }
}

menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
    }
});

// Music player
let isPlaying = false;
const music = document.getElementById('backgroundMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');

musicBtn.addEventListener('click', function() {
    if (isPlaying) {
        music.pause();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-music');
    } else {
        music.play().catch(e => console.log("Autoplay prevented:", e));
        musicIcon.classList.remove('fa-music');
        musicIcon.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
});

// Dynamic year
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
}

// Active navigation highlight based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks2 = document.querySelectorAll('.nav-links a');

navLinks2.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// XỬ LÝ TOUCH CHO MOBILE
const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
    // Xử lý people cards nếu có
    const peopleCards = document.querySelectorAll('.people-card');
    if (peopleCards.length > 0) {
        peopleCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (this.classList.contains('tapped')) {
                    this.classList.remove('tapped');
                } else {
                    peopleCards.forEach(c => c.classList.remove('tapped'));
                    this.classList.add('tapped');
                }
            });
        });

        // Click outside để tắt tapped
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.people-card')) {
                peopleCards.forEach(c => c.classList.remove('tapped'));
            }
        });
    }
}

// Parallax cho desktop
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
        
        const conclusionHero = document.querySelector('.conclusion-hero');
        if (conclusionHero) {
            conclusionHero.style.backgroundPositionY = scrolled * 0.3 + 'px';
        }
    });
}