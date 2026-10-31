import { useState, useCallback, useEffect } from 'react'
import { wedding } from './data/wedding.js'

const STORE_KEY = 'anudivam-guest-lists'
const BASE = window.location.origin + window.location.pathname

function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { anusha: '', divakar: '', anushaBy: 'family', divakarBy: 'family' } }
  catch { return { anusha: '', divakar: '', anushaBy: 'family', divakarBy: 'family' } }
}
function save(data) { localStorage.setItem(STORE_KEY, JSON.stringify(data)) }

const inviterOptions = (side) => {
  const s = wedding.sides[side]
  const opts = [
    { value: 'family', label: `${s.familyName} (default)` },
    { value: 'parents', label: s.invitedBy },
  ]
  if (s.inviters) s.inviters.forEach(inv => opts.push(inv))
  opts.push({ value: 'custom', label: 'Custom…' })
  return opts
}

function makeUrl(name, side, by) {
  const p = new URLSearchParams()
  if (name) p.set('guest', name)
  if (side) p.set('from', side)
  if (by && by !== 'family') p.set('by', by)
  const qs = p.toString()
  return qs ? BASE + '?' + qs : BASE
}

function waMessage(name, url, side) {
  const fam = side === 'anusha' ? "Anusha's" : "Divakar's"
  return `Dear ${name},\n\nYou are cordially invited to celebrate the wedding of ${wedding.bride} & ${wedding.groom} — ${wedding.title} 💐\n\n📅 ${wedding.weddingDate}\n📍 ${wedding.venue.name}, ${wedding.venue.address}\n\nOpen your personal invitation here:\n${url}\n\nWith love,\n${fam} family 🙏`
}

function InviterSelect({ side, value, onChange, customValue, onCustomChange }) {
  return <div className="inviter-select">
    <label>Who is inviting?</label>
    <div className="inviter-row">
      <select value={value} onChange={e => onChange(e.target.value)}>
        {inviterOptions(side).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {value === 'custom' && <input type="text" value={customValue} onChange={e => onCustomChange(e.target.value)} placeholder="e.g. Ramesh Garu" />}
    </div>
  </div>
}

export default function AdminLinks() {
  const [stored] = useState(load)
  const [anushaText, setAnushaText] = useState(stored.anusha)
  const [divakarText, setDivakarText] = useState(stored.divakar)
  const [anushaBy, setAnushaBy] = useState(stored.anushaBy || 'family')
  const [divakarBy, setDivakarBy] = useState(stored.divakarBy || 'family')
  const [anushaCustom, setAnushaCustom] = useState(stored.anushaCustom || '')
  const [divakarCustom, setDivakarCustom] = useState(stored.divakarCustom || '')
  const [links, setLinks] = useState([])
  const [copied, setCopied] = useState(null)
  const [lastSaved, setLastSaved] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      save({ anusha: anushaText, divakar: divakarText, anushaBy, divakarBy, anushaCustom, divakarCustom })
      setLastSaved(new Date().toLocaleTimeString())
    }, 500)
    return () => clearTimeout(timer)
  }, [anushaText, divakarText, anushaBy, divakarBy, anushaCustom, divakarCustom])

  useEffect(() => {
    if (stored.anusha || stored.divakar) generateLinks(stored.anusha, stored.divakar, stored.anushaBy, stored.divakarBy, stored.anushaCustom, stored.divakarCustom)
  }, [])

  const generateLinks = (aText, dText, aBy, dBy, aCust, dCust) => {
    const parse = t => t.split('\n').map(n => n.trim()).filter(Boolean)
    const result = []
    const aByVal = aBy || anushaBy || 'family'
    const dByVal = dBy || divakarBy || 'family'
    const aBySend = aByVal === 'custom' ? (aCust || anushaCustom || 'family') : aByVal
    const dBySend = dByVal === 'custom' ? (dCust || divakarCustom || 'family') : dByVal
    const aNames = parse(aText || anushaText)
    const dNames = parse(dText || divakarText)
    if (aNames.length) aNames.forEach(name => result.push({ name, side: 'anusha', by: aBySend, url: makeUrl(name, 'anusha', aBySend) }))
    else result.push({ name: '', side: 'anusha', by: aBySend, url: makeUrl('', 'anusha', aBySend) })
    if (dNames.length) dNames.forEach(name => result.push({ name, side: 'divakar', by: dBySend, url: makeUrl(name, 'divakar', dBySend) }))
    else result.push({ name: '', side: 'divakar', by: dBySend, url: makeUrl('', 'divakar', dBySend) })
    setLinks(result)
  }

  const generate = useCallback(() => generateLinks(), [anushaText, divakarText, anushaBy, divakarBy, anushaCustom, divakarCustom])
  const flash = (id) => { setCopied(id); setTimeout(() => setCopied(null), 1800) }
  const copyOne = (i) => { navigator.clipboard.writeText(links[i].url); flash(`link-${i}`) }
  const sendWA = (i) => { window.open('https://wa.me/?text=' + encodeURIComponent(waMessage(links[i].name, links[i].url, links[i].side)), '_blank') }
  const copyAll = () => { navigator.clipboard.writeText(links.map(l => `${l.name}\t${l.url}`).join('\n')); flash('all') }
  const copyAllWA = () => { navigator.clipboard.writeText(links.map(l => waMessage(l.name, l.url, l.side)).join('\n\n---\n\n')); flash('wa') }

  const exportData = () => {
    const data = { anusha: anushaText, divakar: divakarText, anushaBy, divakarBy, anushaCustom, divakarCustom, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob); a.download = `anudivam-guests-${new Date().toISOString().slice(0, 10)}.json`; a.click()
    URL.revokeObjectURL(a.href)
  }

  const importData = () => {
    const input = document.createElement('input')
    input.type = 'file'; input.accept = '.json'
    input.onchange = async (e) => {
      const file = e.target.files?.[0]; if (!file) return
      try {
        const text = await file.text()
        const data = JSON.parse(text)
        if (data.anusha !== undefined) setAnushaText(data.anusha)
        if (data.divakar !== undefined) setDivakarText(data.divakar)
        if (data.anushaBy) setAnushaBy(data.anushaBy)
        if (data.divakarBy) setDivakarBy(data.divakarBy)
        if (data.anushaCustom) setAnushaCustom(data.anushaCustom)
        if (data.divakarCustom) setDivakarCustom(data.divakarCustom)
        save(data)
        generateLinks(data.anusha, data.divakar, data.anushaBy, data.divakarBy, data.anushaCustom, data.divakarCustom)
      } catch { alert('Invalid file format') }
    }
    input.click()
  }

  const clearAll = () => {
    if (!confirm('Clear all guest names? This cannot be undone.')) return
    setAnushaText(''); setDivakarText(''); setLinks([])
    setAnushaBy('family'); setDivakarBy('family')
    setAnushaCustom(''); setDivakarCustom('')
    save({ anusha: '', divakar: '', anushaBy: 'family', divakarBy: 'family', anushaCustom: '', divakarCustom: '' })
  }

  const anushaCount = links.filter(l => l.side === 'anusha').length
  const divakarCount = links.filter(l => l.side === 'divakar').length

  return <div className="admin-page">
    <div className="admin-container">
      <header className="admin-header">
        <h1>✧ {wedding.title} — Guest Links ✧</h1>
        <p>Generate personalized invitation links for every guest</p>
        <a href={BASE} className="admin-back">← View Invitation</a>
      </header>

      <div className="admin-tip">
        <strong>✅ Auto-saved:</strong> Your guest lists are <strong>automatically saved</strong> in this browser.
        Come back anytime and your names will still be here.
        {lastSaved && <span className="save-status"> Last saved: {lastSaved}</span>}
      </div>

      <div className="admin-sides">
        <div className="admin-side">
          <h2>🌸 Anusha's Side</h2>
          <p className="side-desc">Invited by {wedding.family.bride}</p>
          <InviterSelect side="anusha" value={anushaBy} onChange={setAnushaBy} customValue={anushaCustom} onCustomChange={setAnushaCustom} />
          <p className="side-hint">Guest names (one per line). Leave empty for a generic link.</p>
          <textarea value={anushaText} onChange={e => setAnushaText(e.target.value)}
            placeholder={"Rajesh Uncle\nPriya Aunty\nSrinivas & Family\n(leave empty for generic link)"} rows={7} />
        </div>
        <div className="admin-side">
          <h2>💙 Divakar's Side</h2>
          <p className="side-desc">Invited by {wedding.family.groom}</p>
          <InviterSelect side="divakar" value={divakarBy} onChange={setDivakarBy} customValue={divakarCustom} onCustomChange={setDivakarCustom} />
          <p className="side-hint">Guest names (one per line). Leave empty for a generic link.</p>
          <textarea value={divakarText} onChange={e => setDivakarText(e.target.value)}
            placeholder={"Ramesh Anna\nSunitha Aunty\nVenkat & Family\n(leave empty for generic link)"} rows={7} />
        </div>
      </div>

      <div className="admin-actions">
        <button className="btn-gen" onClick={generate}>✨ Generate Links</button>
        {links.length > 0 && <>
          <button className="btn-copy" onClick={copyAll}>{copied === 'all' ? '✓ Copied!' : '📋 Copy All Links'}</button>
          <button className="btn-wa" onClick={copyAllWA}>{copied === 'wa' ? '✓ Copied!' : '💬 Copy All WhatsApp Messages'}</button>
        </>}
      </div>

      <div className="admin-tools">
        <button className="btn-tool" onClick={exportData}>📥 Export Guest List</button>
        <button className="btn-tool" onClick={importData}>📤 Import Guest List</button>
        <button className="btn-tool btn-danger" onClick={clearAll}>🗑️ Clear All</button>
      </div>

      {links.length > 0 && <>
        <p className="admin-stats">
          Generated <strong>{links.length}</strong> links — <strong>{anushaCount}</strong> for Anusha's side, <strong>{divakarCount}</strong> for Divakar's side
        </p>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>#</th><th>Guest</th><th>Side</th><th>Invited by</th><th>Personalized Link</th><th>Actions</th></tr></thead>
            <tbody>{links.map((l, i) => <tr key={i}>
              <td className="num">{i + 1}</td>
              <td className="name">{l.name || <em style={{color:'#9a8a70'}}>Generic</em>}</td>
              <td><span className={`badge ${l.side}`}>{l.side === 'anusha' ? "Anusha" : "Divakar"}</span></td>
              <td className="inviter">{l.by === 'family' ? 'Family' : l.by === 'parents' ? 'Parents' : l.by === 'grandparents' ? 'Grandparents' : l.by}</td>
              <td className="link-cell"><a href={l.url} target="_blank" rel="noreferrer">{l.url}</a></td>
              <td className="acts">
                <button className="btn-sm" onClick={() => copyOne(i)}>{copied === `link-${i}` ? '✓' : 'Copy'}</button>
                <button className="btn-sm btn-sm-wa" onClick={() => sendWA(i)}>WA</button>
                <a className="btn-sm btn-sm-preview" href={l.url} target="_blank" rel="noreferrer">Preview</a>
              </td>
            </tr>)}</tbody>
          </table>
        </div>
      </>}

      {links.length === 0 && <p className="admin-empty">Enter guest names above and click Generate Links</p>}
    </div>
  </div>
}
