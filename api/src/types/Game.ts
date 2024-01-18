import { z } from "zod";

export const GameParamsSchema = z.object({
  slug: z.string(),
})

export const GameSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  slug: z.string().optional(),
  rating: z.number().nullable().optional(),
  review: z.string().nullable().optional(),
})