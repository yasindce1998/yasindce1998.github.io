export function initHorizontalScroll() {
    const section = document.querySelector('.projects');
    const grid = document.querySelector('.projects-grid');
    if (!section || !grid) return;

    if (window.innerWidth < 900) return;

    const tiles = grid.querySelectorAll('.project-tile');
    const tileCount = tiles.length;
    const cardWidth = window.innerWidth * 0.75;
    const gap = 40;
    const totalScrollWidth = (tileCount * (cardWidth + gap)) - gap + window.innerWidth * 0.25;

    section.style.height = totalScrollWidth + 'px';

    const stickyWrapper = document.createElement('div');
    stickyWrapper.className = 'projects-sticky';
    section.insertBefore(stickyWrapper, grid);
    stickyWrapper.appendChild(grid);

    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const rect = section.getBoundingClientRect();
            const sectionTop = -rect.top;
            const maxScroll = section.offsetHeight - window.innerHeight;
            const progress = Math.max(0, Math.min(sectionTop / maxScroll, 1));
            const translateX = -progress * (totalScrollWidth - window.innerWidth);

            grid.style.transform = `translateX(${translateX}px)`;
            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth < 900) {
                section.style.height = '';
                grid.style.transform = '';
                return;
            }
            const newCardWidth = window.innerWidth * 0.75;
            const newTotalWidth = (tileCount * (newCardWidth + gap)) - gap + window.innerWidth * 0.25;
            section.style.height = newTotalWidth + 'px';
        }, 150);
    });
}
