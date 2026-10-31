import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ArrowDown, ArrowUpRight, CalendarDays, ChevronDown, Clock3, MapPin, MessageCircle, Music2, Volume2, VolumeX, Sparkles } from 'lucide-react'
import { wedding } from './data/wedding.js'
import { getT, getNames } from './data/i18n.js'
import { ParticleCanvas, SparkleTrail, SelfDrawingRangoli, FloatingDiyas, AnimatedTelugu, EventParticles, useDayNight } from './effects.jsx'
import { AddToCalendar, PhotoGallery, BlessingsWall, TriviaQuiz, ConfettiButton } from './features.jsx'
import AdminLinks from './AdminLinks.jsx'

function T({ k, t }) {
  const val = t(k)
  if (!val.includes('\n')) return val
  return val.split('\n').map((line, i) => <span key={i} className="t-line">{line}</span>)
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function useCountdown(target) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    if (!target) return
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [target])
  return useMemo(() => {
    const end = target ? new Date(target).getTime() : NaN
    if (!Number.isFinite(end)) return null
    const distance = Math.max(0, end - now)
    return [
      ['days', Math.floor(distance / 86400000)],
      ['hours', Math.floor((distance / 3600000) % 24)],
      ['minutes', Math.floor((distance / 60000) % 60)],
      ['seconds', Math.floor((distance / 1000) % 60)],
    ]
  }, [target, now])
}

function LotusMark({ className = '' }) {
  return <svg className={className} viewBox="0 0 100 52" aria-hidden="true" fill="none">
    <path d="M50 45C35 36 34 21 50 7c16 14 15 29 0 38Z" />
    <path d="M47 44C26 42 14 31 13 17c16 2 28 11 34 27ZM53 44c21-2 33-13 34-27-16 2-28 11-34 27Z" />
    <path d="M45 46C27 52 13 49 5 40c14-7 28-5 42 4Zm10 0c18 6 32 3 40-6-14-7-28-5-42 4Z" />
    <path d="M50 46v5M32 49h36" />
  </svg>
}

function Mandala({ className = '' }) {
  return <svg className={className} viewBox="0 0 320 320" aria-hidden="true" fill="none">
    <circle cx="160" cy="160" r="151" /><circle cx="160" cy="160" r="137" />
    <circle cx="160" cy="160" r="112" /><circle cx="160" cy="160" r="86" />
    {Array.from({ length: 16 }, (_, i) => <g key={i} transform={`rotate(${i * 22.5} 160 160)`}>
      <path d="M160 10c17 19 17 38 0 58-17-20-17-39 0-58Z" />
      <path d="M160 57c9 11 9 22 0 33-9-11-9-22 0-33Z" />
    </g>)}
    <path d="M160 121c12 12 28 28 39 39-11 11-27 27-39 39-12-12-28-28-39-39 11-11 27-27 39-39Z" />
    <circle cx="160" cy="160" r="23" />
  </svg>
}

function Deepam({ className = '' }) {
  return <svg viewBox="0 0 76 128" className={className} aria-hidden="true" fill="none">
    <path d="M37.8 3c-15 15-10 25 0 32 10-8 14-18 0-32Z" fill="#ffd78a"/>
    <path d="M38 22c-8 9-6 15 0 19 6-4 8-10 0-19Z" fill="#fff4c8"/>
    <path d="M14 56c5 17 43 17 48 0-14-6-34-6-48 0Z" fill="#c18b3f" stroke="#f0d18a" strokeWidth="2"/>
    <path d="M20 61c2 8 10 12 18 12s16-4 18-12M38 73v35m-13 0h26m-33 9h40m-45 8h50" stroke="#d9b568" strokeWidth="3" strokeLinecap="round"/>
    <path d="M38 73c-9 3-13 11-13 19m13-19c9 3 13 11 13 19" stroke="#d9b568" strokeWidth="2"/>
  </svg>
}

function EntranceArtwork({ open }) {
  return <div className={`entrance-art${open ? ' is-open' : ''}`} aria-hidden="true">
    <div className="temple-scene wedding-scene" />
    <div className="temple-scene ganesh-scene" />
    <div className="door-pair">
      <div className="door-leaf left-door" />
      <div className="door-leaf right-door" />
    </div>
  </div>
}

function SectionHeading({ eyebrow, title, telugu, light = false, animateTelugu = false }) {
  return <motion.div className={`section-heading${light ? ' light' : ''}`} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: .35 }}>
    <span className="eyebrow">{eyebrow}</span>
    <LotusMark className="heading-lotus" />
    <h2>{title}</h2>
    {telugu && (animateTelugu ? <AnimatedTelugu text={telugu} className="telugu-heading" /> : <span className="telugu-heading">{telugu}</span>)}
  </motion.div>
}

function PersonPortrait({ name, role, image }) {
  return <motion.div className="person-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: .3 }}>
    <div className="portrait-frame">
      <div className="portrait-art">
        {image ? <img className="portrait-image" src={image} alt={`${name} portrait`} loading="lazy" decoding="async" /> : <><Mandala className="portrait-mandala"/><div className="portrait-silhouette"><i/><b/></div><span className="photo-placeholder">{name.split(' ')[0]}</span></>}
      </div>
      <span className="portrait-corner top-left"/><span className="portrait-corner top-right"/><span className="portrait-corner bottom-left"/><span className="portrait-corner bottom-right"/>
    </div>
    <p className="person-role">{role}</p><h3>{name}</h3>
    <p className="family-placeholder">{role === 'The bride' ? wedding.family.bride : wedding.family.groom}</p>
  </motion.div>
}

function EventIllustration({ style }) {
  const ritualMark = {
    haldi: <><span className="ritual-vessel"/><span className="ritual-powder">✧</span><span className="event-leaf l1"/><span className="event-leaf l2"/></>,
    mehendi: <><span className="ritual-hand">❧</span><span className="ritual-hand second">❧</span><Mandala className="ritual-mandala"/></>,
    sangeet: <><span className="ritual-veena">♬</span><span className="ritual-note n1">♪</span><span className="ritual-note n2">♫</span></>,
    pelli: <><span className="event-moon">✦</span><span className="ritual-bride"><i/><b/></span><span className="event-leaf l1"/><span className="event-leaf l2"/></>,
  }[style]
  return <div className={`event-art ${style}`} aria-hidden="true">
    <div className="event-art-halo" />
    {style === 'wedding' ? <><span className="event-canopy"/><span className="event-arch"/><span className="event-column one"/><span className="event-column two"/><span className="event-flame"/><LotusMark className="event-lotus"/></> : style === 'reception' ? <><span className="event-moon">✦</span><span className="event-leaf l1"/><span className="event-leaf l2"/><span className="event-leaf l3"/><span className="event-diya"/><LotusMark className="event-lotus"/></> : <>{ritualMark}<LotusMark className="event-lotus"/></>}
  </div>
}

function JourneyDoli() {
  const doliRef = useRef(null)
  const pathRef = useRef(null)

  useEffect(() => {
    const doli = doliRef.current, path = pathRef.current
    if (!doli || !path) return
    const container = path.closest('.event-journey')
    if (!container) return

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const rect = container.getBoundingClientRect()
        const scrolled = -rect.top
        const total = container.scrollHeight - window.innerHeight
        if (total <= 0) return
        const progress = Math.max(0, Math.min(1, scrolled / total))

        const pathHeight = path.offsetHeight
        const y = progress * pathHeight
        const sway = Math.sin(progress * 30) * 12
        const tilt = Math.sin(progress * 15) * 5
        const bounce = Math.abs(Math.sin(progress * 40)) * 4

        doli.style.transform = `translate3d(${sway | 0}px,${(y - bounce) | 0}px,0) rotate(${tilt}deg)`

        const inView = scrolled > -200 && scrolled < total + 200
        doli.style.opacity = inView ? '1' : '0'
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return <div className="journey-path" ref={pathRef}>
    <div className="journey-path-line" />
    <div className="journey-doli" ref={doliRef}>
      <span className="doli-top">🪔</span>
      <span className="doli-body">🛕</span>
      <span className="doli-couple">👫</span>
      <span className="doli-trail">✦✧✦</span>
    </div>
  </div>
}

function useAutoScroll() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(0)
  const lastRef = useRef(0)
  const guardRef = useRef(0)
  const SPEED = 300

  useEffect(() => {
    if (!playing) { cancelAnimationFrame(rafRef.current); return }
    lastRef.current = 0

    const tick = (now) => {
      if (!lastRef.current) { lastRef.current = now }
      const dt = Math.min(now - lastRef.current, 50) / 1000
      lastRef.current = now

      const h = document.documentElement.scrollHeight - window.innerHeight
      if (h <= 0) return
      const pct = window.scrollY / h
      setProgress(pct)
      if (pct >= 0.995) { setPlaying(false); return }

      window.scrollBy(0, SPEED * dt)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing])

  useEffect(() => {
    if (!playing) return
    const stop = () => {
      if (Date.now() - guardRef.current < 400) return
      setPlaying(false)
    }
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchmove', stop, { passive: true })
    return () => { window.removeEventListener('wheel', stop); window.removeEventListener('touchmove', stop) }
  }, [playing])

  const play = () => { guardRef.current = Date.now(); setPlaying(true) }
  const toggle = () => { guardRef.current = Date.now(); setPlaying(p => !p) }
  return { playing, progress, play, toggle }
}

function AutoScrollButton({ playing, progress, toggle }) {
  return <div className={`autoscroll-control is-visible ${playing ? 'is-playing' : ''}`}>
    <button className="autoscroll-btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
      {playing ? <span className="autoscroll-icon pause"><i /><i /></span> : <span className="autoscroll-icon play" />}
      <span className="autoscroll-label">{playing ? 'Pause' : 'Play'}</span>
    </button>
    {playing && <div className="autoscroll-progress"><div className="autoscroll-bar" style={{ transform: `scaleX(${progress})` }} /></div>}
  </div>
}

function CeremonyPage({ ceremony, index, t, isLast }) {
  const [revealed, setRevealed] = useState(false)
  const pageRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const el = pageRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = pageRef.current, bg = bgRef.current
    if (!el || !bg) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const center = (rect.top + rect.bottom) / 2
        const offset = (center / vh - 0.5) * 2
        const parallax = offset * -30
        bg.style.transform = `scale(1.15) translate3d(0,${parallax | 0}px,0)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const cls = revealed ? 'revealed' : ''

  return <section ref={pageRef} className={`event-page event-page--${ceremony.style} ${cls}`}>
    <EventParticles style={ceremony.style} burst={revealed} />
    <div className="event-page__bg" ref={bgRef} />
    <div className="event-page__overlay" />

      <div className={`ep-frame ${cls}`}>
        <div className="ep-toran"><span /><span /><span /><span /><span /><span /><span /></div>
        <div className="ep-drape ep-drape--left" />
        <div className="ep-drape ep-drape--right" />
        <div className="ep-corner ep-corner--tl" />
        <div className="ep-corner ep-corner--tr" />
        <div className="ep-corner ep-corner--bl" />
        <div className="ep-corner ep-corner--br" />
        <div className="ep-base" />
      </div>

      <div className="event-page__couple" aria-hidden="true">
        <motion.div className="event-page__couple-frame"
          initial={{ opacity: 0, x: -70, y: 18, scale: .94 }}
          animate={revealed ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
          transition={{ delay: .25, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}>
          <img src={ceremony.coupleImage || wedding.photos.couple || '/images/temple-divine-wedding.webp'}
            alt="" loading="lazy" decoding="async" />
        </motion.div>
        <span className="event-page__couple-caption">Together, into every celebration</span>
      </div>

      <div className="event-page__content">
        <motion.span className="event-page__eyebrow"
          initial={{ opacity: 0, y: 12 }} animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: .45, duration: .6 }}>
          ANUDIVAM · OUR WEDDING JOURNEY
        </motion.span>
        <motion.span className="event-page__telugu"
          initial={{ opacity: 0, y: 20 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 0.6 }}>
          {ceremony.telugu}
        </motion.span>
        <motion.h2 className="event-page__title"
          initial={{ opacity: 0, scale: 0.85 }} animate={revealed ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}>
          {ceremony.name}
        </motion.h2>
        <motion.div className="event-page__details"
          initial={{ opacity: 0, y: 15 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.4, duration: 0.6 }}>
          <p className="event-page__date"><CalendarDays size={16}/>{ceremony.date}</p>
          <p className="event-page__time"><Clock3 size={16}/>{ceremony.time}</p>
          <p className="event-page__venue"><MapPin size={16}/>{ceremony.venue}</p>
        </motion.div>
        <motion.p className="event-page__detail"
          initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 1.9, duration: 0.5 }}>
          {ceremony.detail}
        </motion.p>
        {ceremony.mapQuery && <motion.a className="event-page__map-link" href={/^https?:\/\//.test(ceremony.mapQuery) ? ceremony.mapQuery : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ceremony.mapQuery)}`} target="_blank" rel="noreferrer"
          initial={{ opacity: 0, y: 10 }} animate={revealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 2.1, duration: 0.5 }}>
          <MapPin size={14} /> Open in Maps
        </motion.a>}
      {!isLast && <motion.div className="event-page__scroll-hint"
        initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 2.3, duration: 0.4 }}>
        <ArrowDown size={16} />
      </motion.div>}
    </div>
  </section>
}

function VenueCard({ title, data, icon }) {
  const query = data.mapQuery || [data.name, data.address].filter(v => !/to be (announced|added)/i.test(v)).join(' ')
  const mapUrl = /^https?:\/\//.test(query) ? query : query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : ''
  return <motion.article className="venue-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: .3 }}>
    <div className="venue-top"><span>{icon === 'wedding' ? 'I' : 'II'}</span><span className="venue-ornament">✧</span></div>
    <p className="venue-type">{title}</p><h3>{data.name}</h3><p className="venue-address">{data.address}</p>
    {mapUrl ? <a className="map-link" href={mapUrl} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={16}/></a> : <span className="map-link disabled" aria-disabled="true">Map link will appear when venue is set <MapPin size={15}/></span>}
  </motion.article>
}

function Countdown() {
  const units = useCountdown(wedding.countdownDate)
  return <div className="countdown" aria-live="off">
    {units ? units.map(([unit, value]) => <div className="count-unit" key={unit}><strong>{String(value).padStart(2, '0')}</strong><span>{unit}</span></div>) : <div className="count-placeholder"><span className="count-sun">✧</span><p>Our countdown begins when the wedding date is announced.</p></div>}
  </div>
}

/* ── MAIN APP ─────────────────────────────────────────── */
function App() {
  const [opened, setOpened] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [active, setActive] = useState(false)
  const [music, setMusic] = useState(false)
  const [musicNotice, setMusicNotice] = useState(false)
  const [burstCount, setBurstCount] = useState(0)
  const [confettiCount, setConfettiCount] = useState(0)
  const [fireworksCount, setFireworksCount] = useState(0)
  const isNight = useDayNight()
  const autoScroll = useAutoScroll()

  const params = new URLSearchParams(window.location.search)
  const isAdmin = params.get('mode') === 'admin'
  const from = params.get('from')
  const guestName = params.get('guest')?.replace(/\+/g, ' ') || ''
  const by = params.get('by') || ''
  const showFam = params.get('fam') !== '0'
  const lang = params.get('lang') || 'en'
  const t = getT(lang)
  const n = getNames(lang)
  const side = from === 'anusha' || from === 'divakar' ? wedding.sides[from] : null
  const resolveInviter = () => {
    if (!side) return { name: '', showFamily: false }
    if (!by || by === 'family') return { name: side.familyName, showFamily: false }
    if (by === 'parents') return { name: side.invitedBy, showFamily: showFam }
    const match = side.inviters?.find(inv => inv.value === by)
    if (match) return { name: match.label, showFamily: showFam }
    return { name: decodeURIComponent(by), showFamily: showFam }
  }
  const inviter = resolveInviter()
  const mainFamilyCeremonies = side ? side.ceremonies : [...wedding.sides.anusha.ceremonies, ...wedding.sides.divakar.ceremonies]
  const ceremonies = [...(mainFamilyCeremonies || []), ...wedding.ceremonies].filter(item => item && item.name)

  const openDoors = () => {
    if (opened) return
    setOpened(true)
    setBurstCount(c => c + 1)
    const timer = window.setTimeout(() => {
      setRevealed(true); setActive(true)
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1800)
    return () => window.clearTimeout(timer)
  }

  /* Scroll / wheel / touch-swipe also opens doors */
  useEffect(() => {
    if (opened) return
    const onWheel = (e) => { e.preventDefault(); openDoors() }
    const onTouch = () => openDoors()
    const onKey = (e) => { if (['ArrowDown','ArrowUp','Space','PageDown'].includes(e.code)) { e.preventDefault(); openDoors() } }
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('touchmove', onTouch); window.removeEventListener('keydown', onKey) }
  }, [opened])

  /* Fireworks when scrolling to celebrations */
  useEffect(() => {
    if (!active) return
    const target = document.getElementById('celebrations')
    if (!target) return
    let fired = false
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired) { fired = true; setFireworksCount(c => c + 1) }
    }, { threshold: 0.15 })
    obs.observe(target); return () => obs.disconnect()
  }, [active])

  const whatsappText = `${side ? side.shareMessage : `Join us to celebrate ${wedding.bride} & ${wedding.groom} — ${wedding.title}.`} ${window.location.href}`

  const toggleMusic = async () => {
    const audio = document.getElementById('wedding-audio')
    if (!wedding.musicTrack || !audio) {
      setMusicNotice(true); window.setTimeout(() => setMusicNotice(false), 4200); return
    }
    if (music) { audio.pause(); setMusic(false); return }
    try { await audio.play(); setMusic(true) } catch { setMusicNotice(true); window.setTimeout(() => setMusicNotice(false), 4200) }
  }

  /* Lock scroll until invitation opens */
  useEffect(() => {
    document.body.style.overflow = active ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [active])

  /* Scroll progress bar */
  const [scrollPct, setScrollPct] = useState(0)
  useEffect(() => {
    if (!active) return
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScrollPct(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [active])

  if (isAdmin) return <AdminLinks />

  return <MotionConfig reducedMotion="user"><main className={isNight ? 'night-mode' : 'day-mode'}>
    {wedding.musicTrack && <audio id="wedding-audio" src={wedding.musicTrack} loop preload="none" />}

    {/* ── SCROLL PROGRESS ── */}
    {active && <div className="scroll-progress" style={{ transform: `scaleX(${scrollPct / 100})` }} />}

    {/* ── PARTICLE EFFECTS ── */}
    <ParticleCanvas active={active} triggerBurst={burstCount} triggerConfetti={confettiCount} triggerFireworks={fireworksCount} />
    <SparkleTrail />

    {/* ── HERO ── */}
    <section className="hero" id="home" aria-label="AnuDivam wedding invitation" onClick={openDoors}>
      <EntranceArtwork open={opened} />
      <div className="hero-shade" />

      <AnimatePresence mode="wait">
        {/* GANESH WELCOME — visible before doors open */}
        {!opened && <motion.div key="ganesh-welcome" className="hero-title ganesh-welcome"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}>
          <span className="ganesh-invocation"><T k="omLine" t={t} /></span>
          <span className="ganesh-blessing"><T k="blessing" t={t} /></span>
          <LotusMark className="ganesh-lotus" />
          {guestName && <p className="ganesh-guest">{t('dear')} {guestName},</p>}
          <div className="ganesh-families">
            {inviter.name ? <>
              <span>{inviter.name}</span>
              {inviter.showFamily && <span className="ganesh-family-sub">{side.familyName}</span>}
            </> : <>
              <span>{wedding.welcomeFamilies[0]}</span>
              <i>&amp;</i>
              <span>{wedding.welcomeFamilies[1]}</span>
            </>}
          </div>
          <span className="ganesh-invite-label"><T k={inviter.name ? 'cordiallyInvites' : 'cordiallyInvite'} t={t} /></span>
          <h1 className="ganesh-monogram"><span className="mono-letter">A</span><span className="mono-heart">♥</span><span className="mono-letter">D</span></h1>
          <span className="ganesh-theme">{wedding.title}</span>
          <span className="ganesh-tagline"><T k="celebrationOfLove" t={t} /></span>
          <span className="ganesh-date">{wedding.weddingDate}</span>
          <motion.p className="ganesh-tap" animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}>
            <T k="tapToOpen" t={t} />
          </motion.p>
        </motion.div>}

        {/* COUPLE REVEAL — visible after doors open */}
        {revealed && <motion.div key="couple-reveal" className="hero-title hero-revealed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}>

          <motion.div className="reveal-header"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: .9 }}>
            <span className="reveal-shubhamastu"><T k="shubhamastu" t={t} /></span>
            <span className="reveal-blessing"><T k="blessing" t={t} /></span>
            <span className="reveal-kalyanam"><T k="kalyanamasthu" t={t} /></span>
          </motion.div>

          <motion.div className="reveal-names"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}>
            {from === 'divakar' ? <>
              <h1>{n.groom}</h1>
              <p className="reveal-parents">{n.groomParents}</p>
              <span className="reveal-and">✦ &amp; ✦</span>
              <h1>{n.bride}</h1>
              <p className="reveal-parents">{n.brideParents}</p>
            </> : <>
              <h1>{n.bride}</h1>
              <p className="reveal-parents">{n.brideParents}</p>
              <span className="reveal-and">✦ &amp; ✦</span>
              <h1>{n.groom}</h1>
              <p className="reveal-parents">{n.groomParents}</p>
            </>}
          </motion.div>

          <motion.div className="reveal-married"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: .8 }}>
            <span className="reveal-line" />
            <span className="reveal-telugu"><T k="shubhaVivaham" t={t} /></span>
            <span className="reveal-line" />
          </motion.div>

          <motion.div className="reveal-details"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3, duration: .8 }}>
            <span className="reveal-date"><T k="weddingDate" t={t} /></span>
            <span className="reveal-venue">{n.venue}</span>
          </motion.div>

          <motion.button className="scroll-down-cue" aria-label="Play invitation"
            onClick={(e) => { e.stopPropagation(); autoScroll.play() }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: .5 }}>
            <ArrowDown size={18}/>
          </motion.button>
        </motion.div>}
      </AnimatePresence>

      <AnimatePresence>{opened && <motion.div className="welcome-flash" initial={{ opacity: 0 }}
        animate={{ opacity: [0, .22, 0] }} transition={{ duration: 1.35, times: [0,.35,1] }} />}</AnimatePresence>
    </section>

    {/* ── Everything below unlocks after doors open ── */}
    {active && <>

    {/* ── NAV ── */}
    <AnimatePresence><motion.nav className="floating-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} aria-label="Page sections">
      <a className="nav-brand" href="#home">A<span>✧</span>D</a>
      <div><a href="#celebrations">{t('navCelebrations')}</a><a href="#blessings">{t('navBlessings')}</a></div>
      <button className="music-button" onClick={toggleMusic} aria-label={music ? 'Turn music off' : 'Turn music on'} title={music ? 'Music on' : 'Music off'}>{music ? <Volume2 size={17}/> : <VolumeX size={17}/>}<span>{music ? 'Music on' : 'Music off'}</span></button>
    </motion.nav></AnimatePresence>

    {/* ── CELEBRATIONS — cinematic journey ── */}
    <div className="event-journey" id="celebrations">
      <JourneyDoli />
      <div className="ceremony-reel">
        {ceremonies.map((ceremony, index) => (
          <CeremonyPage key={ceremony.id || ceremony.name} ceremony={ceremony} index={index} t={t} isLast={index === ceremonies.length - 1} />
        ))}
      </div>
    </div>

    {/* ── BLESSINGS ── */}
    <section className="blessings-section paper-section" id="blessings">
      <div className="section-wrap">
        <SectionHeading eyebrow={t('blessEyebrow')} title={t('blessTitle')} telugu={t('blessTelugu')} animateTelugu />
        <p className="section-intro">{t('blessIntro')}</p>
        <BlessingsWall />
      </div>
    </section>

    {/* ── TRIVIA ── */}
    <section className="trivia-section">
      <div className="section-wrap">
        <SectionHeading eyebrow={t('triviaEyebrow')} title={t('triviaTitle')} telugu={t('triviaTelugu')} light animateTelugu />
        <p className="section-intro trivia-intro">{t('triviaIntro')}</p>
        <TriviaQuiz />
      </div>
    </section>

    {/* ── FOOTER ── */}
    <footer className="closing-section">
      <div className="closing-sparkles">✧ &nbsp; ✦ &nbsp; ✧</div>
      <LotusMark className="closing-lotus" />
      <p className="closing-eyebrow">{t('withLove')}</p><h2>{from === 'divakar' ? <>{n.groom}<span>&amp;</span>{n.bride}</> : <>{n.bride}<span>&amp;</span>{n.groom}</>}</h2>
      <Countdown />
      <p className="closing-message">{t('closingMsg')}</p>
      <div className="closing-actions">
        <a className="share-button" href={`https://wa.me/?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/> {t('shareWhatsApp')}</a>
        <ConfettiButton onTrigger={() => setConfettiCount(c => c + 1)} />
      </div>
      <div className="closing-footer"><span>{t('madeWithLove')}</span><span>{t('shubhamasthu')}</span></div>
    </footer>
    {/* ── AUTO-SCROLL CONTROL ── */}
    {active && <AutoScrollButton playing={autoScroll.playing} progress={autoScroll.progress} toggle={autoScroll.toggle} />}
    </>}
    {musicNotice && <div className="music-note" role="status"><Music2 size={15}/> Add a licensed instrumental file as <code>musicTrack</code> in the wedding data.</div>}
  </main></MotionConfig>
}

export default App
