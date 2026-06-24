# yasindce1998.github.io

Personal portfolio and blog — dark editorial design inspired by [Active Theory](https://activetheory.net).

**Live:** [yasindce1998.github.io](https://yasindce1998.github.io)

## Tech Stack

- **Build:** Vite 6 (vanilla JS, no framework)
- **Graphics:** Raw WebGL2 with custom GLSL fragment shader (fbm fluid noise)
- **Typography:** Manrope (display) + JetBrains Mono (monospace)
- **Blog:** Markdown → HTML via `marked`, built with a Node script
- **Deploy:** GitHub Actions → GitHub Pages

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
│   ├── content/                # Markdown source files
│   ├── posts/                  # Generated HTML (don't edit directly)
│   └── index.html              # Generated blog listing page
├── scripts/
│   └── build-blog.mjs          # Blog build script
├── src/
│   ├── main.js                 # Entry point — initializes all modules
│   ├── js/
│   │   ├── glsl-hero.js        # WebGL2 fbm fluid noise shader
│   │   ├── page-intro.js       # Twin-panel horizontal wipe loader
│   │   ├── custom-cursor.js    # Dual-ring cursor (inner + outer)
│   │   ├── text-reveal.js      # Clip-path character reveal animation
│   │   ├── scroll-reveal.js    # IntersectionObserver section reveals
│   │   ├── horizontal-scroll.js# Horizontal scroll with progress bar
│   │   ├── hover-distortion.js # Mouse-driven distortion effect
│   │   ├── hover-glow.js       # Cursor glow on project cards
│   │   ├── marquee.js          # Footer marquee ticker
│   │   ├── header-scroll.js    # Header transparent → solid on scroll
│   │   ├── smooth-scroll.js    # Smooth anchor scrolling
│   │   └── mobile-menu.js      # Mobile navigation toggle
│   └── styles/
│       ├── index.css           # All imports
│       ├── base/               # Reset, variables, typography
│       ├── layout/             # Header, grid, responsive
│       ├── sections/           # Hero, projects, tutorials, blog, footer
│       └── components/         # Cursor, text-reveal, page-intro, etc.
├── .github/workflows/
│   └── deploy.yml              # CI: build + deploy to GitHub Pages
├── vite.config.js              # Auto-discovers blog posts for build
└── package.json
```

## Design & Effects

### Visual System

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-primary` | `#000000` | Page background |
| `--bg-secondary` | `#080808` | Card/elevated surfaces |
| `--text-primary` | `#ffffff` | Headings, body, accents |
| `--text-secondary` | `#888888` | Muted labels |
| `--text-muted` | `#444444` | Subtle UI elements |
| `--border-color` | `rgba(255,255,255,0.07)` | Dividers |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Snappy transitions |
| `--ease-slow` | `cubic-bezier(0.77, 0, 0.175, 1)` | Dramatic wipes |

### Typography

- **Display headings:** Manrope 800, negative letter-spacing (`-0.04em`)
- **Body text:** Manrope 300/500
- **Monospace / code:** JetBrains Mono 400/600

### Motion Effects

| Effect | File | Description |
|--------|------|-------------|
| GLSL fluid noise | `glsl-hero.js` | Raw WebGL2 fbm shader with mouse distortion and vignette |
| Twin-panel loader | `page-intro.js` | Horizontal wipe with 0→100 counter animation |
| Dual-ring cursor | `custom-cursor.js` | Inner ring (lerp 0.08) + outer ring (lerp 0.05) |
| Clip-path text reveal | `text-reveal.js` | Characters slide up via `.char-outer` overflow clip |
| Scroll reveal | `scroll-reveal.js` | Sections fade in via IntersectionObserver |
| Horizontal scroll | `horizontal-scroll.js` | Projects section with scaleX progress bar |
| Hover distortion | `hover-distortion.js` | Ripple distortion on mouse move |
| Marquee | `marquee.js` | Infinite scrolling ticker strip |
| Header scroll | `header-scroll.js` | Transparent → solid on scroll |

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

Your content here. Full **Markdown** support.
```

### 2. Frontmatter fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `date` | Yes | Publication date (`YYYY-MM-DD`) |
| `description` | Yes | Summary for listing and meta tag |
| `category` | No | Topic label |
| `readTime` | No | Estimated read time (defaults to "5 min read") |

### 3. Build and preview

```bash
npm run blog:build
npm run dev
```

The filename becomes the URL slug: `blog/content/my-post.md` → `/blog/posts/my-post.html`

### 4. Publish

```bash
git add .
git commit -m "add new blog post"
git push
```

GitHub Actions builds and deploys automatically.

## Deployment

Push to `main` triggers the GitHub Actions workflow:

1. `npm ci` — install dependencies
2. `npm run build` — generates blog HTML + Vite production bundle to `dist/`
3. Upload `dist/` as Pages artifact
4. Deploy to GitHub Pages

Site is live at [yasindce1998.github.io](https://yasindce1998.github.io).
