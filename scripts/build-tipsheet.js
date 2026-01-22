#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { marked } from "marked";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

// Read the markdown file
const markdown = readFileSync(join(rootDir, "tipsheet.md"), "utf-8");

// Read the CSS file
const css = readFileSync(join(rootDir, "tipsheet.css"), "utf-8");

// Convert markdown to HTML
const content = marked.parse(markdown);

// Create full HTML document
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Coding Agents Tipsheet</title>
  <style>
${css}
  </style>
</head>
<body>
${content}
</body>
</html>`;

// Ensure dist directory exists
mkdirSync(join(rootDir, "dist"), { recursive: true });

// Write the HTML file
writeFileSync(join(rootDir, "dist/tipsheet.html"), html);

console.log("✓ Tipsheet built successfully");
