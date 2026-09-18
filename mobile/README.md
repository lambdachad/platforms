# Mobile

Native Android app. Same SvelteKit UI stack, built as a static SPA and wrapped by Capacitor 7.
No server, so the demo feature is local client-side logic for now.

```bash
bun install            # install dependencies
bun android:run        # build and install the debug APK on the connected phone
bun android:dev        # dev server for on-device live reload (terminal 1)
bun android:livereload # deploy to phone with live reload (terminal 2)
```

On the phone enable USB debugging, plug in, accept the RSA prompt, then
`bun android:run`. For live reload run `bun android:dev` in one terminal
and `bun android:livereload` in another: the phone loads the dev server
over USB and refreshes on every edit.
