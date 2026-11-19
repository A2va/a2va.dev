import { type VariantProps, cva } from "class-variance-authority";
import { omit } from "solid-js";
import { type JSX, type ValidComponent, dynamic } from "@solidjs/web";

import { cn, defaultTo } from "~/utils";
import type { PolymorphicComponent } from "~/utils/types";

const badgeStyles = cva(
	[
		"badge",
		"inline-flex",
		"items-center",
		"justify-center",
		"font-medium",
		"whitespace-nowrap",
	],
	{
		variants: {
			intent: {
				neutral: "bg-warm-4 text-warm-11",
				success: "bg-success-4 text-success-11",
				warning: "bg-warning-4 text-warning-11",
				danger: "bg-danger-11 text-danger-2",
			},
			size: {
				sm: "text-xs font-medium px-2 py-0.5 rounded",
				md: "text-sm font-medium px-2.5 py-1 rounded-md",
				lg: "text-base font-medium px-3 py-1.5 rounded-lg",
			},
		},
		defaultVariants: {
			intent: "neutral",
			size: "md",
		},
	},
);

type BadgeBaseProps = VariantProps<typeof badgeStyles>;
interface BadgeProps
	extends PolymorphicComponent<HTMLDivElement>,
		BadgeBaseProps {}

export function Badge(props: Readonly<BadgeProps>): JSX.Element {
	const rest = omit(props, "as", "class", "intent");
	const Component = dynamic(
		() => defaultTo("span", props.as) as ValidComponent,
	);
	return (
		<Component
			class={cn(badgeStyles({ intent: props.intent }), props.class)}
			{...rest}
		>
			{props.children}
		</Component>
	);
}
