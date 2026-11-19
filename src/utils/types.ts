import type { JSX } from "@solidjs/web";

export type RelevantTags = Exclude<
	keyof JSX.IntrinsicElements,
	| "script"
	| "object"
	| "style"
	| "head"
	| "animate"
	| "animateMotion"
	| "animateTransform"
	| "feDistantLight"
	| "feFuncA"
	| "feFuncB"
	| "feFuncG"
	| "feFuncR"
	| "feMergeNode"
	| "fePointLight"
	| "feSpotLight"
	| "metadata"
	| "view"
	| "symbol"
>;

export interface PolymorphicComponent<T> extends JSX.HTMLAttributes<T> {
	as?: RelevantTags;
}

export type Theme = "light" | "dark" | "system";

export type Post = {
	title: string;
	date: Date;
	slug: string;
	author: string;
	tags: string[];
	image?: Image;
	unpublished?: boolean;
	description: string;
};

export type Image = {
	src: string;
	alt: string;
};

export type Tag = {
	// id/name of tag
	id: string;
	// indexes of posts with tag (they point to the posts list coming from virtual:blog-posts)
	posts: number[];
};

export type Project = {
	name: string;
	description: string;
	url: string;
	logo: string;
	status?: string;
};
