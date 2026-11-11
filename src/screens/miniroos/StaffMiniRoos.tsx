import { useState } from 'react'
import { EmptyCard } from '../clubadmin/ui'

const STAFF = [
  { ini: 'TA', bg: '#c39797', name: 'Tom Albers', role: 'Head coach', check: 'Valid', checkBg: '#2f6252', checkColor: '#fff', canEdit: false },
  { ini: 'JF', bg: '#cbbeb5', name: 'Jo Franklin', role: 'Assistant coach', check: 'Valid', checkBg: '#2f6252', checkColor: '#fff', canEdit: false },
  { ini: 'KN', bg: '#cbbeb5', name: 'Kim Nolan', role: 'Team manager', check: 'Check due 30 Jun', checkBg: '#cbbeb5', checkColor: '#10211f', canEdit: false },
]

export default function StaffMiniRoos({ empty }: { empty?: boolean }) {
  const [toast, setToast] = useState('')
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3200) }

  if (empty) return <EmptyCard icon="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" title="It's just you so far" desc="Most MiniRoos teams run best with a second adult. Invite a co-coach or a parent as team manager." cta="Invite someone" items={[{ title: 'Co-coach', desc: 'Sees everything you see' }, { title: 'Team manager', desc: "Looks after who's coming and messages" }, { title: 'Game leader', desc: 'A young referee, booked by the club' }]} />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Team staff</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>U9 Tom · 3 people</span>
        </div>
        <button onClick={() => showToast('Invite started. Pick a role first.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>+ Invite someone</button>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 300px' }}>

        {/* Staff list */}
        <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px 8px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr', gap: 10, paddingBottom: 8 }}>
            {['Name', 'Role', 'Children check', 'Sees'].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#4a5a57' }}>{h}</span>
            ))}
          </div>

          {STAFF.map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 15, color: '#10211f' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '999px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{s.ini}</span>
                <span style={{ fontWeight: 700 }}>{s.name}</span>
              </span>
              <span style={{ fontSize: 14, color: '#4a5a57' }}>{s.role}</span>
              <span>
                <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: s.checkBg, color: s.checkColor, whiteSpace: 'nowrap' as const }}>{s.check}</span>
              </span>
              <span style={{ fontSize: 14, color: '#4a5a57' }}>Players, turns, messages</span>
            </div>
          ))}

          {/* Game leader placeholder row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '999px', background: '#e9eae8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#4a5a57' }}>?</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Game leader this Saturday</span>
            </span>
            <span style={{ fontSize: 14, color: '#4a5a57' }}>One-off</span>
            <span style={{ fontSize: 14, color: '#4a5a57' }}>Not needed</span>
            <button onClick={() => showToast('Asked again. First to say yes gets it.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'left' as const }}>Ask a family →</button>
          </div>

          <span style={{ fontSize: 14, color: '#4a5a57', marginTop: 'auto', paddingTop: 8 }}>Children checks are updated automatically via Working With Children Check online.</span>
        </section>

        {/* Who sees what */}
        <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>Who sees what</h2>
          {[
            { title: 'Coaches', items: ['Player names and turns', 'Attendance', 'Parent messages', 'Season notes'] },
            { title: 'Team manager', items: ['Player names and turns', 'Duty roster', 'Parent messages', 'Game day info'] },
            { title: 'Game leader', items: ["Saturday's turns only", 'No medical info'] },
          ].map((group, i) => (
            <div key={i} style={{ marginTop: i > 0 ? 10 : 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2f6252', marginBottom: 4 }}>{group.title}</div>
              {group.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 32 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
                  <span style={{ fontSize: 14, color: '#4a5a57' }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
          <span style={{ fontSize: 13, color: '#4a5a57', marginTop: 'auto' }}>{"No one outside the team sees players' names or medical info without a children's check."}</span>
        </section>
      </main>

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
    </div>
  )
}
