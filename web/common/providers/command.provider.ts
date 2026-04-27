'use client'

import { createContext, useContext } from 'react'

interface CommandProviderValue {
  open: boolean
  setOpen: (open: boolean) => void
}

export const CommandProvider = createContext<CommandProviderValue | null>(null)

export function useCommand() {
  const ctx = useContext(CommandProvider)
  if (!ctx) {
    throw new Error('Command components must be used inside <Command>')
  }
  return ctx
}
