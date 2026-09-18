import Database from "@tauri-apps/plugin-sql"
import { defineRelations } from "drizzle-orm"
import { drizzle } from "drizzle-orm/sqlite-proxy"
import * as schema from "./schema.js"

export const db = drizzle(
    async (sql, params, method) => {
        const sqlite = await Database.load("sqlite:app.db")
        if (method === "run") {
            await sqlite.execute(sql, params)
            return { rows: [] }
        }
        const rows = await sqlite.select<Record<string, unknown>[]>(sql, params)
        const mapped = rows.map((row) => Object.values(row))
        if (method === "get") return { rows: mapped[0] }
        return { rows: mapped }
    },
    { relations: defineRelations(schema) },
)
