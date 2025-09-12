import { type JSX, createSignal, onMount } from "solid-js";

import { IconButton } from "~/components/button";
import { Moon, Sun, SunMoon } from "~/components/icons";

type Theme = "light" | "dark" | "system";

const DEFAULT_THEME: Theme = "system";

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
	const [theme, setTheme] = createSignal<Theme>(DEFAULT_THEME);

	onMount(() => {
		const theme = (window.theme?.current() as Theme) || DEFAULT_THEME;
		console.log("onMount", theme);
		setTheme(theme);
	});

	const onThemeToggle = () => {
		if (window.theme) {
			const themes: Theme[] = ["light", "dark", "system"];
			const current = (window.theme?.current() as Theme) || DEFAULT_THEME;

			const nextTheme = themes[(themes.indexOf(current) + 1) % themes.length];

			window.theme.set(nextTheme);
			setTheme(nextTheme);

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

	const icon = () => {
		if (theme() === "light") return <Sun aria-label="Toggle theme" />;
		if (theme() === "dark") return <Moon aria-label="Toggle theme" />;
		return <SunMoon aria-label="Toggle theme (system)" />;
	};

	return (
		<div class={props.class}>
			<IconButton
				id={props.id}
				icon={icon}
				title="Toggle theme"
				aria-label={
					theme() === "dark"
						? "Enable light mode"
						: theme() === "light"
							? "Enable system mode"
							: "Enable dark mode"
				}
				role="switch"
				size={"md"}
				variant={"tertiary"}
				class="h-12 w-12 duration-200 ease-in-out"
				onclick={onThemeToggle}
			/>
		</div>
	);
}
