import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const CHILDREN = ['Mia', 'Ruby', 'Leo', 'Ava', 'Grace', 'Jai', 'Isla', 'Ella']

export default function RCm2ClipPicker(_: { onBack?: () => void }) {
  const [selected, setSelected] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  function toggle(name: string) {
    if (selected.includes(name)) {
      setSelected(prev => prev.filter(n => n !== name))
    } else if (selected.length < 2) {
      setSelected(prev => [...prev, name])
    }
  }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>Record · Clips</div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Coach · U7 Dan · MiniRoos</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Pick clips to send</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 24 }}>Tuesday's game · 8 children · pick up to 2 to send to families</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
          {CHILDREN.map(name => {
            const sel = selected.includes(name)
            return (
              <div key={name} onClick={() => toggle(name)} style={{ background: sel ? GD : '#fff', border: sel ? 0 : `1px solid ${LN}`, borderRadius: 14, padding: '16px 14px', cursor: 'pointer', textAlign: 'center' as const }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: sel ? 'rgba(255,255,255,0.2)' : PALE, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: sel ? '#fff' : GD }}>
                  {name[0]}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: sel ? '#fff' : INK, marginBottom: 2 }}>{name}</div>
                <div style={{ fontSize: 11, color: sel ? 'rgba(255,255,255,0.75)' : MUT }}>3 clips</div>
                {sel && <div style={{ marginTop: 6, fontSize: 11, fontWeight: 700, color: '#fff' }}>Selected</div>}
              </div>
            )
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: MUT }}>{selected.length} of 2 selected · {selected.length === 2 ? 'Send whenever you\'re ready.' : 'Pick one more to send two families a clip today.'}</div>
          <button onClick={() => t(selected.length ? `Clips sent to ${selected.join(' and ')}'s families.` : 'Please pick at least one child first.')} style={{ height: 44, padding: '0 24px', borderRadius: 12, border: 0, background: selected.length ? G : LN, color: selected.length ? '#fff' : MUT, fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Send to {selected.length === 2 ? '2 families' : selected.length === 1 ? '1 family' : 'families'}
          </button>
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: MUT }}>Clips go straight to the family's phone. No app download needed. Each family only sees their child.</div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
