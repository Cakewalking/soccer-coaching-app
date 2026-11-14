import { useState } from 'react'
const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'
const ENROLLED = ['Dan Walsh', 'Hannah Lee', 'Kate Morris', 'Sam Nguyen', 'Nadia Chen', 'Luke Park', 'Mark Davis', 'Meg Torres', 'Ana Bell']
const NEXT_STEPS = [
  { name: 'FFA Club Coach', level: 'All coaches', action: 'Share' },
  { name: 'Foundation Licence', level: 'U12 and above', action: 'Nominate' },
  { name: 'C Diploma', level: 'Senior coaches', action: 'Nominate' },
  { name: 'First aid (WorkSafe)', level: 'All coaches', action: 'Book' },
  { name: 'Concussion awareness', level: 'All coaches', action: 'Share' },
]
export default function DT1Courses(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Coaches' ? 700 : 500, color: tab === 'Coaches' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>
      <div style={{ padding: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Training and courses</div>
        <div style={{ fontSize: 13, color: MUT, marginBottom: 20 }}>Season 2026 · Wattle Creek FC</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { label: 'Club course done', val: '22/31', sub: '9 to go', warn: false },
            { label: 'Foundation courses', val: '14', sub: 'coaches hold licence', warn: false },
            { label: 'C Diploma', val: '3', sub: 'coaches qualified', warn: false },
            { label: 'First aid current', val: '18/31', sub: '13 to book', warn: true },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: `1px solid ${s.warn ? '#ffd0d0' : LN}`, borderRadius: 14, padding: '16px 18px' }}>
              <div style={{ fontSize: 12, color: MUT, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: s.warn ? '#c00' : GD }}>{s.val}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div>
            <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Club course</div>
                  <div style={{ fontSize: 12, color: MUT }}>Sat 20 Jun · 9:00 am · Wattle Creek Clubrooms</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: G, background: PALE, padding: '4px 10px', borderRadius: 20 }}>9 enrolled</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {ENROLLED.map(name => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: `1px solid ${LN}`, fontSize: 13, color: INK }}>
                    <span style={{ color: G }}>✓</span>{name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 10 }}>Next steps</div>
            {NEXT_STEPS.map(s => (
              <div key={s.name} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{s.level}</div>
                </div>
                <button onClick={() => t(`${s.action}: ${s.name}`)} style={{ height: 44, padding: '0 12px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{s.action}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
