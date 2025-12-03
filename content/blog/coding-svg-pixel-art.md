---
draft: true
date: 2025-12-02T20:42:00
title: Hand-coding an SVG Pixel Art
description: How I practically learned constructing SVGs by (re)drawing a watermelon
---
A few days ago I had the sudden idea of putting up a watermelon “stamp” on a corner of my website. At first I thought I’d do a quarter-circle, but then I remembered I already drew a watermelon pixel art before. I wanted to use that but, being the minimalist I am, wanted to have it in a much smaller file size without losing any fidelity. Also didn’t want to use a low-res image, in case people wanted to zoom in. Thus I concluded that I should recreate the pixel art in vector format (SVG).

Now, SVGs can be made in various software (like Inkscape), but I have found the workflow to be rather cumbersome for pixel art specifically. The snapping to grid is so bad it may not as well be there. I can never get things to align exactly how I want. So, not wanting to deal with that, I chose the option any sane person would (not) — write the SVG code myself.

Thankfully I looked around for a bit before I set off on this arduous task, and came across this [wonderful project that can be used to create pixel art SVGs](https://github.com/TheRealSmeddy/svg-pixel-editor). The code is straightforward and they have a static webapp live on GitHub Pages, which is convenient. So I recreated the watermelon there and saved the SVG. Quick and easy. However, the size was not much smaller than a high-enough resolution export of the raster version of the image. What gives?

It turns out that the webapp, being so simple, included no optimization attempts. So next I set off to look for an SVG optimizer and came across the [SVGOMG website](https://jakearchibald.github.io/svgomg/), which is a frontend for the [SVGO command-line utility (and Node module)](https://github.com/svg/svgo) that does SVG optimization. It did reduce the file size by a good amount, but it was still not enough because of how inefficient the input code was to begin with. Now what?
