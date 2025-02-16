import { Link, Meta, MetaProvider, Title } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import { type JSX, createMemo, splitProps } from "solid-js";

interface PageProps extends JSX.HTMLAttributes<HTMLDivElement> {
	title: string;
	description: string;
	keywords?: string;
	reverse?: boolean;
}

export function Page(props: Readonly<PageProps>): JSX.Element {
	const [{ title, description, keywords, reverse }, rest] = splitProps(props, [
		"title",
		"description",
		"keywords",
		"reverse",
	]);
	const location = useLocation();

	const formattedTitle = createMemo(() => {
		const SEPARATOR = " | ";
		return reverse ? `A2va${SEPARATOR}${title}` : `${title}${SEPARATOR}A2va`;
	});

	return (
		<>
			<MetaProvider>
				<Title>{formattedTitle()}</Title>
				<Meta name="title" content={formattedTitle()} />
				<Meta name="description" content={description} />
				{keywords ? <Meta name="keywords" content={keywords} /> : null}
				<Meta name="og:title" content={formattedTitle()} />
				<Meta name="og:description" content={description} />
				<Meta name="og:type" content="website" />
				<Meta name="og:url" content={__APP_WEBSITE + location.pathname} />
				<Link rel="canonical" href={__APP_WEBSITE + location.pathname} />
			</MetaProvider>
			{props.children}
		</>
	);
}
