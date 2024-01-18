import { Gamepad2, Heart, List } from 'lucide-react';

import { api } from '@/lib/api';
import { bigToShortNumbers } from '@/utils/bigToShortNumbers';

export async function InfoStatsGame({ slug }: { slug: string }) {
  const { plays, likes, wish } = await api.get(`/game/info/${slug}`)
    .then(res => res.data)

  return (
    <div className="flex items-start justify-center gap-4">
      <div className="flex flex-col items-center text-blue-300">
        <Gamepad2 size={20} />
        <p className="font-normal text-sm text-white-200 responsive:text-2xs">{bigToShortNumbers(plays)}</p>
      </div>
      <div className="flex flex-col items-center text-red-500">
        <Heart size={20} />
        <p className="font-normal text-sm text-white-200 responsive:text-2xs">{bigToShortNumbers(likes)}</p>
      </div>
      <div className="flex flex-col items-center text-green-300">
        <List size={20} absoluteStrokeWidth />
        <p className="font-normal text-sm text-white-200 responsive:text-2xs">{bigToShortNumbers(wish)}</p>
      </div>
    </div>
  )
}

export function InfoStatsGameSkeleton() {
  return (
    <div className="flex items-start justify-center gap-4">
      {[...Array(3)].map((info, index) => (
        <div className="flex flex-col items-center gap-1" key={index}>
          <div className="h-5 w-5 bg-slate-700 rounded"></div>
          <div className="h-2 w-5 bg-slate-700 rounded-full my-1"></div>
        </div>
      ))}
    </div>
  )
}