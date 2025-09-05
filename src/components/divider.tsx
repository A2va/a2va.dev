import { type VariantProps, cva } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";

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
	const [{ size }, rest] = splitProps(props, ["size"]);
	return (
		// biome-ignore lint/correctness/noVoidElementsWithChildren: <explanation>
		<hr class={cn(dividerStyles({ size }))} {...rest}>
			{props.children}
		</hr>
	);
}
