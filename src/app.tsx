import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, onMount } from "solid-js";

import { Footer, Header } from "./layout";
import "./app.css";

export default function App() {
	// Theme gloal state
	onMount(() => {
		const theme = {
			initial: () => {
				console.log(document.documentElement.getAttribute("color-scheme"));
				const storedTheme = localStorage.getItem("theme");
				if (storedTheme) return storedTheme;
				return "system";
			},
			current: () => {
				const theme = localStorage.getItem("theme");
				if (theme) {
					return theme;
				}
				return "system";
			},
			preferred: () =>
				window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light",
			set: (themeValue: string) => {
				localStorage.setItem("theme", themeValue);
				const scheme = themeValue === "system" ? theme.preferred() : themeValue;
				document.documentElement.setAttribute("color-scheme", scheme);
			},
		};
		(window as any).theme = theme;
		theme.set(theme.initial());

		// Listen for system theme changes
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const systemThemeListener = () => {
			if (theme.current() === "system") {
				theme.set("system");
			}
		};
		media.addEventListener("change", systemThemeListener);
	});

	return (
		<Router
			root={(props) => (
				<>
					<Header />
					<main
						id="main-content"
						class="mx-auto flex flex-1 min-h-screen max-w-4xl flex-col container px-5 transition-[max-width] duration-200 ease-in-out"
					>
						<Suspense>{props.children}</Suspense>
					</main>
					<Footer />
				</>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
