import './styles/index.css';

import { Clock } from './engine/Clock.js';
import { SmoothScroll } from './components/Scroll.js';
import { Cursor } from './components/Cursor.js';
import { PageLoader } from './components/Loader.js';
import { TextAnimation } from './components/TextAnimation.js';
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
        this.scrollSkew = 0;
        this.mainEl = document.querySelector('main');

        this.init();
    }

    init() {
        this.textAnimation = new TextAnimation();
        this.textAnimation.init();

        new PageLoader(() => this.onLoaded());
    }

    onLoaded() {
        this.scroll = new SmoothScroll();

        if (!isMobile()) {
            this.cursor = new Cursor();
        }

        if (hasWebGL2()) {
            this.initWebGL();
        } else {
            document.body.classList.add('no-webgl');
        }

        this.bindEvents();
        this.initNavigation();

        this.textAnimation.revealHero();

        this.clock = new Clock();
        this.clock.add(this.update.bind(this), 0);
        this.clock.start();
    }

    async initWebGL() {
        const { Renderer } = await import('./engine/Renderer.js');
        const { HomeScene } = await import('./scenes/HomeScene.js');
        this.renderer = new Renderer(document.body);
        this.scene = new HomeScene(this.renderer);
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
            if (this.scene) this.scene.resize();
        });

        this.scroll.onScroll(({ velocity, progress }) => {
            if (this.scene) this.scene.setScroll(velocity, progress);
            if (this.renderer) this.renderer.setScrollVelocity(velocity);

            const targetSkew = velocity * 0.04;
            this.scrollSkew += (targetSkew - this.scrollSkew) * 0.1;
            if (this.mainEl) {
                this.mainEl.style.transform = `skewY(${this.scrollSkew}deg)`;
            }
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

    update(elapsed, delta) {
        if (this.scroll) this.scroll.update(delta);
        if (this.scene) this.scene.update(elapsed, delta);
        if (this.renderer && this.scene) {
            this.renderer.render(this.scene);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
