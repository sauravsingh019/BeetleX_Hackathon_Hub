
import { useCallback, useId, useState, type KeyboardEvent } from 'react'

export interface AccordionItem {
  id: string
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
}

/**
 * Accessible accordion with single-open behavior (opening one panel closes the others).
 * Keyboard: Tab to navigate items, Enter/Space to toggle, ArrowUp/ArrowDown to move focus.
 */
export function Accordion({ items }: AccordionProps) {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  const toggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const next = items[index + 1] ?? items[0]
      document.getElementById(`${baseId}-trigger-${next.id}`)?.focus()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      const prev = items[index - 1] ?? items[items.length - 1]
      document.getElementById(`${baseId}-trigger-${prev.id}`)?.focus()
    }
  }

  return (
    <div className="w-full">
      {items.map((item, index) => {
        const isOpen = openId === item.id
        const triggerId = `${baseId}-trigger-${item.id}`
        const panelId = `${baseId}-panel-${item.id}`

        return (
          <div key={item.id} className="border-b border-border">
            <h3>
              <button
                id={triggerId}
                type="button"
                className="flex w-full items-center justify-between py-[1.1rem] text-left text-[15px] font-medium text-text-primary bg-transparent border-none cursor-pointer focus-visible:outline-none"
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                {item.title}
                <span className={`text-accent text-[18px] transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>+</span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[200px]' : 'max-h-0'}`}
            >
              <p className="text-[14px] text-text-secondary pb-4 leading-[1.7]">{item.content}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
