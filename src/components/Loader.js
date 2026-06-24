import gsap from 'gsap';

export class PageLoader {
    constructor(onComplete) {
        this.onComplete = onComplete;
        this.progress = 0;
        this.isComplete = false;

        this.createElement();
        this.startAnimation();
    }

    createElement() {
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'loader';
        this.wrapper.innerHTML = `
            <div class="loader-bg"></div>
            <div class="loader-content">
                <div class="loader-line top"></div>
                <div class="loader-center">
                    <div class="loader-counter">
                        <span class="loader-number">0</span>
                        <span class="loader-percent">%</span>
                    </div>
                    <div class="loader-bar-wrap">
                        <div class="loader-bar"></div>
                    </div>
                </div>
                <div class="loader-line bottom"></div>
            </div>
            <div class="loader-columns">
                <div class="loader-col"></div>
                <div class="loader-col"></div>
                <div class="loader-col"></div>
                <div class="loader-col"></div>
                <div class="loader-col"></div>
            </div>
        `;
        document.body.appendChild(this.wrapper);
        document.body.style.overflow = 'hidden';

        this.numberEl = this.wrapper.querySelector('.loader-number');
        this.barEl = this.wrapper.querySelector('.loader-bar');
        this.cols = this.wrapper.querySelectorAll('.loader-col');
    }

    startAnimation() {
        const tl = gsap.timeline();

        tl.to(this, {
            progress: 100,
            duration: 2.2,
            ease: 'power2.inOut',
            onUpdate: () => {
                const val = Math.round(this.progress);
                this.numberEl.textContent = val;
                this.barEl.style.transform = `scaleX(${this.progress / 100})`;
            }
        });

        tl.to({}, { duration: 0.3 });

        tl.call(() => this.reveal());
    }

    reveal() {
        const tl = gsap.timeline({
            onComplete: () => {
                this.isComplete = true;
                document.body.style.overflow = '';
                document.body.classList.add('loaded');
                this.wrapper.remove();
                if (this.onComplete) this.onComplete();
            }
        });

        tl.to(this.wrapper.querySelector('.loader-content'), {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: 'power2.in'
        });

        tl.to(this.cols, {
            scaleY: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power4.inOut',
            transformOrigin: 'top'
        }, '-=0.1');

        tl.to(this.wrapper.querySelector('.loader-bg'), {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out'
        }, '-=0.4');
    }
}
