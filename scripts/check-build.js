#!/usr/bin/env node

import { existsSync, statSync } from "fs";
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

const requiredFiles = [
  "dist/index.html",
  "dist/presentation.pdf",
  "dist/presentation.pptx",
];

let allFilesExist = true;
let needsRebuild = false;

console.log("Checking if build artifacts are up to date...");

for (const file of requiredFiles) {
  const filePath = join(rootDir, file);
  if (!existsSync(filePath)) {
    console.error(`✗ Missing: ${file}`);
    allFilesExist = false;
  } else {
    console.log(`✓ Found: ${file}`);
  }
}

if (!allFilesExist) {
  console.error("\n❌ Build artifacts are missing.");
  console.error("Run: npm run build:all-formats");
  process.exit(1);
}

// Check if source files are newer than build artifacts
const sourceFiles = [
  "presentation.md",
  "themes/nord-theme.css",
  "marp.config.mjs",
];

const distFiles = ["dist/index.html", "dist/presentation.pdf"];

for (const source of sourceFiles) {
  const sourcePath = join(rootDir, source);
  if (!existsSync(sourcePath)) continue;

  const sourceTime = statSync(sourcePath).mtimeMs;

  for (const dist of distFiles) {
    const distPath = join(rootDir, dist);
    if (!existsSync(distPath)) continue;

    const distTime = statSync(distPath).mtimeMs;

    if (sourceTime > distTime) {
      console.error(
        `\n⚠️  ${source} is newer than build artifacts (modified ${new Date(sourceTime).toLocaleString()})`
      );
      needsRebuild = true;
      break;
    }
  }

  if (needsRebuild) break;
}

if (needsRebuild) {
  console.error("\n❌ Source files have been modified since last build.");
  console.error("Run: npm run build:all-formats");
  process.exit(1);
}

console.log("\n✓ All build artifacts are up to date!");
