export enum VideoMode {
  player = 'player',
  background = 'background',
}

export interface IVideo {
  src?: string | null
  posters?: string[]
  mode?: VideoMode
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  className?: string
}

export interface IVideoDialog {
  src: string
  poster?: string
}
