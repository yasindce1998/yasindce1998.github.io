export function initPageIntro() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('page-loaded');
        document.body.classList.add('intro-complete');
        return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'loader-wrapper';
    wrapper.innerHTML = `
        <div class="loader-panel left"></div>
        <div class="loader-panel right"></div>
        <div class="loader-counter">
            <span class="loader-number">0</span>
        </div>
    `;
    document.body.appendChild(wrapper);
    document.body.style.overflow = 'hidden';

    const numberEl = wrapper.querySelector('.loader-number');
    const panelLeft = wrapper.querySelector('.loader-panel.left');
    const panelRight = wrapper.querySelector('.loader-panel.right');
    const counter = wrapper.querySelector('.loader-counter');

    const duration = 2000;
    const startTime = performance.now();

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function updateCounter(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const value = Math.round(eased * 100);
        numberEl.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            numberEl.textContent = '100';
            setTimeout(revealPage, 300);
        }
    }

    requestAnimationFrame(updateCounter);

    function revealPage() {
        panelLeft.classList.add('loader-reveal');
        panelRight.classList.add('loader-reveal');
        counter.classList.add('loader-reveal');
        document.body.style.overflow = '';
        document.body.classList.add('page-loaded');

        setTimeout(() => {
            document.body.classList.add('intro-complete');
            wrapper.remove();
        }, 1200);
    }
}
