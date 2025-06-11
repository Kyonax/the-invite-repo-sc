import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import babel from "@rollup/plugin-babel";
import path from "path";

export default defineConfig({
    base: "/the-invite-sc",
    plugins: [
        preact({
            prerender: {
                enabled: true,
                renderTarget: "#app",
            },
        }),
        babel({
            babelHelpers: "bundled",
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            exclude: /node_modules/,
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {},
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
