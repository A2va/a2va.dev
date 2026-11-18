import { useParams } from "@solidjs/router";
import { Show } from "solid-js";

import { typstPosts } from "virtual:typst-posts";
import { TypstContent } from "~/components/typst-content";
import NotFound from "~/routes/[...404]";

export default function TypstBlogPost() {
	const params = useParams();
	const post = () => typstPosts.find((entry) => entry.slug === params.slug);

	return (
		<Show when={post()} fallback={<NotFound />}>
			{(entry) => <TypstContent html={entry().body} />}
		</Show>
	);
}
