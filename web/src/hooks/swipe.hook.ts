import React from 'react'

export function useSwipe(onSwipe: (dir: 'left' | 'right') => void) {
  const startX = React.useRef(0)

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    const endX = e.changedTouches[0].clientX
    const diff = startX.current - endX

    if (Math.abs(diff) < 50) return

    onSwipe(diff > 0 ? 'left' : 'right')
  }

  return { onTouchStart, onTouchEnd }
}
