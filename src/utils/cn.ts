import { twMerge } from "tailwind-merge";
import { cx } from "class-variance-authority";

type ClassValue =
	| string
	| number
	| null
	| boolean
	| undefined
	| ClassValue[]
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	| { [key: string]: any };

export function cn(...inputs: ClassValue[]) {
	return twMerge(cx(inputs));
}
