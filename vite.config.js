import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';

function getBlogInputs() {
    const inputs = {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
    };

    try {
        const posts = readdirSync(resolve(__dirname, 'blog/posts')).filter(f => f.endsWith('.html'));
        for (const post of posts) {
            const name = `blog-${post.replace('.html', '')}`;
            inputs[name] = resolve(__dirname, 'blog/posts', post);
        }
    } catch {}

    return inputs;
}

export default defineConfig({
    base: '/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: getBlogInputs(),
        },
    },
});
