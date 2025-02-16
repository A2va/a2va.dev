import { cx } from "class-variance-authority";
import { type JSX, createSignal, onMount } from "solid-js";

import { IconButton } from "~/components/button";
import { Moon, Sun } from "~/components/icons";

type Theme = "light" | "dark";

const DEFAULT_THEME: Theme = "light";

declare global {
	interface Window {
		theme?: {
			initial: () => Theme;
			current: () => Theme;
			set: (theme: Theme) => Theme;
		};
	}
}

export function ColorModeSwitcher(
	props: Readonly<{ id: string; class?: string }>,
): JSX.Element {
	const [isDark, setIsDark] = createSignal(false);

	onMount(() => {
		setIsDark(window.theme?.current() === "dark");
	});

	const onThemeToggle = () => {
		if (window.theme) {
			const theme = window.theme.current();
			const nextTheme = theme === "dark" ? "light" : "dark";
			window.theme.set(nextTheme);
			setIsDark(nextTheme === "dark");

			const themeToggle = document.getElementById("theme-toggle");
			const themeToggleMobile = document.getElementById("theme-toggle-mobile");
			for (const element of [themeToggle, themeToggleMobile]) {
				element?.setAttribute(
					"aria-checked",
					nextTheme === "dark" ? "true" : "false",
				);
			}
		}
	};

	return (
		<IconButton
			id={props.id}
			icon={() =>
				isDark() ? (
					<Sun aria-label="Toggle theme" />
				) : (
					<Moon aria-label="Toggle theme" />
				)
			}
			title="Toggle theme"
			aria-label={isDark() ? "Enable light mode" : "Enable dark mode"}
			aria-checked={isDark()}
			role="switch"
			size={"md"}
			variant={"tertiary"}
			class={cx("h-12 w-12 duration-200 ease-in-out", props.class)}
			onclick={onThemeToggle}
		/>
	);
}
