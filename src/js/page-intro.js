export function initPageIntro() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('page-loaded');
        return;
    }

    const header = document.querySelector('.header');
    const heroLines = document.querySelectorAll('.hero-line');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroFooter = document.querySelector('.hero-footer');

    const introElements = [header, ...heroLines, heroSubtitle, heroFooter].filter(Boolean);
    introElements.forEach(el => el.classList.add('page-intro-hidden'));

    requestAnimationFrame(() => {
        setTimeout(() => document.body.classList.add('page-loaded'), 50);

        if (header) {
            header.style.transitionDelay = '0.1s';
        }

        heroLines.forEach((line, i) => {
            line.style.transitionDelay = `${0.2 + i * 0.1}s`;
        });

        if (heroSubtitle) {
            heroSubtitle.style.transitionDelay = '0.6s';
        }

        if (heroFooter) {
            heroFooter.style.transitionDelay = '0.8s';
        }
    });
}
