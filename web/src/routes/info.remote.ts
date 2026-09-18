import { query } from "$app/server"

export const getServerInfo = query(async () => {
    return {
        runtime: `Bun ${Bun.version}`,
        platform: process.platform,
        arch: process.arch,
        uptime: Math.round(process.uptime()),
        time: new Date().toISOString(),
    }
})
