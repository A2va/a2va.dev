import { Loading, onSettled, type ParentProps } from "solid-js";
import { isServer } from "@solidjs/web";

import { Footer, Header } from "./layout";
import { Router } from "./router";
import type { Theme } from "./utils/types";
import "./app.css";

export default function App() {
	// Theme global state. Registered on both sides so the hydration id
	// namespace stays aligned; the server has no browser work to do.
	onSettled(() => {
		if (isServer) return;
		const theme = {
			initial: (): Theme => {
				const storedTheme = localStorage.getItem("theme");
				if (
					storedTheme === "light" ||
					storedTheme === "dark" ||
					storedTheme === "system"
				) {
					return storedTheme;
				}
				return "system";
			},
			current: (): Theme => {
				const theme = localStorage.getItem("theme");
				if (theme === "light" || theme === "dark" || theme === "system") {
					return theme;
				}
				return "system";
			},
			preferred: () =>
				window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light",
			set: (themeValue: Theme) => {
				localStorage.setItem("theme", themeValue);
				const scheme = themeValue === "system" ? theme.preferred() : themeValue;
				document.documentElement.setAttribute("color-scheme", scheme);
			},
		};
		window.theme = theme;
		theme.set(theme.initial());

		// Listen for system theme changes
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const systemThemeListener = () => {
			if (theme.current() === "system") {
				theme.set("system");
			}
		};
		media.addEventListener("change", systemThemeListener);

		return () => media.removeEventListener("change", systemThemeListener);
	});

	return (
		<Router>
			{(props: ParentProps) => (
				<div class="flex flex-col min-h-screen">
					<Header />
					<main
						id="main-content"
						class="mx-auto flex flex-1 max-w-4xl flex-col container px-5 transition-[max-width] duration-200 ease-in-out"
					>
						<Loading>{props.children}</Loading>
					</main>
					<Footer />
				</div>
			)}
		</Router>
	);
}
