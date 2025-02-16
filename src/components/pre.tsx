import { cx } from "class-variance-authority";
import { type JSX, Show, createSignal, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { IconButton } from "./button";
import { Copy } from "./icons";

import { Text } from "./typography/text";

export interface PreProps extends JSX.HTMLAttributes<HTMLPreElement> {
	file?: string;
	lines?: string;
	start?: string;
}
// https://github.com/solidjs-community/solid-primitives/tree/main/packages/selection

// Global signal to track the currently selected element
const [selectedNode, setSelectedNode] = createSignal<HTMLElement | null>(null);

if (!isServer) {
	const selectionHandler = () => {
		const selection = document.getSelection();
		const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
		const node = range?.commonAncestorContainer as HTMLElement;

		// Test for not empty selection
		if (range?.startOffset !== range?.endOffset) {
			setSelectedNode(node);
			return;
		}
		setSelectedNode(null);
	};

	document.addEventListener("selectionchange", selectionHandler);
}

export function Pre(props: PreProps) {
	const [copied, setCopied] = createSignal(false);
	const [isScrolling, setIsScrolling] = createSignal(false);
	let ref!: HTMLPreElement;
	let scrollTimeout: NodeJS.Timeout;

	const onCopy = () => {
		setCopied(true);
		navigator.clipboard.writeText(ref.innerText);
		setTimeout(() => setCopied(false), 1500);
	};

	onMount(() => {
		ref.addEventListener("scroll", () => {
			setIsScrolling(true);
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
		});

		ref.addEventListener("wheel", (e) => {
			if (e.shiftKey) {
				setIsScrolling(true);
				clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
			}
		});
	});

	const isSelected = () => {
		if (!selectedNode()) return false;
		return ref.contains(selectedNode());
	};

	return (
		<div class="pt-1 pb-2">
			<div class="rounded-md overflow-hidden pre-container group">
				<Show when={props.file}>
					<div class="flex pl-1 bg-warm-3 justify-between px-1 leading-1">
						<Text class="font-bold">{props.file?.replace(/"/g, "")}</Text>
					</div>
				</Show>
				<div class="bg-warm-2 pl-1 relative">
					<div
						class={cx(
							"absolute top-1 right-1 transition-opacity duration-200",
							isSelected() || isScrolling() ? "opacity-0" : "opacity-100",
						)}
					>
						<IconButton
							size={"sm"}
							icon={<Copy />}
							aria-label="Copy code"
							onClick={onCopy}
						/>
					</div>
					<pre
						class={cx(
							"shiki overflow-x-auto",
							(props.lines?.replace(/['"]+/g, '') === "true") ? "code-lines" : "",
						)}
						style={{ "--starting-line": props.start?.replace(/['"]+/g, '') }}
						ref={ref}
					>
						{props.children}
					</pre>
				</div>
			</div>
		</div >
	);
}
