export function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768;
}

export function isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
