# yasindce1998.github.io

Personal portfolio and blog — dark editorial design with a Three.js rendering engine, post-processing pipeline, and shader-driven interactions.

**Live:** [yasindce1998.github.io](https://yasindce1998.github.io)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite 6 (vanilla JS, no framework) |
| 3D / Graphics | Three.js + postprocessing (Bloom, ChromaticAberration, Vignette, Noise) |
| Animation | GSAP 3.15 (page transitions, tweens, scroll triggers) |
| Smooth Scroll | Lenis |
| Shaders | Custom GLSL (fluid noise, particles, image hover distortion) |
| Typography | Manrope (display) + JetBrains Mono (monospace) |
| Blog | Markdown → HTML via `marked`, built with a Node script |
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

## Project Structure

```
├── index.html                      # Main portfolio SPA
├── blog/
│   ├── blog.css                    # Blog-specific styles
│   ├── content/                    # Markdown source files
│   ├── posts/                      # Generated HTML (don't edit directly)
│   └── index.html                  # Generated blog listing page
├── public/
│   ├── 404.html                    # SPA fallback for GitHub Pages
│   ├── og-image.svg                # Open Graph social preview image
│   └── resume.pdf                  # Downloadable resume
├── scripts/
│   └── build-blog.mjs             # Blog build script (markdown → HTML)
├── src/
│   ├── main.js                    # App entry — orchestrates all modules
│   ├── components/
│   │   ├── Cursor.js              # Dual-ring custom cursor with blend modes
│   │   ├── HorizontalScroll.js    # GSAP-driven horizontal project carousel
│   │   ├── ImageHoverEffect.js    # WebGL shader overlay on project tiles
│   │   ├── Loader.js              # Animated loader with counter (0→100)
│   │   ├── Marquee.js             # Infinite scrolling ticker
│   │   ├── Router.js              # SPA client-side router (pushState)
│   │   ├── Scroll.js              # Lenis smooth scroll integration
│   │   ├── TextAnimation.js       # Clip-path character reveal animations
│   │   └── Transition.js          # 5-column curtain wipe page transitions
│   ├── data/
│   │   └── projects.js            # Structured project data (8 projects)
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
│   │   ├── components/            # Cursor, loader, marquee, fallback, etc.
│   │   ├── layout/               # Header, grid, responsive
│   │   ├── pages/                # Project detail page styles
│   │   └── sections/             # Hero, projects, tutorials, footer
│   └── utils/
│       ├── device.js              # WebGL2 detection, performance checks
│       ├── dom.js                 # DOM helpers
│       └── math.js                # Lerp, clamp, map utilities
├── .github/workflows/
│   └── deploy.yml                 # CI: Node 22, build + deploy to Pages
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

### SPA Routing

The site uses client-side routing (`history.pushState` / `popstate`) to navigate between the home page and project detail pages (`/work/:slug`) without full page reloads. Transitions are a 5-column curtain wipe animated with GSAP.

### Code Splitting

Vite's Rollup config splits heavy dependencies into separate chunks:

| Chunk | Contents |
|-------|----------|
| `vendor-three` | Three.js core |
| `vendor-gsap` | GSAP animation library |
| `vendor-lenis` | Smooth scroll |
| `vendor-postprocessing` | Post-processing effects |

WebGL modules are loaded lazily via dynamic `import()` after the page transition completes.

### Accessibility

- `prefers-reduced-motion` disables marquee animation and particle motion
- Project carousel has `role="region"`, `aria-roledescription="carousel"`, keyboard arrow-key navigation
- Focus-visible indicators on interactive elements

### WebGL Fallback

When WebGL2 isn't available, the body gets a `.no-webgl` class and a CSS gradient animation provides a visual background. The site remains fully functional.

## Design System

### Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-bg` | `#0a0a0a` | Page background |
| `--color-text` | `#f0f0f0` | Primary text |
| `--color-text-muted` | `rgba(240,240,240,0.4)` | Subtle labels |
| `--color-text-secondary` | `rgba(240,240,240,0.6)` | Secondary content |
| `--color-accent` | `#ffffff` | Interactive highlights |
| `--color-border` | `rgba(255,255,255,0.08)` | Dividers |
| `--color-surface` | `rgba(255,255,255,0.03)` | Elevated surfaces |

### Typography

- **Display headings:** Manrope 800, negative letter-spacing
- **Body text:** Manrope 300/500
- **Code / monospace:** JetBrains Mono 400/600

### Easing

| Variable | Curve | Use |
|----------|-------|-----|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Snappy interactions |
| `--ease-in-out-expo` | `cubic-bezier(0.87, 0, 0.13, 1)` | Page transitions |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | Subtle reveals |

## Custom Shaders

| Shader | File | Description |
|--------|------|-------------|
| Fluid noise | `fluid.vert/frag` | FBM turbulence driven by scroll + time |
| Particles | `particles.vert/frag` | Spiral point cloud with mouse repulsion |
| Image hover | `imageHover.vert/frag` | Wave distortion + RGB shift on project tiles |
| Transition | `transition.frag` | Shader-based page transition effect |

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
