import { type VariantProps, cva } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { cn, defaultTo } from "~/utils";
import type { PolymorphicComponent } from "~/utils/types";

type ParagraphBaseProps = VariantProps<typeof paragraphStyles>;
const paragraphStyles = cva("paragraph", {
	defaultVariants: {
		size: "md",
		variant: "default",
	},
	variants: {
		size: {
			lg: ["text-lg", "leading-normal"],
			md: ["text-base", "leading-normal"],
			sm: ["text-sm", "leading-tight"],
			xs: ["text-xs", "leading-tight"],
		},
		variant: {
			default: ["text-inherit"],
			subdued: ["text-text-secondary"],
		},
	},
});

export interface ParagraphProps
	extends PolymorphicComponent<HTMLParagraphElement>,
		ParagraphBaseProps {}

export function Paragraph(props: Readonly<ParagraphProps>): JSX.Element {
	const [{ variant, size, as, class: className }, rest] = splitProps(props, [
		"size",
		"variant",
		"as",
		"class",
	]);
	return (
		<Dynamic
			component={defaultTo("p", as)}
			class={cn(paragraphStyles({ variant, size }), className)}
			{...rest}
		>
			{props.children}
		</Dynamic>
	);
}
