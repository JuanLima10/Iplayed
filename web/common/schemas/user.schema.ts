import { z } from 'zod'
import { UserOrderBy } from '../interfaces/user.interface'

export const UserSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(50),
  name: z.string().min(2).max(100),
  avatarUrl: z.url(),
  provider: z.enum(['discord']),
  active: z.boolean(),
})

export type UserCreate = z.infer<typeof UserSchema>

export const UserSchemaPartial = UserSchema.partial()
export type UserUpdate = z.infer<typeof UserSchemaPartial>

export const UserQuerySchema = z.object({
  search: z.string().optional(),
  year: z.number().int().min(2026).optional(),
  month: z.number().int().min(1).max(12).optional(),
  day: z.number().int().min(1).max(31).optional(),
  dateField: z.enum(['created_at', 'updated_at']).optional(),
  orderBy: z.enum(UserOrderBy).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().min(1).default(1).optional(),
  limit: z.number().int().min(1).default(10).optional(),
})

export type UserQuery = z.infer<typeof UserQuerySchema>
