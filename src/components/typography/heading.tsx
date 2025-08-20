import { type VariantProps, cva, cx } from "class-variance-authority";
import { type JSX, Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { Anchor } from "~/components/anchor";
import { defaultTo } from "~/utils/default-to";
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
			xxl: ["text-4xl sm:text-5xl", "leading-tight"],
			xl: ["text-3xl sm:text-4xl", "leading-tight"],
			lg: ["text-2xl sm:text-3xl", "leading-snug"],
			md: ["text-xl sm:text-2xl", "leading-snug"],
			sm: ["text-lg sm:text-xl", "leading-snug"],
			xs: ["text-base sm:text-lg", "leading-normal"],
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
	const [{ variant, size, as, class: className, hideAnchor }, rest] =
		splitProps(props, ["size", "variant", "as", "class", "hideAnchor"]);

	const styles = headingStyles({ variant, size });
	const heading = (
		<Dynamic
			// @ts-ignore
			component={as ?? HEADING_SIZE_TAG[defaultTo("md", size)]}
			class={cx(
				styles,
				{
					inline: props.id,
				},
				className,
			)}
			{...rest}
		>
			{props.children}
		</Dynamic>
	);

	return (
		<Show when={props.id && !hideAnchor} fallback={heading}>
			<div class={className}>
				{heading}
				<Anchor
					href={`#${props.id}`}
					rel="bookmark"
					aria-label={"Permalink to this heading"}
					class={cx(styles, "ml-[0.5ch] inline text-text-secondary")}
					variant={"distinguished"}
				>
					<Typography.Text variant={"subdued"}>#</Typography.Text>
				</Anchor>
			</div>
		</Show>
	);
}
