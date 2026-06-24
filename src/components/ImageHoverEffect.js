import * as THREE from 'three';
import gsap from 'gsap';
import imageHoverVert from '../shaders/imageHover.vert?raw';
import imageHoverFrag from '../shaders/imageHover.frag?raw';

export class ImageHoverEffect {
    constructor(renderer) {
        this.renderer = renderer;
        this.meshes = [];
        this.mouse = new THREE.Vector2(0.5, 0.5);
        this.raycaster = new THREE.Raycaster();
        this.clock = new THREE.Clock();

        this.hoverScene = new THREE.Scene();
        this.hoverCamera = new THREE.OrthographicCamera(
            -window.innerWidth / 2, window.innerWidth / 2,
            window.innerHeight / 2, -window.innerHeight / 2,
            0.1, 100
        );
        this.hoverCamera.position.z = 10;

        this.initTiles();
        this.bindEvents();
    }

    initTiles() {
        const tiles = document.querySelectorAll('.project-tile');
        const textureLoader = new THREE.TextureLoader();
        const fallbackCanvas = this.createFallbackTexture();

        tiles.forEach((tile, i) => {
            const rect = tile.getBoundingClientRect();
            const geometry = new THREE.PlaneGeometry(rect.width, rect.height, 32, 32);
            const material = new THREE.ShaderMaterial({
                vertexShader: imageHoverVert,
                fragmentShader: imageHoverFrag,
                uniforms: {
                    uTexture: { value: new THREE.CanvasTexture(fallbackCanvas) },
                    uHover: { value: 0 },
                    uTime: { value: 0 },
                    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                },
                transparent: true,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                rect.left + rect.width / 2 - window.innerWidth / 2,
                -(rect.top + rect.height / 2 - window.innerHeight / 2),
                0
            );
            mesh.visible = false;

            this.hoverScene.add(mesh);
            this.meshes.push({ mesh, tile, material });

            tile.addEventListener('mouseenter', () => {
                mesh.visible = true;
                gsap.to(material.uniforms.uHover, { value: 1, duration: 0.6, ease: 'power2.out' });
            });

            tile.addEventListener('mouseleave', () => {
                gsap.to(material.uniforms.uHover, { value: 0, duration: 0.4, ease: 'power2.in', onComplete: () => { mesh.visible = false; } });
            });

            tile.addEventListener('mousemove', (e) => {
                const tileRect = tile.getBoundingClientRect();
                material.uniforms.uMouse.value.set(
                    (e.clientX - tileRect.left) / tileRect.width,
                    1.0 - (e.clientY - tileRect.top) / tileRect.height
                );
            });
        });
    }

    createFallbackTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#0a0a0a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
        return canvas;
    }

    updatePositions() {
        this.meshes.forEach(({ mesh, tile }) => {
            const rect = tile.getBoundingClientRect();
            mesh.position.set(
                rect.left + rect.width / 2 - window.innerWidth / 2,
                -(rect.top + rect.height / 2 - window.innerHeight / 2),
                0
            );
        });
    }

    update(delta) {
        const elapsed = this.clock.getElapsedTime();
        this.meshes.forEach(({ material, mesh }) => {
            if (mesh.visible) {
                material.uniforms.uTime.value = elapsed;
            }
        });

        this.updatePositions();
        this.renderer.renderer.render(this.hoverScene, this.hoverCamera);
    }

    resize() {
        this.hoverCamera.left = -window.innerWidth / 2;
        this.hoverCamera.right = window.innerWidth / 2;
        this.hoverCamera.top = window.innerHeight / 2;
        this.hoverCamera.bottom = -window.innerHeight / 2;
        this.hoverCamera.updateProjectionMatrix();
    }
}
