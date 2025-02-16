import { type VariantProps, cva, cx } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { defaultTo } from "~/utils/default-to";
import type { PolymorphicComponent } from "~/utils/types";

type ListBaseProps = VariantProps<typeof listStyles>;
const listStyles = cva(["list", "space-y-2 list-outside"], {
	defaultVariants: {
		variant: "default",
	},
	variants: {
		variant: {
			default: ["list-disc pl-[1.75rem]"],
			ordered: ["list-decimal pl-[1.75rem]"],
			tasks: ["list-none pl-[0.5rem]"],
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

	const combinedClasses = cx(classFromProps, rest.className);
	const variant = combinedClasses?.includes("contains-task-list")
		? "tasks"
		: as === "ol"
			? "ordered"
			: "default";

	return (
		<Dynamic
			component={defaultTo("ul", as)}
			class={cx(listStyles({ variant }), classFromProps)}
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
			class={cx(listItemStyles(), className, "list")}
			{...rest}
		>
			{props.children}
		</Dynamic>
	);
}
