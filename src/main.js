import './styles/index.css';

import gsap from 'gsap';
import { Clock } from './engine/Clock.js';
import { SmoothScroll } from './components/Scroll.js';
import { Cursor } from './components/Cursor.js';
import { PageLoader } from './components/Loader.js';
import { TextAnimation } from './components/TextAnimation.js';
import { Effects } from './components/Effects.js';
import { Marquee } from './components/Marquee.js';
import { isMobile } from './utils/device.js';

class App {
    constructor() {
        this.mouse = { x: 0, y: 0, normalized: { x: 0, y: 0 } };
        this.scroll = null;
        this.clock = null;
        this.cursor = null;
        this.textAnimation = null;
        this.effects = null;
        this.marquees = [];
        this.scrollSkew = 0;
        this.mainEl = document.querySelector('main');

        this.init();
    }

    init() {
        this.initTheme();
        this.textAnimation = new TextAnimation();
        this.textAnimation.init();

        this.effects = new Effects();

        new PageLoader(() => this.onLoaded());
    }

    onLoaded() {
        this.scroll = new SmoothScroll();
        this.createScrollProgress();

        if (!isMobile()) {
            this.cursor = new Cursor();
            this.initProjectTilt();
            this.initHeroGlow();
        }

        this.marquees = Marquee.initAll();

        this.bindEvents();
        this.initNavigation();
        this.initContactForm();

        this.textAnimation.revealHero();
        this.effects.init();

        this.clock = new Clock();
        this.clock.add(this.update.bind(this), 0);
        this.clock.start();
    }

    bindEvents() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.normalized.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.normalized.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        this.scroll.onScroll(({ velocity, progress }) => {
            this.marquees.forEach((m) => m.setScrollVelocity(velocity));

            const targetSkew = isMobile() ? 0 : velocity * 0.02;
            this.scrollSkew += (targetSkew - this.scrollSkew) * 0.1;
            if (this.mainEl) {
                this.mainEl.style.transform = `skewY(${this.scrollSkew}deg)`;
            }

            if (this.progressBar) {
                this.progressBar.style.width = `${progress * 100}%`;
            }
        });
    }

    createScrollProgress() {
        this.progressBar = document.createElement('div');
        this.progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 2px;
            width: 0%;
            background: var(--color-accent);
            z-index: 9999;
            pointer-events: none;
            transform-origin: left;
            transition: none;
        `;
        document.body.appendChild(this.progressBar);
    }

    initProjectTilt() {
        const items = document.querySelectorAll('.project-item');

        items.forEach((item) => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                item.style.transform = `perspective(1000px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg)`;
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)',
                    clearProps: 'transform'
                });
            });
        });
    }

    initTheme() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        const meta = document.querySelector('meta[name="theme-color"]');
        const order = ['light', 'dark', 'cyber'];
        const colors = { light: '#f3ecdc', dark: '#0c0b09', cyber: '#02060a' };

        const apply = (theme) => {
            document.documentElement.dataset.theme = theme;
            localStorage.setItem('theme', theme);
            if (meta && colors[theme]) meta.setAttribute('content', colors[theme]);
        };

        const cycle = () => {
            const current = document.documentElement.dataset.theme;
            const idx = order.indexOf(current);
            apply(order[(idx + 1) % order.length]);
        };

        toggle.addEventListener('click', cycle);

        // `t` cycles themes (matches the blog), ignoring text inputs.
        document.addEventListener('keydown', (e) => {
            const tag = e.target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey) return;
            if (e.key === 't' || e.key === 'T') cycle();
        });
    }

    initHeroGlow() {
        const glow = document.getElementById('heroGlow');
        const hero = document.getElementById('index');
        if (!glow || !hero) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            glow.style.left = `${e.clientX - rect.left}px`;
            glow.style.top = `${e.clientY - rect.top}px`;
            glow.style.opacity = '1';
        });
        hero.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    }

    initNavigation() {
        const toggle = document.getElementById('hamburger-btn');
        const overlay = document.getElementById('nav-overlay');
        if (!toggle || !overlay) return;

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !expanded);
            overlay.classList.toggle('active');
            document.body.style.overflow = expanded ? '' : 'hidden';
        });

        overlay.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                toggle.setAttribute('aria-expanded', 'false');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inquiry = (form.querySelector('#cf-inquiry')?.value || '').trim();
            const name = (form.querySelector('#cf-name')?.value || '').trim();
            const email = (form.querySelector('#cf-email')?.value || '').trim();
            const note = (form.querySelector('#cf-note')?.value || '').trim();

            const subject = `[${inquiry || 'Inquiry'}]${name ? ' — ' + name : ''}`;
            const body =
                `${note || ''}\n\n` +
                `— ${name || 'Anonymous'}` +
                `${email ? '\n' + email : ''}`;

            const href = `mailto:yasindce1998@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            form.classList.add('sent');
            const btn = form.querySelector('.btn-submit');
            if (btn) btn.firstChild.textContent = 'Opening mail… ';

            window.location.href = href;
        });
    }

    update(elapsed, delta) {
        if (this.scroll) this.scroll.update(delta);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
