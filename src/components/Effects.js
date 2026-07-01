import gsap from 'gsap';
import { isMobile } from '../utils/device.js';

export class Effects {
    constructor() {
        this.rafId = null;
        this.glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    }

    init() {
        if (!isMobile()) {
            this.initMagneticButtons();
            this.initHoverSpotlight();
            this.initCapabilityHighlight();
        }
        this.initFooterGlitch();
    }

    initMagneticButtons() {
        const buttons = document.querySelectorAll('.header-logo, .header-menu-btn, .footer-email');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1, 0.3)'
                });
            });
        });
    }

    initHoverSpotlight() {
        const items = document.querySelectorAll('.project-item');

        items.forEach(item => {
            const spotlight = document.createElement('div');
            spotlight.className = 'project-spotlight';
            spotlight.style.cssText = `
                position: absolute;
                inset: 0;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
                border-radius: 12px;
                z-index: -1;
            `;
            item.style.position = 'relative';
            item.appendChild(spotlight);

            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                spotlight.style.opacity = '1';
                const isDark = document.documentElement.dataset.theme !== 'light';
                const color = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
                spotlight.style.background = `radial-gradient(300px circle at ${x}px ${y}px, ${color}, transparent 70%)`;
            });

            item.addEventListener('mouseleave', () => {
                spotlight.style.opacity = '0';
            });
        });
    }

    initCapabilityHighlight() {
        const items = document.querySelectorAll('.capability-list li');

        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    x: 8,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    x: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }

    initFooterGlitch() {
        const footerLines = document.querySelectorAll('.footer-title-line');

        footerLines.forEach(line => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const text = entry.target.textContent;
                        let frame = 0;

                        const glitch = setInterval(() => {
                            const progress = frame / 20;
                            entry.target.textContent = text.split('').map((char, i) => {
                                if (char === ' ') return ' ';
                                if (i / text.length < progress) return text[i];
                                return this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
                            }).join('');

                            frame++;
                            if (frame > 20) {
                                clearInterval(glitch);
                                entry.target.textContent = text;
                            }
                        }, 30);

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(line);
        });
    }
}
