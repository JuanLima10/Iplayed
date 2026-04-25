import { z } from 'zod'
import {
  GameStatusDateRange,
  GameStatusOrderBy,
  GameStatusProgress,
} from '../interfaces/game-status.interface'

export const GameStatusCreateSchema = z.object({
  igdbId: z.number().int(),
  progress: z.number().int().min(0).max(100).optional(),
  status: z.enum(GameStatusProgress),
  best: z.number().int().min(1).max(5).optional(),
  isFavorite: z.boolean().optional(),
  rating: z.number().min(0).max(5).optional(),
  lastPlayedAt: z.iso.datetime().optional(),
})

export type GameStatusCreate = z.infer<typeof GameStatusCreateSchema>

export const GameStatusPartial = GameStatusCreateSchema.partial()
export type GameStatusUpdate = z.infer<typeof GameStatusCreateSchema>

export const GameStatusQuerySchema = z.object({
  isBest: z.coerce.boolean().optional(),
  isFavorite: z.coerce.boolean().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  status: z.enum(GameStatusProgress).optional(),
  range: z.enum(GameStatusDateRange).optional(),
  from: z.iso.date().optional(),
  to: z.iso.date().optional(),
  orderBy: z.enum(GameStatusOrderBy).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).optional(),
})

export type GameStatusQuery = z.infer<typeof GameStatusQuerySchema>
