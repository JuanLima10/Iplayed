import { fetchGame, fetchPlatfotms, infoCardBody, platformsBody } from '@/lib/igdb';

import { GamePlatformsProps, GameProps } from '@/Types/Game';

export async function InfoGameCard({slug}: {slug: string}) {
  const game: GameProps = await fetchGame(infoCardBody(slug))
  const platforms: GamePlatformsProps[] = await fetchPlatfotms(platformsBody(game.platforms))

  return (
    <div className="flex flex-wrap gap-4 mt-8 navbar:justify-center responsive:w-full">
      <div className="flex gap-4 rounded-lg responsive:w-full responsive:px-5 small-screen:flex-col">
        <ol className="w-44 max-w-full bg-blue-700 rounded-lg pt-2 px-3 pb-4 responsive:w-full">
          <li className="font-semibold text-md text-white-100">Platforms:</li>
          {platforms?.map((platform: any) => (
            <li key={platform.id} className="font-normal text-sm text-gray-500">
              {platform.name}
            </li>
          ))}
        </ol>
        <ol className="w-44 max-w-full bg-blue-700 rounded-lg pt-2 px-3 pb-4 responsive:w-full">
          <li className="font-semibold text-md text-white-100">Themes:</li>
          {game.themes?.map((theme: any) => (
            <li key={theme.id} className="font-normal text-sm text-gray-500">
              {theme.name}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex gap-4 rounded-lg responsive:w-full responsive:px-5 small-screen:flex-col">
        <ol className="w-44 max-w-full bg-blue-700 rounded-lg pt-2 px-3 pb-4 responsive:w-full">
          <li className="font-semibold text-md text-white-100">Genres:</li>
          {game.genres?.map((genre: any) => (
            <li key={genre.id} className="font-normal text-sm text-gray-500">
              {genre.name}
            </li>
          ))}
        </ol>
        <ol className="w-44 max-w-full bg-blue-700 rounded-lg pt-2 px-3 pb-4 responsive:w-full">
          <li className="font-semibold text-md text-white-100">Perspectives:</li>
          {game.player_perspectives?.map((perspective: any) => (
            <li key={perspective.id} className="font-normal text-sm text-gray-500">
              {perspective.name}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function InfoGameCardSkeleton() {
  return (
    <div className="flex flex-wrap gap-4 animate-pulse mt-8 navbar:justify-center responsive:w-full">
      <div className="flex gap-4 rounded-lg responsive:w-full responsive:px-5 small-screen:flex-col">
        <ol className="w-44 max-w-full h-52 bg-slate-700 rounded-lg pt-2 px-3 pb-4 small-screen:w-full"></ol>
        <ol className="w-44 max-w-full h-52 bg-slate-700 rounded-lg pt-2 px-3 pb-4 small-screen:w-full"></ol>
      </div>
      <div className="flex gap-4 rounded-lg responsive:px-5 small-screen:flex-col">
        <ol className="w-44 max-w-full h-52 bg-slate-700 rounded-lg pt-2 px-3 pb-4 small-screen:w-full"></ol>
        <ol className="w-44 max-w-full h-52 bg-slate-700 rounded-lg pt-2 px-3 pb-4 small-screen:w-full"></ol>
      </div>
    </div>
  )
}