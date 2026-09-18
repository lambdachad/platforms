import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite"
import { defineRelations } from "drizzle-orm"
import { drizzle } from "drizzle-orm/sqlite-proxy"
import { migrate } from "./migrate.js"
import * as schema from "./schema.js"

const sqlite = new SQLiteConnection(CapacitorSQLite)
const conn = await sqlite.createConnection("app.db", false, "no-encryption", 1, false)
await conn.open()
await migrate(conn)

export const db = drizzle(
    async (sql, params, method) => {
        if (method === "run") {
            await conn.run(sql, params)
            return { rows: [] }
        }
        const res = await conn.query(sql, params)
        const rows = (res.values ?? []).map((row) => Object.values(row as Record<string, unknown>))
        if (method === "get") return { rows: rows[0] }
        return { rows }
    },
    { relations: defineRelations(schema) },
)
