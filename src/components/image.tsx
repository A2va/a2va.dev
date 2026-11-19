import { type VariantProps, cva } from "class-variance-authority";
import { Show, omit } from "solid-js";
import type { JSX } from "@solidjs/web";

import { Text } from "./typography/text";
import { cn } from "~/utils/cn";

const imageStyles = cva(["image", "border-content-warm-secondary"], {
	variants: {
		center: {
			true: ["mx-auto"],
			false: [],
		},
	},
});

type ImageBaseProps = VariantProps<typeof imageStyles>;
export interface ImageProps
	extends JSX.ImgHTMLAttributes<HTMLImageElement>,
		ImageBaseProps {
	alt: string;
	caption?: string;
	showCaption?: boolean;
	containerClass?: string;
	center?: boolean;
}

export function Image(props: Readonly<ImageProps>): JSX.Element {
	const rest = omit(
		props,
		"alt",
		"class",
		"containerClass",
		"showCaption",
		"caption",
		"center",
	);
	const image = (
		// biome-ignore lint/a11y/useAltText: <explanation>
		<img
			class={cn(imageStyles({ center: props.center }), props.class)}
			alt={props.alt ?? ""}
			decoding="async"
			loading="lazy"
			{...rest}
		/>
	);
	return (
		<Show when={props.showCaption} fallback={image}>
			<figure
				class={cn(
					props.center ? "block" : "inline-block",
					props.containerClass,
				)}
			>
				{/* biome-ignore lint/a11y/useAltText: alt is passed */}
				<img
					class={cn(imageStyles({ center: props.center }), props.class)}
					alt={props.alt}
					decoding="async"
					loading="lazy"
					{...rest}
				/>
				<figcaption class="mt-2 text-center italic">
					<small>
						<Text variant="subdued">{props.caption ?? props.alt}</Text>
					</small>
				</figcaption>
			</figure>
		</Show>
	);
}
