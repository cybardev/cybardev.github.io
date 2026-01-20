---
draft: true
date: 2026-01-19T16:50:00
title: Mini Homelab Self-hosting Setup
description: How I set up a homelab server on an old laptop to self-host major services
---
Over the last few weeks I set up a homelab with most of the cloud services I often use, on an old netbook that's weaker than a modern Raspberry Pi board. This post is to document how I did it, why I did it, and what's in store for the setup going forward. Feel free to follow along to set up your very own homelab server.

## Why

Privacy is an obvious point, and a common reason why people do this. For me it was a bit of that, but more so about keeping things more in my control. With tons of rugpulls all across the media and gaming industry, I just didn't want to wake up one day and find out my data is at risk of being deleted or held ransom and having to desperately scramble to move everything elsewhere in a race against time. It's just more comforting to know my stuff is physically around me, and/or even if it's (replicated) elsewhere, I'd have a copy of it. Also ended up being a nice learning experience, with lessons in container orchestration, resource management, niche Linux, and computer networking — all valuable skills, from what I've been informed.

## What

Here's the services I host/ed on my homelab. I say "host/ed" because some of them may not be there anymore because I either wanted to dedicate resources to something else, or switched to one or more alternatives (in any case, they're all listed, so you may find services with overlapping purpose).

- SearXNG
- Forgejo
- Nextcloud
- Vaultwarden
- Cloudflare Tunnels
- Cy | bot
- Cloudreve
- Radicale
- Cobalt
- Ente
- Tailscale

**PS**: Some of these depend on services like a database or cache. I mostly stuck to PostgreSQL and Valkey (a Redis fork).

## How

I will go over my thought process for everything below to follow along, but if you want to dive right into the Compose files, here they are: [github.com/cybardev/homelab](https://github.com/cybardev/homelab)

### Hardware

To start off,

![Screenshot of output from nerdctl stats, showing resource usage stats from currently running containers on my homelab setup](/assets/images/blog/mini-homelab.png "Container Resource Usage")
