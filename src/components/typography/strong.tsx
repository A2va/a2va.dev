import { type VariantProps, cva } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";

import { cn } from "~/utils/cn";

type StrongBaseProps = VariantProps<typeof strongStyles>;
const strongStyles = cva(["strong", "font-bold"]);

export interface StrongProps
	extends JSX.HTMLAttributes<HTMLSpanElement>,
		StrongBaseProps {}

export function Strong(props: Readonly<StrongProps>): JSX.Element {
	const [{ class: className }, rest] = splitProps(props, ["class"]);
	return (
		<strong class={cn(strongStyles(), className)} {...rest}>
			{props.children}
		</strong>
	);
}
