import { query } from "$app/server"

export const getServerInfo = query.live(async function* () {
    while (true) {
        yield {
            runtime: `Bun ${Bun.version}`,
            platform: process.platform,
            arch: process.arch,
            uptime: Math.round(process.uptime()),
            time: new Date().toISOString(),
        }
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }
})
