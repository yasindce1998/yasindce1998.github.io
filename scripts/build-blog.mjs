import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { marked } from 'marked';

const ROOT = join(import.meta.dirname, '..');
const CONTENT_DIR = join(ROOT, 'blog', 'content');
const POSTS_DIR = join(ROOT, 'blog', 'posts');

if (!existsSync(POSTS_DIR)) mkdirSync(POSTS_DIR, { recursive: true });

marked.setOptions({ gfm: true, breaks: false });

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

function postTemplate(meta, contentHtml) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.title} | Mohammed Yasin</title>
    <meta name="description" content="${meta.description || ''}">
    <link rel="canonical" href="https://yasindce1998.github.io/blog/posts/${meta.slug}.html">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='4' fill='%23ffffff'/%3E%3Cpath d='M9 23V9L16 16L23 9V23' stroke='%23000' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
    <meta name="theme-color" content="#000000">
    <script type="module" src="/src/main.js"><\/script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Manrope:wght@300;500;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="blog-post-page">
        <header class="blog-post-header">
            <a href="/blog/" class="blog-post-back">&larr; All Posts</a>
            <h1 class="blog-post-page-title">${meta.title}</h1>
            <div class="blog-post-page-meta">
                <span>${formatDate(meta.date)}</span>
                <span>${meta.readTime || '5 min read'}</span>
                <span>${meta.category || ''}</span>
            </div>
        </header>

        <article class="blog-post-content">
            ${contentHtml}
        </article>
    </div>
</body>
</html>
`;
}

function indexTemplate(posts) {
    const postItems = posts.map(p => `
                <a href="/blog/posts/${p.slug}.html" class="blog-post-item">
                    <span class="blog-post-date">${p.date}</span>
                    <div class="blog-post-info">
                        <h3>${p.title}</h3>
                        <p>${p.description || ''}</p>
                    </div>
                    <span class="blog-post-arrow">&rarr;</span>
                </a>`).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog — Mohammed Yasin</title>
    <meta name="description" content="Blog posts by Mohammed Yasin on eBPF, kernel security, cloud-native, and offensive research.">
    <link rel="canonical" href="https://yasindce1998.github.io/blog/">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='4' fill='%23ffffff'/%3E%3Cpath d='M9 23V9L16 16L23 9V23' stroke='%23000' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
    <meta name="theme-color" content="#000000">
    <script type="module" src="/src/main.js"><\/script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Manrope:wght@300;500;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="blog-page">
        <header class="blog-page-header">
            <div class="container">
                <a href="/" class="blog-post-back">&larr; Back to Home</a>
                <h1 class="blog-page-title">Blog</h1>
                <p style="color: var(--text-secondary); margin-top: 1rem; font-size: 1.05rem;">
                    Thoughts on kernel security, eBPF, offensive research, and building secure systems.
                </p>
            </div>
        </header>

        <main class="blog-posts-list">
            <div class="container">
${postItems}
            </div>
        </main>
    </div>
</body>
</html>
`;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
    posts.push({ slug, title: meta.title, date: meta.date, description: meta.description, category: meta.category });
}

posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

writeFileSync(join(ROOT, 'blog', 'index.html'), indexTemplate(posts));

console.log(`Blog built: ${posts.length} post${posts.length !== 1 ? 's' : ''}`);
