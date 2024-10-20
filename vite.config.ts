// @ts-expect-error EXPLICITLY ANY TYPE PROBLEM
import eslint from "vite-plugin-eslint";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
	plugins: [
		react(),
		eslint(),
		svgr({
			svgrOptions: { exportType: "named", ref: true, svgo: false, titleProp: true },
			include: "**/*.svg",
		}),
		TanStackRouterVite(),
	],
	server: {
		host: true,
		strictPort: true,
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		css: true,
	},
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "./src/components"),
			"@features": path.resolve(__dirname, "./src/features"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@common": path.resolve(__dirname, "./src/common"),
			"@routes": path.resolve(__dirname, "./src/routes"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@store": path.resolve(__dirname, "./src/store"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
