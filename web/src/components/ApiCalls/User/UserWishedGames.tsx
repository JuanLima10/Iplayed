import Image from 'next/image';
import Link from 'next/link';

import { UserGamesLoad } from '@/components/LoadScroll/UserGamesLoad';

import { GameProps } from '@/Types/Game';
import { UserInfoGameProps } from '@/Types/User';
import { getUserLikeWish } from '@/lib/fetch/like-wish';
import { convertImgToHd } from '@/utils/convertImgToHd';

export async function UserWishedGames(props: UserInfoGameProps) {
  const { data, count } = await getUserLikeWish("wish", props.userId, props.offset, props.limit)

  if (data) {
    return (
      <>
        {data.map((game: GameProps) => (
          <div className={props.isList ? "w-full flex justify-between items-center rounded-md hover:bg-white-200" : ""} key={game.id}>
            <Link className={props.isList ? "w-full flex items-center gap-2" : ""} href={`/game/${game.slug}`}>
              <Image
                className={props.isList ? "w-[75px] max-w-full h-[100px] rounded-md responsive:max-w-full" : "w-[150px] h-[200px] rounded-lg transition-all responsive:w-[60px] responsive:h-[82px] hover:brightness-75"}
                src={convertImgToHd(game.cover.url)}
                alt={game.name}
                width={215} height={300}
              />
              {props.isList && <p className="text-white-100 p-2">{game.name}</p>}
            </Link>
          </div>
        ))}
        {props.isList && count > 0 &&
          <UserGamesLoad
            param={props.userId}
            offset={props.offset + props.limit}
            count={count}
            type="wish"
          />
        }
      </>
    )
  }

  return (
    <div className={`w-full h-32 flex items-center justify-center ${!props.isList && "border border-dotted"} border-white-100 bg-transparent rounded-lg m-1`}>
      <span className="font-bold text-lg text-center text-white-100 p-2 responsive:text-sm">There are no games in Wish yet! 🕝</span>
    </div>
  )
}