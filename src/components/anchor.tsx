import { type VariantProps, cva, cx } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { defaultTo } from "~/utils/default-to";
import type { PolymorphicComponent } from "~/utils/types";

// TODO: Anchor could be rewrittent using the A component from solid-router
//  https://docs.solidjs.com/solid-router/reference/components/a#a

type AnchorBaseProps = VariantProps<typeof anchorStyles>;
const anchorStyles = cva(
	["anchor", "transition-colors duration-200 ease-in-out", "font-medium "],
	{
		defaultVariants: {
			variant: "default",
			interactive: true,
		},
		variants: {
			variant: {
				default: ["text-primary no-underline font-medium", "hover:underline"],
				subtle: ["no-underline", "hover:no-underline"],
				distinguished: ["underline-link"],
			},
			interactive: {
				true: ["hover:text-primary"], // Enable hover effects
				false: [],
			},
		},
	},
);

export interface AnchorProps
	extends PolymorphicComponent<HTMLAnchorElement>,
		AnchorBaseProps,
		JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	external?: boolean;
	noStyle?: boolean;
	interactive?: boolean;
}
export function Anchor(props: Readonly<AnchorProps>): JSX.Element {
	const [
		{ variant, as, class: className, external, noStyle, interactive },
		rest,
	] = splitProps(props, [
		"variant",
		"as",
		"class",
		"external",
		"noStyle",
		"interactive",
	]);
	return (
		<Dynamic
			component={defaultTo("a", as)}
			class={cx(
				noStyle
					? null
					: anchorStyles({ variant, interactive: interactive ?? true }),
				className,
			)}
			target={external ? "_blank" : "_self"}
			rel={external ? "noopener noreferrer" : ""}
			{...rest}
		>
			{props.children}
		</Dynamic>
	);
}
