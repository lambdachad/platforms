<script lang="ts">
    let name = $state("")
    let greeting = $state("")

    async function greetUser(event: Event) {
        event.preventDefault()
        greeting = `Hello, ${name}! You've been greeted locally on mobile!`
    }
</script>

<h1>App</h1>
<form onsubmit={greetUser}>
    <input placeholder="Enter a name..." bind:value={name} />
    <button type="submit">Greet</button>
</form>
<p>{greeting}</p>
