---
draft: false
title: How I “Deploy” My Resume
date: 2025-11-23T23:20:32-04:00
description: Behind the scenes of how my resume website works
---

I briefly went over how I generate my resume in my last blog post [Year So Far — Bonus](https://cybar.dev/blog/year-so-far-4-0825/#resumake). Here I want to expand on it and describe how I publish my resume on my website for easier sharing.

## What

Recently I switched from a custom resume builder ([github.com/cybardev/resumake](https://github.com/cybardev/resumake)) to Typst for building my resume. This allowed me to focus on my resume instead of having to maintain a program/module alongside it. After all, the best solutions are the simplest.

With my previous solution, I generated a PDF resume and published it on a GitHub Pages website. I set up a similar (but of course much simpler) workflow for the new Typst resumes. Previously I also had only one resume at a time, but this time I wanted some more flexibility, so now I publish multiple resumes — one for each type of role I target.

## How

I wanted to learn Typst starting from the basics, so instead of using an off-the-shelf Typst resume template, I decided to make my own. It wasn’t that difficult, actually; much easier than it would be with LaTeX, and a lot more manageable than Markdown + CSS. It’s available at [github.com/cybardev/resume-template-typst](https://github.com/cybardev/resume-template-typst) with an MIT license. There’s a function for each element, like header, project, experience, education, etc. and they can be organized into sections easily with some basic Typst. There’s a helper function to compose the whole resume, but it has a specific layout that not everyone might like.

After writing my resume using the above template, I set up my editors to automatically generate PDF previews on save, and for a while I used the PDFs generated this way for job applications. That was fine, but I still wanted to have a public link I could share around and put on my social profiles. So, I set out to create a GitHub Actions workflow to deploy it to a GitHub Pages website, like how its predecessor Resumake had. You can see the workflow file by clicking [this link](https://github.com/cybardev/resume-template-typst/blob/main/.github/workflows/publish.yml). It generates a resume from each `*.typ` file in the `src/` directory with a filename like `Resume_Sheikh_Saad_Abdullah_(${1}).pdf` where `${1}` is the basename of the `.typ` file.

There’s yet another layer to this. My DNS is set up to publish this GitHub Pages site on `resume.cybar.dev`, so my resumes would be available like `resume.cybar.dev/Resume_Sheikh_Saad_Abdullah_(${1}).pdf`. No one is going to type all that. So I set up URI redirect rules in Cloudflare so when people go to `resume.cybar.dev/devops/`, it expands to `resume.cybar.dev/Resume_Sheikh_Saad_Abdullah_(devops).pdf`, and so on.

Something to note is that the trailing slash is necessary, i.e. `resume.cybar.dev/devops/` works but `resume.cybar.dev/devops` does not. This is because without the slash, Cloudflare would have to interpret it as a file and attempt to redirect the URI to another file (the PDF), but then that file would also cause a redirect, leading to infinite recursion. This is because I am on the Cloudflare Free plan which only supports wildcard matching; Business and Enterprise plans have access to regex matching, which would allow capturing URI with paths not ending in `.pdf`.

> **UPDATE**: The trailing slash is no longer necessary. I restructured the generated site so `resume.cybar.dev/*/` paths are directories with the generated PDF, and an `index.html` that redirects to the PDF. It uses the `<meta http-equiv="refresh">` tag to achieve this. You can see how it works in [the GitHub Actions workflow file](https://github.com/cybardev/resume/blob/main/.github/workflows/publish.yml).

> **NOTE**: You might’ve noticed that the `resume` repo is older than the template repo. That’s cuz I didn’t think of making the Typst resume module a template. At the time I was making it for myself and didn’t think of starting with a template first, then implementing it for my own resume. Oopsie~ :3

## Why

At this point you might be wondering, why would anyone even want to go through all this effort just to get some resumes out? A similar effect can be achieved with something like MS Word for resume creation and Google Drive for storing and sharing.

The issue with most rich text editors is that they add a lot of unnecessary metadata to PDF exports, which may confuse ATS resume parsers. It’s not a certainty but from what I’ve gathered, it’s safer to generate PDFs programmatically via LaTeX or such. Also, I find it a much nicer flow to edit my resume in Helix editor in the terminal; the shortcuts and motions are very useful. That, and being able to have a plaintext source file to track cleanly in Git adds to the convenience.

## Conclusion

If you’re already familiar with LaTeX and want to make resume generation easier, there’s services like [Overleaf](https://www.overleaf.com) that can reduce the pain. If the Typst resume flow catches your fancy, feel free to check out and use [my template repository](https://github.com/cybardev/resume-template-typst).

And, if you’re looking for a developer who can get things done, here’s my resume: [resume.cybar.dev/devops/](https://resume.cybar.dev/devops/)
