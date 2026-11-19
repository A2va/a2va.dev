import { query, useLocation } from "@solidjs/router";
import { createMemo, Errored, Show } from "solid-js";
import type { RouteSectionProps } from "@solidjs/router";

import { Page, Typography } from "~/components";
import { postsMap } from "~/data/posts";

import NotFound from "~/routes/[...404]";

import { hyphenate } from "~/utils/hyphenate";

type PostMeta = {
	title: string;
	description: string;
	date: string;
	slug: string;
	author: string;
	tags: string[];
	image?: { src: string; alt: string };
};

const getPostMeta = query(async (slug: string): Promise<PostMeta> => {
	"use server";
	const post = postsMap.get(slug);
	if (!post) {
		throw new Error("Post not found");
	}

	const isFuturePost = post.date > new Date();
	const isUnpublished = post.unpublished;

	if ((isFuturePost || isUnpublished) && __APP_NODE_ENV === "production") {
		throw new Error("Post is not published");
	}

	return { ...post, date: post.date.toISOString() };
}, "post-meta");

export default function BlogEntry(props: Readonly<RouteSectionProps>) {
	const location = useLocation();
	const articleId = () => {
		const routeSegments = location.pathname.split("/");
		return routeSegments[routeSegments.length - 1];
	};

	const meta = createMemo(() => getPostMeta(articleId()));

	return (
		<Errored fallback={() => <NotFound />}>
			<Show when={meta()} keyed>
				{(post) => (
					<Page
						title={post.title}
						description={post.description}
						image={post.image?.src}
					>
						<article>
							<section class="mt-12 pb-12">
								<Typography.Display id={hyphenate(post.title)}>
									{post.title}
								</Typography.Display>
								<Typography.Paragraph variant="subdued" size="lg" class="mt-10">
									{post.description}
								</Typography.Paragraph>
								<Typography.Paragraph variant="subdued" size="sm" class="mt-6">
									Published on{" "}
									<time datetime={post.date}>
										{new Date(post.date).toLocaleDateString("en-GB", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</time>
								</Typography.Paragraph>
							</section>
							<div class="prose prose-lg max-w-none">{props.children}</div>
						</article>
					</Page>
				)}
			</Show>
		</Errored>
	);
}
