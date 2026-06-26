import * as THREE from 'three';
import fluidVert from '../shaders/fluid.vert?raw';
import fluidFrag from '../shaders/fluid.frag?raw';
import particlesVert from '../shaders/particles.vert?raw';
import particlesFrag from '../shaders/particles.frag?raw';

export class HomeScene {
    constructor(renderer) {
        this.renderer = renderer;
        this.scene = renderer.scene;
        this.camera = renderer.camera;
        this.mouse = new THREE.Vector2(0.5, 0.5);
        this.scrollVelocity = 0;
        this.scrollProgress = 0;

        this.createBackground();
        this.createParticles();
        this.createFloatingGeometry();
    }

    createBackground() {
        const geometry = new THREE.PlaneGeometry(2, 2);
        this.bgMaterial = new THREE.ShaderMaterial({
            vertexShader: fluidVert,
            fragmentShader: fluidFrag,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                uScrollVelocity: { value: 0 }
            },
            depthWrite: false,
            depthTest: false
        });

        this.bgMesh = new THREE.Mesh(geometry, this.bgMaterial);
        this.bgMesh.frustumCulled = false;
        this.bgMesh.renderOrder = -1000;

        const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.bgScene = new THREE.Scene();
        this.bgScene.add(this.bgMesh);
        this.bgCamera = bgCamera;
    }

    createParticles() {
        const count = 800;
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const speeds = new Float32Array(count);
        const offsets = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;

            sizes[i] = Math.random() * 3 + 0.5;
            speeds[i] = Math.random() * 0.5 + 0.2;
            offsets[i] = Math.random() * Math.PI * 2;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
        geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));

        this.particleMaterial = new THREE.ShaderMaterial({
            vertexShader: particlesVert,
            fragmentShader: particlesFrag,
            uniforms: {
                uTime: { value: 0 },
                uScrollVelocity: { value: 0 },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) }
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, this.particleMaterial);
        this.scene.add(this.particles);
    }

    createFloatingGeometry() {
        this.floatingGroup = new THREE.Group();

        const wireMaterial = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.12
        });

        const torus = new THREE.Mesh(
            new THREE.TorusGeometry(1.2, 0.02, 16, 100),
            wireMaterial.clone()
        );
        torus.position.set(3, -1, -3);
        torus.rotation.x = Math.PI * 0.3;
        this.floatingGroup.add(torus);

        const sphere = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.8, 1),
            wireMaterial.clone()
        );
        sphere.position.set(-3, 2, -4);
        this.floatingGroup.add(sphere);

        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(0.6, 0.01, 8, 64),
            wireMaterial.clone()
        );
        ring.position.set(2, 3, -2);
        ring.rotation.y = Math.PI * 0.5;
        this.floatingGroup.add(ring);

        const octahedron = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.5, 0),
            wireMaterial.clone()
        );
        octahedron.position.set(-2, -2, -3);
        this.floatingGroup.add(octahedron);

        this.scene.add(this.floatingGroup);
    }

    setMouse(x, y) {
        this.mouse.set(x, y);
    }

    setScroll(velocity, progress) {
        this.scrollVelocity = velocity;
        this.scrollProgress = progress;
    }

    update(elapsed, delta) {
        this.bgMaterial.uniforms.uTime.value = elapsed;
        this.bgMaterial.uniforms.uMouse.value.lerp(this.mouse, 0.05);
        this.bgMaterial.uniforms.uScrollVelocity.value += (this.scrollVelocity - this.bgMaterial.uniforms.uScrollVelocity.value) * 0.1;

        this.particleMaterial.uniforms.uTime.value = elapsed;
        this.particleMaterial.uniforms.uMouse.value.lerp(this.mouse, 0.05);
        this.particleMaterial.uniforms.uScrollVelocity.value = this.scrollVelocity;

        if (this.floatingGroup) {
            this.floatingGroup.children.forEach((mesh, i) => {
                mesh.rotation.x += delta * 0.1 * (i % 2 === 0 ? 1 : -1);
                mesh.rotation.y += delta * 0.15 * (i % 2 === 0 ? -1 : 1);
                mesh.position.y += Math.sin(elapsed * 0.5 + i) * delta * 0.1;
            });
        }

        const cameraOffsetX = (this.mouse.x - 0.5) * 0.3;
        const cameraOffsetY = (this.mouse.y - 0.5) * 0.2;
        this.camera.position.x += (cameraOffsetX - this.camera.position.x) * 0.02;
        this.camera.position.y += (cameraOffsetY - this.camera.position.y) * 0.02;
        this.camera.lookAt(0, 0, 0);
    }

    renderBackground() {
        const gl = this.renderer.renderer;
        gl.autoClear = false;
        gl.render(this.bgScene, this.bgCamera);
        gl.autoClear = true;
    }

    resize() {
        this.bgMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }
}
