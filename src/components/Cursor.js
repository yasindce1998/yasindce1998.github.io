import { lerp } from '../utils/math.js';

export class Cursor {
    constructor() {
        this.pos = { x: -100, y: -100 };
        this.target = { x: -100, y: -100 };
        this.ring = { x: -100, y: -100 };
        this.magnetic = { x: 0, y: 0 };
        this.state = 'default';
        this.visible = false;
        this.magneticTarget = null;

        this.container = document.getElementById('cursor');
        this.dot = document.querySelector('.cursor-dot');
        this.ringEl = document.querySelector('.cursor-ring');
        this.textEl = document.querySelector('.cursor-text');

        if (!this.dot || !this.ringEl) return;

        this.bindEvents();
        this.setupMagnetic();
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

    setupMagnetic() {
        const targets = document.querySelectorAll('a, button, .project-item, .nav-link, .logo');

        targets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.magneticTarget = el;
                if (el.classList.contains('project-item')) {
                    this.setState('project');
                } else {
                    this.setState('hover');
                }
            });

            el.addEventListener('mouseleave', () => {
                this.magneticTarget = null;
                this.magnetic.x = 0;
                this.magnetic.y = 0;
                this.setState('default');
            });
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
        if (this.magneticTarget) {
            const rect = this.magneticTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const pullStrength = this.state === 'project' ? 0.15 : 0.3;
            this.magnetic.x = (centerX - this.target.x) * pullStrength;
            this.magnetic.y = (centerY - this.target.y) * pullStrength;
        }

        const ringTargetX = this.target.x + this.magnetic.x;
        const ringTargetY = this.target.y + this.magnetic.y;

        this.pos.x = lerp(this.pos.x, this.target.x, 0.5);
        this.pos.y = lerp(this.pos.y, this.target.y, 0.5);
        this.ring.x = lerp(this.ring.x, ringTargetX, 0.12);
        this.ring.y = lerp(this.ring.y, ringTargetY, 0.12);

        this.dot.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px) translate(-50%, -50%)`;
        this.ringEl.style.transform = `translate(${this.ring.x}px, ${this.ring.y}px) translate(-50%, -50%)`;
        if (this.textEl) {
            this.textEl.style.transform = `translate(${this.ring.x}px, ${this.ring.y}px) translate(-50%, -50%)`;
        }

        requestAnimationFrame(() => this.animate());
    }
}
