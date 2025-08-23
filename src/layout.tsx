import { useLocation } from "@solidjs/router";
import { Anchor } from "~/components/anchor";
import { ColorModeSwitcher } from "~/components/theme";

import { Divider } from "~/components/divider";
import { Typography } from "~/components/typography";

import { A2va, At } from "~/components/icons";

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
		<footer
			id="footer"
			class="container mx-auto p-5 pb-12 pt-0 transition-[max-width] duration-200 ease-in-out"
		>
			<Divider size="lg" />
			<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
				<div class="flex flex-col gap-2">
					<A2va class="h-9 w-18 fill-primary" />
					<Typography.Paragraph class="text-center" variant={"subdued"}>
						at·ou·va
					</Typography.Paragraph>
				</div>
				<div class="flex justify-center gap-6 sm:items-center md:gap-10">
					<Anchor onClick={() => window.scrollTo(0, 0)} variant="distinguished">
						Back to top
					</Anchor>
				</div>
			</div>
		</footer>
	);
}
