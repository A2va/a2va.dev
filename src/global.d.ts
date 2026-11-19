/// <reference types="vite/client" />

declare const __APP_NODE_ENV: string;
declare const __APP_WEBSITE: string;

declare module "*.mdx" {
	import type { Component } from "solid-js";

	const MDXContent: Component<{ components?: Record<string, unknown> }>;
	export default MDXContent;
}
