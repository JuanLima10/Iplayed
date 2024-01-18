import Image from 'next/image';

import { fetchGame, screenshotBody } from '@/lib/igdb';

import { GameProps } from '@/Types/Game';
import { randomBackground } from '@/utils/randomBackground';

export async function ScreenshotGame({ slug }: { slug: string }) {
  const { screenshots }: GameProps = await fetchGame(screenshotBody(slug))

  return (
    <>
      {screenshots ?
        <>
          <div className="w-full h-[450px] absolute -z-10 bg-slate-700 animate-pulse responsive:h-[300px]"></div>
          <Image
            className="w-full h-[450px] backdrop-brightness-95 object-cover object-center responsive:h-[300px]"
            src={randomBackground(screenshots)}
            alt="Banner"
            width={1920} height={1080}
            priority
          />
        </> :
        <div className="w-full h-[450px] top-0 bg-black-100 opacity-50 responsive:h-[300px]"></div>
      }
      <div className="w-full h-full absolute bottom-0 bg-linear-t-blue"></div>
    </>
  )
}