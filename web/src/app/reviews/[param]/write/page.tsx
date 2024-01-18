import { ParamsProps } from '@/Types/Params';
import { ReviewForm } from '@/components/Form/ReviewForm';
import { api } from '@/lib/api';
import { getUser } from '@/lib/auth';
import { fetchGame } from '@/lib/igdb';
import { convertImgToHd } from '@/utils/convertImgToHd';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Write review' }

export default async function Write({ params }: ParamsProps) {
  const user = getUser()
  if (!user) {
    return redirect('/login')
  }

  const game = await fetchGame(
    `fields slug, name, cover.url, first_release_date, rating;
    where slug = "${params.param}";`)

  if (game && user) {
    const isReviwed = await api.get(`/game/${user.sub}/${params.param}`)
      .then(res => res.data)
    const rating = await api.get(`/game/ratings/${params.param}`)
      .then(res => res.data)

    return (
      <main className="max-w-[1440px] relative mx-auto pt-16">
        <section className="flex items-start justify-center gap-8 mx-5 pt-16 responsive:gap-5 small-screen:flex-wrap-reverse">
          <div className="w-[350px] max-w-full">
            <span className="font-bold text-lg text-white-100 responsive:text-md">{game.name}</span>
            <p className="font-normal text-md text-white-200 mt-4 responsive:text-sm responsive:mt-2">Geral Rating</p>
            <span className="font-semibold text-lg text-white-100 responsive:text-md">
              {rating.rating_count ? rating.rating_count.toFixed(1) : 'N/A'}
            </span>
            <ReviewForm
              slug={params.param}
              review={isReviwed?.review}
              rating={isReviwed?.rating}
            />
          </div>
          <Image
            className="max-w-full rounded-lg responsive:w-32"
            src={convertImgToHd(game.cover.url)}
            alt={game.name}
            width={200} height={250}
          />
        </section>
      </main>
    )
  }
}