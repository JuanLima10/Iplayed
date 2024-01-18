'use client'
import * as Dialog from '@radix-ui/react-dialog';
import { PlusCircle, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';

import { api } from '@/lib/api';
import { headers } from '@/lib/header';
import { toastMessage } from '@/utils/toastMessage';

export function FavDelete({ slug }: { slug: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    const favId = await api.get(`/fav/${slug}`, headers)
      .then(response => response.data)
    if (favId) {
      await api.delete(`/game/fav/${favId.id}`, headers)
        .then((res) => (router.refresh(), toastMessage(res.data)))
        .catch((err) => toastMessage(err.response.data))
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <button className="absolute -right-2 -top-2 bg-gray-500 rounded-full p-1" onClick={handleDelete} disabled={loading}>
      <X className="text-blue-900" size={18} />
    </button>
  )
}

export function FavForm({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathName = usePathname()

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    router.push(`${pathName}?search=${e.target.value.toLowerCase()}`)
  }

  async function handleClick(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = {
      slug: formData.get('game'),
      id: pathName.replace('/user/', '').replace('/settings', ''),
    }
    if (data.slug !== null) {
      await api.post(`/game/fav/${data.slug}`, data, headers)
        .then((res) => (router.refresh(), toastMessage(res.data)))
        .catch((err) => toastMessage(err.response.data))
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="w-[120px] h-[160px] flex items-center justify-center cursor-pointer bg-white-200 rounded-lg transition-all responsive:w-[65px] responsive:h-[90px] hover:brightness-75"><PlusCircle className="text-blue-900" size={32} /></div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blue-900 opacity-90 data-[state=open]:animate-overlayShow fixed z-10 inset-0" />
        <Dialog.Content className="w-[600px] max-w-[90%] h-auto max-h-[90%] min-h-[200px] flex justify-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-blue-700 rounded-3xl data-[state=open]:animate-contentShow focus:outline-none" onCloseAutoFocus={() => router.push(pathName)}>
          <div className="w-full m-4">
            <input
              className="w-full h-8 max-w-full font-bold text-sm text-blue-900 bg-gray-500 rounded-full outline-none px-4 placeholder:font-normal placeholder:text-blue-900"
              type="text"
              placeholder="Search a game here"
              onChange={handleChange}
            />
            <div className="h-full max-h-full overflow-y-auto">
              <Dialog.Close asChild>
                <form className="p-8 responsive:px-0" onClick={handleClick} key={Math.random()}>
                  {children}
                </form>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}