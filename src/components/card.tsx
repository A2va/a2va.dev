import { type VariantProps, cva } from "class-variance-authority";
import { type JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { cn, defaultTo } from "~/utils";
import type { PolymorphicComponent } from "~/utils/types";

const cardStyles = cva([
	"card",
	"p-8 rounded-xl bg-content-warm-secondary border border-warm-7",
]);

type CardBaseProps = VariantProps<typeof cardStyles>;
interface CardProps
	extends PolymorphicComponent<HTMLDivElement>,
		CardBaseProps {}

export function Card(props: Readonly<CardProps>): JSX.Element {
	const [{ as, class: className }, rest] = splitProps(props, ["as", "class"]);
	return (
		<Dynamic
			component={defaultTo("article", as)}
			class={cn(cardStyles(), className)}
			{...rest}
		>
			{props.children}
		</Dynamic>
	);
}
