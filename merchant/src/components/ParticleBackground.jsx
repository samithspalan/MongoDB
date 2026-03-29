import { useEffect, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function ParticleBackground(){
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const { isDark } = useTheme()

  useEffect(()=>{
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    class Particle {
      constructor(){
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 1
        this.vy = (Math.random() - 0.5) * 1
        this.size = Math.random() * 3 + 1
        this.opacity = Math.random() * 0.6 + 0.3
      }
      update(){
        this.x += this.vx
        this.y += this.vy
        if(this.x < 0) this.x = canvas.width
        if(this.x > canvas.width) this.x = 0
        if(this.y < 0) this.y = canvas.height
        if(this.y > canvas.height) this.y = 0
      }
      draw(color){
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const createParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 10000))
      for(let i=0;i<particleCount;i++) particlesRef.current.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)

      if(isDark) ctx.fillStyle = 'rgba(10,12,20,0.03)'
      else ctx.fillStyle = 'rgba(255,255,255,0.03)'
      ctx.fillRect(0,0,canvas.width,canvas.height)

      const particleColor = isDark ? '#60A5FA' : '#2563EB'
      const lineColor = isDark ? 'rgba(96,165,250,0.18)' : 'rgba(37,99,235,0.12)'

      particlesRef.current.forEach(p=>{ p.update(); p.draw(particleColor) })

      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i]
          const b = particlesRef.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 110) {
            ctx.globalAlpha = (110 - distance) / 110 * 0.35
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    createParticles()
    animate()

    return ()=>{
      window.removeEventListener('resize', resizeCanvas)
      if(animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  },[isDark])

  return (
    <canvas ref={canvasRef} className="particle-canvas"/>
  )
}
