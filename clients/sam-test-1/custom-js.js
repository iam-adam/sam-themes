(function(){
    function waitForHeader(callback) {
        if (document.querySelector('.custom-header')) {
            callback();
        } else {
            var observer = new MutationObserver(function() {
                if (document.querySelector('.custom-header')) {
                    observer.disconnect();
                    callback();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }
    
    waitForHeader(function() {
        // Mobile hamburger toggle
        var toggleButton = document.querySelector('.mobile-menu-toggle');
        var mainNav = document.querySelector('.main-nav');
        
        if (toggleButton && mainNav) {
            toggleButton.addEventListener('click', function() {
                mainNav.classList.toggle('active');
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.header-nav') && mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
        
        // Close mobile menu when window is resized to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
        
        // Smooth scroll for anchor links
        var anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href').substring(1);
                var targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add loading states to buttons
        var actionButtons = document.querySelectorAll('.unibtn input[type="submit"], #btnSearch');
        actionButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var originalText = this.value || this.textContent;
                this.disabled = true;
                this.value = 'Loading...';
                
                setTimeout(function() {
                    button.disabled = false;
                    button.value = originalText;
                }, 2000);
            });
        });
    });
})();