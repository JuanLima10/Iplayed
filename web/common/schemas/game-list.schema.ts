import { z } from 'zod'

export const GameListCreate = z.object({
  name: z.string().min(1).max(100),
})
export type GameListCreate = z.infer<typeof GameListCreate>

export const GameListUpdate = GameListCreate.partial
export type GameListUpdate = z.infer<typeof GameListUpdate>

export const GameListQuery = z.object({
  search: z.string().optional(),
  orderBy: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).optional(),
})
export type GameListQuery = z.infer<typeof GameListQuery>
