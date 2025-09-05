import { type VariantProps, cva } from "class-variance-authority";
import { type JSX, Show, splitProps } from "solid-js";

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
	const [
		{ alt, class: className, containerClass, showCaption, caption, center },
		rest,
	] = splitProps(props, [
		"alt",
		"class",
		"containerClass",
		"showCaption",
		"caption",
		"center",
	]);
	const image = (
		// biome-ignore lint/a11y/useAltText: <explanation>
		<img
			class={cn(imageStyles({ center }), className)}
			alt={alt ?? ""}
			decoding="async"
			loading="lazy"
			{...rest}
		/>
	);
	return (
		<Show when={showCaption} fallback={image}>
			<figure class={cn(center ? "block" : "inline-block", containerClass)}>
				{/* biome-ignore lint/a11y/useAltText: alt is passed */}
				<img
					class={cn(imageStyles({ center }), className)}
					alt={alt}
					decoding="async"
					loading="lazy"
					{...rest}
				/>
				<figcaption class="mt-2 text-center italic">
					<small>
						<Text variant="subdued">{caption ?? alt}</Text>
					</small>
				</figcaption>
			</figure>
		</Show>
	);
}
