import { z } from "zod";

export const UserParamsSchema = z.object({
  id: z.string().optional(),
  code: z.string().optional(),
})

export const UserQuerySchema = z.object({
  offset: z.string().optional(),
  limit: z.string().optional(),
})

export const DiscordSchema = z.object({
  id: z.string(),
  email: z.string(),
  avatar: z.string(),
  username: z.string(),
  global_name: z.string(),
})

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  discordId: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  username: z.string().optional(),
  avatarUrl: z.string().url().optional(),
})