# Desktop

Native desktop app. Same SvelteKit UI stack, built as a static SPA and wrapped by Tauri 2.
Backend calls go to Rust commands via `invoke` instead of a server.

```bash
bun install     # install dependencies
bun tauri dev   # develop (opens app window with hot reload)
bun tauri build # production bundles
```
