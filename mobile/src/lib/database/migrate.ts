import type { SQLiteDBConnection } from "@capacitor-community/sqlite"

const modules = import.meta.glob<string>("../../../drizzle/*/migration.sql", {
    eager: true,
    query: "?raw",
    import: "default",
})

const migrations = Object.keys(modules)
    .sort()
    .map((path) => ({ tag: path.split("/").at(-2) ?? path, sql: modules[path] }))

export async function migrate(conn: SQLiteDBConnection) {
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
}
