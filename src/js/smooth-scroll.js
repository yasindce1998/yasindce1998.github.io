export function initSmoothScroll() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        initBasicAnchorScroll();
        return;
    }

    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let isScrolling = false;
    const lerpFactor = 0.1;
    const wheelMultiplier = 1;
    const limit = document.documentElement.scrollHeight - window.innerHeight;

    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    function animate() {
        currentScroll = lerp(currentScroll, targetScroll, lerpFactor);

        if (Math.abs(targetScroll - currentScroll) < 0.5) {
            currentScroll = targetScroll;
            isScrolling = false;
        }

        window.scrollTo(0, currentScroll);

        if (isScrolling) {
            requestAnimationFrame(animate);
        }
    }

    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetScroll = Math.max(0, Math.min(targetScroll + e.deltaY * wheelMultiplier, maxScroll));

        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(animate);
        }
    }, { passive: false });

    window.addEventListener('resize', () => {
        targetScroll = Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.scrollY;
                targetScroll = Math.max(0, Math.min(offsetTop, document.documentElement.scrollHeight - window.innerHeight));

                if (!isScrolling) {
                    isScrolling = true;
                    requestAnimationFrame(animate);
                }
            }
        });
    });

    let touchStart = 0;
    window.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const delta = (touchStart - touchY) * 2;
        touchStart = touchY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetScroll = Math.max(0, Math.min(targetScroll + delta, maxScroll));

        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(animate);
        }
    }, { passive: true });
}

function initBasicAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
