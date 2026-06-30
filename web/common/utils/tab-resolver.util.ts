import { USER_TABS_CONFIG, USER_VALID_TABS } from '@/common/schemas/user.schema'
import { SETTINGS_TABS } from '@/src/app/(pages)/settings/page'

export type UserTab = keyof typeof USER_VALID_TABS
export function userTab(tab?: unknown): tab is UserTab {
  return typeof tab === 'string' && tab in USER_TABS_CONFIG
}

export type SettingsTab = (typeof SETTINGS_TABS)[number]
export function settingsTab(tab?: unknown): SettingsTab {
  if (tab && SETTINGS_TABS.includes(tab as SettingsTab)) {
    return tab as SettingsTab
  }

  return SETTINGS_TABS[0]
}
