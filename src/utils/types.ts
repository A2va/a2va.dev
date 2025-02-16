import type { JSX } from "solid-js";

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
