import { Link, Meta, Title } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import { createMemo } from "solid-js";
import type { JSX } from "@solidjs/web";

interface PageProps extends JSX.HTMLAttributes<HTMLDivElement> {
	title: string;
	description: string;
	image?: string;
	keywords?: string;
	reverse?: boolean;
}

export function Page(props: Readonly<PageProps>): JSX.Element {
	const location = useLocation();

	const formattedTitle = createMemo(() => {
		const SEPARATOR = " | ";
		return props.reverse
			? `A2va${SEPARATOR}${props.title}`
			: `${props.title}${SEPARATOR}A2va`;
	});

	return (
		<>
			<Title>{formattedTitle()}</Title>
			<Meta name="title" content={formattedTitle()} />
			<Meta name="description" content={props.description} />
			{props.keywords ? (
				<Meta name="keywords" content={props.keywords} />
			) : null}
			<Meta name="og:locale" content="en" />
			<Meta name="og:title" content={formattedTitle()} />
			<Meta name="og:description" content={props.description} />
			{props.image ? (
				<Meta name="og:image" content={__APP_WEBSITE + props.image} />
			) : null}
			<Meta name="og:type" content="website" />
			<Meta name="og:url" content={__APP_WEBSITE + location.pathname} />
			<Link rel="canonical" href={__APP_WEBSITE + location.pathname} />
			{props.children}
		</>
	);
}
