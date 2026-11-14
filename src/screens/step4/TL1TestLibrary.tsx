import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

const TESTS = [
  { name: '5-10-5 agility', due: 'Overdue 2 days', dueWarn: true, desc: 'Lateral agility — cones at 5m intervals', groups: 'U12, U14, Seniors' },
  { name: '30m sprint', due: 'Due 7 Jun', dueWarn: false, desc: 'Standing start, two gates', groups: 'All squads' },
  { name: 'Yo-Yo level 1', due: 'Due 14 Jun', dueWarn: false, desc: 'Aerobic capacity — running to beep', groups: 'U14+, Seniors' },
  { name: 'Standing long jump', due: 'Done 1 Jun', dueWarn: false, desc: 'Lower-body power', groups: 'U12, U14' },
  { name: 'Countermovement jump', due: 'Done 1 Jun', dueWarn: false, desc: 'Explosive leg power, force plate', groups: 'Seniors' },
  { name: 'Grip strength', due: 'No schedule', dueWarn: false, desc: 'Dynamometer, dominant hand', groups: 'Seniors' },
  { name: 'Illinois agility', due: 'No schedule', dueWarn: false, desc: 'Full-body agility circuit', groups: 'U14+' },
]

export default function TL1TestLibrary(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(m: string) { setToast(m); setTimeout(() => setToast(null), 3200) }

  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, position: 'relative' }}>
      <div style={{ background: GD, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 32, height: 52 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Clean Sheet</div>
        {['Squad', 'Fitness tests', 'Injury log', 'Load'].map(tab => (
          <div key={tab} style={{ fontSize: 13, fontWeight: tab === 'Fitness tests' ? 700 : 500, color: tab === 'Fitness tests' ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px' }}>{tab}</div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>Fitness coach</div>
      </div>

      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: INK, marginBottom: 2 }}>Test library</div>
            <div style={{ fontSize: 13, color: MUT }}>7 tests · 2 due soon</div>
          </div>
          <button onClick={() => t('Add test form would open.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Add a test</button>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 120px 1fr 160px 80px', fontSize: 11, fontWeight: 700, color: MUT, padding: '10px 20px', background: PALE }}>
            {['Test', 'Next due', 'Description', 'Groups', ''].map(h => <div key={h}>{h}</div>)}
          </div>
          {TESTS.map((test, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '200px 120px 1fr 160px 80px', padding: '12px 20px', borderBottom: `1px solid ${LN}`, alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{test.name}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: test.dueWarn ? '#c05' : (test.due.startsWith('Done') ? G : MUT) }}>{test.due}</div>
              <div style={{ fontSize: 12, color: MUT }}>{test.desc}</div>
              <div style={{ fontSize: 12, color: MUT }}>{test.groups}</div>
              <button onClick={() => t(`Running ${test.name}.`)} style={{ height: 44, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', color: G, fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Run</button>
            </div>
          ))}
        </div>
      </div>

      {toast && <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: INK, color: '#fff', padding: '10px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 1000, whiteSpace: 'nowrap' as const }}>{toast}</div>}
    </div>
  )
}
