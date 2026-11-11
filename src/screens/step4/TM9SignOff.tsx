import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'
export default function TM9SignOff(_: { onBack?: () => void }) {
  const [refRating, setRefRating] = useState<string | null>('Great')
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>U12 Sam · Sat 6 Jun · full time</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>Sign off the game</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>Final score</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 15, fontWeight: 700 }}>
            <span>Wattle Creek</span>
            <span style={{ fontSize: 40, lineHeight: '48px', fontVariantNumeric: 'tabular-nums' }}>2–1</span>
            <span>Harbour Rovers</span>
          </div>
          <div style={{ fontSize: 13, color: MUT }}>Goals: Mia Tran, Finn Walsh · from the camera tags</div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT }}>How did Dana, the referee, go?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Great', 'Good', 'Needs support'].map(r => (
              <button key={r} onClick={() => setRefRating(r)} style={{ minHeight: 44, padding: '0 14px', borderRadius: 999, fontSize: 14, fontWeight: 700, border: refRating === r ? 0 : `1px solid ${LN}`, background: refRating === r ? G : '#fff', color: refRating === r ? '#fff' : INK, cursor: 'pointer', fontFamily: 'inherit' }}>{r}</button>
            ))}
          </div>
          <div style={{ fontSize: 13, color: MUT }}>Dana sees "Great" or "Good". Anything else goes only to the referee coordinator.</div>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '4px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50 }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Head knocks</div>
              <div style={{ fontSize: 13, color: MUT }}>None logged today</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, padding: '0 9px', height: 24, borderRadius: 999, background: LN, display: 'flex', alignItems: 'center' }}>0</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: `1px solid ${LN}` }}>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Sideline reports</div>
              <div style={{ fontSize: 13, color: MUT }}>1 sent to Helen</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, padding: '0 9px', height: 24, borderRadius: 999, background: LN, display: 'flex', alignItems: 'center' }}>1</div>
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 14px 12px', background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button onClick={() => t('2–1 entered in Dribl for Football Victoria. Parents see it in the app.')} style={{ height: 50, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Enter the result in Dribl</button>
        <button onClick={() => t('Back to game day.')} style={{ height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Back to game day</button>
      </div>
      {toast && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 24, background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60 }}>{toast}</div>}
    </div>
  )
}
