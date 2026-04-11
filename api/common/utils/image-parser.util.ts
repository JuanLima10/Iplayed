export function parseImageIgdb(img?: string | null): string | undefined {
  if (!img) return undefined;

  if (!img.includes('/')) {
    return `https://images.igdb.com/igdb/image/upload/t_1080p/${img}.jpg`;
  }

  const hasProtocol = img.startsWith('http');
  const normalized = hasProtocol ? img : `https:${img}`;

  return normalized.replace(/t_[a-z0-9_]+/i, 't_1080p');
}
