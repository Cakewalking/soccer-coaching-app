import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb'
export default function TM11GameDayPapers(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>U13 Girls Meg · Sat 6 Jun · vs Northgate City</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>Game-day papers</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '4px 14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, padding: '8px 0 4px' }}>Before you send the team sheet</div>
          {[
            { title: 'No one is suspended', sub: 'Checked against Dribl last night' },
            { title: '1 player needs her letter', sub: 'Tess Nolan · playing down from U14' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: i > 0 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5 9-10"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{item.title}</div>
                <div style={{ fontSize: 13, color: MUT }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>TN</div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Tess Nolan</div>
              <div style={{ fontSize: 13, color: MUT }}>FV approval · 12 Mar 2026</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, padding: '0 9px', height: 24, borderRadius: 999, background: G, color: '#fff', display: 'flex', alignItems: 'center', flexShrink: 0 }}>Approved</div>
          </div>
          <div style={{ border: `1px solid ${LN}`, borderRadius: 10, background: '#f7f8f7', padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Dispensation letter</div>
            {[92, 84, 96, 60].map((w, i) => (
              <div key={i} style={{ height: 8, borderRadius: 4, background: LN, width: `${w}%` }} />
            ))}
          </div>
          <button onClick={() => t('Letter opened full screen to show the referee.')} style={{ height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Show the referee</button>
        </div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, padding: '0 2px' }}>FV asks for the letter at every game. It stays on this phone, even with no signal.</div>
      </div>
      <div style={{ padding: '10px 14px 12px', background: '#fff', borderTop: `1px solid ${LN}`, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button onClick={() => t('Team sheet sent to Dribl with 14 players.')} style={{ height: 50, borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Send the team sheet</button>
        <button onClick={() => t('Back to game day.')} style={{ height: 44, borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Back to game day</button>
      </div>
      {toast && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 24, background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60 }}>{toast}</div>}
    </div>
  )
}
