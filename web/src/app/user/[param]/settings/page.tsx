import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { SearchFav, SearchFavSkeleton } from '@/components/ApiCalls/Search/SearchFav';
import { FavDelete, FavForm } from '@/components/Form/FavForm';
import { SettingsForm } from '@/components/Form/SettingsForm';

import { ParamsProps } from '@/Types/Params';
import { ProfileProps } from '@/Types/User';
import { getUser } from '@/lib/auth';
import { getUserProfile } from '@/lib/fetch/user';
import { convertImgToHd } from '@/utils/convertImgToHd';

export default async function Settings({ params, searchParams }: ParamsProps) {
  if (getUser() && getUser().sub === params.param) {
    const profile: ProfileProps = await getUserProfile(params.param)

    const end = 5
    const page = Number(searchParams['page'] ?? '1')
    const start = (page - 1) * end

    return (
      <>
        <main className="max-w-[1440px] flex items-start gap-10 mx-auto pt-32 px-16 navbar:flex-col responsive:pt-28 responsive:px-5">
          <SettingsForm
            id={profile.user.id}
            login={profile.user.login}
            name={profile.user.name}
            email={profile.user.email}
          />
          <section className="w-full max-w-full mx-auto">
            <span className="font-bold text-xl text-white-100 responsive:text-lg">Favorite Games</span>
            <div className="flex flex-wrap items-center justify-start gap-4 mt-4 navbar:justify-center">
              {profile.favs ?
                profile.favs.map((game) => (
                  <div className="relative" key={game.id}>
                    <FavDelete slug={game.slug} />
                    <Image
                      className="w-[120px] h-[160px] rounded-lg transition-all responsive:w-[65px] responsive:h-[90px]"
                      src={convertImgToHd(game.cover.url)}
                      alt={game.name}
                      width={215} height={300}
                    />
                  </div>
                )) :
                [...Array(Number(4))].map((favForms, index) => (
                  <FavForm key={index}>
                    {searchParams.search ?
                      <Suspense fallback={<SearchFavSkeleton limit={5} />}>
                        <SearchFav
                          search={String(searchParams.search)}
                          offset={Number(start)}
                          limit={Number(end)}
                        />
                      </Suspense> :
                      <span className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 font-bold text-lg text-center text-white-200">Search a game</span>
                    }
                  </FavForm>
                ))
              }
              {profile.favs.length < 4 &&
                [...Array(Number(4 - profile.favs.length))].map((favForms, index) => (
                  <FavForm key={index}>
                    {searchParams.search ?
                      <Suspense fallback={<SearchFavSkeleton limit={5} />}>
                        <SearchFav
                          search={String(searchParams.search)}
                          offset={Number(start)}
                          limit={Number(end)}
                        />
                      </Suspense> :
                      <span className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 font-bold text-lg text-center text-white-200">Search a game</span>
                    }
                  </FavForm>
                ))
              }
            </div>
          </section>
        </main>
        <footer className="w-full max-w-[800px] mt-16 mx-auto">
          <p className="font-normal text-center text-sm text-white-200 mx-5">
            Thank you for being here! This web site was developed by me <a className="transition-colors text-blue-300 hover:text-white-100" target="_blank" href="https://portfolio-juan-juanlima10.vercel.app/">Juan Lima</a>  
            where you can explore more about my dual passions: gaming and web development. I utilized the <a className="transition-colors text-blue-300 hover:text-white-100" target="_blank" href="https://www.igdb.com/">IGDB API</a> 
            to get the game informations.
          </p>
        </footer>
      </>
    )
  }
  return redirect('/home')
}