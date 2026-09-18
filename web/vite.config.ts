import adapter from "@sveltejs/adapter-bun"
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
            adapter: adapter(),
        }),
    ],
})
