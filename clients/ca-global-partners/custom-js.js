(function(){
  'use strict';
  
  // Mobile menu toggle functionality
  function initMobileMenu() {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (toggleButton && mainNav) {
      toggleButton.addEventListener('click', function() {
        mainNav.classList.toggle('active');
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!event.target.closest('.header-nav') && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
        }
      });
      
      // Close menu when window is resized above mobile breakpoint
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
        }
      });
    }
  }
  
  // Desktop dropdown hover functionality
  function initDesktopDropdowns() {
    const navItems = document.querySelectorAll('.main-nav li');
    
    navItems.forEach(function(item) {
      const dropdown = item.querySelector('.dropdown');
      
      if (dropdown) {
        item.addEventListener('mouseenter', function() {
          dropdown.style.display = 'block';
        });
        
        item.addEventListener('mouseleave', function() {
          dropdown.style.display = 'none';
        });
      }
    });
  }
  
  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.custom-header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // Initialize all functionality when DOM is ready
  function init() {
    initMobileMenu();
    initDesktopDropdowns();
    initSmoothScrolling();
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();