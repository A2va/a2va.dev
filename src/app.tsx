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
				const storedTheme = localStorage.getItem("theme");
				if (storedTheme) return storedTheme;
				if (matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
				return "light";
			},
			current: () => document.documentElement.getAttribute("color-scheme"),
			set: (theme: string) => {
				document.documentElement.setAttribute("color-scheme", theme);
				localStorage.setItem("theme", theme);
				return theme;
			},
		};
		(window as any).theme = theme;
		theme.set(theme.initial());
	});

	return (
		<Router
			root={(props) => (
				<>
					<div
						id="wrapping-div"
						class="mx-auto flex min-h-screen max-w-4xl flex-col"
					>
						<Header />
						<main
							id="main-content"
							class="container mx-auto flex-1 px-5 transition-[max-width] duration-200 ease-in-out"
						>
							<Suspense>{props.children}</Suspense>
						</main>
						<Footer />
					</div>
				</>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
