import {
    WebGLRenderer,
    Scene,
    OrthographicCamera,
    BufferGeometry,
    BufferAttribute,
    Float32BufferAttribute,
    Points,
    ShaderMaterial,
    LineSegments,
    LineBasicMaterial
} from 'three';

export function initHeroCanvas() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    hero.appendChild(canvas);

    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    let width = hero.offsetWidth;
    let height = hero.offsetHeight;
    renderer.setSize(width, height);

    const scene = new Scene();
    const camera = new OrthographicCamera(0, width, 0, height, 1, 10);
    camera.position.z = 5;

    const PARTICLE_COUNT = 100;
    const CONNECTION_DIST = 130;
    const MOUSE_RADIUS = 160;
    const BASE_SPEED = 0.3;

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 2);
    const opacities = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = Math.random() * width;
        positions[i * 3 + 1] = Math.random() * height;
        positions[i * 3 + 2] = 0;
        velocities[i * 2] = (Math.random() - 0.5) * BASE_SPEED;
        velocities[i * 2 + 1] = (Math.random() - 0.5) * BASE_SPEED;
        opacities[i] = 0.3 + Math.random() * 0.3;
    }

    const pointsGeometry = new BufferGeometry();
    pointsGeometry.setAttribute('position', new BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('alpha', new BufferAttribute(opacities, 1));

    const pointsMaterial = new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: `
            attribute float alpha;
            varying float vAlpha;
            void main() {
                vAlpha = alpha;
                vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = 2.0;
                gl_Position = projectionMatrix * mvPos;
            }
        `,
        fragmentShader: `
            varying float vAlpha;
            void main() {
                float d = length(gl_PointCoord - vec2(0.5));
                if (d > 0.5) discard;
                gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * (1.0 - d * 2.0));
            }
        `
    });

    const points = new Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    const MAX_LINES = PARTICLE_COUNT * PARTICLE_COUNT;
    const linePositions = new Float32Array(MAX_LINES * 6);
    const lineColors = new Float32Array(MAX_LINES * 8);
    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute('position', new Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new Float32BufferAttribute(lineColors, 4));

    const lineMaterial = new LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        depthWrite: false
    });

    const lines = new LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const mouse = { x: -9999, y: -9999 };

    hero.addEventListener('pointermove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    hero.addEventListener('pointerleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    let animId;

    function animate() {
        animId = requestAnimationFrame(animate);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            let px = positions[i * 3];
            let py = positions[i * 3 + 1];

            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MOUSE_RADIUS && dist > 0) {
                const force = (1 - dist / MOUSE_RADIUS) * 0.8;
                velocities[i * 2] += (dx / dist) * force;
                velocities[i * 2 + 1] += (dy / dist) * force;
            }

            velocities[i * 2] *= 0.96;
            velocities[i * 2 + 1] *= 0.96;

            const speed = Math.sqrt(velocities[i * 2] ** 2 + velocities[i * 2 + 1] ** 2);
            if (speed < BASE_SPEED * 0.5) {
                velocities[i * 2] += (Math.random() - 0.5) * 0.05;
                velocities[i * 2 + 1] += (Math.random() - 0.5) * 0.05;
            }

            px += velocities[i * 2];
            py += velocities[i * 2 + 1];

            if (px < 0) { px = 0; velocities[i * 2] *= -1; }
            if (px > width) { px = width; velocities[i * 2] *= -1; }
            if (py < 0) { py = 0; velocities[i * 2 + 1] *= -1; }
            if (py > height) { py = height; velocities[i * 2 + 1] *= -1; }

            positions[i * 3] = px;
            positions[i * 3 + 1] = py;
        }

        pointsGeometry.attributes.position.needsUpdate = true;

        let lineIdx = 0;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    const alpha = (1 - dist / CONNECTION_DIST) * 0.15;

                    linePositions[lineIdx * 6] = positions[i * 3];
                    linePositions[lineIdx * 6 + 1] = positions[i * 3 + 1];
                    linePositions[lineIdx * 6 + 2] = 0;
                    linePositions[lineIdx * 6 + 3] = positions[j * 3];
                    linePositions[lineIdx * 6 + 4] = positions[j * 3 + 1];
                    linePositions[lineIdx * 6 + 5] = 0;

                    lineColors[lineIdx * 8] = 1;
                    lineColors[lineIdx * 8 + 1] = 1;
                    lineColors[lineIdx * 8 + 2] = 1;
                    lineColors[lineIdx * 8 + 3] = alpha;
                    lineColors[lineIdx * 8 + 4] = 1;
                    lineColors[lineIdx * 8 + 5] = 1;
                    lineColors[lineIdx * 8 + 6] = 1;
                    lineColors[lineIdx * 8 + 7] = alpha;

                    lineIdx++;
                }
            }
        }

        lineGeometry.setDrawRange(0, lineIdx * 2);
        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.color.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            width = hero.offsetWidth;
            height = hero.offsetHeight;
            renderer.setSize(width, height);
            camera.right = width;
            camera.bottom = height;
            camera.updateProjectionMatrix();
        }, 150);
    });
}
