---
title: Hello World — Starting This Blog
date: 2026-06-23
description: Why I'm writing about kernel security, eBPF internals, and the offensive/defensive divide.
category: Kernel Security
readTime: 3 min read
---

I've been working at the intersection of offensive and defensive security for a while now — building eBPF rootkits to understand how attackers think, then flipping the same primitives into runtime protection layers.

This blog is where I'll document that process: the research, the failures, and the things I wish someone had written down before I spent three days debugging a verifier rejection.

## What to Expect

I'll be writing about:

- **eBPF internals** — verifier quirks, map types, tail calls, and the tradeoffs between TC and XDP
- **Kernel security research** — from UEFI bootkits to LSM hooks to container escape vectors
- **Offensive tooling** — how I build and test security research tools like KubeDagger and Aegis-Shadow
- **AI agent containment** — applying kernel-level controls to autonomous agent systems

## Why Write Publicly?

The security research space has a documentation problem. Papers get published, CVEs get assigned, but the practical knowledge — the "how to actually hook this syscall without crashing the kernel" knowledge — lives in scattered blog posts and conference talks.

I want to contribute to making that knowledge more accessible, while being responsible about what I share and how I frame it.

> The best defense comes from understanding the offense.

## Stay tuned

First real technical post coming soon — probably on eBPF map poisoning techniques and how to detect them at runtime.
