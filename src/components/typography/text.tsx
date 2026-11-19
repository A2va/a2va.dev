import { type VariantProps, cva } from "class-variance-authority";
import { omit } from "solid-js";
import { type JSX, type ValidComponent, dynamic } from "@solidjs/web";

import { cn, defaultTo } from "~/utils";
import type { PolymorphicComponent } from "~/utils/types";

type TextBaseProps = VariantProps<typeof labelStyles>;
const labelStyles = cva("text", {
	defaultVariants: {
		variant: "default",
	},
	variants: {
		variant: {
			default: ["text-inherit"],
			subdued: ["text-text-secondary"],
		},
	},
});

export interface TextProps
	extends PolymorphicComponent<HTMLSpanElement>,
		TextBaseProps {}

export function Text(props: Readonly<TextProps>): JSX.Element {
	const rest = omit(props, "variant", "as", "class");
	const Component = dynamic(
		() => defaultTo("span", props.as) as ValidComponent,
	);
	return (
		<Component
			class={cn(labelStyles({ variant: props.variant }), props.class)}
			{...rest}
		>
			{props.children}
		</Component>
	);
}
