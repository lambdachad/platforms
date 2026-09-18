<script lang="ts">
    import { addGuest, getGuests } from "./guests.remote.js"
    import { getServerInfo } from "./info.remote.js"

    let guests = $derived(await getGuests())
    let serverInfo = $derived(await getServerInfo())
</script>

<h1>Guestbook</h1>
<form {...addGuest}>
    <input {...addGuest.fields.name.as("text")} placeholder="Name" required />
    <input {...addGuest.fields.email.as("email")} placeholder="Email" required />
    <button type="submit">Add guest</button>

    {#if addGuest.fields.allIssues()}
        {#each addGuest.fields.allIssues() as issue}
            <p>{issue.message}</p>
        {/each}
    {/if}
</form>

{#if guests.length}
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {#each guests as guest (guest.id)}
                <tr>
                    <td>{guest.name}</td>
                    <td>{guest.email}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{/if}

<section>
    <h2>Server info</h2>
    <p>{serverInfo.runtime} on {serverInfo.platform}/{serverInfo.arch}</p>
    <p>Uptime: {serverInfo.uptime}s, time: {serverInfo.time}</p>
</section>
