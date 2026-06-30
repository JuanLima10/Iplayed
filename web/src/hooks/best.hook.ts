'use client'

import {
  GameStatusOrderBy,
  GameStatusProgress,
} from '@/common/interfaces/game-status.interface'
import { IGames } from '@/common/interfaces/game.interface'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useGetUserStatus, useUpsertStatus } from './game-status.hook'

const MAX_BEST = 4

export interface IBestGame extends IGames {
  best: number
}

export function useBestGames(userId: string) {
  const [bestGames, setBestGames] = useState<IBestGame[]>([])
  const { upsert, isPending } = useUpsertStatus()

  const { status, isLoading } = useGetUserStatus(userId, {
    isBest: true,
    orderBy: GameStatusOrderBy.BEST,
    order: 'asc',
    limit: MAX_BEST,
  })

  useEffect(() => {
    if (!status) return

    const normalized: IBestGame[] = status
      .filter((s) => s.game && typeof s.best === 'number')
      .map((s) => ({ ...s.game!, best: s.best! }))
      .sort((a, b) => a.best - b.best)

    setBestGames(normalized)
  }, [status])

  async function addGame(game: IGames) {
    if (bestGames.length >= MAX_BEST) {
      toast.error(`You can select up to ${MAX_BEST} games`)
      return
    }

    if (bestGames.some((g) => g.igdbId === game.igdbId)) {
      toast.error('This game is already in your Best list')
      return
    }

    const best = bestGames.length + 1

    await upsert({
      igdbId: game.igdbId,
      status: GameStatusProgress.COMPLETED,
      best,
    })

    setBestGames((prev) => [...prev, { ...game, best }])
    toast.success('Game added to Best list')
  }

  async function removeGame(game: IBestGame) {
    await upsert({
      igdbId: game.igdbId,
      status: GameStatusProgress.COMPLETED,
      best: null,
    })

    setBestGames((prev) => {
      const reordered = prev
        .filter((g) => g.igdbId !== game.igdbId)
        .map((g, i) => ({ ...g, best: i + 1 }))

      reordered.forEach((g) =>
        upsert({
          igdbId: g.igdbId,
          status: GameStatusProgress.COMPLETED,
          best: g.best,
        })
      )

      return reordered
    })

    toast.success('Game removed from Best list')
  }

  function reorderGames(oldIndex: number, newIndex: number) {
    setBestGames((items) => {
      const reordered = arrayMove(items, oldIndex, newIndex).map((g, i) => ({
        ...g,
        best: i + 1,
      }))

      reordered.forEach(({ igdbId, best }) =>
        upsert({
          igdbId,
          best,
          status: GameStatusProgress.COMPLETED,
        })
      )

      return reordered
    })
  }

  return {
    bestGames,
    isLoading: isLoading || isPending,
    maxBest: MAX_BEST,
    addGame,
    removeGame,
    reorderGames,
  }
}
