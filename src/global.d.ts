/// <reference types="@solidjs/start/env" />

declare const __APP_NODE_ENV: string;
declare const __APP_WEBSITE: string;

declare module "virtual:typst-posts" {
	export interface TypstPost {
		slug: string;
		body: string;
		title: string | null;
		description: string | null;
	}

	export const typstPosts: TypstPost[];

	const posts: TypstPost[];

	export default posts;
}
