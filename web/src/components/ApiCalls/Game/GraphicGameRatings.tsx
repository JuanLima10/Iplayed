'use client'
import ReactEcharts from 'echarts-for-react';
import Image from 'next/image';
import Link from 'next/link';

import { Stars } from '../../Stars';

import { getGameRating } from '@/lib/fetch/rating';
import { sliceGameRating } from '@/utils/sliceGamesRating';

export async function GraphicGameRatings({ slug }: { slug: string }) {
  const { ratings, rating_count } = await getGameRating(slug)

  if (ratings.length) {
    const option = {
      tooltip: {
        backgroundColor: '#1F1D36',
        textStyle: { color: '#FFFFFF' }
      },
      grid: { top: 0, left: 0, right: 0, bottom: 0 },
      xAxis: [{
        type: 'category',
        data: [
          '0.5 star',
          '1 star', '1.5 star',
          '2 stars', '2.5 stars',
          '3 stars', '3.5 stars',
          '4 stars', '4.5 stars',
          '5 stars'
        ], show: false
      }],
      yAxis: [{ type: 'value', show: false }],
      series: [{
        name: 'Ratings',
        type: 'bar',
        barHeight: '100%',
        barWidth: '96%',
        data: sliceGameRating(ratings),
      }],
      color: "#ffffff50",
    }

    return (
      <div className="w-full flex items-center justify-center gap-3 text-yellow-500">
        <div className="w-full flex items-end justify-between border-b border-white-200">
          <Image
            src="/star-fill.svg"
            alt="star"
            width={12} height={12}
          />
          <ReactEcharts
            option={option}
            className="w-full h-full max-w-[40%] max-h-[160px] responsive:max-w-[75%] navbar:max-h-[60px]"
          />
        </div>
        <div className="flex flex-col items-center justify-center ml-4 responsive:ml-0">
          <span className="font-bold text-xl text-white-100">
            {rating_count ? rating_count.toFixed(1) : 'N/A'}
          </span>
          <Stars value={rating_count} disabled />
        </div>
      </div>
    )
  }
  return (
    <Link className="w-full h-40 flex items-center justify-center border border-dotted border-white-100 bg-blue-900 rounded-lg m-1 navbar:h-24" href={`/reviews/${slug}/write/`}>
      <span className="font-bold text-lg text-center text-white-100 p-2 responsive:text-sm">Be the first to review this game! 😁</span>
    </Link>
  )
}

export function GraphicGameRatingsSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="w-full h-40 bg-slate-700 rounded-lg m-1 navbar:h-24"></div>
    </div>
  )
}