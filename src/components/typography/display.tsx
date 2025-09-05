import { type VariantProps, cva } from "class-variance-authority";
import { type JSX, Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { Anchor } from "~/components/anchor";
import type { PolymorphicComponent } from "~/utils/types";
import { Typography } from ".";

import { cn, defaultTo } from "~/utils";

type DisplayBaseProps = VariantProps<typeof displayStyles>;
export const displayStyles = cva(
	["display", "font-semibold leading-tight tracking-tighter"],
	{
		defaultVariants: {
			size: "md",
			variant: "default",
		},
		variants: {
			size: {
				lg: ["text-5xl sm:text-8xl", "leading-none"],
				md: ["text-4xl sm:text-6xl", "leading-none"],
				sm: ["text-3xl sm:text-5xl", "leading-tight"],
				xs: ["text-2xl sm:text-4xl", "leading-tight"],
			},
			variant: {
				default: ["text-inherit"],
				subdued: ["text-text-secondary"],
			},
		},
	},
);

export interface DisplayProps
	extends PolymorphicComponent<HTMLHeadingElement>,
		DisplayBaseProps {}

/**
 * To be used for standout headings, such as page titles. Should not be used more than once per page.
 * @see https://fae.disability.illinois.edu/rulesets/HEADING_2/
 */
export function Display(props: Readonly<DisplayProps>): JSX.Element {
	const [{ variant, size, as, class: className }, rest] = splitProps(props, [
		"size",
		"variant",
		"as",
		"class",
	]);

	const styles = displayStyles({ variant, size });
	const display = (
		<Dynamic
			component={defaultTo("h1", as)}
			class={cn(styles, { inline: props.id }, className)}
			{...rest}
		>
			{props.children}
		</Dynamic>
	);

	return (
		<Show when={props.id} fallback={display}>
			{(id) => (
				<div>
					{display}
					<Anchor
						href={`#${id()}`}
						rel="bookmark"
						aria-label={"Permalink to this heading"}
						class={cn(
							styles,
							"ml-[0.5ch] inline text-text-secondary",
							className,
						)}
						variant={"distinguished"}
					>
						<Typography.Text variant={"subdued"} class="text-inherit">
							#
						</Typography.Text>
					</Anchor>
				</div>
			)}
		</Show>
	);
}
