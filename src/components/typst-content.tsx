import type { JSX } from "solid-js";

import { cn } from "~/utils/cn";

export interface TypstContentProps {
	html: string;
	class?: string;
}

export function TypstContent(props: Readonly<TypstContentProps>): JSX.Element {
	return (
		<div class={cn("typst-content", props.class)} innerHTML={props.html} />
	);
}
