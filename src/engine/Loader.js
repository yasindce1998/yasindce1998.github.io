import * as THREE from 'three';

export class AssetLoader {
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
        this.assets = new Map();
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.onProgress = null;
        this.onComplete = null;
    }

    setCallbacks(onProgress, onComplete) {
        this.onProgress = onProgress;
        this.onComplete = onComplete;
    }

    addTexture(key, url) {
        this.totalAssets++;
        return new Promise((resolve) => {
            this.textureLoader.load(url, (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                this.assets.set(key, texture);
                this.loadedAssets++;
                this.updateProgress();
                resolve(texture);
            }, undefined, () => {
                this.loadedAssets++;
                this.updateProgress();
                resolve(null);
            });
        });
    }

    updateProgress() {
        const progress = this.totalAssets > 0 ? this.loadedAssets / this.totalAssets : 1;
        if (this.onProgress) this.onProgress(progress);
        if (progress >= 1 && this.onComplete) this.onComplete();
    }

    get(key) {
        return this.assets.get(key);
    }

    simulateLoading(duration = 2000) {
        return new Promise((resolve) => {
            const start = performance.now();
            const update = () => {
                const elapsed = performance.now() - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                if (this.onProgress) this.onProgress(eased);
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    if (this.onComplete) this.onComplete();
                    resolve();
                }
            };
            requestAnimationFrame(update);
        });
    }
}
