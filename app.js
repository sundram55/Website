// Portfolio Website JavaScript - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navToggle.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link, .hero-actions a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    const bars = navToggle.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    });
                }
            }
        });
    });

    // Portfolio Filtering - Fixed Implementation
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items with proper animations
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // Show the item
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    item.style.display = 'block';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Hide the item
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact Form Handling - Fixed Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const projectInput = document.getElementById('project');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const project = projectInput.value.trim();
            
            // Clear previous error states
            [nameInput, emailInput, projectInput].forEach(input => {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            });
            
            let hasErrors = false;
            
            // Validate required fields
            if (!name) {
                showFieldError(nameInput, 'Name is required');
                hasErrors = true;
            }
            
            if (!email) {
                showFieldError(emailInput, 'Email is required');
                hasErrors = true;
            } else if (!isValidEmail(email)) {
                showFieldError(emailInput, 'Please enter a valid email address');
                hasErrors = true;
            }
            
            if (hasErrors) {
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 1500);
        });
    }

    // Service Quote Buttons - Fixed Implementation
    const serviceQuoteButtons = document.querySelectorAll('.service-card .btn');
    serviceQuoteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceCard = this.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            
            // Scroll to contact section and prefill form
            const contactSection = document.getElementById('contact');
            const projectTextarea = document.getElementById('project');
            
            if (contactSection && projectTextarea) {
                // Smooth scroll to contact section
                const offsetTop = contactSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    projectTextarea.value = `I'm interested in ${serviceName}. Please provide me with a quote for my project.`;
                    projectTextarea.focus();
                }, 1000);
            }
        });
    });

    // Pricing Package Buttons - Fixed Implementation
    const pricingButtons = document.querySelectorAll('.pricing-card .btn');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const pricingCard = this.closest('.pricing-card');
            const packageName = pricingCard.querySelector('h3').textContent;
            
            // Scroll to contact section and prefill form
            const contactSection = document.getElementById('contact');
            const projectTextarea = document.getElementById('project');
            
            if (contactSection && projectTextarea) {
                // Smooth scroll to contact section
                const offsetTop = contactSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    if (packageName.includes('Premium')) {
                        projectTextarea.value = `I'm interested in the ${packageName}. Please contact me to discuss my custom requirements and provide a detailed quote.`;
                    } else {
                        projectTextarea.value = `I'm interested in the ${packageName}. Please provide me with more details and a quote for my project.`;
                    }
                    projectTextarea.focus();
                }, 1000);
            }
        });
    });

    // Scroll Effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .pricing-card, .about-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    // Portfolio Item Click Handler
    const portfolioItemsClick = document.querySelectorAll('.portfolio-item');
    portfolioItemsClick.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            const category = this.querySelector('p').textContent;
            
            // Simple modal simulation with alert
            alert(`${title}\nCategory: ${category}\n\nThis would normally open a detailed view of the project with more images and information.`);
        });
    });

    // Add CSS for scroll animations and mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .service-card,
        .portfolio-item,
        .pricing-card,
        .about-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .navbar.scrolled {
            background: rgba(10, 10, 10, 0.98) !important;
            backdrop-filter: blur(20px) !important;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3) !important;
        }
        
        .form-error {
            border-color: #ff5459 !important;
            box-shadow: 0 0 0 3px rgba(255, 84, 89, 0.2) !important;
        }
        
        .error-message {
            color: #ff5459;
            font-size: 12px;
            margin-top: 4px;
            display: block;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: rgba(10, 10, 10, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding: 2rem 0;
                transition: left 0.3s ease;
                gap: 2rem;
                z-index: 999;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-link {
                font-size: 1.2rem;
                padding: 1rem;
            }
        }
        
        .portfolio-item {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Hero CTA Button Click Effects
    const heroCTAButtons = document.querySelectorAll('.hero-actions .btn');
    heroCTAButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Scroll Indicator Click Handler - Fixed
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Utility Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFieldError(input, message) {
        input.classList.add('form-error');
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
        
        // Remove error styling when user starts typing
        input.addEventListener('input', function() {
            input.classList.remove('form-error');
            const errorMsg = input.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        }, { once: true });
    }

    // Social media link tracking
    const socialLinks = document.querySelectorAll('.social-link, .contact-method[href*="linkedin"], .contact-method[href*="wa.me"], .contact-method[href*="mailto"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.textContent.trim() || 'social link';
            console.log(`User clicked on: ${platform}`);
        });
    });

    // Performance optimization: Debounced scroll handler
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Update navbar
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update hero parallax
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground && scrolled < window.innerHeight) {
            const speed = scrolled * 0.3;
            heroBackground.style.transform = `translateY(${speed}px)`;
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        }
    });

    // Initialize page load animations
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            const elementsToAnimate = document.querySelectorAll('.hero-content, .scroll-indicator');
            elementsToAnimate.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 100);
    });
});