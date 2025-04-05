import { For } from "solid-js";
import { Anchor, Page, Typography } from "~/components";
import { ProjectCard } from "~/components/project-card";
import { Project } from "~/utils/types";

const PROJECTS: Project[] = [
	{
		name: "XMake",
		url: "https://xmake.io",
		description:
			"A cross-platform build utility based on the Lua language that provides a Cargo like experience for C++. I'm one of its contributors since 2022.",
		logo: "projects/xmake.svg",
	},
	{
		name: "XMake-Rs",
		url: "https://github.com/A2va/xmake-rs",
		description:
			"A build dependency for running the xmake build tool to compile native library.",
		logo: "projects/xmake-rs.svg",
	},
];

export default function Home() {
	return (
		<Page
			title="Home"
			description="Hey I'm A2va, in my spare time I'm also a contributor to many open source projects"
			reverse
		>
			<section
				class="mt-12"
				aria-labelledby="intro"
				aria-describedby="intro-description"
			>
				<Typography.Display id="intro" size="sm">
					About Me 👋🏻
				</Typography.Display>
				<Typography.Paragraph
					id="intro-description"
					size="lg"
					variant="subdued"
					class="mt-16"
				>
					Hi, I'm A2va, I'm currently studying for a Bachelor's degree in
					Computer Science, and in my spare time I work on projects that I hope
					will be useful to others. My projects are quite diverse as I enjoy
					exploring and testing new ideas. That's where my pseudonym "A2va"
					comes from, inspired by the French phrase "à tout va", which literally
					means "in all directions".
				</Typography.Paragraph>
				<Typography.Paragraph size="lg" variant="subdued" class="mt-5">
					In my spare time, I'm also a contributor to many open source projects,
					but mainly to{" "}
					<Anchor href="https://xmake.io" external>
						XMake
					</Anchor>
					, a Lua-based build system focused on C and C++. I also have a few
					other projects that you can check out on my GitHub.
				</Typography.Paragraph>
			</section>
			<section class="mt-12">
				<Typography.Display id="intro" size="sm">
					Projects
				</Typography.Display>
				<div class="mt-8 grid w-full grid-cols-1 gap-5">
					<For each={PROJECTS}>
						{(project) => <ProjectCard project={project} />}
					</For>
				</div>
			</section>
		</Page>
	);
}
