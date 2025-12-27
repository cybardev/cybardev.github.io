---
draft: true
date: 2025-12-27T14:40:00
title: Self-hosting a Privacy-focused Search Engine
description: How I set up my own SearXNG instance and the user experience of self-hosted search engines
---
It has been over 6 years since I stopped using Google as my default search engine. For a long while I was on Ecosia, and then switched to Brave Search when they launched it. After learning of the CEO's bigotry, I dropped Brave (both browser and search) and started using Firefox with Startpage. Of course, I wasn't satisfied. Especially after getting a viewport full of ad results one day, I decided I had enough and that it was finally time to self-host a search engine.

Previously I tried making my own search frontend; while it "worked", it served a different purpose (mostly as a learning exercise on how APIs work). It wasn't much more than a Google search proxy. This time, I needed something more; something more powerful, more feature-rich. Something like... Websurfx?

When it comes to self-hosted web search engines, SearXNG is no doubt the standard. However, it's a massive piece of software with a lot more features than I need in a software to find links on the web. I wanted something a bit more lightweight, and with a bit of looking around, came across Websurfx. It's a metasearch engine like SearXNG, but it's a lot more lightweight and focused, which I appreciated. It looked like a perfect match for my use case... until I tried to use it. The setup was straightforward; I even made a home-manager module to configure it using Nix. But no matter what I tried, I could not get it to perform queries consistently. I looked up on their issue tracker, and realized it was a known issue. That in itself should not raise alarms, but the trouble was that looking at the other issues, the commit history, etc. it looked like the project was practically abandoned. I even joined the Discord community to check if there was any activity, or support to make it work, but it was a futile effort. With a sigh I concluded it was time to move on...
