import gsap from 'gsap';
import { isReducedMotion } from '../utils/device.js';

export class Marquee {
    constructor() {
        this.element = document.querySelector('.marquee');
        if (!this.element) return;

        this.track = this.element.querySelector('.marquee-track');
        this.speed = 1;
        this.direction = -1;
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
        this.xPercent = 0;
    }

    setScrollVelocity(velocity) {
        this.scrollVelocity = velocity;
    }

    animate() {
        const speed = this.speed + Math.abs(this.scrollVelocity) * 0.5;
        this.xPercent -= speed * 0.05 * this.direction;

        if (this.xPercent < -50) this.xPercent = 0;
        if (this.xPercent > 0) this.xPercent = -50;

        this.tracks.forEach(track => {
            track.style.transform = `translateX(${this.xPercent}%)`;
        });

        requestAnimationFrame(() => this.animate());
    }
}
