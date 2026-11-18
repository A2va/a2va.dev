# a2va.dev

My personal website, which contains my blog and some projects I've worked on. It is built using bun as the package manager, but should work with other package managers as well.

You can run it with the following commands
```
bun install
bun dev
```

## Blog posts

Posts live in `src/routes/blog/(post)` and can be written in MDX (`.mdx`) or
Typst (`.typ`). Typst posts start with the same YAML frontmatter as MDX posts,
followed by regular Typst source:

```typst
---
title: My Typst post
description: A short description
tags: [typst]
date: 2026-01-01
author: A2va
---

= Introduction

The Typst document is compiled to HTML at build time.
```

The frontmatter is used for the blog index, the post metadata and the sitemap.
Typst files are watched in development, so adding or editing a post reloads the
page.

For deployment, you can use the following command
```
docker build -t a2va/a2va.dev .
docker run -t -p 3000:3000 a2va/a2va.dev
```

My color palette is built using [palettte.app](https://palettte.app/) (great tool that I have found in the tailwindcss documentation), you can get the palette using `palette.json` located in the public directory.

# Acknowledgements

* Thanks to [@bardenHa](https://github.com/bardenHa) for his [portfolio website](https://www.barden.dev/), from which I borrow many components and design ideas.
* Thanks to [@andi23rosca](https://github.com/andi23rosca/) for the starting point of my vite plugin, and its tree component.
