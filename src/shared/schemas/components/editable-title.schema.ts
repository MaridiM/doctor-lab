import { z } from 'zod'

export const editableTitleSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' })
})

export type TEditableTitle = z.infer<typeof editableTitleSchema>
