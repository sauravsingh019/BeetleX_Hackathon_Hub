import { useEffect, useRef } from 'react'

export function QuantumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = Math.min(130, Math.floor(width * height / 12000))

    let mouse = { x: -1000, y: -1000 }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      baseX: number
      baseY: number
      size: number
      color: string

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.baseX = this.x
        this.baseY = this.y
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        this.size = Math.random() * 2.0 + 0.8
        this.color = Math.random() > 0.5 ? 'rgba(108, 99, 255, 0.5)' : 'rgba(34, 211, 238, 0.5)'
      }

      update() {
        // Normal movement
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1

        // Mouse interaction (Magnetic push/pull)
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 180

        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist
          const angle = Math.atan2(dy, dx)
          // Gently repel
          this.x -= Math.cos(angle) * force * 1.5
          this.y -= Math.sin(angle) * force * 1.5
        } else {
          // Slowly return to base trajectory
          this.vx = this.vx * 0.995 + (Math.random() - 0.5) * 0.01
          this.vy = this.vy * 0.995 + (Math.random() - 0.5) * 0.01
        }

        // Limit speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (speed > 1.5) {
          this.vx = (this.vx / speed) * 1.5
          this.vy = (this.vy / speed) * 1.5
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        // Add a soft glow to the particles
        ctx.shadowBlur = 4
        ctx.shadowColor = this.color
        ctx.fill()
        ctx.shadowBlur = 0 // Reset
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const connect = () => {
      if (!ctx) return
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = dx * dx + dy * dy

          if (distance < 15000) {
            const opacity = 1 - (distance / 15000)
            ctx.strokeStyle = `rgba(108, 99, 255, ${opacity * 0.12})` // Faint background line matching theme
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      connect()
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1, // Changed to -1 to sit perfectly behind all content but above page backgrounds
        opacity: 0.9,
      }}
    />
  )
}
