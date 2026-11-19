import { type ValidComponent, dynamic } from "@solidjs/web";

import { MdxComponents } from "./mdx";

/**
 * HTML elements MDX can emit through its component map. MDX resolves every
 * element through `_components`, so each tag needs a component rather than a
 * string tag name for Solid's compiler.
 */
const HTML_TAGS = [
	"a",
	"abbr",
	"address",
	"article",
	"aside",
	"b",
	"bdi",
	"bdo",
	"blockquote",
	"br",
	"button",
	"caption",
	"cite",
	"code",
	"col",
	"colgroup",
	"data",
	"dd",
	"del",
	"details",
	"dfn",
	"div",
	"dl",
	"dt",
	"em",
	"figcaption",
	"figure",
	"footer",
	"form",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"header",
	"hr",
	"i",
	"img",
	"input",
	"ins",
	"kbd",
	"label",
	"legend",
	"li",
	"main",
	"mark",
	"meter",
	"nav",
	"ol",
	"optgroup",
	"option",
	"output",
	"p",
	"picture",
	"pre",
	"progress",
	"q",
	"rp",
	"rt",
	"ruby",
	"s",
	"samp",
	"section",
	"select",
	"small",
	"source",
	"span",
	"strong",
	"sub",
	"summary",
	"sup",
	"table",
	"tbody",
	"td",
	"textarea",
	"tfoot",
	"th",
	"thead",
	"time",
	"tr",
	"u",
	"ul",
	"var",
	"video",
	"wbr",
] as const;

const defaultComponents: Record<string, ValidComponent> = {};
for (const tag of HTML_TAGS) {
	defaultComponents[tag] = dynamic(() => tag as ValidComponent, {
		static: true,
	});
}

/**
 * Component provider for compiled MDX, wired through `providerImportSource`.
 * MDX merges these over its built-in element mapping.
 */
export function useMDXComponents(
	components: Record<string, ValidComponent> = {},
): Record<string, ValidComponent> {
	return { ...defaultComponents, ...MdxComponents, ...components };
}
