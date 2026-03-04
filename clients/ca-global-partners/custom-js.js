(function() {
  'use strict';

  // Mobile menu toggle functionality
  function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileToggle && mainNav) {
      mobileToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        
        // Update ARIA attribute for accessibility
        const isExpanded = mainNav.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', isExpanded);
        
        // Change icon based on state
        mobileToggle.innerHTML = isExpanded ? '✕' : '☰';
      });
      
      // Close mobile menu when clicking on a link
      const navLinks = mainNav.querySelectorAll('a');
      navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          mainNav.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.innerHTML = '☰';
        });
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!event.target.closest('.header-nav') && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.innerHTML = '☰';
        }
      });
    }
  }

  // Desktop navigation hover effects
  function initDesktopNav() {
    const navItems = document.querySelectorAll('.main-nav a');
    
    navItems.forEach(function(item) {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-1px)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = document.querySelector('.custom-header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Handle window resize
  function handleResize() {
    const mainNav = document.querySelector('.main-nav');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth > 768) {
      if (mainNav) {
        mainNav.classList.remove('active');
      }
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '☰';
      }
    }
  }

  // Initialize all functionality when DOM is ready
  function init() {
    initMobileMenu();
    initDesktopNav();
    initSmoothScroll();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.unibtn a, .unibtn input, #btnSearch');
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
          this.classList.add('loading');
          const originalText = this.textContent || this.value;
          this.textContent = this.value = 'Loading...';
          
          setTimeout(() => {
            this.classList.remove('loading');
            this.textContent = this.value = originalText;
          }, 2000);
        }
      });
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();