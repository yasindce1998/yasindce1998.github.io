export function initPageIntro() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('page-loaded');
        document.body.classList.add('intro-complete');
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'loader-overlay';
    overlay.innerHTML = `
        <div class="loader-counter">
            <span class="loader-number">0</span>
        </div>
        <div class="loader-line"></div>
    `;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const numberEl = overlay.querySelector('.loader-number');
    const lineEl = overlay.querySelector('.loader-line');

    let count = 0;
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        count = Math.floor(eased * 100);
        numberEl.textContent = count;
        lineEl.style.transform = `scaleX(${eased})`;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            numberEl.textContent = '100';
            setTimeout(revealPage, 300);
        }
    }

    requestAnimationFrame(updateCounter);

    function revealPage() {
        overlay.classList.add('loader-reveal');
        document.body.style.overflow = '';
        document.body.classList.add('page-loaded');

        setTimeout(() => {
            document.body.classList.add('intro-complete');
            overlay.remove();
        }, 1200);
    }
}
