import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function IL1eInjuryLogEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const [logOpen, setLogOpen] = useState(false)
  const [player, setPlayer] = useState('')
  const [desc, setDesc] = useState('')
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Squad', 'Fitness tests', 'Injury log', 'Load'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Injury log' ? 700 : 500, color: tab === 'Injury log' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Fitness coach</div>
      </div>

      <div style={{ padding: 48, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Injury log</div>
          <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Private to the fitness team and welfare officer</div>

          {!logOpen ? (
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '32px 28px', textAlign: 'center' as const }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: PALE, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="1.5" strokeLinecap="round"><path d="M9 10h6M12 7v6"/><rect x="4" y="4" width="16" height="16" rx="3"/></svg>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>No injuries logged</div>
              <div style={{ fontSize: 13, color: MUT, maxWidth: 320, margin: '0 auto 20px' }}>Log the first one here. It stays inside the fitness team and is never shared with coaches.</div>
              <button onClick={() => setLogOpen(true)} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Log an injury</button>
            </div>
          ) : (
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '20px 24px' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 16 }}>Log an injury</div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK, marginBottom: 4 }}>Player</div>
                  <input value={player} onChange={e => setPlayer(e.target.value)} placeholder="Name or start typing…" style={{ width: '100%', height: 40, borderRadius: 10, border: `1px solid ${LN}`, padding: '0 12px', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' as const, outline: 'none' }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK, marginBottom: 4 }}>What happened</div>
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the injury and when it happened…" rows={3} style={{ width: '100%', borderRadius: 10, border: `1px solid ${LN}`, padding: '10px 12px', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' as const, resize: 'vertical' as const, outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => setLogOpen(false)} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                  <button onClick={() => { setLogOpen(false); t('Injury logged.') }} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Log injury</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 8 }}>What gets logged</div>
            {[
              ['What happened', 'The injury and how it occurred'],
              ['When', 'Date and training or game'],
              ['Return to play', 'Your target date, updated as it progresses'],
              ['Who knows', 'Fitness team and welfare officer only'],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: '7px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{k}</div>
                <div style={{ fontSize: 12, color: MUT }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
