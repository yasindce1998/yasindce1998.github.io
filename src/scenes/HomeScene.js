import * as THREE from 'three';
import fluidVert from '../shaders/fluid.vert?raw';
import fluidFrag from '../shaders/fluid.frag?raw';
import { getGPUTier } from '../utils/device.js';

export class HomeScene {
    constructor(renderer) {
        this.renderer = renderer;
        this.scene = renderer.scene;
        this.camera = renderer.camera;
        this.mouse = new THREE.Vector2(0.5, 0.5);
        this.scrollVelocity = 0;
        this.scrollProgress = 0;

        this.gpuTier = getGPUTier();
        this.createBackground();
    }

    createBackground() {
        const geometry = new THREE.PlaneGeometry(2, 2);
        const adaptedFrag = `#define FBM_OCTAVES ${this.gpuTier.octaves}\n` + fluidFrag;
        this.bgMaterial = new THREE.ShaderMaterial({
            vertexShader: fluidVert,
            fragmentShader: adaptedFrag,
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

    burst() {}

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
