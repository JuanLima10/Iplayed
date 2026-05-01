export function createPlayer({
  container,
  src,
  autoPlay,
  muted,
  isBackground,
  onReady,
  onError,
}: {
  container: HTMLDivElement
  src: string
  autoPlay: boolean
  muted: boolean
  isBackground: boolean
  onReady?: (player: any) => void
  onError?: () => void
}) {
  return new window.YT.Player(container, {
    videoId: src,
    playerVars: {
      autoplay: autoPlay ? 1 : 0,
      mute: muted ? 1 : 0,
      controls: isBackground ? 0 : 1,
      disablekb: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
    },
    events: {
      onReady: (e: any) => onReady?.(e.target),
      onError,
    },
  })
}
