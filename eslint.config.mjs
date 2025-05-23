import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptParse from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParse,
    },
    files: ["**/*.ts", "**/*.tsx", "**/*.d.ts"],
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          printWidth: 120,
          tabWidth: 2,
          useTabs: true,
          semi: true,
          arrowParens: "always",
          trailingComma: "es5",
          bracketSpacing: true,
          bracketLine: true,
          endOfLine: "auto",
          arrowFunctionParens: "always",
        },
      ],
      camelcase: "off",
      "no-undef": "off",
      "prefer-const": "off",
      "no-unused-vars": 0,
      "dot-notation": "off",
      "no-useless-constructor": "off",
      "no-trailing-spaces": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-namespace": "off",
    },
  },
  eslintPluginPrettierRecommended,
]);
