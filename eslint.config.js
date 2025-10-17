import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist/**", "node_modules/**"]),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    plugins: {
      prettier,
    },

    extends: [
      js.configs.recommended,
      reactHooks.configs.recommended,
      "plugin:react-refresh/recommended",
      "plugin:prettier/recommended",
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    rules: {
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
      "prettier/prettier": ["warn", { endOfLine: "auto" }],

      // 👇 Disable old React import requirement
      "react/react-in-jsx-scope": "off",
    },
  },
]);
