import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

import { LikeModal } from '@/components/ApiCalls/User/Modal/LikeModal';
import { RatingModal } from '@/components/ApiCalls/User/Modal/RatingModal';
import { Tabs } from '@/components/Tabs/Tabs';

import { HeaderProfileUser, HeaderProfileUserSkeleton } from '@/components/ApiCalls/User/HeaderProfileUser';
import { UserFavGames, UserFavGamesSkeleton } from '@/components/ApiCalls/User/UserFavGames';
import { UserLikedGames, UserLikedGamesSkeleton } from '@/components/ApiCalls/User/UserLikedGames';
import { UserRatedGames, UserRatedGamesSkeleton } from '@/components/ApiCalls/User/UserRatedGames';
import { UserReviewedGames, UserReviewedGamesSkeleton } from '@/components/ApiCalls/User/UserReviewedGames';

import { ParamsProps } from '@/Types/Params';
import { UserProps } from '@/Types/User';
import { getUserById } from '@/lib/fetch/user';

export const metadata = { title: 'User' }

export default async function User({ params }: ParamsProps) {
  const user: UserProps = await getUserById(params.param)
  console.log(user)

  if (user) {
    return (
      <Tabs.Root className="flex flex-col outline-none mx-auto" defaultValue="profile">
        <Tabs.List>
          <Suspense fallback={<HeaderProfileUserSkeleton />}>
            <HeaderProfileUser
              id={params.param}
              name={user.name}
              login={user.login}
              avatarUrl={user.avatarUrl}
            />
          </Suspense>
        </Tabs.List>

        <Tabs.Content className="outline-none" value="profile">
          <section className="w-[860px] max-w-full text-center mt-4 mx-auto">
            <span className="font-semibold text-lg text-white-100 responsive:text-base">Favorite Games</span>
            <Suspense fallback={<UserFavGamesSkeleton />}>
              <UserFavGames userId={params.param} />
            </Suspense>
          </section>

          <section className="w-[860px] max-w-full text-center mt-8 mx-auto responsive:w-[400px]">
            <div className="flex items-center justify-between px-5">
              <span className="font-semibold text-md text-white-100 responsive:text-sm">
                Likes
              </span>
              <LikeModal userId={user.id}>
                <p className="cursor-pointer font-normal text-sm text-green-300 hover:underline">See more +</p>
              </LikeModal>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 mx-5 responsive:gap-3">
              <Suspense fallback={<UserLikedGamesSkeleton limit={5} />}>
                <UserLikedGames userId={params.param} offset={0} limit={5} />
              </Suspense>
            </div>
          </section>

          <section className="w-[860px] max-w-full text-center mt-8 mx-auto responsive:w-[400px]">
            <div className="flex items-center justify-between px-5">
              <span className="font-semibold text-md text-white-100 responsive:text-sm">
                Ratings
              </span>
              <RatingModal userId={user.id}>
                <p className="cursor-pointer font-normal text-sm text-green-300 hover:underline">See more +</p>
              </RatingModal>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 mx-5 responsive:gap-3">
              <Suspense fallback={<UserRatedGamesSkeleton limit={5} />}>
                <UserRatedGames userId={params.param} offset={0} limit={5} />
              </Suspense>
            </div>
          </section>

          <section className="w-full max-w-[860px] mt-8 mx-auto px-5">
            <Tabs.List className="flex items-center justify-between">
              <span className="font-semibold text-md text-white-100 responsive:text-sm">
                Reviews
              </span>
              <Tabs.Trigger className="cursor-pointer font-normal text-sm text-green-300 hover:underline" value="reviews">
                See more +
              </Tabs.Trigger>
            </Tabs.List>
            <div className="max-w-full flex flex-col justify-center items-center gap-1 pt-6 pb-8">
              <Suspense fallback={<UserReviewedGamesSkeleton limit={3} />}>
                <UserReviewedGames
                  userId={params.param}
                  userName={user.name}
                  offset={0} limit={3}
                  title isCover
                />
              </Suspense>
            </div>
          </section>
        </Tabs.Content>

        <Tabs.Content className="outline-none" value="reviews">
          <section className="w-full max-w-[860px] mt-8 mx-auto px-5">
            <Tabs.List className="flex items-center justify-between">
              <span className="font-semibold text-md text-white-100 responsive:text-sm">
                All reviews
              </span>
              <Tabs.Trigger className="cursor-pointer flex items-center gap-1 font-normal text-sm text-green-300 hover:underline" value="profile">
                <ArrowLeft size={14} /> Back to Profile
              </Tabs.Trigger>
            </Tabs.List>
            <div className="max-w-full flex flex-col justify-center items-center gap-1 pt-6 pb-8">
              <Suspense fallback={<UserReviewedGamesSkeleton limit={6} />}>
                <UserReviewedGames
                  userId={params.param}
                  userName={user.name}
                  offset={0} limit={6} isCover
                />
              </Suspense>
            </div>
          </section>

        </Tabs.Content>
      </Tabs.Root>
    )
  }
  return <span className="fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 font-bold text-xl text-center text-gray-500">User not found</span>
}