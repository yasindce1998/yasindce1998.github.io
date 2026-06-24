export function splitTextIntoChars(element) {
    const text = element.textContent;
    element.textContent = '';
    element.setAttribute('aria-label', text);

    const chars = [];
    for (let i = 0; i < text.length; i++) {
        const wrapper = document.createElement('span');
        wrapper.className = 'char-wrap';
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'inline-block';

        const char = document.createElement('span');
        char.className = 'char';
        char.style.display = 'inline-block';
        char.style.transform = 'translateY(100%)';
        char.textContent = text[i] === ' ' ? ' ' : text[i];

        wrapper.appendChild(char);
        element.appendChild(wrapper);
        chars.push(char);
    }
    return chars;
}

export function splitTextIntoLines(element) {
    const lines = element.innerHTML.split('<br>').map(l => l.trim());
    element.innerHTML = '';
    element.setAttribute('aria-label', lines.join(' '));

    return lines.map(line => {
        const wrapper = document.createElement('div');
        wrapper.className = 'line-wrap';
        wrapper.style.overflow = 'hidden';

        const inner = document.createElement('div');
        inner.className = 'line';
        inner.style.transform = 'translateY(100%)';
        inner.textContent = line;

        wrapper.appendChild(inner);
        element.appendChild(wrapper);
        return inner;
    });
}

export function observeElement(el, callback, options = {}) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                if (!options.repeat) observer.unobserve(entry.target);
            }
        });
    }, { threshold: options.threshold || 0.2, rootMargin: options.rootMargin || '0px' });

    observer.observe(el);
    return observer;
}
