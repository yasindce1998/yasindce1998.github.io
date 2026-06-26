import gsap from 'gsap';

export class PageLoader {
    constructor(onComplete) {
        this.onComplete = onComplete;
        this.progress = 0;

        this.loader = document.querySelector('.loader');
        if (!this.loader) {
            if (this.onComplete) this.onComplete();
            return;
        }

        this.numberEl = this.loader.querySelector('.loader-number');
        this.barInner = this.loader.querySelector('.loader-bar-inner');

        this.startAnimation();
    }

    startAnimation() {
        const tl = gsap.timeline();

        tl.to(this, {
            progress: 100,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
                const val = Math.round(this.progress);
                if (this.numberEl) this.numberEl.textContent = val;
                if (this.barInner) this.barInner.style.transform = `scaleX(${this.progress / 100})`;
            }
        });

        tl.to({}, { duration: 0.2 });
        tl.call(() => this.glitchReveal());
    }

    glitchReveal() {
        const counter = this.loader.querySelector('.loader-counter');
        if (!counter) {
            this.reveal();
            return;
        }

        const tl = gsap.timeline({ onComplete: () => this.reveal() });

        tl.to(counter, { opacity: 0, duration: 0.05 });
        tl.to(counter, { opacity: 1, duration: 0.05 });
        tl.to(counter, { opacity: 0, x: -3, duration: 0.04 });
        tl.to(counter, { opacity: 0.7, x: 2, duration: 0.04 });
        tl.to(counter, { opacity: 0, x: 0, duration: 0.05 });
    }

    reveal() {
        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = '';
                document.body.classList.add('loaded');
                this.loader.classList.add('hidden');
                gsap.to(this.loader, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => {
                        this.loader.remove();
                        window.dispatchEvent(new CustomEvent('introComplete'));
                        if (this.onComplete) this.onComplete();
                    }
                });
            }
        });

        tl.to(this.loader.querySelector('.loader-counter'), {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: 'power2.in'
        });

        tl.to(this.barInner, {
            scaleX: 1,
            duration: 0.3,
            ease: 'power2.out'
        }, '-=0.1');
    }
}
