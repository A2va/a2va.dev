import { type VariantProps, cva } from "class-variance-authority";
import { Show, omit } from "solid-js";
import type { JSX } from "@solidjs/web";

const calloutStyles = cva(
	[
		"rounded-lg",
		"p-4",
		"border",
		"flex",
		"flex-col",
		"gap-1",
		"text-sm",
		"shadow-sm",
		"transition-colors",
		"transition-shadow",
		"mb-4", // space between callouts
	],
	{
		defaultVariants: {
			variant: "info",
			size: "md",
		},
		variants: {
			variant: {
				info: [
					"bg-content-warm-primary",
					"text-primary-11",
					"border-primary-4",
				],
				success: [
					"bg-green-50/40",
					"text-green-900",
					"border-green-300",
					"dark:bg-green-950/40",
					"dark:text-green-100",
					"dark:border-green-600",
				],
				warning: [
					"bg-yellow-50/40",
					"text-yellow-900",
					"border-yellow-300",
					"dark:bg-yellow-950/40",
					"dark:text-yellow-100",
					"dark:border-yellow-600",
				],
				error: [
					"bg-red-50/40",
					"text-red-900",
					"border-red-300",
					"dark:bg-red-950/40",
					"dark:text-red-100",
					"dark:border-red-600",
				],
			},
			size: {
				sm: ["text-xs", "p-3"],
				md: ["text-sm", "p-4"],
				lg: ["text-base", "p-5"],
			},
		},
	},
);

type CalloutBaseProps = VariantProps<typeof calloutStyles>;
interface CalloutProps
	extends JSX.HTMLAttributes<HTMLDivElement>,
		CalloutBaseProps {
	title?: string;
	icon?: JSX.Element;
}

export function Callout(props: Readonly<CalloutProps>): JSX.Element {
	const rest = omit(props, "variant", "size", "title", "icon");

	return (
		<div
			class={calloutStyles({ variant: props.variant, size: props.size })}
			{...rest}
		>
			<Show when={props.icon}>
				<span class="shrink-0 mt-0.5">{props.icon}</span>
			</Show>
			<Show when={props.title}>
				<h4 class="font-semibold mb-1">{props.title}</h4>
			</Show>
			<div>{props.children}</div>
		</div>
	);
}
