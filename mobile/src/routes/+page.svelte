<script lang="ts">
    import { LocalNotifications } from "@capacitor/local-notifications"
    import { asc } from "drizzle-orm"
    import { db } from "../lib/database/db.js"
    import { guestsTable, type NewGuest } from "../lib/database/schema.js"

    // Notifications
    let notifyWarning = $state<string>()
    try {
        const current = await LocalNotifications.checkPermissions()
        const display = current.display === "granted" ? "granted" : (await LocalNotifications.requestPermissions()).display
        if (display !== "granted") notifyWarning = `Notifications: ${display}`
    } catch (error) {
        notifyWarning = `Notifications unavailable: ${error}`
    }

    // Guest
    let newGuest = $state<NewGuest>({ name: "", email: "" })
    let guests = $state(await db.select().from(guestsTable).orderBy(asc(guestsTable.id)))

    async function addGuest(event: Event) {
        event.preventDefault()
        let guest = await db.insert(guestsTable).values({ name: newGuest.name, email: newGuest.email }).returning().get()
        newGuest = { name: "", email: "" }
        guests.push(guest)
        await LocalNotifications.schedule({
            notifications: [{ title: "New guest", body: `${guest.name} joined the guestbook`, id: Date.now() % 2147483647 }],
        })
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

{#if notifyWarning}
    <p role="alert">{notifyWarning}</p>
{/if}
