import gsap from 'gsap';

export class TextAnimation {
    constructor() {
        this.heroChars = [];
        this.observers = [];
    }

    init() {
        this.splitHeroText();
        this.setupScrollReveals();
    }

    splitHeroText() {
        const lines = document.querySelectorAll('.hero-line-inner');
        lines.forEach((inner) => {
            const text = inner.textContent;
            inner.textContent = '';
            inner.style.transform = 'none';

            [...text].forEach((char) => {
                const span = document.createElement('span');
                span.className = 'hero-char';
                span.textContent = char === ' ' ? ' ' : char;
                inner.appendChild(span);
                this.heroChars.push(span);
            });
        });
    }

    revealHero() {
        gsap.to(this.heroChars, {
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
            ease: 'power3.out'
        });

        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            gsap.to(subtitle, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: this.heroChars.length * 0.03 + 0.2,
                ease: 'power2.out'
            });
        }

        const heroMeta = document.querySelector('.hero-meta');
        if (heroMeta) {
            gsap.to(heroMeta, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: this.heroChars.length * 0.03 + 0.4,
                ease: 'power2.out'
            });
        }
    }

    setupScrollReveals() {
        const revealElements = document.querySelectorAll(
            '.projects-header, .project-item, .about-header, .about-large, .about-body, .capability-group, .footer-title-line, .footer-email'
        );

        revealElements.forEach((el) => {
            el.classList.add('scroll-reveal');
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';

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
        const items = document.querySelectorAll('.project-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(items).indexOf(entry.target);
                    gsap.to(entry.target, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.08,
                        ease: 'power2.out'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        items.forEach(item => observer.observe(item));
        this.observers.push(observer);
    }
}
