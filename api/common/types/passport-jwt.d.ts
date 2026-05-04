declare module 'passport-jwt' {
  export type JwtFromRequestFunction<TRequest = unknown> = (
    request: TRequest,
  ) => string | null;

  type AuthHeaderRequest = {
    headers?: { authorization?: string };
  };

  type AuthCookieRequest = AuthHeaderRequest & {
    cookies?: { iplayed_session?: string };
  };

  export interface StrategyOptions {
    jwtFromRequest: JwtFromRequestFunction<AuthCookieRequest>;
    ignoreExpiration?: boolean;
    secretOrKey: string;
  }

  export class Strategy {
    constructor(
      options: StrategyOptions,
      verify?: (...args: unknown[]) => unknown,
    );
  }

  export const ExtractJwt: {
    fromAuthHeaderAsBearerToken(): JwtFromRequestFunction<AuthCookieRequest>;
    fromExtractors(
      extractors: JwtFromRequestFunction<AuthCookieRequest>[],
    ): JwtFromRequestFunction<AuthCookieRequest>;
  };
}
