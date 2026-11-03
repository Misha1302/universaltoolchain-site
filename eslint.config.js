import js from "@eslint/js";
import tseslint from "typescript-eslint";
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/scripts/**/*.ts", "tests/**/*.ts", "playwright.config.ts"],
    rules: { "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }] }
  },
  { ignores: ["dist/**", ".astro/**", "node_modules/**", "test-results/**"] }
];
