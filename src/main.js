import './styles/index.css';
import { initCrtTerminal } from './js/terminal.js';
import { initSmoothScroll } from './js/smooth-scroll.js';
import { initMobileMenu } from './js/mobile-menu.js';
import { initCustomCursor } from './js/custom-cursor.js';
import { initPageIntro } from './js/page-intro.js';
import { initHoverGlow } from './js/hover-glow.js';

document.addEventListener('DOMContentLoaded', () => {
    initPageIntro();
    initCrtTerminal();
    initSmoothScroll();
    initMobileMenu();
    initHoverGlow();
    initCustomCursor();
});
