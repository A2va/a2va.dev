import { type VariantProps, cva } from "class-variance-authority";
import { omit } from "solid-js";
import { type JSX, type ValidComponent, dynamic } from "@solidjs/web";

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
	const rest = omit(props, "size", "variant", "as", "class");
	const Component = dynamic(() => defaultTo("p", props.as) as ValidComponent);
	return (
		<Component
			class={cn(
				paragraphStyles({ variant: props.variant, size: props.size }),
				props.class,
			)}
			{...rest}
		>
			{props.children}
		</Component>
	);
}
