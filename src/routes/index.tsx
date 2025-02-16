import { Anchor, Page, Typography } from "~/components";

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
		</Page>
	);
}
