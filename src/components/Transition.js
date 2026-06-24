import gsap from 'gsap';

export class PageTransition {
    constructor() {
        this.isAnimating = false;
        this.createElement();
    }

    createElement() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition';
        this.overlay.innerHTML = `
            <div class="transition-columns">
                <div class="transition-col"></div>
                <div class="transition-col"></div>
                <div class="transition-col"></div>
                <div class="transition-col"></div>
                <div class="transition-col"></div>
            </div>
        `;
        document.body.appendChild(this.overlay);
        this.cols = this.overlay.querySelectorAll('.transition-col');
    }

    async enter() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.overlay.style.pointerEvents = 'all';

        return new Promise((resolve) => {
            gsap.fromTo(this.cols, {
                scaleY: 0
            }, {
                scaleY: 1,
                duration: 0.6,
                stagger: 0.06,
                ease: 'power4.inOut',
                transformOrigin: 'bottom',
                onComplete: resolve
            });
        });
    }

    async leave() {
        return new Promise((resolve) => {
            gsap.to(this.cols, {
                scaleY: 0,
                duration: 0.6,
                stagger: 0.06,
                ease: 'power4.inOut',
                transformOrigin: 'top',
                onComplete: () => {
                    this.isAnimating = false;
                    this.overlay.style.pointerEvents = 'none';
                    resolve();
                }
            });
        });
    }
}
