import { defineConfig } from "@solidjs/start/config";

import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

import rehypeShiki from "@shikijs/rehype";
import {
	transformerNotationHighlight,
	transformerNotationWordHighlight,
} from "@shikijs/transformers";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypeSlug from "rehype-slug";

import { metadataPlugin } from "./build-helpers/metadataPlugin";

// @ts-ignore
import pkg from "@vinxi/plugin-mdx";
const { default: mdx } = pkg;

// https://github.com/chrisweb/rehype-github-alerts

const defineString = (str?: string) => `"${str || "unknown"}"`;

const NITRO_PRESET = process.env.SERVER_PRESET || "cloudflare_pages";
const WEBSITE = "https://a2va.dev";

export default defineConfig({
	extensions: ["mdx", "md"],
	server: {
		preset: NITRO_PRESET,
		// https://developers.cloudflare.com/pages/framework-guides/deploy-a-solid-start-site/
		...(NITRO_PRESET.startsWith("cloudflare-pages") && {
			rollupConfig: {
				external: ["__STATIC_CONTENT_MANIFEST", "node:async_hooks"],
			},
		}),
	},
	vite: {
		plugins: [
			metadataPlugin(),
			mdx.withImports({})({
				remarkPlugins: [remarkFrontmatter, remarkGfm],
				rehypePlugins: [
					rehypeSlug,
					[
						rehypeShiki,
						{
							themes: {
								dark: "rose-pine-moon",
								light: "rose-pine-dawn",
								// light: 'github-light',
								// dark: 'github-dark',
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
				jsx: true,
				jsxImportSource: "solid-js",
				providerImportSource: "solid-mdx",
			}),
		],
		define: {
			__APP_NODE_ENV: defineString(process.env.NODE_ENV),
			__APP_WEBSITE: defineString(WEBSITE),
		},
	},
});
