'use client'

import { cn } from '@/common/utils/cn.util'
import { Settings, User2, Wallpaper } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function Sidebar() {
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') ?? 'profile'

  const MENU = [
    { key: 'profile', label: 'Public profile', icon: User2 },
    { key: 'appearence', label: 'Appearence', icon: Wallpaper },
    { key: 'account', label: 'Account', icon: Settings },
  ]

  return (
    <aside className="w-72 max-w-full space-y-1">
      {MENU.map(({ key, label, icon: Icon }) => {
        const isActive = currentTab === key

        return (
          <Link
            key={key}
            href={`?tab=${key}`}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              'hover:bg-card',
              isActive
                ? 'bg-card font-medium text-foreground'
                : 'text-muted-foreground'
            )}
          >
            <Icon size={18} suppressHydrationWarning />
            {label}
          </Link>
        )
      })}
    </aside>
  )
}
