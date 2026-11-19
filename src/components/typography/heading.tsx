import { type VariantProps, cva } from "class-variance-authority";
import { Show, omit } from "solid-js";
import { type JSX, type ValidComponent, dynamic } from "@solidjs/web";

import { Anchor } from "~/components/anchor";
import { cn, defaultTo } from "~/utils";
import type { PolymorphicComponent } from "~/utils/types";
import { Typography } from ".";

type HeadingLevels = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingBaseProps = VariantProps<typeof headingStyles>;
export const headingStyles = cva(["heading", "font-semibold leading-tight"], {
	defaultVariants: {
		size: "md",
		variant: "default",
	},
	variants: {
		size: {
			xxl: ["text-3xl sm:text-4xl", "leading-tight"],
			xl: ["text-2xl sm:text-3xl", "leading-tight"],
			lg: ["text-xl sm:text-2xl", "leading-snug"],
			md: ["text-lg sm:text-xl", "leading-snug"],
			sm: ["text-base sm:text-lg", "leading-snug"],
			xs: ["text-md sm:text-base", "leading-normal"],
		},
		variant: {
			default: ["text-inherit"],
			subdued: ["text-text-secondary"],
		},
	},
});

export interface HeadingProps
	extends PolymorphicComponent<HTMLHeadingElement>,
		HeadingBaseProps {
	hideAnchor?: boolean;
}

/**
 * Rarely do we need to nest more than 4 levels of headings, so we can use 'h4' for multiple sizes.
 */
const HEADING_SIZE_TAG: Record<
	NonNullable<HeadingBaseProps["size"]>,
	HeadingLevels
> = {
	xxl: "h1",
	xl: "h2",
	lg: "h3",
	md: "h4",
	sm: "h5",
	xs: "h6",
};

export function Heading(props: Readonly<HeadingProps>): JSX.Element {
	const rest = omit(props, "size", "variant", "as", "class", "hideAnchor");

	const Component = dynamic(
		() =>
			(props.as ??
				HEADING_SIZE_TAG[
					defaultTo("md", props.size) as NonNullable<HeadingBaseProps["size"]>
				]) as ValidComponent,
	);
	const styles = () =>
		headingStyles({ variant: props.variant, size: props.size });
	const heading = (
		<Component
			class={cn(
				styles(),
				{
					inline: props.id,
				},
				props.class,
			)}
			{...rest}
		>
			{props.children}
		</Component>
	);

	return (
		<Show when={props.id && !props.hideAnchor} fallback={heading}>
			<div class={props.class}>
				{heading}
				<Anchor
					href={`#${props.id}`}
					rel="bookmark"
					aria-label={"Permalink to this heading"}
					class={cn(styles(), "ml-[0.5ch] inline text-text-secondary")}
					variant={"distinguished"}
				>
					<Typography.Text variant={"subdued"}>#</Typography.Text>
				</Anchor>
			</div>
		</Show>
	);
}
