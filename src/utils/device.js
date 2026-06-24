export function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768;
}

export function isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function hasWebGL2() {
    try {
        const canvas = document.createElement('canvas');
        return !!canvas.getContext('webgl2');
    } catch (e) {
        return false;
    }
}

export function getDevicePixelRatio() {
    return Math.min(window.devicePixelRatio, 2);
}

export function isHighPerformance() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return true;
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    return !/Intel|SwiftShader|llvmpipe/i.test(renderer);
}
