import { useState } from 'react'
import TeamsTab        from './clubadmin/TeamsTab'
import CoachesTab      from './clubadmin/CoachesTab'
import PlayersTab      from './clubadmin/PlayersTab'
import SafeguardingTab from './clubadmin/SafeguardingTab'
import ReportsTab      from './clubadmin/ReportsTab'

type CoTab = 'thisweek' | 'registrations' | 'fixtures' | 'referees' | 'kit' | 'fees' | 'calendar'

const TABS: Array<{ id: CoTab; label: string }> = [
  { id: 'thisweek',      label: 'This week' },
  { id: 'registrations', label: 'Registrations' },
  { id: 'fixtures',      label: 'Fixtures' },
  { id: 'referees',      label: 'Referees' },
  { id: 'kit',           label: 'Kit' },
  { id: 'fees',          label: 'Fees and volunteers' },
  { id: 'calendar',      label: 'Calendar' },
]

const CLUB_NAV = ['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports']

const STAT_CARDS = [
  { label: 'REGISTERED AND PAID',         value: '187 of 192', sub: '5 to finish in PlayFootball',    color: '#2f6252' },
  { label: 'REFEREES AND GAME LEADERS',   value: '5 of 7',     sub: '2 home games still need one',    color: '#c39797' },
  { label: 'CAMERA KITS BOOKED',          value: '3 of 4',     sub: 'Kit 2 back Fri 12 Jun',          color: '#2f6252' },
  { label: 'VOLUNTEER JOBS FILLED',       value: '7 of 10',    sub: 'Canteen, set-up, nets, BBQ',     color: '#c39797' },
]

const TODO_ITEMS = [
  { title: 'U8 Hannah has no game leader for Saturday', desc: '8:30 at home. Four young game leaders asked, none yet.', action: 'Ask again',    toast: 'Asking again. Four game leaders will get a notification.',   urgent: true },
  { title: 'Goal nets and flags: 0 of 2 volunteers',   desc: 'Pack-down, Saturday 2:30 pm.',                           action: 'Ask families', toast: 'Post shared with the volunteer board.',                       urgent: true },
  { title: '2 games moved in Dribl',                   desc: 'U13 Chris and U16 Ollie. Teams and parents were told automatically.', action: 'Check', toast: 'Fixtures synced.',                             urgent: false },
  { title: "5 new players haven't finished in PlayFootball", desc: "They can train, but can't go on a team sheet.",    action: 'Remind',       toast: 'Reminder sent to 5 families.',                              urgent: false },
  { title: "Aiden Yu's dispensation is still with FV", desc: "Sent 28 May. He can't play for U11 Luke until it's back.", action: 'View',      toast: 'Dispensation open.',                                         urgent: false },
]

function ThisWeekTab() {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', padding: '20px 28px 28px' }}>
      {/* Greeting row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: '0 0 2px', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Hi Bianca</h1>
          <p style={{ margin: 0, fontSize: 14, color: '#4a5a57' }}>Club coordinator · week 9 of 18 · 14 games on Saturday</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => showToast('Message started to 14 team managers.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Message all managers</button>
          <button onClick={() => showToast('Run sheet sent to your email and the clubrooms printer.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Saturday run sheet</button>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12, marginBottom: 20 }}>
        {STAT_CARDS.map((s, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#6f7f7b', marginBottom: 6, textTransform: 'uppercase' }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: s.color, marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#4a5a57' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Main 2-col area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
        {/* To do list */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>To do before Saturday</span>
            <span style={{ fontSize: 13, color: '#4a5a57' }}>5 things · most urgent first</span>
          </div>
          <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden' }}>
            {TODO_ITEMS.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 18px', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
                <div style={{ flex: 'none', width: 6, height: 6, borderRadius: '999px', background: item.urgent ? '#c39797' : '#c5c8c4', marginTop: 6 }} />
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.desc}</div>
                </div>
                <button onClick={() => showToast(item.toast)} style={{ flex: 'none', height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>{item.action}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Saturday at a glance sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Saturday at a glance</span>
              <button onClick={() => showToast('Opening the club calendar.')} style={{ fontSize: 13, color: '#2f6252', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Calendar</button>
            </div>
            {[
              { label: 'Home games',   value: '7 · first 8:30' },
              { label: 'Away games',   value: '7' },
              { label: 'Pitches in use', value: '5' },
              { label: 'Canteen',      value: '8:00 to 1:00' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #e9eae8' }}>
                <span style={{ fontSize: 14, color: '#4a5a57' }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>What you look after</div>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '19px' }}>
              Registrations, fixtures, referees, kit and volunteers. You don't see players' wellness, growth or clips.
            </div>
          </div>
        </div>
      </div>
      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}

function PlaceholderTab({ label }: { label: string }) {
  return (
    <div style={{ flexGrow: 1, padding: '20px 28px', color: '#4a5a57' }}>
      {label} — not shown in this demo.
    </div>
  )
}

export default function CoordinatorPortal({ onBack: _onBack, empty = false }: { onBack: () => void; empty?: boolean }) {
  const [tab, setTab] = useState<CoTab>('thisweek')
  const [activeNav, setActiveNav] = useState('Club')
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  if (empty) {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
        <header style={{ flex: 'none', background: '#1f4a3e', color: '#fff' }}>
          <div style={{ height: 60, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em' }}>Clean Sheet</span>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)', paddingLeft: 4 }}>CLUB</div>
            {['Club', 'Teams', 'Coaches', 'Players', 'Safeguarding', 'Reports'].map(n => (
              <button key={n} onClick={() => setActiveNav(n)} style={{ height: 60, padding: '0 14px', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 15, fontWeight: activeNav === n ? 700 : 500, color: activeNav === n ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', borderBottom: activeNav === n ? '3px solid #fff' : '3px solid transparent', boxSizing: 'border-box' as const }}>{n}</button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#2f6252', background: '#eef5f2', borderRadius: '999px', padding: '4px 12px' }}>Club coordinator</span>
              <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#40826d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>BR</div>
            </div>
          </div>
        </header>
        <div style={{ flexGrow: 1, padding: '28px 32px' }}>
          <div style={{ maxWidth: 560 }}>
            <h1 style={{ margin: '0 0 2px', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>Welcome, Bianca</h1>
            <div style={{ fontSize: 14, color: '#4a5a57', marginBottom: 20 }}>Club coordinator · nothing set up yet</div>
            <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Your weekly jobs land here</div>
              <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.6, marginBottom: 16 }}>Once teams are imported and fixtures sync from Dribl, this page lists what needs doing before each Saturday.</div>
              <button style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Import from PlayFootball</button>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: '#6f7f7b', marginBottom: 10 }}>What you will see</div>
            {[
              { n: '1', label: 'Registrations',              desc: 'Who still has to finish or pay' },
              { n: '2', label: 'Referees and game leaders',  desc: 'Home games that still need one' },
              { n: '3', label: 'Kit and volunteers',         desc: 'Cameras, nets, canteen' },
            ].map(item => (
              <div key={item.n} style={{ display: 'flex', gap: 14, padding: '12px 0', borderTop: '1px solid #e9eae8', alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2f6252', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: '#4a5a57' }}>{item.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '12px 14px', background: '#eef5f2', borderRadius: 10, fontSize: 13, color: '#2f6252' }}>{"You don't see players' wellness, growth or clips."}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>

      {/* Top nav */}
      <header style={{ flex: 'none', background: '#1f4a3e', color: '#fff' }}>
        <div style={{ height: 60, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em', flexShrink: 0 }}>Clean Sheet</span>
          <div style={{ flex: 'none', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', paddingLeft: 4 }}>CLUB</div>
          <nav style={{ display: 'flex', flexGrow: 1, height: 60 }}>
            {CLUB_NAV.map(n => (
              <button key={n} onClick={() => setActiveNav(n)} style={{
                height: 60, padding: '0 14px', border: 0, background: 'transparent',
                fontFamily: 'inherit', fontSize: 15, fontWeight: activeNav === n ? 700 : 500,
                color: activeNav === n ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer',
                borderBottom: activeNav === n ? '3px solid #fff' : '3px solid transparent',
                boxSizing: 'border-box',
              }}>{n}</button>
            ))}
          </nav>
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px', borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.15)', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#fff', flexShrink: 0 }}>
            Whole club
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div style={{ width: 44, height: 44, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>BR</div>
        </div>

        {/* Sub-tab row */}
        <div style={{ height: 44, padding: '0 28px', background: '#fff', borderBottom: '1px solid #e9eae8', display: 'flex', alignItems: 'flex-end' }}>
          <nav style={{ display: 'flex', flexGrow: 1, height: 44 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                height: 44, padding: '0 14px', border: 0, background: 'transparent',
                fontFamily: 'inherit', fontSize: 14, fontWeight: tab === t.id ? 600 : 400,
                color: tab === t.id ? '#10211f' : '#6f7f7b', cursor: 'pointer',
                borderBottom: tab === t.id ? '3px solid #40826d' : '3px solid transparent',
                boxSizing: 'border-box', whiteSpace: 'nowrap',
              }}>{t.label}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', height: 44, gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#2f6252', background: '#eef5f2', borderRadius: '999px', padding: '4px 12px' }}>Club coordinator</span>
            <button onClick={() => showToast('Switching to the coach view on a connected device.')} style={{ height: 44, padding: '0 12px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Coach view</button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeNav === 'Teams'         ? <TeamsTab empty={false} />
        : activeNav === 'Coaches'      ? <CoachesTab empty={false} />
        : activeNav === 'Players'      ? <PlayersTab empty={false} />
        : activeNav === 'Safeguarding' ? <SafeguardingTab empty={false} />
        : activeNav === 'Reports'      ? <ReportsTab empty={false} />
        : tab === 'thisweek'           ? <ThisWeekTab />
        : <PlaceholderTab label={TABS.find(t => t.id === tab)?.label ?? ''} />}
      </div>
      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}
