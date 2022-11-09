import async from "rollup-plugin-async";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

const common = {
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      rollupCommonJSResolveHack: true,
    }),
    async(),
    sourceMaps(),
  ],
};

export default [
  // models
  {
    ...common,
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
    ],
  },
];
