export enum UserOrderBy {
  'email',
  'username',
  'name',
  'created_at',
}

export interface IUser {
  id: string
  provider: string
  providerId: string
  username: string
  name: string
  email: string
  avatarUrl: string
  createdAt: string
  updatedAt: string
}
