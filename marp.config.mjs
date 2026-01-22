import { defineConfig } from "@marp-team/marp-cli";

export default defineConfig({
  // Engine options
  options: {
    markdown: {
      breaks: false,
    },
    minifyCSS: false,
  },

  // Enable HTML tags
  html: true,

  // Theme configuration
  themeSet: "./themes",

  // Do not force a specific output format here so scripts can choose (html / pdf / pptx)

  // Browser settings
  browserTimeout: 30,

  // Image settings - PPTX uses 2x scale by default for better quality
  imageScale: 2,

  // Metadata (available in PPTX)
  title: "Agentic Coding Tools & Agent Mode",
  description: "A comprehensive presentation about AI-powered coding agents",
  author: "Your Name",
  keywords: ["AI", "Coding", "Agent Mode", "Copilot", "Development"],
});
