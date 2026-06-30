import gsap from 'gsap';
import { isReducedMotion } from '../utils/device.js';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#________';

const BOOT_LINES = [
    '[AUTH] IDENTITY VERIFIED',
    '[OK]   KERNEL LINKED',
    '[OK]   NEURAL MESH ACTIVE',
    '[LIVE] SYSTEM ONLINE'
];

function scrambleTo(el, target, durationMs, onFrame) {
    const total = Math.round(durationMs / 16);
    let frame = 0;

    const tick = () => {
        const progress = frame / total;
        const result = target.split('').map((char, i) => {
            if (char === ' ' || char === '.') return char;
            if (i / target.length < progress) return char;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }).join('');

        el.textContent = result;
        if (onFrame) onFrame(frame);
        frame++;

        if (frame <= total) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target;
        }
    };

    requestAnimationFrame(tick);
}

export class PageLoader {
    constructor(onComplete) {
        this.onComplete = onComplete;

        this.loader = document.querySelector('.loader');
        if (!this.loader) {
            if (this.onComplete) this.onComplete();
            return;
        }

        this.hud = this.loader.querySelector('.loader-hud');
        this.corners = this.loader.querySelectorAll('.loader-hud-corner');
        this.reticleH = this.loader.querySelector('.loader-reticle-h');
        this.reticleV = this.loader.querySelector('.loader-reticle-v');
        this.dataReadouts = this.loader.querySelectorAll('.loader-data');
        this.stage = this.loader.querySelector('.loader-stage');
        this.glitchEl = this.loader.querySelector('#ldr-glitch');
        this.ringFill = this.loader.querySelector('.loader-ring-fill');
        this.bootContainer = this.loader.querySelector('#ldr-lines');
        this.slicesContainer = this.loader.querySelector('#ldr-slices');
        this.statusEl = this.loader.querySelector('#ldr-status');

        this.startSequence();
    }

    startSequence() {
        if (isReducedMotion()) {
            gsap.delayedCall(0.3, () => this.cleanup());
            return;
        }

        const master = gsap.timeline();
        master.add(this.buildHUDPhase());
        master.add(this.buildIdentityPhase(), 0.4);
        master.add(this.buildExitPhase(), '-=0.4');
    }

    buildHUDPhase() {
        const tl = gsap.timeline();

        tl.fromTo(this.corners, {
            opacity: 0,
            scale: 1.3
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out'
        }, 0);

        tl.to(this.reticleH, {
            scaleX: 1,
            duration: 0.5,
            ease: 'power2.inOut'
        }, 0.2);

        tl.to(this.reticleV, {
            scaleY: 1,
            duration: 0.5,
            ease: 'power2.inOut'
        }, 0.3);

        tl.fromTo(this.dataReadouts, {
            opacity: 0,
            y: 6
        }, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.07,
            ease: 'power2.out'
        }, 0.4);

        return tl;
    }

    buildIdentityPhase() {
        const tl = gsap.timeline();
        const target = this.glitchEl.dataset.text;
        const isCyber = document.documentElement.dataset.theme === 'cyber';

        tl.call(() => {
            scrambleTo(this.glitchEl, target, 1800, (frame) => {
                if (isCyber && frame % 8 === 0) {
                    const caX = (Math.random() * 4 + 1).toFixed(1);
                    this.glitchEl.style.setProperty('--ca-x', caX);
                    this.glitchEl.style.setProperty('--ca-opacity', '0.7');
                    setTimeout(() => {
                        this.glitchEl.style.setProperty('--ca-opacity', '0');
                    }, 60);
                }
            });
        }, null, 0);

        tl.to(this.ringFill, {
            attr: { 'stroke-dashoffset': 0 },
            duration: 2.4,
            ease: 'none'
        }, 0.8);

        BOOT_LINES.forEach((text, i) => {
            tl.call(() => this.addBootLine(text, i === BOOT_LINES.length - 1), null, 1.2 + i * 0.35);
        });

        tl.call(() => {
            if (isCyber) {
                this.glitchEl.style.setProperty('--ca-x', '6');
                this.glitchEl.style.setProperty('--ca-opacity', '1');
                setTimeout(() => {
                    this.glitchEl.style.setProperty('--ca-opacity', '0');
                    this.glitchEl.style.setProperty('--ca-x', '0');
                }, 150);
            }
        }, null, 3.0);

        tl.to(this.ringFill, {
            attr: { 'stroke-width': 3.5 },
            duration: 0.15,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        }, 3.2);

        tl.call(() => {
            if (this.statusEl) this.statusEl.textContent = 'ONLINE';
        }, null, 3.2);

        // Flicker
        tl.to(this.loader, { opacity: 0.4, duration: 0.06 }, 3.5);
        tl.to(this.loader, { opacity: 1, duration: 0.06 }, 3.56);
        tl.to(this.loader, { opacity: 0.6, duration: 0.06 }, 3.62);
        tl.to(this.loader, { opacity: 1, duration: 0.06 }, 3.68);
        tl.to(this.loader, { opacity: 0.3, duration: 0.06 }, 3.74);
        tl.to(this.loader, { opacity: 1, duration: 0.06 }, 3.80);

        return tl;
    }

    addBootLine(text, isLast) {
        const line = document.createElement('div');
        line.className = 'loader-boot-line';
        if (isLast) line.classList.add('loader-boot-line--ok');
        line.textContent = text;
        this.bootContainer.appendChild(line);

        gsap.fromTo(line,
            { opacity: 0, x: -8 },
            { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' }
        );

        const allLines = this.bootContainer.querySelectorAll('.loader-boot-line');
        if (allLines.length > 1) {
            gsap.to(allLines[allLines.length - 2], {
                opacity: 0.35,
                duration: 0.3
            });
        }
    }

    buildExitPhase() {
        const tl = gsap.timeline({ onComplete: () => this.cleanup() });
        const slices = this.buildSlices();

        tl.call(() => {
            window.dispatchEvent(new CustomEvent('particleBurst'));
        }, null, 0);

        tl.to([this.hud, this.stage], {
            opacity: 0,
            duration: 0.35,
            ease: 'power2.in'
        }, 0);

        tl.to(slices, {
            x: () => (Math.random() - 0.5) * 16,
            duration: 0.08,
            ease: 'none'
        }, 0.3);

        tl.to(slices, {
            x: 0,
            duration: 0.05,
            ease: 'none'
        }, 0.38);

        tl.to(slices, {
            xPercent: (i) => (i % 2 === 0 ? -105 : 105),
            duration: 0.9,
            stagger: { each: 0.06, from: 'center' },
            ease: 'power3.inOut'
        }, 0.4);

        return tl;
    }

    buildSlices() {
        const count = 7;
        const h = 100 / count;

        for (let i = 0; i < count; i++) {
            const slice = document.createElement('div');
            slice.className = 'loader-slice';
            slice.style.top = `${i * h}%`;
            slice.style.height = `${i === count - 1 ? 100 - i * h : h}%`;
            this.slicesContainer.appendChild(slice);
        }

        return this.slicesContainer.querySelectorAll('.loader-slice');
    }

    cleanup() {
        document.body.style.overflow = '';
        document.body.classList.add('loaded');

        gsap.to(this.loader, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                this.loader.remove();
                window.dispatchEvent(new CustomEvent('introComplete'));
                if (this.onComplete) this.onComplete();
            }
        });
    }
}
