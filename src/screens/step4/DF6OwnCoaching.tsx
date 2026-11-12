import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function DF6OwnCoaching(_: { onBack?: () => void }) {
  const [sharing, setSharing] = useState<'just-me' | 'all'>('all')
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, height: 820, boxSizing: 'border-box', background: '#f7f8f7', color: INK, fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 'none', background: GD, height: 56, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>Clean Sheet</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginLeft: 8 }}>Add your own drill</span>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={() => st('Cancelled.')} style={{ height: 44, padding: '0 16px', borderRadius: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, padding: '28px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT }}>Step 4 of 4 · Coaching points</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 12 }}>How do you run it?</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: MUT, marginBottom: 8 }}>How it works <span style={{ fontWeight: 400 }}>up to 3 steps</span></div>
            {[1, 2, 3].map(n => <input key={n} placeholder={`${n}`} style={{ display: 'block', width: '100%', height: 48, borderRadius: 10, border: `1.5px solid ${LN}`, padding: '0 14px', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const, marginBottom: 8 }}/>)}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: MUT, marginBottom: 8 }}>Coaching points <span style={{ fontWeight: 400 }}>what you'll shout from the side</span></div>
            <textarea placeholder="e.g. Keep your head up, play through pressure" style={{ width: '100%', height: 80, borderRadius: 10, border: `1.5px solid ${LN}`, padding: '12px 14px', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const, resize: 'none' as const }}/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['Make it easier', 'Make it harder'].map(label => (
              <div key={label}>
                <div style={{ fontSize: 14, fontWeight: 600, color: MUT, marginBottom: 8 }}>{label}</div>
                <input placeholder="Optional" style={{ width: '100%', height: 48, borderRadius: 10, border: `1.5px solid ${LN}`, padding: '0 14px', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const }}/>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 10 }}>Who can use it?</div>
            {[{ id: 'just-me', label: 'Just me', sub: 'Only you see it in Our drills' }, { id: 'all', label: 'All Wattle Creek coaches', sub: '6 coaches across U9 to U14' }].map(opt => (
              <button key={opt.id} onClick={() => setSharing(opt.id as typeof sharing)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 14px', borderRadius: 12, border: `2px solid ${sharing === opt.id ? G : LN}`, background: sharing === opt.id ? PALE : '#fff', textAlign: 'left' as const, cursor: 'pointer', marginBottom: 8, fontFamily: 'inherit' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', border: `3px solid ${sharing === opt.id ? G : LN}`, background: sharing === opt.id ? G : '#fff', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: sharing === opt.id ? G : INK }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{opt.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: PALE, borderRadius: 14, padding: '14px', fontSize: 13, color: MUT, lineHeight: 1.6, alignSelf: 'flex-start' as const, marginTop: 60 }}>
          Saved drills can be edited any time.
        </div>
      </main>
      <div style={{ flex: 'none', padding: '14px 28px', background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button onClick={() => st('Going back.')} style={{ height: 44, padding: '0 20px', borderRadius: 10, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, fontWeight: 600, color: MUT, cursor: 'pointer' }}>Back</button>
        <button onClick={() => st('Saving drill.')} style={{ height: 44, padding: '0 24px', borderRadius: 10, border: 'none', background: GD, fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>Save drill</button>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
