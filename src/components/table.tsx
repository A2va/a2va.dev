import { type VariantProps, cva } from "class-variance-authority";
import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";

import { cn } from "~/utils/cn";

type TableBaseProps = VariantProps<typeof tableStyles>;
const tableStyles = cva(["table", "my-5"]);

export interface TableProps
	extends JSX.HTMLAttributes<HTMLTableElement>,
		TableBaseProps {
	containerClass?: string;
}

export function Table(props: Readonly<TableProps>): JSX.Element {
	const rest = omit(props, "class", "containerClass");
	return (
		<div
			class={cn(
				"overflow-x-auto rounded-xl border border-solid border-warm-7 bg-warm-1",
				props.containerClass,
			)}
		>
			<table class={cn(tableStyles(), props.class)} {...rest} />
		</div>
	);
}
