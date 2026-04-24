document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.hero-content, .stat-item, .offer-card, .showcase-card, .process-step, .cta-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });

    // Custom visible class logic injected via JS for simplicity in this script
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Navbar scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
            header.style.padding = '1rem 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '1.5rem 0';
        }
    });

    // Text Rotation Logic
    const words = document.querySelectorAll('#rotatingText .word');
    if (words.length > 0) {
        let currentWordIndex = 0;
        
        setInterval(() => {
            const currentWord = words[currentWordIndex];
            currentWord.classList.remove('active');
            currentWord.classList.add('out');
            
            setTimeout(() => {
                currentWord.classList.remove('out');
            }, 600); // Wait for transition to finish before removing 'out' class
            
            currentWordIndex = (currentWordIndex + 1) % words.length;
            const nextWord = words[currentWordIndex];
            
            nextWord.classList.add('active');
        }, 3000);
    }

    // Circle Mask Reveal Logic
    const rightMenuTrigger = document.getElementById('rightMenuTrigger');
    const menuToggle = document.getElementById('menuToggle');
    const fullMenu = document.getElementById('fullMenu');
    const menuItems = document.querySelectorAll('.menu-item');
    let isMenuOpen = false;

    if (rightMenuTrigger && fullMenu) {
        rightMenuTrigger.addEventListener('click', () => {
            if (!isMenuOpen) {
                // Open Menu - Circle Mask Reveal
                fullMenu.classList.add('active');
                menuToggle.classList.add('active');
                rightMenuTrigger.classList.add('active');
                document.body.classList.add('menu-open');
                isMenuOpen = true;
            } else {
                // Close Menu
                fullMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                rightMenuTrigger.classList.remove('active');
                document.body.classList.remove('menu-open');
                isMenuOpen = false;
            }
        });

        // Close menu on link click
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (isMenuOpen) menuToggle.click();
            });
        });
    }
});
