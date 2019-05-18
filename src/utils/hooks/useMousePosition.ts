import { useState } from 'react'
import useEventListener from './useEventListener'

type UseMousePositionOptions = {
  /** Throttle the updates to only occur every x ms */
  throttle?: number
}

export default function useMousePosition(
  options: UseMousePositionOptions = {},
) {
  const [position, setPosition] = useState(() => ({ clientX: 0, clientY: 0 }))
  const [lastUpdate, setLastUpdate] = useState(0)

  useEventListener('mousemove', ({ clientX, clientY }) => {
    const now = Date.now()
    if (options.throttle && now - lastUpdate < options.throttle) return
    setPosition({ clientX, clientY })
    setLastUpdate(now)
  })

  return [position]
}
