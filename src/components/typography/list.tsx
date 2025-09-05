import { type VariantProps, cva } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { cn, defaultTo } from "~/utils";
import type { PolymorphicComponent } from "~/utils/types";

type ListBaseProps = VariantProps<typeof listStyles>;
const listStyles = cva(["list", "space-y-3 list-outside"], {
	defaultVariants: {
		variant: "default",
	},
	variants: {
		variant: {
			default: ["list-disc pl-7"],
			ordered: ["list-decimal pl-7"],
			tasks: ["list-none pl-2"],
		},
	},
});

export interface ListProps
	extends PolymorphicComponent<HTMLUListElement>,
		ListBaseProps {}

export function List(
	props: Readonly<ListProps & { className?: string }>,
): JSX.Element {
	const [{ as, class: classFromProps }, rest] = splitProps(props, [
		"as",
		"class",
	]);

	const combinedClasses = cn(classFromProps, rest.className);
	const variant = combinedClasses?.includes("contains-task-list")
		? "tasks"
		: as === "ol"
			? "ordered"
			: "default";

	return (
		<Dynamic
			component={defaultTo("ul", as)}
			class={cn(listStyles({ variant }), classFromProps)}
			{...rest}
		>
			{props.children}
		</Dynamic>
	);
}

type ListItemBaseProps = VariantProps<typeof listItemStyles>;
const listItemStyles = cva(["listitem"], {
	defaultVariants: {
		variant: "default",
	},
	variants: {
		variant: {
			default: [],
		},
	},
});

export interface ListItemProps
	extends PolymorphicComponent<HTMLLIElement>,
		ListItemBaseProps {}

export function ListItem(props: Readonly<ListProps>): JSX.Element {
	const [{ as, class: className }, rest] = splitProps(props, ["as", "class"]);
	return (
		<Dynamic
			component={defaultTo("li", as)}
			class={cn(listItemStyles(), className, "list")}
			{...rest}
		>
			{props.children}
		</Dynamic>
	);
}
