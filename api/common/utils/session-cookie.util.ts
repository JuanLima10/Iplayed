import type { CookieOptions } from 'express';

export function getAuthCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    path: '/',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 * 1000,
  };
}
