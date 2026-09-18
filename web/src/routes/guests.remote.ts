import * as v from "valibot"
import { asc } from "drizzle-orm"
import { form, query } from "$app/server"
import { db } from "../lib/database/db.js"
import { guestsTable } from "../lib/database/schema.js"

export const getGuests = query(async () => {
    return await db.select().from(guestsTable).orderBy(asc(guestsTable.id))
})

export const addGuest = form(
    v.object({ name: v.string(), email: v.pipe(v.string(), v.email()) }),
    async ({ name, email }) => {
        await db.insert(guestsTable).values({ name, email })
    },
)
