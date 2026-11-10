import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

type Choice = 'game' | 'training' | 'skill' | null
export default function RCm1RecordChoice(_: { onBack?: () => void }) {
  const [chosen, setChosen] = useState<Choice>(null)
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>Record</div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Coach · U7 Dan · MiniRoos</div>
      </div>

      <div style={{ padding: 48 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>What are you filming?</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 32 }}>The camera will tag the clips automatically</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 760 }}>
          {[
            { key: 'game', icon: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm4-10H8M12 8v8"/>, label: 'Film a game', sub: 'Clips tagged by child and turn' },
            { key: 'training', icon: <><path d="M3 17l5-10 4 7 3-5 4 8"/><circle cx="19" cy="17" r="2"/></>, label: 'Film training', sub: 'Clips tagged by activity' },
            { key: 'skill', icon: <><path d="M12 2l2 7h7l-6 4 2 7-5-3.5L7 20l2-7-6-4h7z"/></>, label: 'Skill challenge', sub: 'One child at a time' },
          ].map(opt => (
            <button key={opt.key} onClick={() => setChosen(opt.key as Choice)} style={{ background: chosen === opt.key ? GD : '#fff', border: chosen === opt.key ? 0 : `1px solid ${LN}`, borderRadius: 16, padding: '24px 20px', textAlign: 'center' as const, cursor: 'pointer', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: chosen === opt.key ? 'rgba(255,255,255,0.15)' : PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={chosen === opt.key ? '#fff' : MUT} strokeWidth="1.5" strokeLinecap="round">{opt.icon}</svg>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: chosen === opt.key ? '#fff' : INK, marginBottom: 4 }}>{opt.label}</div>
                <div style={{ fontSize: 12, color: chosen === opt.key ? 'rgba(255,255,255,0.75)' : MUT }}>{opt.sub}</div>
              </div>
            </button>
          ))}
        </div>

        {chosen && (
          <button onClick={() => t(`Starting camera for ${chosen}.`)} style={{ marginTop: 32, height: 48, padding: '0 32px', borderRadius: 14, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Start filming
          </button>
        )}
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
