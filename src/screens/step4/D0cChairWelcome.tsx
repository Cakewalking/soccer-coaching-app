import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const STEPS = [
  { n: '1', text: 'Invite your director of football', sub: 'They set up teams, coaches and the playing style.' },
  { n: '2', text: 'Name a welfare officer', sub: 'The one person who sees safeguarding concerns in full.' },
  { n: '3', text: 'Name a concussion officer', sub: 'Told about every head knock. Often a physio or first aider.' },
  { n: '4', text: 'Agree the club rules', sub: 'Fair minutes, consent, video, the code of conduct.' },
  { n: '5', text: 'Add the committee', sub: 'They get the board report each month.' },
]

export default function D0cChairWelcome(_: { onBack?: () => void }) {
  const [done, setDone] = useState<number[]>([])
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Chair · Wattle Creek FC</div>
      </div>

      <div style={{ padding: 48, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Welcome, Greg</div>
          <div style={{ fontSize: 15, color: MUT, marginBottom: 24 }}>Wattle Creek FC · Chair · here's what the committee needs from you</div>

          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Get the club ready</div>
              <div style={{ fontSize: 13, color: MUT }}>{done.length} of 5 · about 20 minutes</div>
            </div>
            <div style={{ height: 6, background: LN, borderRadius: 999, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ height: '100%', background: G, borderRadius: 999, width: `${(done.length / 5) * 100}%`, transition: 'width 0.3s' }} />
            </div>

            {STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: `1px solid ${LN}`, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: done.includes(i) ? G : PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 2 }}>
                  {done.includes(i) ? (
                    <svg width="11" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : (
                    <span style={{ fontSize: 11, fontWeight: 700, color: G }}>{s.n}</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: done.includes(i) ? MUT : INK }}>{s.text}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{s.sub}</div>
                </div>
                {!done.includes(i) && (
                  <button onClick={() => { setDone(prev => [...prev, i]); t(`Done.`) }} style={{ height: 44, padding: '0 12px', borderRadius: 8, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer', flex: 'none' }}>
                    {['Invite', 'Name', 'Name', 'Review', 'Add'][i]}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px', marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>What you'll see</div>
            {[
              ['Players', 'Juniors and seniors'],
              ['Checks valid', 'Coaches cleared'],
              ['Fees paid', 'Across the club'],
              ['Volunteers', 'Hours this season'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 12, color: MUT }}>{k}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ background: PALE, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 4 }}>You and the director</div>
            <div style={{ fontSize: 12, color: GD }}>You look after the club: safety, money, the committee and the league. The director looks after the football.</div>
          </div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
