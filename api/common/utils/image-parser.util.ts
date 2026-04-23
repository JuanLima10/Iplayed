const IGDB_IMAGE_BASE = 'https://images.igdb.com/igdb/image/upload';
const DEFAULT_SIZE = 't_1080p';

export function parseImageIgdb(img?: string | null): string | undefined {
  if (!img) return undefined;

  if (!img.includes('/')) {
    return `${IGDB_IMAGE_BASE}/${DEFAULT_SIZE}/${img}.jpg`;
  }

  const hasProtocol = img.startsWith('http');
  const normalized = hasProtocol ? img : `https:${img}`;

  return normalized.replace(/t_[a-z0-9_]+/i, DEFAULT_SIZE);
}

export function mapImageIgdb(images?: { url?: string | null }[]): string[] {
  if (!images?.length) return [];

  return images
    ?.map((img) => parseImageIgdb(img.url))
    .filter((img): img is string => Boolean(img));
}
