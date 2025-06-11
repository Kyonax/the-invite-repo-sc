import postcssPresetEnv from "postcss-preset-env";

/** @type {import('postcss').ProcessOptions} */
export default {
  plugins: [
    postcssPresetEnv({
      stage: 1,
    }),
  ],
};
