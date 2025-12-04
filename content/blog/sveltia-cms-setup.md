---
draft: true
date: 2025-12-04T15:35:00
title: My New CMS Setup
description: How a new CMS led me to enjoy writing on my blog
---
When I was still using [Hugo](https://gohugo.io) for my website, I had set up Netlify CMS (and then moved to [Decap](https://decapcms.org) when they changed the name), thinking it would help me write blogs more smoothly. And sure, the process was less cumbersome than opening up my local repository, firing up a code editor, writing some markdown, and going through the Git flow. But something just didn't stick, and I ended up doing that cumbersome process anyway instead of using the CMS. Soon after, I stopped posting altogether. Not surprising.

This year, when I moved my site to [Zola](https://www.getzola.org) with a custom template, I thought I wouldn't add a CMS, given my lackluster experience with them in the past. Recently though, I found myself writing (and wanting to write) more and more blog posts. Thanks to that, my flow of writing things in Apple Notes, copy-pasting to code editor, then pushing to Git was getting rather tedious and boring. I was on the lookout for a headless Git-based CMS that would reduce the friction — especially on mobile.

For starters, I went back to Decap. I set it up with a [Cloudflare Worker OAuth proxy](https://github.com/sterlingwes/decap-proxy) for authentication, so everything remains in my control (at no extra cost). It "worked", but the mobile experience was as bad as it was the last time I checked (about 2 years ago). I kept looking for a better solution.

Enter [Sveltia CMS](https://github.com/sveltia/sveltia-cms). This looked rather promising, but for some reason I was hesitant. That is, until [they tagged me on Bluesky](https://bsky.app/profile/did:plc:koqqgbhi3dvmcp2jyzfo7x3c/post/3m6xbitvxa52v) asking me to give it a try. I'll be honest, I was initially taken aback by the overeager marketing, but the "Made in Canada 🇨🇦" hook softened me a bit. I looked into it further and decided to give it a try. It was mostly [a one line change](https://github.com/cybardev/cybardev.github.io/commit/47a850404073d6a155488e19ea9084b214450175), with some extra conveniences added on top. I pushed my changes, waited for CI to rebuild and publish, then visited the admin URL. What used to look like an outdated login screen from 2015, now looked… white? I was greeted with a fully blank screen. That's not a good sign…

I scurried to the issue tracker for Sveltia, hoping to find a solution, in case I wasn't alone. Unfortunately (or maybe it is fortunate that people didn't have to deal with it), no one else raised the issue. But before opening an issue, I wanted to confirm that it wasn't my fault — that I wasn't just using a broken config or something. So I headed to their [GitHub Discussions](https://github.com/sveltia/sveltia-cms/discussions/552) and asked what may be causing this blank screen. Within the next 40 minutes, the lead developer of the project had a look, figured out the issue, suggested a solution, and improved on his suggestion. Amazing support.

The issue was Cloudflare's Rocket Loader, which I had to disable for the CMS script. Once that was done, I had a beautiful login flow, and elegant CMS interface that looked great on both desktop and mobile. I was thoroughly impressed and satisfied with the switch.

Now, more than ever before, I feel inspired to write on my blog. Thanks Sveltia, for bringing back the joy in writing.

<img src="/_assets/images/blog/sveltia-cms-mobile.jpeg" title="Sveltia CMS on mobile" alt="screenshot of Sveltia CMS dashboard showing my blog posts" class="mobile-ss" />
