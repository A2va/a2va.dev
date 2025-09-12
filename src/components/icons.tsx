import type { JSX, JSXElement } from "solid-js";

/**
 *  The following icons are from the Lucide icon set.
 * @url https://lucide.dev/
 * @instructions Make sure to use 1em as the width and height.
 */

export function ArrowUp(
	props: Readonly<JSX.HTMLAttributes<SVGSVGElement>>,
): JSXElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			{...props}
		>
			<title>ArrowUp</title>
			<path d="m5 12 7-7 7 7" />
			<path d="M12 19V5" />
		</svg>
	);
}

export function Github(
	props: Readonly<JSX.HTMLAttributes<SVGSVGElement>>,
): JSXElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-github"
			{...props}
		>
			<title>GitHub</title>
			<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
			<path d="M9 18c-4.51 2-5-2-7-2" />
		</svg>
	);
}

export function LinkedIn(
	props: Readonly<JSX.HTMLAttributes<SVGSVGElement>>,
): JSXElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-linkedin"
			{...props}
		>
			<title>LinkedIn</title>
			<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
			<rect width="4" height="12" x="2" y="9" />
			<circle cx="4" cy="4" r="2" />
		</svg>
	);
}

export function Copy(
	props: Readonly<JSX.HTMLAttributes<SVGSVGElement>>,
): JSXElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-copy"
			{...props}
		>
			<title>Copy</title>
			<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
			<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
		</svg>
	);
}

export function Sun(
	props: Readonly<JSX.HTMLAttributes<SVGSVGElement>>,
): JSXElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-sun"
			{...props}
		>
			<title>Sun</title>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2" />
			<path d="M12 20v2" />
			<path d="m4.93 4.93 1.41 1.41" />
			<path d="m17.66 17.66 1.41 1.41" />
			<path d="M2 12h2" />
			<path d="M20 12h2" />
			<path d="m6.34 17.66-1.41 1.41" />
			<path d="m19.07 4.93-1.41 1.41" />
		</svg>
	);
}

export function Moon(
	props: Readonly<JSX.HTMLAttributes<SVGSVGElement>>,
): JSXElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-moon"
			{...props}
		>
			<title>Moon</title>
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
		</svg>
	);
}

export function SunMoon(props: Readonly<JSX.HTMLAttributes<SVGSVGElement>>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-sun-moon-icon lucide-sun-moon"
		>
			<title>SunMoon</title>
			<path d="M12 2v2" />
			<path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715" />
			<path d="M16 12a4 4 0 0 0-4-4" />
			<path d="m19 5-1.256 1.256" />
			<path d="M20 12h2" />
		</svg>
	);
}

// This icon isn't coming from lucide, but from the Bluesky codebase
// https://github.com/bluesky-social/social-app/blob/main/assets/icons/at_stroke2_corner0_rounded.svg
// https://github.com/bluesky-social/social-app/blob/main/LICENSE
export function At(
	props: Readonly<JSX.HTMLAttributes<SVGSVGElement>>,
): JSXElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-at"
			{...props}
		>
			<title>At</title>
			<path
				fill-rule="evenodd"
				d="M12 4a8 8 0 1 0 4.21 14.804 1 1 0 0 1 1.054 1.7A9.96 9.96 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 1.104-.27 2.31-.949 3.243-.716.984-1.849 1.6-3.331 1.465a4.2 4.2 0 0 1-2.93-1.585c-.94 1.21-2.388 1.94-3.985 1.715-2.53-.356-4.04-2.91-3.682-5.458s2.514-4.586 5.044-4.23c.905.127 1.68.536 2.286 1.126a1 1 0 0 1 1.964.368l-.515 3.545v.002a2.22 2.22 0 0 0 1.999 2.526c.75.068 1.212-.21 1.533-.65.358-.493.566-1.245.566-2.067a8 8 0 0 0-8-8Zm-.112 5.13c-1.195-.168-2.544.819-2.784 2.529s.784 3.03 1.98 3.198 2.543-.819 2.784-2.529-.784-3.03-1.98-3.198Z"
				clip-rule="evenodd"
			/>
		</svg>
	);
}

export function A2va(
	props: Readonly<JSX.HTMLAttributes<SVGSVGElement>>,
): JSXElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 24"
			fill="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-a2va"
			{...props}
		>
			<title>A2va</title>
			<g>
				<path
					fill-rule="evenodd"
					d="M12 4a8 8 0 1 0 4.21 14.804 1 1 0 0 1 1.054 1.7A9.96 9.96 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 1.104-.27 2.31-.949 3.243-.716.984-1.849 1.6-3.331 1.465a4.2 4.2 0 0 1-2.93-1.585c-.94 1.21-2.388 1.94-3.985 1.715-2.53-.356-4.04-2.91-3.682-5.458s2.514-4.586 5.044-4.23c.905.127 1.68.536 2.286 1.126a1 1 0 0 1 1.964.368l-.515 3.545v.002a2.22 2.22 0 0 0 1.999 2.526c.75.068 1.212-.21 1.533-.65.358-.493.566-1.245.566-2.067a8 8 0 0 0-8-8Zm-.112 5.13c-1.195-.168-2.544.819-2.784 2.529s.784 3.03 1.98 3.198 2.543-.819 2.784-2.529-.784-3.03-1.98-3.198Z"
					clip-rule="evenodd"
				/>
				<rect
					x="25.65"
					y="2.1092"
					width="2.0321"
					height="20.585"
					ry="1.08"
					stroke-width=".30971"
				/>
				<rect
					transform="matrix(.99888 -.047253 .037347 .9993 0 0)"
					x="43.87"
					y="4.9905"
					width="2.035"
					height="19.82"
					ry="1.0399"
					stroke-width=".30412"
				/>
			</g>
			<g transform="translate(-1.9375 .69102)" stroke-width=".30292">
				<rect
					transform="matrix(.95559 -.2947 .28585 .95827 0 0)"
					x="29.459"
					y="11.946"
					width="2.035"
					height="19.664"
					ry="1.0317"
				/>
				<rect
					transform="matrix(.96047 .27839 -.28726 .95785 0 0)"
					x="44.5"
					y="-10.624"
					width="2.035"
					height="19.664"
					ry="1.0317"
				/>
			</g>
			<rect
				transform="matrix(.0034511 .99999 -.99968 .025328 0 0)"
				x="16.444"
				y="-44.46"
				width="1.0425"
				height="2.3104"
				ry=".12121"
				stroke-width=".074318"
			/>
		</svg>
	);
}
