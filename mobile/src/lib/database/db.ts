import { Capacitor } from "@capacitor/core"
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite"
import { defineRelations } from "drizzle-orm"
import { drizzle } from "drizzle-orm/sqlite-proxy"
import { defineCustomElements as defineJeepSqlite } from "jeep-sqlite/loader"
import * as schema from "./schema.js"
import m0000 from "../../../drizzle/20260918062925_yummy_avengers/migration.sql?raw"

const DB_NAME = "app.db"
const isWeb = Capacitor.getPlatform() === "web"

// Ordered history. Add one entry per `db:generate` run (same as desktop's lib.rs).
const migrations = [{ tag: "20260918062925_yummy_avengers", sql: m0000 }]

const sqlite = new SQLiteConnection(CapacitorSQLite)

if (isWeb) {
    defineJeepSqlite(window)
    await customElements.whenDefined("jeep-sqlite")
    await sqlite.initWebStore()
}

const conn = await sqlite.createConnection(DB_NAME, false, "no-encryption", 1, false)
await conn.open()

async function persist() {
    // Native writes straight through. Web (jeep-sqlite) needs an explicit save.
    if (isWeb) await sqlite.saveToStore(DB_NAME)
}

await conn.execute(`
    CREATE TABLE IF NOT EXISTS __drizzle_migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag TEXT NOT NULL UNIQUE,
        created_at INTEGER NOT NULL
    )
`)
const applied = await conn.query("SELECT tag FROM __drizzle_migrations")
const appliedTags = new Set((applied.values ?? []).map((row) => (row as { tag: string }).tag))
for (const { tag, sql } of migrations) {
    if (appliedTags.has(tag)) continue
    for (const statement of sql.split("--> statement-breakpoint")) {
        if (statement.trim()) await conn.execute(statement)
    }
    await conn.run("INSERT INTO __drizzle_migrations (tag, created_at) VALUES (?, ?)", [tag, Date.now()])
}
await persist()

export const db = drizzle(
    async (sql, params, method) => {
        if (method === "run") {
            await conn.run(sql, params)
            await persist()
            return { rows: [] }
        }
        const res = await conn.query(sql, params)
        const rows = (res.values ?? []).map((row) => Object.values(row as Record<string, unknown>))
        if (method === "get") return { rows: rows[0] }
        return { rows }
    },
    { relations: defineRelations(schema) },
)
