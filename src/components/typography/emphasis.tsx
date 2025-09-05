import { type VariantProps, cva } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";

import { cn } from "~/utils/cn";

type EmphasisBaseProps = VariantProps<typeof emphasisStyles>;
const emphasisStyles = cva(["Emphasis", "italic"]);

export interface EmphasisProps
	extends JSX.HTMLAttributes<HTMLSpanElement>,
		EmphasisBaseProps {}

export function Emphasis(props: Readonly<EmphasisProps>): JSX.Element {
	const [{ class: className }, rest] = splitProps(props, ["class"]);
	return (
		<em class={cn(emphasisStyles(), className)} {...rest}>
			{props.children}
		</em>
	);
}
