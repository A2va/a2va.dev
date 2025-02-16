import { type VariantProps, cva, cx } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";

const dividerStyles = cva(["divider", "border-content-neutral-secondary"], {
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
		<hr class={cx(dividerStyles({ size }))} {...rest}>
			{props.children}
		</hr>
	);
}
