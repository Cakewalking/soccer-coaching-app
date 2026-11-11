import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
export default function TM4DutyRoster(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  const t = (m: string) => { setToast(m); setTimeout(() => setToast(null), 3200) }
  const duties = [
    { icon: '🍊', title: 'Oranges at half-time', sub: 'Morgan family (Isla) · confirmed', badge: 'Done', badgeBg: PALE, badgeColor: G },
    { icon: '🏪', title: 'Canteen 10 to 11', sub: 'Linh Tran (Mia) · confirmed', badge: 'Done', badgeBg: PALE, badgeColor: G },
    { icon: '🚩', title: 'Club linesman', sub: 'Needs someone over 16 · flag in the blue bag', badge: 'Ask', badgeBg: '#c39797', badgeColor: INK, action: true },
    { icon: '🛡️', title: 'Ground marshal', sub: 'Hi-vis vest · over 18 · every game, home and away', badge: 'Brennan family', badgeBg: LN, badgeColor: INK },
    { icon: '📹', title: 'Camera on the halfway line', sub: 'You · kit 1, picked up Friday', badge: 'You', badgeBg: LN, badgeColor: INK },
  ]
  const fair = [
    { ini: 'LT', name: 'Tran family', sub: 'Canteen ×2, oranges ×1', count: 3 },
    { ini: 'IM', name: 'Morgan family', sub: 'Oranges ×2', count: 2 },
    { ini: 'GO', name: 'Owusu family (you)', sub: 'Camera ×8', count: 8 },
    { ini: 'FW', name: 'Walsh family', sub: 'Linesman ×1', count: 1 },
    { ini: 'OB', name: 'Brennan family', sub: 'Not yet', count: 0 },
  ]
  return (
    <div style={{ width: 390, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 844, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: GD, padding: '14px 18px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#cfe6dc' }}>U12 Sam · Team manager</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: '#fff' }}>Duty roster</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RO</div>
      </div>
      <div style={{ flexGrow: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '4px 14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, padding: '8px 0 4px' }}>Sat 6 Jun · vs Harbour Rovers</div>
          {duties.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: i > 0 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: d.action ? '#c39797' : '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{d.icon}</div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{d.title}</div>
                <div style={{ fontSize: 13, color: MUT }}>{d.sub}</div>
              </div>
              {d.action
                ? <button onClick={() => t('Asked all U12 parents. The first to say yes gets it.')} style={{ fontSize: 14, fontWeight: 700, color: G, background: 'none', border: 0, cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>{d.badge}</button>
                : <div style={{ fontSize: 12, fontWeight: 700, padding: '0 9px', height: 24, borderRadius: 999, background: d.badgeBg, color: d.badgeColor, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>{d.badge}</div>
              }
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '4px 14px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUT, padding: '8px 0 4px' }}>Fair share this season</div>
          {fair.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 50, borderTop: i > 0 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{f.ini}</div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{f.name}</div>
                <div style={{ fontSize: 13, color: MUT }}>{f.sub}</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{f.count}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: MUT, textAlign: 'center', padding: '0 6px' }}>Asking families who've done the least first. They answer from the parent app.</div>
      </div>
      <nav style={{ display: 'flex', borderTop: `1px solid ${LN}`, background: '#fff' }}>
        {['Home', 'Game day', 'Messages', 'Roster'].map((label, i) => (
          <button key={label} onClick={() => t(`${label} tab`)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, minHeight: 56, fontSize: 11, fontWeight: 700, color: i === 3 ? G : MUT, background: 'none', border: 0, cursor: 'pointer' }}>{label}</button>
        ))}
      </nav>
      {toast && <div style={{ position: 'absolute', left: 16, right: 16, bottom: 72, background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60 }}>{toast}</div>}
    </div>
  )
}
