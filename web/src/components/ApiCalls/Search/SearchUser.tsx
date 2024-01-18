import Image from 'next/image';
import Link from 'next/link';

import { api } from '@/lib/api';
import { SearchGetProps } from '@/Types/Search';
import { UserProps } from '@/Types/User';

export async function SearchUser(props: SearchGetProps) {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const users = props.search &&
    await api.get(`/user`).then(response => response.data.filter((user: UserProps) =>
      user.login?.toLowerCase().includes(String(props.search)) ||
      user.name?.toLowerCase().includes(String(props.search))
    ))

  return (
    <div className="flex flex-col gap-4">
      {users.map((user: UserProps) => (
        <Link className="flex flex-wrap items-center gap-4 text-white-100 hover:text-green-300" key={user.id} href={`/user/${user.id}`}>
          <Image
            className="w-16 h-16 object-cover rounded-full small-screen:w-12 small-screen:h-12"
            src={user.avatarUrl ? user.avatarUrl : "/img-not-found.png"}
            alt={user.login ? user.login : "username"}
            width={400} height={400}
          />
          <div>
            <span className="font-semibold text-sm">{user.name}</span>
            <p className="font-semibold text-sm text-white-200">@{user.login}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export function SearchUserSkeleton({ limit }: { limit: number }) {
  return (
    <div className="flex flex-wrap gap-2 responsive:flex-col">
      {[...Array(limit)].map((search, index) => (
        <div key={index} className="flex items-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
          <div className="px-2">
            <div className="w-40 h-5 bg-slate-700 rounded-lg"></div>
            <div className="w-32 h-5 bg-slate-700 rounded-full mt-1"></div>
          </div>
        </div>
      ))}
    </div>
  )
}