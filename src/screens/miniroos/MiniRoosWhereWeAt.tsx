import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'

const METRICS = [
  { label: 'BE BRAVE WITH THE BALL', trend: 'Getting better', value: '24 dribbles a game',    note: '9 of 10 children tried one. Was 6 of 10' },
  { label: 'FIND A FRIEND',          trend: 'About the same', value: '17 passes a game',       note: 'Most still go to the nearest child' },
  { label: 'WIN IT BACK TOGETHER',   trend: 'Getting better', value: '8 seconds',              note: 'Three chasers in 4 of 10 tries' },
  { label: 'EVERYONE ON THE BALL',   trend: 'Keep',           value: 'All 10 children',        note: 'Every child had 10 touches or more' },
  { label: 'CROWDING THE BALL',      trend: 'Tuesday',        value: '6 children close',       note: 'Within 5 metres of the ball. Was 8' },
  { label: 'DIFFERENT CHILDREN SHOOTING', trend: 'Getting better', value: '6 a game',          note: 'Was 3 in the first game' },
]

const PLAYERS = [
  { ini: 'AR', name: 'Arlo',  metric: 'Dribbles tried',     val: '6, up from 3' },
  { ini: 'BE', name: 'Bea',   metric: 'Passes to a friend', val: '5, up from 4' },
  { ini: 'IV', name: 'Ivy',   metric: 'Dribbles tried',     val: '2, same as last month' },
  { ini: 'JU', name: 'Jude',  metric: 'Shots',              val: '3, up from 1' },
  { ini: 'MA', name: 'Max',   metric: 'Touches',            val: '31, up from 22' },
  { ini: 'OM', name: 'Omar',  metric: 'Passes to a friend', val: '7, up from 6' },
  { ini: 'PO', name: 'Poppy', metric: 'Touches',            val: '18, up from 9' },
]

function trendColor(t: string) {
  if (t === 'Getting better') return { color: G2, bg: PALE }
  if (t === 'Keep') return { color: G2, bg: PALE }
  if (t === 'Tuesday') return { color: '#d97706', bg: '#fffbeb' }
  return { color: MUT, bg: '#f5f6f4' }
}

export function MS2MiniRoosWhereWeAt() {
  const [toast, setToast] = useState<string | null>(null)
  const [period, setPeriod] = useState('This term')
  function showToast(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', gap: 20, fontFamily: 'var(--font-sans)' }}>

      {/* Left: metrics */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Where we're at</div>
          <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>U9 Tom · from 5 filmed games this term and your taps after each one</div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {['This term', 'Last month'].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} style={{ height: 36, padding: '0 14px', borderRadius: 8, border: `1px solid ${period === p ? G : LN}`, background: period === p ? PALE : '#fff', fontSize: 13, fontWeight: period === p ? 700 : 500, color: period === p ? G : MUT, cursor: 'pointer', fontFamily: 'inherit' }}>{p}</button>
          ))}
        </div>

        <div style={{ marginBottom: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>HOW IT'S WORKED OUT</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {METRICS.map(m => {
            const tc = trendColor(m.trend)
            return (
              <div key={m.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: MUT, marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 4 }}>{m.value}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{m.note}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: tc.bg, color: tc.color, whiteSpace: 'nowrap', flexShrink: 0 }}>{m.trend}</span>
              </div>
            )
          })}
        </div>

        <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 4 }}>What to do with it</div>
          <div style={{ fontSize: 14, color: INK, lineHeight: 1.6 }}>Bravery is up, so keep praising it. Passing has not moved: Tuesday has two games where a pass to a friend scores double.</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={() => showToast("Opening Tuesday's games.")} style={{ height: 40, padding: '0 14px', borderRadius: 10, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{"Open Tuesday's games"}</button>
            <button onClick={() => showToast("Opening Saturday's review.")} style={{ height: 40, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{"Saturday's review"}</button>
            <button onClick={() => showToast('Opening style picker.')} style={{ height: 40, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Change our three things</button>
          </div>
        </div>
      </div>

      {/* Right: Every child */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Every child</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 12 }}>A to Z · the thing each one moved most, against their own last month</div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          {PLAYERS.map((p, i) => (
            <div key={p.ini} style={{ padding: '12px 14px', borderTop: i > 0 ? `1px solid ${LN}` : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.ini}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{p.name}</div>
                <div style={{ fontSize: 12, color: MUT }}>{p.metric}</div>
                <div style={{ fontSize: 12, color: G2 }}>{p.val}</div>
              </div>
            </div>
          ))}
          <div style={{ padding: '10px 14px', borderTop: `1px solid ${LN}` }}>
            <button onClick={() => showToast('Showing all 10 children.')} style={{ fontSize: 13, color: G, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>All 10 children</button>
          </div>
        </div>
        <div style={{ fontSize: 12, color: MUT, marginTop: 8, lineHeight: 1.5 }}>In name order, never ranked. No scores or results are kept.</div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

export function MS2eMiniRoosWhereWeAtEmpty() {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', fontFamily: 'var(--font-sans)' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>Where we're at</div>
        <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>U9 Tom · nothing yet — film a game to see this</div>
      </div>

      <div style={{ background: PALE, borderRadius: 16, padding: '32px 24px', maxWidth: 480, marginBottom: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>Film a game to get started</div>
        <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20 }}>After each filmed game Clean Sheet counts your three things and shows you here how they're going. No scores, never ranked.</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => showToast('Opening Record screen.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 'none', background: G, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Record a game</button>
          <button onClick={() => showToast('Opening style picker.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Pick our three things</button>
        </div>
      </div>

      {[
        { n: '1', title: 'Your three things counted', body: 'After each filmed game, Clean Sheet shows how they went' },
        { n: '2', title: 'Every child separately', body: 'The thing each one moved most, against their own last month' },
        { n: '3', title: 'What to do about it', body: "Linked to Tuesday's games" },
      ].map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: LN, color: MUT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.title}</div>
            <div style={{ fontSize: 13, color: MUT }}>{s.body}</div>
          </div>
        </div>
      ))}
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
