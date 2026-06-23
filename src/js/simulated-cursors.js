export function initSimulatedCursors() {
    const canvasBounds = document.getElementById('canvas-bounds');
    const cursors = [
        { el: document.getElementById('cursor-rust'), x: 200, y: 150, tx: 200, ty: 150, vx: 0, vy: 0, speed: 1.2 },
        { el: document.getElementById('cursor-k8s'), x: 450, y: 220, tx: 450, ty: 220, vx: 0, vy: 0, speed: 1.0 },
        { el: document.getElementById('cursor-ebpf'), x: 720, y: 180, tx: 720, ty: 180, vx: 0, vy: 0, speed: 1.5 }
    ];

    if (!canvasBounds || !cursors[0].el) return;

    function updateWandering() {
        const bounds = canvasBounds.getBoundingClientRect();
        if (bounds.width < 100) return;

        cursors.forEach(c => {
            const distToTarget = Math.hypot(c.tx - c.x, c.ty - c.y);
            if (distToTarget < 10 || Math.random() < 0.005) {
                c.tx = Math.random() * (bounds.width - 150) + 50;
                c.ty = Math.random() * (bounds.height - 80) + 40;
            }

            c.x += (c.tx - c.x) * 0.02 * c.speed;
            c.y += (c.ty - c.y) * 0.02 * c.speed;

            c.el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
        });

        requestAnimationFrame(updateWandering);
    }

    updateWandering();
}
