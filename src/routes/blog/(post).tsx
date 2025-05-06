import {
	type RouteSectionProps,
	createAsync,
	query,
	redirect,
	useLocation,
} from "@solidjs/router";
import { ErrorBoundary, Show } from "solid-js";
// @ts-ignore
import { MDXProvider } from "solid-mdx";

import { Anchor, MdxComponents, Typography } from "~/components";
import { Page } from "~/components/page";
import { postsMap } from "~/data/posts";

import NotFound from "~/routes/[...404]";
import { hyphenate } from "~/utils/hyphenate";

const getPostMeta = query(async (slug: string) => {
	// "use server";
	const post = postsMap.get(slug);
	if (!post) {
		throw new Error("Post not found");
	}

	const isFuturePost = post.date > new Date();
	const isUnpublished = post.unpublished;

	if ((isFuturePost || isUnpublished) && __APP_NODE_ENV === "production") {
		throw new Error("Post is not published");
	}

	return post;
}, "slug");

export default function BlogEntry(props: Readonly<RouteSectionProps>) {
	const location = useLocation();
	const articleId = () => {
		const routeSegments = location.pathname.split("/");
		return routeSegments[routeSegments.length - 1];
	};

	const meta = createAsync(() => getPostMeta(articleId()), {
		deferStream: true,
	});

	return (
		<ErrorBoundary fallback={<NotFound />}>
			<Show when={meta()} fallback={<div> Loading post...</div>}>
				{(m) => (
					<Page title={m().title} description={m().description}>
						<article>
							<section class="mt-12 pb-10">
								<Typography.Display id={hyphenate(m().title)}>
									{m().title}
								</Typography.Display>
								<Typography.Paragraph variant="subdued" size="lg" class="mt-8">
									{m().description}
								</Typography.Paragraph>
								<Typography.Paragraph variant="subdued" size="sm" class="mt-5">
									Written by <Anchor href={__APP_WEBSITE}>{m().author}</Anchor> · {m().date.toLocaleDateString()}
								</Typography.Paragraph>
							</section>
							<div class="mt-1v">
								<MDXProvider components={MdxComponents}>
									{props.children}
								</MDXProvider>
							</div>
						</article>
					</Page>
				)}
			</Show>
		</ErrorBoundary>
	);
}
