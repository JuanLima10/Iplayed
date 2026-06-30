import z from 'zod'

export const FollowCreateSchema = z.object({
  userId: z.string(),
})

export type FollowCreate = z.infer<typeof FollowCreateSchema>

export const FollowPartial = FollowCreateSchema.partial()
export type FollowUpdate = z.infer<typeof FollowCreateSchema>

export const FollowQuerySchema = z.object({
  followingId: z.string(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).optional(),
})

export type FollowQuery = z.infer<typeof FollowQuerySchema>
