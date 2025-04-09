import { JSX, Match, Show, splitProps, Switch } from "solid-js";

import { Anchor, Badge, Card, Image, Typography } from "~/components";
import { hyphenate } from "~/utils/hyphenate";
import { Project } from "~/utils/types";

const ABBREVIATIONS = {
	WIP: "Work in progress",
};

interface ProjectCardProps {
	project: Readonly<Project>;
}

export function ProjectCard(props: Readonly<ProjectCardProps>): JSX.Element {
	const [{ project }, rest] = splitProps(props, ["project"]);
	const hyphenatedSlug = hyphenate(project.name);

	return (
		<Anchor noStyle href={project.url} external class="group">
			<Card
				id={hyphenatedSlug}
				aria-labelledby={`${hyphenatedSlug}-title`}
				class={
					"flex gap-4 group-hover:bg-warm-4 group-focus:bg-warm-4 group-focus:outline group-focus:outline-2 group-focus:outline-offset-2"
				}
				{...rest}
			>
				<Show when={project.logo}>
					{(logo) => (
						<Image
							src={logo()}
							alt={`${project.name} logo`}
							class="h-16 w-16 rounded-lg"
						/>
					)}
				</Show>
				<div>
					<div class="flex items-center gap-[1.5ch]">
						<Typography.Heading
							as="h3"
							id={`${hyphenatedSlug}-title`}
							size="sm"
							hideAnchor
						>
							{project.name}
						</Typography.Heading>
						<Show when={project.status}>
							{(status) => (
								<Match when={status() === "wip"}>
									<Badge intent={"warning"} size={"sm"}>
										<abbr title={ABBREVIATIONS.WIP}>
											{status().toUpperCase()}
										</abbr>
									</Badge>
								</Match>
							)}
						</Show>
					</div>
					<Typography.Paragraph size="md" variant="subdued" class="mt-2">
						{project.description}
					</Typography.Paragraph>
				</div>
			</Card>
		</Anchor>
	);
}
