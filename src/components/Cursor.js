import { lerp } from '../utils/math.js';

export class Cursor {
    constructor() {
        this.pos = { x: -100, y: -100 };
        this.target = { x: -100, y: -100 };
        this.ring = { x: -100, y: -100 };
        this.state = 'default';
        this.visible = false;

        this.container = document.getElementById('cursor');
        this.dot = document.querySelector('.cursor-dot');
        this.ringEl = document.querySelector('.cursor-ring');
        this.textEl = document.querySelector('.cursor-text');

        if (!this.dot || !this.ringEl) return;

        this.bindEvents();
        this.animate();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.target.x = e.clientX;
            this.target.y = e.clientY;
            if (!this.visible) {
                this.visible = true;
                this.pos.x = e.clientX;
                this.pos.y = e.clientY;
                this.ring.x = e.clientX;
                this.ring.y = e.clientY;
            }
        });

        document.addEventListener('mouseleave', () => {
            this.visible = false;
            this.dot.style.opacity = '0';
            this.ringEl.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.visible = true;
            this.dot.style.opacity = '1';
            this.ringEl.style.opacity = '1';
        });
    }

    setState(state) {
        if (this.container) {
            this.container.classList.remove('hover', 'project');
            if (state !== 'default') {
                this.container.classList.add(state);
            }
        }
        this.state = state;
    }

    animate() {
        this.pos.x = lerp(this.pos.x, this.target.x, 0.5);
        this.pos.y = lerp(this.pos.y, this.target.y, 0.5);
        this.ring.x = lerp(this.ring.x, this.target.x, 0.1);
        this.ring.y = lerp(this.ring.y, this.target.y, 0.1);

        this.dot.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px) translate(-50%, -50%)`;
        this.ringEl.style.transform = `translate(${this.ring.x}px, ${this.ring.y}px) translate(-50%, -50%)`;
        if (this.textEl) {
            this.textEl.style.transform = `translate(${this.ring.x}px, ${this.ring.y}px) translate(-50%, -50%)`;
        }

        requestAnimationFrame(() => this.animate());
    }
}
