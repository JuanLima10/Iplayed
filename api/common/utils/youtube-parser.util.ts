export function parseYoutube(video?: string) {
  if (!video) return undefined;
  return `https://www.youtube.com/watch?v=${video}`;
}
