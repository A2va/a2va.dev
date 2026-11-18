import type { Plugin, ViteDevServer } from "vite";
import { type TypstPost, getTypstPosts } from "./typst";

const TYPST_POSTS_MODULE_ID = "virtual:typst-posts";
const RESOLVED_TYPST_POSTS_MODULE_ID = `\0${TYPST_POSTS_MODULE_ID}`;

function serializePosts(posts: TypstPost[]): string {
	const serialized = posts.map(({ slug, body, title, description }) => ({
		slug,
		body,
		title,
		description,
	}));

	return JSON.stringify(serialized)
		.replace(/</g, "\\u003c")
		.replace(/\u2028/g, "\\u2028")
		.replace(/\u2029/g, "\\u2029");
}

function invalidateTypstModule(server: ViteDevServer): void {
	for (const environment of Object.values(server.environments)) {
		const module = environment.moduleGraph.getModuleById(
			RESOLVED_TYPST_POSTS_MODULE_ID,
		);
		if (module) {
			environment.moduleGraph.invalidateModule(module);
		}
	}
	server.ws.send({ type: "full-reload" });
}

/**
 * Compile Typst blog posts to HTML at build time and expose them through a
 * single virtual module. `src/routes/blog/(post)/[...slug].tsx` renders the
 * matching post.
 */
export function typstPlugin(): Plugin {
	let rootPath = process.cwd();

	return {
		name: "typst-posts",
		enforce: "pre",
		configResolved(config) {
			rootPath = config.root;
		},
		resolveId(id) {
			if (id === TYPST_POSTS_MODULE_ID) {
				return RESOLVED_TYPST_POSTS_MODULE_ID;
			}
			return null;
		},
		load(id) {
			if (id !== RESOLVED_TYPST_POSTS_MODULE_ID) {
				return null;
			}

			const posts = getTypstPosts(rootPath);
			for (const post of posts) {
				this.addWatchFile(post.file);
			}

			return `export const typstPosts = ${serializePosts(posts)};
export default typstPosts;
`;
		},
		configureServer(server) {
			const onTypstFile = (filePath: string) => {
				if (filePath.endsWith(".typ")) {
					invalidateTypstModule(server);
				}
			};

			server.watcher.on("add", onTypstFile);
			server.watcher.on("unlink", onTypstFile);
		},
		handleHotUpdate({ file, server }) {
			if (!file.endsWith(".typ")) {
				return;
			}

			invalidateTypstModule(server);
			return [];
		},
	};
}
