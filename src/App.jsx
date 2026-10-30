import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ArrowDown, ArrowUpRight, CalendarDays, ChevronDown, Clock3, MapPin, MessageCircle, Music2, Volume2, VolumeX, Sparkles } from 'lucide-react'
import { wedding } from './data/wedding.js'
import { ParticleCanvas, SparkleTrail, SelfDrawingRangoli, FloatingDiyas, AnimatedTelugu, useDayNight } from './effects.jsx'
import { AddToCalendar, PhotoGallery, BlessingsWall, TriviaQuiz, ConfettiButton } from './features.jsx'
import AdminLinks from './AdminLinks.jsx'

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

function CeremonyCard({ ceremony, index }) {
  const [expanded, setExpanded] = useState(false)
  return <motion.article className={`ceremony-card ${index % 2 ? 'right' : 'left'}`} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }}>
    <div className="timeline-dot"><span /></div>
    <EventIllustration style={ceremony.style} />
    <div className="ceremony-copy">
      <span className="ceremony-telugu">{ceremony.telugu}</span>
      <h3>{ceremony.name}</h3>
      <div className="event-facts"><p><CalendarDays size={14}/>{ceremony.date}</p><p><Clock3 size={14}/>{ceremony.time}</p><p><MapPin size={14}/>{ceremony.venue}</p></div>
      <button className="text-toggle" aria-expanded={expanded} onClick={() => setExpanded(v => !v)}>{expanded ? 'Close details' : 'A little more'}<ChevronDown size={15} className={expanded ? 'turned' : ''}/></button>
      <AnimatePresence initial={false}>{expanded && <motion.p className="ceremony-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .35 }}>{ceremony.detail}</motion.p>}</AnimatePresence>
    </div>
  </motion.article>
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

  const params = new URLSearchParams(window.location.search)
  const isAdmin = params.get('mode') === 'admin'
  const from = params.get('from')
  const guestName = params.get('guest')?.replace(/\+/g, ' ') || ''
  const side = from === 'anusha' || from === 'divakar' ? wedding.sides[from] : null
  const ceremonies = [...(side?.ceremonies || []), ...wedding.ceremonies].filter(item => item && item.name)

  useEffect(() => {
    if (!opened) return
    setBurstCount(c => c + 1)
    const timer = window.setTimeout(() => {
      setRevealed(true); setActive(true)
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1900)
    return () => window.clearTimeout(timer)
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

    {/* ── HERO (fixed behind everything) ── */}
    <section className="hero" id="home" aria-label="AnuDivam wedding invitation">
      <EntranceArtwork open={opened} />
      <div className="hero-shade" />
      <AnimatePresence mode="wait">
        {!opened && <motion.div key="welcome" className="hero-title hero-welcome" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .45 }}>
          {guestName && <span className="hero-guest-name">Dear {guestName},</span>}
          <span className="hero-invocation">Sri Lakshmi Venkateshwara Swamy Prasanna</span>
          <div className="hero-families"><span>{wedding.welcomeFamilies[0]}</span><i>&amp;</i><span>{wedding.welcomeFamilies[1]}</span></div>
          <span className="hero-welcome-label">Wedding Invitation</span>
          <h1>{wedding.title}</h1>
          <p className="hero-welcome-theme">A wedding woven with love and tradition</p>
          <span className="hero-welcome-date">{wedding.weddingDate}</span>
          <button className="open-invitation" onClick={() => setOpened(true)} aria-label="Open the wedding invitation">
            <span>Open invitation</span><ArrowDown size={16}/>
          </button>
        </motion.div>}
        {revealed && <motion.div key="couple" className="hero-title hero-revealed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          <span className="hero-overline">Together with our families</span>
          <h1>Anusha &amp; Divakar</h1>
          <div className="hero-couple-grid">
            <div><span>The bride</span><h2>{wedding.bride}</h2><p>Daughter of {wedding.family.bride}</p></div>
            <i aria-hidden="true">✦</i>
            <div><span>The groom</span><h2>{wedding.groom}</h2><p>Son of {wedding.family.groom}</p></div>
          </div>
          <span className="hero-date">{wedding.weddingDate} · Hindupura</span>
          <a className="scroll-down-cue" href="#story" aria-label="Scroll to explore"><ArrowDown size={18}/></a>
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>{opened && <motion.div className="welcome-flash" initial={{ opacity: 0 }} animate={{ opacity: [0, .22, 0] }} transition={{ duration: 1.35, times: [0,.35,1] }} />}</AnimatePresence>
    </section>

    {/* ── NAV ── */}
    <AnimatePresence>{active && <motion.nav className="floating-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} aria-label="Page sections">
      <a className="nav-brand" href="#home">A<span>✧</span>D</a>
      <div><a href="#story">Our story</a><a href="#celebrations">Celebrations</a><a href="#venue">Venue</a><a href="#blessings">Blessings</a></div>
      <button className="music-button" onClick={toggleMusic} aria-label={music ? 'Turn music off' : 'Turn music on'} title={music ? 'Music on' : 'Music off'}>{music ? <Volume2 size={17}/> : <VolumeX size={17}/>}<span>{music ? 'Music on' : 'Music off'}</span></button>
    </motion.nav>}</AnimatePresence>

    {/* ── STORY ── */}
    <section className="story-section paper-section" id="story">
      <div className="paper-ornament top"/><div className="paper-ornament bottom"/>
      <SelfDrawingRangoli className="section-rangoli left" />
      <SelfDrawingRangoli className="section-rangoli right" />
      <div className="section-wrap">
        <SectionHeading eyebrow="Two hearts, one forever" title="A story written in the stars" telugu="మంగళం భగవాన్ విష్ణుః" animateTelugu />
        <motion.p className="invitation-message" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {guestName ? `Dear ${guestName}, ` : ''}{side?.message || wedding.message}
        </motion.p>
        <div className="couple-grid">
          <PersonPortrait name={wedding.bride} role="The bride" image={wedding.photos.bride}/>
          <div className="ampersand">&amp;</div>
          <PersonPortrait name={wedding.groom} role="The groom" image={wedding.photos.groom}/>
        </div>
        <motion.div className="family-note" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <span>With the blessings of</span>{side ? <><p>{side.invitedBy}</p><i>together with</i><p>{side.otherFamily}</p></> : <><p>{wedding.family.bride}</p><i>and</i><p>{wedding.family.groom}</p></>}
        </motion.div>
        <div className="scroll-cue"><span>Our celebrations</span><a href="#celebrations" aria-label="Continue to celebrations"><ArrowDown size={15}/></a></div>
      </div>
    </section>

    {/* ── GALLERY ── */}
    {wedding.gallery && wedding.gallery.length > 0 && <section className="gallery-section" id="gallery">
      <div className="section-wrap">
        <SectionHeading eyebrow="Captured moments" title="Our photo gallery" telugu="మధుర జ్ఞాపకాలు" animateTelugu />
        <PhotoGallery photos={wedding.gallery} />
      </div>
    </section>}

    {/* ── CELEBRATIONS ── */}
    <section className="celebrations-section" id="celebrations">
      <div className="section-wrap">
        <SectionHeading eyebrow="A gathering of joy" title="Wedding celebrations" telugu="శుభ ఘడియలు" animateTelugu />
        <p className="section-intro">Every ritual, a blessing. Every gathering, a memory.</p>
        <div className="timeline">
          <div className="timeline-rail" />
          {ceremonies.map((ceremony, index) => <CeremonyCard key={ceremony.id || ceremony.name} ceremony={ceremony} index={index}/>) }
        </div>
      </div>
    </section>

    {/* ── MANDAP ── */}
    <section className="mandap-section">
      <div className="mandap-backdrop"><Mandala className="mandap-mandala"/><div className="mandap-spotlight"/></div>
      <FloatingDiyas count={7} />
      <div className="mandap-content section-wrap">
        <SectionHeading eyebrow="The sacred moment" title="Beneath the mandap" telugu={wedding.ceremonies.find(c => c.style === 'wedding')?.telugu || 'శుభ వివాహం'} light animateTelugu />
        <motion.div className="full-mandap-art" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: .3 }}>
          <div className="mandap-garland garland-left"/><div className="mandap-garland garland-right"/>
          <div className="mandap-arch"><div className="arch-top"><span>✥</span><i/><span>✥</span><i/><span>✥</span></div>
            <div className="arch-lintel"><LotusMark /></div><div className="arch-side left"><span/><span/><span/></div><div className="arch-side right"><span/><span/><span/></div>
            <div className="arch-inner"><div className="arch-inner-glow"/><div className="wedding-fire"><i/><b/><span/></div><div className="arch-lotus"><LotusMark/></div></div>
            <div className="arch-base"><span/><span/><span/><span/><span/></div>
          </div>
          <Deepam className="mandap-deepam left"/><Deepam className="mandap-deepam right"/>
          <div className="mandap-petal petal-one">✿</div><div className="mandap-petal petal-two">✿</div>
        </motion.div>
        <motion.div className="muhurtham-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <span className="muhurtham-label">The auspicious hour</span><div className="muhurtham-date">{wedding.weddingDate}</div><span className="muhurtham-divider">✧</span><p>{wedding.muhurtham}</p><span className="muhurtham-venue">{wedding.venue.name}</span>
        </motion.div>
        <AddToCalendar />
      </div>
    </section>

    {/* ── VENUE ── */}
    <section className="venue-section paper-section" id="venue">
      <div className="section-wrap">
        <SectionHeading eyebrow="Find your way to us" title="Where we celebrate" telugu="సుస్వాగతం" animateTelugu />
        <p className="section-intro">We can't wait to welcome you.</p>
        <div className="venue-grid">
          <VenueCard title="Wedding ceremony" data={wedding.venue} icon="wedding"/>
          <VenueCard title="Reception" data={wedding.receptionVenue} icon="reception"/>
          {side && <VenueCard title={`${side.label} Haldi & Mehendi`} data={side.venue} icon="reception"/>}
        </div>
        <div className="countdown-panel">
          <Mandala className="countdown-ornament"/><div className="countdown-inner"><span className="eyebrow">Until our forever begins</span><h3>Counting the moments</h3><Countdown /></div>
          <Mandala className="countdown-ornament right"/>
        </div>
      </div>
    </section>

    {/* ── BLESSINGS ── */}
    <section className="blessings-section paper-section" id="blessings">
      <div className="section-wrap">
        <SectionHeading eyebrow="Your love means the world" title="Send your blessings" telugu="ఆశీర్వాదములు" animateTelugu />
        <p className="section-intro">Leave a heartfelt wish for the couple.</p>
        <BlessingsWall />
      </div>
    </section>

    {/* ── TRIVIA ── */}
    <section className="trivia-section">
      <div className="section-wrap">
        <SectionHeading eyebrow="A little fun" title="How well do you know us?" telugu="ఆటలు పాటలు" light animateTelugu />
        <p className="section-intro trivia-intro">Test your knowledge about Anusha & Divakar!</p>
        <TriviaQuiz />
      </div>
    </section>

    {/* ── FOOTER ── */}
    <footer className="closing-section">
      <div className="closing-sparkles">✧ &nbsp; ✦ &nbsp; ✧</div>
      <LotusMark className="closing-lotus" />
      <p className="closing-eyebrow">With love,</p><h2>{wedding.bride}<span>&amp;</span>{wedding.groom}</h2>
      <p className="closing-message">We look forward to celebrating this beautiful beginning with you.</p>
      <div className="closing-actions">
        <a className="share-button" href={`https://wa.me/?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Share on WhatsApp</a>
        <ConfettiButton onTrigger={() => setConfettiCount(c => c + 1)} />
      </div>
      <div className="closing-footer"><span>Made with love for {wedding.title}</span><span>శుభమస్తు</span></div>
    </footer>
    {musicNotice && <div className="music-note" role="status"><Music2 size={15}/> Add a licensed instrumental file as <code>musicTrack</code> in the wedding data.</div>}
  </main></MotionConfig>
}

export default App
