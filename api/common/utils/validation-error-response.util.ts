type ValidationErrorResponse = {
  message?: string;
  errors: Array<{
    field: string;
    constraints?: Record<string, string>;
  }>;
};
type MessageResponse = { message: string | string[] };

export function responseValidationError(
  value: unknown,
): value is ValidationErrorResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'errors' in value &&
    Array.isArray(value.errors)
  );
}

export function responseMessageError(value: unknown): value is MessageResponse {
  return typeof value === 'object' && value !== null && 'message' in value;
}
