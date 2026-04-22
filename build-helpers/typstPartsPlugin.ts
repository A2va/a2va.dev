import path from "node:path";

import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
import { readSync } from "to-vfile";
import { matter } from "vfile-matter";

import type { Plugin, ResolvedConfig } from "vite";

const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;
const VIRTUAL_SUFFIX = ".typst-parts.js";

function normalizePath(filePath: string): string {
	return path.normalize(filePath).replace(/\\/g, "/");
}

function toFsPath(rootPath: string, source: string, importer?: string): string {
	const filePath = source.replace(/\?parts$/, "");

	if (filePath.startsWith("/")) {
		return path.join(rootPath, filePath.slice(1));
	}

	if (importer) {
		const importerPath = importer.split("?", 1)[0];
		return path.resolve(path.dirname(importerPath), filePath);
	}

	return path.resolve(rootPath, filePath);
}

export function typstPartsPlugin(): Plugin {
	let rootPath = process.cwd();
	let compiler = NodeCompiler.create({ workspace: rootPath });

	return {
		name: "typst-parts",
		enforce: "pre",
		configResolved(config: ResolvedConfig) {
			rootPath = config.root;
			compiler = NodeCompiler.create({ workspace: rootPath });
		},
		resolveId(source, importer) {
			if (!source.endsWith(".typ?parts")) {
				return null;
			}

			return `${normalizePath(toFsPath(rootPath, source, importer))}${VIRTUAL_SUFFIX}`;
		},
		load(id) {
			if (!id.endsWith(VIRTUAL_SUFFIX)) {
				return null;
			}

			const filePath = id.slice(0, -VIRTUAL_SUFFIX.length);
			const file = readSync(filePath);
			matter(file);

			this.addWatchFile(filePath);

			const strippedSource = String(file).replace(FRONTMATTER_RE, "");
			compiler.mapShadow(filePath, Buffer.from(strippedSource));

			try {
				const result = compiler.tryHtml({ mainFilePath: filePath });
				if (result.hasError() || !result.result) {
					result.printDiagnostics();
					throw new Error(`Failed to compile ${filePath}`);
				}

				const frontmatter = (file.data.matter ?? {}) as {
					description?: string;
					title?: string;
				};

				const parts = {
					body: result.result.body(),
					title: frontmatter.title ?? result.result.title() ?? null,
					description:
						frontmatter.description ?? result.result.description() ?? null,
				};

				return `const parts = ${JSON.stringify(parts)};
export const body = parts.body;
export const title = parts.title;
export const description = parts.description;
export default parts;
`;
			} finally {
				compiler.unmapShadow(filePath);
			}
		},
	};
}
