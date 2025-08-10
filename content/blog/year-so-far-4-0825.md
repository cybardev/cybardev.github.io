---
title: Year So Far — Part 4
date: 2025-08-11T11:30:00-03:00
description: What I’ve been doing for the first half of 2025 — Bonus Issue
draft: true
---

## What’s this about?

Oftentimes I get so immersed in what I do, one thing after the other, I forget to take a step back and notice what I’ve accomplished. It’s important to do this from time to time, so when I feel down about not doing enough in moments of downtime, I have something to look at and go, “No, I am doing my best.”

This is one such list, for what I’ve been up to this year till now. Here’s a glimpse into the life of Sheikh, halfway through 2025.

## The List, continued...

_[Bonus Part]_

## Honourable Mentions

Here are some things I did this year, but either don’t have much to talk about, or have moved on from. Regardless, the experiences I got from working on them have become a part of me, and I learned a lot, so I wanted to at least mention them.

### HabitMap

Wanted to make a habit tracker app with a heatmap calendar similar to the GitHub commit chart. Started making it in Flutter because I wanted to learn it, and I did make some good progress. A few weeks in though, I came to know about [HabitKit](https://www.habitkit.app/) from a YouTube video. It looked like exactly what I wanted, so I stopped working on my project in favour of it. It wasn’t a waste though, as now I have some exposure to Flutter and understand the basics of how it works.

### Resumake

A long-running project that has served me well. It was a resume generator, first made in Python, and later translated to Go, containerized, published using GitHub Actions CI/CD workflow. Learned a lot making it, and got to use it for over 2 years to make my resumes, getting me two co-ops and a part-time job. Recently though, I got to know about [Typst](https://typst.app/) — a LaTeX alternative that actually makes sense. The syntax lies somewhere between LaTeX and Markdown, so it’s the perfect mix of ease and power. Using it going forward for writing my resumes, cover letters, and any other PDF documents.

### Learning OpenTofu/Terraform from The Linux Foundation

I’m quite interested in DevOps, SRE, Platform Engineering, etc. and one major aspect of it is managing infrastructure as code through technologies like Terraform. It’s always been sort of a “black box” to me; I understood what it did and what it’s used for, but wasn’t sure how to get started with it. While looking up resources on it, I came across this certificate program from The Linux Foundation on OpenTofu — the Free and Open-source fork of Terraform. Best part? It’s free and takes only an hour. Did that, then took the exam while waiting for the bus. The course content was pretty nice and clear. Concise, but covering all the important points. Really helped me demystify the technology, and I was able to implement it for a real project (the Graphite image editor, mentioned a bit below). Definitely recommend the course if anyone else wants a quick start guide for Terraform/OpenTofu: [Getting Started with OpenTofu (LFEL1009) — The Linux Foundation](https://training.linuxfoundation.org/express-learning/getting-started-with-opentofu-lfel1009/)

### Packaging Meta’s Pyrefly in a Homebrew Tap

Similar to the nixpkgs, I wanted to learn how to package software for [Homebrew](https://brew.sh) — a package manager (previously for macOS, but it’s available on Linux too now). Since I already had experience packaging Pyrefly, I thought this would be a nice complement. Followed the official documentation and ended up making this “Tap”, which is basically just a personal package repository for Homebrew: https://github.com/cybardev/homebrew-tap

### Deploy Personal Instance of Graphite

[Graphite](https://github.com/GraphiteEditor/Graphite) is a fantastic Free and Open-source graphic editor that handles _both_ raster and vector graphics. I now prefer it over GIMP and Inkscape. It’s still in its early days, but already usable for all my needs. It is a webapp, so it doesn’t need to be installed locally, but it’s static, so all the processing is done client-side (even restoring previous sessions work using browser cache) — no account needed. Had to deploy it somewhere, so I chose Render. Tried to use OpenTofu and almost got it working, but then was hit with “you need a paid Render subscription” for Terraform deployments, so I just used Render Blueprint — their own infrastructure-as-code (IaC) solution, which is available on free tier too. It’s up now at https://gfx.cybar.dev (cold start, so probably have to wait a bit).

### HaliHax/Collect. `#side-projects` Meetup

Every Monday evening I meet up with folks from a local developer group called [HaliHax](https://www.halihax.com/) for a few hours of coding. Think of it like [“parallel play”](https://en.m.wikipedia.org/wiki/Parallel_play) but for adults coding. This kind of environment helps me focus and provides a sense of accountability; really nice to get work done, be it serious stuff, or just some new exploration. Sandy Walsh is the host, but takes a break from it every summer. I still wanted to continue, so every Monday I ping the channel to gather anyone who’s interested. We meet at the same bar and get cracking. Recently, Sandy’s side-projects has rebranded to be a part of the [Collect. community](https://www.collecthalifax.org/), which is nice. Now it’s called Collect. Mondays.

### Miscellaneous

Changed the following tools and technologies:
- GUI editor: VS Code —> Zed
- TUI editor: Neovim —> Helix (evil-helix)
- Git client: gitui —> lazygit
- File Manager: yazi —> lf
- Shell: zsh —> fish

Something major I did near the start of the year is started using Nix for package management, configuration management, locally running services, and development environments. It has been a life changing experience, but I want to dive deeper into it, so I’ll leave it for another blog post.

## And More to Come…

That’s all for what I did so far. As for what’s next…

I’m currently learning Rust, to try to understand what has made it “the most loved language” for about a decade ([StackOverflow Developer Survey](https://survey.stackoverflow.co/2025/technology#admired-and-desired-language-desire-admire)). Might do a project, or translate one of my older ones. If I like it, I’d like to try making some FOSS contributions with it.

I’ve also been learning Go (the board game now, I’m already a bit familiar with the language). The interest arose after having seen it in a few wuxia manhuas (Chinese comics of the martial fantasy genre). It’s a really deep and fascinating game, whose simple rules hide a much more complex story. While it’s been more frustrating than fun (due to skill issue) so far, I’m looking forward to diving deeper into this super-interesting ancient strategy game that’s survived for millennia.

**Bonus**: A friend of mine suggested the anime (Japanese animation) Hikaru no Go, which is all about the board game and apparently helpful for learning some of the foundations. Will hopefully watch it throughout this September.

Sometime soon I’ll get back to my Game Jam game and make a release for Bubble Blaster DX. Just need to polish the existing mechanics and see how I can add to the gameplay experience without diverging from the original vision.

With this series, I’m trying to get back to blogging, so will try to post every now and then. Writing down ideas helps consolidate learning, so looking forward to it. Hope you all enjoy reading these as much as I do writing. If you have any questions, ideas, suggestions, or just want to chat, feel free to reach out on my LinkedIn ([linkedin.com/in/cybardev](https://www.linkedin.com/in/cybardev)) or send me an email at [sheikh@cybar.dev](mailto:sheikh@cybar.dev)

And, having graduated, I am now on the lookout for a new role. If you or anyone you know is looking for an ever-growing and curious soul who loves learning, exploring, and solving problems, let’s connect — I’d love to hear from you.