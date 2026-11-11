import { useState } from 'react'
import { EmptyCard } from '../clubadmin/ui'
import FixturesMiniRoos from './FixturesMiniRoos'

type DayEvent = { label: string; bg: string; color: string }
type Day = { n: number; today?: boolean; events: DayEvent[] }

const DAYS: (Day | null)[] = [
  null, // Mon Jun 1 offset: Jun 1 is Monday → no offset needed, but let me structure properly
  { n: 1, events: [] },
  { n: 2, today: true, events: [{ label: 'Training 5:00', bg: '#40826d', color: '#fff' }] },
  { n: 3, events: [] },
  { n: 4, events: [] },
  { n: 5, events: [] },
  { n: 6, events: [{ label: '8:30 · away\nNorthgate', bg: '#cbbeb5', color: '#10211f' }] },
  { n: 7, events: [] },
  { n: 8, events: [] },
  { n: 9, events: [{ label: 'Training 5:00', bg: '#40826d', color: '#fff' }] },
  { n: 10, events: [] },
  { n: 11, events: [] },
  { n: 12, events: [] },
  { n: 13, events: [{ label: '9:00 · home\nKestrel', bg: '#cbbeb5', color: '#10211f' }] },
  { n: 14, events: [] },
  { n: 15, events: [] },
  { n: 16, events: [{ label: 'Training 5:00', bg: '#40826d', color: '#fff' }] },
  { n: 17, events: [] },
  { n: 18, events: [] },
  { n: 19, events: [] },
  { n: 20, events: [{ label: '8:30 · away\nBanksia', bg: '#cbbeb5', color: '#10211f' }, { label: 'Photo day', bg: '#eef5f2', color: '#2f6252' }] },
  { n: 21, events: [] },
  { n: 22, events: [] },
  { n: 23, events: [{ label: 'Training 5:00', bg: '#40826d', color: '#fff' }] },
  { n: 24, events: [] },
  { n: 25, events: [] },
  { n: 26, events: [] },
  { n: 27, events: [{ label: 'School holidays', bg: '#e9eae8', color: '#10211f' }] },
  { n: 28, events: [] },
  { n: 29, events: [] },
  { n: 30, events: [{ label: 'School holidays', bg: '#e9eae8', color: '#10211f' }] },
]

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function CalendarMiniRoos({ empty }: { empty?: boolean }) {
  const [toast, setToast] = useState('')
  const [calView, setCalView] = useState<'calendar' | 'fixtures'>('calendar')
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3200) }

  // Pad to 35 cells (5 rows × 7)
  const cells: (Day | null)[] = [...DAYS]
  while (cells.length < 35) cells.push(null)

  if (calView === 'fixtures') return <FixturesMiniRoos empty={empty} />

  if (empty) return (
    <>
      <div style={{ flexShrink: 0, padding: '8px 28px 0', display: 'flex', gap: 0, borderBottom: '1px solid #e9eae8' }}>
        {(['calendar', 'fixtures'] as const).map(v => (
          <button key={v} onClick={() => setCalView(v)} style={{ height: 44, padding: '0 16px', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: calView === v ? 700 : 500, color: calView === v ? '#10211f' : '#6f7f7b', cursor: 'pointer', borderBottom: calView === v ? '2px solid #40826d' : '2px solid transparent' }}>{v === 'calendar' ? 'Calendar' : 'Fixtures'}</button>
        ))}
      </div>
      <EmptyCard icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" title="Add your training night" desc="Games arrive from the league on their own. Add your training night and the term fills in." cta="Add your training night" items={[{ title: 'Training', desc: 'Your night, every week of term' }, { title: 'Games', desc: 'From the league, with the ground' }, { title: 'Club days', desc: 'Photo day and presentation day' }]} />
    </>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
      <div style={{ flexShrink: 0, padding: '8px 28px 0', display: 'flex', gap: 0, borderBottom: '1px solid #e9eae8' }}>
        {(['calendar', 'fixtures'] as const).map(v => (
          <button key={v} onClick={() => setCalView(v)} style={{ height: 44, padding: '0 16px', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: calView === v ? 700 : 500, color: calView === v ? '#10211f' : '#6f7f7b', cursor: 'pointer', borderBottom: calView === v ? '2px solid #40826d' : '2px solid transparent' }}>{v === 'calendar' ? 'Calendar' : 'Fixtures'}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
      <div style={{ flexShrink: 0, padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>Calendar</h1>
          <span style={{ fontSize: 14, color: '#4a5a57' }}>June 2026 · Term 2 ends Friday 26 June</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => showToast('Fixtures link copied.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Share with families</button>
          <button onClick={() => showToast('Add to calendar')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>+ Add something</button>
        </div>
      </div>

      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 300px' }}>

        {/* Calendar grid */}
        <section style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0,1fr))', gap: 6 }}>
            {DAYS_OF_WEEK.map(d => (
              <span key={d} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4a5a57', paddingLeft: 4 }}>{d}</span>
            ))}
          </div>
          <div style={{ flexGrow: 1, display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0,1fr))', gridTemplateRows: 'repeat(5, minmax(0,1fr))', gap: 6 }}>
            {cells.map((day, i) => (
              day === null ? (
                <span key={i} style={{ borderRadius: 10, background: '#f0f1ef' }} />
              ) : (
                <span key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 10, border: day.today ? '2px solid #2f6252' : '1px solid #c5c8c4', background: '#fff', padding: 6, minWidth: 0, minHeight: 0, overflow: 'hidden' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: day.today ? '#2f6252' : '#10211f', fontVariantNumeric: 'tabular-nums' }}>{day.n}{day.today ? ' · today' : ''}</span>
                  {day.events.map((ev, j) => (
                    <span key={j} style={{ display: 'block', borderRadius: 8, padding: '4px 8px', fontSize: 13, lineHeight: '17px', fontWeight: 600, background: ev.bg, color: ev.color, whiteSpace: 'pre-wrap' }}>{ev.label}</span>
                  ))}
                </span>
              )
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section style={{ flexShrink: 0, background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <h2 style={{ margin: '0 0 0', fontSize: 17, fontWeight: 700 }}>Next up</h2>
            {[
              { circle: 'Tu', bg: '#40826d', title: 'Training tonight', sub: '5:00 pm · Wattle Creek Reserve' },
              { circle: 'Sa', bg: '#cbbeb5', title: 'Northgate City', sub: 'Sat 8:30 · away, Redgum Reserve' },
              { circle: '20', bg: '#eef5f2', title: 'Photo day', sub: 'Sat 20 Jun · wear the full kit' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8' }}>
                <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '999px', background: item.bg, color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{item.circle}</span>
                <span style={{ flexGrow: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 15, fontWeight: 700 }}>{item.title}</span>
                  <span style={{ display: 'block', fontSize: 13, color: '#4a5a57' }}>{item.sub}</span>
                </span>
              </div>
            ))}
          </section>
          <section style={{ flexGrow: 1, background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>School holidays</h2>
            <span style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px' }}>No training or games from Sat 27 June to Sun 12 July. Term 3 starts Tuesday 14 July.</span>
            <span style={{ fontSize: 14, color: '#4a5a57', lineHeight: '20px', marginTop: 'auto' }}>Families see this calendar in their app. Changes reach them straight away.</span>
          </section>
        </div>
      </main>

      {toast && (
        <div role="status" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '12px 16px', borderRadius: 14, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"/></svg>
          {toast}
        </div>
      )}
      </div>
    </div>
  )
}
