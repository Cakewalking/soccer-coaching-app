import OwnerHeader from '../academy/OwnerHeader'
import { openScreen } from '../openThing'
import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', PALE = '#eef5f2'

function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return <span style={{ background: bg, color, fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 5 }}>{label}</span>
}

export default function AC3Trials({ onNav }: { onBack?: () => void; onNav?: (id: string) => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#faf5ec', boxSizing: 'border-box' as const, fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative', display: 'flex', flexDirection: 'column' as const }}>

      {/* The owner's menu: six main items and the screens under each (academy handover, 24 Nov) */}
      <OwnerHeader current="AC3-Trials" onGo={onNav ?? openScreen} />

      {/* PAGE HEADER */}
      <div style={{ padding: '14px 28px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.1 }}>Trials</h1>
          <div style={{ color: MUT, fontSize: 14, marginTop: 2 }}>4 booked this week · Advanced has 2 places open</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => t('Trial link copied.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Share trial link</button>
          <button onClick={() => t('Pick a date and program...')} style={{ height: 44, padding: '0 18px', borderRadius: 10, background: G, color: '#fff', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer' }}>Book a trial</button>
        </div>
      </div>

      {/* MAIN: 4-col kanban */}
      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>

        {/* Col 1: Booked */}
        <div style={{ background: '#f0f0ef', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: MUT, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>Booked</div>
          {[
            { name: 'Arjun Mehta', sub: 'Age 10 · Mon 4:30 pm', badge: 'Development' },
            { name: 'Isla Chong', sub: 'Age 12 · Wed 5:30 pm', badge: 'Advanced' },
          ].map(c => (
            <div key={c.name} style={{ background: '#fff', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>{c.name}</div>
              <div style={{ fontSize: 12, color: MUT }}>{c.sub}</div>
              <Badge label={c.badge} color={G} bg={PALE} />
            </div>
          ))}
        </div>

        {/* Col 2: Came to assess */}
        <div style={{ background: '#f0f0ef', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: MUT, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>Came to assess</div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>Zara Patel</div>
            <div style={{ fontSize: 12, color: MUT }}>Age 11 · Tuesday</div>
            <div style={{ fontSize: 12, color: MUT }}>Reece Whitlam assessing</div>
          </div>
          <div style={{ fontSize: 12, color: MUT, fontStyle: 'italic' as const }}>Reece sees her today</div>
        </div>

        {/* Col 3: Offer to send */}
        <div style={{ background: '#f0ece7', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#7a5c2e', textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>Offer to send</div>
          {[
            { name: 'Hamish Lew', sub: 'Advanced · age 12', note: 'Reece: strong first touch', btnLabel: 'Send offer', toastMsg: "Offer sent to Hamish's family.", primary: true },
            { name: 'Priya Nair', sub: 'Development · age 10', note: 'Reece: good attitude', btnLabel: 'Send offer', toastMsg: "Offer sent to Priya's family.", primary: true },
            { name: 'Ollie Dunn', sub: 'Foundation · age 8', note: 'Reece: needs to come again', btnLabel: 'Invite again', toastMsg: 'Second trial booked for Ollie.', primary: false },
          ].map(c => (
            <div key={c.name} style={{ background: '#fff', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column' as const, gap: 6 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>{c.name}</div>
              <div style={{ fontSize: 12, color: MUT }}>{c.sub}</div>
              <div style={{ fontSize: 12, color: MUT }}>{c.note}</div>
              <button onClick={() => t(c.toastMsg)} style={{ height: 44, padding: '0 14px', borderRadius: 8, background: c.primary ? G : '#fff', color: c.primary ? '#fff' : INK, border: c.primary ? 'none' : '1px solid #c5c8c4', fontSize: 13, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' as const }}>{c.btnLabel}</button>
            </div>
          ))}
        </div>

        {/* Col 4: Joined */}
        <div style={{ background: PALE, borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: G, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>Joined</div>
          {[
            { name: 'Kai Okonkwo', sub: 'Advanced · joined Mon' },
            { name: 'Ana Costa', sub: 'Development · joined Tue' },
            { name: 'Jonah Marsh', sub: 'Advanced · joined last week' },
            { name: 'Lola Ferris', sub: 'Development · joined last week' },
          ].map(c => (
            <div key={c.name} style={{ background: '#fff', borderRadius: 12, padding: 12, borderLeft: `3px solid ${G}`, display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>{c.name}</div>
              <div style={{ fontSize: 12, color: MUT }}>{c.sub}</div>
            </div>
          ))}
        </div>

      </div>

      {toast && <div style={{ position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: GD, color: '#fff', padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, zIndex: 60, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
