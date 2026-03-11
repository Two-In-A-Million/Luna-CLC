import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isWidget = mode === "widget";

  return {
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    build: isWidget
      ? {
          lib: {
            entry: "src/mount.js",
            name: "LunaSkillCalculator",
            fileName: () => "luna-skill-calc.js",
            formats: ["iife"],
          },
        }
      : {},
  };
});
