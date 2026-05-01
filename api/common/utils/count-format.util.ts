export function formatCount(value: number): string {
  if (value < 1_000) return value.toString();

  if (value < 1_000_000) {
    const v = value / 1_000;
    return `${trim(v)}k`;
  }

  if (value < 1_000_000_000) {
    const v = value / 1_000_000;
    return `${trim(v)}M`;
  }

  const v = value / 1_000_000_000;
  return `${trim(v)}B`;
}

function trim(value: number): string {
  return value % 1 === 0 ? value.toString() : value.toFixed(1);
}
