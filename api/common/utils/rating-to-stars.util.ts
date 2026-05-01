export function ratingToStars(value: number): number {
  if (!value || value <= 0) return 0.5;
  return Math.min(5, Math.max(0.5, Math.round(value * 2) / 2));
}
