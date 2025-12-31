---
draft: false
date: 2025-12-31T12:48:00
title: Self-hosting a Privacy-focused Search Engine
description: How I set up my own SearXNG instance and the user experience of self-hosted search engines
---
{% quote(author="Kevin D. Mitnick", source="The Art of Invisibility") %}
You might not have anything to hide, my friend.
But you have everything to protect.
{% end %}

It has been over 6 years since I stopped using Google as my default search engine. For a long while I was on Ecosia, and then switched to Brave Search when they launched it. After learning of the active CEO's questionable conduct, I dropped Brave (both browser and search) and started using Firefox with Startpage. Of course, I wasn't satisfied. Especially after getting a viewport full of ad results one day, I decided I had enough and that it was finally time to self-host a search engine.

Previously I tried making my own search frontend ([github.com/cybardev/search](https://github.com/cybardev/search)); while it "worked", it served a different purpose (mostly as a learning exercise on how APIs work). It wasn't much more than a Google search proxy. This time, I needed something more; something more powerful, more feature-rich. Something like... [Websurfx](https://github.com/neon-mmd/websurfx)?

When it comes to self-hosted web search engines, [SearXNG](https://github.com/searxng/searxng) is no doubt the standard. However, it's a massive piece of software with a lot more features than I need in a program to find links on the web. I wanted something a bit more lightweight, and with a bit of looking around, came across Websurfx. It's a metasearch engine like SearXNG, but it's a lot more lightweight and focused, which I appreciated. It looked like a perfect match for my use case... until I tried to use it. The setup was straightforward; I even made a home-manager module to configure it using Nix. But no matter what I tried, I could not get it to perform queries consistently. I looked up on their issue tracker, and realized it was a known issue. That in itself should not raise alarms, but the trouble was that looking at the other issues, the commit history, etc. it looked like the project was practically abandoned. I even joined the Discord community to check if there was any activity, or support to make it work, but it was a futile effort. With a sigh I concluded it was time to move on...

SearXNG seemed like the only other option left (feel free to suggest me otherwise). I gave it a trial run in an ephemeral Nix shell and was satisfied with the search experience, so I went ahead and made a [home-manager module](https://github.com/cybardev/nix-channel/blob/06247a3c9edb748dc0a27937d53ee19fc143c310/mod/searxng/default.nix) copying some aspects of the NixOS module (but a lot simpler). Did this so I could have the same setup on both Linux (NixOS or otherwise) and Darwin. Over the next month or so I tweaked my SearXNG configuration, only keeping the engines and tabs I care about. I even set up [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) through `cloudflared` so I can access it over the internet (as long as the laptop is running the service).

A few days ago I thought, it would be nice to host a public instance I can access even when the laptop is off, so I made [github.com/cybardev/searxng-instance](https://github.com/cybardev/searxng-instance). It's a set of deployment files, including a Dockerfile that uses the official SearXNG image as base with my configs injected, and a [Render Blueprint](https://render.com/docs/infrastructure-as-code) (their own IaC — infrastructure as code — solution), allowing one-click deployment of your own instance; simply click on the "Deploy to Render" button in the repository README. I also used [Render Key Value](https://render.com/docs/key-value) — a Redis-compatible Valkey instance — for cache. Though, due to using a free instance, the actual SearXNG service goes down after a while of unuse. For most people (especially those with a VPS), [SearXNG's Docker Compose files](https://github.com/searxng/searxng-docker) are recommended.

If you're privacy-conscious and are looking for an alternative search engine, give SearXNG a try and see how it goes.
