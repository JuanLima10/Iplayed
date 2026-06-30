import { z } from 'zod'
import { GameStatusProgress as Progress } from '../interfaces/game-status.interface'
import { UserOrderBy } from '../interfaces/user.interface'
import { UserTab } from '../utils/tab-resolver.util'
import { GameStatusQuery } from './game-status.schema'

export const UserSchema = z.object({
  email: z.email(),
  username: z.string().min(3).max(50),
  name: z.string().min(2).max(100),
  avatarUrl: z.url(),
  provider: z.string(),
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

export const USER_VALID_TABS = {
  overview: 'overview',
  playing: 'playing',
  played: 'played',
  favorites: 'favorites',
  reviews: 'reviews',
  wishes: 'wishes',
}

export const USER_TABS_CONFIG: Record<
  UserTab,
  { label: string; params?: Partial<GameStatusQuery> }
> = {
  overview: { label: 'Overview' },
  playing: { label: 'Playing', params: { status: Progress.PLAYING } },
  played: { label: 'Played', params: { status: Progress.COMPLETED } },
  favorites: { label: 'Favorites', params: { isFavorite: true } },
  wishes: { label: 'Wish play', params: { status: Progress.TO_PLAY } },
  reviews: { label: 'Reviews' },
}
