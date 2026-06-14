import { useEffect, useState } from 'react'

export function useDeadlinePassed(deadline: string | undefined) {
  const [passed, setPassed] = useState(() =>
    deadline ? new Date(deadline) <= new Date() : false,
  )

  useEffect(() => {
    if (!deadline) return

    const check = () => setPassed(new Date(deadline) <= new Date())
    check()
    const id = setInterval(check, 1_000)
    return () => clearInterval(id)
  }, [deadline])

  return passed
}
