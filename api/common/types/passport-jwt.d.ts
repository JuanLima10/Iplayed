declare module 'passport-jwt' {
  export type JwtFromRequestFunction<TRequest = unknown> = (
    request: TRequest,
  ) => string | null;

  type AuthHeaderRequest = {
    headers?: { authorization?: string };
  };

  export interface StrategyOptions {
    jwtFromRequest: JwtFromRequestFunction<AuthHeaderRequest>;
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
    fromAuthHeaderAsBearerToken(): JwtFromRequestFunction<AuthHeaderRequest>;
    fromExtractors(
      extractors: JwtFromRequestFunction<AuthHeaderRequest>[],
    ): JwtFromRequestFunction<AuthHeaderRequest>;
  };
}
