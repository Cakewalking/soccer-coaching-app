import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

function Icon({ d, size = 20, stroke = 'currentColor', sw = 2, fill = 'none' }: { d: string; size?: number; stroke?: string; sw?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d}/>
    </svg>
  )
}

function Toast({ msg }: { msg: string }) {
  return <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: GD, color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{msg}</div>
}

const ICONS = {
  today:    'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  training: 'M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4',
  players:  'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 11a3 3 0 100-6M21 20c0-3-2-5-4-5.5',
  gameday:  'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z',
  record:   'M12 21a9 9 0 100-18 9 9 0 000 18zM12 15a3 3 0 100-6 3 3 0 000 6z',
  chevdown: 'M6 9l6 6 6-6',
  chevright:'M9 18l6-6-6-6',
  sparkle:  'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
  check:    'M5 13l4 4L19 7',
  plus:     'M12 5v14M5 12h14',
}

const ACT_NAV = [
  { id: 'today',    label: 'Today',    icon: ICONS.today },
  { id: 'training', label: 'Training', icon: ICONS.training },
  { id: 'players',  label: 'Players',  icon: ICONS.players },
  { id: 'gameday',  label: 'Game day', icon: ICONS.gameday },
  { id: 'record',   label: 'Record',   icon: ICONS.record },
]

const ACT_SUBS = ['This week', 'Suggested', 'Session plan', 'Who\'s coming', 'Drill library', 'Growth and load']

function AcademyFrame({ activeSub, pageTitle, pageSub, pageRight, children, toast, onNav }: {
  activeSub: string; pageTitle: string; pageSub: string;
  pageRight?: React.ReactNode; children: React.ReactNode; toast: string | null; onNav: (id: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'var(--font-sans, DM Sans, sans-serif)', background: '#f7f8f7' }}>
      {/* Top nav */}
      <div style={{ background: GD, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 2, height: 56, flexShrink: 0 }}>
        <span style={{ color: '#e9eae8', fontWeight: 800, fontSize: 16, marginRight: 10 }}>Clean Sheet</span>
        {ACT_NAV.map(tab => (
          <button key={tab.id} onClick={() => onNav(tab.id)}
            style={{ height: 48, padding: '0 14px', borderRadius: 12, background: tab.id === 'training' ? G2 : 'transparent', color: '#e9eae8', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            <Icon d={tab.icon} size={18}/> {tab.label}
          </button>
        ))}
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => onNav('groups')} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#e9eae8', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'inherit' }}>
            Reece's groups <Icon d={ICONS.chevdown} size={14}/>
          </button>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: ROSE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>RW</div>
        </div>
      </div>
      {/* Sub nav */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 4, flexShrink: 0 }}>
        {ACT_SUBS.map(tab => (
          <button key={tab} onClick={() => onNav('sub:' + tab)}
            style={{ height: 44, padding: '0 4px', marginRight: 16, fontSize: 15, fontWeight: 600, color: tab === activeSub ? G : MUT, background: 'transparent', border: 'none', borderBottom: `3px solid ${tab === activeSub ? G : 'transparent'}`, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', boxSizing: 'border-box' }}>
            {tab}
          </button>
        ))}
      </div>
      {/* Page heading */}
      <div style={{ padding: '20px 28px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>{pageTitle}</h1>
          {pageSub && <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{pageSub}</div>}
        </div>
        {pageRight && <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>{pageRight}</div>}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 28px 32px' }}>
        {children}
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  )
}

function BtnMore({ label, onClick }: { label: string; onClick?: () => void }) {
  return <button onClick={onClick} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid #c5c8c4`, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>{label}</button>
}
function BtnPrimary({ label, onClick }: { label: string; onClick?: () => void }) {
  return <button onClick={onClick} style={{ height: 44, padding: '0 18px', borderRadius: 10, border: `1px solid ${G}`, background: G, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>{label}</button>
}

// ACT1 — Academy Training Week
export function AcademyTrainingWeek({ onBack: _onBack, onNav }: { onBack?: () => void; onNav?: (s: string) => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const sessions = [
    { day: 'MON', label: 'Foundation',  status: 'done',           note: '2 June · 6:00pm' },
    { day: 'TUE', label: 'Advanced',    status: 'planned',        note: '3 June · 4:30pm', link: 'ACT3' },
    { day: 'WED', label: 'Development', status: 'needs-a-plan',   note: '4 June · 5:00pm', link: 'ACT2' },
    { day: 'THU', label: 'Advanced',    status: 'needs-a-plan',   note: '5 June · 4:30pm' },
    { day: 'SAT', label: 'Game team · U13 Timber', status: 'planned', note: '7 June · 8:00am · Match' },
  ]

  const statusStyle = (s: string) => ({
    'done':         { label: 'Done',           bg: PALE,   color: G },
    'planned':      { label: 'Planned',        bg: PALE,   color: G },
    'needs-a-plan': { label: 'Needs a plan',   bg: '#faf3f0', color: '#b04' },
  }[s] || { label: s, bg: LN, color: MUT })

  return (
    <AcademyFrame
      activeSub="This week"
      pageTitle="This week"
      pageSub="Tall Timber Academy · term 3, week 4 of 10 · Reece's groups"
      pageRight={<><BtnMore label="Copy last week" onClick={() => t('Copying last week\'s sessions.')}/><BtnPrimary label="Plan a session" onClick={() => onNav ? onNav('ACT2-AcademySuggested') : t('Opening session planner.')}/></>}
      toast={toast}
      onNav={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Sessions list */}
        <div style={{ flex: 1 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
            {sessions.map((s, i) => {
              const st = statusStyle(s.status)
              return (
                <div key={s.day} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < sessions.length - 1 ? `1px solid ${LN}` : 'none' }}>
                  <div style={{ width: 40, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: MUT, flexShrink: 0 }}>{s.day}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{s.note}</div>
                  </div>
                  <span style={{ padding: '4px 12px', borderRadius: 100, background: st.bg, color: st.color, fontSize: 12, fontWeight: 700 }}>{st.label}</span>
                  <button onClick={() => s.link && onNav ? onNav(s.link === 'ACT2' ? 'ACT2-AcademySuggested' : 'ACT3-AcademySessionPlan') : t(`${s.label} session opens.`)}
                    style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT }}>
                    <Icon d={ICONS.chevright} size={16}/>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        {/* Right aside */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>This fortnight's theme</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>Receiving on the half-turn</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Set by Dani. Suggested drills in every session plan this fortnight.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>From Saturday's game</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 4 }}>U13s received facing own goal 31 times</div>
            <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Reinforces the fortnight's theme. Wednesday's suggested session picks this up.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Load this week</div>
            {[
              { label: 'Foundation', pct: 68, note: 'On target' },
              { label: 'Advanced',   pct: 72, note: 'Rising (planned)' },
              { label: 'Development',pct: 0,  note: 'Session not planned' },
            ].map(r => (
              <div key={r.label} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                  <span style={{ fontWeight: 600, color: INK }}>{r.label}</span>
                  <span style={{ color: MUT }}>{r.note}</span>
                </div>
                <div style={{ height: 6, background: LN, borderRadius: 4 }}>
                  <div style={{ height: 6, background: G, borderRadius: 4, width: `${r.pct}%` }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AcademyFrame>
  )
}

// ACT2 — Academy Suggested
export function AcademyTrainingSuggested({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const drills = [
    { title: 'Turn and go',                why: '9 of 14 are under target on the turning test', duration: '12 min', link: true },
    { title: 'Rondo with bounce player',   why: 'Fortnight\'s theme: receiving on the half-turn', duration: '15 min', link: false },
    { title: '3v3 to end zones',           why: 'You noted "too much standing" last week', duration: '20 min', link: false },
  ]

  const sources = [
    { n: '1', t: 'Turning test results',           n2: 'Development group, last Tuesday' },
    { n: '2', t: 'The fortnight\'s theme',          n2: 'Set by Dani — receiving on the half-turn' },
    { n: '3', t: 'Your note from Wednesday',        n2: '"Too much standing in 3v3 last session"' },
    { n: '4', t: 'Growth and load data',            n2: 'Who can take more load this week' },
  ]

  return (
    <AcademyFrame
      activeSub="Suggested"
      pageTitle="Suggested for Development"
      pageSub="Wed 4 June · 14 players · 60 min"
      pageRight={<>
        <button onClick={() => t('Opening Ask Clean Sheet panel.')} style={{ height: 44, padding: '0 16px', borderRadius: 10, border: `1px solid ${LN}`, background: '#fff', color: INK, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Icon d={ICONS.sparkle} size={16} stroke={G}/> Ask in your own words
        </button>
        <BtnPrimary label="Build the whole session" onClick={() => t('Building session — ACT3 Session plan opens.')}/>
      </>}
      toast={toast}
      onNav={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {drills.map(d => (
            <div key={d.title} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 4 }}>{d.title}</div>
                  <div style={{ fontSize: 13, color: MUT, marginBottom: 2 }}>
                    <strong style={{ color: INK }}>Why:</strong> {d.why}
                  </div>
                  <div style={{ fontSize: 12, color: MUT }}>{d.duration}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button onClick={() => t(`${d.title} added to Wednesday.`)} style={{ height: 36, padding: '0 12px', borderRadius: 8, background: G, color: '#fff', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Add to Wednesday</button>
                  <button onClick={() => t(`${d.title} detail view opens.`)} style={{ height: 36, padding: '0 12px', borderRadius: 8, background: '#fff', color: INK, border: `1px solid ${LN}`, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>See it</button>
                  <button onClick={() => t(`${d.title} dismissed.`)} style={{ height: 36, padding: '0 12px', borderRadius: 8, background: '#fff', color: MUT, border: `1px solid ${LN}`, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Not this</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>What this uses</div>
            {sources.map((s, i) => (
              <div key={s.n} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < sources.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{s.n2}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, marginTop: 10, lineHeight: 1.5 }}>Suggestions change as you add notes and test results. Only uses what your role can see.</div>
          </div>
        </div>
      </div>
    </AcademyFrame>
  )
}

// ACT3 — Academy Session Plan
export function AcademySessionPlan({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const parts = [
    { time: '4:30', title: 'Arrival game — tag with ball',          duration: '8 min', desc: '14 players. No instruction, free movement.' },
    { time: '4:38', title: 'Open body in pairs',                    duration: '12 min', desc: 'Half-turn receiving shape, 7 pairs, 1 ball each.' },
    { time: '4:50', title: 'Rondo with bounce player',              duration: '15 min', desc: '5v2+1 × 2 groups. Theme: half-turn to play forward.' },
    { time: '5:05', title: '4v4 through the middle',                duration: '20 min', desc: '3 games simultaneously. Progress: add neutral.' },
  ]

  const players = [
    { n: 'KO', name: 'Kai', focus: 'Left foot — keep it simple in tight areas' },
    { n: 'BN', name: 'Billie', focus: 'Shoulder check before receiving' },
    { n: 'AM', name: 'Arjun', focus: 'First touch opens away from pressure' },
  ]

  return (
    <AcademyFrame
      activeSub="Session plan"
      pageTitle="Tuesday · Advanced"
      pageSub="3 June · 4:30pm · Messmate Primary School, pitch 1 · 60 min"
      pageRight={<><BtnMore label="Send to families" onClick={() => t('Session summary sent to families.')}/><BtnPrimary label="Run it" onClick={() => t('Opening live session mode.')}/></>}
      toast={toast}
      onNav={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {parts.map((p, i) => (
            <div key={p.time} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ textAlign: 'center', flexShrink: 0, width: 40 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: G }}>{p.time}</div>
                <div style={{ width: 1, height: i < parts.length - 1 ? 20 : 0, background: LN, margin: '4px auto 0' }}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>{p.title}</span>
                  <span style={{ fontSize: 12, color: MUT }}>{p.duration}</span>
                </div>
                <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>{p.desc}</div>
              </div>
              <button onClick={() => t(`${p.title} detail opens.`)} style={{ height: 32, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Edit</button>
            </div>
          ))}
        </div>
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>One thing each</div>
            {players.map((p, i) => (
              <div key={p.n} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < players.length - 1 ? `1px solid ${LN}` : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT, lineHeight: 1.4 }}>{p.focus}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: MUT, marginTop: 10 }}>From each player's development goal. Visible to you and the co-coach.</div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>You need</div>
            {[
              { n: '11', t: 'Balls', done: true },
              { n: '20', t: 'Cones', done: true },
              { n: '3', t: 'Bibs (sets)', done: false },
              { n: '4', t: 'Small goals', done: false },
            ].map(e => (
              <div key={e.t} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: e.done ? G : MUT }}><Icon d={e.done ? ICONS.check : 'M12 12h.01'} size={16} stroke={e.done ? G : MUT}/></span>
                <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>{e.n}</span>
                <span style={{ fontSize: 14, color: MUT }}>{e.t}</span>
              </div>
            ))}
          </div>
          <div style={{ background: PALE, border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 4 }}>Open view</div>
            <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>Pitch 1 is visible from the school office. 2 coaches must be present throughout.</div>
          </div>
        </div>
      </div>
    </AcademyFrame>
  )
}

// ACT4 — Who's coming
export function AcademyWhoComing({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const coming = [
    { n: 'KO', name: 'Kai Okonkwo',   note: 'Mum said yes · yesterday' },
    { n: 'BN', name: 'Billie Nguyen', note: 'Dad said yes · this morning' },
    { n: 'TA', name: 'Tess Albright', note: 'Make-up · from Development', makeup: true },
  ]
  const toChase = [
    { n: 'MS', name: 'Marco Silva', note: 'No reply to Sunday\'s message' },
    { n: 'JP', name: 'Jai Patel',   note: 'No reply to Sunday\'s message' },
  ]
  const away = [
    { n: 'AM', name: 'Arjun Mehta', note: 'School camp · make-up offered' },
  ]

  return (
    <AcademyFrame
      activeSub="Who's coming"
      pageTitle="Who's coming"
      pageSub="Tue 3 June · Advanced · 4:30pm"
      pageRight={<><BtnMore label="Remind 2" onClick={() => t('Reminder sent to Marco and Jai\'s families.')}/><BtnPrimary label="Check in at the gate" onClick={() => t('Opening live check-in screen.')}/></>}
      toast={toast}
      onNav={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Summary tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
            {[
              { n: '9/11', label: 'Coming', color: G },
              { n: '1',    label: 'Make-up', color: G },
              { n: '1',    label: 'Away', color: MUT },
              { n: '2',    label: 'No answer', color: '#b04' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.n}</div>
                <div style={{ fontSize: 12, color: MUT }}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Lists */}
          {[
            { title: `Coming (${coming.length} confirmed + 7 more)`, players: coming, hint: '+7 more confirmed' },
            { title: 'To chase', players: toChase, hint: null },
            { title: 'Away', players: away, hint: null },
          ].map(section => (
            <div key={section.title} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, fontSize: 13, fontWeight: 700, color: MUT, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{section.title}</div>
              {section.players.map((p, i) => (
                <div key={p.n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < section.players.length - 1 ? `1px solid ${LN}` : 'none' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'makeup' in p && p.makeup ? '#faf3f0' : PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
                  </div>
                  <button onClick={() => t(`${p.name} profile opens.`)} style={{ height: 32, padding: '0 10px', borderRadius: 8, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: INK, cursor: 'pointer', fontFamily: 'inherit' }}>View</button>
                </div>
              ))}
              {section.hint && <div style={{ padding: '10px 16px', fontSize: 12, color: G, fontWeight: 600, cursor: 'pointer' }} onClick={() => t('Full list opens.')}>Show all</div>}
            </div>
          ))}
        </div>
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 8 }}>How it works</div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.6 }}>
              Families confirm in their app. If they haven't replied by Sunday morning, Clean Sheet sends one reminder — you can send a manual one above. Coming means their parent said yes this week, make-up means they're joining from a different group, and away means they told you why they're missing.
            </div>
          </div>
        </div>
      </div>
    </AcademyFrame>
  )
}

// ACT1e — Academy Week Empty
export function AcademyTrainingWeekEmpty({ onBack: _onBack }: { onBack?: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function t(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  return (
    <AcademyFrame
      activeSub="This week"
      pageTitle="This week"
      pageSub="Tall Timber Academy · term 3, week 4 of 10 · Reece's groups"
      toast={toast}
      onNav={(id) => t(id.startsWith('sub:') ? `${id.slice(4)} opens.` : `${id.charAt(0).toUpperCase() + id.slice(1)} tab opens.`)}
    >
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ color: G, marginBottom: 16 }}><Icon d={ICONS.training} size={40} stroke={G} sw={1.5}/></div>
            <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>No sessions planned yet</div>
            <div style={{ fontSize: 14, color: MUT, lineHeight: 1.6, marginBottom: 20, maxWidth: 400, margin: '0 auto 20px' }}>
              Plan each session in advance and Clean Sheet will suggest drills, track who's coming, and monitor load automatically.
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <BtnPrimary label="Plan a session" onClick={() => t('Opening session planner.')}/>
              <BtnMore label="Open the drill library" onClick={() => t('Opening drill library.')}/>
            </div>
          </div>
        </div>
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 16, padding: '14px 16px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>The same as a club coach</div>
            {[
              { n: '1', t: 'Suggestions with reasons', n2: 'Based on test results, notes, and load' },
              { n: '2', t: 'Session plans',            n2: 'Part by part, timings, what to bring' },
              { n: '3', t: 'Who\'s coming',            n2: 'Family confirmations and make-ups' },
              { n: '4', t: 'Growth and load',          n2: 'Each player over time, against their own targets' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: s.n !== '4' ? `1px solid ${LN}` : 'none' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{s.n2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AcademyFrame>
  )
}

export default AcademyTrainingWeek
