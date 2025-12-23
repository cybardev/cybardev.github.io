---
draft: false
date: 2025-12-23T16:44:00
title: Celebrating My First Nixversary
description: What a year of Nix, Nixpkgs, Flakes, and Home-Manager has been for me
---
Earlier this month I crossed the 1 year mark since I started using Nix in some way or other, and I wanted to take a moment to reflect and appreciate what a positive experience it has been. What started off as a little curiosity has now become a lifeline — a tool that actively boosts my productivity, and allows me to focus on what’s important. It’s also been impactful in helping me understand how my system works, and cutting down unnecessary bloat.

On Linux land, I was used to doing `apt install` or `pacman -Syy` commands for package management. Since getting a Mac that changed to `brew install`, but the flow remained the same — and so did the drawbacks. Run a command, install software, if you don’t use it then forget it exists. The more software you install, the harder it gets to prune. You start hoarding packages like paper rolls during COVID. Mid-to-late 2024 I was looking for ways to lighten up my Mac, after several system warnings about my measly 256GB of storage filling up. Nix promised a solution — declarative configs; you know exactly what’s installed, and installing new programs requires you to type it out so you have time to reconsider if you really need it. I was sold.

> Here, a little Nix primer may be appropriate for readers unfamiliar with its ecosystem. Nix is not a single software but a variety of interconnected things. There’s Nix the functional programming language, for Nix the declarative package manager, around which NixOS the Linux distribution was built. For macOS there’s Nix-Darwin and community projects like Nix-Homebrew. For user configuration management there’s Home Manager. And to make it more confusing than it already is, there’s two paradigms of package management via Nix — channels and flakes. Flakes use lockfiles to pin versions, while channels does no such thing — you either accept the lack of full reproducibility, or use community-supported version pinning systems like npins. Flake has its own drawbacks, like copying the entire source tree to the Nix Store every time. And yes, Nix Store is another Nix thing; it’s the volume where Nix stores its artifacts (software, configs, etc.), which is different from the Filesystem Hierarchy Standard (FHS) we see in most other forms of package management. Now back to my Nix journey.

First I wanted to gently test the waters, so I tried installing NixOS on my Surface Laptop (yeah, the first one, which needs a custom kernel built from source for all the components to work under Linux; and this one had a dead SSD and only one USB type-A port so I had to use a dongle to connect the installation drive and the USB drive that'd act as root; way to test the waters, I know). I could not for the life of me get manual installation to work, at least not through the minimal ISO (did not try with graphical ISO). Downloaded the graphical ISO and booted up Calamares (I later found out I could try manual install through graphical ISO; didn't occur to me back then but seems obvious now that I think about it). GUI install went fine and I was on a fresh XFCE installation. Splendid. As I usually do, I swapped out XFWM for BSPWM, since I prefer automatic BSP tiling. Took me some weeks to get it configured exactly how I wanted, with all the software I used. Set up Home Manager, which is a way to manage dotfiles and user services in Nix. And all this I did with the peace of mind that once I have my config ready, I could just run a `git clone` on my Mac and have it there too (of course I VCS'd my nixos config; one should always VCS anything they care for). Until now I didn't put Nix on my Mac because I had Global Game Jam 2025 coming up and didn't want to risk it. Once that was taken care of, it was time to let the floodgates open.

I factory reset my MacBook, after backing up important data, and downloaded Nix. The rest of the year has been an exhilarating blur of learn new aspects of Nix, getting more familiar with the philosophy, engaging with the community, and tweaking my configs. You can see everything that happened in the following two repositories:

- `nix-dotfiles` ([github.com/cybardev/nix-dotfiles](https://github.com/cybardev/nix-dotfiles)): my NixOS and Nix-Darwin configurations
- `nix-channel` ([github.com/cybardev/nix-channel](https://github.com/cybardev/nix-channel)): my personal package/module repository

Other than that, here's a quick rundown of the highlight of my Nix journey:

- Became the maintainer of Meta’s Pyrefly (Python type checker and LSP) package on Nixpkgs.
- Made PR (awaiting review) to add and maintain Huggingface’s Git-Xet package.
- Crafted a multi-machine, multi-platform config with shared modules.
- Maintaining a personal Nix package and module set for stuff I find interesting but don’t quite want to commit to maintaining in upstream Nixpkgs.

That's the gist of it for now. I've been absolutely loving the Nix experience to the point where I don't see myself mov away from it anytime soon. If Asahi Linux supported display out over type-C, I'd love to run full-blown NixOS on my Mac. Till then, Nix-Darwin, Home Manager, and DevShells have me covered.

In later posts I will cover the "tricky" bits of Nix and its ecosystem, such as Flakes, Home Manager, the Module System, DevShells, and more. Stay tuned\~
