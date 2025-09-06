import { useLocation } from "@solidjs/router";
import { createSignal, onCleanup, onMount, Show } from "solid-js";
import { isServer } from "solid-js/web";

import { Anchor } from "~/components/anchor";
import { ColorModeSwitcher } from "~/components/theme";
import { Divider } from "~/components/divider";
import { Typography } from "~/components/typography";
import { A2va, ArrowUp, At } from "~/components/icons";
import { IconButton } from "./components";

interface NavLinkProps {
	href: string;
	label: string;
}

function NavLink(props: NavLinkProps) {
	const location = useLocation();
	const active = (path: string) =>
		path === location.pathname ? "border-primary-7" : "border-transparent";

	return (
		<Typography.Text class={`border-b-2 ${active(props.href)}`} as="li">
			<Anchor
				href={props.href}
				variant="subtle"
				interactive={location.pathname !== props.href}
				aria-current="page"
			>
				{props.label}
			</Anchor>
		</Typography.Text>
	);
}

function BackToTopButton() {
	const [showButton, setShowButton] = createSignal(false);
	const [scrollProgress, setScrollProgress] = createSignal(0);

	const radius = 18;
	const circumference = 2 * Math.PI * radius;

	if (!isServer) {
		const handleScroll = () => {
			// Show button after scrolling down 400px
			setShowButton(window.scrollY > 400);

			// Calculate scroll progress
			const { scrollTop, scrollHeight, clientHeight } =
				document.documentElement;
			const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
			setScrollProgress(Math.min(scrollPercent, 100));
		};

		onMount(() => window.addEventListener("scroll", handleScroll));
		onCleanup(() => window.removeEventListener("scroll", handleScroll));
	}

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			type="button"
			onClick={scrollToTop}
			title="Back to top"
			aria-label="Back to top"
			class={`fixed bottom-8 right-8 z-50 hidden h-12 w-12 items-center justify-center rounded-full bg-warm-2 text-primary-9 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-7 focus-visible:ring-offset-2 focus-visible:ring-offset-warm-1 sm:flex ${
				showButton()
					? "opacity-100 scale-100"
					: "opacity-0 scale-95 pointer-events-none"
			}`}
		>
			<svg
				class="absolute top-0 left-0 h-full w-full -rotate-90"
				viewBox="0 0 40 40"
			>
				<title>GoUp</title>
				{/* Background Circle */}
				<circle
					class="stroke-warm-4"
					stroke-width="3"
					fill="transparent"
					r={radius}
					cx="20"
					cy="20"
				/>
				{/* Progress Circle */}
				<circle
					class="stroke-primary-8 transition-all duration-300 ease-linear"
					stroke-width="3"
					stroke-dasharray={`${circumference}`}
					stroke-dashoffset={`${circumference - (scrollProgress() / 100) * circumference}`}
					stroke-linecap="round"
					fill="transparent"
					r={radius}
					cx="20"
					cy="20"
				/>
			</svg>
			<ArrowUp class="z-10 h-6 w-6" />
		</button>
	);
}

export function Header() {
	return (
		<div
			class="sticky top-0 z-50 w-full
			bg-warm-1 shadow-sm transition-colors duration-150 ease-in-out"
		>
			<header
				id="header"
				class="sticky top-0 z-50 container mx-auto p-5 transition-[max-width] duration-200 ease-in-out backdrop-blur-sm"
			>
				<nav
					id="main-nav"
					aria-label="Main"
					class="sticky flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
				>
					<div class="flex items-center justify-between">
						<a href="/" title="Home">
							<At class="h-9 w-9 fill-primary" />
						</a>
						<ColorModeSwitcher id="theme-toggle-mobile" class="sm:hidden" />
					</div>
					<div class="flex flex-1 items-center gap-4 sm:justify-end">
						<ul class="flex flex-1 justify-center items-center gap-6">
							<NavLink href="/" label="Home" />
							<NavLink href="/blog" label="Blog" />
						</ul>
						<ColorModeSwitcher id="theme-toggle" class="hidden sm:block" />
					</div>
				</nav>
			</header>
		</div>
	);
}

export function Footer() {
	return (
		<>
			<BackToTopButton class />
			<footer
				id="footer"
				class="container mx-auto p-5 pb-12 pt-0 transition-[max-width] duration-200 ease-in-out"
			>
				<Divider size="lg" />
				<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
					<div class="flex flex-col items-center gap-2">
						<A2va class="h-9 w-18 fill-primary" />
						<Typography.Paragraph class="text-center" variant={"subdued"}>
							at·ou·va
						</Typography.Paragraph>
					</div>
					<div class="flex justify-center gap-6 sm:hidden sm:items-center md:gap-10">
						<Anchor
							onClick={() => window.scrollTo(0, 0)}
							variant="distinguished"
						>
							Back to top
						</Anchor>
					</div>
				</div>
			</footer>
		</>
	);
}
