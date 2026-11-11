import { useState } from 'react'

type GKNav = 'home' | 'keepers' | 'training' | 'clips'
type HomeTab = 'overview' | 'inbox' | 'calendar'
type TrainingTab = 'session' | 'drills'

const KEEPERS = [
  { ini: 'GO', name: 'Grace Owusu',  team: 'U12 Sam',        note: 'Start 4 m higher off her line', sessions: 3 },
  { ini: 'HN', name: 'Holly Ng',     team: 'U13 Girls Meg',  note: 'Call early for crosses',         sessions: 4 },
  { ini: 'SH', name: 'Sami Haddad',  team: 'U14 Josh',       note: 'Quicker restarts',               sessions: 2 },
  { ini: 'AL', name: 'Ava Lim',      team: 'U13 Chris',      note: 'Set her feet before the shot',   sessions: 1 },
  { ini: 'JB', name: 'Jack Byrne',   team: 'U16 Ollie',      note: 'Play out under pressure',        sessions: 1 },
  { ini: 'ST', name: 'Sophie Tan',   team: 'U11 Girls Kate', note: 'Having fun in goal',             sessions: 2 },
]

const DRILLS = [
  { time: '6:00', dur: '10 min', title: 'Handling warm-up in pairs',  desc: 'Scoops, cups and high catches. Younger keepers use a size 4 ball.', why: 'every session starts with safe hands' },
  { time: '6:10', dur: '15 min', title: 'Start higher, then sweep',   desc: 'Keeper starts on the edge of the box, reads the through ball and clears it.', why: 'Jack was caught on his line on Saturday' },
  { time: '6:25', dur: '12 min', title: 'Quick restarts',             desc: 'Catch, look, roll to a full-back inside 6 seconds.', why: "Grace's quick roll started a goal. Show the clip first" },
  { time: '6:37', dur: '8 min',  title: 'Crosses and calling',        desc: 'Call "keeper\'s!" early and claim it at the top of the jump.', why: 'Holly does this well. She can show the others' },
]

const GROUPS = [
  { label: 'A', title: 'U12 and U13 · 5 keepers',  members: 'Grace, Holly, Ava, Max, Sophie' },
  { label: 'B', title: 'U14 to U16 · 4 keepers',   members: 'Sami, Jack and two more' },
  { label: 'C', title: 'Seniors · 2 keepers',       members: 'Ryan Doyle, Kate O\'Neill' },
]

const GK_NAV: Array<{ id: GKNav; label: string; icon: string }> = [
  { id: 'home',     label: 'Home',     icon: 'M4 11l8-7 8 7v9H4z' },
  { id: 'keepers',  label: 'Keepers',  icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5' },
  { id: 'training', label: 'Training', icon: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4' },
  { id: 'clips',    label: 'Clips',    icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM10 8l6 4-6 4z' },
]

const HOME_TABS: Array<{ id: HomeTab; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'inbox',    label: 'Inbox' },
  { id: 'calendar', label: 'Calendar' },
]

const TRAINING_TABS: Array<{ id: TrainingTab; label: string }> = [
  { id: 'session', label: "Tuesday's session" },
  { id: 'drills',  label: 'Keeper drills' },
]

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: '#c39797', color: '#10211f', borderRadius: '999px', padding: '1px 7px', fontSize: 12, fontWeight: 700, marginLeft: 6 }}>{children}</span>
  )
}

function HomeOverview({ onPlanSession, onKeeperDrills }: { onPlanSession: () => void; onKeeperDrills: () => void }) {
  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20, padding: '20px 28px 28px', overflowY: 'auto' }}>
      {/* Left: keepers list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1 style={{ margin: '0 0 2px', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Hi Nick</h1>
          <p style={{ margin: '0 0 14px', fontSize: 14, color: '#4a5a57' }}>Goalkeeper coach · 14 keepers across 9 teams · club session Tuesdays 6:00 pm</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <button onClick={onKeeperDrills} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Keeper drills</button>
            <button onClick={onPlanSession} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Plan Tuesday</button>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid #e9eae8', display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Your keepers</span>
            <span style={{ fontSize: 13, color: '#4a5a57' }}>One thing each · sessions with you in May</span>
          </div>
          {KEEPERS.map((k, i) => (
            <div key={k.ini} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 18px', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
              <span style={{ flex: 'none', width: 36, height: 36, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{k.ini}</span>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{k.name}</span>
                <span style={{ fontSize: 13, color: '#6f7f7b', marginLeft: 8 }}>{k.team}</span>
                <div style={{ fontSize: 13, color: '#4a5a57', fontStyle: 'italic', marginTop: 1 }}>{k.note}</div>
              </div>
              <span style={{ flex: 'none', fontSize: 13, fontWeight: 700, color: k.sessions >= 3 ? '#2f6252' : '#c39797', background: k.sessions >= 3 ? '#eef5f2' : '#fdf5f3', padding: '3px 10px', borderRadius: '999px' }}>{k.sessions} of 4</span>
            </div>
          ))}
          <div style={{ padding: '10px 18px 14px', borderTop: '1px solid #e9eae8', fontSize: 12, color: '#6f7f7b', lineHeight: '17px' }}>
            Under 12s take turns in goal, so they aren't listed as keepers. You see keepers' clips and goals, not other players'.
          </div>
        </div>
      </div>

      {/* Right: sidebars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Needs you */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>Needs you</span>
            <Badge>2 new</Badge>
          </div>
          <div style={{ display: 'flex', flex: 'none', borderRadius: 10, background: '#fdf5f3', border: '1px solid #e8d5d0', padding: '10px 12px', marginBottom: 8, gap: 10 }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>SK</span>
            <div>
              <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 2 }}>Sam K · U12 Sam · Yesterday</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>Can Grace do extra work on her starting spot?</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderTop: '1px solid #e9eae8', gap: 10 }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: '999px', background: '#eef5f2', color: '#2f6252', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>i</span>
            <div>
              <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 1 }}>Sessions · This month</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>Ava and Jack have had 1 session of 4</div>
            </div>
          </div>
        </div>

        {/* From Saturday */}
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>From Saturday</div>
          <div style={{ fontSize: 12, color: '#4a5a57', marginBottom: 8 }}>All keeper clips</div>
          {[
            { ini: 'GO', name: 'Grace', note: 'quick roll starts a goal', team: 'U12 Sam · 4 seconds, catch to pass' },
            { ini: 'JB', name: 'Jack',  note: 'caught on his line',       team: 'U16 Ollie · through ball, min 62' },
            { ini: 'HN', name: 'Holly', note: 'claims two crosses',       team: 'U13 Girls Meg · both called early' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderTop: '1px solid #e9eae8' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.ini}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{c.name} · {c.note}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>{c.team}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TrainingSession() {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', padding: '20px 28px 28px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 280px', gap: 20 }}>
      {/* Left: drills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h1 style={{ margin: '0 0 2px', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Keeper session</h1>
            <p style={{ margin: 0, fontSize: 14, color: '#4a5a57' }}>Tue 9 Jun · 6:00 to 6:45 pm · 11 of 14 coming</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => showToast('Opening the drill swap screen.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Swap a drill</button>
            <button onClick={() => showToast('Session plan sent to all 11 keepers.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send the plan</button>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden' }}>
          {DRILLS.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 20px', borderTop: i > 0 ? '1px solid #e9eae8' : 'none', cursor: 'pointer' }}>
              <div style={{ flex: 'none', width: 56, textAlign: 'right' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{d.time}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>{d.dur}</div>
              </div>
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 3 }}>{d.title}</div>
                <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '19px', marginBottom: 4 }}>{d.desc}</div>
                <div style={{ fontSize: 13, color: '#6f7f7b' }}><span style={{ fontWeight: 700 }}>Why:</span> {d.why}</div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', marginTop: 2 }}><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>
      </div>

      {/* Right: groups + notes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Groups by age</div>
          {GROUPS.map(g => (
            <div key={g.label} style={{ display: 'flex', gap: 12, padding: '8px 0', borderTop: '1px solid #e9eae8' }}>
              <span style={{ flex: 'none', width: 24, height: 24, borderRadius: '999px', background: '#2f6252', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{g.label}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{g.title}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>{g.members}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Keep in mind</div>
          {[
            'Ava and Jack have had 1 session of 4 this month. Both said yes for Tuesday.',
            'Tom Reyes has a sore wrist: no diving saves.',
            'Diving on hard ground is off for under 13s until the pitch softens.',
          ].map((note, i) => (
            <div key={i} style={{ fontSize: 13, color: '#4a5a57', lineHeight: '19px', paddingTop: i > 0 ? 8 : 0, borderTop: i > 0 ? '1px solid #e9eae8' : 'none', paddingBottom: i < 2 ? 8 : 0 }}>{note}</div>
          ))}
        </div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

function KeepersTab() {
  return (
    <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', padding: '20px 28px 28px' }}>
      <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>All keepers</h1>
      <p style={{ margin: '0 0 20px', fontSize: 14, color: '#4a5a57' }}>14 keepers across 9 teams</p>
      <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, overflow: 'hidden' }}>
        {KEEPERS.map((k, i) => (
          <div key={k.ini} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
            <span style={{ flex: 'none', width: 40, height: 40, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{k.ini}</span>
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{k.name}</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>{k.team}</div>
              <div style={{ fontSize: 13, color: '#4a5a57', fontStyle: 'italic', marginTop: 2 }}>{k.note}</div>
            </div>
            <span style={{ flex: 'none', fontSize: 13, fontWeight: 700, color: k.sessions >= 3 ? '#2f6252' : '#c39797', background: k.sessions >= 3 ? '#eef5f2' : '#fdf5f3', padding: '4px 12px', borderRadius: '999px' }}>{k.sessions} of 4 sessions</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClipsTab() {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  return (
    <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', padding: '20px 28px 28px' }}>
      <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Keeper clips</h1>
      <p style={{ margin: '0 0 20px', fontSize: 14, color: '#4a5a57' }}>From the most recent games</p>
      {[
        { ini: 'GO', name: 'Grace Owusu', event: 'Quick roll starts a goal', team: 'U12 Sam · v Ironbark United · Sat 7 Jun' },
        { ini: 'JB', name: 'Jack Byrne',  event: 'Caught on his line',       team: 'U16 Ollie · through ball min 62 · Sat 7 Jun' },
        { ini: 'HN', name: 'Holly Ng',    event: 'Claims two crosses',       team: 'U13 Girls Meg · both called early · Sat 7 Jun' },
      ].map((c, i) => (
        <div key={i} style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 16px', marginBottom: 10, display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ flex: 'none', width: 48, height: 48, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.ini}</span>
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{c.name} · {c.event}</div>
            <div style={{ fontSize: 13, color: '#6f7f7b' }}>{c.team}</div>
          </div>
          <button onClick={() => showToast(`Playing: ${c.name} — ${c.event}.`)} style={{ flex: 'none', height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Play</button>
        </div>
      ))}
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

export default function GoalkeeperCoachApp({ onBack, empty = false }: { onBack: () => void; empty?: boolean }) {
  const [nav, setNav]             = useState<GKNav>('home')
  const [homeTab, setHomeTab]     = useState<HomeTab>('overview')
  const [trainingTab, setTrainingTab] = useState<TrainingTab>('session')
  const [toast, setToast]         = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>

      {/* Top nav */}
      <header style={{ flex: 'none', background: '#1f4a3e', color: '#fff' }}>
        <div style={{ height: 60, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em', flexShrink: 0 }}>Clean Sheet</span>
          <nav style={{ display: 'flex', flexGrow: 1, height: 60 }}>
            {GK_NAV.map(tab => (
              <button key={tab.id} onClick={() => setNav(tab.id)} style={{
                height: 60, padding: '0 16px', border: 0, background: 'transparent',
                fontFamily: 'inherit', fontSize: 15, fontWeight: nav === tab.id ? 700 : 500,
                color: nav === tab.id ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer',
                borderBottom: nav === tab.id ? '3px solid #fff' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: 7, boxSizing: 'border-box',
              }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tab.icon}/></svg>
                {tab.label}
              </button>
            ))}
          </nav>
          <button onClick={() => showToast('Switching to Wattle Creek — all keepers view.')} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 16px', borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.15)', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#fff', flexShrink: 0 }}>
            All keepers · Wattle Creek
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div style={{ width: 44, height: 44, borderRadius: '999px', background: '#40826d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>NW</div>
        </div>

        {/* Sub-tabs row */}
        <div style={{ height: 44, padding: '0 28px', background: '#fff', borderBottom: '1px solid #e9eae8', display: 'flex', alignItems: 'flex-end' }}>
          <nav style={{ display: 'flex', flexGrow: 1, height: 44 }}>
            {nav === 'home' && HOME_TABS.map(t => (
              <button key={t.id} onClick={() => setHomeTab(t.id)} style={{
                height: 44, padding: '0 16px', border: 0, background: 'transparent',
                fontFamily: 'inherit', fontSize: 15, fontWeight: homeTab === t.id ? 600 : 400,
                color: homeTab === t.id ? '#10211f' : '#6f7f7b', cursor: 'pointer',
                borderBottom: homeTab === t.id ? '3px solid #40826d' : '3px solid transparent',
                boxSizing: 'border-box',
              }}>{t.label}</button>
            ))}
            {nav === 'training' && TRAINING_TABS.map(t => (
              <button key={t.id} onClick={() => setTrainingTab(t.id)} style={{
                height: 44, padding: '0 16px', border: 0, background: 'transparent',
                fontFamily: 'inherit', fontSize: 15, fontWeight: trainingTab === t.id ? 600 : 400,
                color: trainingTab === t.id ? '#10211f' : '#6f7f7b', cursor: 'pointer',
                borderBottom: trainingTab === t.id ? '3px solid #40826d' : '3px solid transparent',
                boxSizing: 'border-box',
              }}>{t.label}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', height: 44, gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#2f6252', background: '#eef5f2', borderRadius: '999px', padding: '4px 12px' }}>Goalkeeper coach</span>
            <button onClick={onBack} style={{ height: 44, padding: '0 12px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, color: '#6f7f7b', cursor: 'pointer' }}>← Head coach view</button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {nav === 'home'     && homeTab === 'overview' && (empty ? (
          <div style={{ flexGrow: 1, padding: '28px 32px', overflowY: 'auto' }}>
            <div style={{ maxWidth: 500 }}>
              <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: '#10211f' }}>Welcome, Nick</h2>
              <div style={{ fontSize: 14, color: '#4a5a57', marginBottom: 20 }}>Goalkeeper coach · no keepers named yet</div>
              <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 16, padding: 24, marginBottom: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Keepers appear as coaches name them</div>
                <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.6, marginBottom: 16 }}>Each coach from U12 up marks their keepers. Ask them now, or wait for the first games.</div>
                <button onClick={() => showToast('Message sent to 9 coaches — asking them to name their keepers.')} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Ask coaches to name keepers</button>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: '#6f7f7b', marginBottom: 10 }}>What you will see</div>
              {[
                { n: '1', label: 'Every keeper from U12 up',       desc: 'With one thing to work on' },
                { n: '2', label: 'Keeper clips from Saturday',     desc: "Only keepers' moments" },
                { n: '3', label: "Who's had a session with you",   desc: 'So nobody misses out' },
              ].map(item => (
                <div key={item.n} style={{ display: 'flex', gap: 14, padding: '12px 0', borderTop: '1px solid #e9eae8', alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2f6252', color: '#fff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.n}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: '#4a5a57' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : <HomeOverview onPlanSession={() => setNav('training')} onKeeperDrills={() => { setNav('training'); setTrainingTab('drills') }} />)}
        {nav === 'home'     && homeTab !== 'overview' && (
          <div style={{ padding: '20px 28px', color: '#4a5a57' }}>{homeTab === 'inbox' ? 'Inbox' : 'Calendar'} — not shown in this demo.</div>
        )}
        {nav === 'keepers'  && <KeepersTab />}
        {nav === 'training' && trainingTab === 'session' && (empty ? (
          <div style={{ flexGrow: 1, padding: '28px 32px', overflowY: 'auto' }}>
            <div style={{ maxWidth: 500 }}>
              <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: '#10211f' }}>Keeper session</h2>
              <div style={{ fontSize: 14, color: '#4a5a57', marginBottom: 20 }}>No session planned</div>
              <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Pick a night for keepers</div>
                <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.6, marginBottom: 16 }}>Set a weekly keeper session and Clean Sheet drafts it from that week's keeper clips.</div>
                <button onClick={() => showToast('Opening the keeper night scheduler.')} style={{ height: 44, padding: '0 16px', borderRadius: 999, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Set a keeper night</button>
              </div>
            </div>
          </div>
        ) : <TrainingSession />)}
        {nav === 'training' && trainingTab === 'drills'  && (
          <div style={{ padding: '20px 28px', color: '#4a5a57' }}>Keeper drills library — not shown in this demo.</div>
        )}
        {nav === 'clips'    && <ClipsTab />}
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}
