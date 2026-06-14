import { motion } from 'framer-motion'
import React, { type ReactNode, useState, useRef } from 'react'

export function FadeIn({ children, delay = 0, className = '', style = {} }: { children: ReactNode, delay?: number, className?: string, style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
}

export function StaggeredList({ children, className = '', style = {} }: { children: ReactNode, className?: string, style?: React.CSSProperties }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
      style={style}
    >
      {/* We assume children is an array of elements. We map over them and wrap each in the item variant */}
      {Array.isArray(children) ? children.map((child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      )) : (
        <motion.div variants={item}>{children}</motion.div>
      )}
    </motion.div>
  )
}

export function HoverCard({ children, className = '', style = {} }: { children: ReactNode, className?: string, style?: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export function HolographicCard({ children, className = '', style = {} }: { children: ReactNode, className?: string, style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -8 // Max 8 deg tilt
    const rotateY = ((x - centerX) / centerX) * 8
    
    setRotate({ x: rotateX, y: rotateY })
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
    setGlare(prev => ({ ...prev, opacity: 0 }))
  }

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: glare.opacity ? 1.025 : 1,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.5 }}
      style={{
        ...style,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--card)',
        backdropFilter: 'blur(12px) saturate(120%)',
        WebkitBackdropFilter: 'blur(12px) saturate(120%)',
        border: '1px solid var(--border)',
        boxShadow: glare.opacity 
          ? 'var(--card-shadow-hover)' 
          : 'var(--card-shadow)',
        borderRadius: '16px',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.18) 0%, transparent 60%)`,
          opacity: glare.opacity,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(20px)', padding: '1.75rem' }}>
        {children}
      </div>
    </motion.div>
  )
}
