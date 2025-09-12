// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang="en">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
					<link rel="icon" href="/favicon.ico" />
					<link
						rel="sitemap"
						type="application/xml"
						title="Sitemap"
						href="/sitemap.xml"
					/>
					<link rel="preconnect" href="https://fonts.bunny.net" />
					<link
						href="https://fonts.bunny.net/css?family=inter:400,400i,500,500i,600,600i|jetbrains-mono:400"
						rel="stylesheet"
					/>
					{assets}

					<script
						innerHTML={`
						const theme = localStorage.getItem('theme');
						let scheme;
						if (theme === "light" || theme === "dark") {
							scheme = theme;
						} else {
							scheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
						}
						document.documentElement.setAttribute("color-scheme", scheme);
					`}
					/>
				</head>
				<body>
					<div id="app">{children}</div>
					{scripts}
				</body>
			</html>
		)}
	/>
));
