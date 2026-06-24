# yasindce1998.github.io

Personal portfolio and blog — dark editorial design inspired by [Active Theory](https://activetheory.net).

**Live:** [yasindce1998.github.io](https://yasindce1998.github.io)

## Tech Stack

- **Build:** Vite 6 (vanilla JS, no framework)
- **3D:** Three.js particle network in the hero section
- **Typography:** Manrope (display) + JetBrains Mono (monospace)
- **Blog:** Markdown → HTML via `marked`, built with a Node script
- **Hosting:** GitHub Pages (static files committed to repo)

## Quick Start

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`. Blog HTML is generated automatically before the server starts.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Builds blog + starts Vite dev server |
| `npm run build` | Builds blog + production build to `dist/` |
| `npm run blog:build` | Generates blog HTML only |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
├── index.html                  # Main portfolio page
├── blog/
│   ├── content/                # Markdown source files (you write here)
│   │   └── hello-world.md
│   ├── posts/                  # Generated HTML (don't edit directly)
│   │   └── hello-world.html
│   └── index.html              # Generated blog listing page
├── scripts/
│   └── build-blog.mjs          # Blog build script
├── src/
│   ├── main.js                 # Entry point — initializes all modules
│   ├── js/
│   │   ├── hero-canvas.js      # Three.js particle network
│   │   ├── hover-distortion.js # Mouse-driven distortion effect
│   │   ├── hover-glow.js       # Cursor glow on project cards
│   │   ├── custom-cursor.js    # Custom cursor with trail
│   │   ├── page-intro.js       # Page load animation
│   │   ├── text-reveal.js      # Character-by-character text animation
│   │   ├── scroll-reveal.js    # Section fade-in on scroll
│   │   ├── horizontal-scroll.js# Horizontal scroll in projects section
│   │   ├── marquee.js          # Footer marquee ticker
│   │   ├── header-scroll.js    # Header transparent → solid on scroll
│   │   ├── smooth-scroll.js    # Smooth anchor scrolling
│   │   ├── mobile-menu.js      # Mobile navigation toggle
│   │   └── terminal.js         # CRT terminal animation
│   └── styles/
│       ├── index.css           # All imports
│       ├── base/               # Reset, variables, typography
│       ├── layout/             # Header, grid, responsive
│       ├── sections/           # Hero, projects, terminal, tutorials, blog, footer
│       └── components/         # Animations, cursor, scroll-reveal, etc.
├── vite.config.js              # Auto-discovers blog posts for build
└── package.json
```

## Writing Blog Posts

### 1. Create a Markdown file

Create a new `.md` file in `blog/content/`:

```markdown
---
title: Your Post Title
date: 2026-06-24
description: A short summary shown on the blog listing page.
category: eBPF
readTime: 5 min read
---

Your content here. Full **Markdown** support — headings, code blocks,
lists, blockquotes, images, links, etc.

## Subheading

```go
func main() {
    fmt.Println("code blocks work")
}
```​

> Blockquotes work too.
```

### 2. Frontmatter fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title (displayed as heading) |
| `date` | Yes | Publication date (`YYYY-MM-DD`) |
| `description` | Yes | Summary for the listing page and meta tag |
| `category` | No | Topic label (e.g. "Kernel Security", "eBPF") |
| `readTime` | No | Estimated read time (defaults to "5 min read") |

### 3. Build and preview

```bash
npm run blog:build    # generates HTML from your markdown
npm run dev           # start dev server to preview
```

The filename becomes the URL slug:
- `blog/content/ebpf-map-poisoning.md` → `/blog/posts/ebpf-map-poisoning.html`

### 4. Publish

```bash
git add blog/
git commit -m "add new blog post"
git push
```

GitHub Pages deploys automatically. Both the markdown source and generated HTML are committed.

## Design System

### Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-primary` | `#000000` | Page background |
| `--bg-secondary` | `#0a0a0a` | Card backgrounds |
| `--bg-elevated` | `#111111` | Elevated surfaces |
| `--text-primary` | `#ffffff` | Headings, body text |
| `--text-secondary` | `#888888` | Muted labels |
| `--terminal-green` | `#00ff41` | Accent / terminal |
| `--border-color` | `#1a1a1a` | Dividers |

### Typography

- **Display headings:** Manrope 800, negative letter-spacing (`-0.04em`)
- **Body text:** Manrope 300/500
- **Monospace / code:** JetBrains Mono 400/600

### Motion Effects

| Effect | File | Description |
|--------|------|-------------|
| Particle network | `hero-canvas.js` | Three.js animated particles with mouse interaction |
| Hover distortion | `hover-distortion.js` | Ripple distortion on mouse move over elements |
| Text reveal | `text-reveal.js` | Characters animate in one by one on scroll |
| Scroll reveal | `scroll-reveal.js` | Sections fade up when entering viewport |
| Horizontal scroll | `horizontal-scroll.js` | Projects section scrolls horizontally |
| Marquee | `marquee.js` | Infinite scrolling ticker in footer |
| Custom cursor | `custom-cursor.js` | Dot cursor with trailing circle |
| Page intro | `page-intro.js` | Full-screen reveal animation on load |
| Header scroll | `header-scroll.js` | Header goes from transparent to solid |

## Production Build

```bash
npm run build
```

Output goes to `dist/`. The build:
1. Runs `scripts/build-blog.mjs` to generate blog HTML
2. Vite bundles all JS/CSS, processes assets
3. `vite.config.js` auto-discovers all `blog/posts/*.html` files as rollup inputs

## Deployment

Push to `main` — GitHub Pages serves from the repo root (or configure to serve from `dist/` if using GitHub Actions).

Currently the site deploys from source (HTML files at repo root), not from the `dist/` folder. The Vite build is available for optimized production builds if you switch to a CI-based deploy.
