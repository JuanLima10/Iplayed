
import { Tabs } from '@/components/Tabs/Tabs';
import { getUserInfos } from '@/lib/fetch/user';
import { bigToShortNumbers } from '@/utils/bigToShortNumbers';
import { Heart, List, Pencil, Star } from 'lucide-react';
import { LikeModal } from './Modal/LikeModal';
import { RatingModal } from './Modal/RatingModal';
import { WishModal } from './Modal/WishModal';

export async function InfoStatsUser({ id }: { id: string }) {
  const { like, wish, ratings, reviews } = await getUserInfos(id)

  return (
    <section id="overflow-menu" className="flex items-center justify-center gap-4 responsive:justify-start navbar:gap-2 responsive:overflow-auto navbar:mt-2 responsive:-mb-2 responsive:pl-5">
      <LikeModal userId={id}>
        <button className="w-full flex items-center gap-[6px] font-semibold text-base text-center text-gray-500 border-2 border-gray-500 rounded-full py-2 px-6 transition-colors hover:border-transparent hover:bg-red-500 hover:text-white-100 focus:border-transparent focus:bg-red-500 focus:text-white-100 responsive:text-sm">
          <Heart size={16} absoluteStrokeWidth/> 
          {bigToShortNumbers(like)} <p>Likes</p>
        </button>
      </LikeModal>
      <WishModal userId={id}>
        <button className="flex items-center gap-[6px] font-semibold text-base text-center text-gray-500 border-2 border-gray-500 rounded-full py-2 px-6 transition-colors hover:border-transparent hover:bg-green-300 hover:text-white-100 focus:border-transparent focus:bg-green-300 focus:text-white-100 responsive:text-sm">
          <List size={16} absoluteStrokeWidth/> 
          {bigToShortNumbers(wish)} <p>Wish</p>
        </button>
      </WishModal>
      <RatingModal userId={id}>
        <button className="flex items-center gap-[6px] font-semibold text-base text-center text-gray-500 border-2 border-gray-500 rounded-full py-2 px-6 transition-colors hover:border-transparent hover:bg-yellow-500 hover:text-white-100 focus:border-transparent focus:bg-yellow-500 focus:text-white-100 responsive:text-sm">
          <Star size={16} absoluteStrokeWidth/> 
          {bigToShortNumbers(ratings)} <p>Ratings</p>
        </button>
      </RatingModal>
      <Tabs.Trigger className="flex items-center gap-[6px] font-semibold text-base text-center text-gray-500 border-2 border-gray-500 rounded-full py-2 px-6 transition-colors hover:border-transparent hover:bg-blue-300 hover:text-white-100 data-[state=active]:border-transparent data-[state=active]:bg-blue-300 data-[state=active]:text-white-100 responsive:text-sm responsive:mr-5" value="reviews">
        <Pencil size={16} absoluteStrokeWidth/> 
        {bigToShortNumbers(reviews)} <p>Reviews</p>
      </Tabs.Trigger>
    </section>
  )
}

export function InfoStatsUserSkeleton() {
  return (
    <div className="flex items-center justify-center gap-4 responsive:justify-start navbar:gap-2 responsive:overflow-hidden navbar:mt-2 responsive:-mb-2 responsive:pl-5">
      {[...Array(4)].map((info, index) => (
        <div className="min-w-[135px] h-11 bg-slate-700 rounded-full" key={index}></div>
      ))}
    </div>
  )
}