import { z } from "zod"

export const searchSchema = z.object({
    searchTerm: z.string()
})

export type TSearch = z.infer<typeof searchSchema>