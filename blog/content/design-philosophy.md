---
title: My Design Philosophy — Restraint as a Feature
date: 2026-06-15
description: Why I design with maximum visual restraint, and how constraint creates more impactful experiences.
category: Design
readTime: 5 min read
---

Every portfolio site I've ever admired has one thing in common: restraint. Not minimalism for its own sake, but the disciplined choice to do less so that what remains hits harder.

This post is about the design decisions behind this site and the broader philosophy that drives my creative work.

## The Problem with "More"

The instinct when building a portfolio is to show everything. Every animation library you know, every interaction pattern you've seen, every color in your palette. The result is a site that feels like a tech demo rather than a considered piece of work.

I've built those sites. They impress other developers for about 30 seconds, then become exhausting to navigate.

## Constraint Creates Focus

The constraints I set for this site:

- **One typeface family** — Manrope for headings and body, JetBrains Mono for technical elements. That's it.
- **Near-monochrome palette** — white text on near-black backgrounds. Color exists only in hover states and links.
- **Motion is earned** — nothing moves until you interact. Scroll triggers transitions. Hover triggers shaders. Idle state is static.
- **Typography-first hierarchy** — size and weight do the work. No colored backgrounds, no cards with shadows, no decorative borders.

These constraints aren't limitations — they're the design. Every visual element that exists has to justify its presence against the alternative of empty space.

## The Role of WebGL

The WebGL layer might seem to contradict the restraint principle — it's technically complex and visually rich. But its job is atmospheric, not informational. It:

- Adds depth without content (particle field creates dimension)
- Responds to presence without demanding attention (mouse-reactive, not auto-playing)
- Degrades invisibly (CSS fallback maintains the same visual hierarchy)

The shader effects are subtle. The chromatic aberration barely registers consciously — you feel it more than see it. The image hover distortion lasts milliseconds. If you removed the WebGL layer, the site would still communicate everything it needs to.

## Dark Backgrounds and Typography

I chose a dark palette not because it's trendy, but because:

1. **Type becomes the star** — light text on dark backgrounds has inherent drama. Every letterform is a point of light.
2. **WebGL integrates naturally** — additive blending and particle systems work best against dark backgrounds.
3. **Focus is controlled** — there's nowhere for the eye to rest except on content.

The font sizes are intentionally extreme. Hero text is viewport-scaled. Body text is comfortable reading size. There's nothing in between — no medium headings, no subtitle sizes. This binary creates unmistakable hierarchy.

## Interaction as Conversation

Every interaction on this site is a call-and-response:

- You move your mouse → the cursor transforms to indicate affordances
- You hover a project → the shader tells you "this is interactive"
- You scroll → the page transitions acknowledge your intent to move on
- You reach the footer → the typography opens up, the pace slows

This isn't just UX polish. It's the site treating the visitor as present — not passively consuming, but actively navigating.

## The Takeaway

Restraint isn't about doing less work. Building this site took more iteration than any maximalist design would have. Every removed element was first added, then evaluated, then cut.

The discipline is in asking: "Does this serve the person visiting, or does it serve my ego as the builder?"

Most of the time, the answer is the latter. And that's when you delete it.
