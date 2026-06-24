export function initHoverGlow() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const tiles = document.querySelectorAll('.project-tile');

    tiles.forEach(tile => {
        tile.addEventListener('pointermove', (e) => {
            const rect = tile.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            tile.style.setProperty('--glow-x', `${x}px`);
            tile.style.setProperty('--glow-y', `${y}px`);
        });
    });
}
