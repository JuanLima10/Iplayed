export abstract class DomainError extends Error {
  readonly isDomainError = true;

  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly type: string,
  ) {
    super(message);
  }
}
