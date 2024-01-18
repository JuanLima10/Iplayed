'use client'
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { api } from '@/lib/api';
import { headers } from '@/lib/header';
import { RatingForm } from './RatingForm';

import { ReviewFormProps } from '@/Types/Form';
import { toastMessage } from '@/utils/toastMessage';

export function ReviewForm(props: ReviewFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState(false)
  const [initialValue, setInitialValue] = useState(props.review || undefined)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    if (formData.get('review')) {
      await api.post(`/game/${props.slug}`, {
        review: formData.get('review')
      }, headers)
        .then(res => toastMessage(res.data))
        .catch(err => toastMessage(err))
      setLoading(false)
      router.push(`/games/${props.slug}`)
    }
    toastMessage({type: "Conflict", message: "⚠️ You need to write something"})
    setLoading(false)
  }

  return (
    <section>
      <div className="flex justify-between">
        <RatingForm slug={props.slug} value={props.rating} />
      </div>
      <form className="w-[582px] max-w-[90%] absolute -bottom-[416px] left-2/4 -translate-x-2/4 flex flex-col items-end gap-4" onSubmit={handleSubmit}>
        <textarea
          className={`w-full h-80 text-white-100 ${warning && 'placeholder:text-red-900'} bg-white-200 resize-none outline-none rounded-lg p-4`}
          name="review"
          placeholder="Right down your review..."
          value={initialValue}
          onChange={(e: any) => setInitialValue(e.target.value)}
        />
        {loading ?
          <button className="w-[108px] flex justify-center bg-green-300 rounded-full py-2 px-7 mb-5 responsive:w-full" disabled><Loader2 className="animate-spin" /></button> :
          <button className="w-[108px] font-normal text-center bg-green-300 rounded-full py-2 px-7 mb-5" type="submit">Publish</button>
        }
      </form>
    </section>
  )
}