import { useState } from 'react'

const G = '#2f6252', GD = '#1f4a3e', INK = '#10211f', MUT = '#4a5a57', LN = '#e8edeb', PALE = '#eef5f2'

// June 2026 starts on Monday (day 1)
const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface DayData { n: number | null; event?: string; eventBg?: string; eventColor?: string; event2?: string; event2Bg?: string; event2Color?: string; today?: boolean }

const DAYS: DayData[] = [
  { n: 1 },
  { n: 2, today: true, event: 'Training 5:00', eventBg: '#40826d', eventColor: '#fff' },
  { n: 3 },
  { n: 4 },
  { n: 5 },
  { n: 6, event: '8:30 · away\nNorthgate', eventBg: '#cbbeb5', eventColor: INK },
  { n: 7 },
  { n: 8 },
  { n: 9, event: 'Training 5:00', eventBg: '#40826d', eventColor: '#fff' },
  { n: 10 },
  { n: 11 },
  { n: 12 },
  { n: 13, event: '9:00 · home\nKestrel', eventBg: '#cbbeb5', eventColor: INK },
  { n: 14 },
  { n: 15 },
  { n: 16, event: 'Training 5:00', eventBg: '#40826d', eventColor: '#fff' },
  { n: 17 },
  { n: 18 },
  { n: 19 },
  { n: 20, event: '8:30 · away\nBanksia', eventBg: '#cbbeb5', eventColor: INK, event2: 'Photo day', event2Bg: PALE, event2Color: G },
  { n: 21 },
  { n: 22 },
  { n: 23, event: 'Training 5:00', eventBg: '#40826d', eventColor: '#fff' },
  { n: 24 },
  { n: 25 },
  { n: 26 },
  { n: 27, event: 'School holidays', eventBg: '#e9eae8', eventColor: INK },
  { n: 28 },
  { n: 29 },
  { n: 30, event: 'School holidays', eventBg: '#e9eae8', eventColor: INK },
  { n: null },
  { n: null },
  { n: null },
  { n: null },
  { n: null },
]

export default function HM8CalendarMiniRoos(_: { onBack?: () => void }) {
  const [toast, setToast] = useState<string|null>(null)
  function st(m: string) { setToast(m); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ width: 1180, background: '#f7f8f7', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', minHeight: 820, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: GD, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20, height: 64 }}>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Clean Sheet</div>
        {['Home', 'Squad', 'Training', 'Game day'].map(t => (
          <div key={t} style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderRadius: 12, fontSize: 16, fontWeight: 600, background: t === 'Home' ? '#40826d' : 'transparent', color: t === 'Home' ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', height: 44, padding: '0 14px', borderRadius: 999, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center' }}>U9 Tom · Wattle Creek</div>
        <div style={{ width: 44, height: 44, borderRadius: 999, background: '#c39797', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: INK }}>TA</div>
      </div>
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        {['Overview', 'Inbox', 'Calendar', 'Team staff'].map(t => (
          <div key={t} style={{ height: 44, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 600, color: t === 'Calendar' ? INK : MUT, borderBottom: t === 'Calendar' ? `3px solid #40826d` : '3px solid transparent', boxSizing: 'border-box', cursor: 'pointer' }}>{t}</div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', height: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, background: PALE, color: G, fontSize: 13, fontWeight: 700 }}>Coach · MiniRoos</div>
        </div>
      </div>

      <div style={{ padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Calendar</h1>
          <span style={{ fontSize: 14, color: MUT }}>June 2026 · Term 2 ends Friday 26 June</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => st('Sharing calendar with families.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Share with families</button>
          <button onClick={() => st('Opening new event.')} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>+ Add something</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 28px 18px', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0, 1fr) 300px' }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 6 }}>
            {DAYS_OF_WEEK.map(d => (
              <div key={d} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: MUT, paddingLeft: 4 }}>{d}</div>
            ))}
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gridTemplateRows: 'repeat(5, minmax(0, 1fr))', gap: 6 }}>
            {DAYS.map((d, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, borderRadius: 10, border: d.n ? (d.today ? `2px solid ${G}` : `1px solid #c5c8c4`) : 'none', background: d.n ? '#fff' : '#f0f1ef', padding: d.n ? 6 : 0, minWidth: 0, minHeight: 0, overflow: 'hidden' }}>
                {d.n && <span style={{ fontSize: 14, fontWeight: 700, color: d.today ? G : INK }}>{d.n}{d.today ? ' · today' : ''}</span>}
                {d.event && <span style={{ display: 'block', borderRadius: 8, padding: '4px 8px', fontSize: 12, lineHeight: '16px', fontWeight: 600, background: d.eventBg, color: d.eventColor, whiteSpace: 'pre-line' as const }}>{d.event}</span>}
                {d.event2 && <span style={{ display: 'block', borderRadius: 8, padding: '4px 8px', fontSize: 12, lineHeight: '16px', fontWeight: 600, background: d.event2Bg, color: d.event2Color }}>{d.event2}</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px 6px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Next up</div>
            {[
              { abbr: 'Tu', abbBg: '#40826d', label: 'Training tonight', note: '5:00 pm · Wattle Creek Reserve' },
              { abbr: 'Sa', abbBg: '#cbbeb5', label: 'Northgate City',    note: 'Sat 8:30 · away, Redgum Reserve' },
              { abbr: '20', abbBg: PALE,      label: 'Photo day',          note: 'Sat 20 Jun · wear the full kit' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: `1px solid ${LN}` }}>
                <div style={{ width: 32, height: 32, borderRadius: 999, background: item.abbBg, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{item.abbr}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: MUT }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>School holidays</div>
            <div style={{ fontSize: 14, color: MUT }}>No training or games from Sat 27 June to Sun 12 July. Term 3 starts Tuesday 14 July.</div>
            <div style={{ marginTop: 'auto', fontSize: 14, color: MUT }}>Families see this calendar in their app. Changes reach them straight away.</div>
          </div>
        </div>
      </div>
    </div>
    {toast && <div role="status" style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', zIndex:100, padding:'12px 20px', borderRadius:12, background:'#1f4a3e', color:'#fff', fontSize:15, fontWeight:600, boxShadow:'0 8px 24px rgba(16,33,31,0.25)', whiteSpace:'nowrap' }}>{toast}</div>}
  )
}
