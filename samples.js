document.addEventListener('DOMContentLoaded', function() {
  // Initialize all carousels
  const carousels = document.querySelectorAll('.sample-carousel');
  
  carousels.forEach(carousel => {
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const indicators = carousel.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    function updateCarousel() {
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update indicators
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
      
      // Show/hide navigation buttons
      if (currentIndex === 0) {
        prevBtn.style.visibility = 'hidden';
      } else {
        prevBtn.style.visibility = 'visible';
      }
      
      if (currentIndex === totalItems - 1) {
        nextBtn.style.visibility = 'hidden';
      } else {
        nextBtn.style.visibility = 'visible';
      }
    }
    
    // Button events
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, totalItems - 1);
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
    
    // Auto-advance carousel (optional)
    let interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, 5000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
      }, 5000);
    });
  });

  // Back to top button functionality
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
});