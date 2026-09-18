import { Database } from "bun:sqlite"
import { defineRelations } from "drizzle-orm"
import { drizzle } from "drizzle-orm/bun-sqlite"
import { migrate } from "drizzle-orm/bun-sqlite/migrator"
import * as schema from "./schema.js"

const sqlite = new Database("app.db")
export const db = drizzle({ client: sqlite, relations: defineRelations(schema) })
migrate(db, { migrationsFolder: "drizzle" })
