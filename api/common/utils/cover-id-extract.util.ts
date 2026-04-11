export function extractCoverId(url?: string | null): string | null {
  if (!url) return null;

  const cleanUrl = url.split('?')[0];
  const match = cleanUrl.match(/\/([^/]+)\.(jpg|png|webp)$/i);

  return match ? match[1] : null;
}
