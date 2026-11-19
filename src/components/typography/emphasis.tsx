import { type VariantProps, cva } from "class-variance-authority";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "~/utils/cn";

type EmphasisBaseProps = VariantProps<typeof emphasisStyles>;
const emphasisStyles = cva(["Emphasis", "italic"]);

export interface EmphasisProps
	extends JSX.HTMLAttributes<HTMLSpanElement>,
		EmphasisBaseProps {}

export function Emphasis(props: Readonly<EmphasisProps>): JSX.Element {
	const rest = omit(props, "class");
	return (
		<em class={cn(emphasisStyles(), props.class)} {...rest}>
			{props.children}
		</em>
	);
}
