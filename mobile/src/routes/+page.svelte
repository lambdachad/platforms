<script lang="ts">
    import { asc } from "drizzle-orm"
    import { db } from "../lib/database/db.js"
    import { guestsTable, type NewGuest } from "../lib/database/schema.js"

    let newGuest = $state<NewGuest>({ name: "", email: "" })
    let guests = $state(await db.select().from(guestsTable).orderBy(asc(guestsTable.id)))

    async function addGuest(event: Event) {
        event.preventDefault()
        let guest = await db.insert(guestsTable).values({ name: newGuest.name, email: newGuest.email }).returning().get()
        newGuest = { name: "", email: "" }
        guests.push(guest)
    }
</script>

<h1>Guestbook</h1>
<form onsubmit={addGuest}>
    <input placeholder="Name" bind:value={newGuest.name} required />
    <input type="email" placeholder="Email" bind:value={newGuest.email} required />
    <button type="submit">Add guest</button>
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
