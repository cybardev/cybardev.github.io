---
draft: false
date: 2026-03-21T16:00:00
title: Mini Homelab Self-hosting Setup
description: How I set up a homelab server on an old laptop to self-host major services
---

Over December 2025 I set up a homelab with most of the cloud services I often use, on an old netbook that's weaker than a modern Raspberry Pi board. Since then it has evolved a bit too. This post is to document how I did it, why I did it, and what's in store for the setup going forward. Feel free to follow along to set up your very own homelab server.

![Screenshot of output from nerdctl stats, showing resource usage stats from currently running containers on my homelab setup](/assets/images/blog/mini-homelab.png "Container Resource Usage")

## Why

Privacy is an obvious point, and a common reason why people do this. For me it was a bit of that, but more so about keeping things more in my control. With tons of rugpulls all across the media and gaming industry, I just didn't want to wake up one day and find out my data is at risk of being deleted or held ransom and having to desperately scramble to move everything elsewhere in a race against time. It's just more comforting to know my stuff is physically around me, and/or even if it's (replicated) elsewhere, I'd have a copy of it. Also ended up being a nice learning experience, with lessons in container orchestration, resource management, niche Linux, and computer networking — all valuable skills, from what I've been informed.

## What

Here's the services I host/ed on my homelab. I say "host/ed" because some of them may not be there anymore because I either wanted to dedicate resources to something else, or switched to one or more alternatives (in any case, they're all listed, so you may find services with overlapping purpose).

- [SearXNG](https://github.com/searxng/searxng)
- [Forgejo](https://forgejo.org/)
- [Nextcloud](https://nextcloud.com/)
- [Vaultwarden](https://github.com/dani-garcia/vaultwarden)
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)
- [Cy | bot](https://github.com/cybardev/cybarbot)
- [Cloudreve](https://cloudreve.org/)
- [Radicale](https://radicale.org/v3.html)
- [Cobalt](https://github.com/imputnet/cobalt)
- [Ente](https://ente.io/)
- [Tailscale](https://tailscale.com/)
- [4get](https://4get.ca/)
- [Glances](https://github.com/nicolargo/glances)

**PS**: Some of these depend on services like a database or cache. I mostly stuck to [PostgreSQL](https://www.postgresql.org/) and [Valkey](https://valkey.io/) (a Redis fork).

## How

I will go over my thought process for how I selected which services to use, but if you want to dive right into the Compose files and guidance on how to set them up for yourself, here's the repository: [github.com/cybardev/homelab](https://github.com/cybardev/homelab)

### Hardware

Didn't have much to choose from. I just had my main laptop and this, and didn't want to buy anything new (for now). I do have another old laptop with much better spec, but last I tried it didn't boot. Might try again later. For now I want to focus on low power consumption and few high-priority services, though I'm increasingly feeling the need for more available RAM.

### Operating System

Given the humble hardware, I needed to choose something extremely lightweight. I wanted to choose one of the container-based distros like [OpenSUSE MicroOS](https://microos.opensuse.org/), or [Fedora CoreOS](https://fedoraproject.org/coreos/), but the requirements still seemed a bit above what I could offer. So I settled on [Alpine Linux](https://www.alpinelinux.org/), which has been pretty solid. Some things are quirky, like `doas` instead of `sudo`, and the lack of `systemd` conveniences; but nothing showstopping.

Ideally I would like to use [NixOS](https://nixos.org/). That way I could deploy the services using NixOS modules, cutting out the middleman (containers). I will probably try that when I get the other laptop to work.

Alternatively, I might install [Fedora Server](https://fedoraproject.org/server/) (yes, the regular one, not CoreOS) or [Rocky Linux](https://rockylinux.org/) or [AlmaLinux](https://almalinux.org/), and put [Kubernetes (kind)](https://kind.sigs.k8s.io/) on top. It's likely overkill for my purposes, but I want to use this as an opportunity to learn hands-on how to provision infrastructure using [Terraform](https://developer.hashicorp.com/terraform/tutorials/kubernetes/kubernetes-provider), set up a production environment using [Ansible](https://github.com/ansible/ansible), orchestrate containerized services with redundancy through replication and load-balancing using Kubernetes, all on an OS that's similar to the industry standard [Red Hat Enterprise Linux (RHEL)](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux).

CoreOS would make it more convenient, but then I don't learn as much. For me, that's the fun part.

### Network Proxy

It wouldn't be too useful if I was out and about, and couldn't use my services. I needed a way to forward the active ports while not having a static IP. There's various ways of doing that: Cloudflare Tunnel, Tailscale, WireGuard, Dynamic DNS + Reverse Proxy (like [nginx](https://nginx.org/en/)); to name a few.

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) is what I started with. My domain is on Cloudflare, and the web UI is very simple to use. I was all set up in a few clicks (after starting the server container in host network mode, ofc). The issue, tho, is that Cloudflare makes the services _public_. That is, anyone who knows the URL can use the service. This would not be an issue for most things due to auth, and I would actually like some services to be public use (like SearXNG). But on a 1 core CPU with <1GB RAM... it gets a bit iffy if many people try to use it simultaneously. So until I upgrade my hardware, I needed to keep my services to myself...

Enter [Tailscale](https://tailscale.com/). Tailscale is a VPN that uses WireGuard under the hood. It basically takes the setup step out of [WireGuard](https://www.wireguard.com/), providing a premade subset and/or superset of the features that works for many cases. If one needs finer control, WireGuard may be a better solution, but for my purposes this is fine (at least for now). Tailscale proxies my server's local network over the internet, through their servers, to whatever other devices are connected to the same "Tailnet", which is just their marketing term for a VPN. I use Tailscale clients on my main laptop and my phone, and only those devices (client and server both must be aithn'd to my Tailscale account) can access the URLs of my services (while connected to the VPN) that are hosted on the server. The Tailscale server software is also running as a compose container, with host-mode networking.

I could directly use WireGuard, but that would be more effort than I'm willing to invest at the moment. Same issue with DDNS and reverse proxy. I might revisit this in the future, even if at least for the sake of learning how those go.

The endgame idea I have is to rent a VPS and host [Headscale](https://github.com/juanfont/headscale) there, thus having (mostly) full control of the network traffic. Headscale is... well, Tailscale's client software (even the servers are actually clients, since they connect to the Tailscale backend) is open-source; but Tailscale's backend, the parts that actually route the network traffic, is proprietary (this is my understanding; feel free to correct me), so some person/folks in the community made Headscale, which can act as that routing backend. It needs a static IP though, so a VPS would be needed, if static IP can't be acquired from the ISP. I'll see what I do when I get to it.

### Search Engine

If you've read my last post ([cybar.dev/blog/selfhost-searxng](https://cybar.dev/blog/selfhost-searxng/)), you're already familiar with what I'm doing for this. The only difference is that previously I was hosting it on my main laptop using a Home Manager Nix module, while now it's using a Docker Compose file running on the potato "server". Also wasn't using a cache previously but now there's Valkey.

I did give [4get](https://4get.ca/) a try, but it seems like it's not ready for prime time yet. There's a lot of things that can't be configured declaratively and needs to be set up using cookies  on the client side through the web UI. And for some reason the Startpage backend didn't support info widgets like Wikipedia preview. It's also been similar to SearXNG in terms of memory footprint, so I'd be getting a worse experience for not much resource efficiency.

Very recently I came across [OmniSearch](https://git.bwaaa.monster/omnisearch/about/) (they need better SEO...). While I haven't tried it yet, it appears promising and I will try setting it up sometime soon and update in a separate post.

### Files, Photos, Contacts, Calendar

[Nextcloud](https://nextcloud.com/). Easy, right? Last time when I did it on the same hardware, back in 2020 or 2021, it was fine because I dedicated the whole machine to this one service. Now that I'm trying to diversify my setup, using Nextcloud is difficult on such low RAM. It alone takes between 200-600 MB of RAM (probably more), and has caused the server to freeze at least once. Funny thing is, it happened as I was editing the compose file to limit memory usage. Prophetic. Anyway, added the limits but then it got extremely slow (possibly because it started using swap. I could tell it to not use swap, but... maybe that would lead to other problems? I just did not want to keep optimizing this one thing, so I started looking for alternatives.

For Calendar and Contacts, I did not have to look far. [Radicle](https://radicale.org/v3.html) is a lightweight CalDAV and CardDAV server which was trivial to set up. File sync, though, was a different beast...

I tried to set up [OpenCloud](https://opencloud.eu/en) but the setup was a showstopper. I wanted something that would work with _mostly_ minimal effort. OpenCloud _looked_ like that's what it would be, but it was anything but. The [opencloud-compose](https://github.com/opencloud-eu/opencloud-compose) repository had way too many modules, and used subpar ways to activate the modules. After a few gruelling days of trying to set it up according to docs and debugging the endless stream of errors, I decided to move on.

I dismissed [OwnCloud](https://owncloud.com/product) as being no lighter than Nextcloud, and [OwnCloud Infinite Scale (OCIS)](https://owncloud.com/infinite-scale/) as being no less complex than OpenCloud (due to OpenCloud being based on OCIS).

Was reluctant to try [Seafile](https://www.seafile.com/en/home/) due to the hardware requirements being listed as considerably above what I had. I should probably give it a try sometime. It looks promising, and listed requirements often overestimate in favour of ensuring what the developers consider good UX.

Ended up with [Cloudreve](https://cloudreve.org/) for now, using WebDAV-compatible apps for file management and sync. It's fairly lightweight, and was absolutely trivial to set up. Caveat: the native iOS mobile app used for photos sync is not FOSS. I'll need to figure out how to sync photos to WebDAV. Or, use a "better" photo backup solution, which is what I _tried_ to opt for.

[Immich](https://immich.app/) seemed to be the most popular option for photo sync. But I recall that on their issue tracker, when encryption at rest was requested to prevent rogue server admins from accessing user photos, or the server being a point of data leak to malicious actors, the official stance was that they will not support encryption for the foreseeable future and since it's meant to be self-hosted, you would have to trust the server (since it is presumably under your control). To me, this is unacceptable, so I dismissed Immich.

[Ente](https://ente.io/) felt like a better solution for my needs. I came across it from a post by [Steven Deobald](https://deobald.ca/), an acquaintance from [HaliHax](https://www.halihax.com/), a local dev group. It's Free and Open-Source Software, is fully self-hostable, and has End-to-End Encryption (E2EE). Fantastic. Except... it uses MinIO (which is now deprecated), and trying to use a different S3-compatible storage backend has been... challenging, to say the least. Last I tried [Garage](https://garagehq.deuxfleurs.fr/) but I just couldn't get everything to work well together. I got uploads to work on the web for a bit, but not on mobile; then it stopped working on web too. For now I am focusing on other things but I intend to get back to it. Hopefully by then there will be official Ente docs and a Docker Compose file for setting up Ente with Garage or some other MinIO alternative.

### Passphrase Manager

> For why I call it "passphrase" and not "password", see the wonderful `xkcd#936` (linked below).

[![xkcd#936](<https://imgs.xkcd.com/comics/password_strength.png> "Password Strength — xkcd#936")](https://xkcd.com/936/)

[Bitwarden](https://bitwarden.com/) seems to be the most popular in this area so I went with that, except on the backend I use [Vaultwarden](https://github.com/dani-garcia/vaultwarden) because it has some extra features, and more importantly, consumes significantly less resources (from what I've read online) due to being (re)written in Rust.

The experience has been great so far. The autofill works well, sync works well, the setup was simple and smooth. Not much to say.

Passphrases, passkeys, and MFA are some of the most important things to secure, so having them self-hosted with tunnelled internet access has been a great relief. I was using Apple Passwords before and now I'm quite happy with Bitwarden/Vaultwarden, and I highly recommend it to anyone looking to increase protections for their most important secrets.

### Git Remote

[Forgejo](https://forgejo.org/) is the standard Git remote frontend most people use. There is also [`cgit`](https://git.zx2c4.com/cgit/about/) but it's a bit too barebones for me; I prefer a more GitHub-like experience. Hosting it has given me no issues, but the reason I decided to put it on hold for now is the effort required to move everything from GitHub to Forgejo, the visibility that GitHub provides (which I intend to remedy by setting up mirrors, but again, more effort), and most importantly, the resource limits of my humble hardware. I feel like once I upgrade my hosting computer, I can feel more confident putting more demanding services on it. For now the config is there but commented out (thus deactivated) for my homelab. I did give it a try though, and it worked fine. I'm looking forward to when I can commit to hosting it again.

### Media Downloader

[Cobalt](https://github.com/imputnet/cobalt) is a self-hostable media downloader for sites like Twitter, Reddit, YouTube, etc. Easy to self-host, given the provided Compose file and detailed instructions. Oddly only the backend is self-hostable (for now). The frontend you would use the "official" one and input your backend's URL in the settings page. I find this setup to be a bit awkward and would've preferred hosting my own frontend, but it is what it is; life doesn't always go our way and that's okay.

### Discord Bot

[Cy | bot](https://github.com/cybardev/cybarbot) is a Discord bot I made for some simple tasks like sending a message from the bot, searching YouTube videos, creating formatted timestamps, etc. using [Pycord](https://pycord.dev/) when I wanted to learn how to make Discord bots. It was a fun and easy process, especially given how good the Pycord documentation is, as well as their helpful community Discord. It's very easy to self-host too, which is to just run an executable as a service. I containerized it and added it as a Compose file to my homelab, and it has been working great.

### Monitoring

At first I thought of using the usual [Prometheus](https://prometheus.io/), [Grafana](https://grafana.com/), etc. stack to learn their usage in a hands-on environment, but after reading online about the hardware requirements, I decided against it. After looking at bit more I came across [Glances](https://github.com/nicolargo/glances). Imagine htop but with a web UI — that's Glances.

There's a lot of data streams enabled by default which I disabled. I mostly just care about resource usage and alerts if it crosses a threshold, and seeing which programs are causing the high consumption. It's been a solid experience, being able to monitor my homelab from anywhere without blowing up the hardware.

## Future

Some of the things on my to-do list for the homelab setup are:

**Better hardware**: I want to host more services, more reliably, which would need a more powerful server. Maybe if I get a new main laptop, I'll use my current M1 MacBook Air as a server. That would also allow me to host LLMs (using something like [LM Studio](https://lmstudio.ai/), unless [Ollama](https://ollama.com/) gets [MLX support](https://github.com/ollama/ollama/issues/1730) by then), which may be convenient.

**OS**: if I use the MacBook I'll just use macOS with Docker/[Podman](https://podman.io/)/[containerd](https://containerd.io/) on top, but if I get a PC server, I might try something like NixOS, AlmaLinux,  Fedora CoreOS, or even [Proxmox VE](https://proxmox.com/en/products/proxmox-virtual-environment/overview).

**Redundancy**: on better hardware I could also have replicas, especially if I have a multi-server setup or a VPS along with my current server. Even if the services are not redundant, I would at least like the data to be backed up in multiple places. I want to look into Kubernetes too, when I get to the point o increasing the reliability of my server.

**Security**: I should be using full-disk encryption but I currently am not, which means if someone breaks into my room and yanks the homelab (which is just a little 11" laptop) and scrams with it in tow, they can access all the data directly off the SSD since it's not encrypted at rest. While my threat model is not so high that I am at a high risk of this happening, the chance is always there and it's best to prepare for such scenarios. I intend to do that, also on better hardware.

**And more**: I am constantly learning, so there may be more things I want to consider changing as my knowledge grows. Stay tuned\~
