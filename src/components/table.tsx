import { type VariantProps, cva } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";

import { cn } from "~/utils/cn";

type TableBaseProps = VariantProps<typeof tableStyles>;
const tableStyles = cva(["table", "my-5"]);

export interface TableProps
	extends JSX.HTMLAttributes<HTMLTableElement>,
		TableBaseProps {
	containerClass?: string;
}

export function Table(props: Readonly<TableProps>): JSX.Element {
	const [{ class: className, containerClass }, rest] = splitProps(props, [
		"class",
		"containerClass",
	]);
	return (
		<div
			class={cn(
				"overflow-x-auto rounded-xl border border-solid border-warm-7 bg-warm-1",
				containerClass,
			)}
		>
			<table class={cn(tableStyles(), className)} {...rest} />
		</div>
	);
}
