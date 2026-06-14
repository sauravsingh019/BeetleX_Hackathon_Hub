import { useState, useEffect } from 'react'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

export function CipherText({ text, className = '', style = {}, speed = 30 }: { text: string, className?: string, style?: React.CSSProperties, speed?: number }) {
  const [displayText, setDisplayText] = useState('')
  const [iteration, setIteration] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    
    // Reset when text changes
    setIteration(0)
    
    interval = setInterval(() => {
      setDisplayText(() => {
        let newText = ''
        for (let i = 0; i < text.length; i++) {
          if (i < iteration) {
            // Already decoded
            newText += text[i]
          } else {
            // Scrambled
            newText += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
          }
        }
        return newText
      })

      setIteration((i) => {
        if (i >= text.length) {
          clearInterval(interval)
          return i
        }
        return i + 1.5 // Reveal 1.5 characters per tick to make it decrypt quickly and smoothly
      })
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return <span className={className} style={style}>{displayText}</span>
}
