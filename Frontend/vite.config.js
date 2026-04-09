import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const repoName = "ai-resume-maker-with-ai"
const isGithubActions = process.env.GITHUB_ACTIONS === "true"

export default defineConfig({
  base: isGithubActions ? `/${repoName}/` : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
