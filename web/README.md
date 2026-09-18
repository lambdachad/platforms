# Web

SSR web app. SvelteKit 3 + Svelte 5 runes, served by Bun.
Backend calls use remote functions (`greet.remote.ts`, validated with Valibot).

```bash
bun install   # install dependencies
bun dev       # develop
bun build     # production build into build/
```

Serve production with `bun build/index.js`.
