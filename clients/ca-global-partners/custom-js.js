(function(){
  // Mobile hamburger menu toggle
  document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.cstm-mobile-hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-right-side-menu');
    
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenu.classList.remove('active');
        }
      });
    }
    
    // Close mobile menu when window is resized to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 992 && mobileMenu) {
        mobileMenu.classList.remove('active');
      }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          const headerHeight = 65;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.unibtn a, .unibtn input[type="button"], .unibtn input[type="submit"]');
    buttons.forEach(function(button) {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
    
    // Lot card hover effects
    const lotCards = document.querySelectorAll('.aucgrid li.item-block');
    lotCards.forEach(function(card) {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
    
    // Auto-hide mobile menu on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scrolling down
        if (mobileMenu) {
          mobileMenu.classList.remove('active');
        }
      }
      
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
  });
})();