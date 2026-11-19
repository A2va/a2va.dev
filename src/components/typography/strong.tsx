import { type VariantProps, cva } from "class-variance-authority";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "~/utils/cn";

type StrongBaseProps = VariantProps<typeof strongStyles>;
const strongStyles = cva(["strong", "font-bold"]);

export interface StrongProps
	extends JSX.HTMLAttributes<HTMLSpanElement>,
		StrongBaseProps {}

export function Strong(props: Readonly<StrongProps>): JSX.Element {
	const rest = omit(props, "class");
	return (
		<strong class={cn(strongStyles(), props.class)} {...rest}>
			{props.children}
		</strong>
	);
}
