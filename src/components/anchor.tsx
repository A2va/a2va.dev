import { type VariantProps, cva } from "class-variance-authority";
import { omit } from "solid-js";
import { type JSX, type ValidComponent, dynamic } from "@solidjs/web";

import { cn, defaultTo } from "~/utils";
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
	href?: string;
	external?: boolean;
	noStyle?: boolean;
	interactive?: boolean;
}
export function Anchor(props: Readonly<AnchorProps>): JSX.Element {
	const rest = omit(
		props,
		"variant",
		"as",
		"class",
		"external",
		"noStyle",
		"interactive",
	);
	const Component = dynamic(() => defaultTo("a", props.as) as ValidComponent);
	return (
		<Component
			class={cn(
				props.noStyle
					? null
					: anchorStyles({
							variant: props.variant,
							interactive: props.interactive ?? true,
						}),
				props.class,
			)}
			target={props.external ? "_blank" : undefined}
			rel={props.external ? "noopener noreferrer" : undefined}
			{...rest}
		>
			{props.children}
		</Component>
	);
}
