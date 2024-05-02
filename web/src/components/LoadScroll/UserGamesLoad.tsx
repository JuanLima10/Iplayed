'use client'
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { FadeInRightDiv } from '../Motion/FadeInRight';
import { Stars } from '../Stars';

import { GameProps } from '@/Types/Game';
import { LoadScrollProps } from '@/Types/LoadScroll';
import { getUserGames } from '@/lib/fetch/load-more';
import { convertImgToHd } from '@/utils/convertImgToHd';

export function UserGamesLoad(props: LoadScrollProps) {
  const { ref, inView } = useInView()
  const [offset, setOffset] = useState(props.offset)

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<GameProps[]>([])

  useEffect(() => {
    if (inView) {
      while (offset < props.count) {
        setLoading(true)
        const wait = setTimeout(async () => {
          const games = await getUserGames(props.type, props.param, offset, 10)
          setData([...data, ...games])
          if (offset >= props.count) {
            setOffset(props.count)
            setLoading(false)
          } else {
            setOffset(offset + 10)
          }
          setLoading(false)
        }, 500)
        return () => clearTimeout(wait)
      }
    }
  }, [props, inView, offset, data, loading])

  if (props.type !== "ratings") {
    return (
      <>
        <section className="flex flex-col items-start justify-center gap-4">
          {data.map((game: GameProps) => (
            <FadeInRightDiv key={game.id}>
              <div className="w-full flex justify-between items-center rounded-md hover:bg-white-200">
                <Link className="w-full flex items-center gap-2" href={`/game/${game.slug}`}>
                  <Image
                    className="w-[75px] max-w-full h-[100px] rounded-md responsive:max-w-full"
                    src={convertImgToHd(game.cover.url)}
                    alt={game.name}
                    width={75} height={100}
                    loading="lazy"
                  />
                  <p className="text-white-100 p-2">{game.name}</p>
                </Link>
              </div>
            </FadeInRightDiv>
          ))}
        </section>
        <section className="w-full flex justify-center" ref={ref}>
          {inView && loading && <Loader2 className="text-white-100 animate-spin" size={32} />}
        </section>
      </>
    )
  }
  return (
    <>
      <section className="flex flex-col items-start justify-center gap-4">
        {data.map((game: any) => (
          <FadeInRightDiv key={game[0].id}>
            <div className="w-full flex justify-between items-center rounded-md hover:bg-white-200">
              <Link className="w-full flex items-center gap-2" href={`/game/${game[0].slug}`}>
                <Image
                  className="w-[75px] max-w-full h-[100px] rounded-md responsive:max-w-full"
                  src={convertImgToHd(game[0].cover.url)}
                  alt={game[0].name}
                  width={75} height={100}
                  loading="lazy"
                />
                <div className="px-2">
                  <p className="text-white-100">{game[0].name}</p>
                  <Stars value={Number(game[1]?.rating)} small disabled />
                </div>
              </Link>
            </div>
          </FadeInRightDiv>
        ))}
      </section>
      <section className="w-full flex justify-center" ref={ref}>
        {inView && loading && <Loader2 className="text-white-100 text-center animate-spin" size={32} />}
      </section>
    </>
  )
}