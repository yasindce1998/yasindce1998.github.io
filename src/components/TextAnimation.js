import gsap from 'gsap';

export class TextAnimation {
    constructor() {
        this.heroLines = [];
        this.observers = [];
    }

    init() {
        this.prepareHeroLines();
        this.setupScrollReveals();
    }

    prepareHeroLines() {
        const lines = document.querySelectorAll('.hero-line');
        lines.forEach((line) => {
            const inner = line.querySelector('.hero-line-inner');
            if (inner) {
                inner.style.transform = 'translateY(105%)';
                this.heroLines.push(inner);
            }
        });
    }

    revealHero() {
        this.heroLines.forEach((inner, index) => {
            gsap.to(inner, {
                y: 0,
                duration: 1.2,
                delay: index * 0.12,
                ease: 'power3.out'
            });
        });

        const heroMeta = document.querySelector('.hero-meta');
        if (heroMeta) {
            gsap.to(heroMeta, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.6,
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
