import { Prisma } from '@prisma/client';

export interface IUser {
  id: string;
  provider: string;
  providerId: string;
  username: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userSelect = {
  id: true,
  provider: true,
  provider_id: true,
  username: true,
  name: true,
  email: true,
  avatar_url: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.userSelect;

export type IUserSelect = Prisma.userGetPayload<{
  select: typeof userSelect;
}>;
