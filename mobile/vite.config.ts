import adapter from "@sveltejs/adapter-static"
import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        sveltekit({
            compilerOptions: {
                experimental: {
                    async: true,
                },
            },
            experimental: {
                remoteFunctions: true,
            },
            adapter: adapter({
                fallback: "index.html",
            }),
        }),
    ],
    clearScreen: false,
    server: {
        port: 5173,
        strictPort: true,
        host: "0.0.0.0",
        watch: {
            ignored: ["**/android/**"],
        },
    },
})
