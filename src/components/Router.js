import { projects } from '../data/projects.js';

export class Router {
    constructor(app) {
        this.app = app;
        this.currentRoute = '/';
        this.originalHTML = '';

        this.bindEvents();
        this.handleInitialRoute();
    }

    getProjectBySlug(slug) {
        return projects.find(p => p.slug === slug);
    }

    getProjectByIndex(index) {
        return projects[index];
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            const tile = e.target.closest('.project-tile');
            if (tile) {
                e.preventDefault();
                const tiles = [...document.querySelectorAll('.project-tile')];
                const index = tiles.indexOf(tile);
                if (index >= 0 && projects[index]) {
                    this.navigate(`/work/${projects[index].slug}`);
                }
                return;
            }

            const link = e.target.closest('a[href]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#') || link.hasAttribute('download') || link.hasAttribute('target')) return;

            if (href.startsWith('/work/')) {
                e.preventDefault();
                this.navigate(href);
            }
        });

        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname, false);
        });
    }

    handleInitialRoute() {
        const path = window.location.pathname;
        if (path.startsWith('/work/')) {
            requestAnimationFrame(() => this.handleRoute(path, false));
        }
    }

    async navigate(path) {
        if (path === this.currentRoute) return;
        history.pushState(null, '', path);
        await this.handleRoute(path, true);
    }

    async handleRoute(path, animate = true) {
        this.currentRoute = path;

        if (animate && this.app.transition) {
            await this.app.transition.enter();
        }

        if (path === '/' || path === '') {
            this.renderHome();
        } else if (path.startsWith('/work/')) {
            const slug = path.replace('/work/', '');
            const project = this.getProjectBySlug(slug);
            if (project) {
                this.renderProject(project);
            } else {
                this.renderHome();
            }
        }

        if (this.app.scroll) {
            this.app.scroll.scrollTo(0, { immediate: true });
        }

        if (animate && this.app.transition) {
            await this.app.transition.leave();
        }
    }

    renderHome() {
        if (this.originalHTML) {
            const main = document.getElementById('main-content');
            if (main) {
                main.innerHTML = this.originalHTML;
                this.originalHTML = '';
                this.app.rebindComponents?.();
            }
        }
        document.body.classList.remove('page-project');
    }

    renderProject(project) {
        const main = document.getElementById('main-content');
        if (!main) return;

        if (!this.originalHTML) {
            this.originalHTML = main.innerHTML;
        }

        main.innerHTML = this.getProjectHTML(project);
        document.body.classList.add('page-project');

        main.querySelector('.project-back')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigate('/');
            history.pushState(null, '', '/');
        });
    }

    getProjectHTML(project) {
        const techPills = project.tech.map(t => `<span class="project-detail-pill">${t}</span>`).join('');
        const links = [];
        if (project.links.live) {
            links.push(`<a href="${project.links.live}" target="_blank" rel="noopener" class="project-detail-link">View Live &nearr;</a>`);
        }
        if (project.links.github) {
            links.push(`<a href="${project.links.github}" target="_blank" rel="noopener" class="project-detail-link">GitHub &nearr;</a>`);
        }

        return `
            <section class="project-detail">
                <a href="/" class="project-back">&larr; Back to Work</a>
                <div class="project-detail-content">
                    <header class="project-detail-header">
                        <span class="project-detail-year">${project.year} — ${project.category}</span>
                        <h1 class="project-detail-title">${project.title}</h1>
                        <p class="project-detail-role">${project.role}</p>
                    </header>
                    <p class="project-detail-desc">${project.description}</p>
                    <div class="project-detail-tech">${techPills}</div>
                    ${links.length ? `<div class="project-detail-links">${links.join('')}</div>` : ''}
                </div>
            </section>
        `;
    }
}
