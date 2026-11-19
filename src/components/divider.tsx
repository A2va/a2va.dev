import { type VariantProps, cva } from "class-variance-authority";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "~/utils/cn";

const dividerStyles = cva(["divider", "border-content-warm-secondary"], {
	defaultVariants: {
		size: "md",
	},
	variants: {
		size: {
			lg: ["my-12"],
			md: ["my-8"],
			sm: ["my-4"],
		},
	},
});

type DividerBaseProps = VariantProps<typeof dividerStyles>;
interface DividerProps
	extends JSX.HTMLAttributes<HTMLHRElement>,
		DividerBaseProps {}

export function Divider(props: Readonly<DividerProps>): JSX.Element {
	const rest = omit(props, "size");
	return (
		// biome-ignore lint/correctness/noVoidElementsWithChildren: <explanation>
		<hr class={cn(dividerStyles({ size: props.size }))} {...rest}>
			{props.children}
		</hr>
	);
}
