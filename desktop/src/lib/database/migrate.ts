import type Database from "@tauri-apps/plugin-sql"

const modules = import.meta.glob<string>("../../../drizzle/*/migration.sql", {
    eager: true,
    query: "?raw",
    import: "default",
})

const migrations = Object.keys(modules)
    .sort()
    .map((path) => ({ tag: path.split("/").at(-2) ?? path, sql: modules[path] }))

export async function migrate(sqlite: Database) {
    await sqlite.execute(`
        CREATE TABLE IF NOT EXISTS __drizzle_migrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tag TEXT NOT NULL UNIQUE,
            created_at INTEGER NOT NULL
        )
    `)
    const rows = await sqlite.select<{ tag: string }[]>("SELECT tag FROM __drizzle_migrations")
    const appliedTags = new Set(rows.map((row) => row.tag))
    for (const { tag, sql } of migrations) {
        if (appliedTags.has(tag)) continue
        for (const statement of sql.split("--> statement-breakpoint")) {
            if (statement.trim()) await sqlite.execute(statement)
        }
        await sqlite.execute("INSERT INTO __drizzle_migrations (tag, created_at) VALUES (?, ?)", [tag, Date.now()])
    }
}
