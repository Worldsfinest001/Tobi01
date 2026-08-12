// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuToggle.innerHTML = navbar.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const toggleBall = document.querySelector('.toggle-ball');
    const body = document.body;

    function setThemeBasedOnTime() {
        const hours = new Date().getHours();
        const isDayTime = hours > 6 && hours < 18;
        
        if (isDayTime) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            if (toggleBall) toggleBall.style.transform = 'translateX(30px)';
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            if (toggleBall) toggleBall.style.transform = 'translateX(0)';
        }
    }

    // Set initial theme
    setThemeBasedOnTime();

    // Toggle theme manually
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                if (toggleBall) toggleBall.style.transform = 'translateX(30px)';
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                if (toggleBall) toggleBall.style.transform = 'translateX(0)';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(savedTheme + '-mode');
        if (toggleBall) {
            toggleBall.style.transform = savedTheme === 'light' ? 'translateX(30px)' : 'translateX(0)';
        }
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbar && navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize carousels
    function initCarousels() {
        document.querySelectorAll('.carousel').forEach(carousel => {
            const inner = carousel.querySelector('.carousel-inner');
            const items = carousel.querySelectorAll('.carousel-item');
            const prevBtn = carousel.querySelector('.carousel-prev');
            const nextBtn = carousel.querySelector('.carousel-next');
            const indicators = carousel.querySelectorAll('.indicator');
            
            let currentIndex = 0;
            const totalItems = items.length;
            
            function updateCarousel() {
                if (inner) inner.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Update indicators
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentIndex);
                });
                
                // Disable/enable buttons
                if (prevBtn) prevBtn.disabled = currentIndex === 0;
                if (nextBtn) nextBtn.disabled = currentIndex === totalItems - 1;
            }
            
            // Button events
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateCarousel();
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentIndex < totalItems - 1) {
                        currentIndex++;
                        updateCarousel();
                    }
                });
            }
            
            // Indicator events
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    currentIndex = index;
                    updateCarousel();
                });
            });
            
            // Initialize
            updateCarousel();
        });
    }

    initCarousels();

    // Animation for About Section
    const aboutSection = document.querySelector('.about');
    const aboutImg = document.querySelector('.about-img img');
    if (aboutImg) {
        aboutImg.style.transform = 'scale(0.8)';
        aboutImg.style.opacity = '0';
        aboutImg.style.transition = 'all 0.6s ease';
    }

    if (aboutSection && aboutImg) {
        window.addEventListener('scroll', () => {
            const aboutPosition = aboutSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (aboutPosition < screenPosition) {
                aboutImg.style.transform = 'scale(1)';
                aboutImg.style.opacity = '1';
            }
        });
    }

    // Animate skills tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.transform = 'translateY(20px)';
        tag.style.opacity = '0';
        tag.style.transition = `all 0.4s ease ${index * 0.1}s`;
        
        window.addEventListener('scroll', () => {
            const tagPosition = tag.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (tagPosition < screenPosition) {
                tag.style.transform = 'translateY(0)';
                tag.style.opacity = '1';
            }
        });
    });

    // Animate cards on scroll
    const animateCards = () => {
        const cards = document.querySelectorAll('.skill-card, .workflow-item, .testimonial-card');
        
        cards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = `all 0.3s ease ${index * 0.1}s`;
            }
        });
    };

    // Initialize card states
    document.querySelectorAll('.skill-card, .workflow-item, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateCards);
    window.addEventListener('scroll', animateCards);

   
});

// Carousel functionality for sample pages
function initDetailCarousel() {
    const carousel = document.querySelector('.detail-carousel');
    if (!carousel) return;

    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    const indicators = carousel.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    function updateCarousel() {
        inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Button events
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        });
    }
    
    // Indicator events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Initialize
    updateCarousel();
}

document.addEventListener('DOMContentLoaded', function() {
    initDetailCarousel();
});