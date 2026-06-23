export function initHoverGlow() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cards = document.querySelectorAll('.project-blueprint-card');

    cards.forEach(card => {
        const glow = document.createElement('div');
        glow.className = 'card-glow';
        card.appendChild(glow);
        card.classList.add('tilt-active');

        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.setProperty('--glow-x', `${x}px`);
            card.style.setProperty('--glow-y', `${y}px`);
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('pointerleave', () => {
            card.style.transform = '';
        });
    });
}
