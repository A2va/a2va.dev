import { type VariantProps, cva, cx } from "class-variance-authority";
import { type JSX, Show, createSignal, splitProps } from "solid-js";

// Updated tooltip styles with arrow variants
const tooltipStyles = cva(
	[
		"absolute",
		"rounded-md",
		"px-3",
		"py-2",
		"bg-primary-7",
		"bg-opacity-100",
		"text-white",
		"after:absolute",
		"after:block",
		"after:border-[4px]",
		"after:border-solid",
		'after:content-[""]',
		"max-w-[300px]",
		"w-max",
		"z-50",
	],
	{
		defaultVariants: {
			position: "top",
			size: "md",
		},
		variants: {
			position: {
				top: [
					"bottom-full",
					"mb-2",
					"left-1/2",
					"-translate-x-1/2",
					"after:-bottom-2",
					"after:left-1/2",
					"after:-translate-x-1/2",
					"after:border-t-primary-7",
					"after:border-x-transparent",
					"after:border-b-transparent",
				],
				bottom: [
					"top-full",
					"mt-2",
					"left-1/2",
					"-translate-x-1/2",
					"after:-top-2",
					"after:left-1/2",
					"after:-translate-x-1/2",
					"after:border-b-primary-7",
					"after:border-x-transparent",
					"after:border-t-transparent",
				],
				left: [
					"right-full",
					"mr-2",
					"top-1/2",
					"-translate-y-1/2",
					"after:-right-[7px]",
					"after:top-1/2",
					"after:-translate-y-1/2",
					"after:border-l-primary-7",
					"after:border-y-transparent",
					"after:border-r-transparent",
				],
				right: [
					"left-full",
					"ml-2",
					"top-1/2",
					"-translate-y-1/2",
					"after:-left-2",
					"after:top-1/2",
					"after:-translate-y-1/2",
					"after:border-r-primary-7",
					"after:border-y-transparent",
					"after:border-l-transparent",
				],
			},
			size: {
				sm: ["text-xs"],
				md: ["text-sm"],
				lg: ["text-base"],
			},
		},
	},
);

type TooltipBaseProps = VariantProps<typeof tooltipStyles>;
interface TooltipProps
	extends JSX.HTMLAttributes<HTMLDivElement>,
		TooltipBaseProps {
	content: string;
}

export function Tooltip(props: Readonly<TooltipProps>): JSX.Element {
	const [isVisible, setIsVisible] = createSignal(false);
	const [{ position, size, content }, rest] = splitProps(props, [
		"position",
		"size",
		"content",
	]);

	return (
		<div
			class="relative inline-block mb-5"
			onPointerEnter={() => setIsVisible(true)}
			onPointerLeave={() => setIsVisible(false)}
			onPointerDown={() => setIsVisible(true)}
			onClick={() => setIsVisible(false)}
			{...rest}
		>
			{props.children}
			<div
				classList={{
					[tooltipStyles({ position, size })]: true,
					"opacity-0 scale-95 pointer-events-none": !isVisible(),
					"opacity-100 scale-100 pointer-events-auto": isVisible(),
					"transition-all duration-150 ease-out": true,
					"text-center": true,
				}}
			>
				{content}
			</div>
		</div>
	);
}

export function StarTooltip(props: Readonly<TooltipProps>): JSX.Element {
	return (
		<Tooltip {...props}>
			<span class="font-bold">*</span>
		</Tooltip>
	);
}
