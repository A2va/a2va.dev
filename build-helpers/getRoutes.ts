import fs from "node:fs";
import path from "node:path";

export interface Route {
	path: string;
	file: string;
}

export function getRoutes(dir: string, basePath = ""): Route[] {
	const routes: Route[] = [];
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const fullPath = path.join(dir, file);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			if (file.startsWith("(")) {
				// Route groups do not affect the path
				routes.push(...getRoutes(fullPath, basePath));
			} else if (file.includes("(")) {
				// Escaped nested route (e.g., users(details))
				const escapedName = file.match(/\(([^)]+)\)/)?.[1] || file;
				routes.push(...getRoutes(fullPath, `/${escapedName}`));
			} else {
				// Nested route
				const nestedPath = `${basePath}/${file}`;
				routes.push(...getRoutes(fullPath, nestedPath));
			}
		} else if (/[.](tsx|ts|md|mdx)$/.test(file)) {
			let routePath = basePath;
			const fileName = path.parse(file).name;

			if (fileName === "index") {
				// /routes/index.tsx → /
				// /routes/blog/index.tsx → /blog
				routes.push({ path: routePath || "/", file: fullPath });
			} else if (fileName.startsWith("(") && fileName.endsWith(")")) {
				// Renamed index.tsx (e.g., (socials).tsx → /socials)
				// Test if this is a layout file, if so ignore it
				if (!fs.statSync(path.join(dir, fileName)).isDirectory()) {
					routePath = `${basePath}/${fileName.slice(1, -1)}`;
					routes.push({ path: routePath || "/", file: fullPath });
				}
			} else {
				// Normal file-based route (e.g., about.tsx → /about)
				routePath = `${basePath}/${fileName}`;
				routes.push({ path: routePath || "/", file: fullPath });
			}
		}
	}

	return routes;
}
