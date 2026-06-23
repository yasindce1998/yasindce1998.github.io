export function initTextReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = document.querySelectorAll('.text-reveal');
    if (!elements.length) return;

    elements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        let charIndex = 0;

        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            if (text[i] === ' ') {
                span.className = 'char whitespace';
                span.innerHTML = '&nbsp;';
            } else {
                span.className = 'char';
                span.textContent = text[i];
            }
            span.style.transitionDelay = `${charIndex * 30}ms`;
            el.appendChild(span);
            charIndex++;
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('text-reveal--active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
}
