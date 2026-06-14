import { useEffect, useState } from 'react'

export function useLiveParticipantCount(baseCount: number) {
  const [count, setCount] = useState(baseCount)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const scheduleBump = () => {
      const delay = 5_000 + Math.random() * 3_000
      timeoutId = setTimeout(() => {
        setCount((c) => c + Math.floor(Math.random() * 3))
        scheduleBump()
      }, delay)
    }

    scheduleBump()
    return () => clearTimeout(timeoutId)
  }, [])

  return count
}
