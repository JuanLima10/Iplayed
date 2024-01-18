'use client'
import YouTube from 'react-youtube';

export interface PlayerVideoProps {
  videoId: string;
  className?: string;
}

export function VideoPlayer(props: PlayerVideoProps) {
  const opts = {
    height: '100%',
    width: '100%',
    borderRadius: '8px',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <YouTube
      className={`${props.className} relative min-w-[450px] max-w-[450px] h-[250px] keen-slider__slide z-0 overflow-hidden bg-slate-700 rounded-lg responsive:min-w-full responsive:h-[200px]`}
      opts={opts}
      videoId={props.videoId}
    />
  )
}