export function initHoverDistortion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tiles = document.querySelectorAll('.project-tile');

    tiles.forEach(tile => {
        const overlay = document.createElement('div');
        overlay.className = 'distortion-overlay';
        tile.appendChild(overlay);
    });
}
