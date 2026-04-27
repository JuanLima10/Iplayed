import { z } from 'zod'
import { GameOrderBy } from '../interfaces/game.interface'

export const GameQuerySchema = z.object({
  search: z.string().optional(),
  releasedAfter: z.string().optional(),
  releasedBefore: z.string().optional(),
  orderBy: z.enum(GameOrderBy).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z
    .preprocess((v) => (v ? Number(v) : undefined), z.number().int().min(1))
    .optional(),
  limit: z
    .preprocess((v) => (v ? Number(v) : undefined), z.number().int().min(1))
    .optional(),
})

export type GameQuery = z.infer<typeof GameQuerySchema>
