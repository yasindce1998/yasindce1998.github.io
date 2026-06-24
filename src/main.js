import './styles/index.css';
import { initSmoothScroll } from './js/smooth-scroll.js';
import { initMobileMenu } from './js/mobile-menu.js';
import { initCustomCursor } from './js/custom-cursor.js';
import { initPageIntro } from './js/page-intro.js';
import { initHoverGlow } from './js/hover-glow.js';
import { initGlslHero } from './js/glsl-hero.js';
import { initHoverDistortion } from './js/hover-distortion.js';
import { initHorizontalScroll } from './js/horizontal-scroll.js';
import { initTextReveal } from './js/text-reveal.js';
import { initScrollReveal } from './js/scroll-reveal.js';
import { initMarquee } from './js/marquee.js';
import { initHeaderScroll } from './js/header-scroll.js';

document.addEventListener('DOMContentLoaded', () => {
    initPageIntro();
    initSmoothScroll();
    initMobileMenu();
    initHoverGlow();
    initGlslHero();
    initHoverDistortion();
    initHorizontalScroll();
    initTextReveal();
    initScrollReveal();
    initMarquee();
    initHeaderScroll();
    initCustomCursor();
});
