---
draft: false
date: 2025-12-02T20:42:00
title: Hand-coding an SVG Pixel Art
description: How I practically learned constructing SVGs by (re)drawing a watermelon
---
A few days ago I had the sudden idea of putting up a watermelon "stamp" on a corner of my website (which you may have noticed by now). At first I thought I'd do a quarter-circle, but then I remembered I already drew a watermelon pixel art before. I wanted to use that but, being the minimalist I am, wanted to have it in a much smaller file size without losing any fidelity. Also didn't want to use a low-res image, in case people wanted to zoom in. Thus I concluded that I should recreate the pixel art in vector format (SVG).

Now, SVGs can be made in various software (like Inkscape), but I have found the workflow to be rather cumbersome for pixel art specifically. The snapping to grid is so bad it may not as well be there. I can never get things to align exactly how I want. So, not wanting to deal with that, I chose the option any sane person would (not) — write the SVG code myself.

Thankfully I looked around for a bit before I set off on this arduous task, and came across this [wonderful project that can be used to create pixel art SVGs](https://github.com/TheRealSmeddy/svg-pixel-editor). The code is straightforward and they have a static webapp live on GitHub Pages, which is convenient. So I recreated the watermelon there and saved the SVG. Quick and easy. However, the size (\~12 KB) was not much smaller than a high-enough resolution export of the raster version of the image (\~16 KB). What gives?

It turns out that the webapp, being so simple, included no optimization attempts. So next I set off to look for an SVG optimizer and came across the [SVGOMG website](https://jakearchibald.github.io/svgomg/), which is a frontend for the [SVGO command-line utility (and Node module)](https://github.com/svg/svgo) that does SVG optimization by converting shapes to paths (among other things). It did reduce the file size by a good amount (to \~8 KB), but it was still not enough because of how inefficient the input code was to begin with. Now what?

I thought of combining adjacent squares, but was having trouble visualizing what the optimal combination of rectangles would be. I went on MDN and looked up how SVGs work, to see if there was an easier way. Interestingly, there‘s a section on [create SVGs from scratch](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch), which was super helpful. From it, I learned how to use the polygon ta and, after brainstorming what the layers would be like, set off on combining the squares into polygons. It was pretty easy but a bit cumbersome having to keep track of the coordinates, how the lines would join up, optimal shape construction, etc. I was using this [SVG Playground website](https://www.svgplayground.com/), which was nice; it has a code editor and image preview pane, which was convenient. I managed to bring down the size to 2.6 KB. This was adequate, so I used SVGOMG to convert it to paths, which more than halved its size to \~900 bytes. Afterwards I added comments to clarify which path was which part/layer in the image, which brought up the size to 1.3 KB — still more than good enough for my purposes.

A mistake I made at the start, which made the entire journey harder than it needed to be, was I made the SVG size 20x of the original pixel art. I thought it would make things easier but nope, larger numbers are more difficult to reason about; who would've thunk, eh? I did convert everything down to 20x17 px before the last optimization step though (after I converted everything to polygons). Lesson learned.

> **UPDATE**: I looked into it a bit more and realized, it wasn't entirely my fault. The [SVG pixel art editor](https://github.com/TheRealSmeddy/svg-pixel-editor) I used to generate the initial SVG used 20px squares for each "pixel". I just didn't think of changing it till I was done with the whole process.

Here's the final SVG. I'm pretty proud of it. 😁

<img src="/assets/images/watermelon.svg" title="Bleeding Watermelon" alt="pixel art of a slice of watermelon with red juice flowing out in a puddle, with a shadow behind the slice">
