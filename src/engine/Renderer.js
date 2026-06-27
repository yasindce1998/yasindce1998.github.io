import * as THREE from 'three';
import { EffectComposer, RenderPass, EffectPass, BloomEffect, ChromaticAberrationEffect, VignetteEffect, NoiseEffect, BlendFunction } from 'postprocessing';
import { getDevicePixelRatio, isHighPerformance, getGPUTier } from '../utils/device.js';

export class Renderer {
    constructor(container) {
        this.container = container;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.dpr = getDevicePixelRatio();
        this.highPerf = isHighPerformance();
        this.gpuTier = getGPUTier();

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({
            antialias: this.highPerf,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(this.dpr);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;

        this.canvas = this.renderer.domElement;
        this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
        this.container.appendChild(this.canvas);

        this.setupPostProcessing();
        this.setupSectionPulses();
        this.setupResize();
    }

    setupPostProcessing() {
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));

        if (!this.gpuTier.postProcessing) {
            return;
        }

        const effects = [];

        if (this.gpuTier.tier >= 2) {
            this.bloomEffect = new BloomEffect({
                intensity: 0.5,
                luminanceThreshold: 0.8,
                luminanceSmoothing: 0.3,
                mipmapBlur: true
            });
            effects.push(this.bloomEffect);
        }

        this.chromaticAberration = new ChromaticAberrationEffect({
            offset: new THREE.Vector2(0.0005, 0.0005),
            radialModulation: true,
            modulationOffset: 0.5
        });
        effects.push(this.chromaticAberration);

        this.vignetteEffect = new VignetteEffect({
            darkness: 0.5,
            offset: 0.3
        });
        effects.push(this.vignetteEffect);

        if (this.gpuTier.tier >= 2) {
            this.noiseEffect = new NoiseEffect({
                blendFunction: BlendFunction.OVERLAY,
                premultiply: true
            });
            this.noiseEffect.blendMode.opacity.value = 0.06;
            effects.push(this.noiseEffect);
        }

        if (effects.length > 0) {
            const effectPass = new EffectPass(this.camera, ...effects);
            this.composer.addPass(effectPass);
        }
    }

    setupResize() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
            this.composer.setSize(this.width, this.height);
        });
    }

    setupSectionPulses() {
        this.pulseIntensity = 0;
        this.pulseDecay = 0.95;
        const sections = document.querySelectorAll('.hero, .projects, .about, .footer');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.1 && entry.intersectionRatio < 0.9) {
                    this.pulseIntensity = 0.004;
                }
            });
        }, { threshold: [0.1, 0.5, 0.9] });

        sections.forEach(s => observer.observe(s));
    }

    setScrollVelocity(velocity) {
        if (!this.chromaticAberration) return;
        const velocityIntensity = Math.min(Math.abs(velocity) * 0.002, 0.003);
        this.pulseIntensity *= this.pulseDecay;
        const total = Math.min(velocityIntensity + this.pulseIntensity, 0.006);
        this.chromaticAberration.offset.set(total, total);
    }

    render(homeScene) {
        if (homeScene && homeScene.renderBackground) {
            homeScene.renderBackground();
        }
        this.composer.render();
    }

    dispose() {
        this.renderer.dispose();
        this.composer.dispose();
        this.container.removeChild(this.canvas);
    }
}
