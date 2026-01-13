---
draft: false
title: Year So Far — Part 3
date: 2025-08-03T19:48:00-03:00
description: What I’ve been doing for the first half of 2025 — Part 3
---

## What’s this about?

Oftentimes I get so immersed in what I do, one thing after the other, I forget to take a step back and notice what I’ve accomplished. It’s important to do this from time to time, so when I feel down about not doing enough in moments of downtime, I have something to look at and go, “No, I am doing my best.”

This is one such list, for what I’ve been up to this year till now. Here’s a glimpse into the life of Sheikh, halfway through 2025.

## The List, continued...

_[Part 3 of 3]_

### Packaging Meta’s Pyrefly for Nixpkgs

End of May I came across [Meta’s new Python type checker and LSP — Pyrefly](https://engineering.fb.com/2025/05/15/developer-tools/introducing-pyrefly-a-new-type-checker-and-ide-experience-for-python/). By now I’ve been deep down the Nix rabbit hole, and realized there’s no Pyrefly package on nixpkgs, so if I wanted to use it through Nix, I’d have to package it myself. After making a package request issue on nixpkgs thinking that it was beyond my skills (having zero Rust experience), I suddenly felt adventurous and started working on it anyway, making a draft PR. With substantial help from the wonderful community on the (unofficial) Nix/OS Discord, I made significant progress. Then suddenly someone in the Discord said they have been using a custom package for a while, and theirs looked cleaner than what I had. So we chatted and agreed to co-author and co-maintain the package. I opened the PR ([NixOS/nixpkgs#412863](https://github.com/NixOS/nixpkgs/pull/412863)) and, after some code review and improvements, it got merged. This was my biggest PR so far, and first time contributing to such a large open source project used by thousands of people. I learned a lot from this experience; most notably, `git rebase --interactive`, mainly relying on this wonderful Atlassian article: [git rebase | Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)

I also got the chance to speak with the Pyrefly team on Discord, and they were very helpful and cooperative during the packaging process. The tool has been working out great for me so far, but it's still alpha software, so there's a lot more to come; most notably, the LSP server is lacking a few features, and they rely on rust nightly, which is a big no-no for packaging for both nixpkgs and homebrew. We had to use a hacky workaround, setting the environment variable `RUSTC_BOOTSTRAP` to `1` to get it to work on stable rust. They're working on it though, so hopefully it'll be ready soon. One of the team members also sent me some cool Pyrefly merch, (stickers and screen wipe pictured below, and a t-shirt of my size they asked by email), so that was really cool. Perks of contributing to open source.

![pyrefly merch](/assets/images/blog/pyrefly-merch.jpg)

### ShiftKey Algorithms and Leetcode

Once a week through June, I attended the Intro to Algorithmic Problem Solving course by ShiftKey at Dalhousie. It was taught by Yuhan Fu, an MCS Graduate from Dalhousie and also a TA there. She also has experience in research on Optimization Algorithms, participated and won multiple hackathons, and volunteering as a full-stack developer. On another side, she runs a K-pop dance cover team and teaches K-pop dance classes. With such a multi-talented teacher at the helm, classes were bound to be interesting. Topics we went through included Fundamental Data Structures and Complexity Analysis, Sorting and Recursion, Searching and Graphs, and Greedy and Dynamic Programming. I honestly learned a lot. Got (somewhat) over my distaste of Leetcode. Had fun with solving problems, and finally understood why so many people live by it. It is, however, not my path, since I got so burnt out by the end of it, I ended up not taking the exam, so I didn’t get the certificate from this course. This is the farthest I have gotten with algorithms though, so big respect to Yuhan and ShiftKey for helping me get through it.

I wish Leetcode questions focused more on realistic scenarios instead of fantasy situations. For me, it is difficult to feel interested in things I don’t see the point of, especially if that thing requires high mental effort. I recently did a coding assessment for a company where the questions were similar to actual work one would do. One question required me to parse a Google Doc from a given URL and perform data manipulation operations on an embedded table using the `pandas` Python library, then printing human-readable information to standard output. If DSA is so crucial for jobs, they should design questions that give us a glimpse of how these DSA could be used at work.

### Personal Website with semantic HTML

End of June, I decided to remake my website. Previously I was using a pre-made template for Hugo, but the template has been unmaintained since 2021. I wanted to make my site using pure HTML/CSS as much as possible, ensuring full functionality even with JavaScript disabled. I did that, and learned a lot about CSS animations, media queries, and used semantic HTML for the structure. At first I thought to just not have a blog on there, but while going through the other websites in the web ring I joined ([nixwebr.ing](https://nixwebr.ing)), I came across Zola, which is a much more minimal static site generator than Hugo, so I reconsidered using it to add back the blog. Did that ([cybar.dev/blog](https://cybar.dev/blog/), which you are now reading), and as a bonus added a gallery section too ([cybar.dev/gallery](https://cybar.dev/gallery/)); it now shows some of my favourite artwork (pixel art) right on my website. It wasn’t much work to break up the HTML file to match the Zola template structure, and ultimately the served files are still just HTML and CSS for the most part. JS is only used to detect and store dark/light theme preference. Overall, I’m quite satisfied with how it turned out. I especially like the breathing “bar” on the homepage; even use it to time breathing exercises sometimes, which is fun.
