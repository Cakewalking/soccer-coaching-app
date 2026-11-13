import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function FILp3ParentForm() {
  const [kitSize, setKitSize] = useState<string | null>(null)
  const [photoDay, setPhotoDay] = useState<boolean | null>(null)
  const [dietary, setDietary] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 2500) }

  if (submitted) {
    return (
      <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: INK, marginBottom: 8 }}>All done!</div>
        <div style={{ fontSize: 14, color: MUT }}>Sam will see your answers.</div>
      </div>
    )
  }

  return (
    <div style={{ width: 390, background: '#f7f8f7', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column', borderRadius: 24, overflow: 'hidden' }}>
      <div style={{ background: GD, padding: '24px 20px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>U12 Sam · form</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Kit sizes and photo day</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Closes Fri 12 June</div>
      </div>

      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Kit size this season?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {['8', '10', '12', '14'].map(s => (
              <button key={s} onClick={() => setKitSize(s)} style={{ height: 44, borderRadius: 10, border: `1.5px solid ${kitSize === s ? G : LN}`, background: kitSize === s ? PALE : '#fff', fontSize: 15, fontWeight: kitSize === s ? 700 : 400, color: kitSize === s ? G : INK, cursor: 'pointer', fontFamily: 'inherit' }}>{s}</button>
            ))}
          </div>
          {kitSize && <div style={{ fontSize: 12, color: G, marginTop: 8 }}>Last year: 10</div>}
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>Available for photo day, Saturday 15 June?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[true, false].map(v => (
              <button key={String(v)} onClick={() => setPhotoDay(v)} style={{ height: 44, borderRadius: 10, border: `1.5px solid ${photoDay === v ? G : LN}`, background: photoDay === v ? PALE : '#fff', fontSize: 15, fontWeight: photoDay === v ? 700 : 400, color: photoDay === v ? G : INK, cursor: 'pointer', fontFamily: 'inherit' }}>{v ? 'Yes' : 'No'}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Any dietary needs at presentation lunch?</div>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>Leave blank if none</div>
          <textarea value={dietary} onChange={e => setDietary(e.target.value)} placeholder="e.g. vegetarian, no nuts" style={{ width: '100%', height: 72, border: `1.5px solid ${LN}`, borderRadius: 10, padding: '10px', fontSize: 14, fontFamily: 'inherit', resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <button onClick={() => { if (kitSize && photoDay !== null) setSubmitted(true); else st('Please answer all questions.') }} style={{ width: '100%', height: 50, borderRadius: 14, background: G, color: '#fff', border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 10 }}>Submit</button>
        <button onClick={() => st('Saved. You can finish later before the deadline.')} style={{ width: '100%', height: 44, borderRadius: 14, border: `1.5px solid ${LN}`, background: '#fff', fontSize: 14, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Finish later</button>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100, whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
