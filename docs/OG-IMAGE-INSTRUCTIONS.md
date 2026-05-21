# Open Graph Image Instructions

## What You Need

Create a social media preview image for when your portfolio is shared on LinkedIn, Twitter, Facebook, etc.

## Specifications

- **Dimensions**: 1200px × 630px (required for optimal display)
- **Format**: PNG or JPG
- **File name**: `og-image.png`
- **Location**: Root directory of the project

## Content Suggestions

Your OG image should include:

1. **Your Name**: "MOHAMMED YASIN" in large, bold text
2. **Title**: "Cloud-Native & Cybersecurity Engineer"
3. **Key Technologies**: Visual icons or text for:
   - Golang
   - Rust
   - Kubernetes
   - eBPF
   - Blockchain

4. **Visual Style**: Match your portfolio's aesthetic
   - Dark background (#0f1419 or #1a1e2b)
   - Accent color: #455ce9 (blue)
   - Success color: #7fe787 (green)
   - Clean, modern, technical look

## Design Tools

You can create this image using:

- **Canva** (easiest, has templates)
- **Figma** (professional, free)
- **Photoshop** (if you have it)
- **GIMP** (free alternative to Photoshop)
- **Online OG Image Generators**:
  - https://www.opengraph.xyz/
  - https://ogimage.gallery/

## Template Idea

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                                                     │
│              MOHAMMED YASIN                         │
│                                                     │
│      Cloud-Native & Cybersecurity Engineer          │
│                                                     │
│                                                     │
│    [Golang]  [Rust]  [Kubernetes]  [eBPF]           │
│                                                     │
│                                                     │
│              yasindce1998.github.io                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## After Creating

1. Save the image as `og-image.png`
2. Place it in the root directory (same level as `index.html`)
3. The meta tags in `index.html` are already configured to use this file
4. Test by sharing your portfolio URL on:
   - LinkedIn (check preview)
   - Twitter (check card preview)
   - Facebook (use their Sharing Debugger)

## Testing Tools

- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/

## Current Meta Tags

Your `index.html` already includes:

```html
<meta property="og:image" content="https://yasindce1998.github.io/og-image.png">
<meta name="twitter:image" content="https://yasindce1998.github.io/og-image.png">
```

Once you create and upload `og-image.png`, these will automatically work!

## Quick Canva Template

If using Canva:
1. Create custom size: 1200 × 630 px
2. Choose dark background
3. Add your name in large font (80-100pt)
4. Add subtitle in smaller font (40-50pt)
5. Add tech stack icons or badges
6. Export as PNG
7. Rename to `og-image.png`
8. Upload to your repository

That's it! Your portfolio will look professional when shared on social media.