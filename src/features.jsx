import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X, ChevronLeft, ChevronRight, Calendar, Send, PartyPopper, Check, Heart } from 'lucide-react'
import { wedding } from './data/wedding.js'

/* ── ENVELOPE OPENING ─────────────────────────────────── */
export function EnvelopeOpening({ guestName, onOpen }) {
  const [flipped, setFlipped] = useState(false)
  const handleOpen = () => { setFlipped(true); setTimeout(onOpen, 1100) }
  return (
    <motion.section className="envelope-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.55 }}>
      <div className="envelope-stars" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => <span key={i} className="estar" style={{
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`, animationDuration: `${2 + Math.random() * 3}s`,
          fontSize: `${4 + Math.random() * 8}px`,
        }}>✦</span>)}
      </div>
      <div className="envelope-content">
        <motion.div className="envelope-mandala-bg" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
          <svg viewBox="0 0 200 200" className="envelope-mandala-svg">
            <circle cx="100" cy="100" r="90" /><circle cx="100" cy="100" r="70" />
            {Array.from({ length: 12 }, (_, i) => <g key={i} transform={`rotate(${i * 30} 100 100)`}>
              <path d="M100 15c10 13 10 26 0 39-10-13-10-26 0-39Z" />
            </g>)}
          </svg>
        </motion.div>
        {guestName && <motion.p className="envelope-greeting" initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>Dear {guestName},</motion.p>}
        <motion.p className="envelope-subtext" initial={{ opacity: 0 }}
          animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>You are cordially invited to celebrate</motion.p>
        <motion.div className={`envelope-card ${flipped ? 'opened' : ''}`}
          initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 90 }}>
          <div className="envelope-inner">
            <div className="envelope-flap" />
            <div className="envelope-body-card">
              <p className="ec-names">{wedding.bride}<span>&</span>{wedding.groom}</p>
              <p className="ec-date">{wedding.weddingDate}</p>
              <div className="ec-ornament">✧ ❧ ✧</div>
            </div>
          </div>
          <button className="wax-seal" onClick={handleOpen} aria-label="Open the invitation">
            <span className="seal-emboss">A✧D</span>
          </button>
        </motion.div>
        {!flipped && <motion.p className="envelope-tap" initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1] }} transition={{ delay: 1.3, duration: 2.2, repeat: Infinity }}>
          Tap the seal to open ↑</motion.p>}
      </div>
    </motion.section>
  )
}

/* ── ADD TO CALENDAR ──────────────────────────────────── */
export function AddToCalendar() {
  const [show, setShow] = useState(false)
  const title = `${wedding.bride} & ${wedding.groom}'s Wedding`
  const loc = `${wedding.venue.name}, ${wedding.venue.address}`
  const start = wedding.countdownDate.replace(/[-:]/g, '').split('+')[0] + 'Z'
  const end = new Date(new Date(wedding.countdownDate).getTime() + 4 * 36e5).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const gUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&location=${encodeURIComponent(loc)}&details=${encodeURIComponent(wedding.message)}`
  const dlIcs = () => {
    const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//AnuDivam//EN','BEGIN:VEVENT',
      `DTSTART:${start}`,`DTEND:${end}`,`SUMMARY:${title}`,`LOCATION:${loc}`,
      `DESCRIPTION:${wedding.message}`,'END:VEVENT','END:VCALENDAR'].join('\r\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    a.download = 'anudivam-wedding.ics'; a.click()
  }
  return <div className="cal-widget">
    <button className="cal-btn" onClick={() => setShow(v => !v)}><Calendar size={15} /> Save the Date</button>
    <AnimatePresence>{show && <motion.div className="cal-opts" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      <a href={gUrl} target="_blank" rel="noreferrer">📅 Google Calendar</a>
      <button onClick={dlIcs}>🍎 Apple / Outlook (.ics)</button>
    </motion.div>}</AnimatePresence>
  </div>
}

/* ── PHOTO GALLERY ────────────────────────────────────── */
export function PhotoGallery({ photos = [] }) {
  const [lb, setLb] = useState(null)
  const [cur, setCur] = useState(0)
  if (!photos.length) return null
  const open = i => { setCur(i); setLb(true) }
  const nxt = () => setCur(i => (i + 1) % photos.length)
  const prv = () => setCur(i => (i - 1 + photos.length) % photos.length)
  return <>
    <div className="gallery-grid">
      {photos.map((p, i) => <motion.div key={i} className="gallery-thumb" onClick={() => open(i)}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <img src={p.src} alt={p.caption || ''} loading="lazy" decoding="async" />
        {p.caption && <span className="gallery-cap">{p.caption}</span>}
      </motion.div>)}
    </div>
    <AnimatePresence>{lb && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLb(null)}>
      <button className="lb-close" onClick={() => setLb(null)}><X size={24} /></button>
      <button className="lb-arr lb-prev" onClick={e => { e.stopPropagation(); prv() }}><ChevronLeft size={30} /></button>
      <motion.img key={cur} src={photos[cur].src} alt="" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()} />
      <button className="lb-arr lb-next" onClick={e => { e.stopPropagation(); nxt() }}><ChevronRight size={30} /></button>
      {photos[cur].caption && <p className="lb-caption">{photos[cur].caption}</p>}
      <p className="lb-count">{cur + 1} / {photos.length}</p>
    </motion.div>}</AnimatePresence>
  </>
}

/* ── BLESSINGS WALL ───────────────────────────────────── */
export function BlessingsWall() {
  const [items, setItems] = useState(() => { try { return JSON.parse(localStorage.getItem('anudivam-bless') || '[]') } catch { return [] } })
  const [name, setName] = useState(''), [msg, setMsg] = useState(''), [sent, setSent] = useState(false)
  const submit = e => {
    e.preventDefault(); if (!name.trim() || !msg.trim()) return
    const next = [...items, { name: name.trim(), msg: msg.trim(), t: Date.now() }]
    setItems(next); localStorage.setItem('anudivam-bless', JSON.stringify(next))
    setName(''); setMsg(''); setSent(true); setTimeout(() => setSent(false), 3000)
  }
  return <div className="blessings">
    <div className="bless-wall">
      {items.length === 0 && <p className="bless-empty">Be the first to send your blessings! 🙏</p>}
      {items.map((b, i) => <motion.div key={i} className="bless-card" initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
        <Heart size={12} className="bless-heart" />
        <p className="bless-msg">"{b.msg}"</p>
        <span className="bless-who">— {b.name}</span>
      </motion.div>)}
    </div>
    <form className="bless-form" onSubmit={submit}>
      <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} maxLength={50} required />
      <textarea placeholder="Your blessings & wishes…" value={msg} onChange={e => setMsg(e.target.value)} maxLength={250} rows={3} required />
      <button type="submit" disabled={sent}>{sent ? <><Check size={14} /> Sent!</> : <><Send size={14} /> Send Blessings</>}</button>
    </form>
  </div>
}

/* ── TRIVIA QUIZ ──────────────────────────────────────── */
const QS = [
  { q: "What does 'AnuDivam' stand for?", opts: ['A constellation','Anusha + Divakar','A Sanskrit blessing','A temple name'], a: 1 },
  { q: 'Where is the wedding venue?', opts: ['Hyderabad','Chennai','Hindupura','Bangalore'], a: 2 },
  { q: 'What is the Muhurtham time?', opts: ['7 – 8 a.m.','9 – 10 a.m.','11 a.m. – noon','5 – 6 p.m.'], a: 1 },
  { q: 'Which day of the week is the wedding?', opts: ['Friday','Saturday','Sunday','Monday'], a: 2 },
  { q: 'What is the reception date?', opts: ['20 November','21 November','22 November','23 November'], a: 1 },
]
export function TriviaQuiz() {
  const [cur, setCur] = useState(0), [score, setScore] = useState(0), [sel, setSel] = useState(null), [done, setDone] = useState(false)
  const pick = i => {
    if (sel !== null) return; setSel(i)
    if (i === QS[cur].a) setScore(s => s + 1)
    setTimeout(() => {
      if (cur < QS.length - 1) { setCur(c => c + 1); setSel(null) } else setDone(true)
    }, 1100)
  }
  const reset = () => { setCur(0); setScore(0); setSel(null); setDone(false) }
  return <div className="trivia">
    {!done ? <motion.div className="trivia-card" key={cur} initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }}>
      <span className="trivia-prog">{cur + 1} / {QS.length}</span>
      <h4>{QS[cur].q}</h4>
      <div className="trivia-opts">{QS[cur].opts.map((o, i) => <button key={i} onClick={() => pick(i)}
        className={sel !== null ? (i === QS[cur].a ? 'correct' : i === sel ? 'wrong' : '') : ''}
        disabled={sel !== null}>{o}</button>)}</div>
    </motion.div> : <motion.div className="trivia-result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <span className="trivia-emoji">{score >= 4 ? '🎉' : score >= 2 ? '😊' : '💕'}</span>
      <h4>You scored {score} / {QS.length}!</h4>
      <p>{score >= 4 ? 'Amazing! You know this couple well!' : score >= 2 ? 'Not bad! See you at the wedding!' : 'Come to the wedding to learn more! 😄'}</p>
      <button onClick={reset}>Play Again</button>
    </motion.div>}
  </div>
}

/* ── CONFETTI BUTTON ──────────────────────────────────── */
export function ConfettiButton({ onTrigger }) {
  return <motion.button className="confetti-btn" onClick={onTrigger}
    whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }}>
    <PartyPopper size={17} /> Celebrate! 🎊
  </motion.button>
}
