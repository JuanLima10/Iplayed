export function getYouTubeThumbnail(
  videoId: string,
  quality: 'max' | 'hq' | 'mq' | 'default' = 'hq'
) {
  const map = {
    max: 'maxresdefault.jpg',
    hq: 'hqdefault.jpg',
    mq: 'mqdefault.jpg',
    default: 'default.jpg',
  }

  return `https://img.youtube.com/vi/${videoId}/${map[quality]}`
}
