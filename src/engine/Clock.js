export class Clock {
    constructor() {
        this.callbacks = [];
        this.isRunning = false;
        this.lastTime = 0;
        this.elapsed = 0;
        this.delta = 0;
        this.frame = 0;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        this.tick();
    }

    stop() {
        this.isRunning = false;
    }

    add(callback, priority = 0) {
        this.callbacks.push({ fn: callback, priority });
        this.callbacks.sort((a, b) => a.priority - b.priority);
        return () => this.remove(callback);
    }

    remove(callback) {
        this.callbacks = this.callbacks.filter(c => c.fn !== callback);
    }

    tick() {
        if (!this.isRunning) return;

        const now = performance.now();
        this.delta = Math.min((now - this.lastTime) / 1000, 0.1);
        this.lastTime = now;
        this.elapsed += this.delta;
        this.frame++;

        for (let i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i].fn(this.elapsed, this.delta);
        }

        requestAnimationFrame(() => this.tick());
    }
}
