import adapter from "@sveltejs/adapter-static"
import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import process from "node:process"

const host = process.env.TAURI_DEV_HOST

export default defineConfig(() => ({
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
        port: 1420,
        strictPort: true,
        host: host || "127.0.0.1",
        hmr: host
            ? {
                  protocol: "ws",
                  host,
                  port: 1421,
              }
            : undefined,
        watch: {
            ignored: ["**/src-tauri/**"],
        },
    },
}))
