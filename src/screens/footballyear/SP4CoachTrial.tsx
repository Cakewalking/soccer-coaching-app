import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const PLAYERS = [
  { initials: 'BN', name: 'Billie Novak',  pos: 'Midfield · born Nov' },
  { initials: 'AM', name: 'Arjun Mehta',  pos: 'Defender · born Mar' },
  { initials: 'TA', name: 'Tess Albright', pos: 'Winger · born Aug' },
  { initials: 'MS', name: 'Marco Silva',   pos: 'Striker · born Dec' },
]

export default function SP4CoachTrial({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ padding: '20px 28px 40px', background: '#f7f8f7', minHeight: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Head coach</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Trial morning</div>
          <div style={{ fontSize: 14, color: MUT }}>Sun 22 March · 4 players join your normal session</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onBack} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Back to the squad</button>
          <button onClick={() => t('Saved. Rachel, the director, sends every family a reply by Tuesday.')} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Save and tell the club</button>
        </div>
      </div>

      {/* Players table */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '10px 16px', background: '#f7f8f7', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: MUT }}>Three taps per player · 4 players</div>
        </div>
        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr 1fr 120px', padding: '8px 16px', borderBottom: `1px solid ${LN}`, background: '#fafafa' }}>
          {['Player','On the ball','Game sense','Effort','Your call'].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT }}>{h}</div>
          ))}
        </div>
        {PLAYERS.map(p => (
          <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr 1fr 120px', padding: '12px 16px', alignItems: 'center', borderBottom: `1px solid ${LN}` }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</div>
              <div style={{ fontSize: 12, color: MUT }}>{p.pos}</div>
            </div>
            {['On the ball','Game sense','Effort'].map(col => (
              <div key={col} style={{ display: 'flex', gap: 4 }}>
                {[1,2,3].map(n => (
                  <button key={n} onClick={() => t(`${p.name}: ${col} rated ${n}`)} style={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${LN}`, background: n === 2 ? G : '#fff', color: n === 2 ? '#fff' : MUT, fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{n}</button>
                ))}
              </div>
            ))}
            <button onClick={() => t(`${p.name} confirmed.`)} style={{ height: 32, padding: '0 10px', borderRadius: 8, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Confirm</button>
          </div>
        ))}
        <div style={{ padding: '10px 16px', background: '#fafafa', fontSize: 12, color: MUT }}>Scores stay with coaches. Families only ever get words: a place, another look, or another team.</div>
      </div>

      {/* Late year note */}
      <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: GD, marginBottom: 4 }}>Two were born late in the year</div>
        <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>Billie and Marco are up to 10 months younger than the oldest in the group. Younger players get picked less, so look twice.</div>
      </div>

      {/* Fair look */}
      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 20px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>A fair look</div>
        {[
          { n: '1', title: 'Same games as everyone',  note: 'No separate test' },
          { n: '2', title: "Two sessions before a no", note: "One bad day isn't a trial" },
          { n: '3', title: 'Every family hears back',  note: 'Within 2 days, in kind words' },
        ].map(item => (
          <div key={item.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 12, fontWeight: 700, color: G }}>{item.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{item.title}</div>
              <div style={{ fontSize: 12, color: MUT }}>{item.note}</div>
            </div>
          </div>
        ))}
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
