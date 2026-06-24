export function initCustomCursor() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    const label = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    label.className = 'cursor-label';
    label.textContent = 'VIEW';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.appendChild(label);
    document.body.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let labelX = -100;
    let labelY = -100;
    let isHoveringProject = false;
    let isHoveringInteractive = false;
    let magnetTarget = null;

    const ringLerp = 0.12;
    const labelLerp = 0.08;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (magnetTarget) {
            const rect = magnetTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distX = mouseX - centerX;
            const distY = mouseY - centerY;
            const dist = Math.sqrt(distX * distX + distY * distY);
            const maxDist = Math.max(rect.width, rect.height);

            if (dist < maxDist) {
                const pull = 0.3;
                dot.style.left = (mouseX + distX * pull * -1) + 'px';
                dot.style.top = (mouseY + distY * pull * -1) + 'px';
                return;
            }
        }

        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    document.addEventListener('mouseenter', () => {
        dot.classList.remove('hidden');
        ring.classList.remove('hidden');
    });

    document.addEventListener('mouseleave', () => {
        dot.classList.add('hidden');
        ring.classList.add('hidden');
        label.classList.remove('visible');
    });

    document.addEventListener('mouseover', (e) => {
        const projectTile = e.target.closest('.project-tile');
        const interactive = e.target.closest('a, button, input, textarea, [role="button"], .header-nav-link, .terminal-chip');

        if (projectTile) {
            isHoveringProject = true;
            isHoveringInteractive = true;
            magnetTarget = projectTile;
            dot.classList.add('hovering');
            ring.classList.add('hovering', 'project-hover');
            label.classList.add('visible');
        } else if (interactive) {
            isHoveringInteractive = true;
            magnetTarget = interactive;
            dot.classList.add('hovering');
            ring.classList.add('hovering');
            label.classList.remove('visible');
        }
    });

    document.addEventListener('mouseout', (e) => {
        const projectTile = e.target.closest('.project-tile');
        const interactive = e.target.closest('a, button, input, textarea, [role="button"], .header-nav-link, .terminal-chip');

        if (projectTile || interactive) {
            isHoveringProject = false;
            isHoveringInteractive = false;
            magnetTarget = null;
            dot.classList.remove('hovering');
            ring.classList.remove('hovering', 'project-hover');
            label.classList.remove('visible');
        }
    });

    function animate() {
        ringX += (mouseX - ringX) * ringLerp;
        ringY += (mouseY - ringY) * ringLerp;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';

        labelX += (mouseX - labelX) * labelLerp;
        labelY += (mouseY - labelY) * labelLerp;
        label.style.left = labelX + 'px';
        label.style.top = labelY + 'px';

        requestAnimationFrame(animate);
    }

    animate();
}
