import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react({
      include: "**/*.glsl",
    }),
    glsl(),
    tsconfigPaths(),
  ],
});
