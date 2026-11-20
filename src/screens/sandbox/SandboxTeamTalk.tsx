import { useState } from 'react'
import { useSandbox } from './SandboxContext'
import { setTalk, nextFixture, niceDate, type SbTalkPoint } from './sandboxStore'

// A team talk the coach writes themselves: up to three points, saved with the
// sandbox team, then shown to the players one point at a time.
const INK = '#10211f', MUT = '#4a5a57', G = '#2f6252', GD = '#1f4a3e', BORDER = '#c5c8c4', LN = '#e9eae8'
const field: React.CSSProperties = { width: '100%', padding: '0 12px', height: 44, border: `1px solid ${BORDER}`, borderRadius: 10, fontFamily: 'inherit', fontSize: 15, color: INK, boxSizing: 'border-box', outline: 'none', background: '#fff' }
const MAX = 3

export default function SandboxTeamTalk({ onClose }: { onClose: () => void }) {
  const { store, update } = useSandbox()
  const team = store.teams[0]
  const game = nextFixture(store)
  const [points, setPoints] = useState<SbTalkPoint[]>(() => store.talk?.length ? store.talk : [{ title: '', say: '' }])
  const [show, setShow] = useState<number | null>(null)
  const [saved, setSaved] = useState(false)
  const filled = points.filter(p => p.title.trim())
  const edit = (i: number, patch: Partial<SbTalkPoint>) => { setSaved(false); setPoints(ps => ps.map((p, k) => k === i ? { ...p, ...patch } : p)) }
  const save = () => { update(setTalk(store, filled.map(p => ({ title: p.title.trim(), say: p.say.trim() })))); setSaved(true) }
  const heading = `${team?.name ?? 'Your team'}${game ? ` · ${niceDate(game.date)} ${game.home ? 'v' : 'at'} ${game.opponent}` : ''}`

  if (show !== null) {
    const p = filled[show]
    return (
      <div data-screen="SB-teamtalk-show" style={{ width: '100%', minHeight: '100vh', background: INK, color: '#fff', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 48px' }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#7cc4ab', flexGrow: 1 }}>Team talk · {heading}</span>
          <span style={{ fontSize: 16, color: '#a3b0ad' }}>{show + 1} of {filled.length}</span>
          <button onClick={() => setShow(null)} style={{ height: 44, padding: '0 20px', borderRadius: 999, border: '1px solid #a3b0ad', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Back to editing</button>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px 40px', maxWidth: 1000 }}>
          <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 1, color: '#f4c95d' }}>{show + 1}</div>
          <h1 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '12px 0 20px' }}>{p.title}</h1>
          {p.say && <p style={{ fontSize: 26, lineHeight: 1.45, color: '#cfe6dc', margin: 0 }}>{p.say}</p>}
        </div>
        <div style={{ display: 'flex', gap: 12, padding: '0 48px 32px' }}>
          <button disabled={show === 0} onClick={() => setShow(show - 1)} style={{ height: 52, padding: '0 28px', borderRadius: 12, border: '1px solid #a3b0ad', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 17, fontWeight: 600, cursor: show === 0 ? 'default' : 'pointer', opacity: show === 0 ? 0.4 : 1 }}>Back</button>
          <button onClick={() => show === filled.length - 1 ? setShow(null) : setShow(show + 1)} style={{ height: 52, padding: '0 28px', borderRadius: 12, border: 0, background: '#fff', color: GD, fontFamily: 'inherit', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}>{show === filled.length - 1 ? 'Done' : 'Next'}</button>
        </div>
      </div>
    )
  }

  return (
    <div data-screen="SB-teamtalk" style={{ width: '100%', minHeight: '100vh', background: '#faf5ec', fontFamily: 'var(--font-sans)', color: INK }}>
      <div style={{ background: GD, height: 52, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <button onClick={onClose} style={{ height: 44, padding: '0 14px 0 10px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.25)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Back to {team?.name ?? 'your team'}
        </button>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 28px 40px' }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>Build a team talk</h1>
        <p style={{ fontSize: 15, color: MUT, lineHeight: 1.5, margin: '4px 0 18px' }}>{heading}. Up to three things, in words the players will remember. After a recorded game, Clean Sheet drafts these for you with a clip for each.</p>
        {points.map((p, i) => (
          <div key={i} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: 16, marginBottom: 10, display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) auto', gap: 12, alignItems: 'start' }}>
            <span style={{ width: 36, height: 36, borderRadius: '50%', background: G, color: '#fff', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 22 }}>{i + 1}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div><label htmlFor={`tt-t${i}`} style={{ display: 'block', fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 4 }}>The point</label><input id={`tt-t${i}`} style={field} value={p.title} onChange={e => edit(i, { title: e.target.value })} placeholder="e.g. Win the ball back together" /></div>
              <div><label htmlFor={`tt-s${i}`} style={{ display: 'block', fontSize: 12, fontWeight: 700, color: MUT, marginBottom: 4 }}>What you will say</label><textarea id={`tt-s${i}`} rows={2} style={{ ...field, height: 'auto', padding: 12, lineHeight: 1.45, resize: 'vertical' }} value={p.say} onChange={e => edit(i, { say: e.target.value })} placeholder="One or two sentences" /></div>
            </div>
            {points.length > 1 && <button onClick={() => { setSaved(false); setPoints(ps => ps.filter((_, k) => k !== i)) }} aria-label={`Remove point ${i + 1}`} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 18 }}>Remove</button>}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginTop: 14 }}>
          {points.length < MAX && <button onClick={() => setPoints(ps => [...ps, { title: '', say: '' }])} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${BORDER}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add a point</button>}
          <button disabled={!filled.length} onClick={save} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: filled.length ? 'pointer' : 'default', opacity: filled.length ? 1 : 0.5 }}>Save the talk</button>
          <button disabled={!filled.length} onClick={() => { save(); setShow(0) }} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: filled.length ? 'pointer' : 'default', opacity: filled.length ? 1 : 0.5 }}>Show it to the team</button>
          {saved && <span role="status" style={{ fontSize: 14, fontWeight: 600, color: G }}>Saved with {team?.name ?? 'your team'}.</span>}
        </div>
      </div>
    </div>
  )
}
