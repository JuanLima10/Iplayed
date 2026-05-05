import { Request } from 'express';

export interface IAuth {
  sub: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

export interface IAuthRequest extends Request {
  user: IAuth;
}

export interface IAuthUser {
  id: string;
  email?: string | null;
  username?: string | null;
}

export const passwordRules = {
  rules: {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  },
  message:
    'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
};
