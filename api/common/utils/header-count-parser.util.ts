export function parseCountHeader(headers: unknown): number {
  if (!headers || typeof headers !== 'object') return 0;

  const countHeader = (headers as Record<string, unknown>)['x-count'];
  if (typeof countHeader === 'number') return countHeader;

  if (typeof countHeader === 'string') {
    const count = Number(countHeader);
    return Number.isFinite(count) ? count : 0;
  }

  return 0;
}
