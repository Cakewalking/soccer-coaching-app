import { kept, keep } from '../kept'
import { useState } from 'react'
import YTFrame from './YTFrame'
import { INK, MUT, GREEN, CTL, HAIR, PALEGREEN } from '../step4/directorParts'
import { YT_PLAYERS, COACH_GAME, COACH_GAME_RATINGS, type Rating } from './data'

const GD = '#1f4a3e'

const WELL = ['Winning it back', 'Finishing', 'Staying compact', 'Talking']
const NEXT = ['Legs late on', 'Switching play', 'Set pieces']

const READBACK = [
  { quote: 'Legs went after half time.', body: 'The vests agree: sprints fell 30% after minute 45. Thursday is capped at 75 minutes.' },
  { quote: 'Jai and Mia hunted as a pair.', body: 'Nine clips found and added to Mia’s goal.' },
  { quote: 'We dropped off.', body: 'The gap between the lines grew to 26 metres. Three drills close it.' },
]

export default function YT1YourTake({ onNav, startEmpty = false, bare = false }: { onNav?: (s: string) => void; startEmpty?: boolean; bare?: boolean }) {
  const [lastTool, setLastTool] = useState('')
  const [skipped, setSkipped] = useState(() => kept('cs_yourtake_v1', { skipped: false }).skipped)
  const [toast, setToast] = useState<string | null>(null)
  const [played, setPlayed] = useState<Rating | null>(startEmpty ? null : COACH_GAME.howWePlayed)
  const [plan, setPlan] = useState<'yes' | 'partly' | 'no' | null>(startEmpty ? null : COACH_GAME.planWorked)
  const [well, setWell] = useState<string[]>(startEmpty ? [] : COACH_GAME.wentWell)
  const [next, setNext] = useState<string[]>(startEmpty ? [] : COACH_GAME.workNext)
  const [note, setNote] = useState(startEmpty ? '' : COACH_GAME.note)
  const [ratings, setRatings] = useState<Record<string, Rating>>(startEmpty ? {} : { ...COACH_GAME_RATINGS })

  function tool(n: string) { setLastTool(n) }
  function say(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  function toggle(list: string[], set: (v: string[]) => void, label: string) {
    const on = list.includes(label)
    set(on ? list.filter(x => x !== label) : [...list, label])
    say(`${label}: ${on ? 'taken off' : 'added'}`)
  }
  function cycleRating(id: string, name: string) {
    setRatings(prev => {
      const cur = prev[id]
      const nextVal = cur === 5 ? undefined : ((cur ?? 0) + 1) as Rating | undefined
      const copy = { ...prev }
      if (nextVal === undefined) delete copy[id]; else copy[id] = nextVal
      return copy
    })
    tool(name)
  }

  const ratedCount = Object.keys(ratings).length
  const noteLive = note.trim().length > 0 && !startEmpty

  const card: React.CSSProperties = { background: '#fff', border: `1px solid ${CTL}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0, overflow: 'hidden' }
  const label: React.CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7a4b5b' }

  return (
    <YTFrame
      onNav={onNav} active="take" lastTool={lastTool} bare={bare} screenId={startEmpty ? 'YT1e-YourTakeEmpty' : undefined}
      heading="Your take · Sun 31 May · Won 3-1 at Ironbark United"
      sentence="What did you see that the film missed?"
      support="About two minutes, or one tap. Only you see this. It shapes Thursday as much as the film does."
      buttons={[
        { label: 'Save', main: true, onClick: () => say('Saved. Thursday’s plan and three players’ goals have been updated from it.') },
        { label: skipped ? 'Skipped: take it up again' : 'Skip this game', onClick: () => { const v = !skipped; setSkipped(v); keep('cs_yourtake_v1', { skipped: v }); say(v ? 'Skipped. You can come back to it from Match day at any time.' : 'Back on your list for this game.') } },
      ]}
    >
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.05fr) 320px', gap: 14, minHeight: 0 }}>

        {/* The game */}
        <section style={card}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>The game</h2>
          <div style={label}>How did we play?</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => { setPlayed(n as Rating); say(`How we played: ${n} of 5. Saved.`) }} style={{ width: 44, height: 44, borderRadius: 12, border: `1.5px solid ${played === n ? GD : CTL}`, background: played === n ? GD : '#fff', color: played === n ? '#fff' : INK, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{n}</button>
            ))}
          </div>
          <div style={label}>Did the plan work?</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['yes', 'partly', 'no'] as const).map(v => (
              <button key={v} onClick={() => { setPlan(v); say(`${v === 'yes' ? 'Yes' : v === 'partly' ? 'Partly' : 'No'}. Saved.`) }} style={{ height: 40, padding: '0 18px', borderRadius: 999, border: `1.5px solid ${plan === v ? GREEN : CTL}`, background: plan === v ? GREEN : '#fff', color: plan === v ? '#fff' : INK, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>{v}</button>
            ))}
          </div>
          <div style={label}>What went well</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {WELL.map(c => { const on = well.includes(c); return (
              <button key={c} onClick={() => toggle(well, setWell, c)} style={{ height: 36, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${on ? GREEN : CTL}`, background: on ? GREEN : '#fff', color: on ? '#fff' : INK, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6 }}>{on && <span>✓</span>}{c}</button>
            ) })}
          </div>
          <div style={label}>Work on next</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {NEXT.map(c => { const on = next.includes(c); return (
              <button key={c} onClick={() => toggle(next, setNext, c)} style={{ height: 36, padding: '0 12px', borderRadius: 999, border: `1.5px solid ${on ? GREEN : CTL}`, background: on ? GREEN : '#fff', color: on ? '#fff' : INK, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6 }}>{on && <span>✓</span>}{c}</button>
            ) })}
          </div>
        </section>

        {/* In your words */}
        <section style={card}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, flex: 1 }}>In your words</h2>
            <button onClick={() => say('Listening. Say it as you would in the car park. Tap again to stop.')} style={{ height: 36, padding: '0 12px', borderRadius: 999, border: `1px solid ${CTL}`, background: '#fff', fontSize: 13, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4"/></svg>
              Say it
            </button>
          </div>
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="A note, typed or spoken. What did you see?"
            style={{ width: '100%', minHeight: 96, border: `1.5px solid ${HAIR}`, borderRadius: 12, padding: '12px 14px', fontSize: 15, lineHeight: '22px', color: INK, fontFamily: 'inherit', outline: 'none', resize: 'none', boxSizing: 'border-box', fontStyle: note ? 'italic' : 'normal' }} />
          <div style={label}>Clean Sheet read your note with the film and vests</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
            {noteLive ? READBACK.map(r => (
              <div key={r.quote} style={{ display: 'flex', gap: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M5 12l5 5 9-10"/></svg>
                <div style={{ fontSize: 14, lineHeight: '20px', color: INK }}><strong>“{r.quote}”</strong> {r.body}</div>
              </div>
            )) : <div style={{ fontSize: 14, color: MUT }}>Write or say a note and Clean Sheet checks each thing against the film and the vests here.</div>}
          </div>
        </section>

        {/* Players */}
        <section style={card}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, flex: 1 }}>Players</h2>
            <span style={{ fontSize: 13, color: MUT }}>{ratedCount} of 16 rated</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, overflowY: 'auto' }}>
            {YT_PLAYERS.slice(0, 6).map(p => {
              const r = ratings[p.id]
              return (
                <button key={p.id} onClick={() => cycleRating(p.id, p.name)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: `1px solid ${HAIR}`, background: 'none', border: 'none', borderBottom: 0, borderLeft: 0, borderRight: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%' }}>
                  <span style={{ width: 34, height: 34, borderRadius: '50%', background: PALEGREEN, color: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{p.ini}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</span>
                    {p.clipNote && <span style={{ display: 'block', fontSize: 12, color: MUT, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.clipNote}</span>}
                  </span>
                  <span style={{ flexShrink: 0, height: 32, padding: '0 14px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', fontSize: 13, fontWeight: 700, background: r ? GD : '#fff', color: r ? '#fff' : INK, border: r ? 'none' : `1.5px solid ${CTL}` }}>{r ? `${r} of 5` : 'Rate'}</span>
                </button>
              )
            })}
          </div>
          <button onClick={() => onNav?.('YT3-PlayerNotes')} style={{ marginTop: 'auto', height: 44, borderRadius: 10, border: `1px solid ${CTL}`, background: '#fff', fontSize: 14, fontWeight: 700, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>All 16: notes and ratings</button>
          <span style={{ fontSize: 12, color: MUT }}>Only you see your ratings and notes.</span>
        </section>
      </div>

      {toast && <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, maxWidth: 620, padding: '12px 16px', borderRadius: 14, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>{toast}</div>}
    </YTFrame>
  )
}
