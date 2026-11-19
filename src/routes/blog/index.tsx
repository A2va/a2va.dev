import { createMemo, For, omit, Show } from "solid-js";
import type { JSX } from "@solidjs/web";
import { Anchor, Image, Page, Typography } from "~/components";

import { posts } from "~/data/posts";
import { hyphenate } from "~/utils/hyphenate";
import type { Post } from "~/utils/types";

interface BlogCardProps {
	post: Readonly<Post>;
}

const FLAGS = {
	showDescription: true,
	showTags: false,
};

function BlogCard(props: Readonly<BlogCardProps>): JSX.Element {
	const rest = omit(props, "post");
	const hyphenatedSlug = () => hyphenate(props.post.slug);

	return (
		<article
			id={hyphenatedSlug()}
			aria-labelledby={`${hyphenatedSlug()}-title`}
			{...rest}
		>
			<Anchor
				variant={"subtle"}
				href={`/blog/${props.post.slug}`}
				class="block"
			>
				<Show
					when={props.post.image}
					fallback={
						<div class="aspect-5/6 h-full w-full rounded-xl bg-warm-2 object-cover" />
					}
				>
					<Image
						title={props.post.title}
						src={props.post.image?.src}
						alt={props.post.image?.alt ?? ""}
						class="aspect-5/6 w-full h-full rounded-xl object-contain object-center"
					/>
				</Show>
				<Typography.Paragraph variant={"subdued"} class="mt-3">
					<time datetime={props.post.date.toISOString()}>
						{props.post.date.toLocaleDateString("en-GB", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</time>
				</Typography.Paragraph>
				<div class="mt-1">
					<Typography.Heading
						size={"md"}
						id={`${hyphenatedSlug()}-title`}
						hideAnchor
					>
						{props.post.title}
					</Typography.Heading>
					{FLAGS.showDescription && (
						<Typography.Paragraph
							variant={"subdued"}
							size={"sm"}
							class="mt-2 truncate"
							title={props.post.description}
						>
							{props.post.description}
						</Typography.Paragraph>
					)}
					{FLAGS.showTags && (
						<ul class="mt-2 flex flex-wrap gap-x-3 gap-y-1 opacity-60">
							<For each={props.post.tags}>
								{(tag) => <li class="text-sm font-light">#{tag}</li>}
							</For>
						</ul>
					)}
				</div>
			</Anchor>
		</article>
	);
}

export default function Blog() {
	const visiblePosts = createMemo(() =>
		posts
			.filter((post) => post.date <= new Date() && !post.unpublished)
			.sort((a, b) => a.date.getTime() - b.date.getTime())
			.reverse(),
	);
	return (
		<Page
			title="Blog"
			description="A2va's blog to post about the things he is working on"
			keywords="blog, development, xmake, c, c++, rust"
			reverse
		>
			<ul class="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
				<For
					each={visiblePosts()}
					fallback={
						<Typography.Heading class="col-span-full text-center">
							There is not posts yet.
						</Typography.Heading>
					}
				>
					{(post) => (
						<li>
							<BlogCard post={post} />
						</li>
					)}
				</For>
			</ul>
		</Page>
	);
}
