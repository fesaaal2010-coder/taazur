// GSAP Animations and Interactive Features
(function() {
    'use strict';

    // Initialize GSAP and ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // DOM Elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const currentYear = document.getElementById('current-year');
    const form = document.querySelector('.form');

    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = this.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formStatus = document.getElementById('form-status');
            formStatus.textContent = '';
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                formStatus.textContent = 'يرجى ملء جميع الحقول المطلوبة';
                formStatus.style.color = '#ef4444';
                return;
            }
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                formStatus.textContent = 'يرجى إدخال بريد إلكتروني صحيح';
                formStatus.style.color = '#ef4444';
                return;
            }
            formStatus.textContent = 'جاري إرسال الرسالة...';
            formStatus.style.color = '#00AEEF';
            // Send to Formspree
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    formStatus.textContent = 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً';
                    formStatus.style.color = '#10b981';
                    form.reset();
                } else {
                    formStatus.textContent = 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.';
                    formStatus.style.color = '#ef4444';
                }
            } catch (error) {
                formStatus.textContent = 'تعذر الاتصال بالخادم. حاول لاحقاً.';
                formStatus.style.color = '#ef4444';
            }
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#00AEEF'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        const mm = gsap.matchMedia();
        
        // Performance check for mobile devices
        const isMobile = window.innerWidth <= 768;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            return; // Skip animations if user prefers reduced motion
        }
        
        // Desktop animations
        mm.add("(min-width: 769px)", () => {



        gsap.from('.hero-stats .stat-item', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.8
        });

        // Hero background image animation
        gsap.from('.hero-bg-img', {
            duration: 2,
            scale: 1.1,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.5
        });

        // Section headers animation
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'power3.out'
            });
        });

        // Service cards animation
        gsap.utils.toArray('.service-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                },
                duration: isMobile ? 0.6 : 0.8,
                y: 50,
                opacity: 0,
                delay: isMobile ? index * 0.1 : index * 0.15,
                ease: 'power3.out'
            });
        });

        // About section animations
        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: -50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.about-image', {
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.2
        });

        // Feature items animation
        gsap.utils.toArray('.feature-item').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: '.features-list',
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.6,
                x: -30,
                opacity: 0,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });

        // Careers section animations
        gsap.from('.careers-info', {
            scrollTrigger: {
                trigger: '.careers-content',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: -50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.careers-image', {
            scrollTrigger: {
                trigger: '.careers-content',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.2
        });

        // Contact section animations
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: -50,
            opacity: 0,
            ease: 'power3.out'
        });

        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.2
        });

        // Contact items animation
        gsap.utils.toArray('.contact-item').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: '.contact-info',
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.6,
                y: 30,
                opacity: 0,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });

        // Footer animations
        const footer = document.querySelector('.footer');
        if (footer) {
            console.log('Footer found and will be animated');
            
            // Ensure footer stays visible
            footer.style.display = 'block';
            footer.style.visibility = 'visible';
            footer.style.opacity = '1';
            
            gsap.from('.footer-content', {
                scrollTrigger: {
                    trigger: '.footer',
                    start: 'top 90%',
                    end: 'bottom 10%',
                    toggleActions: 'play none none none'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out',
                onComplete: function() {
                    // Ensure footer content stays visible after animation
                    const footerContent = document.querySelector('.footer-content');
                    if (footerContent) {
                        footerContent.style.opacity = '1';
                        footerContent.style.visibility = 'visible';
                        footerContent.style.display = 'grid';
                    }
                }
            });
        } else {
            console.error('Footer not found in the document');
        }
        
        // Ensure footer never disappears
        window.addEventListener('scroll', function() {
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.style.display = 'block';
                footer.style.visibility = 'visible';
                footer.style.opacity = '1';
            }
        });

        // Parallax effect for hero background
        if (!isMobile) {
            gsap.to('.hero', {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                backgroundPosition: 'center 20%',
                ease: 'none'
            });
        }

        // Smooth counter animation for stats
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/\D/g, ''));
            const suffix = stat.textContent.replace(/\d/g, '');
            
            gsap.to(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 2,
                innerHTML: 0,
                ease: 'power2.out',
                onUpdate: function() {
                    const current = Math.floor(this.targets()[0].innerHTML);
                    if (current < target) {
                        this.targets()[0].innerHTML = current + suffix;
                    }
                }
            });
        });

        // Hover animations for service cards
        gsap.utils.toArray('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.3,
                    scale: 1.02,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });

        // Button hover effects
        gsap.utils.toArray('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    duration: 0.2,
                    scale: 1.05,
                    ease: 'power2.out'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    duration: 0.2,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });
        });
        
        // Mobile animations
        mm.add("(max-width: 768px)", () => {
            // Simplified animations for mobile
            ScrollTrigger.getAll().forEach(t => { 
                if (t.vars.pin) t.kill(); 
            });
            
            // Basic fade-in animations only
            gsap.from('.hero-content', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'power3.out'
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations (fallback)
    if (!window.IntersectionObserver) {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add loading animation for page
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Image Modal Functions
    window.openImageModal = function(imageSrc, title) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        modal.style.display = 'block';
        
        // Prevent body scroll but allow modal content to scroll
        document.body.style.overflow = 'hidden';
        
        // Scroll to top of modal content
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    };

    // Close modal when clicking on X
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            const modal = document.getElementById('imageModal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('imageModal');
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Prevent event propagation for zoom icons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.image-zoom-icon')) {
            e.stopPropagation();
        }
    });

    // Team Slider Animation
    const teamSlider = document.querySelector('.team-slider');
    if (teamSlider) {
        const slides = teamSlider.querySelectorAll('.team-slide');
        let currentSlide = 0;
        let slideInterval;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Initialize slider
        showSlide(0);
        
        // Auto slide every 5 seconds
        slideInterval = setInterval(nextSlide, 5000);
        
        // Add hover pause
        teamSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        teamSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    // Hero background slider functionality
    const heroSlider = document.querySelector('.hero-slider');
    const heroSlides = document.querySelectorAll('.hero-slide');
    const slideOverlays = document.querySelectorAll('.slide-overlay');
    const dots = document.querySelectorAll('.dot');
    let currentHeroSlide = 0;
    let heroSlideInterval;

    function showHeroSlide(index) {
        // Remove active class from all slides and overlays
        heroSlides.forEach(slide => slide.classList.remove('active'));
        slideOverlays.forEach(overlay => overlay.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
        
        // Add active class to current slide, overlay and dot
        heroSlides[currentHeroSlide].classList.add('active');
        slideOverlays[currentHeroSlide].classList.add('active');
        dots[currentHeroSlide].classList.add('active');
        
        console.log('Showing slide', currentHeroSlide);
    }

    function nextHeroSlide() {
        showHeroSlide(currentHeroSlide + 1);
    }

    function previousHeroSlide() {
        showHeroSlide(currentHeroSlide - 1);
    }



    // Initialize hero slider
    if (heroSlider && heroSlides.length > 0) {
        console.log('Hero slider initialized with', heroSlides.length, 'slides');
        
        // Check if images are loading
        heroSlides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img) {
                console.log('Slide', index, 'image src:', img.src);
                img.addEventListener('load', () => {
                    console.log('Slide', index, 'image loaded successfully');
                });
                img.addEventListener('error', () => {
                    console.error('Slide', index, 'image failed to load:', img.src);
                });
            }
        });
        
        // Auto slide every 8 seconds
        heroSlideInterval = setInterval(nextHeroSlide, 8000);
        
        // Dot click functionality
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log('Dot clicked, showing slide', index);
                clearInterval(heroSlideInterval);
                showHeroSlide(index);
                // Restart auto slide
                heroSlideInterval = setInterval(nextHeroSlide, 8000);
            });
        });
        
        // Pause on hover
        heroSlider.addEventListener('mouseenter', () => {
            console.log('Hero slider paused on hover');
            clearInterval(heroSlideInterval);
        });
        
        heroSlider.addEventListener('mouseleave', () => {
            console.log('Hero slider resumed');
            heroSlideInterval = setInterval(nextHeroSlide, 8000);
        });
        

    } else {
        console.log('Hero slider not found or no slides available');
    }



    // Language Switcher
    const langSwitchBtn = document.getElementById('lang-switch');
    let currentLang = 'ar';

    // Translation dictionary
    const translations = {
        ar: {
            'الرئيسية': 'الرئيسية',
            'خدماتنا': 'خدماتنا',
            'معلومات عنا': 'معلومات عنا',
            'التوظيف': 'التوظيف',
            'شركاؤنا': 'شركاؤنا',
            'إتصل بنا': 'إتصل بنا',
            'فرص عمل متاحة': 'فرص عمل متاحة',
            'انضم إلى فريق تآزر وكن جزءاً من نجاحنا المستمر': 'انضم إلى فريق تآزر وكن جزءاً من نجاحنا المستمر',
            'تقديم طلب توظيف': 'تقديم طلب توظيف',
            'نرحب بجميع الطلبات من ذوي الإعاقة مع ضمان بيئة عمل داعمة': 'نرحب بجميع الطلبات من ذوي الإعاقة مع ضمان بيئة عمل داعمة',
            'خدماتنا المتميزة': 'خدماتنا المتميزة',
            'نقدم مجموعة شاملة من الخدمات المتخصصة لتلبية احتياجات عملائنا': 'نقدم مجموعة شاملة من الخدمات المتخصصة لتلبية احتياجات عملائنا',
            'معلومات عن تآزر': 'معلومات عن تآزر',
            'نجاحنا يتحقق عندما يحصل عملاؤنا على فرصة لتجاوز توقعاتهم.': 'نجاحنا يتحقق عندما يحصل عملاؤنا على فرصة لتجاوز توقعاتهم.',
            'نحن نؤمن بأن الشراكة الحقيقية مع عملائنا هي أساس النجاح المستدام.': 'نحن نؤمن بأن الشراكة الحقيقية مع عملائنا هي أساس النجاح المستدام.',
            'تواصل معنا': 'تواصل معنا',
            'نحن هنا للإجابة على استفساراتكم وتقديم المساعدة': 'نحن هنا للإجابة على استفساراتكم وتقديم المساعدة',
            'بعض الشركات التي جربت خدماتنا': 'بعض الشركات التي جربت خدماتنا',
            'نفخر بثقة شركائنا وشركاتنا العملاء': 'نفخر بثقة شركائنا وشركاتنا العملاء',
            'Our Distinguished Services': 'خدماتنا المتميزة',
            'نقدم مجموعة شاملة من الخدمات المتخصصة لتلبية احتياجات عملائنا': 'نقدم مجموعة شاملة من الخدمات المتخصصة لتلبية احتياجات عملائنا',
            'Curtain Side': ' Curtain Side ',
            'للبضائع الجافة , تغطي دول مجلس التعاون الخليجي ومنطقة الأردن.': 'للبضائع الجافة , تغطي دول مجلس التعاون الخليجي ومنطقة الأردن.',
            'مشاريع المقاولات': 'مشاريع المقاولات',
            'توريد القوى العاملة': 'توريد القوى العاملة',
            'نقل خطوط الأنابيب': 'نقل خطوط الأنابيب',
            'نقل مواسير النفط والغاز وأنابيب البلاستيك وأنواع أخرى.': 'نقل مواسير النفط والغاز وأنابيب البلاستيك وأنواع أخرى.',
            'الخدمات اللوجستية': 'الخدمات اللوجستية',
            'خدمات 3PL و 4PL': 'خدمات 3PL و 4PL',
            'نحن نقدم خدمات 3PL و 4PL من خلال مواقعنا في دول مجلس التعاون الخليجي والأردن ومصر.': 'نحن نقدم خدمات 3PL و 4PL من خلال مواقعنا في دول مجلس التعاون الخليجي والأردن ومصر.',
            'لحام وتصنيع الأنابيب': 'لحام وتصنيع الأنابيب',
            'شاحنات مبردة': 'شاحنات مبردة',
            'نقل المواد الغذائية والطبية داخل المملكة.': 'نقل المواد الغذائية والطبية داخل المملكة.',
            'التجارة الصناعية': 'التجارة الصناعية',
            'شاحنات مسطحة': 'شاحنات مسطحة',
            'جميع أنواع المواد المسطحة من 12 م إلى 18 م بناء على طلب العميل.': 'جميع أنواع المواد المسطحة من 12 م إلى 18 م بناء على طلب العميل.',
            'خدمات الدعم': 'خدمات الدعم',
            'نقل خزانات ISO': 'نقل خزانات ISO',
            'نقل الكيماويات والبضائع الخطرة.': 'نقل الكيماويات والبضائع الخطرة.',
            'About Taazur': 'معلومات عن تآزر',
            'نجاحنا يتحقق عندما يحصل عملاؤنا على فرصة لتجاوز توقعاتهم. نحن نؤمن بأن الشراكة الحقيقية مع عملائنا هي أساس النجاح المستدام.': 'نجاحنا يتحقق عندما يحصل عملاؤنا على فرصة لتجاوز توقعاتهم. نحن نؤمن بأن الشراكة الحقيقية مع عملائنا هي أساس النجاح المستدام.',
            'نحن متحمسون': 'نحن متحمسون',
            'لدينا سجل حافل بالإنجازات والنجاحات المثبتة': 'لدينا سجل حافل بالإنجازات والنجاحات المثبتة',
            'جديرون بالثقة': 'جديرون بالثقة',
            'الصدق بالنسبة لنا هو السياسة الوحيدة التي نتبعها': 'الصدق بالنسبة لنا هو السياسة الوحيدة التي نتبعها',
            'نحن في تطور دائم': 'نحن في تطور دائم',
            'نلتزم بإكمال جميع المشاريع بأعلى معايير الجودة': 'نلتزم بإكمال جميع المشاريع بأعلى معايير الجودة',
            'شهادة الأيزو': 'شهادة الأيزو',
            'نظام إدارة الجودة ISO 9001 معتمد عالمياً': 'نظام إدارة الجودة ISO 9001 معتمد عالمياً',
            'لماذا تختارنا؟': 'لماذا تختارنا؟',
            'نتميز بخبرة أكثر من 43 عاماً في تقديم أفضل الخدمات لعملائنا': 'نتميز بخبرة أكثر من 43 عاماً في تقديم أفضل الخدمات لعملائنا',
            'خبرة أكثر من 43 عاماً': 'خبرة أكثر من 43 عاماً',
            'جودة عالية معتمدة': 'جودة عالية معتمدة',
            'نلتزم بأعلى معايير الجودة العالمية مع شهادة ISO 9001، لضمان رضا عملائنا التام': 'نلتزم بأعلى معايير الجودة العالمية مع شهادة ISO 9001، لضمان رضا عملائنا التام',
            'فريق متخصص ومحترف': 'فريق متخصص ومحترف',
            'نوظف أفضل الكفاءات والخبرات في مجالنا، مع تدريب مستمر لضمان التميز في الأداء': 'نوظف أفضل الكفاءات والخبرات في مجالنا، مع تدريب مستمر لضمان التميز في الأداء',
            'خدمة سريعة وفعالة': 'خدمة سريعة وفعالة',
            'انضم إلى فريق تآزر': 'انضم إلى فريق تآزر',
            'نبحث عن مواهب متميزة لتنمية فريقنا المتخصص': 'نبحث عن مواهب متميزة لتنمية فريقنا المتخصص',
            'لماذا تختار العمل معنا؟': 'لماذا تختار العمل معنا؟',
            'بيئة عمل محفزة ومهنية': 'بيئة عمل محفزة ومهنية',
            'فرص تطوير وتدريب مستمر': 'فرص تطوير وتدريب مستمر',
            'مزايا تنافسية وحزم تأمين شاملة': 'مزايا تنافسية وحزم تأمين شاملة',
            'مشاريع متنوعة ومثيرة للاهتمام': 'مشاريع متنوعة ومثيرة للاهتمام',
            'فرص نمو وظيفي واضحة': 'فرص نمو وظيفي واضحة',
            'تقديم طلب توظيف': 'تقديم طلب توظيف',
            'Apply for a Job': 'تقديم طلب توظيف',
            'أرسل سيرتك الذاتية مع خطاب تغطية': 'أرسل سيرتك الذاتية مع خطاب تغطية',
            'مجموعة شركات رائدة بأكثر من 43 عاماً من الخبرة في مجالات متعددة': 'مجموعة شركات رائدة بأكثر من 43 عاماً من الخبرة في مجالات متعددة',
            'روابط سريعة': 'روابط سريعة',
            '© 2025 تآزر. جميع الحقوق محفوظة.': '© 2025 تآزر. جميع الحقوق محفوظة.',
            'سياسة الخصوصية': 'سياسة الخصوصية',
            'الشروط والأحكام': 'الشروط والأحكام',
        },
        en: {
            'الرئيسية': 'Home',
            'خدماتنا': 'Services',
            'معلومات عنا': 'About Us',
            'التوظيف': 'Careers',
            'شركاؤنا': 'Partners',
            'إتصل بنا': 'Contact',
            'فرص عمل متاحة': 'Job Opportunities',
            'انضم إلى فريق تآزر وكن جزءاً من نجاحنا المستمر': 'Join Taazur team and be part of our ongoing success',
            'تقديم طلب توظيف': 'Apply for a Job',
            'نرحب بجميع الطلبات من ذوي الإعاقة مع ضمان بيئة عمل داعمة': 'We welcome all applications from people with disabilities with a supportive work environment',
            'خدماتنا المتميزة': 'Our Distinguished Services',
            'نقدم مجموعة شاملة من الخدمات المتخصصة لتلبية احتياجات عملائنا': 'We offer a comprehensive range of specialized services to meet our clients’ needs',
            'معلومات عن تآزر': 'About Taazur',
            'نجاحنا يتحقق عندما يحصل عملاؤنا على فرصة لتجاوز توقعاتهم.': 'Our success is achieved when our clients have the opportunity to exceed their expectations.',
            'نحن نؤمن بأن الشراكة الحقيقية مع عملائنا هي أساس النجاح المستدام.': 'We believe that true partnership with our clients is the foundation of sustainable success.',
            'تواصل معنا': 'Contact Us',
            'نحن هنا للإجابة على استفساراتكم وتقديم المساعدة': 'We are here to answer your inquiries and provide assistance',
            'بعض الشركات التي جربت خدماتنا': 'Some Companies That Tried Our Services',
            'نفخر بثقة شركائنا وشركاتنا العملاء': 'We are proud of the trust of our partners and client companies',
            'Our Distinguished Services': 'Our Distinguished Services',
            'خدماتنا المتميزة': 'Our Distinguished Services',
            'نقدم مجموعة شاملة من الخدمات المتخصصة لتلبية احتياجات عملائنا': 'We offer a comprehensive range of specialized services to meet our clients’ needs',
            'Curtain Side': 'Curtain Side',
            ' Curtain Side ': 'Curtain Side',
            'للبضائع الجافة , تغطي دول مجلس التعاون الخليجي ومنطقة الأردن.': 'For dry goods, covers the GCC countries and Jordan region.',
            'مشاريع المقاولات': 'Contracting Projects',
            'توريد القوى العاملة': 'Manpower Supply',
            'نقل خطوط الأنابيب': 'Pipeline Transport',
            'نقل مواسير النفط والغاز وأنابيب البلاستيك وأنواع أخرى.': 'Transport of oil and gas pipes, plastic pipes, and other types.',
            'الخدمات اللوجستية': 'Logistics Services',
            'خدمات 3PL و 4PL': '3PL & 4PL Services',
            'نحن نقدم خدمات 3PL و 4PL من خلال مواقعنا في دول مجلس التعاون الخليجي والأردن ومصر.': 'We provide 3PL and 4PL services through our locations in the GCC, Jordan, and Egypt.',
            'لحام وتصنيع الأنابيب': 'Welding & Pipe Fabrication',
            'شاحنات مبردة': 'Refrigerated Trucks',
            'نقل المواد الغذائية والطبية داخل المملكة.': 'Transport of food and medical supplies within the Kingdom.',
            'التجارة الصناعية': 'Industrial Trade',
            'شاحنات مسطحة': 'Flatbed Trucks',
            'جميع أنواع المواد المسطحة من 12 م إلى 18 م بناء على طلب العميل.': 'All types of flat materials from 12m to 18m as per client request.',
            'خدمات الدعم': 'Support Services',
            'نقل خزانات ISO': 'ISO Tank Transport',
            'نقل الكيماويات والبضائع الخطرة.': 'Transport of chemicals and hazardous goods.',
            'About Taazur': 'About Taazur',
            'نجاحنا يتحقق عندما يحصل عملاؤنا على فرصة لتجاوز توقعاتهم. نحن نؤمن بأن الشراكة الحقيقية مع عملائنا هي أساس النجاح المستدام.': 'Our success is achieved when our clients have the opportunity to exceed their expectations. We believe that true partnership with our clients is the foundation of sustainable success.',
            'نحن متحمسون': 'We are passionate',
            'لدينا سجل حافل بالإنجازات والنجاحات المثبتة': 'We have a proven track record of achievements and successes',
            'جديرون بالثقة': 'We are trustworthy',
            'الصدق بالنسبة لنا هو السياسة الوحيدة التي نتبعها': 'Honesty is the only policy we follow',
            'نحن في تطور دائم': 'We are constantly evolving',
            'نلتزم بإكمال جميع المشاريع بأعلى معايير الجودة': 'We are committed to completing all projects to the highest quality standards',
            'شهادة الأيزو': 'ISO Certification',
            'نظام إدارة الجودة ISO 9001 معتمد عالمياً': 'ISO 9001 Quality Management System is internationally certified',
            'لماذا تختارنا؟': 'Why Choose Us?',
            'نتميز بخبرة أكثر من 43 عاماً في تقديم أفضل الخدمات لعملائنا': 'We have over 43 years of experience providing the best services to our clients',
            'خبرة أكثر من 43 عاماً': 'Over 43 Years of Experience',
            'جودة عالية معتمدة': 'Certified High Quality',
            'نلتزم بأعلى معايير الجودة العالمية مع شهادة ISO 9001، لضمان رضا عملائنا التام': 'We adhere to the highest global quality standards with ISO 9001 certification to ensure our clients’ complete satisfaction',
            'فريق متخصص ومحترف': 'Specialized & Professional Team',
            'نوظف أفضل الكفاءات والخبرات في مجالنا، مع تدريب مستمر لضمان التميز في الأداء': 'We employ the best talents and expertise in our field, with continuous training to ensure excellence in performance',
            'خدمة سريعة وفعالة': 'Fast & Efficient Service',
            'انضم إلى فريق تآزر': 'Join Taazur Team',
            'نبحث عن مواهب متميزة لتنمية فريقنا المتخصص': 'We are looking for outstanding talents to grow our specialized team',
            'لماذا تختار العمل معنا؟': 'Why Work With Us?',
            'بيئة عمل محفزة ومهنية': 'Motivating and Professional Work Environment',
            'فرص تطوير وتدريب مستمر': 'Continuous Development and Training Opportunities',
            'مزايا تنافسية وحزم تأمين شاملة': 'Competitive Benefits and Comprehensive Insurance Packages',
            'مشاريع متنوعة ومثيرة للاهتمام': 'Diverse and Exciting Projects',
            'فرص نمو وظيفي واضحة': 'Clear Career Growth Opportunities',
            'تقديم طلب توظيف': 'Apply for a Job',
            'Apply for a Job': 'Apply for a Job',
            'أرسل سيرتك الذاتية مع خطاب تغطية': 'Send your CV with a cover letter',
            'مجموعة شركات رائدة بأكثر من 43 عاماً من الخبرة في مجالات متعددة': 'A leading group of companies with over 43 years of experience in various fields',
            'روابط سريعة': 'Quick Links',
            '© 2025 تآزر. جميع الحقوق محفوظة.': '© 2025 Taazur. All rights reserved.',
            'سياسة الخصوصية': 'Privacy Policy',
            'الشروط والأحكام': 'Terms & Conditions',
        }
    };

    // ترجمة دقيقة باستخدام data-i18n فقط في الهيرو والخدمات المميزة
    const i18nDict = {
        ar: {
            hero_trucks_title: 'شاحنات تآزر',
            hero_trucks_desc: 'أسطول متكامل من الشاحنات الحديثة لتقديم أفضل الخدمات اللوجستية',
            hero_services_title: 'خدماتنا المميزة',
            hero_services_desc: 'نقدم مجموعة شاملة من الخدمات اللوجستية والمقاولات',
            hero_service1_title: 'مقاولات عامة',
            hero_service1_desc: 'مشاريع البناء والتشييد',
            hero_service2_title: 'توريد قوى عاملة',
            hero_service2_desc: 'موظفين محترفين',
            hero_service3_title: 'خدمات لوجستية',
            hero_service3_desc: 'نقل وتخزين',
            hero_service4_title: 'دعم وصيانة',
            hero_service4_desc: 'خدمة 24/7',
            hero_team_title: 'فريق تآزر',
            hero_team_desc: 'فريق محترف من الخبراء في مختلف المجالات',
            hero_team_feat1: 'خبرة 43+ عام',
            hero_team_feat2: 'فريق متخصص',
            hero_team_feat3: 'خدمة متميزة',
            hero_hq_title: 'مقر تآزر',
            hero_hq_desc: 'مقرنا الرئيسي مجهز بأحدث التقنيات لضمان جودة الخدمات',
            hero_hq_feat1: 'مقر حديث',
            hero_hq_feat2: 'تقنيات متطورة',
            hero_hq_feat3: 'فريق محترف',
            job1_title: 'مسؤول مشتريات',
            job1_desc: 'فرصة عمل مميزة لذوي الإعاقة في مجال المشتريات',
            job1_feat1: 'خبرة في التفاوض',
            job1_feat2: 'إدارة الموردين',
            job1_feat3: 'بيئة داعمة',
            job2_title: 'مساعد إداري',
            job2_desc: 'وظيفة إدارية مناسبة لذوي الإعاقة مع دعم كامل',
            job2_feat1: 'مهارات إدارية',
            job2_feat2: 'برامج الأوفيس',
            job2_feat3: 'تدريب مستمر',
            job3_title: 'محاسب',
            job3_desc: 'وظيفة محاسبة مخصصة لذوي الإعاقة مع مرونة في العمل',
            job3_feat1: 'محاسبة مالية',
            job3_feat2: 'برامج محاسبية',
            job3_feat3: 'عمل مرن',
            staff1_name: 'عبد الكريم الغليقة',
            staff1_pos: 'الرئيس',
            staff2_name: 'سليمان الغليقة',
            staff2_pos: 'المدير العام',
            staff3_name: 'إبراهيم الغليقة',
            staff3_pos: 'مدير تطوير الأعمال',
            staff4_name: 'أحمد الغليقة',
            staff4_pos: 'مدير التموين والمطاعم',
            staff5_name: 'نايف الزهراني',
            staff5_pos: 'مدير الموارد البشرية',
            staff6_name: 'أحمد الوكيل',
            staff6_pos: 'مدير المالية',
            staff7_name: 'وسيم فهمي',
            staff7_pos: 'المدير الإقليمي في الأردن',
        },
        en: {
            hero_trucks_title: 'Taazur Trucks',
            hero_trucks_desc: 'A complete fleet of modern trucks to provide the best logistics services',
            hero_services_title: 'Our Distinguished Services',
            hero_services_desc: 'We offer a comprehensive range of logistics and contracting services',
            hero_service1_title: 'General Contracting',
            hero_service1_desc: 'Construction and building projects',
            hero_service2_title: 'Manpower Supply',
            hero_service2_desc: 'Professional staff',
            hero_service3_title: 'Logistics Services',
            hero_service3_desc: 'Transport and storage',
            hero_service4_title: 'Support & Maintenance',
            hero_service4_desc: '24/7 Service',
            hero_team_title: 'Taazur Team',
            hero_team_desc: 'A professional team of experts in various fields',
            hero_team_feat1: '43+ Years Experience',
            hero_team_feat2: 'Specialized Team',
            hero_team_feat3: 'Distinguished Service',
            hero_hq_title: 'Taazur Headquarters',
            hero_hq_desc: 'Our main headquarters is equipped with the latest technologies to ensure service quality',
            hero_hq_feat1: 'Modern HQ',
            hero_hq_feat2: 'Advanced Technologies',
            hero_hq_feat3: 'Professional Team',
            job1_title: 'Purchasing Officer',
            job1_desc: 'A distinguished job opportunity for people with disabilities in the field of purchasing',
            job1_feat1: 'Negotiation Skills',
            job1_feat2: 'Supplier Management',
            job1_feat3: 'Supportive Environment',
            job2_title: 'Administrative Assistant',
            job2_desc: 'An administrative job suitable for people with disabilities with full support',
            job2_feat1: 'Administrative Skills',
            job2_feat2: 'Office Programs',
            job2_feat3: 'Continuous Training',
            job3_title: 'Accountant',
            job3_desc: 'An accounting job dedicated to people with disabilities with flexible work',
            job3_feat1: 'Financial Accounting',
            job3_feat2: 'Accounting Programs',
            job3_feat3: 'Flexible Work',
            staff1_name: 'Abdul Karim Al-Ghaliqa',
            staff1_pos: 'President',
            staff2_name: 'Sulaiman Al-Ghaliqa',
            staff2_pos: 'General Manager',
            staff3_name: 'Ibrahim Al-Ghaliqa',
            staff3_pos: 'Business Development Manager',
            staff4_name: 'Ahmed Al-Ghaliqa',
            staff4_pos: 'Supply & Restaurants Manager',
            staff5_name: 'Nayef Al-Zahrani',
            staff5_pos: 'HR Manager',
            staff6_name: 'Ahmed Al-Wakeel',
            staff6_pos: 'Finance Manager',
            staff7_name: 'Waseem Fahmi',
            staff7_pos: 'Regional Manager in Jordan',
        }
    };

    function switchLanguage() {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        langSwitchBtn.textContent = currentLang === 'ar' ? 'EN' : 'عربي';

        // ترجمة عناصر الهيرو والخدمات المميزة بدقة
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18nDict[currentLang][key]) {
                el.textContent = i18nDict[currentLang][key];
            }
        });

        // باقي الترجمة العامة (للعناصر الأخرى)
        Object.keys(translations.ar).forEach(arText => {
            const enText = translations.en[arText];
            const selector = `:not(script):not(style):not(textarea)`;
            document.querySelectorAll(selector).forEach(el => {
                if (el.childNodes && el.childNodes.length) {
                    el.childNodes.forEach(node => {
                        if (node.nodeType === 3) {
                            const val = node.nodeValue.trim();
                            // ترجمة الحقوق مع سنة متغيرة
                            if (/^© \d{4} تآزر\. جميع الحقوق محفوظة\.$/.test(val)) {
                                if (currentLang === 'ar') {
                                    node.nodeValue = val.replace(/© \d{4} Taazur\. All rights reserved\./, `© ${new Date().getFullYear()} تآزر. جميع الحقوق محفوظة.`);
                                } else {
                                    node.nodeValue = val.replace(/© \d{4} تآزر\. جميع الحقوق محفوظة\./, `© ${new Date().getFullYear()} Taazur. All rights reserved.`);
                                }
                                return;
                            }
                            // ترجمة باقي النصوص
                            if (currentLang === 'ar') {
                                if (val.includes(enText)) {
                                    node.nodeValue = arText;
                                }
                            } else {
                                if (val.includes(arText)) {
                                    node.nodeValue = enText;
                                }
                            }
                        }
                    });
                }
            });
        });
    }

    if (langSwitchBtn) {
        langSwitchBtn.addEventListener('click', switchLanguage);
    }

    // Dark Theme Switcher
    const darkSwitchBtn = document.getElementById('dark-switch');
    function setDarkTheme(enabled) {
        if (enabled) {
            document.documentElement.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            if (darkSwitchBtn) darkSwitchBtn.textContent = '☀️';
        } else {
            document.documentElement.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            if (darkSwitchBtn) darkSwitchBtn.textContent = '🌙';
        }
    }
    if (darkSwitchBtn) {
        darkSwitchBtn.addEventListener('click', function() {
            const isDark = document.documentElement.classList.contains('dark-theme');
            setDarkTheme(!isDark);
        });
    }
    // Load theme preference
    if (localStorage.getItem('theme') === 'dark') {
        setDarkTheme(true);
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();
