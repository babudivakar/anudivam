import { useEffect, useRef, useState, memo } from 'react'

const PETAL_COLORS = ['#ff9a9e','#fecfef','#ffd1dc','#ffb347','#f7dc6f','#e8a87c','#ff6b6b','#fab1a0','#ffeaa7']
const GOLD_COLORS = ['#ffd700','#ffed4a','#f6e58d','#f9ca24','#daa520','#e8b923','#fff4c8']
const CONFETTI_COLORS = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff8e9e','#c084fc','#fb923c','#fbbf24','#e8a87c']

function createPetal(w, h) {
  return {
    type: 'petal', x: Math.random() * w, y: -20 - Math.random() * 80,
    size: 5 + Math.random() * 10, speedY: 0.35 + Math.random() * 0.7,
    speedX: (Math.random() - 0.5) * 0.3, rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.03, opacity: 0.35 + Math.random() * 0.4,
    color: PETAL_COLORS[~~(Math.random() * PETAL_COLORS.length)],
    wobble: Math.random() * Math.PI * 2, wobbleSpd: 0.012 + Math.random() * 0.015,
    wobbleAmp: 0.4 + Math.random() * 0.6, life: Infinity, maxLife: 1,
    gravity: 0, decay: 0,
  }
}
function createGold(cx, cy) {
  const a = Math.random() * Math.PI * 2, spd = 1.5 + Math.random() * 5
  return {
    type: 'star', x: cx, y: cy, size: 2 + Math.random() * 5,
    speedX: Math.cos(a) * spd, speedY: Math.sin(a) * spd - 2.5,
    rotation: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.08,
    opacity: 1, color: GOLD_COLORS[~~(Math.random() * GOLD_COLORS.length)],
    wobble: 0, wobbleSpd: 0, wobbleAmp: 0,
    life: 55 + Math.random() * 55, maxLife: 110, gravity: 0.04, decay: 0.006,
  }
}
function createConfetti(cx, cy) {
  const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.7, spd = 3 + Math.random() * 7
  return {
    type: 'rect', x: cx, y: cy, size: 5 + Math.random() * 6,
    w: 4 + Math.random() * 5, h: 8 + Math.random() * 6,
    speedX: Math.cos(a) * spd, speedY: Math.sin(a) * spd,
    rotation: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.18,
    opacity: 1, color: CONFETTI_COLORS[~~(Math.random() * CONFETTI_COLORS.length)],
    wobble: Math.random() * Math.PI * 2, wobbleSpd: 0.04 + Math.random() * 0.04, wobbleAmp: 1.5,
    life: 90 + Math.random() * 70, maxLife: 160, gravity: 0.055, decay: 0,
  }
}
function createFireworkTrail(w, h) {
  return {
    type: 'dot', x: w * (0.15 + Math.random() * 0.7), y: h,
    targetY: h * (0.1 + Math.random() * 0.25), size: 3,
    speedX: 0, speedY: -4.5 - Math.random() * 3,
    rotation: 0, rotSpeed: 0, opacity: 1,
    color: GOLD_COLORS[~~(Math.random() * GOLD_COLORS.length)],
    wobble: 0, wobbleSpd: 0, wobbleAmp: 0,
    life: Infinity, maxLife: 1, gravity: 0, decay: 0,
  }
}
function createSpark(x, y, col) {
  const a = Math.random() * Math.PI * 2, spd = 1 + Math.random() * 4
  return {
    type: 'star', x, y, size: 1.5 + Math.random() * 3,
    speedX: Math.cos(a) * spd, speedY: Math.sin(a) * spd,
    rotation: Math.random() * Math.PI, rotSpeed: 0, opacity: 1,
    color: col, wobble: 0, wobbleSpd: 0, wobbleAmp: 0,
    life: 35 + Math.random() * 45, maxLife: 80, gravity: 0.03, decay: 0.009,
  }
}

function tick(p) {
  p.y += p.speedY; p.x += p.speedX
  if (p.wobbleAmp) { p.wobble += p.wobbleSpd; p.x += Math.sin(p.wobble) * p.wobbleAmp }
  p.rotation += p.rotSpeed
  if (p.gravity) p.speedY += p.gravity
  if (p.decay) p.size *= (1 - p.decay)
  if (p.life !== Infinity) { p.life--; p.opacity = Math.max(0, p.life / p.maxLife) }
}

function draw(ctx, p) {
  ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation); ctx.globalAlpha = p.opacity
  if (p.type === 'petal') {
    ctx.fillStyle = p.color; ctx.beginPath()
    ctx.ellipse(0, 0, p.size * 0.45, p.size, 0, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = p.opacity * 0.4; ctx.beginPath()
    ctx.ellipse(p.size * 0.08, -p.size * 0.12, p.size * 0.18, p.size * 0.45, 0.3, 0, Math.PI * 2); ctx.fill()
  } else if (p.type === 'star') {
    ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = p.size * 2
    ctx.beginPath()
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2
      ctx.lineTo(Math.cos(a) * p.size, Math.sin(a) * p.size)
      ctx.lineTo(Math.cos(a + Math.PI / 4) * p.size * 0.3, Math.sin(a + Math.PI / 4) * p.size * 0.3)
    }
    ctx.closePath(); ctx.fill()
  } else if (p.type === 'rect') {
    ctx.fillStyle = p.color; ctx.fillRect(-(p.w || p.size) / 2, -(p.h || p.size) / 2, p.w || p.size, p.h || p.size)
  } else if (p.type === 'dot') {
    ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 10
    ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()
}

export const ParticleCanvas = memo(function ParticleCanvas({ active, triggerBurst, triggerConfetti, triggerFireworks }) {
  const ref = useRef(null), parts = useRef([]), anim = useRef(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'), dpr = window.devicePixelRatio || 1
    const resize = () => { c.width = innerWidth * dpr; c.height = innerHeight * dpr; c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    resize(); addEventListener('resize', resize)
    const loop = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      if (active && Math.random() < 0.025) parts.current.push(createPetal(innerWidth, innerHeight))
      parts.current = parts.current.filter(p => {
        tick(p)
        if (p.type === 'dot' && p.y <= p.targetY) {
          const col = CONFETTI_COLORS[~~(Math.random() * CONFETTI_COLORS.length)]
          for (let i = 0; i < 35; i++) parts.current.push(createSpark(p.x, p.y, col))
          return false
        }
        if (p.life !== Infinity && p.life <= 0) return false
        if (p.y > innerHeight + 30 || p.size < 0.3 || p.opacity <= 0) return false
        draw(ctx, p); return true
      })
      anim.current = requestAnimationFrame(loop)
    }
    anim.current = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(anim.current); removeEventListener('resize', resize) }
  }, [active])
  useEffect(() => { if (!triggerBurst) return; for (let i = 0; i < 90; i++) parts.current.push(createGold(innerWidth / 2, innerHeight / 2)) }, [triggerBurst])
  useEffect(() => { if (!triggerConfetti) return; for (let i = 0; i < 120; i++) parts.current.push(createConfetti(innerWidth / 2, innerHeight * 0.65)) }, [triggerConfetti])
  useEffect(() => {
    if (!triggerFireworks) return; let n = 0
    const iv = setInterval(() => { if (n >= 6) { clearInterval(iv); return }; parts.current.push(createFireworkTrail(innerWidth, innerHeight)); n++ }, 350)
    return () => clearInterval(iv)
  }, [triggerFireworks])
  return <canvas ref={ref} className="particle-canvas" aria-hidden="true" />
})

export function SparkleTrail() {
  const ref = useRef(null), sp = useRef([]), anim = useRef(null), fc = useRef(0)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'), dpr = window.devicePixelRatio || 1
    const resize = () => { c.width = innerWidth * dpr; c.height = innerHeight * dpr; c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    resize(); addEventListener('resize', resize)
    const onMove = e => {
      const x = e.touches ? e.touches[0].clientX : e.clientX, y = e.touches ? e.touches[0].clientY : e.clientY
      if (fc.current++ % 3 === 0) sp.current.push({
        type: 'star', x: x + (Math.random() - 0.5) * 18, y: y + (Math.random() - 0.5) * 18,
        size: 1.5 + Math.random() * 3.5, speedX: (Math.random() - 0.5) * 0.4, speedY: -0.4 - Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2, rotSpeed: 0.05, opacity: 1,
        color: GOLD_COLORS[~~(Math.random() * GOLD_COLORS.length)],
        wobble: 0, wobbleSpd: 0, wobbleAmp: 0, life: 22 + Math.random() * 18, maxLife: 40, gravity: 0.015, decay: 0.012,
      })
    }
    addEventListener('mousemove', onMove); addEventListener('touchmove', onMove, { passive: true })
    const loop = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      sp.current = sp.current.filter(p => { tick(p); if (p.life <= 0 || p.size < 0.3) return false; draw(ctx, p); return true })
      anim.current = requestAnimationFrame(loop)
    }
    anim.current = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(anim.current); removeEventListener('resize', resize); removeEventListener('mousemove', onMove); removeEventListener('touchmove', onMove) }
  }, [])
  return <canvas ref={ref} className="sparkle-canvas" aria-hidden="true" />
}

export function SelfDrawingRangoli({ className = '' }) {
  const [vis, setVis] = useState(false), ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.25 })
    obs.observe(ref.current); return () => obs.disconnect()
  }, [])
  return <svg ref={ref} className={`rangoli ${className} ${vis ? 'draw' : ''}`} viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="92" className="rp" /><circle cx="100" cy="100" r="78" className="rp d2" />
    {Array.from({ length: 8 }, (_, i) => <g key={i} transform={`rotate(${i * 45} 100 100)`}>
      <path d="M100 18c13 16 13 32 0 48-13-16-13-32 0-48Z" className="rp d3" />
      <path d="M100 33c7 9 7 18 0 27-7-9-7-18 0-27Z" className="rp d4" />
    </g>)}
    <circle cx="100" cy="100" r="20" className="rp d5" /><circle cx="100" cy="100" r="9" className="rp d6" />
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI * 2) / 8
      return <circle key={i} cx={100 + Math.cos(a) * 57} cy={100 + Math.sin(a) * 57} r="3.5" className="rangoli-dot" style={{ animationDelay: `${1.6 + i * 0.12}s` }} />
    })}
  </svg>
}

export function FloatingDiyas({ count = 7 }) {
  return <div className="floating-diyas" aria-hidden="true">
    <div className="diya-water" />
    {Array.from({ length: count }, (_, i) => <div key={i} className="floating-diya" style={{
      left: `${8 + (i * 84 / count)}%`, animationDelay: `${i * 0.6}s`, animationDuration: `${3.5 + Math.random() * 2.5}s`,
    }}>
      <div className="diya-flame" /><div className="diya-body" /><div className="diya-glow" />
    </div>)}
  </div>
}

export function AnimatedTelugu({ text, className = '' }) {
  const [vis, setVis] = useState(false), ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.5 })
    obs.observe(ref.current); return () => obs.disconnect()
  }, [])
  return <span ref={ref} className={`telugu-anim ${className} ${vis ? 'reveal' : ''}`}>
    {text.split('').map((ch, i) => <span key={i} className="tchar" style={{ animationDelay: `${i * 0.07}s` }}>{ch}</span>)}
  </span>
}

export function useDayNight() {
  const [night, setNight] = useState(() => { const h = new Date().getHours(); return h < 6 || h >= 19 })
  useEffect(() => { const iv = setInterval(() => { const h = new Date().getHours(); setNight(h < 6 || h >= 19) }, 60000); return () => clearInterval(iv) }, [])
  return night
}
