import * as v from "valibot"
import { query } from "$app/server"

export const greet = query(v.string(), (name) => {
    return `Hello, ${name}! You've been greeted from the server!`
})
