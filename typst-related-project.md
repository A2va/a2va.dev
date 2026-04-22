I want to add the posibilit to write my blog post with typst. Here is the vite plugin docs:

# vite-plugin-typst

A [Vite](https://vitejs.dev/) plugin for [typst](https://www.typst.app/).

## Installation

```bash
yarn add -D @myriaddreamin/vite-plugin-typst
```

### Installing Typst Support

Two providers are expected to work:

- (Default) `@myriaddreamin/typst-ts-node-compiler`: A js integrated compiler for typst, which makes cache shared between typst compilations.
- (Compatibility) `typst-cli`: Using the typst cli to compile `.typ` files.

Install the `@myriaddreamin/typst-ts-node-compiler` package to add support for `.typ` files:

```bash
yarn add -D @myriaddreamin/typst-ts-node-compiler
```

## On-demand JS import (examples/js-import)

The default usage is simple, just add the plugin to your Vite config:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import typst from "@myriaddreamin/vite-plugin-typst";

export default defineConfig({
  plugins: [typst()],
});
```

In your `.js` or `.ts` files, you can import `.typ` files directly:

```ts
import html from "index.typ?html";
```

Or only gets the body of the document:

```ts
import { title, description, body } from "index.typ?parts";
```

Available query parameters:

- `html`: Get the full HTML content of the document.
- `parts`: Get the parts of the document. The parts are exported as an object with keys as the part names.
  - `body` (`string`): The body of the document.
  - `title` (`string | null`): The title of the document.
  - `description` (`string | null`): The description of the document.

Runs `vite build` for production and runs `vite` for development. When in development, the plugin will watch to `.typ` files and recompile them on changes.

## Compiling `.typ` Files into static HTML (examples/single-file)

You can also use typst documents as static HTML files. For example, compile `index.typ` into `index.html`:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [typst({ index: true })],
});
```

### Multiple Pages (examples/glob-documents)

If you have multiple pages, you can specify the entry file for each page:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [typst({ documents: ["content/a.typ", "content/b.typ"] })],
});
```

Glob patterns are also supported:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [typst({ documents: ["content/**/*.typ"] })],
});
```

### Configuring a Different Root Directory

By default, the root directory is the vite's configured root (`viteConfig.root`). You can set a different root directory:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [typst({ root: "typ/root/" })],
});
```

### Configuring the Typst Compiler

By default, the plugin uses the `@myriaddreamin/typst-ts-node-compiler` compiler. You can set a different compiler:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [typst({ compiler: "typst-cli" })],
});
```

## Customized Query (examples/mixin-parts)

You can inject query data into `?parts` query by providing a `onResolveParts` function:

```ts
import { checkExecResult } from "@myriaddreamin/vite-plugin-typst";

export default defineConfig({
  plugins: [
    TypstPlugin({
      onResolveParts: (input, project, ctx) => {
        const res = checkExecResult(input, project.compileHtml(input), ctx);
        return {
          frontmatter:
            res &&
            project.query(res, {
              selector: "<frontmatter>",
              field: "value",
            })[0],
        };
      },
    }),
  ],
});
```

Then, you can import the injected data in your JavaScript files:

```ts
import { body, frontmatter } from "main.typ?parts";

console.log(frontmatter);

document.body.innerHTML = body;
```

# @myriaddreamin/typst.solid

## Usage

```ts
import { TypstDocument } from "@myriaddreamin/typst.solid";
import { createResource } from "solid-js";

export const App = (artifact: Uint8Array) => {
  const getArtifactData = async () => {
    const response = await fetch(
      "http://localhost:3000/readme.artifact.sir.in"
    ).then((response) => response.arrayBuffer());

    return new Uint8Array(response);
  };
  const [vec] = createResource(getArtifactData);

  return (
    <div>
      <h1>Demo: Embed Your Typst Document in Solid </h1>
      <TypstDocument fill="#343541" artifact={vec()} />
    </div>
  );
};
```

Here some part of a astro website using typst.
//
// @ts-check
import { defineConfig, envField } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { typst } from "astro-typst";
import { loadEnv } from "vite";
import { tylant } from "@myriaddreamin/tylant";
import { resolve } from "node:path";

// Please check `defineConfig/env` in astro.config.mjs for schema
const e = loadEnv(process.env.NODE_ENV || "", process.cwd(), "");
const {
SITE,
SITE_TITLE,
URL_BASE,
SITE_DESCRIPTION,
SITE_OWNER,
SITE_SOURCE_URL,
SITE_LOGO,
} = e;

const EnvStr = (optional = true) =>
envField.string({ context: "client", access: "public", optional });
const MustEnvStr = (optional = false) => EnvStr(optional);

export default defineConfig({
// Whether to prefetch links while hovering.
// See: https://docs.astro.build/en/guides/prefetch/
prefetch: {
prefetchAll: true,
},

site: SITE,
base: URL_BASE,

env: {
schema: {
SITE: MustEnvStr(),
URL_BASE: EnvStr(),

      SITE_TITLE: EnvStr(),
      SITE_INDEX_TITLE: EnvStr(),
      SITE_DESCRIPTION: EnvStr(),

      // # Please remove them if you don't like to use backend.
      // `;` separated list of backend addresses
      BACKEND_ADDR: EnvStr(),
      BAIDU_VERIFICATION_CODE: EnvStr(),
      SITE_OWNER: EnvStr(),
      SITE_SOURCE_URL: EnvStr(),
    },

},

integrations: [
sitemap(),
typst({
// Always builds HTML files
mode: {
default: "html",
detect: () => "html",
},
}),
tylant({
title: SITE_TITLE,
urlBase: URL_BASE,
description: SITE_DESCRIPTION,
siteOwner: SITE_OWNER,
siteSourceUrl: SITE_SOURCE_URL,
siteLogo: SITE_LOGO,

      components: {
        minimal: {
          BaseHead: resolve("./src/components/BaseHead.astro"),
        },
      },
    }),

],

vite: {
build: {
assetsInlineLimit(filePath, content) {
const KB = 1024;
return content.length < (filePath.endsWith(".css") ? 100 _ KB : 4 _ KB);
},
},
ssr: {
external: ["@myriaddreamin/typst-ts-node-compiler"],
noExternal: ["@fontsource-variable/inter"],
},
},
});

## // src/pages/article/[...slug].astro

import { render } from "astro:content";
import { type CollectionEntry, getCollection } from "astro:content";

import BlogPost from "$layouts/BlogPost.astro";

export async function getStaticPaths() {
const posts = await getCollection("blog");
return posts.map((post) => ({
params: { slug: post.id },
props: post,
}));
}
type Props = CollectionEntry<"blog">;

const post = Astro.props;
const { Content } = await render(post);

---

<BlogPost {...{ id: post.id }} {...post.data}>
<Content />
</BlogPost>

## // src/layouts/BlogPost.astro

import MinimalBlogPost from "virtual:tylant/layouts/minimal/BlogPost";
import { Props as MinimalBlogPostProps } from "virtual:tylant/layouts/minimal/BlogPost";
// todo: inject data
import { kArticleStats, kCommentInfo } from "$consts";

## type Props = MinimalBlogPostProps;

<MinimalBlogPost
kArticleStats={kArticleStats}
kCommentInfo={kCommentInfo}
{...Astro.props}
/>

## // packages/tylant/src/layouts/minimal/BlogPost.astro

import { getCollection } from "astro:content";

import type { BlogComment } from "@myriaddreamin/tylant";
import { renderComment } from "@myriaddreamin/tylant";

import k from "virtual:tylant/user-config";

import TagList from "virtual:tylant/components/TagList";
import ArchiveRef from "virtual:tylant/components/ArchiveRef";
import CommentList from "virtual:tylant/components/CommentList";
import LikeReaction from "virtual:tylant/components/LikeReaction";
import PostClick from "virtual:tylant/components/PostClick";

import BaseHead from "virtual:tylant/components/minimal/BaseHead";
import Footer from "virtual:tylant/components/minimal/Footer";
import FormattedDate from "virtual:tylant/components/minimal/FormattedDate";
import Header from "virtual:tylant/components/minimal/Header";

interface BlogEntryData {
id: string;
title: string;
description: string;
date: Date;
updatedDate: Date;
tags: string[];
author: string;
}

interface IdExt {
id: string;
}

type BaseProps = BlogEntryData & (IdExt | { id: false });
interface Props extends BaseProps {
kArticleStats: { id: string; like: number; click: number }[];
kCommentInfo: Map<string, BlogComment[]>;
}

const {
id,
title,
description,
date,
updatedDate,
tags,
author,
kArticleStats,
kCommentInfo,
...rest
} = Astro.props;
const stat: { like?: number; click?: number } =
((k.click || k.reaction) && kArticleStats.find((stat) => stat.id === id)) ||
{};
const click = stat.click || 0;
const like = stat.like || 0;
const pdfArchives = await getCollection("archive");

---

<html lang="en">
  <head>
    <BaseHead title={title} description={description} />
    <style is:global>
      main {
        width: calc(100% - 2em);
        max-width: 100%;
        margin: 0;
      }
      .prose,
      .comment-region,
      ul.tags {
        max-width: min(56rem, calc(100% - 2em));
        color: var(--main-color);
        margin: auto;
      }
      .prose {
        padding: 1em;
      }
      .prose p {
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
      }
      .title {
        margin-bottom: 1em;
        padding: 1em 0;
        line-height: 1;
      }
      .outline {
        margin-top: -2em;
      }
      .outline + hr {
        margin-bottom: 1em;
      }
      .title h1 {
        margin: 0 0 0.5em 0;
      }
      .annotation {
        color: var(--gray-color);
        display: flex;
        gap: 0.5em;
        margin-bottom: 0.5em;
      }
      .last-updated-on,
      .click-count,
      .like-count {
        font-style: italic;
      }
      ul.tags {
        list-style: none;
        padding: 0;
      }
      .tags li {
        display: inline-block;
        margin: 0;
        margin-right: 1em;
      }
      .tags a {
        text-decoration: none;
      }
      .tags a:hover {
        text-decoration: underline;
      }
      .outline {
        text-align: left;
      }

      .outline-item {
        line-height: 1.8889;
      }
      .outline-item.x-heading-1 {
        margin-left: 0em;
      }
      .outline-item.x-heading-2 {
        margin-left: 1em;
      }
      .outline-item.x-heading-3 {
        margin-left: 2em;
      }
      .outline-item.x-heading-4 {
        margin-left: 3em;
      }
      .outline-item.x-heading-5 {
        margin-left: 4em;
      }
    </style>
    {id && <PostClick articleId={id} />}

  </head>

  <body>
    <Header articleId={id || undefined} />
    <main>
      <article>
        <div class="prose">
          <section class="title" aria-label="Title">
            <div class="annotation">
              <div class="date">
                <FormattedDate date={date} />
                {
                  updatedDate && (
                    <>
                      <span class="last-updated-on">
                        , Last updated on{" "}
                        <FormattedDate date={updatedDate || date} />
                      </span>
                    </>
                  )
                }
              </div>
              {
                id && k.click && (
                  <>
                    <span>·</span>
                    <div class="click-count">
                      {click} {click === 1 ? "view" : "views"}
                    </div>
                  </>
                )
              }
              {
                id && k.reaction && (
                  <>
                    <span>·</span>
                    <span class="like-count">
                      {like} {like === 1 ? "like" : "likes"}
                    </span>
                  </>
                )
              }
              {
                id && k.reaction && (
                  <>
                    <span>·</span>
                    <LikeReaction articleId={id} />
                  </>
                )
              }
            </div>
            <h1>{title}</h1>
            {
              id && pdfArchives.length > 0 && (
                <ArchiveRef
                  articleId={id || undefined}
                  pdfArchives={pdfArchives}
                  {...rest}
                />
              )
            }
            <hr />
          </section>
          <slot />
        </div>
      </article>
      {tags && <TagList tags={tags} />}
      {
        id && (
          <CommentList
            articleId={id}
            kCommentInfo={kCommentInfo}
            renderComment={renderComment}
          />
        )
      }
    </main>
    <Footer />
  </body>
</html>

But I think this astro typst project it's the backend that compiles the typst code to html, but for me I want it at build time like mdx.
