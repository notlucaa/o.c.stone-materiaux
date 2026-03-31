document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.createElement('div');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '☰'; // Hamburger icon
    navbar.appendChild(mobileToggle);

    mobileToggle.addEventListener('click', () => {
        navbar.classList.toggle('mobile-active');
        mobileToggle.innerHTML = navbar.classList.contains('mobile-active') ? '✕' : '☰';
    });

    // Close mobile menu on click link
    const navLinks = document.querySelectorAll('.navbar nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('mobile-active');
            mobileToggle.innerHTML = '☰';
        });
    });

    // Handle smooth carousel for testimonials (if it exists)
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
});
