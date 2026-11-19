import { fileURLToPath } from "node:url";

import mdx from "@mdx-js/rollup";
import solid from "@solidjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { fileRoutes } from "filesystem-routing/vite";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";

import { nitro } from "nitro/vite";

import { metadataPlugin } from "./build-helpers/metadataPlugin.ts";

const defineString = (str?: string) => `"${str || "unknown"}"`;

const WEBSITE = "https://a2va.dev";

const NITRO_PRESET = process.env.SERVER_PRESET || "cloudflare_pages";
const IS_CLOUDFLARE_PAGES = NITRO_PRESET == "cloudflare_pages";

export default defineConfig({
  plugins: [
    tailwindcss(),
    metadataPlugin(),
    {
      ...mdx({
        jsx: true,
        jsxImportSource: "@solidjs/web",
        providerImportSource: "~/components/mdx-provider",
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeShiki,
            {
              themes: {
                dark: "rose-pine-moon",
                light: "rose-pine-dawn",
              },
              inline: "tailing-curly-colon",
              // https://github.com/shikijs/shiki/issues/629
              parseMetaString: (str: string) => {
                return Object.fromEntries(
                  str.split(" ").reduce((prev, curr) => {
                    const [key, value] = curr.split("=");
                    const isNormalKey = /^[A-Z0-9]+$/i.test(key);
                    // @ts-expect-error
                    // biome-ignore lint: Reassigning a function parameter is confusing
                    if (isNormalKey) prev = [...prev, [key, value || true]];
                    return prev;
                  }, []),
                );
              },
              transformers: [
                transformerNotationHighlight({ matchAlgorithm: "v3" }),
                transformerNotationWordHighlight({ matchAlgorithm: "v3" }),
              ],
            },
          ],
          rehypeMdxCodeProps,
        ],
      }),
      enforce: "pre",
    },
    solid({
      start: {
        // Nitro owns the server output for Cloudflare Pages; only the Node
        // target needs the emitted dist/server/node.js entry.
        nodeServer: !IS_CLOUDFLARE_PAGES,
      },
      ssr: true,
      serverFunctions: {
        serverSetup: "./src/server-config.ts",
      },
      extensions: [".mdx"],
    }),
    fileRoutes({
      extensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
      types: "file-routes.d.ts",
      // Small site: one bundle beats per-route chunks, and eager routes
      // remove the lazy boundaries that serialize the SSR render.
      codeSplitting: false,
    }),
    // Nitro adopts Solid's `ssr` environment and owns the Cloudflare Pages
    // output (`dist/_worker.js` + `_routes.json`).
    ...(IS_CLOUDFLARE_PAGES
      ? [nitro({ serverEntry: false, preset: "cloudflare_pages" })]
      : []),
  ],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    __APP_NODE_ENV: defineString(process.env.NODE_ENV),
    __APP_WEBSITE: defineString(WEBSITE),
  },
});
