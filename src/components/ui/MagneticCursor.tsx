import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Global variables to persist mouse position and hover state across component remounts
let lastKnownMousePosition = { x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 }
let lastKnownHoverState = false

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    if (e.clientX === 0 && e.clientY === 0) return
    lastKnownMousePosition = { x: e.clientX, y: e.clientY }
  })
}

export function MagneticCursor() {
  const [mousePosition, setMousePosition] = useState(lastKnownMousePosition)
  const [isHovering, setIsHovering] = useState(lastKnownHoverState)

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none'
    
    // Add global class for links and buttons to hide their cursors too
    const style = document.createElement('style')
    style.innerHTML = `
      * { cursor: none !important; }
    `
    document.head.appendChild(style)

    const updateMousePosition = (e: MouseEvent) => {
      if (e.clientX === 0 && e.clientY === 0) return
      const pos = { x: e.clientX, y: e.clientY }
      lastKnownMousePosition = pos
      setMousePosition(pos)
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement
      const isClickable = target.closest('button') || target.closest('a') || target.closest('input') || target.closest('.hover-trigger')
      const hovering = !!isClickable
      lastKnownHoverState = hovering
      setIsHovering(hovering)
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.body.style.cursor = 'auto'
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      {/* Dynamic Snappy Morphing Cursor Outer Capsule */}
      <motion.div
        initial={false}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          border: '1.5px solid var(--accent3)',
          pointerEvents: 'none',
          zIndex: 100000, // Higher than the login modal's z-index
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          boxShadow: isHovering ? '0 0 12px var(--accent3)' : 'none',
        }}
        animate={{
          x: mousePosition.x - (isHovering ? 18 : 8),
          y: mousePosition.y - (isHovering ? 10 : 8),
          width: isHovering ? 36 : 16,
          height: isHovering ? 20 : 16,
          borderRadius: isHovering ? '8px' : '50%',
          borderColor: isHovering ? 'var(--accent2)' : 'var(--accent3)',
        }}
        transition={{ type: 'spring', stiffness: 750, damping: 38, mass: 0.15 }}
      >
        {isHovering && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              color: 'var(--accent3)', 
              fontSize: '10px', 
              fontWeight: 800, 
              fontFamily: 'monospace',
              letterSpacing: '-1px',
              lineHeight: 1,
            }}
          >
            &lt;/&gt;
          </motion.span>
        )}
      </motion.div>

      {/* Sharp Precision Inner Dot */}
      <motion.div
        initial={false}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '5px', height: '5px',
          backgroundColor: 'var(--accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 100001, // Higher than outer ring z-index
        }}
        animate={{
          x: mousePosition.x - 2.5,
          y: mousePosition.y - 2.5,
          scale: isHovering ? 0 : 1, // Shrink dot completely inside the capsule on hover
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.08 }}
      />
      
      {/* Smooth Background Spotlight Tracking */}
      <motion.div
        initial={false}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(108, 99, 255, 0.06) 0%, transparent 65%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
    </>
  )
}
