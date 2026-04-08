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
