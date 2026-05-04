import { z } from 'zod'
import { GameStatusProgress } from '../interfaces/game-status.interface'
import { ReviewDateRange, ReviewOrderBy } from '../interfaces/review.interface'

export const ReviewSchema = z.object({
  igdbId: z.number().optional(),
  slug: z.string().min(1, 'Slug is required'),
  text: z
    .string()
    .min(3, 'Review is too short')
    .max(2000, 'Review is too long')
    .optional(),
  progress: z.number().int().min(0).max(100).optional(),
  status: z.enum(GameStatusProgress).optional(),
  best: z.number().int().min(1).max(10).optional(),
  isFavorite: z.boolean().optional(),
  rating: z.number().min(0).max(5).multipleOf(0.5).optional(),
  lastPlayedAt: z.iso.datetime().optional(),
})

export type ReviewCreate = z.infer<typeof ReviewSchema>

export const ReviewUpdatePartial = ReviewSchema.partial()
export type ReviewUpdate = z.infer<typeof ReviewUpdatePartial>

export const ReviewQuerySchema = z
  .object({
    search: z.string().optional(),
    isFavorite: z.preprocess(
      (v) =>
        v === 'true' || v === '1' || v === true
          ? true
          : v === 'false' || v === '0' || v === false
            ? false
            : undefined,
      z.boolean().optional()
    ),
    rating: z.preprocess(
      (v) => (v === undefined ? undefined : Number(v)),
      z
        .number()
        .min(0)
        .max(5)
        .refine(
          (v) => Number.isInteger(v * 2),
          'Rating must be in steps of 0.5'
        )
        .optional()
    ),
    range: z.enum(ReviewDateRange).optional(),
    from: z.iso.datetime({ offset: false }).optional(),
    to: z.iso.datetime({ offset: false }).optional(),
    orderBy: z.enum(ReviewOrderBy).optional(),
    order: z.enum(['asc', 'desc']).optional(),
    page: z.preprocess(
      (v) => (v === undefined ? undefined : Number(v)),
      z.number().int().min(1).optional()
    ),
    limit: z.preprocess(
      (v) => (v === undefined ? undefined : Number(v)),
      z.number().int().min(1).optional()
    ),
  })
  .refine(
    (data) => {
      if (data.from && data.to) {
        return new Date(data.from) <= new Date(data.to)
      }
      return true
    },
    {
      message: '`from` must be earlier than or equal to `to`',
      path: ['from'],
    }
  )

export type ReviewQuery = z.infer<typeof ReviewQuerySchema>
