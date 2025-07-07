import { defineConfig } from "vitest/config";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  test: {
    coverage: {
      reporter: ["lcov", "text"]
    },
    watch: false,
    globals: true,
    clearMocks: true,
    environment: "jsdom",
    setupFiles: './vitest/setup.ts',
    transformMode: {
      web: [/\.[jt]sx?$/]
    },
    deps: {
      inline: [/solid-js/, /@solidjs\/testing-library/],
    },
  },
  resolve: {
    conditions: ["browser", "development"]
  }
});
