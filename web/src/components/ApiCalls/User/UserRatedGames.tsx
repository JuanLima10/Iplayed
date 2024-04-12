import Image from 'next/image';
import Link from 'next/link';

import { Stars } from '@/components/Stars';

import { UserInfoGameProps } from '@/Types/User';
import { UserGamesLoad } from '@/components/LoadScroll/UserGamesLoad';
import { api } from '@/lib/api';
import { convertImgToHd } from '@/utils/convertImgToHd';


export async function UserRatedGames(props: UserInfoGameProps) {
  const { data, count } = await api.get(
    `/user/ratings/${props.userId}?offset=${props.offset ? props.offset : 0}&limit=${props.limit}`
  ).then(res => res.data)

  if (data) {
    return (
      <>
        {data.map((game: any) => (
          <Link className={`${props.isList && 'w-full'}`} key={game[0].id} href={`/game/${game[0].slug}`}>
            {props.isList ?
              <div className="w-full flex justify-between items-center rounded-md hover:bg-white-200">
                <div className="w-full flex items-center gap-2">
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
                </div>
              </div> :
              <>
                <Image
                  className="w-[150px] h-[200px] bg-slate-700 rounded-lg transition-all responsive:w-[60px] responsive:h-[82px] hover:brightness-75"
                  src={convertImgToHd(game[0].cover?.url)}
                  alt={game[0].slug}
                  width={215} height={300}
                />
                <div className="text-center">
                  <Stars value={Number(game[1]?.rating)} disabled />
                </div>
              </>
            }
          </Link>
        ))}
        {props.isList && count > 10 &&
          <UserGamesLoad
            param={props.userId}
            offset={props.offset + props.limit}
            count={count}
            type="ratings"
          />
        }
      </>
    )
  }

  return (
    <div className={`w-full h-32 flex items-center justify-center ${!props.isList && "border border-dotted"} border-white-100 bg-transparent rounded-lg m-1`}>
      <span className="font-bold text-lg text-center text-white-100 p-2 responsive:text-sm">There are no rated games yet! ⭐</span>
    </div>
  )
}

export function UserRatedGamesSkeleton({ limit }: { limit: number }) {
  return (
    [...Array(limit)].map((ratings, index) => (
      <div className="w-[150px] h-[200px] max-w-full animate-pulse bg-slate-700 rounded-lg responsive:w-[60px] responsive:h-[82px]" key={index}></div>
    ))
  )
}