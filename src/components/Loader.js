import gsap from 'gsap';

const BOOT_LINES = [
    '[SET] Composing masthead…',
    '[OK]  Type set in Fraunces',
    '[SET] Laying out signatures…',
    '[OK]  Plates B.01 — B.06 inked',
    '[SET] Proofing the margins…',
    '[OK]  Coordinates registered · 12.97° N',
    '[SET] Pressing Vol. 01…',
    '[READY] Issue online'
];

export class PageLoader {
    constructor(onComplete) {
        this.onComplete = onComplete;

        this.loader = document.querySelector('.loader');
        if (!this.loader) {
            if (this.onComplete) this.onComplete();
            return;
        }

        this.terminalLines = this.loader.querySelector('.loader-terminal-lines');
        this.barInner = this.loader.querySelector('.loader-terminal-bar-inner');
        this.splitLeft = this.loader.querySelector('.loader-split--left');
        this.splitRight = this.loader.querySelector('.loader-split--right');
        this.seam = this.loader.querySelector('.loader-seam');

        this.startSequence();
    }

    startSequence() {
        const master = gsap.timeline();

        // Phase 1: Terminal Boot
        master.add(this.buildTerminalPhase());

        // Phase 2: Split Reveal
        master.add(this.buildSplitPhase(), '-=0.3');
    }

    buildTerminalPhase() {
        const tl = gsap.timeline();

        // Progress bar fills over the full boot sequence
        tl.to(this.barInner, {
            scaleX: 1,
            duration: 2.2,
            ease: 'power1.inOut'
        }, 0);

        // Add boot lines with stagger
        BOOT_LINES.forEach((text, i) => {
            tl.call(() => this.addLine(text, i === BOOT_LINES.length - 1), null, i * 0.28);
        });

        // Hold briefly after last line
        tl.to({}, { duration: 0.4 });

        return tl;
    }

    addLine(text, isLast) {
        const line = document.createElement('div');
        line.className = 'loader-terminal-line';
        line.textContent = text;

        if (isLast) line.classList.add('loader-terminal-line--ready');

        this.terminalLines.appendChild(line);

        gsap.fromTo(line,
            { opacity: 0, x: -8 },
            { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' }
        );

        // Dim previous lines
        const allLines = this.terminalLines.querySelectorAll('.loader-terminal-line');
        if (allLines.length > 1) {
            gsap.to(allLines[allLines.length - 2], {
                opacity: 0.35,
                duration: 0.3
            });
        }
    }

    buildSplitPhase() {
        const tl = gsap.timeline({
            onComplete: () => this.cleanup()
        });

        // Fade out terminal
        tl.to(this.loader.querySelector('.loader-terminal'), {
            opacity: 0,
            scale: 0.95,
            duration: 0.4,
            ease: 'power2.in'
        });

        // Fire particle burst event
        tl.call(() => {
            window.dispatchEvent(new CustomEvent('particleBurst'));
        });

        // Seam appears and glows
        tl.to(this.seam, {
            height: '100%',
            opacity: 1,
            duration: 0.5,
            ease: 'power2.inOut'
        }, '-=0.1');

        // Split panels apart with 3D rotation
        tl.to(this.splitLeft, {
            x: '-52%',
            rotateY: -3,
            duration: 1.2,
            ease: 'power3.inOut'
        }, '-=0.3');

        tl.to(this.splitRight, {
            x: '52%',
            rotateY: 3,
            duration: 1.2,
            ease: 'power3.inOut'
        }, '<');

        // Fade seam out as panels separate
        tl.to(this.seam, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.6');

        return tl;
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
