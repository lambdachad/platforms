# Platforms

One SvelteKit stack (SvelteKit 3, Svelte 5 runes, Vite 8, Bun) shipping to web,
desktop, and mobile. Each project is self-contained and differs only in
adapter and backend access:

| Project    | Target        | Adapter                 | Backend calls             |
| ---------- | ------------- | ----------------------- | ------------------------- |
| [`web/`](web/README.md)         | Bun server    | `@sveltejs/adapter-bun` | Remote functions (server) |
| [`desktop/`](desktop/README.md) | Native window | adapter-static (SPA)    | Tauri `invoke` (Rust)     |
| [`mobile/`](mobile/README.md)   | Android app   | adapter-static (SPA)    | Local logic (for now)     |

```bash
cd web && bun install && bun dev                 # SSR app on Bun
cd desktop && bun install && bun tauri dev       # native window (Nix shell for system libs)
cd mobile && bun install && bun android:dev      # terminal 1: dev server
bun android:livereload                           # terminal 2: on-phone live reload over USB
```
