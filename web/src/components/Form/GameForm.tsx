'use client'
import * as Dialog from '@radix-ui/react-dialog';
import { FileEdit, Pencil, Share2, Twitch, X } from 'lucide-react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'next-share';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LikeForm } from './LikeForm';
import { RatingForm } from './RatingForm';
import { WishForm } from './WishForm';

import { getGameUser } from '@/lib/fetch/game';
import { DialogFormProps } from '@/Types/Dialog';
import { GameFormProps } from '@/Types/Form';

export function GameForm(props: DialogFormProps) {
  const router = useRouter()
  const [data, setData] = useState<GameFormProps>()
  const [loading, setLoading] = useState(false)
  const twitch = `https://www.twitch.tv/directory/category/${props.slug}`

  async function handleOpen() {
    setLoading(true)
    const isReviwed = await getGameUser(props.slug)

    if (isReviwed) {
      setData({
        rating: isReviwed.rating,
        review: isReviwed?.review?.length > 0,
        like: isReviwed.likes.length > 0,
        wish: isReviwed.wish.length > 0,
      })
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <Dialog.Root onOpenChange={handleOpen}>
      <Dialog.Trigger asChild>
        {props.children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blue-900 opacity-90 data-[state=open]:animate-overlayShow fixed inset-0 z-10" />
        <Dialog.Content className="w-full max-w-[700px] max-h-full fixed bottom-0 left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 overflow-auto bg-blue-900 rounded-2xl shadow-2xl py-6 data-[state=open]:animate-contentShow focus:outline-none responsive:translate-y-0 responsive:rounded-b-none" onCloseAutoFocus={() => router.refresh()}>
          {loading ? <GameFormSkeleton /> :
            <div>
              <Dialog.Title className="font-semibold text-md text-white-100 px-5">
                {props.name}
              </Dialog.Title>
              <header className="flex items-start justify-center gap-16 mt-6 px-5 small-screen:gap-8">
                <div className="cursor-pointer font-semibold text-sm text-center text-gray-500 p-2 transition-colors hover:text-blue-300 responsive:text-xs small-screen:text-2xs">
                  {!data?.review ?
                    <Link className="flex flex-col items-center gap-1" href={`/reviews/${props.slug}/write`}>
                      <Pencil />
                      <p>Write a review</p>
                    </Link> :
                    <Link className="flex flex-col items-center gap-1 text-blue-300" href={`/reviews/${props.slug}/write`}>
                      <FileEdit />
                      <p>Edit review</p>
                    </Link>
                  }
                </div>
                <LikeForm
                  slug={props.slug}
                  isLike={data?.like}
                  title={true}
                  currentUserId={props.userId}
                />
                <WishForm
                  slug={props.slug}
                  isWish={data?.wish}
                  title={true}
                  currentUserId={props.userId}
                />
              </header>
              <section className="flex flex-col items-center gap-[10px] mt-6 mb-4 px-5">
                <RatingForm slug={props.slug} value={Number(data?.rating)} />
                <p className="font-semibold text-sm text-center text-white-200">rate</p>
              </section>
              <hr className="border-white-200" />
              <footer className="flex flex-col items-start gap-4 font-semibold text-sm text-white-200 mt-4 px-5">
                <Link className="flex items-center gap-2 p-1 hover:text-purple-twitch" href={twitch} target="_blank">
                  <Twitch size={18} />
                  <span>See on twitch</span>
                </Link>
                <div className="flex flex-wrap items-center gap-2 p-1">
                  <Share2 size={18} />
                  <span>Share with friends:</span>
                  <div className="flex flex-wrap items-center gap-2 p-1">
                    <TwitterShareButton url={`${props.slug}`}>
                      <TwitterIcon size={22} round />
                    </TwitterShareButton>
                    <FacebookShareButton url={`${props.slug}`}>
                      <FacebookIcon size={22} round />
                    </FacebookShareButton>
                    <WhatsappShareButton url={`${props.slug}`}>
                      <WhatsappIcon size={22} round />
                    </WhatsappShareButton>
                    <RedditShareButton url={`${props.slug}`}>
                      <RedditIcon size={22} round />
                    </RedditShareButton>
                    <LinkedinShareButton url={`${props.slug}`}>
                      <LinkedinIcon size={22} round />
                    </LinkedinShareButton>
                  </div>
                </div>
              </footer>
              <Dialog.Close asChild>
                <button className="absolute top-2 right-2 inline-flex items-center justify-center text-white-100 hover:bg-white-200 rounded-full p-1 focus:outline-none responsive:hidden" aria-label="Close">
                  <X />
                </button>
              </Dialog.Close>
            </div>
          }
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function GameFormSkeleton() {
  return (
    <div className="animate-pulse">
      <Dialog.Title className="px-5">
        <div className="w-[40%] h-5 bg-slate-700 rounded-full"></div>
      </Dialog.Title>
      <header className="flex items-start justify-center gap-8 mt-6 px-5">
        {[...Array(3)].map((game, index) =>
          <div key={index} className="flex flex-col items-center p-2">
            <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
            <div className="w-16 h-3 bg-slate-700 rounded-full mt-1"></div>
          </div>
        )}
      </header>
      <section className="flex flex-col items-center gap-[10px] mt-6 mb-4 px-5">
        <div className="w-40 h-6 bg-slate-700 rounded-lg"></div>
        <div className="w-8 h-3 bg-slate-700 rounded-full"></div>
      </section>
      <hr className="border-slate-700" />
      <footer className="flex flex-col items-start gap-4 mt-4 px-5">
        {[...Array(2)].map((share, index) =>
          <div key={index} className="flex flex-col items-center p-2">
            <div className="w-24 h-3 bg-slate-700 rounded-full"></div>
          </div>
        )}
      </footer>
    </div>
  )
}