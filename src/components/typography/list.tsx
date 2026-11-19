import { type VariantProps, cva } from "class-variance-authority";
import { createMemo, omit } from "solid-js";
import { type JSX, type ValidComponent, dynamic } from "@solidjs/web";

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
	const rest = omit(props, "as", "class");
	const Component = dynamic(() => defaultTo("ul", props.as) as ValidComponent);

	const variant = createMemo(() => {
		const combinedClasses = cn(props.class);
		return combinedClasses?.includes("contains-task-list")
			? "tasks"
			: props.as === "ol"
				? "ordered"
				: "default";
	});

	return (
		<Component
			class={cn(listStyles({ variant: variant() }), props.class)}
			{...rest}
		>
			{props.children}
		</Component>
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
	const rest = omit(props, "as", "class");
	const Component = dynamic(() => defaultTo("li", props.as) as ValidComponent);
	return (
		<Component class={cn(listItemStyles(), props.class, "list")} {...rest}>
			{props.children}
		</Component>
	);
}
