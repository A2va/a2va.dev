import { type VariantProps, cva, cx } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";

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
			class={cx(
				"overflow-x-auto rounded-xl border border-solid border-warm-7 bg-warm-1",
				containerClass,
			)}
		>
			<table class={cx(tableStyles(), className)} {...rest} />
		</div>
	);
}
