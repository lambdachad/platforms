import { sql } from "drizzle-orm"
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const guestsTable = sqliteTable("guests", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    email: text().notNull(),
    createdAt: int({ mode: "timestamp_ms" })
        .notNull()
        .default(sql`(unixepoch() * 1000)`),
})

export type Guest = typeof guestsTable.$inferSelect
export type NewGuest = typeof guestsTable.$inferInsert
