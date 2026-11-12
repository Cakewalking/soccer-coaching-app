import { useState } from 'react'
const GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2', G = '#2f6252'

export default function RF1RefAsked(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 390, minHeight: 844, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>Wattle Creek FC · referees</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Can you do a game?</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#8c6e5a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>ZP</div>
      </div>
      <div style={{ flexGrow: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ background: PALE, padding: '10px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>From Ruth, Referee Coordinator</div>
          </div>
          <div style={{ padding: '16px 16px' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 4 }}>U13 Girls Meg v Northgate City</div>
            <div style={{ fontSize: 13, color: MUT, marginBottom: 16 }}>Assistant referee · Sat 6 Jun · 12:00 · pitch 1</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {[{ label: 'Be there by', value: '11:40' }, { label: 'Game length', value: '2 × 30 minutes' }, { label: 'Referee', value: 'Appointed by the league' }, { label: 'Your other game', value: '8:30 · U7 Dan, pitch 5' }].map((r, i) => (
                <div key={i} style={{ background: '#f7f8f7', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 11, color: MUT, marginBottom: 2 }}>{r.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{r.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: PALE, borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: INK, lineHeight: 1.5 }}>Ruth is at the ground all day, and the ground marshal in the hi-vis vest steps in if anyone on the sideline gives you a hard time.</div>
            </div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 14 }}>Three other referees were asked too. The first to say yes gets it.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button onClick={() => st('Confirmed! Game saved.')} style={{ height: 48, borderRadius: 12, background: GD, color: '#fff', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Yes, I'll do it</button>
              <button onClick={() => st('Declined.')} style={{ height: 44, borderRadius: 12, background: '#fff', color: INK, border: `1.5px solid ${LN}`, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Can't this time</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', borderTop: `1px solid ${LN}`, background: '#fff' }}>
        {[{ label: 'My games', icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z' }, { label: 'Report', icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }, { label: 'Feedback', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' }, { label: 'Me', icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' }].map((item, i) => (
          <div key={item.label} style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon}/></svg>
            <span style={{ fontSize: 11, fontWeight: 500, color: MUT }}>{item.label}</span>
          </div>
        ))}
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, zIndex: 100 }}>{toast}</div>}
    </div>
  )
}
