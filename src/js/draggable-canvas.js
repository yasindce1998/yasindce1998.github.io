export function initDraggableCanvas() {
    const canvasBounds = document.getElementById('canvas-bounds');
    const cards = document.querySelectorAll('.draggable-card');

    if (!canvasBounds || cards.length === 0) return;

    let dragActive = false;
    let activeCard = null;
    let initialX = 0;
    let initialY = 0;
    let startX = 0;
    let startY = 0;
    let pointerId = null;

    cards.forEach(card => {
        const savedPos = localStorage.getItem(`pos_${card.id}`);
        if (savedPos) {
            try {
                const { x, y } = JSON.parse(savedPos);
                card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                card.dataset.x = x;
                card.dataset.y = y;
            } catch (e) {
                resetCardPosition(card);
            }
        } else {
            resetCardPosition(card);
        }

        card.addEventListener('pointerdown', (e) => {
            if (e.target.closest('button') || e.target.closest('input') || e.target.closest('label')) {
                return;
            }

            cards.forEach(c => {
                c.classList.remove('selected');
                c.style.zIndex = 5;
            });
            card.classList.add('selected');
            card.style.zIndex = 10;

            dragActive = true;
            activeCard = card;
            pointerId = e.pointerId;
            card.setPointerCapture(pointerId);

            const transform = getTransformValues(card);
            initialX = transform.x;
            initialY = transform.y;
            startX = e.clientX;
            startY = e.clientY;

            e.preventDefault();
        });

        card.addEventListener('pointermove', (e) => {
            if (!dragActive || activeCard !== card || e.pointerId !== pointerId) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            let newX = initialX + dx;
            let newY = initialY + dy;

            const boundsRect = canvasBounds.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const maxX = boundsRect.width - cardRect.width - 10;
            const maxY = boundsRect.height - cardRect.height - 10;

            newX = Math.max(10, Math.min(maxX, newX));
            newY = Math.max(10, Math.min(maxY, newY));

            card.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
            card.dataset.x = newX;
            card.dataset.y = newY;

            e.preventDefault();
        });

        const handlePointerUp = (e) => {
            if (dragActive && activeCard === card) {
                dragActive = false;
                activeCard = null;
                if (pointerId !== null) {
                    try {
                        card.releasePointerCapture(pointerId);
                    } catch (err) {}
                    pointerId = null;
                }

                const currentPos = {
                    x: parseFloat(card.dataset.x || 0),
                    y: parseFloat(card.dataset.y || 0)
                };
                localStorage.setItem(`pos_${card.id}`, JSON.stringify(currentPos));
            }
        };

        card.addEventListener('pointerup', handlePointerUp);
        card.addEventListener('pointercancel', handlePointerUp);
    });

    function getTransformValues(el) {
        const style = window.getComputedStyle(el);
        const matrix = style.transform || style.webkitTransform;

        if (matrix && matrix !== 'none') {
            const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
            if (matrixValues.length === 6) {
                return { x: parseFloat(matrixValues[4]), y: parseFloat(matrixValues[5]) };
            } else if (matrixValues.length === 16) {
                return { x: parseFloat(matrixValues[12]), y: parseFloat(matrixValues[13]) };
            }
        }
        return { x: 0, y: 0 };
    }

    function resetCardPosition(card) {
        let x = 40, y = 80;
        if (card.id === 'card-bio') {
            x = window.innerWidth > 768 ? 120 : 30;
            y = window.innerWidth > 768 ? 260 : 380;
        } else if (card.id === 'card-config') {
            x = window.innerWidth > 768 ? 580 : 30;
            y = window.innerWidth > 768 ? 120 : 700;
        }
        card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        card.dataset.x = x;
        card.dataset.y = y;
    }
}
