import { type VariantProps, cva, cx } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { defaultTo } from "~/utils/default-to";
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
	const [{ variant, as, class: className }, rest] = splitProps(props, [
		"variant",
		"as",
		"class",
	]);
	return (
		<Dynamic
			component={defaultTo("span", as)}
			class={cx(labelStyles({ variant }), className)}
			{...rest}
		>
			{props.children}
		</Dynamic>
	);
}
