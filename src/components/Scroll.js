import Lenis from 'lenis';
import { lerp } from '../utils/math.js';

export class SmoothScroll {
    constructor() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        this.velocity = 0;
        this.targetVelocity = 0;
        this.progress = 0;
        this.direction = 0;
        this.callbacks = [];

        this.lenis.on('scroll', (e) => {
            this.targetVelocity = e.velocity;
            this.direction = e.direction;
            this.progress = e.progress;

            this.callbacks.forEach(cb => cb({
                velocity: e.velocity,
                direction: e.direction,
                progress: e.progress,
                scroll: e.scroll
            }));
        });
    }

    onScroll(callback) {
        this.callbacks.push(callback);
    }

    scrollTo(target, options = {}) {
        this.lenis.scrollTo(target, {
            offset: options.offset || -80,
            duration: options.duration || 1.5,
            easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)))
        });
    }

    update(delta) {
        this.lenis.raf(performance.now());
        this.velocity = lerp(this.velocity, this.targetVelocity, 0.1);
        this.targetVelocity *= 0.95;
    }

    stop() {
        this.lenis.stop();
    }

    start() {
        this.lenis.start();
    }

    destroy() {
        this.lenis.destroy();
    }
}
