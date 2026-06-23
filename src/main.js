import './styles/index.css';
import { updateTime } from './js/time-widget.js';
import { initDraggableCanvas } from './js/draggable-canvas.js';
import { initSimulatedCursors } from './js/simulated-cursors.js';
import { initConfigSettings } from './js/config-settings.js';
import { initCrtTerminal } from './js/terminal.js';
import { initSmoothScroll } from './js/smooth-scroll.js';
import { initMobileMenu } from './js/mobile-menu.js';
import { initScrollReveal } from './js/scroll-reveal.js';

document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    initDraggableCanvas();
    initSimulatedCursors();
    initConfigSettings();
    initCrtTerminal();
    initSmoothScroll();
    initMobileMenu();
    initScrollReveal();

    setInterval(updateTime, 1000);

    setInterval(() => {
        const valEl = document.getElementById('temp-val');
        if (valEl) {
            const currentTemp = 24 + Math.floor(Math.random() * 5);
            valEl.textContent = `${currentTemp}°C`;
        }
    }, 300000);
});

console.log('%c\u{1F44B} Hello, Developer!', 'font-size: 18px; font-weight: bold; color: #455ce9;');
console.log('%cWelcome to Yasin\'s secure agent console.', 'font-size: 13px; color: #6fa8dc;');
console.log('%cTry executing commands inside the page terminal for deep security auditing.', 'font-size: 13px; color: rgba(255,255,255,0.5);');
