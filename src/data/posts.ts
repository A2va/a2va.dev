import type { Post } from "~/utils/types";
import Posts from "./posts.json";

export const posts: Post[] = Posts.map((p: Post) => ({
	...p,
	date: new Date(p.date),
}));

export const postsMap = new Map(posts.map((post) => [post.slug, post]));
