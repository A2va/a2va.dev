import { exec } from "node:child_process";
import fs from "node:fs";
// Vite plugin to generate sitemap and blog posts metadata
import path from "node:path";

import { readSync } from "to-vfile";
import { matter } from "vfile-matter";

import type { Plugin, ResolvedConfig } from "vite";
import { type Route, getRoutes } from "./getRoutes";

function normalizePath(p: string): string {
	return path.normalize(p).replace(/\\/g, "/");
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

function generateTypstRouteModule(rootPath: string, sourceFile: string): string {
	const importPath = `/${normalizePath(path.relative(rootPath, sourceFile))}`;

	return `import { body } from "${importPath}?parts";

export default function TypstBlogPost() {
	return <div class="typst-content" innerHTML={body} />;
}
`;
}

function generateTypstRoutes(rootPath: string): void {
	const postsDir = path.join(rootPath, "src/routes/blog/(post)");
	const generatedDir = path.join(postsDir, "(typst)");

	fs.rmSync(generatedDir, { force: true, recursive: true });

	const typstFiles = walkFiles(postsDir).filter((file) => {
		const isGenerated = normalizePath(file).includes("/(typst)/");
		return file.endsWith(".typ") && !isGenerated;
	});

	for (const sourceFile of typstFiles) {
		const relativeFile = path.relative(postsDir, sourceFile);
		const routeFile = path.join(
			generatedDir,
			relativeFile.replace(/[.]typ$/, ".tsx"),
		);
		fs.mkdirSync(path.dirname(routeFile), { recursive: true });
		fs.writeFileSync(routeFile, generateTypstRouteModule(rootPath, sourceFile));
	}
}

function getBlogSourceFiles(rootPath: string): string[] {
	const postsDir = path.join(rootPath, "src/routes/blog/(post)");
	return walkFiles(postsDir).filter((file) => {
		const normalizedFile = normalizePath(file);
		const isGenerated = normalizedFile.includes("/(typst)/");
		return !isGenerated && /[.](md|mdx|typ)$/.test(file);
	});
}

function sitemapGen(routes: Route[], baseUrl: string, rootPath: string) {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${routes
					.map(
						(route) => `<url>
			<loc>${baseUrl}${route.path}</loc>
			<lastmod>${fs.statSync(route.file).mtime.toISOString()}</lastmod>
			<changefreq>monthly</changefreq>
			<priority>0.8</priority>
		</url>
        `,
					)
					.join("")}
    </urlset>`;

	fs.writeFileSync(path.join(rootPath, "public", "sitemap.xml"), sitemap);
}

function blogPostGen(rootPath: string, nodeEnv: string): Set<string> {
	// biome-ignore lint: This variable is mutated in filter callback
	let ignoredPosts = new Set<string>();

	// TODO: Type enforcement can be improved
	// cf https://gitlab.truevoid.dev/truevoid/main-site/-/merge_requests/17/diffs#67d9d2b82e9b7e7971f4d4bcfaffff37b36a3485
	const blogPosts = getBlogSourceFiles(rootPath)
		.map((file) => {
			const f = readSync(file);
			matter(f);
			const parsedPath = path.parse(
				path.relative(path.join(rootPath, "src/routes/blog/(post)"), file),
			);
			return {
				...(f.data.matter as object),
				slug: normalizePath(path.join(parsedPath.dir, parsedPath.name)),
			} as { date: string; slug: string; unpublished?: boolean };
		})
		.filter((post) => {
			const isFuturePost = new Date(post.date) > new Date();
			const isUnpublished = post.unpublished ?? false;
			if ((isFuturePost || isUnpublished) && nodeEnv === "production") {
				ignoredPosts.add(`/blog/${post.slug}`);
				return false;
			}
			return true;
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const outputFile = path.resolve("src/data/posts.json");
	fs.writeFileSync(outputFile, JSON.stringify(blogPosts, null, 2), "utf-8");

	exec("bunx @biomejs/biome format --write ./src/data/posts.json");

	return ignoredPosts;
}

function metadataGen(rootPath: string, nodeEnv: string, baseUrl: string) {
	generateTypstRoutes(rootPath);

	const routes = getRoutes(path.join(rootPath, "src/routes"));

	const ignoredRoutes = blogPostGen(rootPath, nodeEnv);
	ignoredRoutes.add("/[...404]");

	sitemapGen(
		routes.filter((route) => !ignoredRoutes.has(route.path)),
		baseUrl,
		rootPath,
	);
}

export function metadataPlugin(): Plugin {
	let baseUrl = "";
	let nodeEnv = "";
	return {
		name: "metadata-gen",
		configResolved(config: ResolvedConfig) {
			baseUrl = JSON.parse(config?.define?.__APP_WEBSITE) ?? "https://a2va.dev";
			nodeEnv = JSON.parse(config?.define?.__APP_NODE_ENV) ?? "production";
			metadataGen(config.root, nodeEnv, baseUrl);
		},
		buildStart() {
			const rootPath = process.cwd();
			metadataGen(rootPath, nodeEnv, baseUrl);
		},
		configureServer(server) {
			const rootPath = server.config.root;
			server.watcher.on("change", (filePath) => {
				const p = path.relative(rootPath, filePath);
				if (path.matchesGlob(p, "src/routes/**")) {
					metadataGen(rootPath, nodeEnv, baseUrl);
				}
			});
		},
	};
}
