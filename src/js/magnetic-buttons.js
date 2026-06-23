export function initMagneticButtons() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const targets = document.querySelectorAll('.nav-link, .search-btn, .logo-svg, .blueprint-card-link, .scroll-indicator');
    const strength = 0.3;
    const maxDistance = 40;

    targets.forEach(el => {
        el.classList.add('magnetic-target');

        el.addEventListener('pointermove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < maxDistance + rect.width / 2) {
                const moveX = deltaX * strength;
                const moveY = deltaY * strength;
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });

        el.addEventListener('pointerleave', () => {
            el.style.transform = '';
        });
    });
}
