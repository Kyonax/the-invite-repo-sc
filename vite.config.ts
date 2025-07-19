import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import babel from "@rollup/plugin-babel";
import path from "path";
import { imagetools } from "vite-imagetools";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/the-invite-repo-sc",
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
    imagetools(),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        svgo: false,
      },
    }),
  ],
  assetsInclude: ["**/*.svg"],
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
