export function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = document.querySelectorAll('[data-parallax-speed]');
    if (!elements.length) return;

    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;
        elements.forEach(el => {
            const speed = parseFloat(el.dataset.parallaxSpeed) || 0;
            const rect = el.getBoundingClientRect();
            const offsetTop = rect.top + scrollY;
            const yPos = (scrollY - offsetTop) * speed;
            el.style.transform = `translateY(${yPos}px)`;
        });
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();
}
