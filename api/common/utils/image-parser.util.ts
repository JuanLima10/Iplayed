export function parseImageIgdb(img?: string) {
  if (!img) return undefined;
  return `https:${img.replace('t_thumb', 't_1080p')}`;
}
