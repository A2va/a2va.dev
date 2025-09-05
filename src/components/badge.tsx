import type { JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cva, type VariantProps } from "class-variance-authority";

import type { PolymorphicComponent } from "~/utils/types";
import { cn, defaultTo } from "~/utils";

const badgeStyles = cva(
	["badge", "text-xs font-medium px-2 py-0.5 rounded-sm overflow-hidden"],
	{
		variants: {
			intent: {
				success: "bg-primary-9 text-primary-3",
				neutral: "bg-warm-12 text-warm-3",
				warning: "bg-warning-10 text-black",
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
	const [{ as, class: className, intent }, rest] = splitProps(props, [
		"as",
		"class",
		"intent",
	]);
	return (
		<Dynamic
			component={defaultTo("span", as)}
			class={cn(badgeStyles({ intent }), className)}
			{...rest}
		>
			{props.children}
		</Dynamic>
	);
}
