import z from 'zod'

export const ListItemSchema = z.object({
  slug: z.string(),
  position: z.number().min(1).optional(),
})
export type ListItemCreate = z.infer<typeof ListItemSchema>

export const ListItemUpdateSchema = ListItemSchema.partial()
export type ListItemUpdate = z.infer<typeof ListItemUpdateSchema>

export const UpsertLibrarySchema = z.object({
  slug: z.string(),
  listIds: z.array(z.string()),
})
export type UpsertLibraryForm = z.infer<typeof UpsertLibrarySchema>
