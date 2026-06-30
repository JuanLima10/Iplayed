import { ISearchParams } from '@/common/interfaces/search-params.interface'
import { settingsTab } from '@/common/utils/tab-resolver.util'
import { user_api } from '@/src/services/user.service'
import { redirect } from 'next/navigation'
import { DeleteUser } from './components/delete-user'
import { HeaderProfile } from './components/header-profile'
import { Sidebar } from './components/sidebar'
import { UpdateUser } from './components/update-user'
import { UpsertBest } from './components/upsert-best'

export const SETTINGS_TABS = ['profile', 'appearence', 'account'] as const

export default async function SettingsPage({ searchParams }: ISearchParams) {
  const me = await user_api.getMe()
  if (!me) return redirect('/')

  const { tab } = (await searchParams) ?? {}
  const currentTab = settingsTab(tab)

  return (
    <main className="mx-auto max-w-360 px-5 pt-64 sm:px-8 sm:pt-40">
      <HeaderProfile {...me} />

      <section className="flex flex-col gap-8 py-8 md:flex-row">
        <Sidebar />
        <div className="flex-1">
          {currentTab === 'profile' && <UpdateUser {...me} />}
          {currentTab === 'appearence' && <UpsertBest userId={me.id} />}
          {currentTab === 'account' && <DeleteUser />}
        </div>
      </section>
    </main>
  )
}
