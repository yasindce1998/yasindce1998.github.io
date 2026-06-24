import gsap from 'gsap';
import { lerp } from '../utils/math.js';

export class Cursor {
    constructor() {
        this.pos = { x: -100, y: -100 };
        this.target = { x: -100, y: -100 };
        this.ring = { x: -100, y: -100 };
        this.outer = { x: -100, y: -100 };
        this.velocity = { x: 0, y: 0 };
        this.lastPos = { x: 0, y: 0 };
        this.state = 'default';
        this.visible = false;
        this.magnetTarget = null;

        this.createElements();
        this.bindEvents();
        this.animate();
    }

    createElements() {
        this.dot = document.createElement('div');
        this.dot.className = 'cursor-dot';

        this.ringEl = document.createElement('div');
        this.ringEl.className = 'cursor-ring';

        this.outerEl = document.createElement('div');
        this.outerEl.className = 'cursor-outer';

        this.label = document.createElement('div');
        this.label.className = 'cursor-label';
        this.label.innerHTML = '<span>VIEW</span>';

        this.trail = document.createElement('canvas');
        this.trail.className = 'cursor-trail';
        this.trail.width = window.innerWidth;
        this.trail.height = window.innerHeight;
        this.trailCtx = this.trail.getContext('2d');

        document.body.appendChild(this.trail);
        document.body.appendChild(this.dot);
        document.body.appendChild(this.ringEl);
        document.body.appendChild(this.outerEl);
        document.body.appendChild(this.label);
        document.body.classList.add('custom-cursor-active');

        this.trailPoints = [];
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.target.x = e.clientX;
            this.target.y = e.clientY;
            this.visible = true;
        });

        document.addEventListener('mouseleave', () => {
            this.visible = false;
            this.dot.style.opacity = '0';
            this.ringEl.style.opacity = '0';
            this.outerEl.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.visible = true;
            this.dot.style.opacity = '1';
            this.ringEl.style.opacity = '1';
            this.outerEl.style.opacity = '1';
        });

        document.addEventListener('mouseover', (e) => {
            const tile = e.target.closest('.project-tile');
            const link = e.target.closest('a, button, [role="button"]');

            if (tile) {
                this.setState('project');
                this.magnetTarget = tile;
            } else if (link) {
                this.setState('hover');
                this.magnetTarget = link;
            }
        });

        document.addEventListener('mouseout', (e) => {
            const tile = e.target.closest('.project-tile');
            const link = e.target.closest('a, button, [role="button"]');
            if (tile || link) {
                this.setState('default');
                this.magnetTarget = null;
            }
        });

        document.addEventListener('mousedown', () => {
            this.dot.classList.add('pressing');
            this.ringEl.classList.add('pressing');
        });

        document.addEventListener('mouseup', () => {
            this.dot.classList.remove('pressing');
            this.ringEl.classList.remove('pressing');
        });

        window.addEventListener('resize', () => {
            this.trail.width = window.innerWidth;
            this.trail.height = window.innerHeight;
        });
    }

    setState(state) {
        this.dot.classList.remove('state-default', 'state-hover', 'state-project');
        this.ringEl.classList.remove('state-default', 'state-hover', 'state-project');
        this.outerEl.classList.remove('state-default', 'state-hover', 'state-project');

        this.state = state;
        this.dot.classList.add(`state-${state}`);
        this.ringEl.classList.add(`state-${state}`);
        this.outerEl.classList.add(`state-${state}`);

        if (state === 'project') {
            this.label.classList.add('visible');
            gsap.to(this.ringEl, { scale: 3, duration: 0.4, ease: 'power2.out' });
            gsap.to(this.outerEl, { scale: 2, duration: 0.5, ease: 'power2.out' });
        } else if (state === 'hover') {
            this.label.classList.remove('visible');
            gsap.to(this.ringEl, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
            gsap.to(this.outerEl, { scale: 1.3, duration: 0.4, ease: 'power2.out' });
        } else {
            this.label.classList.remove('visible');
            gsap.to(this.ringEl, { scale: 1, duration: 0.3, ease: 'power2.out' });
            gsap.to(this.outerEl, { scale: 1, duration: 0.4, ease: 'power2.out' });
        }
    }

    updateTrail() {
        this.trailCtx.clearRect(0, 0, this.trail.width, this.trail.height);

        this.trailPoints.push({ x: this.pos.x, y: this.pos.y, life: 1 });
        if (this.trailPoints.length > 30) this.trailPoints.shift();

        this.trailCtx.beginPath();
        this.trailCtx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        this.trailCtx.lineWidth = 1;

        for (let i = 1; i < this.trailPoints.length; i++) {
            const p = this.trailPoints[i];
            const prev = this.trailPoints[i - 1];
            p.life -= 0.03;

            if (p.life > 0) {
                this.trailCtx.globalAlpha = p.life * 0.3;
                this.trailCtx.beginPath();
                this.trailCtx.moveTo(prev.x, prev.y);
                this.trailCtx.lineTo(p.x, p.y);
                this.trailCtx.stroke();
            }
        }

        this.trailPoints = this.trailPoints.filter(p => p.life > 0);
    }

    animate() {
        this.velocity.x = this.target.x - this.lastPos.x;
        this.velocity.y = this.target.y - this.lastPos.y;
        this.lastPos.x = this.target.x;
        this.lastPos.y = this.target.y;

        let targetX = this.target.x;
        let targetY = this.target.y;

        if (this.magnetTarget) {
            const rect = this.magnetTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = this.target.x - centerX;
            const dy = this.target.y - centerY;
            const maxDist = Math.max(rect.width, rect.height) * 0.6;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
                const pull = 0.2;
                targetX = this.target.x - dx * pull;
                targetY = this.target.y - dy * pull;
            }
        }

        this.pos.x = lerp(this.pos.x, targetX, 0.5);
        this.pos.y = lerp(this.pos.y, targetY, 0.5);
        this.ring.x = lerp(this.ring.x, targetX, 0.08);
        this.ring.y = lerp(this.ring.y, targetY, 0.08);
        this.outer.x = lerp(this.outer.x, targetX, 0.04);
        this.outer.y = lerp(this.outer.y, targetY, 0.04);

        const skewX = this.velocity.x * 0.1;
        const skewY = this.velocity.y * 0.1;

        this.dot.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px) translate(-50%, -50%) skew(${skewX}deg, ${skewY}deg)`;
        this.ringEl.style.transform = `translate(${this.ring.x}px, ${this.ring.y}px) translate(-50%, -50%)`;
        this.outerEl.style.transform = `translate(${this.outer.x}px, ${this.outer.y}px) translate(-50%, -50%)`;
        this.label.style.transform = `translate(${this.ring.x + 30}px, ${this.ring.y - 30}px)`;

        this.updateTrail();

        requestAnimationFrame(() => this.animate());
    }
}
