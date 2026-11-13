import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function PU5Settings({ onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [aheadWeeks, setAheadWeeks] = useState(6)
  const [minGames, setMinGames] = useState(5)
  const [growthCm, setGrowthCm] = useState(7)
  const [injuryWeeks, setInjuryWeeks] = useState(4)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52, flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Players' ? 700 : 500, color: t === 'Players' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Whole club ▾</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c0a070', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>RM</div>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        <button onClick={onBack} style={{ fontSize: 13, color: G, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>← Playing across</button>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>What the club counts</div>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={() => st('Settings saved.')} style={{ height: 36, padding: '0 16px', borderRadius: 999, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Save</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '24px 32px', gap: 24 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: INK }}>What the club counts</div>
            <div style={{ fontSize: 13, color: MUT }}>With these rules: 3 worth a look · 1 held back</div>
          </div>

          {/* Flag when */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 16 }}>Flag when</div>
            {[
              { label: 'Clearly ahead for', field: 'ahead', val: aheadWeeks, set: setAheadWeeks, unit: 'weeks', min: 4, max: 12 },
              { label: 'At least this many recorded games', field: 'games', val: minGames, set: setMinGames, unit: 'games', min: 3, max: 10 },
            ].map(r => (
              <div key={r.field} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ flex: 1, fontSize: 13, color: INK }}>{r.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={() => r.set(Math.max(r.min, r.val - 1))} style={{ width: 28, height: 28, borderRadius: '50%', border: `1.5px solid ${LN}`, background: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <div style={{ fontSize: 15, fontWeight: 700, color: INK, minWidth: 36, textAlign: 'center' }}>{r.val}</div>
                  <button onClick={() => r.set(Math.min(r.max, r.val + 1))} style={{ width: 28, height: 28, borderRadius: '50%', border: `1.5px solid ${LN}`, background: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  <div style={{ fontSize: 12, color: MUT }}>{r.unit}</div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0' }}>
              <div style={{ flex: 1, fontSize: 13, color: INK }}>Never flag under</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Under 9 · cannot change</div>
            </div>
          </div>

          {/* Always wait */}
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Always wait — whatever the numbers say</div>
            <div style={{ fontSize: 12, color: '#c05', marginBottom: 16 }}>A physio or sports doctor should confirm the growth and return rules before launch.</div>
            {[
              { label: 'Growing more than this in a year', field: 'growth', val: growthCm, set: setGrowthCm, unit: 'cm', min: 5, max: 12 },
              { label: 'Within this many weeks of returning from injury', field: 'injury', val: injuryWeeks, set: setInjuryWeeks, unit: 'weeks', min: 2, max: 8 },
            ].map(r => (
              <div key={r.field} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ flex: 1, fontSize: 13, color: INK }}>{r.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={() => r.set(Math.max(r.min, r.val - 1))} style={{ width: 28, height: 28, borderRadius: '50%', border: `1.5px solid ${LN}`, background: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                  <div style={{ fontSize: 15, fontWeight: 700, color: INK, minWidth: 36, textAlign: 'center' }}>{r.val}</div>
                  <button onClick={() => r.set(Math.min(r.max, r.val + 1))} style={{ width: 28, height: 28, borderRadius: '50%', border: `1.5px solid ${LN}`, background: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  <div style={{ fontSize: 12, color: MUT }}>{r.unit}</div>
                </div>
              </div>
            ))}
            {[
              'Any growth-pain flag',
              'More than 3 sessions a week across all teams and sports',
              'Under half a game available in the older team',
            ].map(r => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fef2f2', border: '1.5px solid #fca5a5', flexShrink: 0 }} />
                <div style={{ fontSize: 13, color: INK }}>{r} · cannot change</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: G, marginBottom: 8 }}>All numbers are placeholders</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.6 }}>The thresholds above come from youth sport guidance, not Clean Sheet's own research. Have a physio or sports doctor review them before the first season.</div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>
      )}
    </div>
  )
}
