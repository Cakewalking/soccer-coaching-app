import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const KIT = [
  { name: 'Kit 1', team: 'U12 Sam', person: 'Rob Owusu', battery: '96%', status: 'Booked Sat' },
  { name: 'Kit 2', team: '—', person: 'At repair', battery: '—', status: 'At repair · Back Fri 12 Jun' },
  { name: 'Kit 3', team: 'U12 Girls Ana', person: 'Tina Wu', battery: '88%', status: 'Booked Sat' },
  { name: 'Kit 4', team: 'U13 Girls Meg', person: 'Meg Doyle', battery: '91%', status: 'Booked Sat' },
]

export default function DK1Kit(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Club' ? 700 : 500, color: tab === 'Club' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Director of football</div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, padding: '0 32px', display: 'flex', gap: 24, height: 44, alignItems: 'center' }}>
        {['Overview', 'Inbox', 'Calendar', 'Season plan', 'Playing style', 'Heading policy', 'Kit and cameras'].map(t => (
          <div key={t} style={{ fontSize: 13, fontWeight: t === 'Kit and cameras' ? 700 : 500, color: t === 'Kit and cameras' ? G : MUT, borderBottom: t === 'Kit and cameras' ? `2px solid ${G}` : '2px solid transparent', height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>{t}</div>
        ))}
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 4 }}>Kit and cameras</div>
            <div style={{ fontSize: 13, color: MUT }}>Shared between all 14 teams · book through each team manager</div>
          </div>
          <button onClick={() => t('Add kit form would open.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Add kit</button>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Match cameras', val: '3 of 4 working', sub: 'Kit 2 at repair', warn: true },
            { label: 'Boot sensor sets', val: '96 pairs', sub: 'All teams U12 and up' },
            { label: 'GPS vests', val: '64 of 70', sub: '6 to repair · U12 and up', warn: true },
            { label: 'Teams not filmed', val: '2', sub: 'U13 Chris and U15 Bec, until Kit 2 is back', warn: true },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.warn ? '#c05' : GD }}>{s.val}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Camera table */}
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 12 }}>Match cameras this Saturday</div>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 80px 1fr', gap: 10, fontSize: 12, fontWeight: 700, color: MUT, paddingBottom: 8, borderBottom: `1px solid ${LN}` }}>
            {['Kit', 'Team', 'Picked up by', 'Battery', 'Status'].map(h => <div key={h}>{h}</div>)}
          </div>
          {KIT.map((k, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 80px 1fr', gap: 10, padding: '10px 0', borderBottom: `1px solid ${LN}`, fontSize: 13 }}>
              <div style={{ fontWeight: 700, color: INK }}>{k.name}</div>
              <div style={{ color: INK }}>{k.team}</div>
              <div style={{ color: MUT }}>{k.person}</div>
              <div style={{ color: k.battery === '—' ? MUT : INK }}>{k.battery}</div>
              <div style={{ color: k.status.includes('repair') ? '#c05' : G, fontWeight: 600 }}>{k.status}</div>
            </div>
          ))}
        </div>

        <div style={{ background: PALE, borderRadius: 12, padding: '12px 16px' }}>
          <div style={{ fontSize: 13, color: GD }}>A fifth kit, about $1,400, would let every team from U12 record every game. It's in this month's board report.</div>
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
