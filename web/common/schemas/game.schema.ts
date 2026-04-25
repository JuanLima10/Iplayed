import { z } from 'zod'
import { GameOrderBy } from '../interfaces/game.interface'

export const GameQuerySchema = z.object({
  search: z.string().optional(),
  releasedAfter: z.iso.datetime({ offset: true }).optional(),
  releasedBefore: z.iso.datetime({ offset: true }).optional(),
  orderBy: z.enum(GameOrderBy).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).optional(),
})

export type GameQuery = z.infer<typeof GameQuerySchema>
