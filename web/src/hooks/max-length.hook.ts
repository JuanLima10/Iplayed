import { useEffect, useState } from 'react'

function getMaxLength(width: number): number {
  if (width < 640) return 120
  return 274
}

export function useMaxLength() {
  const [maxLength, setMaxLength] = useState(274)

  useEffect(() => {
    function update() {
      setMaxLength(getMaxLength(window.innerWidth))
    }

    update()

    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return maxLength
}
