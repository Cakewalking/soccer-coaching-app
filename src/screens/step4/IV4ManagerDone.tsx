import { useState } from 'react'

const GD = '#1f4a3e', INK = '#10211f'

const FIRST_THINGS = [
  'Ask who\'s coming on Saturday',
  'Check the duty roster',
  'Pick up camera kit 1 on Friday',
]

export default function IV4ManagerDone() {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }

  return (
    <div style={{ width: 390, margin: '0 auto', background: GD, minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div style={{ padding: '52px 24px 32px', flexShrink: 0 }}>
        <div style={{ width: 60, height: 60, borderRadius: '999px', background: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c3e6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>U12 Sam · Wattle Creek FC</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>Join as team manager</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>You're in, Rob</div>
        <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginTop: 8, lineHeight: 1.5 }}>
          You're U12 Sam's team manager. Saturday's meet time is already in your Home.
        </div>
      </div>

      {/* First things */}
      <div style={{ flex: 1, padding: '0 24px 40px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>
          Good first things
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FIRST_THINGS.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '999px', border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>{i + 1}</span>
              </div>
              <span style={{ fontSize: 15, color: '#fff', lineHeight: 1.4 }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
          Sam can see you've joined.
        </div>

        <button onClick={() => st('Going to home.')} style={{ marginTop: 32, width: '100%', height: 52, borderRadius: '999px', border: 0, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
          Go to my Home
        </button>
      {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
      </div>
    </div>
  )
}
