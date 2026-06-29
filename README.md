# yasindce1998.github.io

Personal portfolio and blog — an editorial print-magazine aesthetic with three switchable themes (day / night / cyber), Three.js rendering, and GSAP-driven interactions.

**Live:** [yasindce1998.github.io](https://yasindce1998.github.io)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite 6 (vanilla JS, no framework) |
| 3D / Graphics | Three.js + postprocessing (Bloom, ChromaticAberration, Vignette, Noise) |
| Animation | GSAP 3.15 (page transitions, tweens, scroll triggers) |
| Smooth Scroll | Lenis |
| Shaders | Custom GLSL (fluid noise, particles, image hover distortion) |
| Typography | Fraunces (display) + Inter / Space Grotesk (body) + JetBrains Mono (mono) |
| Blog | Markdown → HTML via `marked`, built with a Node script |
| Testing | Playwright E2E + Lighthouse CI |
| Deploy | GitHub Actions → GitHub Pages |

## Quick Start

```bash
npm install
npm run dev
```

Dev server runs at `http://localhost:5173`. Blog HTML is generated automatically before the server starts.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Builds blog + starts Vite dev server |
| `npm run build` | Builds blog + production build to `dist/` |
| `npm run blog:build` | Generates blog HTML only |
| `npm run preview` | Preview the production build locally |
| `npm run test` | Run Playwright E2E tests (desktop + mobile) |
| `npm run test:ui` | Open Playwright UI mode for debugging |
| `npm run lighthouse` | Run Lighthouse CI (perf, a11y, SEO assertions) |

## Project Structure

```
├── index.html                      # Main portfolio SPA
├── blog/
│   ├── blog.css                    # Blog design system (/dev/log — 3 themes)
│   ├── blog.js                     # Blog interactions (typewriter, theme toggle, code windows)
│   ├── content/                    # Markdown source files
│   ├── posts/                      # Generated HTML (don't edit directly)
│   └── index.html                  # Generated blog listing page
├── public/
│   ├── 404.html                    # SPA fallback for GitHub Pages
│   ├── og-image.svg                # Open Graph social preview image
│   ├── resume.pdf                  # Downloadable resume
│   ├── robots.txt                  # Crawl directives
│   └── sitemap.xml                 # Sitemap
├── scripts/
│   └── build-blog.mjs             # Blog build script (markdown → HTML)
├── src/
│   ├── main.js                    # App entry — orchestrates all modules
│   ├── components/
│   │   ├── Cursor.js              # Dual-ring custom cursor with blend modes
│   │   ├── Effects.js             # WebGL post-processing pipeline control
│   │   ├── HorizontalScroll.js    # GSAP-driven horizontal project carousel
│   │   ├── ImageHoverEffect.js    # WebGL shader overlay on project tiles
│   │   ├── Loader.js              # Terminal boot sequence + split reveal
│   │   ├── Marquee.js            # Infinite scrolling ticker
│   │   ├── Router.js             # SPA client-side router (pushState)
│   │   ├── Scroll.js             # Lenis smooth scroll integration
│   │   ├── TextAnimation.js      # Clip-path character reveal animations
│   │   └── Transition.js         # 5-column curtain wipe page transitions
│   ├── data/
│   │   └── projects.js            # Structured project data
│   ├── engine/
│   │   ├── Clock.js               # High-resolution delta time clock
│   │   ├── Loader.js              # Asset preloader
│   │   └── Renderer.js            # WebGL2 renderer + EffectComposer pipeline
│   ├── scenes/
│   │   └── HomeScene.js           # Particle system + fluid background shader
│   ├── shaders/
│   │   ├── background.vert/frag   # Background plane shader
│   │   ├── fluid.vert/frag        # FBM fluid noise shader
│   │   ├── imageHover.vert/frag   # Ripple + RGB shift on hover
│   │   ├── particles.vert/frag    # Spiral particle system
│   │   └── transition.frag        # Transition effect shader
│   ├── styles/
│   │   ├── index.css              # All style imports
│   │   ├── base/                  # Reset, variables, typography, accessibility
│   │   ├── components/            # Cursor, loader, marquee, navigation, etc.
│   │   ├── layout/               # Header, grid, responsive
│   │   ├── pages/                # Project detail page styles
│   │   └── sections/             # Hero, about, projects, experience, footer
│   └── utils/
│       ├── device.js              # WebGL2 detection, performance checks
│       ├── dom.js                 # DOM helpers
│       └── math.js                # Lerp, clamp, map utilities
├── tests/
│   ├── portfolio.spec.js          # Main site E2E tests (12 tests)
│   ├── blog.spec.js               # Blog page E2E tests (8 tests)
│   └── mobile.spec.js             # Mobile viewport tests (5 tests)
├── .github/workflows/
│   ├── deploy.yml                 # CI: build + deploy to Pages
│   └── test.yml                   # CI: Playwright + Lighthouse on push/PR
├── playwright.config.js           # Desktop Chrome + Mobile Chrome projects
├── lighthouserc.cjs               # Lighthouse CI thresholds
├── vite.config.js                 # Multi-page input + manual chunk splitting
└── package.json
```

## Architecture

### Rendering Pipeline

```
Three.js WebGLRenderer (WebGL2)
  └── EffectComposer (postprocessing)
       ├── RenderPass (HomeScene — particles + fluid background)
       ├── BloomEffect (subtle glow on particle clusters)
       ├── ChromaticAberrationEffect (scroll-velocity + section-boundary pulses)
       ├── VignetteEffect (depth framing)
       └── NoiseEffect (film grain overlay)
```

The chromatic aberration is reactive — it responds to scroll velocity and pulses when crossing section boundaries via IntersectionObserver.

### Loader Sequence

The intro loader runs a terminal boot sequence (printing editorial setup lines in monospace) with a progress bar, then performs a vertical split reveal — two panels slide apart to unveil the main content underneath.

### SPA Routing

Client-side routing (`history.pushState` / `popstate`) navigates between the home page and project detail pages (`/work/:slug`) without full page reloads. Transitions are a 5-column curtain wipe animated with GSAP.

### Code Splitting

Vite's Rollup config splits the animation dependencies into dedicated vendor chunks:

| Chunk | Contents |
|-------|----------|
| `vendor-gsap` | GSAP animation library |
| `vendor-lenis` | Smooth scroll |

Three.js and the postprocessing library are left to Rollup's automatic chunking. WebGL modules are loaded lazily via dynamic `import()` after the page transition completes.

### Accessibility

- `prefers-reduced-motion` disables marquee animation and particle motion
- Project carousel has `role="region"`, `aria-roledescription="carousel"`, keyboard navigation
- Focus-visible indicators on interactive elements

### WebGL Fallback

When WebGL2 isn't available, the body gets a `.no-webgl` class and a CSS gradient animation provides a visual background. The site remains fully functional.

## Design System

### Themes

Three themes cycle from a single masthead toggle (or the `t` keyboard shortcut), persisted in `localStorage` under the `theme` key — shared between the portfolio and the blog so the choice follows you across both. Colors are driven entirely by CSS custom properties in `src/styles/base/variables.css`, so the palette cascades through every section automatically.

| Theme | Background | Text | Accent / Accent-2 |
|-------|-----------|------|--------|
| Day (default) | `#f3ecdc` paper | `#1a1610` | `#c2410c` burnt orange / `#0e7490` teal |
| Night | `#0c0b09` | `#f0ead6` | `#f59e0b` amber / `#06b6d4` cyan |
| Cyber | `#02060a` | `#4eff96` neon green | `#ffea00` yellow / `#ff10f0` magenta |

The cyber theme adds a CRT scanline overlay (`body::before`). The WebGL shaders use their own fixed cosmic palette and are intentionally decoupled from the theme.

### Typography

| Role | Family | Weight |
|------|--------|--------|
| Display headings | Fraunces | 400–900, optical-size |
| Body (portfolio) | Inter | 300/400/500 |
| Body (blog) | Space Grotesk | 300–700 |
| Code / labels | JetBrains Mono | 400–700 |

### Easing

| Variable | Curve | Use |
|----------|-------|-----|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Snappy interactions |
| `--ease-in-out-expo` | `cubic-bezier(0.87, 0, 0.13, 1)` | Page transitions |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | Subtle reveals |

## Testing

### E2E (Playwright)

25 tests across two browser projects (Desktop Chrome 1280×720, Mobile Chrome 375×667):

- **portfolio.spec.js** (12) — page load, sections, theme toggle, navigation, projects, contact
- **blog.spec.js** (8) — blog index, posts, navigation, styling
- **mobile.spec.js** (5) — overflow checks, hamburger menu, touch targets

### Lighthouse CI

Runs against the production build with these thresholds:

| Category | Minimum Score |
|----------|--------------|
| Performance | 80 |
| Accessibility | 90 |
| SEO | 90 |

### CI Pipeline

GitHub Actions (`.github/workflows/test.yml`) runs on every push to `main` and on PRs:

1. Checkout → Node 22 → `npm ci`
2. Install Playwright browsers
3. Build production bundle
4. Run Playwright tests (report artifact on failure)
5. Run Lighthouse CI

## Writing Blog Posts

### 1. Create a Markdown file

```markdown
---
title: Your Post Title
date: 2026-06-24
description: A short summary for the listing page.
category: Tutorial
readTime: 5 min read
---

Your content here. Full **Markdown** support with GFM.
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

Filename becomes the URL slug: `blog/content/my-post.md` → `/blog/posts/my-post.html`

## Deployment

Push to `main` triggers GitHub Actions:

1. `npm ci` (Node 22)
2. `npm run build` — generates blog HTML + Vite production bundle to `dist/`
3. Upload `dist/` as Pages artifact
4. Deploy to GitHub Pages

Site is live at [yasindce1998.github.io](https://yasindce1998.github.io).
