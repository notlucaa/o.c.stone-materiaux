document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. DÉCORATION DE BASE (Noise, Progress Bar)
    // ---------------------------------------------------------
    const body = document.body;
    
    // Ajout du grain de texture
    const noise = document.createElement('div');
    noise.className = 'bg-noise';
    body.appendChild(noise);

    // Ajout de la barre de progression
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // ---------------------------------------------------------
    // 2. MOBILE MENU & NAVIGATION
    // ---------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.createElement('div');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '☰';
    navbar.appendChild(mobileToggle);

    mobileToggle.addEventListener('click', () => {
        navbar.classList.toggle('mobile-active');
        mobileToggle.innerHTML = navbar.classList.contains('mobile-active') ? '✕' : '☰';
    });

    const navLinks = document.querySelectorAll('.navbar nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('mobile-active');
            mobileToggle.innerHTML = '☰';
        });
    });

    // ---------------------------------------------------------
    // 3. REVEAL ON SCROLL (Slide-up effect)
    // ---------------------------------------------------------
    const revealElements = document.querySelectorAll('.staggered-reveal, section, .glass-card');
    revealElements.forEach(el => el.classList.add('reveal-up'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---------------------------------------------------------
    // 4. TESTIMONIALS CAROUSEL
    // ---------------------------------------------------------
    const track = document.getElementById("review-track");
    if (track) {
        const prevBtn = document.getElementById("review-prev");
        const nextBtn = document.getElementById("review-next");
        let currentIndex = 0;
        
        nextBtn.addEventListener("click", () => {
            const cards = track.children;
            const isMobile = window.innerWidth <= 768;
            const maxIndex = isMobile ? cards.length - 1 : cards.length - 2;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });
        
        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        function updateSlider() {
            const card = track.children[0];
            const gap = parseFloat(getComputedStyle(track).gap) || 48; 
            const cardWidth = card.offsetWidth;
            const moveAmount = currentIndex * (cardWidth + gap);
            track.style.transform = `translateX(-${moveAmount}px)`;
        }
        
        window.addEventListener("resize", updateSlider);
    }

    // ---------------------------------------------------------
    // 5. 3D TILT EFFECT & GLASS GLOW
    // ---------------------------------------------------------
    const tiltCards = document.querySelectorAll('.glass-card, .pillar-card, .testimonial-card');
    
    tiltCards.forEach(card => {
        card.classList.add('tilt-card', 'glass-glow-container');
        
        // Add glow element
        const glow = document.createElement('div');
        glow.className = 'glass-glow-effect';
        card.appendChild(glow);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Glow position
            glow.style.setProperty('--x', `${x}px`);
            glow.style.setProperty('--y', `${y}px`);

            // Tilt calculation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 15; // Max 15 deg
            const rotateY = (x - centerX) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // ---------------------------------------------------------
    // 7. COUNTER ANIMATION
    // ---------------------------------------------------------
    const counters = document.querySelectorAll('.counter');
    const counterDuration = 2000;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let startTime = null;

                const animate = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / counterDuration, 1);
                    const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    const currentTotal = Math.floor(easeOutExpo * target);
                    counter.innerText = currentTotal.toLocaleString('fr-FR').replace(/\u00a0/g, ' ');

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        counter.innerText = target.toLocaleString('fr-FR').replace(/\u00a0/g, ' ');
                    }
                };
                requestAnimationFrame(animate);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(counter => counterObserver.observe(counter));
});
