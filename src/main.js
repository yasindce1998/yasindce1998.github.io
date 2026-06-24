import './styles/index.css';

import { Renderer } from './engine/Renderer.js';
import { Clock } from './engine/Clock.js';
import { HomeScene } from './scenes/HomeScene.js';
import { SmoothScroll } from './components/Scroll.js';
import { Cursor } from './components/Cursor.js';
import { PageLoader } from './components/Loader.js';
import { TextAnimation } from './components/TextAnimation.js';
import { PageTransition } from './components/Transition.js';
import { Marquee } from './components/Marquee.js';
import { HorizontalScroll } from './components/HorizontalScroll.js';
import { isMobile, hasWebGL2 } from './utils/device.js';

class App {
    constructor() {
        this.mouse = { x: 0, y: 0, normalized: { x: 0, y: 0 } };
        this.scroll = null;
        this.renderer = null;
        this.scene = null;
        this.clock = null;
        this.cursor = null;
        this.textAnimation = null;
        this.marquee = null;

        this.init();
    }

    init() {
        this.textAnimation = new TextAnimation();
        this.textAnimation.init();

        new PageLoader(() => this.onLoaded());
    }

    onLoaded() {
        this.scroll = new SmoothScroll();
        this.marquee = new Marquee();
        this.horizontalScroll = new HorizontalScroll(this.scroll);

        if (!isMobile()) {
            this.cursor = new Cursor();
        }

        this.transition = new PageTransition();

        if (hasWebGL2()) {
            this.initWebGL();
        }

        this.bindEvents();
        this.initHeaderScroll();
        this.initMobileMenu();

        this.textAnimation.revealHero();

        this.clock = new Clock();
        this.clock.add(this.update.bind(this), 0);
    }

    initWebGL() {
        this.renderer = new Renderer();
        this.scene = new HomeScene(this.renderer.renderer);
        this.renderer.setScene(this.scene.scene, this.scene.camera);
    }

    bindEvents() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.normalized.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.normalized.y = -(e.clientY / window.innerHeight) * 2 + 1;

            if (this.scene) {
                this.scene.setMouse(this.mouse.normalized.x, this.mouse.normalized.y);
            }
        });

        window.addEventListener('resize', () => {
            if (this.renderer) this.renderer.resize();
            if (this.scene) this.scene.resize();
        });

        this.scroll.onScroll(({ velocity, progress }) => {
            if (this.scene) this.scene.setScroll(progress, velocity);
            if (this.renderer) this.renderer.setScrollVelocity(velocity);
            if (this.marquee) this.marquee.setScrollVelocity(velocity);
        });

        this.initLinkInteractions();
    }

    initLinkInteractions() {
        const hoverTargets = document.querySelectorAll(
            'a, button, .project-tile, .tutorial-row, .footer-social-link'
        );

        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                if (this.cursor) {
                    if (el.classList.contains('project-tile')) {
                        this.cursor.setState('project');
                    } else {
                        this.cursor.setState('hover');
                    }
                }
            });
            el.addEventListener('mouseleave', () => {
                if (this.cursor) this.cursor.setState('default');
            });
        });
    }

    initHeaderScroll() {
        const header = document.getElementById('main-header');
        if (!header) return;

        let lastScroll = 0;
        this.scroll.onScroll(({ scroll }) => {
            if (scroll > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            if (scroll > lastScroll && scroll > 200) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastScroll = scroll;
        });
    }

    initMobileMenu() {
        const btn = document.getElementById('hamburger-btn');
        const overlay = document.getElementById('mobile-nav-overlay');
        if (!btn || !overlay) return;

        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !expanded);
            overlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        overlay.querySelectorAll('.mobile-nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                btn.setAttribute('aria-expanded', 'false');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    update(delta, elapsed) {
        if (this.scene) this.scene.update(delta, elapsed);
        if (this.renderer && this.scene) {
            this.renderer.render();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
