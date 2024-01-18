'use client'
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { DialogProps } from '@/Types/Dialog';
import { Stars } from '../Stars';

export function ReviewModal(props: DialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {props.children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blue-900 opacity-90 data-[state=open]:animate-overlayShow fixed z-10 inset-0" />
        <Dialog.Content className="w-[90%] max-w-[700px] max-h-[90%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 overflow-auto bg-gray-900 rounded-2xl p-6 data-[state=open]:animate-contentShow focus:outline-none">
          <div className="flex items-start gap-4 mt-2 responsive:flex-col responsive:items-center">
            {props.src &&
              <Image
                className="w-[180px] max-w-full rounded-xl responsive:w-32 responsive:rounded-xl"
                src={props.src}
                alt="dialog image"
                width={215} height={300}
              />
            }
            <div className="responsive:min-w-full">
              <div className="flex items-end gap-2">
                {props.avatarUrl &&
                  <Link href={`/user/${props.userId}`}>
                    <Image
                      className="max-w-[32px] h-[32px] object-cover rounded-full"
                      src={props.avatarUrl ? props.avatarUrl : "/img-not-found.png"}
                      alt="user avatar"
                      width={42} height={42}
                    />
                  </Link>
                }
                <span className="font-normal text-sm text-white-200 responsive:text-xs">
                  Review by {' '}
                  <a className="font-semibold text-white-100 transition-colors mr-1 hover:text-blue-300" href={`/user/${props.userId}`}>
                    {props.userName}
                  </a>
                  <Stars value={props.rating} small disabled />
                </span>
              </div>
              <p className="font-normal text-sm text-white-100 mt-2">{props.text}</p>
            </div>
          </div>
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