import fs from "node:fs";
import path from "node:path";

import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
import { readSync } from "to-vfile";
import { matter } from "vfile-matter";

const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

export const BLOG_POSTS_DIR = path.join("src", "routes", "blog", "(post)");

export interface TypstFrontmatter {
	title?: string;
	description?: string;
	[key: string]: unknown;
}

export interface TypstPost {
	slug: string;
	file: string;
	body: string;
	title: string | null;
	description: string | null;
}

interface CachedPost {
	mtimeMs: number;
	size: number;
	post: TypstPost;
}

const compiledPosts = new Map<string, CachedPost>();
const compilers = new Map<string, NodeCompiler>();

function normalizePath(filePath: string): string {
	return path.normalize(filePath).replace(/\\/g, "/");
}

function walkFiles(dir: string): string[] {
	if (!fs.existsSync(dir)) {
		return [];
	}

	return fs.readdirSync(dir).flatMap((file) => {
		const fullPath = path.join(dir, file);
		const stat = fs.statSync(fullPath);
		if (stat.isDirectory()) {
			return walkFiles(fullPath);
		}
		return [fullPath];
	});
}

function getCompiler(rootPath: string): NodeCompiler {
	let compiler = compilers.get(rootPath);
	if (!compiler) {
		compiler = NodeCompiler.create({ workspace: rootPath });
		compilers.set(rootPath, compiler);
	}
	return compiler;
}

/**
 * Keep line numbers stable for compiler diagnostics while hiding the YAML
 * frontmatter from Typst.
 */
function stripFrontmatter(source: string): string {
	return source.replace(FRONTMATTER_RE, (frontmatter) => {
		const newlines = frontmatter.match(/\r?\n/g)?.length ?? 0;
		return "\n".repeat(newlines);
	});
}

export function getBlogPostsDir(rootPath: string): string {
	return path.join(rootPath, BLOG_POSTS_DIR);
}

export function getTypstSlug(rootPath: string, filePath: string): string {
	return normalizePath(
		path.relative(getBlogPostsDir(rootPath), filePath),
	).replace(/\.typ$/, "");
}

export function findTypstFiles(rootPath: string): string[] {
	return walkFiles(getBlogPostsDir(rootPath))
		.filter((file) => file.endsWith(".typ"))
		.sort();
}

/**
 * Compile a Typst post to HTML and expose its frontmatter.
 *
 * The compiler instance is reused so packages and imports stay cached. The
 * source is mapped as a shadow because the YAML frontmatter is not valid
 * Typst and must not be part of the document.
 */
export function compileTypstPost(
	rootPath: string,
	filePath: string,
): TypstPost {
	const stat = fs.statSync(filePath);
	const cached = compiledPosts.get(filePath);
	if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) {
		return cached.post;
	}

	const file = readSync(filePath);
	matter(file);

	const frontmatter = (file.data.matter ?? {}) as TypstFrontmatter;
	const source = stripFrontmatter(String(file));
	const compiler = getCompiler(rootPath);
	const relativeFile = path.relative(rootPath, filePath);

	compiler.mapShadow(filePath, Buffer.from(source));
	try {
		const result = compiler.tryHtml({ mainFilePath: filePath });
		if (result.hasError() || !result.result) {
			result.printDiagnostics();
			throw new Error(`Failed to compile Typst file: ${relativeFile}`);
		}

		const post: TypstPost = {
			slug: getTypstSlug(rootPath, filePath),
			file: filePath,
			body: result.result.body(),
			title: frontmatter.title ?? result.result.title() ?? null,
			description:
				frontmatter.description ?? result.result.description() ?? null,
		};

		compiledPosts.set(filePath, {
			mtimeMs: stat.mtimeMs,
			size: stat.size,
			post,
		});

		return post;
	} finally {
		compiler.unmapShadow(filePath);
	}
}

export function getTypstPosts(rootPath: string): TypstPost[] {
	return findTypstFiles(rootPath).map((file) =>
		compileTypstPost(rootPath, file),
	);
}
