import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "prettier/prettier": "warn",
    },
  },
  {
    ignores: ["node_modules/", "dist/"],
  },
];
