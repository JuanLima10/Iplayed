'use client'
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { SettingsFormProps } from '@/Types/Form';
import { api } from '@/lib/api';
import { headers } from '@/lib/header';
import { toastMessage } from '@/utils/toastMessage';

export function SettingsForm(props: SettingsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState(false)

  const [name, setName] = useState(props.name)
  const [email, setEmail] = useState(props.email)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    if (name !== '' && email !== '') {
      setWarning(false)
      await api.put(`/user/${props.id}`, {
        name: name,
        email: email
      }, headers)
        .then((res) => (
          router.refresh(),
          toastMessage(res.data),
          setLoading(false)
        ))
        .catch(err => toastMessage(err.response.data))
      setLoading(false)
    } else {
      setLoading(false)
      setWarning(true)
    }
    setLoading(false)
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <span className="font-bold text-xl text-white-100 responsive:text-lg">Account Settings</span>
      <div className="mt-4">
        <label className="font-semibold text-sm text-white-100" htmlFor="username">Username</label>
        <input className="w-full h-8 max-w-full font-bold text-sm text-white-200 bg-gray-900 rounded-3xl outline-none px-3 placeholder:font-normal placeholder:text-blue-900" type="text" value={`@${props.login}`} disabled />
      </div>
      <div className="mt-4">
        <label className="font-semibold text-sm text-white-100" htmlFor="name">Name</label>
        <input className={`w-full h-8 max-w-full font-bold text-sm text-blue-900 ${warning ? 'bg-red-300' : 'bg-gray-500'} rounded-3xl outline-none px-3 placeholder:font-normal placeholder:text-blue-900`} name="name" type="name" value={name} onChange={(e: any) => setName(e.target.value)} />
      </div>
      <div className="mt-4">
        <label className="font-semibold text-sm text-white-100" htmlFor="email">Email</label>
        <input className={`w-full h-8 max-w-full font-bold text-sm text-blue-900 ${warning ? 'bg-red-300' : 'bg-gray-500'} rounded-3xl outline-none px-3 placeholder:font-normal placeholder:text-blue-900`} name="email" type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
      </div>
      {loading ?
        <button className="w-[148px] flex justify-center bg-green-300 rounded-full py-2 px-7 mt-8" disabled><Loader2 className="animate-spin" size={20} /></button> :
        <button className="font-semibold text-sm text-center bg-green-300 rounded-full py-2 px-7 mt-8" type="submit">Save Changes</button>
      }
    </form>
  )
}