(function() {
  'use strict';
  
  // Mobile menu toggle
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (toggleBtn && nav) {
      toggleBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Update aria attributes for accessibility
        const isOpen = nav.classList.contains('active');
        toggleBtn.setAttribute('aria-expanded', isOpen);
        nav.setAttribute('aria-hidden', !isOpen);
        
        // Change icon
        toggleBtn.innerHTML = isOpen ? '✕' : '☰';
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!toggleBtn.contains(e.target) && !nav.contains(e.target)) {
          nav.classList.remove('active');
          toggleBtn.setAttribute('aria-expanded', 'false');
          nav.setAttribute('aria-hidden', 'true');
          toggleBtn.innerHTML = '☰';
        }
      });
      
      // Close menu on window resize
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
          nav.classList.remove('active');
          toggleBtn.setAttribute('aria-expanded', 'false');
          nav.setAttribute('aria-hidden', 'true');
          toggleBtn.innerHTML = '☰';
        }
      });
    }
  }
  
  // Enhanced lot grid interactions
  function enhanceLotGrid() {
    const lotItems = document.querySelectorAll('.aucgrid li.item-block');
    
    lotItems.forEach(function(item) {
      // Add keyboard navigation support
      const link = item.querySelector('a');
      if (link) {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
          }
        });
      }
      
      // Enhanced hover effects
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
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
  
  // Bid form enhancements
  function enhanceBidForms() {
    const bidInputs = document.querySelectorAll('.bidfrm input[type="text"], .currency-input input');
    
    bidInputs.forEach(function(input) {
      // Format currency input on blur
      input.addEventListener('blur', function() {
        const value = parseFloat(this.value.replace(/[^\d.]/g, ''));
        if (!isNaN(value)) {
          this.value = value.toFixed(2);
        }
      });
      
      // Select all text on focus
      input.addEventListener('focus', function() {
        this.select();
      });
    });
  }
  
  // Accessibility improvements
  function improveAccessibility() {
    // Add skip navigation link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 10000;
      border-radius: 4px;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
      this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
      this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark if not present
    const wrapper = document.getElementById('wrapper');
    if (wrapper && !wrapper.getAttribute('role')) {
      wrapper.setAttribute('role', 'main');
      wrapper.id = wrapper.id || 'main-content';
    }
  }
  
  // Performance optimization for images
  function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    // Add loading="lazy" to images below the fold
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(function(img, index) {
      // Don't lazy load first few images (above fold)
      if (index > 6) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }
  
  // Initialize all functionality when DOM is ready
  function init() {
    initMobileMenu();
    enhanceLotGrid();
    initSmoothScroll();
    enhanceBidForms();
    improveAccessibility();
    optimizeImages();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('theme-loaded');
    
    console.log('CA Global Partners theme initialized successfully');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();