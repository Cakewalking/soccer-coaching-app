import { useState } from 'react'

type FitnessTab = 'home' | 'squad' | 'training' | 'matchday'
type SquadSubTab = 'growth' | 'injuries' | 'test-results'
type TrainingSubTab = 'tests' | 'her-part' | 'measuring' | 'sprint'
type TeamId = 'u12' | 'u14' | 'u13g' | 'u16'
type HomeSub = 'overview' | 'fitnesslevel'

interface WatchPlayer { ini: string; name: string; note: string; action: string; actionColor: string }
interface StatChip { label: string; value: string; note: string; color: string }

const TEAMS: Array<{ id: TeamId; label: string; level: string; coach: string; players: number }> = [
  { id: 'u12',  label: 'U12 Sam',       level: 'Play level', coach: 'Sam',  players: 16 },
  { id: 'u14',  label: 'U14 Josh',      level: 'Grow level', coach: 'Josh', players: 18 },
  { id: 'u13g', label: 'U13 Girls Meg', level: 'Grow level', coach: 'Meg',  players: 18 },
  { id: 'u16',  label: 'U16 Ollie',     level: 'Grow level', coach: 'Ollie', players: 14 },
]

const PLAYERS_GROWTH = [
  { ini: 'NO', name: 'Noah Okafor',    cm: 149.7, growthCm: 8.4, pain: 'Knee pain ×3' },
  { ini: 'ZH', name: 'Zoe Hartley',   cm: 147.6, growthCm: 8.0, pain: 'Heel pain ×2' },
  { ini: 'JP', name: 'Jai Patel',     cm: 151.2, growthCm: 7.2, pain: null as null },
  { ini: 'RC', name: 'Ruby Chen',     cm: 153.0, growthCm: 6.8, pain: null as null },
  { ini: 'EB', name: 'Ella Brandt',   cm: 150.1, growthCm: 6.4, pain: null as null },
  { ini: 'IM', name: 'Isla Morgan',   cm: 146.3, growthCm: 6.0, pain: null as null },
  { ini: 'MT', name: 'Mia Tran',      cm: 148.8, growthCm: 5.6, pain: null as null },
  { ini: 'LM', name: 'Leo Marsh',     cm: 155.4, growthCm: 5.2, pain: null as null },
  { ini: 'LN', name: 'Lily Nguyen',   cm: 144.9, growthCm: 5.0, pain: null as null },
  { ini: 'GO', name: 'Grace Owusu',   cm: 157.2, growthCm: 4.8, pain: null as null },
  { ini: 'FW', name: 'Finn Walsh',    cm: 146.0, growthCm: 4.8, pain: null as null },
  { ini: 'AL', name: 'Ava Lindqvist', cm: 152.5, growthCm: 4.4, pain: null as null },
  { ini: 'SD', name: 'Sam Delaney',   cm: 145.1, growthCm: 4.4, pain: null as null },
  { ini: 'OB', name: 'Oscar Brennan', cm: 143.8, growthCm: 4.0, pain: null as null },
  { ini: 'KR', name: 'Kai Russo',     cm: 147.4, growthCm: 3.6, pain: null as null },
  { ini: 'TR', name: 'Tom Reyes',     cm: 149.0, growthCm: 3.2, pain: null as null },
]

const INJURIES = [
  { ini: 'KR', name: 'Kai Russo',   injury: 'Tight hamstring · training',   date: 'Sat 30 May', modified: true,  step: 2 },
  { ini: 'TR', name: 'Tom Reyes',   injury: 'Sore wrist · game, fell on it', date: 'Sat 23 May', modified: true,  step: 3 },
  { ini: 'NO', name: 'Noah Okafor', injury: 'Knee pain · growth-related',    date: 'Tue 26 May', modified: true,  step: 1 },
  { ini: 'IM', name: 'Isla Morgan', injury: 'Rolled ankle · training',        date: 'Thu 7 May',  modified: false, step: 4 },
  { ini: 'LM', name: 'Leo Marsh',   injury: 'Knock to the shin · game',       date: 'Sat 18 Apr', modified: false, step: 4 },
]

const TESTS = [
  { name: '10m sprint',         unit: 's',   avg: 1.98, target: 1.90, trend: 'up'   as const },
  { name: 'Standing long jump', unit: 'm',   avg: 1.72, target: 1.80, trend: 'up'   as const },
  { name: 'Yo-Yo level 1',     unit: 'lvl', avg: 14.2, target: 15.0, trend: 'down' as const },
  { name: 'Push-ups max',       unit: 'rep', avg: 24,   target: 28,   trend: 'flat' as const },
]

const EFFORT_DATA: Record<'u14' | 'u13g' | 'u16', {
  sessions: string[]; planned: number[]; actual: number[];
  note: string; status: 'warn' | 'good'; coachLabel: string
}> = {
  u14: {
    sessions: ['Tue 19', 'Thu 21', 'Sat 23', 'Tue 26', 'Thu 28', 'Sat 30', 'Tue 2'],
    planned: [3.5, 4.0, 5.5, 3.5, 4.0, 5.5, 3.5],
    actual:  [5.8, 6.0, 7.0, 6.1, 5.9, 7.2, 6.1],
    note: "Easy Tuesdays aren't feeling easy. Planned 3 to 4, rated 5.8 to 6.1. Shorter small games on Tuesdays would bring it down.",
    status: 'warn', coachLabel: "Josh's plan",
  },
  u13g: {
    sessions: ['Tue 19', 'Thu 21', 'Sat 23', 'Tue 26', 'Thu 28', 'Sat 30', 'Tue 2'],
    planned: [4.0, 5.5, 6.5, 4.0, 5.5, 6.5, 4.0],
    actual:  [4.2, 5.4, 6.6, 3.9, 5.6, 6.3, 4.1],
    note: "On plan. Sessions feel how Meg means them to. Keep the Tuesday and Thursday pattern.",
    status: 'good', coachLabel: "Meg's plan",
  },
  u16: {
    sessions: ['Mon 18', 'Wed 20', 'Sat 23', 'Mon 25', 'Wed 27', 'Sat 30', 'Mon 1'],
    planned: [5.0, 7.0, 7.0, 5.0, 5.0, 7.0, 5.0],
    actual:  [6.5, 8.0, 8.5, 6.5, 7.0, 8.5, 7.5],
    note: "Heavy legs two weeks running. Load up 30% on their usual. Keep Wednesday short too.",
    status: 'warn', coachLabel: "Ollie's plan",
  },
}

const WHO_TO_WATCH: Record<'u14' | 'u13g' | 'u16', WatchPlayer[]> = {
  u14: [
    { ini: 'TB', name: 'Theo Baxter', note: 'Around his growth spurt · +9.1 cm a year · knee pain', action: 'Rest jumps',   actionColor: '#c39797' },
    { ini: 'AS', name: 'Amara Singh',  note: 'Load 40% above her own usual · school sport too',       action: 'Lighter week', actionColor: '#c39797' },
    { ini: 'JL', name: 'Jack Lowe',    note: 'Sleeping 7 hours on average · aim is 8.5 to 9.5',       action: 'Talk to him',  actionColor: '#c3a84a' },
    { ini: 'NW', name: 'Nia Walker',   note: 'Back from ankle sprain · step 3 of 4',                  action: 'Full training', actionColor: '#40826d' },
  ],
  u13g: [
    { ini: 'RB', name: 'Ruby Bell', note: 'Keeper · nominated for more · keep her jump load low while growing', action: 'Watch jumps',  actionColor: '#c3a84a' },
    { ini: 'PJ', name: 'Pia Jensen', note: 'Heel pain twice this month · growing 7.8 cm a year',                action: 'No sprints',   actionColor: '#c39797' },
    { ini: 'KO', name: 'Kira Obi',   note: 'Netball 3 times a week too · load 25% above her usual',            action: 'Lighter week', actionColor: '#c39797' },
  ],
  u16: [
    { ini: 'TO', name: 'Theo Ortiz', note: 'Back from a hamstring strain · step 4 of 4 · minutes rising', action: 'Full training',  actionColor: '#40826d' },
    { ini: 'CW', name: 'Cal West',   note: 'Load 45% above his usual · plays school footy too',          action: 'Rest Wednesday', actionColor: '#c39797' },
    { ini: 'DM', name: 'Dev Mehta',  note: 'Sleeping 6.5 hours on average · exams',                     action: 'Talk to him',    actionColor: '#c3a84a' },
  ],
}

const STAT_CHIPS: Record<'u14' | 'u13g' | 'u16', StatChip[]> = {
  u14: [
    { label: 'Around growth spurt', value: '6 of 18', note: 'Maturity estimate · coaches only', color: '#10211f' },
    { label: 'Wellness',            value: '3.7 / 5',  note: 'Sleep is the low score',          color: '#c3a84a' },
    { label: 'Sprint test',         value: '5 improved', note: 'Real change since February',    color: '#2f6252' },
    { label: '30-15 running test',  value: 'Due 17 Jun', note: 'Sets running speeds',           color: '#c39797' },
  ],
  u13g: [
    { label: 'Around growth spurt', value: '5 of 18', note: 'Maturity estimate · coaches only', color: '#10211f' },
    { label: 'Wellness',            value: '4.0 / 5',  note: 'Mood is the high score',          color: '#2f6252' },
    { label: 'Sprint test',         value: '4 improved', note: 'Real change since February',    color: '#2f6252' },
    { label: 'Heights',             value: 'Thu 11 Jun', note: 'Before training · 10 min',     color: '#c3a84a' },
  ],
  u16: [
    { label: 'Load this week',  value: '+30%',       note: 'Two weeks running',             color: '#c39797' },
    { label: 'Wellness',        value: '3.4 / 5',   note: 'Soreness is the low score',     color: '#c39797' },
    { label: 'Yo-Yo test',      value: '9 improved', note: 'Since pre-season',             color: '#2f6252' },
    { label: 'GPS vests',       value: '14 of 14',  note: 'All working this week',         color: '#40826d' },
  ],
}

function SubTabBar({ tabs, active, onSelect }: { tabs: { id: string; label: string }[]; active: string; onSelect: (id: string) => void }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #e9eae8', background: '#fff', flexShrink: 0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onSelect(t.id)} style={{
          flex: 1, height: 42, border: 0, background: 'transparent', fontFamily: 'inherit',
          fontSize: 13, fontWeight: active === t.id ? 700 : 400, cursor: 'pointer',
          color: active === t.id ? '#1f4a3e' : '#6f7f7b',
          borderBottom: active === t.id ? '2px solid #1f4a3e' : '2px solid transparent',
        }}>{t.label}</button>
      ))}
    </div>
  )
}

function EffortChart({ data }: { data: { sessions: string[]; planned: number[]; actual: number[]; note: string; status: 'warn' | 'good'; coachLabel: string } }) {
  const W = 400, H = 80, PX = 14, PY = 6
  const n = data.sessions.length
  const scaleY = (v: number) => H - PY - ((v / 10) * (H - 2 * PY))
  const scaleX = (i: number) => PX + (i / (n - 1)) * (W - 2 * PX)
  const makePath = (vals: number[]) => vals.map((v, i) => `${i === 0 ? 'M' : 'L'}${scaleX(i).toFixed(1)},${scaleY(v).toFixed(1)}`).join(' ')
  const lineColor = data.status === 'warn' ? '#c39797' : '#40826d'
  return (
    <div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 6, fontSize: 11, color: '#6f7f7b', alignItems: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <svg width="18" height="8" aria-hidden="true"><line x1="0" y1="4" x2="18" y2="4" stroke="#cbbeb5" strokeWidth="1.5" strokeDasharray="4 2"/></svg>
          {data.coachLabel}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <svg width="18" height="8" aria-hidden="true"><line x1="0" y1="4" x2="18" y2="4" stroke={lineColor} strokeWidth="2"/></svg>
          Players' rating
        </span>
        <span style={{ marginLeft: 'auto', fontWeight: 600 }}>Out of 10</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H + 18}`} width="100%" style={{ display: 'block' }}>
        {[0, 5, 10].map(v => (
          <g key={v}>
            <line x1={PX} y1={scaleY(v)} x2={W - PX} y2={scaleY(v)} stroke="#f0f1f0" strokeWidth="1"/>
            <text x={PX - 3} y={scaleY(v) + 3} textAnchor="end" fontSize="8" fill="#c5c8c4">{v}</text>
          </g>
        ))}
        <path d={makePath(data.planned)} fill="none" stroke="#cbbeb5" strokeWidth="1.5" strokeDasharray="4 2" strokeLinecap="round"/>
        <path d={makePath(data.actual)} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round"/>
        {data.actual.map((v, i) => (
          <circle key={i} cx={scaleX(i)} cy={scaleY(v)} r="2.5" fill={lineColor}/>
        ))}
        {data.sessions.map((s, i) => (
          <text key={i} x={scaleX(i)} y={H + 14} textAnchor="middle" fontSize="8.5" fill="#6f7f7b">{s}</text>
        ))}
      </svg>
      <div style={{ fontSize: 12, color: data.status === 'warn' ? '#9d7c80' : '#4a5a57', lineHeight: '1.5', marginTop: 8, padding: '8px 10px', background: data.status === 'warn' ? '#fdf8f8' : '#f5faf7', borderRadius: 8, border: `1px solid ${data.status === 'warn' ? '#f0d8d8' : '#c5dfcf'}` }}>
        {data.note}
      </div>
    </div>
  )
}

export default function FitnessCoachScreen({ empty }: { empty?: boolean }) {
  const [tab, setTab]           = useState<FitnessTab>('home')
  const [squadSub, setSquadSub] = useState<SquadSubTab>('growth')
  const [trainSub, setTrainSub] = useState<TrainingSubTab>('tests')
  const [teamId, setTeamId]     = useState<TeamId>('u12')
  const [homeSub, setHomeSub]   = useState<HomeSub>('overview')
  const [selectedGrowth, setSelectedGrowth] = useState<string | null>('NO')
  const [showLogInjury, setShowLogInjury]   = useState(false)
  const [logStep, setLogStep]   = useState(1)
  const [showRPE, setShowRPE]   = useState(false)
  const [rpePlayer, setRpePlayer] = useState(0)
  const [rpeScore, setRpeScore]   = useState<number | null>(null)
  const [rpeHurt, setRpeHurt]     = useState<'no' | 'yes' | null>(null)
  const [rpeFun, setRpeFun]       = useState<'nope' | 'ok' | 'loved' | null>(null)

  const RPE_PLAYERS = ['Mia T', 'Noah O', 'Ella B', 'Jai P', 'Zoe H', 'Grace O', 'Liam H', 'Finn W', 'Ruby C', 'Isla M', 'Leo M']
  const RPE_EMOJIS = [
    { v: 0,  label: 'Nothing',    emoji: '😴' },
    { v: 2,  label: 'Very light', emoji: '🙂' },
    { v: 4,  label: 'Moderate',   emoji: '😐' },
    { v: 6,  label: 'Hard',       emoji: '😤' },
    { v: 8,  label: 'Very hard',  emoji: '😰' },
    { v: 10, label: 'Max',        emoji: '🤯' },
  ]

  const currentTeam = TEAMS.find(t => t.id === teamId)!

  if (empty) {
    return (
      <div style={{ background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
        <div style={{ background: '#1f4a3e', padding: '20px 24px 16px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>U12 Sam · Play level · Fitness coach</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Hi Priya</div>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>PS</div>
          </div>
        </div>
        <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
          <div style={{ fontSize: 15, color: '#4a5a57' }}>U12 Sam · Play level · no data yet</div>
          <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Start with heights</div>
            <div style={{ fontSize: 14, color: '#4a5a57', lineHeight: 1.6, marginBottom: 16 }}>Measure the squad once, then Clean Sheet flags anyone growing fast and sets safe sprint and jump limits. Effort and pain check-ins start after the first session.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ height: 40, padding: '0 16px', borderRadius: 999, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Plan a measuring session</button>
              <button style={{ height: 40, padding: '0 16px', borderRadius: 999, border: '1px solid #c5c8c4', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Check the fitness level</button>
            </div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' as const, color: '#6f7f7b', marginBottom: 4 }}>What fills in first</div>
          {[
            { label: 'Growth',         desc: 'After your first measuring session' },
            { label: 'Effort and pain', desc: 'Players tap after each session' },
            { label: 'Load',            desc: 'From boot sensors, from U12' },
          ].map(item => (
            <div key={item.label} style={{ padding: '10px 0', borderTop: '1px solid #e9eae8' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{item.label}</div>
              <div style={{ fontSize: 12, color: '#4a5a57' }}>{item.desc}</div>
            </div>
          ))}
          <div style={{ padding: '12px 14px', background: '#eef5f2', borderRadius: 10, fontSize: 13, color: '#2f6252' }}>At Play level you see a few simple flags, not charts. That's on purpose.</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#f7f9f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>

      {/* Header */}
      <div style={{ background: '#1f4a3e', padding: '20px 24px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>{currentTeam.label} · {currentTeam.level} · Fitness coach</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>Fitness overview</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '999px', background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>PS</div>
        </div>
      </div>

      {/* Top tab nav */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e9eae8', background: '#fff', flexShrink: 0 }}>
        {([
          { id: 'home' as FitnessTab, label: 'Home' },
          { id: 'squad' as FitnessTab, label: 'Squad' },
          { id: 'training' as FitnessTab, label: 'Training' },
          { id: 'matchday' as FitnessTab, label: 'Match day' },
        ] as const).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, height: 44, border: 0, background: 'transparent', fontFamily: 'inherit',
            fontSize: 13, fontWeight: tab === t.id ? 700 : 400, cursor: 'pointer',
            color: tab === t.id ? '#1f4a3e' : '#6f7f7b',
            borderBottom: tab === t.id ? '2px solid #1f4a3e' : '2px solid transparent',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto' }}>

        {/* ── HOME TAB ── */}
        {tab === 'home' && (
          <div>
            {/* Team picker */}
            <div style={{ padding: '14px 20px 0', display: 'flex', gap: 7, flexWrap: 'wrap' as const }}>
              {TEAMS.map(t => (
                <button key={t.id} onClick={() => setTeamId(t.id)} style={{
                  height: 32, padding: '0 12px', borderRadius: '999px',
                  border: `1px solid ${teamId === t.id ? '#2f6252' : '#e9eae8'}`,
                  background: teamId === t.id ? '#2f6252' : '#fff',
                  color: teamId === t.id ? '#fff' : '#6f7f7b',
                  fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}>{t.label}</button>
              ))}
            </div>

            {/* Home sub-tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e9eae8', background: '#fff', margin: '12px 0 0' }}>
              {([{ id: 'overview' as HomeSub, label: 'Overview' }, { id: 'fitnesslevel' as HomeSub, label: 'Fitness level' }] as const).map(s => (
                <button key={s.id} onClick={() => setHomeSub(s.id)} style={{
                  flex: 1, height: 42, border: 0, background: 'transparent', fontFamily: 'inherit',
                  fontSize: 13, fontWeight: homeSub === s.id ? 700 : 400, cursor: 'pointer',
                  color: homeSub === s.id ? '#1f4a3e' : '#6f7f7b',
                  borderBottom: homeSub === s.id ? '2px solid #1f4a3e' : '2px solid transparent',
                }}>{s.label}</button>
              ))}
            </div>

            <div style={{ padding: '16px 20px' }}>

              {/* ── OVERVIEW: U12 (Play level) ── */}
              {homeSub === 'overview' && teamId === 'u12' && (
                <>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>Hi Priya</div>
                  <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 16 }}>U12 Sam · Thursday 4 Jun · training 5:45 pm · Harbour Rovers on Saturday</div>

                  {/* Growth watch */}
                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', marginBottom: 14, overflow: 'hidden' }}>
                    <div style={{ padding: '12px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Growth watch</div>
                        <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2, lineHeight: '1.4', maxWidth: 240 }}>Growing 7 cm a year or more. Knee and heel pain at this stage needs rest, not pushing through.</div>
                      </div>
                      <span style={{ fontSize: 12, color: '#4a5a57', flexShrink: 0, marginLeft: 12 }}>All 16</span>
                    </div>
                    {[
                      { ini: 'NO', name: 'Noah Okafor', note: 'Knee pain after 3 sessions · no jumps, sprints capped', rate: '+8.4', isPain: true },
                      { ini: 'ZH', name: 'Zoe Hartley',  note: 'Heel pain twice this week · no jumps, sprints capped',  rate: '+8.0', isPain: true },
                      { ini: 'JP', name: 'Jai Patel',    note: 'Growing fast, no pain · keep an eye',                    rate: '+7.2', isPain: false },
                    ].map((p, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderTop: '1px solid #f0f1f0' }}>
                        <div style={{ width: 32, height: 32, borderRadius: '999px', background: p.isPain ? '#fdf4f4' : '#fdf8ed', color: p.isPain ? '#c39797' : '#c3a84a', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.ini}</div>
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{p.name}</div>
                          <div style={{ fontSize: 12, color: '#6f7f7b' }}>{p.note}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: p.isPain ? '#c39797' : '#c3a84a' }}>{p.rate}</div>
                          <div style={{ fontSize: 10, color: '#6f7f7b' }}>cm/year</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ padding: '10px 16px', borderTop: '1px solid #f0f1f0', fontSize: 12, color: '#6f7f7b' }}>
                      Whole squad · <span style={{ color: '#2f6252', fontWeight: 600, cursor: 'pointer' }}>Measuring due Thu 11 Jun · Plan it</span>
                    </div>
                  </div>

                  {/* Your part tonight */}
                  <div style={{ background: '#1f4a3e', borderRadius: 16, padding: '14px 16px', marginBottom: 14, color: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>Your part tonight</div>
                      <button style={{ height: 28, padding: '0 12px', borderRadius: '999px', border: 0, background: '#40826d', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Open</button>
                    </div>
                    {[
                      { time: '5:45', label: '11+ Kids warm-up', detail: '15 min · you lead · Noah and Zoe skip the jumps' },
                      { time: '6:00', label: 'Rondo, then win it back (Sam)',   detail: "35 min · you count Noah and Zoe's sprints" },
                      { time: '6:35', label: 'Small game (Sam)',                detail: '30 min · note who fades late' },
                      { time: '7:05', label: 'Cool-down and pain check',        detail: '10 min · sore knees or heels?' },
                    ].map((s, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', width: 36, flexShrink: 0 }}>{s.time}</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{s.label}</div>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{s.detail}</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: 10, padding: '8px 10px', background: 'rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: '1.5' }}>
                      <span style={{ fontWeight: 700, color: '#fff' }}>Adjust tonight: </span>
                      Noah, Zoe · no jumps, 3 sprints max · Kai · passing only · Tom · no diving saves
                    </div>
                  </div>

                  {/* This week */}
                  <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', padding: '14px 16px' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>This week</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {[
                        { label: '11+ Kids warm-up',  value: '1 of 2 done', note: 'cut short Tue',      color: '#c39797' },
                        { label: 'Effort ratings',     value: '13 of 16 rated Tuesday', note: null,      color: '#10211f' },
                        { label: 'Pain reports',       value: '3 this week', note: 'all followed up',    color: '#c3a84a' },
                        { label: 'Game time',          value: 'All played half or more', note: null,     color: '#2f6252' },
                        { label: 'Sprint race test',   value: 'Due', note: 'last run 1 Mar',             color: '#c39797' },
                        { label: 'Modified training',  value: 'Kai, Tom', note: 'hamstring · wrist',    color: '#6f7f7b' },
                      ].map((item, i) => (
                        <div key={i} style={{ background: '#f5f6f4', borderRadius: 10, padding: '10px 12px' }}>
                          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' as const, color: '#6f7f7b', marginBottom: 3 }}>{item.label}</div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.value}</div>
                          {item.note && <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 1 }}>{item.note}</div>}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 12, padding: '8px 12px', background: '#eef5f2', borderRadius: 10, fontSize: 12, color: '#4a5a57' }}>
                      72% said they loved it after Tuesday. 3 said "not really."
                    </div>
                    <div style={{ marginTop: 8, fontSize: 11, color: '#6f7f7b' }}>Play level, set by age · no load targets or rankings. Your U14 and U16 teams show more.</div>
                  </div>
                </>
              )}

              {/* ── OVERVIEW: Grow teams (U14 / U13G / U16) ── */}
              {homeSub === 'overview' && (teamId === 'u14' || teamId === 'u13g' || teamId === 'u16') && (() => {
                const growId = teamId as 'u14' | 'u13g' | 'u16'
                const eff = EFFORT_DATA[growId]
                const watch = WHO_TO_WATCH[growId]
                const stats = STAT_CHIPS[growId]
                return (
                  <>
                    {/* U16-only alert */}
                    {teamId === 'u16' && (
                      <div style={{ background: '#fdf4f4', borderRadius: 12, padding: '10px 14px', marginBottom: 14, border: '1px solid #f0d8d8', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 16, flexShrink: 0, lineHeight: '20px' }}>⚠</span>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#9d7c80' }}>Heavy legs two weeks running</div>
                          <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 1 }}>Load +30% on their usual. Keep Wednesday short.</div>
                        </div>
                      </div>
                    )}

                    {/* Effort chart */}
                    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', padding: '14px 16px', marginBottom: 14 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Planned effort vs how hard it felt</div>
                      <EffortChart data={eff} />
                    </div>

                    {/* Who to watch */}
                    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', marginBottom: 14, overflow: 'hidden' }}>
                      <div style={{ padding: '12px 16px 8px', fontSize: 14, fontWeight: 700, color: '#10211f' }}>Who to watch</div>
                      {watch.map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderTop: '1px solid #f0f1f0' }}>
                          <div style={{ width: 32, height: 32, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.ini}</div>
                          <div style={{ flexGrow: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{p.name}</div>
                            <div style={{ fontSize: 12, color: '#6f7f7b' }}>{p.note}</div>
                          </div>
                          <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: p.actionColor, background: p.actionColor + '22', borderRadius: '999px', padding: '3px 10px', whiteSpace: 'nowrap' as const }}>{p.action}</span>
                        </div>
                      ))}
                      {teamId === 'u14' && <div style={{ padding: '8px 16px', borderTop: '1px solid #f0f1f0', fontSize: 12, color: '#6f7f7b' }}>6 total · 4 more players around their growth spurt, no pain</div>}
                      {teamId === 'u16' && <div style={{ padding: '8px 16px', borderTop: '1px solid #f0f1f0', fontSize: 12, color: '#6f7f7b' }}>4 players under a third of game time · on the coach meeting agenda</div>}
                      <div style={{ padding: '8px 16px', borderTop: '1px solid #f0f1f0', fontSize: 11, color: '#6f7f7b' }}>Names in growth and wellness stay with the coaches. The director sees counts only.</div>
                    </div>

                    {/* Stat chips */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                      {stats.map((s, i) => (
                        <div key={i} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e9eae8', padding: '12px 14px' }}>
                          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' as const, color: '#6f7f7b', marginBottom: 3 }}>{s.label}</div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</div>
                          <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{s.note}</div>
                        </div>
                      ))}
                    </div>
                    <button style={{ width: '100%', height: 40, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                      Send Tuesday's plan to {currentTeam.coach}
                    </button>
                  </>
                )
              })()}

              {/* ── FITNESS LEVEL sub-tab ── */}
              {homeSub === 'fitnesslevel' && (
                <>
                  <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 14 }}>{currentTeam.label} · set from the age group · decides what the app collects and shows</div>
                  {[
                    {
                      id: 'play', label: 'Play', ages: 'U6 to U12', tagline: 'Safe, enjoying it, fair game time',
                      features: ['Game time and warm-up', 'Growth every 3 months', 'Knocks and pain', 'Quick check-ins (parents switch on)', 'Fun challenges, personal bests'],
                      not: ['Load targets', 'Rankings'],
                      who: ['Coach · game time, warm-up tick', 'Parents · pain, other sport', 'Player · effort, fun, how they feel', 'Boots · touches, top speed'],
                      time: 'About 10 seconds after a session',
                      active: teamId === 'u12',
                    },
                    {
                      id: 'grow', label: 'Grow', ages: 'U13 to U16', tagline: 'Protect them through the growth spurt',
                      features: ['Everything in Play', 'Maturity estimate', 'Effort ratings and wellness', 'Load vs their own usual', '3 tests a season', 'Injury predictions'],
                      not: ['Adult norms'],
                      who: ['Players · effort, wellness', 'Parents · heights at home', 'Fitness · growth checks, tests', 'Vests · running load'],
                      time: 'About 30 seconds a day',
                      active: teamId === 'u14' || teamId === 'u13g' || teamId === 'u16',
                    },
                    {
                      id: 'perform', label: 'Perform', ages: 'U17 to amateur seniors', tagline: 'Fit enough, who needs a lighter week',
                      features: ['Everything in Grow', 'Sprint and high-speed running', 'Weekly load trend', 'Cycle tracking, player-owned', 'Lab tests'],
                      not: [] as string[],
                      who: ['Players · effort, wellness, cycle if they choose', 'Vests · speed bands', 'Fitness · tests, injuries'],
                      time: 'About 45 seconds a day',
                      active: false,
                    },
                    {
                      id: 'pro', label: 'Pro', ages: 'Semi-pro, NPL, academy', tagline: 'Who is ready today',
                      features: ['Everything in Perform', 'Heart rate and jump fatigue checks', 'Return-to-play steps', 'Imports from your systems'],
                      not: [] as string[],
                      who: ['Staff · everything above', 'Imports · heart rate, jump platforms'],
                      time: 'Set by the club',
                      active: false,
                    },
                  ].map((level, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 14, border: `2px solid ${level.active ? '#2f6252' : '#e9eae8'}`, padding: '14px 16px', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 16, fontWeight: 800, color: '#10211f' }}>{level.label}</span>
                        <span style={{ fontSize: 12, color: '#6f7f7b' }}>{level.ages}</span>
                        {level.active && <span style={{ fontSize: 11, fontWeight: 700, background: '#eef5f2', color: '#2f6252', borderRadius: '999px', padding: '2px 8px', marginLeft: 'auto' }}>This team</span>}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#4a5a57', marginBottom: 10 }}>{level.tagline}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 5, marginBottom: 10 }}>
                        {level.features.map((f, j) => (
                          <span key={j} style={{ fontSize: 11, color: '#10211f', background: '#f5f6f4', borderRadius: 6, padding: '3px 8px' }}>{f}</span>
                        ))}
                        {level.not.map((f, j) => (
                          <span key={j} style={{ fontSize: 11, color: '#6f7f7b', background: '#f5f6f4', borderRadius: 6, padding: '3px 8px', textDecoration: 'line-through' }}>{f}</span>
                        ))}
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#6f7f7b', marginBottom: 4 }}>Who puts data in</div>
                      {level.who.map((w, j) => <div key={j} style={{ fontSize: 12, color: '#4a5a57', padding: '1px 0' }}>{w}</div>)}
                      <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, color: '#10211f' }}>
                        Time per player · <span style={{ fontWeight: 400, color: '#6f7f7b' }}>{level.time}</span>
                      </div>
                    </div>
                  ))}
                  <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '1.6', background: '#f5f6f4', borderRadius: 10, padding: '10px 12px' }}>
                    Collect only what the level needs. Children's privacy rules ask for the least data by default. Parents switch each extra on.
                  </div>
                </>
              )}

            </div>
          </div>
        )}

        {/* ── SQUAD TAB ── */}
        {tab === 'squad' && (
          <div>
            <SubTabBar
              tabs={[{ id: 'growth', label: 'Growth' }, { id: 'injuries', label: 'Injuries' }, { id: 'test-results', label: 'Test results over time' }]}
              active={squadSub}
              onSelect={id => setSquadSub(id as SquadSubTab)}
            />
            <div style={{ padding: '16px 20px' }}>

              {/* ── GROWTH ── */}
              {squadSub === 'growth' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Growth · U12 Sam</div>
                      <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>Every 3 months · last 11 Mar · next due Thu 11 Jun · flag at 7 cm a year</div>
                    </div>
                    <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>Start measuring</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

                    {/* Player table */}
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 72px 44px', padding: '8px 14px', borderBottom: '1px solid #f0f1f0', gap: 8 }}>
                        {['PLAYER', 'HEIGHT', 'CM / YEAR', ''].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
                      </div>
                      {PLAYERS_GROWTH.map((p, i) => {
                        const isSel = selectedGrowth === p.ini
                        return (
                          <button key={i} onClick={() => setSelectedGrowth(isSel ? null : p.ini)} style={{
                            display: 'grid', gridTemplateColumns: '1fr 64px 72px 44px', width: '100%', padding: '10px 14px',
                            borderTop: i === 0 ? 'none' : '1px solid #f0f1f0', gap: 8, alignItems: 'center',
                            background: isSel ? '#f0f8f4' : 'transparent', cursor: 'pointer', border: 0,
                            fontFamily: 'inherit', textAlign: 'left',
                          }}>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                              <div style={{ width: 24, height: 24, borderRadius: '999px', background: isSel ? '#2f6252' : '#cbbeb5', color: isSel ? '#fff' : '#10211f', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.ini}</div>
                              <span style={{ fontSize: 12, fontWeight: isSel ? 700 : 400, color: '#10211f' }}>{p.name}</span>
                            </div>
                            <span style={{ fontSize: 12, color: '#6f7f7b' }}>{p.cm}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: p.growthCm >= 7 ? '#c39797' : '#10211f' }}>+{p.growthCm}</span>
                            <span style={{ fontSize: 11, color: p.pain ? '#c39797' : '#c5c8c4' }}>{p.pain ? '⚠' : '—'}</span>
                          </button>
                        )
                      })}
                      <div style={{ padding: '8px 14px', borderTop: '1px solid #f0f1f0', fontSize: 11, color: '#6f7f7b' }}>All 16, fastest first. Parents can add heights between sessions.</div>
                    </div>

                    {/* Detail panel */}
                    {selectedGrowth ? (() => {
                      const p = PLAYERS_GROWTH.find(pp => pp.ini === selectedGrowth)
                      if (!p) return null
                      const isNoah = p.ini === 'NO'
                      const q = p.growthCm / 4
                      const heights = [p.cm - q * 3, p.cm - q * 2, p.cm - q, p.cm]
                      const W2 = 220, H2 = 70, P2 = 10
                      const allH = [...heights, heights[3] + q]
                      const minH = Math.min(...allH) - 1, maxH = Math.max(...allH) + 1
                      const sx = (i: number) => P2 + (i / 4) * (W2 - 2 * P2)
                      const sy = (v: number) => H2 - P2 - ((v - minH) / (maxH - minH)) * (H2 - 2 * P2)
                      const solidPath = heights.map((v, i) => `${i === 0 ? 'M' : 'L'}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(' ')
                      const proj = `M${sx(3).toFixed(1)},${sy(heights[3]).toFixed(1)} L${sx(4).toFixed(1)},${sy(heights[3] + q).toFixed(1)}`
                      const chartLabels = ['Jun 25', 'Sep', 'Dec', 'Mar', 'Jun']
                      return (
                        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 36, height: 36, borderRadius: '999px', background: p.growthCm >= 7 ? '#fdf4f4' : '#cbbeb5', color: p.growthCm >= 7 ? '#c39797' : '#10211f', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.ini}</div>
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{p.name}</div>
                              <div style={{ fontSize: 12, color: '#6f7f7b' }}>+{p.growthCm} cm/year · {p.cm} cm now</div>
                            </div>
                          </div>
                          <div>
                            <svg viewBox={`0 0 ${W2} ${H2 + 16}`} width="100%" style={{ display: 'block' }}>
                              <path d={solidPath} fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round"/>
                              <path d={proj} fill="none" stroke="#2f6252" strokeWidth="1.5" strokeDasharray="4 2" strokeLinecap="round"/>
                              {heights.map((v, i) => <circle key={i} cx={sx(i)} cy={sy(v)} r="3" fill="#2f6252"/>)}
                              {chartLabels.map((l, i) => <text key={i} x={sx(i)} y={H2 + 13} textAnchor="middle" fontSize="8" fill="#6f7f7b">{l}</text>)}
                            </svg>
                            <div style={{ fontSize: 11, color: '#6f7f7b', textAlign: 'center', marginTop: 2 }}>Dotted: projected if growing continues at this rate</div>
                          </div>
                          {p.pain && (
                            <div style={{ background: '#fdf8f8', borderRadius: 10, padding: '10px 12px', border: '1px solid #f0d8d8' }}>
                              <div style={{ fontSize: 12, fontWeight: 700, color: '#9d7c80', marginBottom: isNoah ? 4 : 0 }}>{p.pain}</div>
                              {isNoah && <div style={{ fontSize: 12, color: '#6f7f7b', lineHeight: '1.5' }}>Pain just below the kneecap. Common in fast growth. No jumps and fewer sprints until it settles. Suggest parents see a physio if it lasts.</div>}
                            </div>
                          )}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {(isNoah
                              ? [{ label: 'Sprint cap', value: '3 a session' }, { label: 'Jumps', value: 'Off until pain-free' }, { label: 'Parent told', value: 'Dan, Tue 2 Jun' }]
                              : [{ label: 'Growth rate', value: `+${p.growthCm} cm/year` }, { label: 'Status', value: p.growthCm >= 7 ? 'Fast growth · watch' : 'Normal growth' }]
                            ).map((item, j) => (
                              <div key={j} style={{ background: '#f5f6f4', borderRadius: 8, padding: '8px 10px' }}>
                                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, color: '#6f7f7b', letterSpacing: '0.05em', marginBottom: 2 }}>{item.label}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{item.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })() : (
                      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6f7f7b', fontSize: 14, minHeight: 120 }}>Select a player</div>
                    )}
                  </div>
                </>
              )}

              {/* ── INJURIES ── */}
              {squadSub === 'injuries' && (
                <>
                  {/* Stats header */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
                    {[
                      { label: 'This season', value: '7', note: 'injuries' },
                      { label: 'Days missed', value: '19', note: 'total' },
                      { label: 'In training',  value: '4 of 7', note: 'happened training' },
                      { label: 'Saw a doctor', value: '2', note: 'this season' },
                    ].map((s, i) => (
                      <div key={i} style={{ background: '#fff', borderRadius: 10, border: '1px solid #e9eae8', padding: '10px 12px' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, color: '#6f7f7b', letterSpacing: '0.05em', marginBottom: 2 }}>{s.label}</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#10211f' }}>{s.value}</div>
                        <div style={{ fontSize: 11, color: '#6f7f7b' }}>{s.note}</div>
                      </div>
                    ))}
                  </div>

                  {/* Injury table */}
                  <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', overflow: 'hidden', marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: '1px solid #f0f1f0' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>U12 Sam · 3 on modified training · 2 back this season</div>
                      <button onClick={() => { setShowLogInjury(v => !v); setLogStep(1) }} style={{ height: 30, padding: '0 12px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Log an injury</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 72px 80px', padding: '8px 16px', borderBottom: '1px solid #f0f1f0', gap: 8 }}>
                      {['PLAYER', 'WHAT AND WHEN', 'TRAINING', 'STEPS BACK'].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
                    </div>
                    {INJURIES.map((inj, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 72px 80px', padding: '10px 16px', borderTop: i === 0 ? 'none' : '1px solid #f0f1f0', gap: 8, alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{inj.ini}</div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{inj.name}</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 12, color: '#10211f' }}>{inj.injury}</div>
                          <div style={{ fontSize: 11, color: '#6f7f7b' }}>{inj.date}</div>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: inj.modified ? '#c39797' : '#40826d' }}>{inj.modified ? 'Modified' : 'Back'}</span>
                        <div style={{ display: 'flex', gap: 3 }}>
                          {[1, 2, 3, 4].map(n => (
                            <div key={n} style={{ width: 12, height: 12, borderRadius: 3, background: n <= inj.step ? '#2f6252' : '#e9eae8' }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Log injury form */}
                  {showLogInjury && (
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', padding: '14px 16px', marginBottom: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Log an injury</div>
                        <div style={{ display: 'flex', gap: 5 }}>
                          {[1, 2, 3].map(n => <div key={n} style={{ width: 24, height: 4, borderRadius: 2, background: n <= logStep ? '#2f6252' : '#e9eae8' }} />)}
                        </div>
                      </div>
                      {logStep === 1 && (
                        <>
                          <div style={{ fontSize: 12, fontWeight: 700, color: '#6f7f7b', marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>1 · Who</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 7, marginBottom: 14 }}>
                            {PLAYERS_GROWTH.slice(0, 10).map(p => (
                              <button key={p.ini} style={{ height: 32, padding: '0 12px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 18, height: 18, borderRadius: '999px', background: '#cbbeb5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#10211f' }}>{p.ini}</div>
                                {p.name.split(' ')[0]}
                              </button>
                            ))}
                          </div>
                          <button onClick={() => setLogStep(2)} style={{ width: '100%', height: 40, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Next →</button>
                        </>
                      )}
                      {logStep === 2 && (
                        <>
                          <div style={{ fontSize: 12, fontWeight: 700, color: '#6f7f7b', marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>2 · What happened</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                            {['Training', 'Game', 'No contact', 'Contact'].map(opt => (
                              <button key={opt} style={{ height: 40, borderRadius: 10, border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>{opt}</button>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => setLogStep(1)} style={{ flex: 1, height: 40, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
                            <button onClick={() => setLogStep(3)} style={{ flex: 2, height: 40, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Next →</button>
                          </div>
                        </>
                      )}
                      {logStep === 3 && (
                        <>
                          <div style={{ fontSize: 12, fontWeight: 700, color: '#6f7f7b', marginBottom: 8, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>3 · Can they train?</div>
                          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                            {['Yes', 'Light only', 'No'].map(opt => (
                              <button key={opt} style={{ flex: 1, height: 40, borderRadius: 10, border: '1px solid #e9eae8', background: '#fff', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>{opt}</button>
                            ))}
                          </div>
                          <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 12 }}>Parent and Sam are told when you save. Player starts at step 2 of 4.</div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => setLogStep(2)} style={{ flex: 1, height: 40, borderRadius: 10, border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
                            <button onClick={() => { setShowLogInjury(false); setLogStep(1) }} style={{ flex: 2, height: 40, borderRadius: 10, border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save</button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* 4-step return protocol */}
                  <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Return to training · 4 steps</div>
                    {[
                      { n: 1, title: 'Pain-free day to day',  sub: 'Walking, stairs, school' },
                      { n: 2, title: 'Light training',        sub: 'Warm-up and passing' },
                      { n: 3, title: 'Full training',         sub: 'All drills, no limits' },
                      { n: 4, title: 'Ready for games',       sub: 'Fitness coach signs off' },
                    ].map(step => (
                      <div key={step.n} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: step.n > 1 ? '1px solid #f0f1f0' : 'none' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#eef5f2', color: '#2f6252', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{step.n}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{step.title}</div>
                          <div style={{ fontSize: 12, color: '#6f7f7b' }}>{step.sub}</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: 12, padding: '10px 12px', background: '#fdf8f4', borderRadius: 10, border: '1px solid #f0dcc8', fontSize: 12, color: '#6f7f7b', lineHeight: '1.5' }}>
                      Head knocks are different. If in doubt, sit them out. Under 19s need 14 days symptom-free before contact training and at least 21 days before a game, with a doctor's OK.
                    </div>
                  </div>
                </>
              )}

              {/* ── TEST RESULTS ── */}
              {squadSub === 'test-results' && (() => {
                const HISTORY = [
                  { ini: 'MT', name: 'Mia Tran',      data: [1.86, 1.89, 1.92, 1.91, 1.95], best: 1.95, change: '+0.09', real: true  },
                  { ini: 'NO', name: 'Noah Owusu',    data: [1.74, 1.78, 1.80, 1.84, 1.88], best: 1.88, change: '+0.14', real: true  },
                  { ini: 'EB', name: 'Ella Brennan',  data: [1.65, 1.67, 1.66, 1.68, 1.70], best: 1.70, change: '+0.05', real: false },
                  { ini: 'JP', name: 'Jai Patel',     data: [1.80, 1.82, 1.81, 1.83, 1.85], best: 1.85, change: '+0.05', real: false },
                  { ini: 'ZH', name: 'Zoe Harris',    data: [1.58, 1.61, 1.63, 1.65, 1.68], best: 1.68, change: '+0.10', real: true  },
                  { ini: 'GO', name: 'Grace Owusu',   data: [1.70, 1.73, 1.75, 1.78, 1.82], best: 1.82, change: '+0.12', real: true  },
                ]
                const MONTHS = ['Aug', 'Sep', 'Oct', 'Nov', 'Now']
                function MiniLineChart({ data, real }: { data: number[]; real: boolean }) {
                  const mn = Math.min(...data) - 0.02, mx = Math.max(...data) + 0.02
                  const W3 = 100, H3 = 36
                  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W3},${H3 - ((v - mn) / (mx - mn)) * H3}`)
                  const realMin = data[0] * 1.05
                  return (
                    <svg width={W3} height={H3} viewBox={`0 0 ${W3} ${H3}`}>
                      {real && <rect x={0} y={H3 - ((realMin - mn) / (mx - mn)) * H3 - 4} width={W3} height={8} fill="#e4f2eb" rx={2}/>}
                      <polyline points={pts.join(' ')} fill="none" stroke={real ? '#2f6252' : '#cbbeb5'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx={(data.length - 1) / (data.length - 1) * W3} cy={H3 - ((data[data.length - 1] - mn) / (mx - mn)) * H3} r={3} fill={real ? '#2f6252' : '#cbbeb5'}/>
                    </svg>
                  )
                }
                return (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Standing long jump · 5 tests since Aug</div>
                        <div style={{ fontSize: 12, color: '#6f7f7b' }}>Real change is +5% or more above a growth-adjusted baseline</div>
                      </div>
                      <select style={{ height: 32, borderRadius: 8, border: '1px solid #e9eae8', padding: '0 10px', fontFamily: 'inherit', fontSize: 13, color: '#10211f' }}>
                        {['Standing long jump', '10m sprint', 'Yo-Yo level 1', 'Push-ups max'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 60px 80px', padding: '8px 16px', borderBottom: '1px solid #f0f1f0', gap: 8 }}>
                        {['PLAYER', 'TREND', 'BEST', 'CHANGE'].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
                      </div>
                      {HISTORY.map((p, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 60px 80px', padding: '12px 16px', borderBottom: i < HISTORY.length - 1 ? '1px solid #f0f1f0' : 'none', gap: 8, alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.ini}</div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{p.name}</div>
                              <div style={{ display: 'flex', gap: 4 }}>{MONTHS.map(m => <span key={m} style={{ fontSize: 9, color: '#6f7f7b' }}>{m}</span>)}</div>
                            </div>
                          </div>
                          <MiniLineChart data={p.data} real={p.real}/>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{p.best}m</div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: p.real ? '#2f6252' : '#6f7f7b' }}>{p.change}m</div>
                            {p.real && <span style={{ fontSize: 10, fontWeight: 700, color: '#2f6252', background: '#e4f2eb', borderRadius: 4, padding: '1px 5px' }}>Real change</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 12, fontSize: 12, color: '#6f7f7b', background: '#fff', borderRadius: 10, padding: '10px 14px', border: '1px solid #e9eae8' }}>
                      Shaded zone on each chart = what counts as real change, adjusted for the age when growth can artificially lift scores.
                    </div>
                  </>
                )
              })()}

            </div>
          </div>
        )}

        {/* ── TRAINING TAB ── */}
        {tab === 'training' && (
          <div>
            <SubTabBar
              tabs={[{ id: 'tests', label: 'Fitness tests' }, { id: 'her-part', label: 'Her part tonight' }, { id: 'measuring', label: 'Measuring session' }, { id: 'sprint', label: 'Sprint race' }]}
              active={trainSub}
              onSelect={id => setTrainSub(id as TrainingSubTab)}
            />
            <div style={{ padding: '16px 20px' }}>

              {trainSub === 'tests' && (
                <>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Latest test results vs targets</div>
                  {TESTS.map((t, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: '1px solid #e9eae8' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{t.name}</div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 20, fontWeight: 800, color: t.trend === 'up' ? '#40826d' : '#c39797' }}>{t.avg} {t.unit}</div>
                          <div style={{ fontSize: 11, color: '#6f7f7b' }}>target {t.target} {t.unit}</div>
                        </div>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: '#f0f1f0' }}>
                        <div style={{ height: 6, borderRadius: 3, background: t.trend === 'up' ? '#40826d' : '#c39797', width: `${(t.avg / t.target) * 80}%` }} />
                      </div>
                    </div>
                  ))}
                </>
              )}

              {trainSub === 'measuring' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Measuring session</div>
                      <div style={{ fontSize: 12, color: '#6f7f7b' }}>U12 Sam · Thu 11 Jun · 9 of 16 measured · about 40 seconds each</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Finish later</button>
                      <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Save and update growth</button>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 120px', padding: '8px 16px', borderBottom: '1px solid #f0f1f0', gap: 8 }}>
                        {['PLAYER', 'LAST (AUG)', 'HEIGHT TODAY', 'SITTING HEIGHT', 'WEIGHT'].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
                      </div>
                      {[
                        { ini: 'NO', name: 'Noah Okafor',  last: '149.7 cm', h: '151.8 cm', sh: '78.9 cm', w: '41.0 kg', delta: '+2.1 cm in 3 months', active: false },
                        { ini: 'ZH', name: 'Zoe Hartley',  last: '147.6 cm', h: '149.6 cm', sh: '77.8 cm', w: '40.4 kg', delta: '+2.0 cm in 3 months', active: false },
                        { ini: 'JP', name: 'Jai Patel',    last: '151.2 cm', h: '153.0 cm', sh: '79.6 cm', w: '41.3 kg', delta: '+1.8 cm in 3 months', active: false },
                        { ini: 'RC', name: 'Ruby Chen',    last: '153.0 cm', h: '154.7 cm', sh: '80.4 cm', w: '41.8 kg', delta: '+1.7 cm in 3 months', active: false },
                        { ini: 'EB', name: 'Ella Brandt',  last: '150.1 cm', h: '151.7 cm', sh: '78.9 cm', w: '41.0 kg', delta: '+1.6 cm in 3 months', active: false },
                        { ini: 'IM', name: 'Isla Morgan',  last: '146.3 cm', h: '147.8 cm', sh: '76.9 cm', w: '39.9 kg', delta: '+1.5 cm in 3 months', active: false },
                        { ini: 'MT', name: 'Mia Tran',     last: '148.8 cm', h: '150.2 cm', sh: '78.1 cm', w: '40.6 kg', delta: '+1.4 cm in 3 months', active: false },
                        { ini: 'LM', name: 'Leo Marsh',    last: '155.4 cm', h: '156.7 cm', sh: '81.5 cm', w: '42.3 kg', delta: '+1.3 cm in 3 months', active: false },
                        { ini: 'LN', name: 'Lily Nguyen',  last: '144.9 cm', h: '146.2 cm', sh: '76.0 cm', w: '39.5 kg', delta: '+1.3 cm in 3 months', active: false },
                        { ini: 'GO', name: 'Grace Owusu',  last: '157.2 cm', h: '—',        sh: '—',       w: '—',       delta: 'Now measuring', active: true  },
                        { ini: 'FW', name: 'Finn Walsh',   last: '146.0 cm', h: '—',        sh: '—',       w: '—',       delta: '—', active: false },
                      ].map((p, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 120px', padding: '10px 16px', borderBottom: '1px solid #f0f1f0', gap: 8, alignItems: 'center', background: p.active ? '#f0f8f4' : 'transparent' }}>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.ini}</div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{p.name}</span>
                          </div>
                          <div style={{ fontSize: 12, color: '#6f7f7b' }}>{p.last}</div>
                          <div style={{ fontSize: 13, fontWeight: p.h !== '—' ? 700 : 400, color: p.active ? '#2f6252' : '#10211f' }}>{p.h}</div>
                          <div style={{ fontSize: 13, color: '#10211f' }}>{p.sh}</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 12, color: '#6f7f7b' }}>{p.w}</span>
                            <span style={{ fontSize: 10, color: p.active ? '#2f6252' : '#6f7f7b', fontWeight: p.active ? 700 : 400 }}>{p.delta}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>How to measure</div>
                      {[
                        { n: 1, text: 'Shoes off, heels and back against the wall.' },
                        { n: 2, text: 'Measure twice. The app uses the average.' },
                        { n: 3, text: 'Sitting height: on a flat bench, from the bench to the top of the head.' },
                        { n: 4, text: 'Same time of day each time, ideally before training.' },
                      ].map(item => (
                        <div key={item.n} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                          <div style={{ width: 20, height: 20, borderRadius: '999px', background: '#e4f2eb', color: '#2f6252', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.n}</div>
                          <div style={{ fontSize: 13, color: '#4a5a57' }}>{item.text}</div>
                        </div>
                      ))}
                      <div style={{ marginTop: 10, padding: '10px 12px', background: '#fdf8f4', borderRadius: 10, border: '1px solid #f0dcc8', fontSize: 12, color: '#6f7f7b' }}>
                        Weight is optional and never shown to players or parents. Only the growth rate appears in the app.
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, color: '#6f7f7b', padding: '10px 14px', background: '#fff', borderRadius: 10, border: '1px solid #e9eae8' }}>
                    5 more below. Players who miss tonight get a reminder for their parents to measure at home.
                  </div>
                </>
              )}

              {trainSub === 'sprint' && (() => {
                const RUNNING_ORDER = [
                  { ini: 'RC', name: 'Ruby Chen',   go1: 4.02, go2: 4.06, best: 4.02, done: true,  active: false },
                  { ini: 'IM', name: 'Isla Morgan', go1: 3.98, go2: 3.91, best: 3.91, done: true,  active: false },
                  { ini: 'JP', name: 'Jai Patel',   go1: 3.89, go2: 3.84, best: 3.84, done: true,  active: false },
                  { ini: 'FW', name: 'Finn Walsh',  go1: 3.98, go2: null, best: 3.98, done: false, active: true  },
                  { ini: 'LM', name: 'Leo Marsh',   go1: null, go2: null, best: null, done: false, active: false },
                  { ini: 'MT', name: 'Mia Tran',    go1: null, go2: null, best: null, done: false, active: false },
                  { ini: 'GO', name: 'Grace Owusu', go1: null, go2: null, best: null, done: false, active: false },
                  { ini: 'LN', name: 'Lily Nguyen', go1: null, go2: null, best: null, done: false, active: false },
                ]
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
                    <div style={{ background: '#fff', borderRadius: 14, padding: '24px', border: '1px solid #e9eae8', textAlign: 'center' }}>
                      <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 4 }}>Finn Walsh · go 2 of 2</div>
                      <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 24 }}>Go 1: 3.98 s · his best before tonight: 4.05 s</div>
                      <div style={{ width: 80, height: 80, borderRadius: '999px', background: '#c39797', color: '#10211f', fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>FW</div>
                      <div style={{ fontSize: 64, fontWeight: 800, color: '#10211f', letterSpacing: '-2px' }}>3.93</div>
                      <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 32 }}>seconds · stopped by your tap at the finish cone</div>
                      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                        <button style={{ height: 48, padding: '0 24px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Redo this go</button>
                        <button style={{ height: 48, padding: '0 24px', borderRadius: '999px', border: 0, background: '#1f4a3e', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Save · new best · next: Leo</button>
                      </div>
                      <div style={{ marginTop: 20, fontSize: 12, color: '#6f7f7b' }}>Top speed from his boots: 21.2 km/h. Timing on a phone varies by a few hundredths, so the app looks for changes of about 5%.</div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>20 m sprint race · U12 Sam</div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#40826d', background: '#e4f2eb', borderRadius: 6, padding: '2px 8px' }}>Boots recording top speed</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 10 }}>2 goes each · best counts · 3 of 12 done · 4 sitting out</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 40px 50px', gap: 6, marginBottom: 8 }}>
                        {['RUNNING ORDER', 'GO 1', 'GO 2', 'BEST'].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
                        {RUNNING_ORDER.map((r, i) => (
                          <>
                            <div key={`n${i}`} style={{ display: 'flex', gap: 6, alignItems: 'center', padding: '6px 0', borderTop: '1px solid #f0f1f0' }}>
                              <div style={{ width: 20, height: 20, borderRadius: '999px', background: r.active ? '#c39797' : '#cbbeb5', color: '#10211f', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.ini}</div>
                              <span style={{ fontSize: 12, fontWeight: r.active ? 700 : 400, color: r.active ? '#10211f' : '#6f7f7b' }}>{r.name}</span>
                            </div>
                            <div key={`g1${i}`} style={{ fontSize: 12, color: '#10211f', borderTop: '1px solid #f0f1f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.go1 ?? '—'}</div>
                            <div key={`g2${i}`} style={{ fontSize: 12, color: r.active ? '#2f6252' : '#10211f', borderTop: '1px solid #f0f1f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.active ? 'now' : (r.go2 ?? '—')}</div>
                            <div key={`b${i}`} style={{ fontSize: 12, fontWeight: r.best !== null ? 700 : 400, color: r.best ? '#10211f' : '#6f7f7b', borderTop: '1px solid #f0f1f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.best ?? '—'}</div>
                          </>
                        ))}
                      </div>
                      <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 8 }}>Sitting out: Noah and Zoe (growth pain). Kai and Tom (modified training). Their results stay blank, not zero.</div>
                    </div>
                  </div>
                )
              })()}

              {trainSub === 'her-part' && (
                <>
                  <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>Tonight's session · 6:00 pm</div>
                    <div style={{ fontSize: 15, color: '#4a5a57', lineHeight: '21px' }}>
                      Sam has planned a medium-intensity possession session. Here's the fitness-specific part you're responsible for.
                    </div>
                  </div>
                  {[
                    { time: '5:55 pm', title: 'Pre-session load check', desc: 'Ask Grace and Noah how their body feels. Noah had 72% load yesterday.', tag: 'Your call', tagColor: '#2f6252' },
                    { time: '6:05 pm', title: 'Warm-up lead', desc: "8-min dynamic warm-up. Focus on hip mobility and ankle prep (Sever's caution for Grace).", tag: 'Lead this', tagColor: '#2f6252' },
                    { time: '6:50 pm', title: 'Sprint test — 3 players', desc: 'Noah, Mia, and Ella are due a re-test. Quick 10m sprint ×2 each.', tag: 'Test', tagColor: '#c3a84a' },
                    { time: '7:20 pm', title: 'Cool down', desc: 'Lead the squad cool-down and growth stretches.', tag: 'Lead this', tagColor: '#2f6252' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                      <div style={{ fontSize: 12, color: '#6f7f7b', flexShrink: 0, width: 52, paddingTop: 2 }}>{item.time}</div>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{item.title}</div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: item.tagColor, background: item.tagColor + '22', borderRadius: 6, padding: '2px 8px', flexShrink: 0 }}>{item.tag}</span>
                        </div>
                        <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '18px' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* ── MATCH DAY TAB ── */}
        {tab === 'matchday' && (
          <div style={{ padding: '16px 20px' }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>Saturday vs Harbour Rovers</div>
              <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 12 }}>Fitness brief for game day</div>
              {[
                { label: 'Warm-up lead',    note: "20 min progressive warm-up · starts 8:40 am" },
                { label: 'Avoid high impact', note: "Grace (Sever's) · no long sprints before warm-up" },
                { label: 'Sub timing flags', note: "Flag Mia at 55 min — she's 3 days post ankle" },
                { label: 'Post-game',        note: 'Collect RPE ratings from all 11 starters' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '999px', background: '#2f6252', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1f4a3e', borderRadius: 16, padding: '16px' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Pitch-side test mode</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 14 }}>Record sprint times and jump results while standing on the pitch.</div>
              <button style={{ height: 40, padding: '0 20px', borderRadius: '999px', border: 0, background: '#fff', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Start test mode</button>
            </div>
            <div style={{ marginTop: 14, background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #e9eae8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Collect post-session check-in</div>
                <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>Pass the tablet round · 11 players · takes ~20s each</div>
              </div>
              <button onClick={() => { setRpePlayer(0); setRpeScore(null); setRpeHurt(null); setRpeFun(null); setShowRPE(true) }} style={{ height: 36, padding: '0 18px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Start</button>
            </div>
          </div>
        )}
      </div>

      {/* ── RPE OVERLAY ── */}
      {showRPE && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#1f4a3e', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
          <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Player {rpePlayer + 1} of {RPE_PLAYERS.length}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{RPE_PLAYERS[rpePlayer]}</div>
            </div>
            <button onClick={() => setShowRPE(false)} style={{ width: 36, height: 36, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '24px 24px 32px' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 20, lineHeight: '28px' }}>How hard did it feel?</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 36 }}>
              {RPE_EMOJIS.map(e => (
                <button key={e.v} onClick={() => setRpeScore(e.v)} style={{ padding: '14px 8px', borderRadius: 16, border: `2px solid ${rpeScore === e.v ? '#fff' : 'rgba(255,255,255,0.2)'}`, background: rpeScore === e.v ? 'rgba(255,255,255,0.15)' : 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 28 }}>{e.emoji}</span>
                  <span style={{ fontSize: 11, color: '#fff', fontWeight: rpeScore === e.v ? 700 : 400 }}>{e.label}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{e.v}/10</span>
                </button>
              ))}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 20 }}>Did anything hurt?</div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 36 }}>
              {(['no', 'yes'] as const).map(opt => (
                <button key={opt} onClick={() => setRpeHurt(opt)} style={{ flex: 1, height: 56, borderRadius: 16, border: `2px solid ${rpeHurt === opt ? '#fff' : 'rgba(255,255,255,0.2)'}`, background: rpeHurt === opt ? 'rgba(255,255,255,0.15)' : 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: rpeHurt === opt ? 700 : 400, cursor: 'pointer' }}>
                  {opt === 'no' ? 'No' : 'Yes — show where'}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 20 }}>Was it fun?</div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 36 }}>
              {([
                { v: 'nope' as const, label: 'Not really', emoji: '😑' },
                { v: 'ok' as const, label: 'OK', emoji: '🙂' },
                { v: 'loved' as const, label: 'Loved it', emoji: '🤩' },
              ]).map(opt => (
                <button key={opt.v} onClick={() => setRpeFun(opt.v)} style={{ flex: 1, padding: '12px 8px', borderRadius: 16, border: `2px solid ${rpeFun === opt.v ? '#fff' : 'rgba(255,255,255,0.2)'}`, background: rpeFun === opt.v ? 'rgba(255,255,255,0.15)' : 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 28 }}>{opt.emoji}</span>
                  <span style={{ fontSize: 13, color: '#fff', fontWeight: rpeFun === opt.v ? 700 : 400 }}>{opt.label}</span>
                </button>
              ))}
            </div>
            <button
              disabled={rpeScore === null || !rpeHurt || !rpeFun}
              onClick={() => {
                if (rpePlayer < RPE_PLAYERS.length - 1) {
                  setRpePlayer(p => p + 1); setRpeScore(null); setRpeHurt(null); setRpeFun(null)
                } else { setShowRPE(false) }
              }}
              style={{ width: '100%', height: 52, borderRadius: '999px', border: 0, background: rpeScore !== null && rpeHurt && rpeFun ? '#fff' : 'rgba(255,255,255,0.2)', color: rpeScore !== null && rpeHurt && rpeFun ? '#1f4a3e' : 'rgba(255,255,255,0.4)', fontFamily: 'inherit', fontSize: 16, fontWeight: 700, cursor: rpeScore !== null && rpeHurt && rpeFun ? 'pointer' : 'default' }}>
              {rpePlayer < RPE_PLAYERS.length - 1 ? `Send · pass to ${RPE_PLAYERS[rpePlayer + 1]}` : 'Send · all done'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
