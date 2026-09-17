<script lang="ts">
    import { invoke } from "@tauri-apps/api/core"

    let name = $state("")
    let greeting = $state("")

    async function greetUser(event: Event) {
        event.preventDefault()
        greeting = await invoke("greet", { name })
    }
</script>

<h1>App</h1>
<form onsubmit={greetUser}>
    <input placeholder="Enter a name..." bind:value={name} />
    <button type="submit">Greet</button>
</form>
<p>{greeting}</p>
