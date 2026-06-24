import gsap from 'gsap';

export class TextAnimation {
    constructor() {
        this.heroLines = [];
        this.observers = [];
    }

    init() {
        this.splitHeroText();
        this.setupScrollReveals();
    }

    splitHeroText() {
        const lines = document.querySelectorAll('.hero-line');
        lines.forEach((line) => {
            const text = line.textContent;
            line.textContent = '';
            line.setAttribute('aria-label', text);

            const chars = [];
            for (let i = 0; i < text.length; i++) {
                const wrapper = document.createElement('span');
                wrapper.className = 'char-wrap';

                const char = document.createElement('span');
                char.className = 'char';
                char.textContent = text[i] === ' ' ? ' ' : text[i];

                wrapper.appendChild(char);
                line.appendChild(wrapper);
                chars.push(char);
            }
            this.heroLines.push(chars);
        });

        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            subtitle.classList.add('will-reveal');
        }
    }

    revealHero() {
        this.heroLines.forEach((chars, lineIndex) => {
            chars.forEach((char, charIndex) => {
                gsap.to(char, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: lineIndex * 0.15 + charIndex * 0.02,
                    ease: 'power3.out'
                });
            });
        });

        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            gsap.to(subtitle, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.8,
                ease: 'power2.out'
            });
        }
    }

    setupScrollReveals() {
        const revealElements = document.querySelectorAll(
            '.section-label, .project-tile, .tutorial-row, .footer-cta-title, .footer-email'
        );

        revealElements.forEach((el) => {
            el.classList.add('scroll-reveal');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gsap.to(entry.target, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: 'power2.out'
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

            observer.observe(el);
            this.observers.push(observer);
        });

        this.setupProjectStagger();
    }

    setupProjectStagger() {
        const tiles = document.querySelectorAll('.project-tile');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(tiles).indexOf(entry.target);
                    gsap.to(entry.target, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: 'power2.out'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        tiles.forEach(tile => observer.observe(tile));
        this.observers.push(observer);
    }

    setupFooterReveal() {
        const title = document.querySelector('.footer-cta-title');
        if (!title) return;

        const lines = title.innerHTML.split('<br>');
        title.innerHTML = '';

        lines.forEach((line, i) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'line-wrap';
            wrapper.style.overflow = 'hidden';

            const inner = document.createElement('div');
            inner.className = 'footer-line';
            inner.textContent = line.replace(/<[^>]*>/g, '');
            inner.style.transform = 'translateY(100%)';

            wrapper.appendChild(inner);
            title.appendChild(wrapper);
            if (i < lines.length - 1) {
                title.appendChild(document.createElement('br'));
            }
        });
    }
}
