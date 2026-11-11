import { useState } from 'react'

const G    = '#2f6252'
const G2   = '#40826d'
const GD   = '#1f4a3e'
const INK  = '#10211f'
const MUT  = '#4a5a57'
const LN   = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'

type AcademyNav  = 'today' | 'players' | 'gameday' | 'library'
type TodayTab    = 'overview' | 'runsession' | 'trial' | 'oneonone' | 'record' | 'suggested' | 'chat'
type GameDayTab  = 'saturday' | 'teamsheet' | 'livegame' | 'review'
type RecordStep  = 'pick' | 'drill' | 'recording' | 'results'
type PlayersView = 'list' | 'plan' | 'report'

// ─── Shared ──────────────────────────────────────────────────────────────────

function Ini({ ini, color = G }: { ini: string; color?: string }) {
  return (
    <div style={{ width: 36, height: 36, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{ini}</div>
  )
}

function Badge({ label, color = G, bg = PALE }: { label: string; color?: string; bg?: string }) {
  return <span style={{ fontSize: 11, fontWeight: 700, color, background: bg, padding: '2px 8px', borderRadius: 999 }}>{label}</span>
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', ...style }}>{children}</div>
}

function Row({ label, value, action, onAction }: { label: string; value?: string; action?: string; onAction?: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: `1px solid ${LN}` }}>
      <span style={{ fontSize: 14, color: MUT, flex: 1 }}>{label}</span>
      {value && <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{value}</span>}
      {action && <button onClick={onAction} style={{ marginLeft: 10, fontSize: 13, fontWeight: 700, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>{action}</button>}
    </div>
  )
}

function Btn({ label, primary, onClick, small }: { label: string; primary?: boolean; onClick?: () => void; small?: boolean }) {
  return (
    <button onClick={onClick} style={{ height: small ? 32 : 40, padding: `0 ${small ? 12 : 18}px`, borderRadius: 999, border: primary ? 'none' : `1px solid ${LN}`, background: primary ? G : '#fff', color: primary ? '#fff' : MUT, fontSize: small ? 12 : 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>{label}</button>
  )
}

function PageHead({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div style={{ padding: '20px 28px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
      <div>
        <div style={{ fontSize: 24, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>{title}</div>
        {sub && <div style={{ fontSize: 13, color: MUT, marginTop: 2 }}>{sub}</div>}
      </div>
      {right && <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>{right}</div>}
    </div>
  )
}

function StepList({ items }: { items: { n: string; title: string; note?: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map(s => (
        <div key={s.n} style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{s.title}</div>
            {s.note && <div style={{ fontSize: 12, color: MUT }}>{s.note}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── ACC1 — Today overview ────────────────────────────────────────────────────

function TodayOverview({ empty, onRun, onTrials, onReport }: { empty: boolean; onRun: () => void; onTrials: () => void; onReport: () => void }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Hi Reece" sub="Friday 5 June · no sessions today"/>
      <Card>
        <div style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Nothing on today</div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Your next session is Development on Tuesday at 4:30. Now is a good time to check your report drafts.</div>
          <Btn label="Check report drafts" primary onClick={onReport}/>
        </div>
      </Card>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 4 }}>Coming up</div>
      {[
        { time: 'Tue 4:30', label: 'Development · 9 to 11' },
        { time: 'Tue 5:30', label: 'Advanced · 12 to 14' },
        { time: 'Thu 6:45', label: 'One-on-one · Kai' },
      ].map((s, i) => (
        <Card key={s.time}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: PALE, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{s.time}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )

  const sessions = [
    { time: '4:30', label: 'Development · 9 to 11', note: '14 coming · Arjun Mehta is on trial', tag: '1 trial', tagColor: G2 },
    { time: '5:30', label: 'Advanced · 12 to 14',   note: '20 coming · Lola and Finn are making up', tag: '2 make-ups', tagColor: MUT },
    { time: '6:45', label: 'One-on-one · Kai Okonkwo', note: '45 minutes · pitch 2, in open view · parent told', tag: null, tagColor: MUT },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Hi Reece" sub="Thursday 4 June · 3 sessions today at Messmate Primary School"
        right={<><Btn label="Group chats" small onClick={() => showToast('Opening group chats.')}/><Btn label="Message Dani" small primary onClick={() => showToast('New message to Dani.')}/></>}/>

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Today · Tap a session to run it</div>

      {sessions.map(s => (
        <Card key={s.time} style={{ cursor: 'pointer' }}>
          <button onClick={onRun} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', width: '100%' }}>
            <div style={{ width: 48, height: 48, background: GD, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{s.time}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{s.label}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{s.note}</div>
              {s.tag && <Badge label={s.tag} color={s.tagColor} bg={PALE}/>}
            </div>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </Card>
      ))}

      {/* Alerts */}
      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Before you start</div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
          <span style={{ color: ROSE, fontSize: 16, flexShrink: 0 }}>!</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Zane: easy on sprints</div>
            <div style={{ fontSize: 12, color: MUT }}>5 sessions this week across club and academy</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px' }}>
          <span style={{ color: G2, fontSize: 16, flexShrink: 0 }}>+</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Arjun's first time</div>
            <div style={{ fontSize: 12, color: MUT }}>Assess him in the last 10 minutes</div>
            <button onClick={onTrials} style={{ marginTop: 4, fontSize: 12, fontWeight: 600, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Open trial assess →</button>
          </div>
        </div>
      </Card>

      {/* Term reports */}
      <Card>
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Term reports</div>
            <div style={{ fontSize: 12, color: MUT }}>8 of your 52 are drafted from your notes. 4 are ready for you to check.</div>
          </div>
          <Btn label="Check a draft" small primary onClick={onReport}/>
        </div>
      </Card>

      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>Plans come from each group's term plan. Swap any drill from the library.</div>
      {toast && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  )
}

// ─── ACC2 — Run a session ─────────────────────────────────────────────────────

function RunSessionView({ empty }: { empty: boolean }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  const players = [
    { ini: 'KO', name: 'Kai Okonkwo',  goal: 'Goal: Weaker-foot finishing',       here: true },
    { ini: 'AC', name: 'Ana Costa',    goal: 'Goal: Scanning before the ball',    here: true },
    { ini: 'JM', name: 'Jonah Marsh',  goal: 'Goal: First touch away from press', here: true },
    { ini: 'LF', name: 'Lola Ferris',  goal: 'Goal: Make-up · 1v1 defending',     here: true },
    { ini: 'ZA', name: 'Zane Abbas',   goal: 'Goal: Weight of pass',              here: true },
    { ini: 'MW', name: 'Mila Wójcik',  goal: 'Goal: Receiving on the half turn',  here: false },
    { ini: 'FB', name: 'Finn Byrne',   goal: 'Goal: Make-up · striking through',  here: true },
  ]
  const plan = [
    { time: '5:30', drill: 'Ball each · both feet', dur: '10 min · done', status: 'done' },
    { time: '5:40', drill: '2v1 to a small goal · finish weaker foot', dur: '20 min · running now, 12 min left', status: 'now' },
    { time: '6:00', drill: 'Finishing circuit · three stations', dur: '15 min', status: '' },
    { time: '6:15', drill: '4v4 · a weaker-foot goal counts double', dur: '20 min', status: '' },
  ]

  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Advanced · 12 to 14" sub="Thursday 5:30 · no plan yet"/>
      <Card>
        <div style={{ padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Build tonight's plan</div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Pick a focus and Clean Sheet lays out four blocks for this age, with what to say for each.</div>
          <Btn label="Pick a focus" primary/>
        </div>
      </Card>
      <StepList items={[
        { n: '1', title: 'A ball-each start', note: 'Everyone busy from minute one' },
        { n: '2', title: 'Two skill games', note: "Around tonight's focus" },
        { n: '3', title: 'A small-sided game', note: 'Where the skill has to show up' },
      ]}/>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Advanced · 12 to 14" sub="Thursday 5:30 to 6:40 · finishing with the weaker foot"
        right={<><Btn label="Swap a drill" small/><Btn label="Finish and write notes" small primary/></>}/>

      {/* Who's here */}
      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: MUT, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Who's here</span>
          <span style={{ fontSize: 13, color: G2, fontWeight: 600 }}>19 here · 1 away</span>
        </div>
        {players.map(p => (
          <div key={p.ini} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${LN}`, opacity: p.here ? 1 : 0.5 }}>
            <Ini ini={p.ini} color={p.here ? G : LN}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
              <div style={{ fontSize: 12, color: G2 }}>{p.goal}</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: p.here ? G : ROSE }}>{p.here ? 'Here' : 'Away'}</span>
          </div>
        ))}
        <div style={{ padding: '10px 16px', fontSize: 12, color: MUT }}>Showing 7 of 20. Each player's goal sits under their name so you can coach it in passing.</div>
      </Card>

      {/* The plan */}
      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: MUT, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>The plan</span>
          <button onClick={() => showToast('Opening the film-this-drill flow.')} style={{ height: 44, padding: '0 10px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: G2, cursor: 'pointer', fontFamily: 'inherit' }}>Film this drill</button>
        </div>
        {plan.map(p => (
          <div key={p.drill} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: `1px solid ${LN}`, background: p.status === 'now' ? PALE : '#fff' }}>
            <div style={{ width: 36, fontSize: 12, fontWeight: 700, color: p.status === 'done' ? MUT : INK, flexShrink: 0 }}>{p.time}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: p.status === 'done' ? MUT : INK, textDecoration: p.status === 'done' ? 'line-through' : 'none' }}>{p.drill}</div>
              <div style={{ fontSize: 12, color: p.status === 'now' ? G : MUT }}>{p.dur}</div>
            </div>
            {p.status === 'done' && <span style={{ fontSize: 11, fontWeight: 700, color: G2 }}>Done</span>}
            {p.status === 'now'  && <span style={{ fontSize: 11, fontWeight: 700, color: G, background: PALE, padding: '2px 8px', borderRadius: 999 }}>Now</span>}
          </div>
        ))}
        <div style={{ padding: '12px 16px', background: GD }}>
          <div style={{ fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>"Open your hips, lock the ankle, and pick your corner before you strike."</div>
        </div>
        <div style={{ padding: '10px 16px', background: '#fdf7f7', fontSize: 12, color: ROSE, lineHeight: 1.5 }}>Zane sits out the sprint finish at the last station. He has had a big week with his club.</div>
      </Card>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

// ─── ACC3 — Trial player ──────────────────────────────────────────────────────

function TrialView({ empty }: { empty: boolean }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  const [taps, setTaps] = useState<Record<string, 'starting' | 'getting' | 'strong'>>({
    ball: 'getting', touch: 'starting', oneonone: 'strong', passing: 'getting',
  })
  const skills = [
    { id: 'ball', label: 'Ball mastery', note: 'Keeps the ball close with both feet' },
    { id: 'touch', label: 'First touch', note: 'Sets the ball where they want it' },
    { id: 'oneonone', label: 'One against one', note: 'Takes a player on, or stops one' },
    { id: 'passing', label: 'Passing', note: 'Finds a teammate, right weight' },
  ]

  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Trial players" sub="None in your sessions this week"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>No trial players this week</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 12 }}>When a family books a trial in one of your groups, the child shows on your session with a trial tag.</div>
        <Btn label="Back to today" primary/>
      </div></Card>
      <StepList items={[
        { n: '1', title: 'Welcome them in', note: 'They join the normal session' },
        { n: '2', title: 'Four taps at the end', note: 'Under a minute' },
        { n: '3', title: 'Dani makes the offer', note: 'With your suggested group' },
      ]}/>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Trial · Arjun Mehta, 10" sub="In Development today · 4 taps, then send"
        right={<><Btn label="Not today" small/><Btn label="Send to Dani" small primary/></>}/>

      {/* What you saw */}
      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>What you saw · for his age</div>
        {skills.map(skill => (
          <div key={skill.id} style={{ padding: '14px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 2 }}>{skill.label}</div>
            <div style={{ fontSize: 12, color: MUT, marginBottom: 10 }}>{skill.note}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['starting', 'getting', 'strong'] as const).map(opt => (
                <button key={opt} onClick={() => setTaps(t => ({ ...t, [skill.id]: opt }))} style={{ flex: 1, height: 44, borderRadius: 8, border: `1.5px solid ${taps[skill.id] === opt ? G : LN}`, background: taps[skill.id] === opt ? PALE : '#fff', fontSize: 13, fontWeight: taps[skill.id] === opt ? 700 : 400, color: taps[skill.id] === opt ? G : MUT, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' as const }}>
                  {opt === 'starting' ? 'Starting out' : opt === 'getting' ? 'Getting there' : 'Strong'}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div style={{ padding: '10px 16px', fontSize: 12, color: MUT }}>These four go into his first plan if he joins. They're never shown as a score.</div>
      </Card>

      {/* Suggested group */}
      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Suggested group</div>
        <div style={{ padding: '14px 16px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 4 }}>Development</div>
          <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>Tue and Thu 4:30 · 2 places open. He'd fit in comfortably and be stretched on first touch.</div>
          <button onClick={() => showToast('Opening the group selector.')} style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Suggest another group</button>
        </div>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 12, color: MUT, marginBottom: 6 }}>A line for the family · written from your taps. Change any word.</div>
          <div style={{ fontSize: 14, color: INK, lineHeight: 1.5, fontStyle: 'italic' }}>"Arjun loved taking players on and never hid from the ball. We'd work on his first touch."</div>
        </div>
      </Card>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

// ─── ACC4 — Player plan ───────────────────────────────────────────────────────

function PlayerPlanView({ playerName, newPlayer, onReport }: { playerName: string; newPlayer?: boolean; onReport?: () => void }) {
  const skills = [
    { label: 'Ball mastery',  note: 'Both feet, at speed',       step: 4 },
    { label: 'First touch',   note: 'Up one this term',          step: 3 },
    { label: 'One against one', note: "His strength",            step: 5 },
    { label: 'Passing',       note: 'Good weight, short. Long is next', step: 3 },
    { label: 'Finishing',     note: "This term's goal · weaker foot", step: 2 },
  ]
  const week = [
    { day: 'MON', label: '' },
    { day: 'TUE', label: 'Academy' },
    { day: 'WED', label: 'School' },
    { day: 'THU', label: 'Academy 1:1' },
    { day: 'FRI', label: '' },
    { day: 'SAT', label: 'Game' },
    { day: 'SUN', label: '' },
  ]

  if (newPlayer) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title={playerName} sub="Advanced · joined 2 June · 2 sessions so far"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>{playerName.split(' ')[0]}'s plan starts after 3 sessions</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 12 }}>Her trial gave a starting point. One more session of notes and Clean Sheet sets her ladder and suggests a goal.</div>
        <Btn label="See her trial notes" primary/>
      </div></Card>
      <StepList items={[
        { n: '1', title: 'Five skills', note: 'Where she is on each' },
        { n: '2', title: 'One goal a term', note: 'You choose it' },
        { n: '3', title: 'Her whole week', note: "If her parent shares the club side" },
      ]}/>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title={playerName} sub="Advanced · joined 13 May · came to 5 of 6"
        right={<><Btn label="Message Kai's mum" small/><Btn label="Write term report" small primary onClick={onReport}/></>}/>

      {/* Where he is */}
      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Where Kai is · against where he started</div>
        {skills.map(s => (
          <div key={s.label} style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{s.label}</div>
                <div style={{ fontSize: 12, color: G2 }}>{s.note}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i <= s.step ? G : LN }}/>
              ))}
            </div>
          </div>
        ))}
        <div style={{ padding: '10px 16px', fontSize: 12, color: MUT }}>Five steps per skill, set from your session notes. Kai sees his own ladder, never anyone else's.</div>
      </Card>

      {/* Goal */}
      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Goal this term</div>
        <div style={{ padding: '14px 16px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: GD }}>Score with his left foot in a game</div>
          <div style={{ fontSize: 13, color: G, marginTop: 4, lineHeight: 1.4 }}>3 left-foot finishes in training so far. Practice at home: 2 of 3 done this week.</div>
        </div>
        <div style={{ padding: '10px 16px', fontSize: 12, color: MUT }}>Kai has trained 3 times this week. Keep repeated sprints short.</div>
      </Card>

      {/* Week view */}
      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Kai's whole week · 5 sessions</div>
        <div style={{ display: 'flex', padding: '14px 16px', gap: 4 }}>
          {week.map(d => (
            <div key={d.day} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: MUT, marginBottom: 6 }}>{d.day}</div>
              <div style={{ height: 48, background: d.label ? (d.label.includes('Academy') ? G : d.label === 'Game' ? GD : PALE) : LN, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: d.label && (d.label.includes('Academy') || d.label === 'Game') ? '#fff' : MUT, textAlign: 'center', padding: '0 2px', lineHeight: 1.3 }}>{d.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px 16px', fontSize: 12, color: MUT, lineHeight: 1.5 }}>Kai plays for U13 Timber, your game team at Wattle Creek FC, so his games are here without anyone sharing them. His mum added school football.</div>
      </Card>
    </div>
  )
}

// ─── ACC5 — One-on-one ────────────────────────────────────────────────────────

function OneOnOneView({ empty }: { empty: boolean }) {
  const plan = [
    { dur: '10', title: 'Ball each, left foot only', note: 'Touches, turns and a strike at the wall' },
    { dur: '15', title: 'Set, touch, finish', note: 'You serve from the right. Left-foot finish, near post then far' },
    { dur: '15', title: 'Finish under pressure', note: 'You close him down from behind. One touch, then strike' },
    { dur: '5',  title: 'His choice', note: "Kai picks the finish he wants to show his mum" },
  ]

  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="One-on-ones" sub="None booked with you"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>No one-on-ones booked</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 12 }}>Parents book and pay from their app, in the times you've opened. Each session is planned from the player's goal.</div>
        <Btn label="Open more times" primary/>
      </div></Card>
      <StepList items={[
        { n: '1', title: 'Is in open view', note: 'On a pitch others can see' },
        { n: '2', title: 'Is known to the parent', note: 'Place and time, confirmed' },
        { n: '3', title: 'Ends with a summary', note: 'To the parent, with a clip' },
      ]}/>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="One-on-one · Kai Okonkwo" sub="Thursday 6:45 to 7:30 · pitch 2"
        right={<><Btn label="Move the session" small/><Btn label="Finish and send summary" small primary/></>}/>

      <div style={{ background: PALE, borderRadius: 14, padding: '12px 16px', fontSize: 14, fontWeight: 600, color: GD }}>
        45 minutes, built from Kai's goal: score with his left foot in a game
      </div>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Film a finish</div>
        {plan.map(p => (
          <div key={p.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{p.dur}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.title}</div>
              <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
            </div>
          </div>
        ))}
        <div style={{ padding: '10px 16px', fontSize: 12, color: MUT, lineHeight: 1.5 }}>Kai has trained 3 times this week. Keep the sprints short.</div>
      </Card>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>One-on-one rules</div>
        {[
          { label: 'In open view', note: 'Pitch 2, beside the Advanced group' },
          { label: 'Parent knows where and when', note: 'Tess confirmed on Tuesday. She\'s welcome to watch' },
          { label: 'Start and finish are logged', note: 'So there\'s a record of every session' },
        ].map(r => (
          <div key={r.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✓</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{r.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{r.note}</div>
            </div>
          </div>
        ))}
        <div style={{ padding: '12px 16px', fontSize: 12, color: MUT, lineHeight: 1.5 }}>After the session: two taps on how it went, and Tess gets a short summary with a clip. The session is paid already: $90, by card.</div>
      </Card>
    </div>
  )
}

// ─── ACC6 — Term report ───────────────────────────────────────────────────────

function TermReportView({ empty, onBack }: { empty: boolean; onBack?: () => void }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Term reports" sub="No drafts yet · they start in week 8"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Drafts start in week 8</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 12 }}>Keep tapping your two notes per player after each session. Clean Sheet turns them into a first draft for you to check.</div>
        <Btn label="Back to today" primary onClick={onBack}/>
      </div></Card>
      <StepList items={[
        { n: '1', title: 'You check every draft', note: 'Change any word' },
        { n: '2', title: 'Dani approves', note: 'Before a family sees it' },
        { n: '3', title: 'No scores', note: "Each child against their own last term" },
      ]}/>
    </div>
  )

  const skills = ['Ball mastery', 'First touch', 'One against one', 'Passing', 'Finishing']

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Term report · Kai Okonkwo" sub="Drafted from your 5 session notes · check it, then send to Dani"
        right={<><Btn label="Next draft" small/><Btn label="Looks right, send to Dani" small primary/></>}/>

      {/* Draft text */}
      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>What Kai's family will read · 2 short paragraphs</div>
        <div style={{ padding: '16px' }}>
          <div style={{ fontSize: 14, color: INK, lineHeight: 1.7 }}>
            Kai has had a strong first term. He takes players on with confidence and keeps the ball close with both feet. His first touch has moved up a step: he now sets the ball out of his feet before he looks up.
          </div>
          <div style={{ fontSize: 14, color: INK, lineHeight: 1.7, marginTop: 12 }}>
            We've worked on finishing with his left foot. He has scored three in training and practises at home most weeks. Next term's goal is to do it in a game.
          </div>
        </div>
        <div style={{ padding: '10px 16px', borderTop: `1px solid ${LN}`, display: 'flex', gap: 8 }}>
          <Btn label="Make it shorter" small/>
          <Btn label="Change a word" small/>
          <Btn label="Add a clip" small/>
        </div>
        <div style={{ padding: '10px 16px', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>Written from what you noted, in plain words. It never compares Kai with another child.</div>
      </Card>

      {/* Skills */}
      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Skills, then and now</div>
        {skills.map(s => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${LN}` }}>
            <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: INK }}>{s}</div>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1,2,3,4,5].map(i => <div key={i} style={{ width: 14, height: 6, borderRadius: 3, background: i <= 3 ? G : LN }}/>)}
            </div>
          </div>
        ))}
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 13, color: MUT }}>Came to 5 of 6 sessions</div>
        <div style={{ padding: '10px 16px', fontSize: 13, color: MUT }}>Next term's goal: Left-foot goal in a game</div>
      </Card>

      <div style={{ fontSize: 12, color: MUT }}>The lighter dot is what moved this term.</div>
    </div>
  )
}

// ─── ACC7 — Game day ──────────────────────────────────────────────────────────

function GameDayMainView({ empty }: { empty: boolean }) {
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Game day" sub="No game team yet"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Your groups only train for now</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 12 }}>If the academy links with a club, your game team's fixtures, team sheet and reviews show here.</div>
        <Btn label="Back to today" primary/>
      </div></Card>
      <StepList items={[
        { n: '1', title: 'Fixtures arrive', note: "From the club's league" },
        { n: '2', title: 'One team sheet', note: 'Checked against registrations' },
        { n: '3', title: 'Reviews feed training', note: "And each player's plan" },
      ]}/>
    </div>
  )

  const checks = [
    { label: 'Team sheet', note: '14 of 16 can play · 2 still to register with the club', done: false, action: 'Open' },
    { label: 'Minutes', note: "Everyone gets at least half a game. The plan is ready", done: true, action: 'See plan' },
    { label: 'Team talk', note: "3 slides from Thursday's session: finishing with the weaker foot", done: true, action: 'Open' },
    { label: 'Cards', note: 'Nobody suspended', done: true, action: null },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="U13 Timber · Saturday" sub="Sat 6 June · 11:00 vs Banksia Park · home, pitch 2"
        right={<><Btn label="Message the team" small/><Btn label="Start the game" small primary/></>}/>

      <div style={{ background: PALE, borderRadius: 10, padding: '10px 14px', fontSize: 13, fontWeight: 600, color: GD }}>
        Ready for Saturday · 3 of 4 done
      </div>

      <Card>
        {checks.map((c, i) => (
          <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < checks.length - 1 ? `1px solid ${LN}` : 'none' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: c.done ? G : ROSE + '33', color: c.done ? '#fff' : ROSE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{c.done ? '✓' : '!'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{c.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{c.note}</div>
            </div>
            {c.action && <Btn label={c.action} small/>}
          </div>
        ))}
      </Card>

      <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: INK, marginBottom: 8 }}>Can't play yet</div>
        {[
          { ini: 'AC', name: 'Ana Costa', note: 'Club registration not finished' },
          { ini: 'JM', name: 'Jonah Marsh', note: 'Club registration not finished' },
        ].map(p => (
          <div key={p.ini} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Ini ini={p.ini} color={ROSE}/>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
              <div style={{ fontSize: 12, color: ROSE }}>{p.note}</div>
            </div>
          </div>
        ))}
        <div style={{ fontSize: 12, color: MUT, marginTop: 4 }}>Their parents were reminded today. Both can still train.</div>
      </div>

      <div style={{ background: PALE, borderRadius: 14, padding: '12px 16px', fontSize: 13, color: G, lineHeight: 1.5 }}>
        U13 Timber is your Advanced group's game team. It plays as part of Wattle Creek FC, so the club's rules apply on the day.
      </div>

      <div style={{ fontSize: 12, color: MUT }}>After the game: the match review comes back in about 25 minutes. What it finds feeds next week's sessions and each player's plan.</div>
      <button onClick={() => showToast("Opening last week's match review.")} style={{ alignSelf: 'flex-start', fontSize: 13, fontWeight: 600, color: G2, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>See last week's review</button>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )
}

// ─── ACC8/9 — Record ─────────────────────────────────────────────────────────

function RecordView({ empty, onDrill, onRecording }: { empty: boolean; onDrill: () => void; onRecording: () => void }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Record" sub="No camera or sensors paired yet"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Pair a camera, or start with your phone</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 14 }}>Any camera that saves a video file works. With no kit you can still count by hand, and it goes into each player's notes.</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}><Btn label="Pair a camera" primary/><Btn label="Count by hand"/></div>
      </div></Card>
      <StepList items={[
        { n: '1', title: 'A camera', note: 'Clips for parents and term reports' },
        { n: '2', title: 'Boot sensors', note: 'Touches, and which foot' },
        { n: '3', title: 'Nothing at all', note: 'Your own count still works' },
      ]}/>
    </div>
  )

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Record" sub="Film it, wear the sensors, then see what changed since last time"/>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>What are you recording?</div>
        {[
          { label: "A drill in tonight's session", note: 'Advanced, 5:30 · finishing circuit, three stations · Run 3', onClick: onDrill },
          { label: 'A one-on-one', note: 'Kai at 6:45 · his left-foot finishing, against last week', onClick: onRecording },
          { label: 'A skill test', note: 'Juggling, first touch or striking. Each player against their own last result', onClick: onDrill },
          { label: "Saturday's game", note: "U13 Timber vs Banksia Park · matched to the club's fixture", onClick: onDrill },
        ].map((opt, i) => (
          <button key={opt.label} onClick={opt.onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: 'none', borderBottom: i < 3 ? `1px solid ${LN}` : 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: MUT, marginTop: 2 }}>{opt.note}</div>
            </div>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}
      </Card>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Kit</div>
        <Card>
          {[
            { label: 'Academy camera', note: 'Connected · battery 71%', ok: true },
            { label: 'Boot sensors', note: '19 of 20 charged', ok: false, warn: true },
          ].map((k, i) => (
            <div key={k.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < 1 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{k.label}</div>
                <div style={{ fontSize: 12, color: k.warn ? ROSE : G2 }}>{k.note}</div>
              </div>
              <Badge label={k.ok ? 'Ready' : 'Check'} color={k.ok ? G : ROSE} bg={k.ok ? PALE : '#fdf4f4'}/>
            </div>
          ))}
        </Card>
        <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>No kit? Count by hand, or film on a phone.</div>
      </div>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT }}>Who can be filmed</div>
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800 }}>19</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>19 of 20 tonight</div>
            <div style={{ fontSize: 12, color: G2 }}>Their parents said yes</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: ROSE }}>1 · Mila is blurred</div>
            <div style={{ fontSize: 12, color: MUT }}>Her parent said no to filming</div>
          </div>
        </div>
        <div style={{ padding: '10px 16px', borderTop: `1px solid ${LN}`, fontSize: 12, color: MUT }}>Under 12 it's clips only. No scores or numbers for any child that age.</div>
      </Card>

      <div style={{ fontSize: 12, color: MUT, lineHeight: 1.5 }}>What you record becomes each player's session note, and evidence for their plan and term report.</div>
    </div>
  )
}

function RecordDrillView({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Record a drill" sub="Finishing circuit · Advanced, 12 to 14 · third on tonight's plan"
        right={<><Btn label="Pick another drill" small/><Btn label="Start recording" small primary onClick={onStart}/></>}/>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: MUT, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>The set-up</span>
          <span style={{ fontSize: 12, color: G2, fontWeight: 600 }}>Same as last time</span>
        </div>
        {[
          { label: 'Players', value: '20 · three groups' },
          { label: 'Area', value: 'Penalty box, with three stations' },
          { label: 'Rounds', value: '3 rounds of 5 minutes' },
          { label: 'Rule', value: 'Weaker foot only at station 2' },
          { label: 'Camera', value: 'Behind the goal, with all three stations in view' },
          { label: 'Sensors', value: 'Boots on 19' },
        ].map(r => <Row key={r.label} label={r.label} value={r.value} action={r.label === 'Camera' ? 'Check view' : 'Change'}/>)}
        <div style={{ padding: '10px 16px', fontSize: 12, color: MUT }}>This set-up is saved with the drill, so the next run is a fair comparison.</div>
      </Card>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>What we'll measure</div>
        <Card>
          {[
            { label: "Weaker-foot shots on target", note: 'Share that hit the target', src: 'Camera' },
            { label: 'Shots per player', note: 'So everyone gets enough goes', src: 'Camera' },
            { label: 'Weaker-foot touches', note: 'Share of touches on the weaker foot', src: 'Boot sensors' },
          ].map((m, i) => (
            <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < 2 ? `1px solid ${LN}` : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{m.label}</div>
                <div style={{ fontSize: 12, color: MUT }}>{m.note}</div>
              </div>
              <Badge label={m.src} color={G2} bg={PALE}/>
            </div>
          ))}
          <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: G2 }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
            Count something by hand
          </button>
        </Card>
        <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>Last run: Thu 21 May, run 2. Six players have this as their term goal.</div>
      </div>
    </div>
  )
}

function LiveRecordingView({ onStop }: { onStop: () => void }) {
  return (
    <div style={{ flex: 1, background: '#0e1a17', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: ROSE }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Finishing circuit · run 3</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Works with no signal. Uploads when you're back online.</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.4)' }}>Round 2 of 3</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>1:42</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Left in this round</div>
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 20px', maxWidth: 400, fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginTop: 8, textAlign: 'center' }}>
          "Open your hips, lock the ankle, pick your corner."
        </div>
      </div>
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 8 }}>
        {['Next round', 'Mark a moment', 'Pause'].map(a => (
          <button key={a} style={{ flex: 1, height: 44, borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{a}</button>
        ))}
        <button onClick={onStop} style={{ flex: 1, height: 44, borderRadius: 10, border: 'none', background: ROSE, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Stop and save</button>
      </div>
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8 }}>
        {[
          { label: 'Academy camera', note: 'All three stations in view', ok: true },
          { label: 'Boot sensors', note: "19 of 20 · Zane's aren't on", ok: false },
        ].map(d => (
          <div key={d.label} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '8px 12px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: d.ok ? 'rgba(255,255,255,0.75)' : ROSE }}>{d.label}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{d.note}</div>
          </div>
        ))}
      </div>
      <div style={{ margin: '0 20px 20px', background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>14 of 22</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>weaker-foot shots on target</div>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'right', maxWidth: 180 }}>Last run they finished on 52%. Full results about 10 minutes after you stop.</div>
      </div>
    </div>
  )
}

function RecordResultsView({ firstRun }: { firstRun: boolean }) {
  const players = [
    { ini: 'AC', name: 'Ana Costa',   note: 'Too new to compare. This is her starting point', status: 'Starting point' },
    { ini: 'JM', name: 'Jonah Marsh', note: 'Same as last run', status: 'Same' },
    { ini: 'KO', name: 'Kai Okonkwo', note: 'Left foot on target 5 of 8, up from 3 of 8', status: 'Better' },
    { ini: 'LF', name: 'Lola Ferris', note: 'Make-up session, so no last run with this group', status: 'Not compared' },
    { ini: 'MW', name: 'Mila Wójcik', note: 'Not filmed. Your hand count: 4 of 7', status: 'Hand count' },
    { ini: 'ZA', name: 'Zane Abbas',  note: 'No boot sensors, so no touches', status: 'Part missing' },
  ]
  const statusColor = (s: string) => s === 'Better' ? G : s === 'Same' || s === 'Hand count' ? MUT : s === 'Starting point' ? G2 : ROSE

  const metrics = firstRun
    ? [{ label: 'WEAKER-FOOT SHOTS ON TARGET', value: '41%', prev: null, verdict: null }]
    : [
        { label: 'WEAKER-FOOT SHOTS ON TARGET', value: '64%', prev: '52%', verdict: 'Real change' },
        { label: 'SHOTS PER PLAYER', value: '9', prev: '8', verdict: 'About the same' },
        { label: 'WEAKER-FOOT TOUCHES', value: '31%', prev: '24%', verdict: 'Real change' },
      ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title={firstRun ? 'Finishing circuit · run 1' : 'Finishing circuit · run 3'}
        sub={firstRun ? 'Tonight · Advanced · your starting point' : 'Tonight · Advanced · 20 players · same set-up as run 2'}
        right={firstRun
          ? <Btn label="Run it again next week" small primary/>
          : <><Btn label="Clips · 8" small/><Btn label="Run it again next week" small primary/></>}/>

      {firstRun && (
        <div style={{ background: PALE, borderRadius: 14, padding: '14px 16px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: GD, marginBottom: 4 }}>This is the group's starting point</div>
          <div style={{ fontSize: 13, color: G, lineHeight: 1.5 }}>Tonight: 41% of weaker-foot shots on target. Run it again with the same set-up to see what changes.</div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {metrics.map(m => (
          <div key={m.label} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: MUT, marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: INK, letterSpacing: '-0.03em' }}>{m.value}</div>
            {m.prev && <div style={{ fontSize: 12, color: MUT }}>was {m.prev}</div>}
            {m.verdict && <div style={{ fontSize: 12, fontWeight: 700, color: m.verdict === 'Real change' ? G : MUT }}>{m.verdict}</div>}
          </div>
        ))}
      </div>

      {!firstRun && (
        <>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>Each player, against their own last run · Compared with 21 May</div>
            <Card>
              {players.map((p, i) => (
                <div key={p.ini} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: i < players.length - 1 ? `1px solid ${LN}` : 'none' }}>
                  <Ini ini={p.ini} color={G}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: statusColor(p.status), flexShrink: 0 }}>{p.status}</span>
                </div>
              ))}
              <div style={{ padding: '10px 14px', fontSize: 12, color: MUT }}>In name order, never ranked. Showing 6 of 20.</div>
            </Card>
          </div>
          <Card>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, fontSize: 13, fontWeight: 700, color: INK }}>Where it goes</div>
            <StepList items={[
              { n: '1', title: 'Session notes, written for you', note: 'For all 20. Check them in two taps' },
              { n: '2', title: "Kai's plan", note: 'Finishing could move up a step. You decide' },
              { n: '3', title: 'Term reports', note: 'A clip is saved for 6 players' },
            ]}/>
            <div style={{ padding: '0 16px 14px', fontSize: 12, color: MUT, lineHeight: 1.5, marginTop: 8 }}>The group is hitting the target more often with the weaker foot, and it's more than a normal up and down. One more run makes it a trend.</div>
          </Card>
        </>
      )}

      {firstRun && (
        <StepList items={[
          { n: '1', title: 'Session notes', note: 'Written for you from what was filmed' },
          { n: '2', title: "Each player's plan", note: 'A first mark on the skill' },
          { n: '3', title: 'Clips', note: 'Saved for the term report' },
        ]}/>
      )}
    </div>
  )
}

// ─── ACC12 — Suggested ────────────────────────────────────────────────────────

function SuggestedView({ empty }: { empty: boolean }) {
  if (empty) return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Suggested for tonight" sub="Not enough to go on yet"/>
      <Card><div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginBottom: 6 }}>Suggestions start after a few sessions</div>
        <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 12 }}>Keep tapping your two notes per player. After three sessions, or one recorded drill, Clean Sheet suggests what to change for the group and for each player.</div>
        <Btn label="Record a drill" primary/>
      </div></Card>
      <StepList items={[
        { n: '1', title: 'Your session notes', note: 'Two taps per player' },
        { n: '2', title: 'Recorded drills', note: 'What moved, and for whom' },
        { n: '3', title: "Each player's goal", note: 'The next step towards it' },
      ]}/>
    </div>
  )

  const playerGoals = [
    { ini: 'KO', name: 'Kai Okonkwo', note: 'Left foot on target 5 of 8. Next: finish first time', tag: 'Step up', color: G },
    { ini: 'JM', name: 'Jonah Marsh', note: 'No change in 3 runs. Try striking a moving ball', tag: 'Swap', color: G2 },
    { ini: 'AC', name: 'Ana Costa', note: 'Too new. Keep her on the group drill', tag: 'Wait', color: MUT },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Suggested for tonight" sub="Advanced · from 3 recordings, your session notes and each player's goal"
        right={<Btn label="Back to today" small/>}/>

      {/* Group suggestions */}
      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>1</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Weaker-foot finishing is working: make it harder</div>
            <Badge label="Strong evidence" color={G} bg={PALE}/>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {['3 runs: 41% to 64% on target', 'Your notes'].map(t => (
              <span key={t} style={{ fontSize: 12, fontWeight: 600, color: G2, background: PALE, padding: '3px 10px', borderRadius: 999 }}>{t}</span>
            ))}
          </div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>The group is ready for pressure. Adding a defender keeps the same skill but makes them do it faster.</div>
        </div>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, background: PALE }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: GD }}>Finishing circuit, with a chasing defender</div>
          <div style={{ fontSize: 13, color: G }}>Same stations · defender starts 3 metres behind</div>
        </div>
        <div style={{ padding: '10px 16px' }}>
          <Btn label="Add to tonight" primary/>
        </div>
      </Card>

      <Card>
        <div style={{ padding: '10px 16px', borderBottom: `1px solid ${LN}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: GD, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>2</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Six players still take the ball with their back to goal</div>
            <Badge label="Good evidence" color={G2} bg={PALE}/>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {['Session notes, 4 weeks', 'Clips'].map(t => (
              <span key={t} style={{ fontSize: 12, fontWeight: 600, color: G2, background: PALE, padding: '3px 10px', borderRadius: 999 }}>{t}</span>
            ))}
          </div>
          <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5 }}>They share the same gap, so one station fixes it for all six while the rest play.</div>
        </div>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LN}`, background: PALE }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: GD }}>Receive on the half turn, one station</div>
          <div style={{ fontSize: 13, color: G }}>8 minutes · Mila, Zane and four others</div>
        </div>
        <div style={{ padding: '10px 16px' }}><Btn label="Add to tonight" primary/></div>
      </Card>

      {/* Per-player */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>For each player's goal · 3 of 20</div>
        <Card>
          {playerGoals.map((p, i) => (
            <div key={p.ini} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i < playerGoals.length - 1 ? `1px solid ${LN}` : 'none' }}>
              <Ini ini={p.ini} color={p.color}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
                <div style={{ fontSize: 12, color: MUT }}>{p.note}</div>
              </div>
              <Badge label={p.tag} color={p.color} bg={PALE}/>
            </div>
          ))}
        </Card>
        <div style={{ fontSize: 12, color: MUT, marginTop: 8 }}>Each player's goal sits under their name during the session, with tonight's step.</div>
      </div>

      <div style={{ background: PALE, borderRadius: 14, padding: '12px 16px', fontSize: 13, color: G, lineHeight: 1.5 }}>
        Parents can see why. When a suggestion changes a player's plan, the reason goes into their term report in plain words.
      </div>
    </div>
  )
}

// ─── ACC13 — Chat ─────────────────────────────────────────────────────────────

function ChatView({ empty }: { empty: boolean }) {
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const chats = [
    { id: 'news', label: 'Tall Timber news', time: 'Mon', preview: 'Dani: July clinic bookings are open', unread: 0 },
    { id: 'adv', label: 'Advanced · Tue and Thu', time: '4:15 pm', preview: empty ? 'No messages yet' : 'Tess: Kai did all three practices!', unread: empty ? 0 : 2 },
    { id: 'u13', label: 'U13 Timber · game team', time: 'Wed', preview: 'You: Team sheet for Saturday', unread: 0 },
    { id: 'dani', label: 'Dani Okafor · owner', time: 'Wed', preview: 'Can you take the 4:15 on Friday?', unread: 1 },
  ]

  const advMessages = [
    { ini: 'RW', name: 'You', time: '3:30 pm', isVoice: true, dur: '0:48', text: "This week's home practice: 20 left-foot finishes against a wall.", reactions: ['👍 8'], isMe: true },
    { ini: 'TO', name: 'Tess Okonkwo · Kai\'s mum', time: '4:15 pm', isVoice: false, text: 'Kai did all three! Any make-up for next Tuesday?', reactions: ['🙌 2'], isMe: false },
    { ini: 'RW', name: 'You', time: '4:20 pm', isPoll: true, question: 'Make-up for Tuesday 9 June: which suits?', options: ['Wed 10 June, 5:30 · 3', 'Fri 12 June, 4:15 · 1'], footer: '4 of 22 families · your answer books the make-up', isMe: true },
  ]

  if (activeChat === 'adv') return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Chat header */}
      <div style={{ padding: '12px 20px', borderBottom: `1px solid ${LN}`, background: '#fff', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={() => setActiveChat(null)} style={{ width: 32, height: 32, border: 'none', background: LN, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2.5} strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Advanced · Tue and Thu</div>
          <div style={{ fontSize: 12, color: MUT }}>22 families, Reece and Dani · parents can post · set up by Dani</div>
        </div>
      </div>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {empty ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>No messages in this group yet</div>
            <div style={{ fontSize: 13, color: MUT, maxWidth: 320, lineHeight: 1.5 }}>Send this week's home practice, or a poll for make-up times. Families see it as soon as they join.</div>
          </div>
        ) : advMessages.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, flexDirection: m.isMe ? 'row-reverse' : 'row' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: m.isMe ? G : ROSE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{m.ini}</div>
            <div style={{ maxWidth: 400 }}>
              {!m.isMe && <div style={{ fontSize: 11, color: MUT, marginBottom: 2 }}>{m.name} · {m.time}</div>}
              {m.isMe && <div style={{ fontSize: 11, color: MUT, marginBottom: 2, textAlign: 'right' }}>You · {m.time}</div>}
              {m.isVoice && (
                <div style={{ background: m.isMe ? G : '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '10px 14px' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: m.isMe ? '#fff' : G, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={m.isMe ? G : '#fff'} strokeWidth={2} strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                    <div style={{ flex: 1, height: 3, background: m.isMe ? 'rgba(255,255,255,0.4)' : LN, borderRadius: 2 }}/>
                    <span style={{ fontSize: 12, color: m.isMe ? 'rgba(255,255,255,0.8)' : MUT }}>{m.dur}</span>
                  </div>
                  <div style={{ fontSize: 12, color: m.isMe ? 'rgba(255,255,255,0.8)' : MUT }}>{m.text}</div>
                </div>
              )}
              {!m.isVoice && !m.isPoll && (
                <div style={{ background: m.isMe ? G : '#fff', border: `1px solid ${LN}`, borderRadius: 12, padding: '10px 14px' }}>
                  <div style={{ fontSize: 14, color: m.isMe ? '#fff' : INK, lineHeight: 1.4 }}>{m.text}</div>
                </div>
              )}
              {m.isPoll && (
                <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, fontSize: 13, fontWeight: 700, color: INK }}>POLL · {m.question}</div>
                  {m.options?.map(opt => {
                    const [label, count] = opt.split(' · ')
                    const pct = parseInt(count) / 4 * 100
                    return (
                      <div key={opt} style={{ padding: '8px 14px', borderBottom: `1px solid ${LN}`, position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, background: PALE, borderRadius: '0 0 0 0' }}/>
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: INK }}>{label}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: G }}>{count}</span>
                        </div>
                      </div>
                    )
                  })}
                  <div style={{ padding: '8px 14px', fontSize: 12, color: MUT }}>{m.footer}</div>
                </div>
              )}
              {m.reactions && <div style={{ fontSize: 12, marginTop: 4, textAlign: m.isMe ? 'right' : 'left' }}>{m.reactions.join(' ')}</div>}
            </div>
          </div>
        ))}
      </div>
      {/* Compose */}
      <div style={{ padding: '12px 20px', borderTop: `1px solid ${LN}`, background: '#fff', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          {['📷', '🎥', '🎤', '📊', '📄', '🏃'].map((icon, i) => (
            <button key={i} style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${LN}`, background: '#fff', cursor: 'pointer', fontSize: 16 }}>{icon}</button>
          ))}
          <button onClick={() => showToast('Opening the home practice template.')} style={{ height: 44, padding: '0 14px', borderRadius: 999, border: `1px solid ${G}`, background: PALE, fontSize: 12, fontWeight: 700, color: G, cursor: 'pointer', fontFamily: 'inherit' }}>Home practice</button>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input defaultValue="" placeholder="Write to the Advanced group" style={{ flex: 1, height: 44, padding: '0 14px', border: `1px solid ${LN}`, borderRadius: 999, fontFamily: 'inherit', fontSize: 14, outline: 'none' }}/>
          <button style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: G, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
        <div style={{ fontSize: 11, color: MUT, marginTop: 6, textAlign: 'center' }}>Notes about one player belong in their plan or a private reply, not the group.</div>
      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </div>
  )

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <PageHead title="Chats" right={<Btn label="New chat" small primary/>}/>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 28px 32px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {chats.map(c => (
          <button key={c.id} onClick={() => setActiveChat(c.id)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: `1px solid ${LN}`, borderRadius: 12, background: '#fff', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', marginBottom: 6 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: c.id === 'news' ? GD : c.id === 'adv' ? G : c.id === 'u13' ? G2 : ROSE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
              {c.id === 'news' ? 'TT' : c.id === 'adv' ? 'ADV' : c.id === 'u13' ? 'U13' : 'DO'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{c.label}</div>
              <div style={{ fontSize: 12, color: MUT }}>{c.preview}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: MUT }}>{c.time}</div>
              {c.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: '50%', background: ROSE, color: INK, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4, marginLeft: 'auto' }}>{c.unread}</div>}
            </div>
          </button>
        ))}
        <div style={{ fontSize: 12, color: MUT, marginTop: 8, lineHeight: 1.5 }}>Nobody's phone number is shared. Families leave these chats when the season ends.</div>
      </div>
    </div>
  )
}

// ─── Players list ─────────────────────────────────────────────────────────────

function PlayersListView({ onPlayer, onReport }: { onPlayer: (name: string, isNew: boolean) => void; onReport: () => void }) {
  const groups = [
    {
      label: 'Advanced · 12 to 14', count: 20,
      players: [
        { ini: 'KO', name: 'Kai Okonkwo', goal: 'Weaker-foot finishing', sessions: '5 of 6', isNew: false },
        { ini: 'AC', name: 'Ana Costa', goal: 'Plan starts after 3 sessions', sessions: '2 so far', isNew: true },
        { ini: 'JM', name: 'Jonah Marsh', goal: 'First touch away from pressure', sessions: '5 of 6', isNew: false },
        { ini: 'ZA', name: 'Zane Abbas', goal: 'Weight of pass', sessions: '4 of 6', isNew: false },
        { ini: 'MW', name: 'Mila Wójcik', goal: 'Receiving on the half turn', sessions: '6 of 6', isNew: false },
      ],
    },
    {
      label: 'Development · 9 to 11', count: 14,
      players: [
        { ini: 'AM', name: 'Arjun Mehta', goal: 'On trial today', sessions: 'Trial', isNew: true },
        { ini: 'LF', name: 'Lola Ferris', goal: '1v1 defending', sessions: '6 of 6', isNew: false },
        { ini: 'FB', name: 'Finn Byrne', goal: 'Striking through the ball', sessions: '5 of 6', isNew: false },
      ],
    },
  ]

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHead title="Players" sub="52 players across 3 groups"
        right={<><Btn label={`Check report drafts · 4`} small primary onClick={onReport}/></>}/>

      {groups.map(g => (
        <div key={g.label}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: MUT, marginBottom: 8 }}>{g.label} · {g.count} players</div>
          <Card>
            {g.players.map((p, i) => (
              <button key={p.ini} onClick={() => onPlayer(p.name, p.isNew)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: 'none', borderBottom: i < g.players.length - 1 ? `1px solid ${LN}` : 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', width: '100%' }}>
                <Ini ini={p.ini} color={p.isNew ? ROSE : G}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: MUT }}>{p.goal}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: MUT }}>{p.sessions}</div>
                </div>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={MUT} strokeWidth={2} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            ))}
          </Card>
        </div>
      ))}
    </div>
  )
}

// ─── Main app ─────────────────────────────────────────────────────────────────

export default function AcademyCoachApp({ onBack, empty = false, initialScreen, onNavChange }: { onBack: () => void; empty?: boolean; initialScreen?: string; onNavChange?: (screen: string) => void }) {
  const [nav, setNav]               = useState<AcademyNav>((initialScreen as AcademyNav) ?? 'today')
  const [todayTab, setTodayTab]     = useState<TodayTab>('overview')
  const [gameDayTab, setGameDayTab] = useState<GameDayTab>('saturday')
  const [playersView, setPlayersView] = useState<PlayersView>('list')
  const [selectedPlayer, setSelectedPlayer] = useState<{ name: string; isNew: boolean } | null>(null)
  const [recordStep, setRecordStep]   = useState<RecordStep>('pick')

  const TODAY_TABS: Array<{ id: TodayTab; label: string }> = [
    { id: 'overview',  label: 'Today' },
    { id: 'runsession', label: 'Run a session' },
    { id: 'trial',     label: 'Trial player' },
    { id: 'oneonone',  label: 'One-on-one' },
    { id: 'record',    label: 'Record' },
    { id: 'suggested', label: 'Suggested' },
    { id: 'chat',      label: 'Chats' },
  ]
  const GAMEDAY_TABS: Array<{ id: GameDayTab; label: string }> = [
    { id: 'saturday',  label: 'This Saturday' },
    { id: 'teamsheet', label: 'Team sheet' },
    { id: 'livegame',  label: 'Live game' },
    { id: 'review',    label: 'Review' },
  ]

  const contextTabs =
    nav === 'today'   ? TODAY_TABS.map(t => t.label) :
    nav === 'gameday' ? GAMEDAY_TABS.map(t => t.label) :
    nav === 'library' ? TODAY_TABS.map(t => t.label) : []
  const activeTabIndex =
    nav === 'today'   ? TODAY_TABS.findIndex(t => t.id === todayTab) :
    nav === 'gameday' ? GAMEDAY_TABS.findIndex(t => t.id === gameDayTab) :
    nav === 'library' ? TODAY_TABS.findIndex(t => t.id === 'suggested') : 0

  // Live recording occupies full screen
  if (nav === 'today' && todayTab === 'record' && recordStep === 'recording') {
    return (
      <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: '#0e1a17', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
        <LiveRecordingView onStop={() => setRecordStep('results')}/>
      </div>
    )
  }

  return (
    <div style={{ width: 1180, minHeight: '100vh', margin: '0 auto', background: 'var(--surface-100)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <header style={{ flex: 'none', background: GD, color: '#fff' }}>
        <div style={{ height: 60, padding: '0 28px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', flexShrink: 0 }}>Clean Sheet</span>
          <nav style={{ display: 'flex', flexGrow: 1, height: 60 }}>
            {(['today', 'players', 'gameday', 'library'] as AcademyNav[]).map(id => (
              <button key={id} onClick={() => { setNav(id); onNavChange?.(id) }} style={{ height: 60, padding: '0 16px', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 15, fontWeight: nav === id ? 700 : 500, color: nav === id ? '#fff' : 'rgba(255,255,255,0.65)', cursor: 'pointer', borderBottom: nav === id ? '3px solid #fff' : '3px solid transparent', textTransform: 'capitalize', boxSizing: 'border-box' as const }}>{id === 'gameday' ? 'Game day' : id.charAt(0).toUpperCase() + id.slice(1)}</button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>Tall Timber Academy</span>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: ROSE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>RW</div>
            <button onClick={onBack} style={{ height: 44, padding: '0 12px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>← Coach view</button>
          </div>
        </div>
        {contextTabs.length > 0 && (
          <div style={{ height: 44, padding: '0 28px', display: 'flex', alignItems: 'flex-end', background: '#fff', borderBottom: `1px solid ${LN}` }}>
            <nav style={{ display: 'flex', flexGrow: 1, height: 44 }}>
              {contextTabs.map((tab, i) => {
                const active = i === activeTabIndex
                return (
                  <button key={tab} onClick={() => {
                    if (nav === 'today') { setTodayTab(TODAY_TABS[i].id); setRecordStep('pick') }
                    if (nav === 'gameday') setGameDayTab(GAMEDAY_TABS[i].id)
                  }} style={{ height: 44, padding: '0 16px', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: active ? 600 : 400, color: active ? INK : MUT, cursor: 'pointer', borderBottom: active ? `3px solid ${G2}` : '3px solid transparent', boxSizing: 'border-box', whiteSpace: 'nowrap' }}>{tab}</button>
                )
              })}
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
              <Badge label="Academy coach" color={G} bg={PALE}/>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <div style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Today tabs */}
        {nav === 'today' && todayTab === 'overview'   && <TodayOverview empty={empty} onRun={() => setTodayTab('runsession')} onTrials={() => setTodayTab('trial')} onReport={() => { setNav('players'); setPlayersView('report') }}/>}
        {nav === 'today' && todayTab === 'runsession' && <RunSessionView empty={empty}/>}
        {nav === 'today' && todayTab === 'trial'      && <TrialView empty={empty}/>}
        {nav === 'today' && todayTab === 'oneonone'   && <OneOnOneView empty={empty}/>}
        {nav === 'today' && todayTab === 'record' && recordStep === 'pick'     && <RecordView empty={empty} onDrill={() => setRecordStep('drill')} onRecording={() => setRecordStep('recording')}/>}
        {nav === 'today' && todayTab === 'record' && recordStep === 'drill'    && <RecordDrillView onStart={() => setRecordStep('recording')}/>}
        {nav === 'today' && todayTab === 'record' && recordStep === 'results'  && <RecordResultsView firstRun={false}/>}
        {nav === 'today' && todayTab === 'suggested'  && <SuggestedView empty={empty}/>}
        {nav === 'today' && todayTab === 'chat'       && <ChatView empty={empty}/>}
        {/* Players */}
        {nav === 'players' && playersView === 'list'   && <PlayersListView onPlayer={(name, isNew) => { setSelectedPlayer({ name, isNew }); setPlayersView('plan') }} onReport={() => setPlayersView('report')}/>}
        {nav === 'players' && playersView === 'plan'   && <PlayerPlanView playerName={selectedPlayer?.name ?? 'Kai Okonkwo'} newPlayer={selectedPlayer?.isNew} onReport={() => setPlayersView('report')}/>}
        {nav === 'players' && playersView === 'report' && <TermReportView empty={empty} onBack={() => setPlayersView('list')}/>}
        {/* Game day */}
        {nav === 'gameday' && gameDayTab === 'saturday'  && <GameDayMainView empty={empty}/>}
        {nav === 'gameday' && gameDayTab === 'teamsheet' && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT, fontSize: 14 }}>Team sheet — coming in Bucket 11</div>
        )}
        {nav === 'gameday' && gameDayTab === 'livegame' && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT, fontSize: 14 }}>Live game — coming in Bucket 11</div>
        )}
        {nav === 'gameday' && gameDayTab === 'review' && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUT, fontSize: 14 }}>Review — coming in Bucket 11</div>
        )}
        {/* Library */}
        {nav === 'library' && <SuggestedView empty={empty} />}
      </div>
    </div>
  )
}
