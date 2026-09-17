<script lang="ts">
    import { greet } from "./greet.remote.js"

    let name = $state("")
    let greeting = $state("")

    async function greetUser(event: Event) {
        event.preventDefault()
        greeting = await greet(name)
    }
</script>

<h1>App</h1>
<form onsubmit={greetUser}>
    <input placeholder="Enter a name..." bind:value={name} />
    <button type="submit">Greet</button>
</form>
<p>{greeting}</p>
