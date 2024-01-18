'use client'
import * as Dialog from '@radix-ui/react-dialog';
import { Loader2, X } from 'lucide-react';
import { Suspense } from 'react';

import { UserLikedGames } from '../UserLikedGames';

import { UserGamesModal } from '@/Types/Dialog';

export function LikeModal(props: UserGamesModal) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {props.children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blue-900 opacity-90 data-[state=open]:animate-overlayShow fixed z-10 inset-0" />
        <Dialog.Content className="w-[90%] max-w-[400px] max-h-[90%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 overflow-auto bg-gray-900 rounded-2xl p-6 data-[state=open]:animate-contentShow focus:outline-none">
          <Suspense fallback={
            <div className="w-full flex justify-center items-center h-[500px] max-h-[90%] animate-pulse -mt-4">
              <Loader2 className="text-white-100 animate-spin" size={54} />
            </div>
          }>
            <div className="flex flex-col items-start justify-center gap-4 mt-4">
              <UserLikedGames
                userId={props.userId}
                offset={0}
                limit={10}
                isList
              />
            </div>
          </Suspense>
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 inline-flex items-center justify-center text-white-100 hover:bg-white-200 rounded-full p-1 focus:outline-none" aria-label="Close">
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}