import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email().min(3),
    password: z.string().min(8),
    remember_me: z.boolean().default(false)
})

export type TLoginSchema = z.infer<typeof loginSchema>
