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
- 4get

**PS**: Some of these depend on services like a database or cache. I mostly stuck to PostgreSQL and Valkey (a Redis fork).

## How

I will go over my thought process for everything below to follow along, but if you want to dive right into the Compose files, here they are: [github.com/cybardev/homelab](https://github.com/cybardev/homelab)

### Hardware

Didn't have much to choose from. I just had my main laptop and this, and didn't want to buy anything new (for now). I do have another old laptop with much better spec, but last I tried it didn't boot. Might try again later. For now I want to focus on low power consumption and few high-priority services, though I'm increasingly feeling the need for more available RAM.

### Operating System

Given the humble hardware, I needed to choose something extremely lightweight. I wanted to choose one of the container-based distros like OpenSUSE MicroOS, or Fedora CoreOS, but the requirements still seemed a bit above what I could offer. So I settled on Alpine Linux, which has been pretty solid. Some things are quirky, like \`doas\` instead of \`sudo\`, and the lack of \`systemd\` conveniences; but nothing showstopping.

Ideally I would like to use NixOS. That way I could deploy the services using NixOS modules, cutting out the middleman (containers). I will probably try that when I get the other laptop to work.

Alternatively, I might install Fedora Server (yes, the regular one, not CoreOS), and put Kubernetes (k3s) on top. It's likely overkill for my purposes, but I want to use this as an opportunity to learn hands-on how to provision infrastructure using Terraform, set up a production environment using Ansible, orchestrate containerized services with redundancy through replication and load-balancing using Kubernetes, all on an OS that's similar to the industry standard Red Hat Enterprise Linux (RHEL).

CoreOS would make it more convenient, but then I don't learn as much. For me, that's the fun part.

### Network Proxy

It wouldn't be too useful if I was out and about, and couldn't use my services. I needed a way to forward the active ports while not having a static IP. There's various ways of doing that: Cloudflare Tunnels, Tailscale, WireGuard, Dynamic DNS + Reverse Proxy; to name a few.

Cloudflare Tunnels is what I started with. My domain is on Cloudflare, and the web UI is very simple to use. I was all set up in a few clicks (after starting the server container in host network mode, ofc). The issue, tho, is that Cloudflare makes the services _public_. That is, anyone who knows the URL can use the service. This would not be an issue for most things due to auth, and I would actually like some services to be public use (like SearXNG). But on a 1 core CPU with <1GB RAM... it gets a bit iffy if many people try to use it simultaneously. So until I upgrade my hardware, I needed to keep my services to myself...

Enter Tailscale. Tailscale is a VPN that uses WireGuard under the hood. It basically takes the setup step out of WireGuard, providing a premade subset and/or superset of the features that works for many cases. If one needs finer control, WireGuard may be a better solution, but for my purposes this is fine (at least for now). Tailscale proxies my server's local network over the internet, through their servers, to whatever other devices are connected to the same "Tailnet", which is just their marketing term for a VPN. I use Tailscale clients on my main laptop and my phone, and only those devices (client and server both must be aithn'd to my Tailscale account) can access the URLs of my services (while connected to the VPN) that are hosted on the server. The Tailscale server software is also running as a compose container, with host-mode networking.

I could directly use WireGuard, but that would be more effort than I'm willing to invest at the moment. Same issue with DDNS and reverse proxy. I might revisit this in the future, even if at least for the sake of learning how those go.

The endgame idea I have is to rent a VPS and host Headscale there, thus having (mostly) full control of the network traffic. Headscale is... well, Tailscale's client software (even the servers are actually clients, since they connect to the Tailscale backend) is open-source; but Tailscale's backend, the parts that actually route the network traffic, is proprietary (this is my understanding; feel free to correct me), so some person/folks in the community made Headscale, which can act as that routing backend. It needs a static IP though, so a VPS would be needed, if static IP can't be acquired from the ISP. I'll see what I do when I get to it.

### Search Engine

If you've read my last post ([cybar.dev/blog/selfhost-searxng](https://cybar.dev/blog/selfhost-searxng/)), you're already familiar with what I'm doing for this. The only difference is that previously I was hosting it on my main laptop using a Home Manager Nix module, while now it's using a Docker Compose file running on the potato "server". Also wasn't using a cache previously but now there's Valkey.

I did give `4get` a try, but it seems like it's not ready for prime time yet. There's a lot of things that can't be configured declaratively and needs to be set up using cookies  on the client side through the web UI. And for some reason the Startpage backend didn't support info widgets like Wikipedia preview. It's also been similar to SearXNG in terms of memory footprint, so I'd be getting a worse experience for not much resource efficiency.

### Files, Photos, Contacts, Calendar

[Nextcloud](https://nextcloud.com/). Easy, right? Last time when I did it on the same hardware, back in 2020 or 2021, it was fine because I dedicated the whole machine to this one service. Now that I'm trying to diversify my setup, using Nextcloud is difficult on such low RAM. It alone takes between 200-600 MB of RAM (probably more), and has caused the server to freeze at least once. Funny thing is, it happened as I was editing the compose file to limit memory usage. Prophetic. Anyway, added the limits but then it got extremely slow (possibly because it started using swap. I could tell it to not use swap, but... maybe that would lead to other problems? I just did not want to keep optimizing this one thing, so I started looking for alternatives.

For Calendar and Contacts, I did not have to look far. [Radicle](https://radicale.org/v3.html) is a lightweight CalDAV and CardDAV server which was trivial to set up. File sync, though, was a different beast...

I tried to set up [OpenCloud](https://opencloud.eu/en) but the setup was a showstopper. I wanted something that would work with _mostly_ minimal effort. OpenCloud _looked_ like that's what it would be, but it was anything but. The [opencloud-compose](https://github.com/opencloud-eu/opencloud-compose) repository had way too many modules, and used subpar ways to activate the modules. After a few gruelling days of trying to set it up according to docs and debugging the endless stream of errors, I decided to move on.

I dismissed [OwnCloud](https://owncloud.com/product) as being no lighter than Nextcloud, and [OwnCloud Infinite Scale (OCIS)](https://owncloud.com/infinite-scale/) as being no less complex than OpenCloud (due to OpenCloud being based on OCIS).

Was reluctant to try [Seafile](https://www.seafile.com/en/home/) due to the hardware requirements being listed as considerably above what I had. I should probably give it a try sometime. It looks promising, and listed requirements often overestimate in favour of ensuring what the developers consider good UX.

Ended up with [Cloudreve](https://cloudreve.org/) for now, using WebDAV-compatible apps for file management and sync. It's fairly lightweight, and was absolutely trivial to set up. Caveat: the native iOS mobile app used for photos sync is not FOSS. I'll need to figure out how to sync photos to WebDAV. Or, use a "better" photo backup solution, which is what I _tried_ to opt for.

[Immich](https://immich.app/) seemed to be the most popular option for photo sync. But I recall that on their issue tracker, when encryption at rest was requested to prevent rogue server admins from accessing user photos, or the server being a point of data leak to malicious actors, the official stance was that they will not support encryption for the foreseeable future and since it's meant to be self-hosted, you would have to trust the server (since it is presumably under your control). To me, this is unacceptable, so I dismissed Immich.

Ente

### Passphrase Manager

> For why I call it "passphrase" and not "password", see the wonderful `xkcd#936` (linked below).

[![xkcd#936](<https://imgs.xkcd.com/comics/password_strength.png> "Password Strength — xkcd#936")](https://xkcd.com/936/)

Vaultwarden backend + Bitwarden client

### Git Forge

Forgejo

### Media Downloader

Cobalt

### Discord Bot

Cy | bot

## Future

Better hardware, OS, redundancy, security, etc.

![Screenshot of output from nerdctl stats, showing resource usage stats from currently running containers on my homelab setup](/assets/images/blog/mini-homelab.png "Container Resource Usage")
