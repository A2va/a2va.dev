/// <reference types="@solidjs/start/env" />

declare const __APP_NODE_ENV: string;
declare const __APP_WEBSITE: string;

declare module "*.typ?parts" {
	export const body: string;
	export const title: string | null;
	export const description: string | null;

	const content: {
		body: string;
		title: string | null;
		description: string | null;
	};

	export default content;
}
