export function initTextReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroLines = document.querySelectorAll('.hero-line');
    const footerTitle = document.querySelector('.footer-cta-title');

    heroLines.forEach(el => splitChars(el));
    if (footerTitle) {
        const lines = footerTitle.innerHTML.split('<br>');
        footerTitle.innerHTML = '';
        lines.forEach((line, i) => {
            const span = document.createElement('span');
            span.className = 'reveal-line';
            span.textContent = line.replace(/<[^>]*>/g, '');
            splitChars(span);
            footerTitle.appendChild(span);
            if (i < lines.length - 1) {
                footerTitle.appendChild(document.createElement('br'));
            }
        });
    }

    // Reveal hero lines after intro completes
    const revealHero = () => {
        heroLines.forEach(el => el.classList.add('chars-visible'));
    };

    if (document.body.classList.contains('intro-complete')) {
        revealHero();
    } else {
        document.body.addEventListener('introComplete', revealHero);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('chars-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-char-split]').forEach(el => {
        if (!el.classList.contains('hero-line')) {
            observer.observe(el);
        }
    });
}

function splitChars(el) {
    const text = el.textContent;
    el.textContent = '';
    el.setAttribute('data-char-split', '');

    for (let i = 0; i < text.length; i++) {
        const outer = document.createElement('span');
        outer.className = 'char-outer';
        const span = document.createElement('span');
        span.className = 'char';
        if (text[i] === ' ') {
            span.innerHTML = '&nbsp;';
        } else {
            span.textContent = text[i];
        }
        span.style.transitionDelay = `${i * 35}ms`;
        outer.appendChild(span);
        el.appendChild(outer);
    }
}
