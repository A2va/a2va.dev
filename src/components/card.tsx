import { type VariantProps, cva } from "class-variance-authority";
import { omit } from "solid-js";
import { type JSX, type ValidComponent, dynamic } from "@solidjs/web";

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
	const rest = omit(props, "as", "class");
	const Component = dynamic(
		() => defaultTo("article", props.as) as ValidComponent,
	);
	return (
		<Component class={cn(cardStyles(), props.class)} {...rest}>
			{props.children}
		</Component>
	);
}
