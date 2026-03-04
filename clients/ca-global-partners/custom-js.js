(function() {
  'use strict';
  
  // Mobile menu toggle functionality
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (toggle && nav) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        nav.classList.toggle('active');
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-header')) {
          nav.classList.remove('active');
        }
      });
      
      // Close mobile menu on window resize if it gets too wide
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
          nav.classList.remove('active');
        }
      });
    }
  }
  
  // Desktop dropdown hover functionality (if dropdowns are added later)
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
  
  // Enhanced lot grid interactions
  function enhanceLotGrid() {
    const lotItems = document.querySelectorAll('.aucgrid li.item-block');
    
    lotItems.forEach(function(item) {
      // Add smooth hover transitions
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }
  
  // Improve bid input interactions
  function enhanceBidInputs() {
    const bidInputs = document.querySelectorAll('.currency-input input, .bidfrm input[type="text"]');
    
    bidInputs.forEach(function(input) {
      input.addEventListener('focus', function() {
        this.parentElement.style.borderColor = '#0066cc';
        this.parentElement.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.style.borderColor = '#ddd';
        this.parentElement.style.boxShadow = 'none';
      });
    });
  }
  
  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        
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
    enhanceLotGrid();
    enhanceBidInputs();
    initSmoothScrolling();
    
    // Re-run enhancements for dynamically loaded content
    const observer = new MutationObserver(function(mutations) {
      let shouldUpdate = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldUpdate = true;
        }
      });
      
      if (shouldUpdate) {
        setTimeout(function() {
          enhanceLotGrid();
          enhanceBidInputs();
        }, 100);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();