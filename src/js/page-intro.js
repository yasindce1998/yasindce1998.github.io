export function initPageIntro() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('page-loaded');
        return;
    }

    const header = document.querySelector('.header');
    const heroCards = document.querySelectorAll('.draggable-card');
    const statusBar = document.querySelector('.canvas-status-bar');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    const introElements = [header, ...heroCards, statusBar, scrollIndicator].filter(Boolean);
    introElements.forEach(el => el.classList.add('page-intro-hidden'));

    requestAnimationFrame(() => {
        setTimeout(() => document.body.classList.add('page-loaded'), 50);

        if (header) {
            header.style.transitionDelay = '0.1s';
        }

        heroCards.forEach((card, i) => {
            card.style.transitionDelay = `${0.3 + i * 0.1}s`;
        });

        if (statusBar) {
            statusBar.style.transitionDelay = '0.6s';
        }

        if (scrollIndicator) {
            scrollIndicator.style.transitionDelay = '0.9s';
        }
    });
}
