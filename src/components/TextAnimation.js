import gsap from 'gsap';
import { isMobile } from '../utils/device.js';

export class TextAnimation {
    constructor() {
        this.heroChars = [];
        this.observers = [];
        this.parallaxTarget = { x: 0, y: 0 };
        this.parallaxCurrent = { x: 0, y: 0 };
        this.rafId = null;
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
                span.textContent = char === ' ' ? ' ' : char;
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
            ease: 'power3.out',
            onComplete: () => this.startTypedDescription()
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

        if (!isMobile()) {
            this.setupHeroParallax();
        }
    }

    startTypedDescription() {
        const desc = document.querySelector('.hero-description');
        if (!desc) return;

        const fullText = desc.textContent;
        desc.textContent = '';
        desc.style.opacity = '1';

        const cursor = document.createElement('span');
        cursor.className = 'typed-cursor';
        cursor.textContent = '|';
        desc.appendChild(cursor);

        let i = 0;
        const type = () => {
            if (i < fullText.length) {
                desc.insertBefore(document.createTextNode(fullText[i]), cursor);
                i++;
                setTimeout(type, 20);
            } else {
                gsap.to(cursor, {
                    opacity: 0,
                    duration: 0.4,
                    delay: 1,
                    onComplete: () => cursor.remove()
                });
            }
        };

        setTimeout(type, 300);
    }

    setupHeroParallax() {
        const titleWrap = document.querySelector('.hero-title-wrap');
        if (!titleWrap) return;

        window.addEventListener('mousemove', (e) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            this.parallaxTarget.x = (e.clientX - cx) * 0.02;
            this.parallaxTarget.y = (e.clientY - cy) * 0.015;
        });

        const animate = () => {
            this.parallaxCurrent.x += (this.parallaxTarget.x - this.parallaxCurrent.x) * 0.06;
            this.parallaxCurrent.y += (this.parallaxTarget.y - this.parallaxCurrent.y) * 0.06;
            titleWrap.style.transform = `translate3d(${this.parallaxCurrent.x}px, ${this.parallaxCurrent.y}px, 0)`;
            this.rafId = requestAnimationFrame(animate);
        };

        this.rafId = requestAnimationFrame(animate);
    }

    setupScrollReveals() {
        const revealElements = document.querySelectorAll(
            '.section-head, .project-item, .about-large, .about-body, .capability-group, ' +
            '.study, .experience-item, .toolkit-row, .contact-form, .hero-stats, ' +
            '.footer-title-line, .footer-email'
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
