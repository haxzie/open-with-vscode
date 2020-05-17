// import copy from "rollup-plugin-copy";
import shebang from "rollup-plugin-add-shebang";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: "index.js",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  plugins: [
    shebang({
      include: "dist/index.js",
    }),
    resolve(),
    commonjs()
  ],
};
