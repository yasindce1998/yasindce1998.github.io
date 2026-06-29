import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { marked } from 'marked';

const ROOT = join(import.meta.dirname, '..');
const CONTENT_DIR = join(ROOT, 'blog', 'content');
const POSTS_DIR = join(ROOT, 'blog', 'posts');

if (!existsSync(POSTS_DIR)) mkdirSync(POSTS_DIR, { recursive: true });

marked.setOptions({ gfm: true, breaks: false });

const SITE = 'https://yasindce1998.github.io';
const FONTS = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='4' fill='%23f59e0b'/%3E%3Cpath d='M9 23V9L16 16L23 9V23' stroke='%23000' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { meta: {}, body: raw };

    const meta = {};
    for (const line of match[1].split('\n')) {
        const idx = line.indexOf(':');
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim();
        meta[key] = val;
    }
    return { meta, body: match[2] };
}

function esc(s = '') {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function head(title, description, canonical) {
    return `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <link rel="canonical" href="${canonical}">
    <link rel="icon" type="image/svg+xml" href="${FAVICON}">
    <meta name="theme-color" content="#f3ecdc">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="${FONTS}" rel="stylesheet">
    <link rel="stylesheet" href="/blog/blog.css">
    <script>(function(){var v=['dark','light','cyber'];var t=localStorage.getItem('theme');if(v.indexOf(t)===-1)t='light';document.documentElement.dataset.theme=t;})()</script>
    <script type="module" src="/blog/blog.js"></script>
</head>`;
}

function themeToggle() {
    return `<div class="theme-toggle" role="group" aria-label="Theme selector">
                    <button class="theme-btn" data-theme="dark" title="Dark" aria-label="Dark theme">&#9789;</button>
                    <button class="theme-btn" data-theme="light" title="Light" aria-label="Light theme">&#9728;</button>
                    <button class="theme-btn" data-theme="cyber" title="Cyber" aria-label="Cyber theme">&#9632;</button>
                </div>`;
}

function nav() {
    return `<header class="blog-nav">
            <nav class="blog-nav-inner">
                <a href="/blog/" class="blog-logo"><span class="slash">/</span>dev<span class="dim">/</span>log<span class="logo-cursor" aria-hidden="true"></span></a>
                <div class="blog-nav-links">
                    <a href="/blog/#notes" class="hover-link">notes</a>
                    <a href="/blog/#archive" class="hover-link">archive</a>
                    <a href="/" class="hover-link">portfolio &#8599;</a>
                </div>
                ${themeToggle()}
            </nav>
        </header>`;
}

function footer() {
    const year = 2026;
    return `<footer class="blog-footer">
            <div class="container">
                <div class="blog-footer-inner">
                    <div class="blog-footer-row">
                        <div class="blog-footer-note">&copy; ${year} Mohammed Yasin &middot; built from the kernel up</div>
                        <div class="blog-footer-social">
                            <a href="https://github.com/yasindce1998" target="_blank" rel="noopener" class="hover-link">GitHub</a>
                            <a href="https://twitter.com/yasindce1998" target="_blank" rel="noopener" class="hover-link">X</a>
                            <a href="/" class="hover-link">Portfolio</a>
                        </div>
                    </div>
                    <div class="blog-footer-term"><span class="sigil">$</span> echo "thanks for reading" | sudo tee /dev/stdout</div>
                </div>
            </div>
        </footer>`;
}

function postTemplate(meta, contentHtml) {
    const canonical = `${SITE}/blog/posts/${meta.slug}.html`;
    const metaBits = [formatDate(meta.date), meta.readTime || '5 min read', meta.category]
        .filter(Boolean)
        .map((b, i) => (i === 0 ? `<span>${esc(b)}</span>` : `<span class="dot">&middot;</span><span>${esc(b)}</span>`))
        .join('\n                ');

    return `<!DOCTYPE html>
<html lang="en">
${head(`${meta.title} | Mohammed Yasin`, meta.description || '', canonical)}
<body>
    <div class="progress-bar" id="progressBar"></div>
    ${nav()}

    <main class="blog-post-page">
        <header class="blog-post-header">
            <a href="/blog/" class="blog-post-back">&larr; All Posts</a>
            <h1 class="blog-post-page-title">${esc(meta.title)}</h1>
            <div class="blog-post-page-meta">
                ${metaBits}
            </div>
        </header>

        <article class="blog-post-content">
            ${contentHtml}
        </article>

        <div class="blog-post-foot">
            <a href="/blog/" class="btn-secondary">&larr; all posts</a>
            <a href="/" class="btn-secondary">portfolio &#8599;</a>
        </div>
    </main>

    ${footer()}
</body>
</html>
`;
}

function indexTemplate(posts) {
    const recent = posts.slice(0, 3);
    const older = posts.slice(3);

    const categories = [...new Set(posts.map(p => p.category).filter(Boolean))];
    const totalMinutes = posts.reduce((sum, p) => {
        const m = (p.readTime || '').match(/\d+/);
        return sum + (m ? parseInt(m[0], 10) : 0);
    }, 0);

    const phrases = JSON.stringify([
        'whoami',
        'cat /dev/log',
        'tracing the kernel.',
        'from offense to defense.',
        "console.log('welcome.');",
    ]);

    const marqueeItems = ['eBPF', 'Kernel Security', 'Rust', 'Linux', 'Three.js', 'WebGL', 'GLSL', 'Cloud-Native', 'Containers', 'Offensive Research', 'Shaders', 'Systems']
        .map(t => `<span>${t}</span><span>&middot;</span>`).join('');

    const cards = recent.map((p, i) => `
                <a href="/blog/posts/${p.slug}.html" class="article-card blog-post-item reveal">
                    <div class="card-top">
                        <span class="card-num">${String(i + 1).padStart(2, '0')}</span>
                        ${p.category ? `<span class="tag">${esc(p.category)}</span>` : ''}
                    </div>
                    <div class="card-date blog-post-date">${p.date}${p.readTime ? ` &mdash; ${esc(p.readTime)}` : ''}</div>
                    <h2>${esc(p.title)}</h2>
                    <p class="card-excerpt">${esc(p.description || '')}</p>
                    <div class="card-read"><span>read essay</span><span class="arrow">&rarr;</span></div>
                </a>`).join('\n');

    const archive = older.map(p => `
                <a href="/blog/posts/${p.slug}.html" class="archive-item blog-post-item reveal">
                    <span class="archive-date blog-post-date">${p.date}</span>
                    <div>
                        <h3 class="archive-title">${esc(p.title)}</h3>
                        <div class="archive-desc">${esc(p.description || '')}</div>
                    </div>
                    ${p.category ? `<span class="tag">${esc(p.category)}</span>` : '<span></span>'}
                    <span class="archive-read">${esc(p.readTime || '')}</span>
                </a>`).join('\n');

    const archiveSection = older.length ? `
    <section class="blog-section" id="archive">
        <div class="container">
            <div class="reveal" style="margin-bottom:48px;">
                <div class="section-eyebrow">// the archive</div>
                <h2 class="section-title">Older <span class="it">posts</span></h2>
            </div>
            <div class="reveal">
${archive}
            </div>
        </div>
    </section>` : '';

    return `<!DOCTYPE html>
<html lang="en">
${head('Blog — Mohammed Yasin', 'Notes by Mohammed Yasin on eBPF, kernel security, cloud-native, shaders, and offensive research.', `${SITE}/blog/`)}
<body>
    <div class="progress-bar" id="progressBar"></div>
    ${nav()}

    <section class="blog-hero bg-grid" id="hero">
        <div class="float-dot" style="width:500px;height:500px;top:5%;left:-150px;background:var(--color-accent);"></div>
        <div class="float-dot" style="width:600px;height:600px;bottom:-200px;right:-200px;background:var(--color-accent-2);animation-delay:-5s;"></div>
        <div class="mouse-glow" id="mouseGlow"></div>
        <div class="container blog-hero-inner">
            <div class="blog-hero-meta">
                <span class="tag">/dev/log</span>
                <span>&middot;</span>
                <span>${posts.length} ${posts.length === 1 ? 'entry' : 'entries'}</span>
                <span>&middot;</span>
                <span style="display:inline-flex;align-items:center;gap:8px;"><span class="stat-dot"></span> currently publishing</span>
            </div>
            <h1 class="blog-hero-title"><span class="prompt">$</span> <span id="typewriter" class="cursor-tw" data-words="${esc(phrases)}"></span></h1>
            <p class="blog-hero-lead">Notes from the kernel up &mdash; on eBPF, security research, and the strange joy of debugging a verifier rejection at 2am.</p>
            <p class="blog-hero-sub">I'm <span class="name">Mohammed Yasin</span> &mdash; security engineer writing about kernel-level offense and cloud-native defense. eBPF today, shaders tomorrow, the occasional bootkit for fun.</p>
            <div class="blog-hero-cta">
                <a href="#notes" class="btn-primary">read latest <span>&rarr;</span></a>
                <a href="/" class="btn-secondary">portfolio &#8599;</a>
            </div>
            <div class="blog-stats">
                <div><div class="blog-stat-num">${posts.length}</div><div class="blog-stat-label">posts published</div></div>
                <div><div class="blog-stat-num">${categories.length}</div><div class="blog-stat-label">topics covered</div></div>
                <div><div class="blog-stat-num">${totalMinutes}m</div><div class="blog-stat-label">total reading</div></div>
                <div><div class="blog-stat-num">&infin;</div><div class="blog-stat-label">cups of coffee</div></div>
            </div>
        </div>
    </section>

    <div class="marquee-wrap" aria-hidden="true">
        <div class="marquee">${marqueeItems}${marqueeItems}</div>
    </div>

    <section class="blog-section" id="notes">
        <div class="container">
            <div class="section-head reveal">
                <div>
                    <div class="section-eyebrow">// recent notes</div>
                    <h2 class="section-title blog-page-title">Latest <span class="it">writing</span></h2>
                </div>
                ${older.length ? '<a href="#archive" class="btn-secondary">all posts <span>&rarr;</span></a>' : ''}
            </div>
            <div class="cards-grid">
${cards}
            </div>
        </div>
    </section>
${archiveSection}

    ${footer()}
</body>
</html>
`;
}

// Build
const mdFiles = readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
const posts = [];

for (const file of mdFiles) {
    const raw = readFileSync(join(CONTENT_DIR, file), 'utf-8');
    const { meta, body } = parseFrontmatter(raw);
    const slug = basename(file, '.md');
    meta.slug = slug;

    const contentHtml = marked(body);
    const html = postTemplate(meta, contentHtml);

    writeFileSync(join(POSTS_DIR, `${slug}.html`), html);
    posts.push({ slug, title: meta.title, date: meta.date, description: meta.description, category: meta.category, readTime: meta.readTime });
}

posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

writeFileSync(join(ROOT, 'blog', 'index.html'), indexTemplate(posts));

console.log(`Blog built: ${posts.length} post${posts.length !== 1 ? 's' : ''}`);
