// ============================================
// MI ENTERPRISES - PREMIUM WEBSITE SCRIPT
// ============================================

// Initialize
const app = {
    init() {
        this.setupCursor();
        this.setupScrollProgress();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupCounters();
        this.setupEquipment();
        this.setupGallery();
        this.setupTestimonials();
        this.setupFloatingElements();
        this.setupParallax();
        this.removeLoadingScreen();
        this.detectTouchDevice();
    },

    // Custom Cursor
    setupCursor() {
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursorFollower');

        if (!cursor || !follower) return;

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        const animate = () => {
            followerX += (mouseX - followerX) * 0.2;
            followerY += (mouseY - followerY) * 0.2;

            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(animate);
        };
        animate();

        // Hide cursor on links and buttons
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button')) {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                follower.style.transform = 'scale(1.5)';
            } else {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                follower.style.transform = 'scale(1)';
            }
        });
    },

    // Scroll Progress Bar
    setupScrollProgress() {
        const progress = document.getElementById('scrollProgress');
        if (!progress) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            progress.style.width = scrolled + '%';
        });
    },

    // Navigation
    setupNavigation() {
        const header = document.getElementById('header');
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!header || !menuToggle) return;

        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');

                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    },

    // Scroll Animations
    setupScrollAnimations() {
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100,
            easing: 'ease-in-out-cubic'
        });
    },

    // Counter Animation
    setupCounters() {
        const counters = document.querySelectorAll('.counter');
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.dataset.target);
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            entry.target.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = target;
                            entry.target.classList.add('counted');
                        }
                    };
                    updateCounter();
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    },

    // Equipment Section
    setupEquipment() {
        const equipment = [
            {
                id: 1,
                name: 'Air Compressor',
                description: 'Industrial-grade air compressor for construction, painting, and pneumatic tools.',
                price: '₹799',
                image: 'images/compressor.jpg',
                category: 'Compressors'
            },
            {
                id: 2,
                name: 'Rotary Hammer Drill',
                description: 'Professional heavy-duty drilling machine for concrete and masonry work.',
                price: '₹499',
                image: 'images/drill.png',
                category: 'Drills'
            },
            {
                id: 3,
                name: 'Welding Machine',
                description: 'Reliable electric welding equipment for industrial and construction projects.',
                price: '₹699',
                image: 'images/welding.png',
                category: 'Welding'
            },
            {
                id: 4,
                name: 'Concrete Cutter',
                description: 'Heavy-duty concrete cutting machine with precision blade for clean cuts.',
                price: '₹999',
                image: 'images/cutter.png',
                category: 'Cutters'
            },
            {
                id: 5,
                name: 'Professional Chainsaw',
                description: 'Powerful chainsaw for wood cutting and heavy-duty demolition work.',
                price: '₹599',
                image: 'images/chainsaw.jpg',
                category: 'Saws'
            },
            {
                id: 6,
                name: 'Angle Grinder',
                description: 'Professional angle grinder for cutting, grinding, and polishing metal.',
                price: '₹399',
                image: 'images/grinder.png',
                category: 'Grinders'
            }
        ];

        const grid = document.getElementById('equipmentGrid');
        if (!grid) return;

        equipment.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'equipment-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', index * 100);

            card.innerHTML = `
                <div class="equipment-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <div class="equipment-price">${item.price}/Day</div>
                </div>
                <div class="equipment-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="equipment-actions">
                        <a href="https://wa.me/919303171805?text=Hi%20MI%20Enterprises%2C%20I%20am%20interested%20in%20renting%20${item.name}" class="btn-primary" target="_blank" rel="noopener noreferrer">Rent Now</a>
                        <a href="https://wa.me/919303171805?text=Hi%20MI%20Enterprises%2C%20I%20need%20more%20details%20about%20${item.name}" class="btn-whatsapp" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i></a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    },

    // Gallery
    setupGallery() {
        const gallery = [
            { image: 'images/gallery1.png', alt: 'Construction equipment in operation' },
            { image: 'images/gallery2.png', alt: 'Heavy machinery at work' },
            { image: 'images/gallery3.png', alt: 'Professional equipment rental' },
            { image: 'images/hero.png', alt: 'Equipment showcase' }
        ];

        const grid = document.getElementById('galleryGrid');
        if (!grid) return;

        gallery.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'gallery-item';
            itemDiv.setAttribute('data-aos', 'fade-up');
            itemDiv.setAttribute('data-aos-delay', index * 100);
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <div class="gallery-icon">
                        <i class="fas fa-search-plus"></i>
                    </div>
                </div>
            `;
            itemDiv.addEventListener('click', () => this.openLightbox(item.image, index));
            grid.appendChild(itemDiv);
        });
    },

    // Lightbox
    openLightbox(image, index) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        if (!lightbox) return;

        this.currentLightboxIndex = index;
        lightboxImage.src = image;
        lightbox.classList.add('active');

        document.addEventListener('keydown', this.handleLightboxKeyboard.bind(this));
    },

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;
        lightbox.classList.remove('active');
    },

    handleLightboxKeyboard(e) {
        if (e.key === 'Escape') this.closeLightbox();
        if (e.key === 'ArrowLeft') this.prevLightboxImage();
        if (e.key === 'ArrowRight') this.nextLightboxImage();
    },

    nextLightboxImage() {
        const items = document.querySelectorAll('.gallery-item');
        this.currentLightboxIndex = (this.currentLightboxIndex + 1) % items.length;
        const img = items[this.currentLightboxIndex].querySelector('img');
        document.getElementById('lightboxImage').src = img.src;
    },

    prevLightboxImage() {
        const items = document.querySelectorAll('.gallery-item');
        this.currentLightboxIndex = (this.currentLightboxIndex - 1 + items.length) % items.length;
        const img = items[this.currentLightboxIndex].querySelector('img');
        document.getElementById('lightboxImage').src = img.src;
    },

    // Testimonials
    setupTestimonials() {
        const testimonials = [
            {
                name: 'Rajesh Kumar',
                position: 'Construction Manager',
                text: 'MI Enterprises provided excellent equipment and outstanding service. Their competitive pricing and reliable machinery made our project successful.',
                rating: 5
            },
            {
                name: 'Priya Singh',
                position: 'Project Owner',
                text: 'Professional team, well-maintained equipment, and 24/7 support. Highly recommended for any construction project in Bhopal.',
                rating: 5
            },
            {
                name: 'Amit Patel',
                position: 'Contractor',
                text: 'Best equipment rental service in Bhopal. Fast delivery, reasonable prices, and excellent customer support throughout our rental period.',
                rating: 5
            },
            {
                name: 'Neha Sharma',
                position: 'Civil Engineer',
                text: 'We trust MI Enterprises for all our equipment needs. Their machines are always in perfect condition and ready for use.',
                rating: 5
            }
        ];

        const slider = document.getElementById('testimonialsSlider');
        if (!slider) return;

        testimonials.forEach((testimonial, index) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', index * 100);

            const stars = '⭐'.repeat(testimonial.rating);

            card.innerHTML = `
                <div class="testimonial-header">
                    <div class="testimonial-avatar">${testimonial.name.charAt(0)}</div>
                    <div class="testimonial-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                </div>
                <div class="testimonial-rating">
                    ${Array(testimonial.rating).fill(0).map(() => '<i class="fas fa-star star"></i>').join('')}
                </div>
                <p class="testimonial-text">"${testimonial.text}"</p>
            `;
            slider.appendChild(card);
        });

        // Setup slider navigation
        let currentSlide = 0;
        const cards = document.querySelectorAll('.testimonial-card');

        const showSlide = (n) => {
            cards.forEach(card => card.style.display = 'none');
            cards[n].style.display = 'block';
        };

        document.getElementById('testimonialNext')?.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % cards.length;
            showSlide(currentSlide);
        });

        document.getElementById('testimonialPrev')?.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + cards.length) % cards.length;
            showSlide(currentSlide);
        });

        showSlide(0);
    },

    // Floating Elements
    setupFloatingElements() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },

    // Parallax Effect
    setupParallax() {
        const heroImage = document.querySelector('.hero-image');
        if (!heroImage) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroImage.style.transform = `scale(1.05) translateY(${scrolled * 0.5}px)`;
        });
    },

    // Remove Loading Screen
    removeLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
        }, 1500);
    },

    // Detect Touch Device
    detectTouchDevice() {
        const isTouchDevice = () => {
            return (('ontouchstart' in window) ||
                    (navigator.maxTouchPoints > 0) ||
                    (navigator.msMaxTouchPoints > 0));
        };

        if (isTouchDevice()) {
            document.body.classList.add('touch-device');
        }
    }
};

// Lightbox Setup
function setupLightboxEvents() {
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightbox = document.getElementById('lightbox');

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => app.closeLightbox());
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => app.prevLightboxImage());
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => app.nextLightboxImage());
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                app.closeLightbox();
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
    setupLightboxEvents();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Performance: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reflow handling
    }, 250);
});

// Performance monitoring
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime);
    });
}
