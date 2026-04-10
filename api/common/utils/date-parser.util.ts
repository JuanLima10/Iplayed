export function parseDate(date?: number) {
  if (!date) return undefined;
  return new Date(date * 1000);
}
