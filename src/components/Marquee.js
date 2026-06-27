import { isReducedMotion } from '../utils/device.js';

export class Marquee {
    static initAll() {
        return [...document.querySelectorAll('.marquee')].map((el) => new Marquee(el));
    }

    constructor(element) {
        this.element = element || document.querySelector('.marquee');
        if (!this.element) return;

        this.track = this.element.querySelector('.marquee-track');
        if (!this.track) return;

        this.speed = 1;
        this.direction = this.element.classList.contains('marquee--reverse') ? 1 : -1;
        this.scrollVelocity = 0;
        this.paused = isReducedMotion();

        this.duplicate();
        if (!this.paused) this.animate();
    }

    duplicate() {
        const clone = this.track.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        this.element.appendChild(clone);
        this.tracks = [this.track, clone];
        this.xPercent = this.direction === 1 ? -50 : 0;
    }

    setScrollVelocity(velocity) {
        this.scrollVelocity = velocity;
    }

    animate() {
        const speed = this.speed + Math.abs(this.scrollVelocity) * 0.5;
        this.xPercent -= speed * 0.05 * this.direction;

        if (this.xPercent < -50) this.xPercent = 0;
        if (this.xPercent > 0) this.xPercent = -50;

        this.tracks.forEach((track) => {
            track.style.transform = `translateX(${this.xPercent}%)`;
        });

        requestAnimationFrame(() => this.animate());
    }
}
