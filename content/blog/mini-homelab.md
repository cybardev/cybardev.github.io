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

Didn't have much to choose from. I just had my main laptop and this, and didn't want to buy anything new (for now). I do have another old laptop with much better spec, but last I tried it didn't boot. Might try again later. For now I want to focus on low power consumption and few high-priority services, though I'm increasingly feeling the need for more available RAM.

### Operating System

Given the humble hardware, I needed to choose something extremely lightweight. I wanted to choose one of the container-based distros like OpenSUSE MicroOS, or Fedora CoreOS, but the requirements still seemed a bit above what I could offer. So I settled on Alpine Linux, which has been pretty solid. Some things are quirky, like \`doas\` instead of \`sudo\`, and the lack of \`systemd\` conveniences; but nothing showstopping.

Ideally I would like to use NixOS. That way I could deploy the services using NixOS modules, cutting out the middleman (containers). I will probably try that when I get the other laptop to work.

### Search Engine

If you've read my last post ([cybar.dev/blog/selfhost-searxng](https://cybar.dev/blog/selfhost-searxng/)), you're already familiar with what I'm doing for this. The only difference is that previously I was hosting it on my main laptop using a Home Manager Nix module, while now it's using a Docker Compose file.

![Screenshot of output from nerdctl stats, showing resource usage stats from currently running containers on my homelab setup](/assets/images/blog/mini-homelab.png "Container Resource Usage")
