import { useState } from 'react'

const G = '#2f6252', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const DRILL = {
  name: 'Win it back in 6 seconds',
  tag: 'Focus 1',
  mins: 25,
  start: '6:00',
  how: 'Play keep-ball. When a team loses it, they have 6 seconds to win it back. Win it in time: 1 point. Keep it for 6 seconds: 1 point to the other team.',
  say: 'Count out loud: 1, 2, 3… Nearest player goes NOW.',
  setup: ['8 v 8', '40 × 30 m', 'Bibs, cones, stopwatch'],
  adjust: 'Noah and Zoe: 3 sprints max',
}

const STEPS = ['Attendance', 'Drill', 'Wrap up']

export default function TR1bPitchSideDrill(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, position: 'relative', overflow: 'hidden', boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16, background: INK }}>
        <button onClick={() => st('Going back.')} style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>←</button>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', flex: 1 }}>Training · Thu 4 Jun</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>6:14</div>
        <button onClick={() => st('Going to next step.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Next →</button>
      </div>

      <div style={{ flex: 'none', padding: '10px 28px', background: '#fff', borderBottom: `1px solid ${LN}`, display: 'flex', gap: 24 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: i === 1 ? 700 : 500, color: i === 1 ? INK : i < 1 ? G : MUT, borderBottom: `3px solid ${i === 1 ? '#40826d' : 'transparent'}`, paddingBottom: 6 }}>
            {i < 1 && <span style={{ color: G }}>✓</span>}{s}
          </div>
        ))}
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '16px 28px 20px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flex: 'none' }}>1</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: G }}>{DRILL.tag} · {DRILL.start} · {DRILL.mins} min</div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{DRILL.name}</div>
            </div>
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>How it works</div>
              <div style={{ fontSize: 15, lineHeight: '22px' }}>{DRILL.how}</div>
            </div>
            <div style={{ background: G, borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Say this</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', lineHeight: '22px' }}>{DRILL.say}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
              {DRILL.setup.map(s => <div key={s} style={{ fontSize: 13, background: '#f7f8f7', border: `1px solid ${LN}`, borderRadius: 8, padding: '3px 10px', color: MUT }}>{s}</div>)}
            </div>
            {DRILL.adjust && <div style={{ background: '#c39797', borderRadius: 10, padding: '10px 14px', fontSize: 14, fontWeight: 600 }}><strong>Adjust:</strong> {DRILL.adjust}</div>}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => st('Opening previous drill.')} style={{ flex: 1, height: 48, borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer' }}>← Previous drill</button>
            <button onClick={() => st('Opening next drill.')} style={{ flex: 1, height: 48, borderRadius: 12, border: 0, background: G, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Next drill →</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Keep an eye on</div>
            {[['Noah Okafor', '3 sprints max tonight'], ['Ella Brandt', 'Had a quick chat — OK to train'], ['Zoe Hartley', '3 sprints max tonight']].map(([name, note]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#c39797', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flex: 'none' }}>{name.split(' ').map(w => w[0]).join('')}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{note}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Tag players</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <button onClick={() => st('Tagged as good.')} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${G}`, background: PALE, color: G, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>👍 Good</button>
              <button onClick={() => st('Tagged to work on.')} style={{ flex: 1, height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: MUT, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>📌 Work on</button>
            </div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: '17px' }}>Tags are added to the drill record and used in next session's suggestions.</div>
          </div>
        </div>
      </main>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
