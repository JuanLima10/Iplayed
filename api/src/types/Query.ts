import { z } from "zod";

export const QueryAuthSchema = z.object({
  token: z.string(),
})