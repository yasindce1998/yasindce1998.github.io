---
title: GLSL Shader Fundamentals for Web Developers
date: 2026-06-18
description: A practical introduction to writing vertex and fragment shaders for Three.js, covering coordinate spaces, uniforms, and common patterns.
category: Tutorial
readTime: 10 min read
---

If you've written JavaScript but never touched GLSL, shaders can feel alien. There's no `console.log`, no debugger, and the execution model is fundamentally different from anything in the JS runtime.

But once you internalize a few concepts, shaders become one of the most powerful tools for creating visual experiences on the web. This post covers the practical foundations.

## What Runs Where

A WebGL shader program has two stages:

- **Vertex shader** — runs once per vertex. Transforms 3D positions into screen coordinates. Can pass data to the fragment shader via `varying` variables.
- **Fragment shader** — runs once per pixel (technically per fragment). Determines the final color of each pixel.

The GPU runs thousands of these in parallel. That's why shaders are fast — but also why you can't have loops with unpredictable iteration counts or branch-heavy logic.

## Coordinate Spaces

The most confusing part of shader programming is keeping track of which space you're in:

| Space | Range | Used For |
|-------|-------|----------|
| Object/Local | varies | Vertex positions before transform |
| World | varies | After model matrix |
| View/Camera | varies | After view matrix |
| Clip | -1 to 1 (NDC) | After projection matrix |
| Screen | 0 to resolution | Final pixel coordinates |

In Three.js, the built-in uniforms handle most transforms:

```glsl
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
```

That single line takes you from object space all the way to clip space.

## Uniforms: Your Bridge to JavaScript

Uniforms are values you send from JS to the shader every frame. They're read-only in the shader and uniform across all vertices/fragments:

```javascript
const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uHover: { value: 0 },
    },
    vertexShader: vertCode,
    fragmentShader: fragCode,
});

// In your animation loop:
material.uniforms.uTime.value = elapsed;
```

Common uniforms I use in every project:

- `uTime` — elapsed time for animation
- `uMouse` — normalized mouse position
- `uResolution` — viewport dimensions
- `uScroll` — scroll progress (0 to 1)

## Pattern: Radial Displacement

One of the most versatile shader patterns is radial displacement from a point (like the mouse cursor):

```glsl
float dist = length(uv - uMouse);
float strength = smoothstep(0.5, 0.0, dist) * uIntensity;
vec2 offset = normalize(uv - uMouse) * strength;
vec2 displaced = uv + offset;
```

This creates a "push away from cursor" effect. Swap the sign to pull inward. Layer multiple points for complex displacement fields.

## Pattern: Noise-Based Motion

For organic, fluid motion, layer multiple octaves of simplex noise:

```glsl
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}
```

Feed `uTime` into the noise input to animate it. Multiply by different frequencies for different "scales" of motion.

## Debugging Without a Debugger

Since you can't `console.log` in GLSL, here are the tricks I use:

1. **Color-code values** — output the value as a color: `gl_FragColor = vec4(vec3(myValue), 1.0);`
2. **Isolate channels** — render only R, G, or B to see individual components
3. **Hard boundaries** — use `step()` to create visible thresholds: `gl_FragColor = vec4(step(0.5, myValue));`
4. **Range visualization** — map your value to a heatmap gradient to see the full range

## Next Steps

Once you're comfortable with these fundamentals:

- Explore **raymarching** for 3D signed distance field rendering
- Try **compute shaders** via WebGPU for particle simulations
- Study **post-processing** effects (bloom, DOF, motion blur) which are all fragment shader techniques

The key is experimentation. Shaders reward play — change a constant, see what happens. The feedback loop is milliseconds.
