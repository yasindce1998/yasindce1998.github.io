---
title: Building a WebGL Portfolio from Scratch
date: 2026-06-20
description: How I built a portfolio site with a custom Three.js rendering engine, post-processing pipeline, and shader-driven interactions.
category: Creative Dev
readTime: 7 min read
---

Most developer portfolios are static pages with a dark theme and some hover effects. I wanted something that felt more like an interactive experience — something that responded to your presence on the page.

This post covers the technical architecture behind this portfolio site: the rendering engine, post-processing pipeline, and the decisions that shaped the final result.

## The Rendering Stack

The core of the visual experience is a Three.js WebGL2 scene with a post-processing pipeline built on the `postprocessing` library:

```
Three.js WebGLRenderer
  └── EffectComposer
       ├── RenderPass (main scene)
       ├── BloomEffect (subtle glow on particles)
       ├── ChromaticAberrationEffect (scroll-reactive)
       ├── VignetteEffect (depth framing)
       └── NoiseEffect (film grain overlay)
```

The key insight was making the post-processing *reactive*. Chromatic aberration doesn't just exist — it pulses when you cross section boundaries. The bloom intensifies on particle clusters that drift near the camera.

## Shader Architecture

I wrote three custom GLSL shader pairs:

1. **Fluid background** — a fragment shader that simulates turbulent flow using layered simplex noise, driven by scroll position and time
2. **Particles** — a vertex shader that displaces points along a spiral with mouse-reactive repulsion
3. **Image hover** — a vertex+fragment pair that warps project tile images with a ripple displacement and RGB shift on hover

The image hover shader is the most interesting. It uses the UV distance from the mouse cursor to create a radial distortion:

```glsl
float dist = length(uv - uMouse);
float distortion = smoothstep(0.8, 0.0, dist) * uHover * 0.03;
uv += distortion * normalize(uv - uMouse);
```

The `smoothstep` falloff gives it a natural, organic feel rather than a hard-edged displacement.

## Performance Budget

Running a full post-processing pipeline on every frame is expensive. Here's how I kept it performant:

- **Device-aware DPR capping** — mobile gets 1.5x max, desktop caps at 2x
- **Dynamic quality** — `isHighPerformance()` check disables antialiasing on weaker GPUs
- **Code splitting** — Three.js, GSAP, and postprocessing are separate chunks loaded asynchronously
- **Graceful degradation** — if WebGL2 isn't available, a CSS gradient animation fills the background

The total JS payload lands around 180KB gzipped for the critical path. The WebGL chunk loads lazily after the page transition completes.

## Lessons Learned

1. **Post-processing is additive** — every effect you add compounds the visual noise. Start with none and add only what serves the experience.
2. **Motion should be motivated** — random floating particles are meaningless. Tie motion to user intent (scroll, hover, focus).
3. **The fallback is the product too** — 15% of visitors won't get WebGL. The CSS fallback should still feel intentional.

The source for all of this is on [GitHub](https://github.com/yasindce1998/yasindce1998.github.io).
