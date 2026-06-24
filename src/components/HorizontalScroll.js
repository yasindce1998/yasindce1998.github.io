import gsap from 'gsap';

export class HorizontalScroll {
    constructor(scroll) {
        this.scroll = scroll;
        this.section = document.querySelector('.projects');
        this.grid = document.querySelector('.projects-grid');
        if (!this.section || !this.grid) return;

        if (window.innerWidth < 900) return;

        this.setup();
        this.bindEvents();
    }

    setup() {
        this.tiles = this.grid.querySelectorAll('.project-tile');
        this.tileCount = this.tiles.length;
        this.cardWidth = window.innerWidth * 0.7;
        this.gap = 40;
        this.totalWidth = (this.tileCount * (this.cardWidth + this.gap)) - this.gap + window.innerWidth * 0.3;

        this.section.style.height = `${this.totalWidth}px`;

        if (!this.section.querySelector('.projects-sticky')) {
            const sticky = document.createElement('div');
            sticky.className = 'projects-sticky';
            this.section.insertBefore(sticky, this.grid);
            sticky.appendChild(this.grid);
        }

        this.progressWrap = document.createElement('div');
        this.progressWrap.className = 'h-scroll-progress';
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'h-scroll-bar';
        this.progressWrap.appendChild(this.progressBar);
        this.section.querySelector('.projects-sticky').appendChild(this.progressWrap);
    }

    bindEvents() {
        this.scroll.onScroll(({ scroll }) => {
            if (window.innerWidth < 900) return;

            const rect = this.section.getBoundingClientRect();
            const sectionTop = -rect.top;
            const maxScroll = this.section.offsetHeight - window.innerHeight;
            const progress = Math.max(0, Math.min(sectionTop / maxScroll, 1));
            const translateX = -progress * (this.totalWidth - window.innerWidth);

            this.grid.style.transform = `translate3d(${translateX}px, 0, 0)`;
            this.progressBar.style.transform = `scaleX(${progress})`;

            this.tiles.forEach((tile, i) => {
                const tileProgress = (progress * this.tileCount - i) / 1;
                const opacity = Math.max(0.3, Math.min(1, 1 - Math.abs(tileProgress - 0.5) * 0.5));
                tile.style.opacity = opacity;
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth < 900) {
                this.section.style.height = '';
                this.grid.style.transform = '';
                return;
            }
            this.cardWidth = window.innerWidth * 0.7;
            this.totalWidth = (this.tileCount * (this.cardWidth + this.gap)) - this.gap + window.innerWidth * 0.3;
            this.section.style.height = `${this.totalWidth}px`;
        });
    }
}
