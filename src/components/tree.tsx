// Folder Tree from andi.dev
// https://github.com/andi23rosca/andi.dev/blob/main/src/components/Tree.tsx

import { For, Show } from "solid-js";
import type { JSX } from "solid-js";

type Node = { l: string; c: TreeNode[] };
type TreeNode = string | Node;

interface TreeProps extends JSX.HTMLAttributes<HTMLUListElement> {
	tree: TreeNode;
}

function Subtree(props: TreeProps) {
	return (
		<Show
			when={typeof props.tree !== "string"}
			fallback={<li>{props.tree as string}</li>}
		>
			<li>
				<span>{(props.tree as Node).l}</span>
				<ul class="incremental">
					<For each={(props.tree as Node).c}>{(c) => <Subtree tree={c} />}</For>
				</ul>
			</li>
		</Show>
	);
}

export function Tree(props: Readonly<TreeProps>): JSX.Element {
	return (
		<ul class="tree mb-8 font-mono [&>li>span]:font-bold">
			<Subtree tree={props.tree} />
		</ul>
	);
}
