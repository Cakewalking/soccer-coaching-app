import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function X6ClipsEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820 }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>U12 Sam · Wattle Creek</div>
        {['Home', 'Squad', 'Training', 'Match day', 'Clips'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Clips' ? 700 : 500, color: t === 'Clips' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Head coach</div>
      </div>

      <div style={{ padding: '32px 48px' }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Clips</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>No clips yet</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32 }}>
          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '28px 24px', textAlign: 'center' as const, marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: INK, marginBottom: 8 }}>Clips find themselves</div>
              <div style={{ fontSize: 14, color: MUT, marginBottom: 20 }}>After each recorded game, Clean Sheet cuts out the key moments and tags them to your style.</div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button onClick={() => st('Opening recording setup.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Record a game</button>
                <button onClick={() => st('Opening video upload.')} style={{ height: 44, padding: '0 20px', borderRadius: 12, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Upload a video</button>
              </div>
            </div>

            {/* Measure tags */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {['Pressing high', 'Winning it back', 'Building out', 'Counter-attacks'].map(m => (
                <div key={m} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: INK, marginBottom: 2 }}>{m}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: MUT }}>0</div>
                  <div style={{ fontSize: 11, color: MUT }}>clips</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>How clips work</div>
              {[
                { title: 'Found for you', body: 'Every press, build-up, counter and goal is cut out of the full match.' },
                { title: 'Tagged to your style', body: 'Each clip is linked to a measure, so you can see good examples and ones to work on.' },
                { title: 'Checked by you', body: "Anything Clean Sheet is unsure about waits in 'To check'." },
                { title: 'Shared safely', body: "Players only get clips if their parent agreed. Other players are blurred." },
              ].map(item => (
                <div key={item.title} style={{ padding: '8px 0', borderBottom: `1px solid ${LN}` }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{item.body}</div>
                </div>
              ))}
              <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>Full match video is deleted after 90 days. Clips you keep stay until the end of the season.</div>
            </div>
          </div>
        </div>
      </div>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
    </div>
  )
}
