import { type VariantProps, cva, cx } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";

type StrongBaseProps = VariantProps<typeof strongStyles>;
const strongStyles = cva(["strong", "font-bold"]);

export interface StrongProps
	extends JSX.HTMLAttributes<HTMLSpanElement>,
		StrongBaseProps {}

export function Strong(props: Readonly<StrongProps>): JSX.Element {
	const [{ class: className }, rest] = splitProps(props, ["class"]);
	return (
		<strong class={cx(strongStyles(), className)} {...rest}>
			{props.children}
		</strong>
	);
}
