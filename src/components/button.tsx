import { type VariantProps, cva, cx } from "class-variance-authority";
import { type JSX, Show, splitProps } from "solid-js";

export const buttonStyles = cva(
	[
		"button",
		"inline-flex items-center justify-center gap-2 rounded-md text-base font-medium ring-offset-background whitespace-nowrap",
		"transition-colors motion-reduce:transition-none duration-150 ease-in-out",
		"disabled:pointer-events-none disabled:opacity-50",
	],
	{
		variants: {
			variant: {
				primary:
					"text-warm-1 bg-warm-inverse-1 hover:bg-warm-inverse-6 active:bg-warm-inverse-8",
				secondary:
					"text-warm-12 bg-warm-3 hover:bg-warm-5 active:bg-warm-6 border border-warm-7",
				tertiary: "bg-transparent hover:bg-warm-5 active:bg-warm-6",
				placeholder:
					"border-warm-12 border-dashed border bg-transparent hover:bg-warm-5 active:bg-warm-6",
			},
			size: {
				sm: "text-sm px-3 py-4 h-9",
				md: "text-base px-4 py-3.5 h-11",
				lg: "text-lg px-5 py-4 w-full h-14",
			},
			intent: {
				warm: [],
				success: [],
				warning: [],
				danger: [],
			},
		},
		compoundVariants: [
			// Success
			{
				variant: "primary",
				intent: "success",
				class:
					"text-success-1 bg-success-9 hover:bg-success-10 active:bg-success-11",
			},
			{
				variant: "secondary",
				intent: "success",
				class:
					"text-success-11 bg-success-3 hover:bg-success-4 active:bg-success-5 border border-success-7",
			},
			{
				variant: "tertiary",
				intent: "success",
				class:
					"text-success-11 bg-transparent hover:bg-success-4 active:bg-success-5",
			},
			{
				variant: "placeholder",
				intent: "success",
				class:
					"text-success-11 border-success-11 border-solid border bg-transparent hover:bg-success-4 active:bg-success-5",
			},
		],
		defaultVariants: {
			variant: "secondary",
			size: "md",
			intent: "warm",
		},
	},
);

type ButtonBaseProps = VariantProps<typeof buttonStyles>;
interface ButtonProps
	extends JSX.HTMLAttributes<HTMLButtonElement>,
		ButtonBaseProps {
	leadingIcon?: JSX.Element;
	trailingIcon?: JSX.Element;
}

/**
 * Follow Uber Base principles:
 * @see https://base.uber.com/6d2425e9f/p/756216-button/b/336373
 */
export function Button(props: Readonly<ButtonProps>): JSX.Element {
	const [{ variant, size, intent, class: className }, rest] = splitProps(
		props,
		["variant", "size", "class", "intent"],
	);

	return (
		<button
			class={cx(buttonStyles({ variant, size, intent }), className)}
			{...rest}
		>
			<Show when={props.leadingIcon}>
				<IconContainer>{props.leadingIcon}</IconContainer>
			</Show>
			{props.children}
			<Show when={props.trailingIcon}>
				<IconContainer>{props.trailingIcon}</IconContainer>
			</Show>
		</button>
	);
}

const iconButtonStyles = cva(["IconButton"], {
	variants: {
		size: {
			sm: "w-9 h-9 p-4",
			md: "w-11 h-11 p-3.5",
			lg: "w-14 h-14 p-4",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface IconButtonProps extends Omit<ButtonProps, "children"> {
	children?: never;
	icon: JSX.Element;
	"aria-label": string;
}

export function IconButton(props: Readonly<IconButtonProps>): JSX.Element {
	const [{ variant, size, intent, icon, class: className }, rest] = splitProps(
		props,
		["icon", "class", "variant", "size", "intent"],
	);

	return (
		<button
			class={cx(
				buttonStyles({ variant, size, intent }),
				iconButtonStyles({ size }),
				className,
			)}
			{...rest}
		>
			<IconContainer>{icon}</IconContainer>
		</button>
	);
}

function IconContainer(
	props: Readonly<JSX.HTMLAttributes<HTMLDivElement>>,
): JSX.Element {
	return <div>{props.children}</div>;
}
