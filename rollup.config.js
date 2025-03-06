import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    name: "react-calendar-heatmap-chart",
  },
  external: ["react", "react-dom", "@mui/material"],
  plugins: [typescript({ tsconfig: "tsconfig.json" })],
});
