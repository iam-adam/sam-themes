(function(){
  'use strict';
  
  // Mobile menu toggle
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (toggle && nav) {
      toggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Update aria-expanded for accessibility
        const expanded = nav.classList.contains('active');
        toggle.setAttribute('aria-expanded', expanded);
      });
    }
  }
  
  // Close mobile menu when clicking outside
  function initMobileMenuClose() {
    document.addEventListener('click', function(e) {
      const nav = document.querySelector('.main-nav');
      const toggle = document.querySelector('.mobile-toggle');
      
      if (nav && toggle && nav.classList.contains('active')) {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
          nav.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }
  
  // Desktop dropdown hover effects
  function initDesktopDropdowns() {
    const navItems = document.querySelectorAll('.main-nav li');
    
    navItems.forEach(function(item) {
      const dropdown = item.querySelector('.dropdown-menu');
      
      if (dropdown) {
        item.addEventListener('mouseenter', function() {
          if (window.innerWidth > 768) {
            dropdown.style.display = 'block';
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-10px)';
            
            setTimeout(function() {
              dropdown.style.opacity = '1';
              dropdown.style.transform = 'translateY(0)';
            }, 10);
          }
        });
        
        item.addEventListener('mouseleave', function() {
          if (window.innerWidth > 768) {
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-10px)';
            
            setTimeout(function() {
              dropdown.style.display = 'none';
            }, 200);
          }
        });
      }
    });
  }
  
  // Enhanced lot grid animations
  function initLotGridAnimations() {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px'
    });
    
    const lotItems = document.querySelectorAll('.aucgrid li.item-block');
    lotItems.forEach(function(item, index) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
      observer.observe(item);
    });
  }
  
  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href.length > 1) {
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
        }
      });
    });
  }
  
  // Form enhancements
  function initFormEnhancements() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
    
    inputs.forEach(function(input) {
      // Add focus/blur classes for styling
      input.addEventListener('focus', function() {
        this.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        this.classList.remove('focused');
        if (this.value) {
          this.classList.add('has-value');
        } else {
          this.classList.remove('has-value');
        }
      });
      
      // Check initial value
      if (input.value) {
        input.classList.add('has-value');
      }
    });
  }
  
  // Handle window resize
  function initResizeHandler() {
    let resizeTimer;
    
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      
      resizeTimer = setTimeout(function() {
        const nav = document.querySelector('.main-nav');
        const toggle = document.querySelector('.mobile-toggle');
        
        // Close mobile menu on desktop
        if (window.innerWidth > 768 && nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
          if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
          }
        }
      }, 250);
    });
  }
  
  // Initialize all functions when DOM is ready
  function init() {
    initMobileMenu();
    initMobileMenuClose();
    initDesktopDropdowns();
    initSmoothScrolling();
    initFormEnhancements();
    initResizeHandler();
    
    // Initialize animations after a short delay
    setTimeout(initLotGridAnimations, 500);
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();