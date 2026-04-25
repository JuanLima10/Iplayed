export enum VideoMode {
  player = 'player',
  background = 'background',
}

export interface IVideoProps {
  src?: string | null
  posters?: string[]
  mode?: VideoMode
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  className?: string
}
