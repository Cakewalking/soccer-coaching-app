import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

export default function RCm2eClipsEmpty(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px' }}>
        <div style={{ fontSize: 12, color: '#cfe6dc', marginBottom: 2 }}>U9 Tom · Wattle Creek</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Clips</div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#8fa09b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>TA</div>
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>U9 Tom · nothing filmed yet</div>
      </div>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', gap: 20, textAlign: 'center' as const }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: PALE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>Nothing filmed yet</div>
        <div style={{ fontSize: 15, color: MUT, lineHeight: 1.6, maxWidth: 300 }}>Film a game or a training game and each child gets a best moment to take home. You don't need a camera to coach.</div>
        <button onClick={() => st('Opening camera setup.')} style={{ height: 48, padding: '0 28px', borderRadius: 12, background: GD, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>Film something</button>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 18px', width: '100%', textAlign: 'left' as const }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Good to know</div>
          {['Any camera works', 'Each child gets their best moment', 'No scores or rankings — MiniRoos'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: `1px solid ${LN}`, fontSize: 13, color: INK }}>
              <span style={{ fontWeight: 700, color: G }}>{i + 1}</span>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', borderTop: `1px solid ${LN}`, background: '#fff' }}>
        {[{ label: 'Turns', icon: 'M12 5v14M5 12l7-7 7 7' }, { label: 'Fixtures', icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z' }, { label: 'Record', icon: 'M23 7l-7 5 7 5V7zM1 5h15v14H1z' }].map((item, i) => (
          <button key={item.label} onClick={() => st(`Going to ${item.label}.`)} style={{ flex: 1, padding: '10px 0', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={i === 2 ? G : MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon}/></svg>
            <span style={{ fontSize: 11, fontWeight: i === 2 ? 700 : 500, color: i === 2 ? G : MUT }}>{item.label}</span>
          </button>
        ))}
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
