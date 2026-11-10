import { useState } from 'react'
import { MINIROOS, JUNIORS, GRADING } from './data'
import { SubTabBar, ResultChip, BackBtn, EmptyCard, FOOTER_DEFAULT } from './ui'
import CardsTab from './CardsTab'

type TeamsView = 'allteams' | 'seniors' | 'fixtures' | 'leaguesync' | 'grading' | 'referees' | 'teamkit' | 'cards'

const TEAM_DETAILS: Record<string, { coach: string; div: string; players: number; turnout: number; style: number; lastFive: string[]; fewest: number; staff: { ini: string; name: string; role: string; check: string }[] }> = {
  'U12 Girls Ana': { coach: 'Ana Silva', div: 'Division 1 · Juniors', players: 15, turnout: 94, style: 74, lastFive: ['W','D','W','W','W'], fewest: 60, staff: [{ ini: 'AS', name: 'Ana Silva', role: 'Coach', check: 'Valid Aug 2027' }, { ini: 'DM', name: 'Dee Moss', role: 'Co-coach', check: 'Valid Feb 2027' }, { ini: 'TW', name: 'Tina Wu', role: 'Team manager', check: 'Valid Oct 2027' }] },
  'U11 Girls Kate': { coach: 'Kate Moretti', div: 'Kangaroos · Juniors', players: 14, turnout: 90, style: 70, lastFive: ['W','D','W','W','W'], fewest: 57, staff: [{ ini: 'KM', name: 'Kate Moretti', role: 'Coach', check: 'Valid Jan 2028' }] },
  'U11 Luke': { coach: 'Luke Fraser', div: 'Wallabies · Juniors', players: 15, turnout: 79, style: 52, lastFive: ['W','W','D','L','L'], fewest: 28, staff: [{ ini: 'LF', name: 'Luke Fraser', role: 'Coach', check: 'Ends in 12 days' }] },
  'U12 Sam': { coach: 'Sam K', div: 'Division 1 · Juniors', players: 17, turnout: 92, style: 78, lastFive: ['W','W','D','L','W'], fewest: 55, staff: [{ ini: 'SK', name: 'Sam K', role: 'Coach', check: 'Valid Mar 2028' }] },
  'U13 Chris': { coach: 'Chris Pham', div: 'Division 2 · Juniors', players: 17, turnout: 81, style: 58, lastFive: ['L','W','L','L','D'], fewest: 51, staff: [{ ini: 'CP', name: 'Chris Pham', role: 'Coach', check: 'Ends in 9 days' }] },
  'U16 Ollie': { coach: 'Ollie Grant', div: 'Division 1 · Juniors', players: 14, turnout: 76, style: 55, lastFive: ['L','D','W','L','L'], fewest: 22, staff: [{ ini: 'OG', name: 'Ollie Grant', role: 'Coach', check: 'Valid Jun 2027' }] },
}

function TeamDetail({ name, onBack }: { name: string; onBack: () => void }) {
  const all = [...MINIROOS, ...JUNIORS]
  const mr = MINIROOS.find(t => t.name === name)
  const jr = JUNIORS.find(t => t.name === name)
  const detail = TEAM_DETAILS[name]
  const coach = mr ? mr.coach : jr ? jr.coach : '—'
  const players = mr ? mr.players : jr ? jr.players : 0
  const div = mr ? mr.level : jr ? jr.div : '—'
  const turnout = mr ? mr.turnout : jr ? jr.turnout : 0
  const style = detail?.style ?? (mr?.style ?? 0)
  const lastFive = detail?.lastFive ?? (jr?.lastFive ?? [])
  const fewest = detail?.fewest ?? 55
  const staff = detail?.staff ?? []
  const alert = all.find(t => t.name === name)

  return (
    <div style={{ padding: '0 20px 20px' }}>
      <BackBtn label="All teams" onClick={onBack} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#10211f' }}>{name}</div>
          <div style={{ fontSize: 13, color: '#6f7f7b' }}>{div} · coach {coach} · {players} players · read-only, the way its coaches see it</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Compare</button>
          <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Message the coaches</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, margin: '16px 0' }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6f7f7b', marginBottom: 6 }}>LAST 5</div>
          <div style={{ display: 'flex', gap: 3 }}>{lastFive.length > 0 ? lastFive.map((r, i) => <ResultChip key={i} r={r} />) : <span style={{ fontSize: 12, color: '#6f7f7b' }}>Results not kept</span>}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6f7f7b', marginBottom: 4 }}>PLAYING OUR WAY</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#10211f' }}>{style > 0 ? `${style}%` : '—'}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6f7f7b', marginBottom: 4 }}>TRAINING TURNOUT</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#10211f' }}>{turnout}%</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6f7f7b', marginBottom: 4 }}>GAMES RECORDED</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#10211f' }}>6 of 6</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Needs attention</div>
              <span style={{ fontSize: 12, color: '#6f7f7b' }}>{alert?.alert ? '1 thing' : '0 things'}</span>
            </div>
            {alert?.alert ? (
              <div style={{ display: 'flex', gap: 8, padding: '10px 12px', borderRadius: 10, background: '#fdf4f4', border: '1px solid #f0dcc8' }}>
                <span style={{ fontSize: 13, color: '#c39797', fontWeight: 700 }}>!</span>
                <span style={{ fontSize: 13, color: '#10211f' }}>{alert.alert}</span>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 20, height: 20, borderRadius: '999px', background: '#e4f2eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 10, color: '#40826d' }}>✓</span></div>
                <div><div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Nothing needs you</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>Checks valid, everyone getting a fair go, games recorded.</div></div>
              </div>
            )}
          </div>
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Staff</div>
              <button style={{ fontSize: 12, color: '#2f6252', background: 'none', border: 0, cursor: 'pointer' }}>All coaches</button>
            </div>
            {staff.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.ini}</div>
                <div style={{ flexGrow: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{s.name}</div><div style={{ fontSize: 11, color: '#6f7f7b' }}>{s.role}</div></div>
                <span style={{ fontSize: 11, fontWeight: 700, color: s.check.startsWith('Valid') ? '#40826d' : '#c39797', background: s.check.startsWith('Valid') ? '#e4f2eb' : '#fdf4f4', borderRadius: 6, padding: '2px 8px' }}>{s.check}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Next game · Sat 6 Jun</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>vs Tealside Town</div>
            <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 4 }}>11:00 · Home · Pitch 2</div>
            <div style={{ fontSize: 12, color: '#6f7f7b' }}>Camera: Kit 3</div>
            <div style={{ fontSize: 12, color: '#6f7f7b' }}>Training Tue and Thu 5:45</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Players</div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: '#6f7f7b' }}>Fewest minutes</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: fewest < 33 ? '#c39797' : '#10211f' }}>{fewest}% of a game</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: '#f0f1f0' }}><div style={{ height: 6, borderRadius: 3, background: fewest < 33 ? '#c39797' : '#2f6252', width: `${fewest}%` }} /></div>
              <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 4 }}>Everyone over half a game</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#6f7f7b' }}>Consent done</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#40826d' }}>{players} of {players}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 14, padding: '12px 14px', background: '#fdf8f4', borderRadius: 10, border: '1px solid #f0dcc8', fontSize: 12, color: '#6f7f7b' }}>
        You see this team the way its coaches do, but cannot change their plans. Fitness: Coach runs the 11+ Kids warm-up.
      </div>
    </div>
  )
}

function CompareView({ onBack }: { onBack: () => void }) {
  const [a, setA] = useState('U11 Girls Kate')
  const [b, setB] = useState('U11 Luke')
  const allNames = [...MINIROOS.map(t => t.name), ...JUNIORS.map(t => t.name)]

  const getD = (name: string) => {
    const mr = MINIROOS.find(t => t.name === name)
    const jr = JUNIORS.find(t => t.name === name)
    const detail = TEAM_DETAILS[name]
    return {
      coach: mr?.coach ?? jr?.coach ?? '—',
      players: mr?.players ?? jr?.players ?? 0,
      last5: jr?.lastFive.length ? 'See chips' : 'Results not kept',
      level: mr?.level ?? jr?.div ?? '—',
      style: detail?.style ?? (jr?.style ?? 0),
      turnout: mr?.turnout ?? jr?.turnout ?? 0,
      fewest: detail?.fewest ?? 55,
    }
  }

  const da = getD(a)
  const db = getD(b)
  const rows = [
    { label: 'Coach', va: da.coach, vb: db.coach },
    { label: 'Players', va: String(da.players), vb: String(db.players) },
    { label: 'Last 5', va: da.last5, vb: db.last5 },
    { label: 'Level', va: da.level, vb: db.level },
    { label: 'Playing our way', va: da.style > 0 ? `${da.style}%` : '—', vb: db.style > 0 ? `${db.style}%` : '—' },
    { label: 'Turnout', va: `${da.turnout}%`, vb: `${db.turnout}%` },
    { label: 'Games recorded', va: '6 of 6', vb: '5 of 6' },
    { label: 'Fewest minutes', va: `${da.fewest}% of a game`, vb: `${db.fewest}% of a game`, flagA: da.fewest < 33, flagB: db.fewest < 33 },
    { label: 'Training', va: 'Tue and Thu 5:30', vb: 'Mon and Wed 5:30' },
  ]

  return (
    <div style={{ padding: '0 20px 20px' }}>
      <BackBtn label="All teams" onClick={onBack} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f' }}>Compare two teams</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select value={a} onChange={e => setA(e.target.value)} style={{ height: 32, borderRadius: 8, border: '1px solid #e9eae8', padding: '0 10px', fontFamily: 'inherit', fontSize: 13, background: '#fff' }}>
            {allNames.map(n => <option key={n}>{n}</option>)}
          </select>
          <span style={{ color: '#6f7f7b' }}>and</span>
          <select value={b} onChange={e => setB(e.target.value)} style={{ height: 32, borderRadius: 8, border: '1px solid #e9eae8', padding: '0 10px', fontFamily: 'inherit', fontSize: 13, background: '#fff' }}>
            {allNames.map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 300px', gap: 16 }}>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f1f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{a}</div>
            <button style={{ fontSize: 12, color: '#2f6252', background: 'none', border: 0, cursor: 'pointer' }}>Open team</button>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #f0f1f0', fontSize: 13 }}>
              <span style={{ color: '#6f7f7b' }}>{r.label}</span>
              <span style={{ fontWeight: 700, color: r.flagA ? '#c39797' : '#10211f' }}>{r.va}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f1f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{b}</div>
            <button style={{ fontSize: 12, color: '#2f6252', background: 'none', border: 0, cursor: 'pointer' }}>Open team</button>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #f0f1f0', fontSize: 13 }}>
              <span style={{ color: '#6f7f7b' }}>{r.label}</span>
              <span style={{ fontWeight: 700, color: r.flagB ? '#c39797' : '#10211f' }}>{r.vb}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>What stands out</div>
          {[
            { n: 1, title: 'Minutes', body: `${a}'s fewest is ${da.fewest}% of a game. ${b}'s is ${db.fewest}%.` },
            { n: 2, title: 'Playing our way', body: `${da.style}% against ${db.style}%. Club average is 67%.` },
            { n: 3, title: 'Turnout', body: `${da.turnout}% against ${db.turnout}% over the last 2 weeks.` },
          ].map(item => (
            <div key={item.n} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: '999px', background: '#1f4a3e', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.n}</div>
              <div><div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{item.title}</div><div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{item.body}</div></div>
            </div>
          ))}
          <button style={{ width: '100%', height: 40, borderRadius: '999px', border: 0, background: '#1f4a3e', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>
            Suggest {b.split(' ').pop()} watches {a.split(' ').pop()}
          </button>
        </div>
      </div>
    </div>
  )
}

const TEAMS_EMPTY: Partial<Record<TeamsView, { icon: string; title: string; desc: string; cta?: string; items: { title: string; desc: string }[] }>> = {
  allteams:   { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75', title: 'No teams yet', desc: 'Bring your teams across from PlayFootball, or add one by hand. Each team gets its own coach view.', cta: 'Import from PlayFootball', items: [{ title: 'Every team on one page', desc: 'Level, coach, turnout' }, { title: 'Open any team read-only', desc: 'The way its coach sees it' }] },
  seniors:    { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75', title: 'No senior teams yet', desc: 'Add a senior team. Adult players join and give consent for themselves, with no parent steps.', cta: 'Add a senior team', items: [{ title: 'Registration window', desc: 'And clearances' }, { title: 'Juniors moving up', desc: "Who's two seasons away" }] },
  leaguesync: { icon: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15', title: 'Not connected to Dribl yet', desc: 'Connect once and fixtures, venues and changes come in for every team from U12 up.', cta: 'Connect Dribl', items: [{ title: 'Changes reach families', desc: 'Calendar, roster, reminders' }, { title: 'Results go back', desc: 'After the manager confirms' }] },
  grading:    { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', title: "Grading hasn't started", desc: 'Grading games run in March. After them you\'ll see where the league placed each team and whether to ask for a change.', cta: 'Plan grading days', items: [{ title: 'What we asked for', desc: 'Against what we got' }, { title: 'MiniRoos levels', desc: 'Picked by the club' }] },
  referees:   { icon: 'M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3', title: 'No club referees yet', desc: 'Add your game leaders and referees. On Thursday, Clean Sheet shows which home games still need one.', cta: 'Add a referee', items: [{ title: 'Home games covered', desc: 'Or who to ask' }, { title: 'Kind feedback only', desc: 'For young referees' }] },
  teamkit:    { icon: 'M15 10l4.553-2.069A1 1 0 0121 8.869v6.262a1 1 0 01-1.447.894L15 14M3 8h12v9H3z', title: 'No kit added yet', desc: 'Add your match cameras, boot sensors and vests so teams can book them for Saturday.', cta: 'Add a kit', items: [{ title: 'Who has which kit', desc: "And when it's back" }, { title: 'Battery and repairs', desc: 'Before game day' }] },
  cards:      { icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6', title: 'No cards this season', desc: 'Yellow and red cards come in from Dribl the night after each game. Anyone suspended is taken out of line-ups for you.', items: [{ title: 'Red card', desc: 'Misses the next game automatically' }, { title: '5, 10 and 15 yellows', desc: 'Each one brings a suspension' }] },
}

export default function TeamsTab({ empty }: { empty?: boolean }) {
  const [view, setView] = useState<TeamsView>('allteams')
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [showCompare, setShowCompare] = useState(false)
  const [filter, setFilter] = useState<'all' | 'attention' | 'girls' | 'recording'>('all')

  if (showCompare) return <CompareView onBack={() => setShowCompare(false)} />
  if (selectedTeam) return <TeamDetail name={selectedTeam} onBack={() => setSelectedTeam(null)} />

  const p = { padding: '16px 20px' }

  const alertTeams = [...MINIROOS.filter(t => t.alert), ...JUNIORS.filter(t => t.alert)]

  const filteredMR = filter === 'all' ? MINIROOS : filter === 'attention' ? MINIROOS.filter(t => t.alert) : filter === 'girls' ? MINIROOS.filter(t => t.name.includes('Girls') || t.name.includes('Hannah')) : MINIROOS
  const filteredJR = filter === 'all' ? JUNIORS : filter === 'attention' ? JUNIORS.filter(t => t.alert) : filter === 'girls' ? JUNIORS.filter(t => t.name.includes('Girls') || t.name.includes('Bec')) : filter === 'recording' ? JUNIORS.filter(t => t.alert === 'Video gaps') : JUNIORS

  return (
    <>
      <SubTabBar
        items={[
          { id: 'allteams', label: 'All teams' },
          { id: 'seniors', label: 'Seniors' },
          { id: 'fixtures', label: 'Fixtures' },
          { id: 'leaguesync', label: 'League sync' },
          { id: 'grading', label: 'Grading' },
          { id: 'referees', label: 'Referees' },
          { id: 'teamkit', label: 'Kit and cameras' },
          { id: 'cards', label: 'Cards' },
        ]}
        active={view}
        onSelect={id => setView(id as TeamsView)}
      />

      {empty && view in TEAMS_EMPTY && <EmptyCard {...TEAMS_EMPTY[view]!} footer={FOOTER_DEFAULT} />}

      {!empty && view === 'allteams' && (
        <div style={p}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Teams · 14 teams · tap a team to open it as its coach sees it, read-only</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowCompare(true)} style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Compare two teams</button>
              <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Add a team</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {[{ id: 'all', label: 'All teams' }, { id: 'attention', label: `Needs attention ${alertTeams.length}` }, { id: 'girls', label: 'Girls' }, { id: 'recording', label: 'Recording games' }].map(f => (
              <button key={f.id} onClick={() => setFilter(f.id as typeof filter)} style={{ height: 30, padding: '0 14px', borderRadius: '999px', border: `1px solid ${filter === f.id ? '#2f6252' : '#e9eae8'}`, background: filter === f.id ? '#2f6252' : '#fff', color: filter === f.id ? '#fff' : '#6f7f7b', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>{f.label}</button>
            ))}
          </div>

          {filteredMR.length > 0 && (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#6f7f7b', marginBottom: 8 }}>MiniRoos · U6 to U11 · Kangaroos, Wallabies or Joeys · no scores kept</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 20 }}>
                {filteredMR.map(t => (
                  <button key={t.name} onClick={() => setSelectedTeam(t.name)} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{t.name}</div>
                      {t.alert && <span style={{ fontSize: 10, fontWeight: 700, color: '#c39797', background: '#fdf4f4', borderRadius: 4, padding: '2px 6px' }}>{t.alert}</span>}
                    </div>
                    <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 8 }}>{t.level} · {t.coach || 'No coach'} · {t.players} players</div>
                    <div style={{ fontSize: 11, color: '#6f7f7b', marginBottom: 4 }}>Results not kept · skills tracked, not scored</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f' }}>{t.turnout}% turnout</div>
                    {t.style !== undefined && (
                      <div style={{ marginTop: 6 }}>
                        <div style={{ height: 4, borderRadius: 2, background: '#f0f1f0' }}><div style={{ height: 4, borderRadius: 2, background: '#2f6252', width: `${t.style}%` }} /></div>
                        <div style={{ fontSize: 10, color: '#6f7f7b', marginTop: 2 }}>{t.style}% playing our way</div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          {filteredJR.length > 0 && (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#6f7f7b', marginBottom: 8 }}>Juniors · U12 to U16 · results and ladders · graded into divisions</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
                {filteredJR.map(t => (
                  <button key={t.name} onClick={() => setSelectedTeam(t.name)} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{t.name}</div>
                      {t.alert && <span style={{ fontSize: 10, fontWeight: 700, color: t.alert === 'Heavy legs' ? '#c3a84a' : '#c39797', background: t.alert === 'Heavy legs' ? '#fdf8ed' : '#fdf4f4', borderRadius: 4, padding: '2px 6px' }}>{t.alert}</span>}
                    </div>
                    <div style={{ fontSize: 11, color: '#6f7f7b', marginBottom: 6 }}>{t.div} · {t.coach}</div>
                    <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>{t.lastFive.map((r, i) => <ResultChip key={i} r={r} />)}</div>
                    <div style={{ marginTop: 4 }}>
                      <div style={{ height: 4, borderRadius: 2, background: '#f0f1f0' }}><div style={{ height: 4, borderRadius: 2, background: '#2f6252', width: `${t.style}%` }} /></div>
                      <div style={{ fontSize: 10, color: '#6f7f7b', marginTop: 2 }}>{t.style}% · {t.turnout}% turnout</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {view === 'seniors' && (
        <div style={p}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <div><div style={{ fontSize: 18, fontWeight: 800, color: '#10211f' }}>Seniors</div><div style={{ fontSize: 13, color: '#6f7f7b' }}>4 senior teams · 79 players · adults join and consent for themselves</div></div>
            <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Add a senior team</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
            {[
              { name: "Men's 1sts", badge: 'NPL 3', coach: 'Marko Petrovic', squad: 22, ladder: '4th of 12', lastFive: ['W','W','D','L','W'] },
              { name: "Men's Reserves", badge: 'NPL 3 Reserves', coach: 'Dean Walsh', squad: 20, ladder: '7th of 12', lastFive: ['L','D','W','L','D'] },
              { name: "Women's 1sts", badge: 'State League 2', coach: 'Steph Lau', squad: 19, ladder: '2nd of 10', lastFive: ['W','W','W','D','W'] },
              { name: 'Over 35s', badge: 'Metro league', coach: 'Phil Ainsley · player-coach', squad: 18, ladder: '5th of 9', lastFive: ['D','W','L','W','D'] },
            ].map((t, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '16px', border: '1px solid #e9eae8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>{t.name}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#2f6252', background: '#e4f2eb', borderRadius: 6, padding: '2px 6px' }}>{t.badge}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 12 }}>{t.coach}</div>
                <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 2 }}>Squad <span style={{ fontWeight: 700, color: '#10211f' }}>{t.squad}</span></div>
                <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 10 }}>Ladder <span style={{ fontWeight: 700, color: '#10211f' }}>{t.ladder}</span></div>
                <div style={{ fontSize: 11, color: '#6f7f7b', marginBottom: 4 }}>Last 5</div>
                <div style={{ display: 'flex', gap: 3 }}>{t.lastFive.map((r, ri) => <ResultChip key={ri} r={r} />)}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>How senior teams work</div>
              {[{ title: 'No parents', desc: 'Players join with the team link and get their own app.' }, { title: 'Results count', desc: 'Ladder, finals and the league sync, from round 1.' }, { title: 'Wellness and load', desc: 'Players check in themselves before training.' }].map((item, i) => (
                <div key={i} style={{ padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#6f7f7b' }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Juniors moving up next season</div>
              <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 12 }}>U16 Ollie and U15 Girls Bec are two seasons from seniors. Players 16 and over can already train with a senior team if a parent says yes.</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid #f0f1f0' }}>
                <span style={{ fontSize: 13, color: '#10211f' }}>U16s training with the 1sts</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>3</span>
              </div>
              <button style={{ marginTop: 8, height: 32, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>See U16 Ollie</button>
            </div>
          </div>
        </div>
      )}

      {view === 'fixtures' && (
        <div style={p}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>Fixtures · Sat 6 Jun</div>
          {[
            { time: '9:00', team: 'U9 Mark', against: 'Glenroy Park', venue: 'Home · Pitch 4', changed: false },
            { time: '9:30', team: 'U10 Nadia', against: 'Tealside Town', venue: 'Away · Elsternwick Park', changed: false },
            { time: '9:30', team: 'U12 Sam', against: 'Harbour Rovers', venue: 'Home · Pitch 2', changed: false },
            { time: '12:30', team: 'U13 Chris', against: 'Glenroy Park', venue: 'Division 2 · moved from 12:00', changed: true },
            { time: '1:30', team: 'U14 Josh', against: 'Ironbark FC', venue: 'Away · Ironbark Park', changed: false },
            { time: '3:30', team: 'U16 Ollie', against: 'Harbour Rovers', venue: 'Away · new venue', changed: true },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
              <div style={{ width: 48, fontSize: 13, fontWeight: 700, color: '#10211f', flexShrink: 0 }}>{f.time}</div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{f.team} vs {f.against}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>{f.venue}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: f.changed ? '#c3a84a' : '#40826d', background: f.changed ? '#fdf8ed' : '#e4f2eb', borderRadius: 6, padding: '2px 8px' }}>{f.changed ? 'Changed' : 'Same'}</span>
            </div>
          ))}
        </div>
      )}

      {view === 'leaguesync' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: p.padding }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <div><div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>This weekend from the league</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>Sat 6 Jun · 6 of 14 games</div></div>
              <span style={{ fontSize: 12, color: '#40826d', fontWeight: 700 }}>✓ Synced 6:02 am today</span>
            </div>
            {[{ time: '9:00', team: 'U9 Mark', against: 'Glenroy Park', note: 'Home · pitch 4', status: 'Same' }, { time: '9:30', team: 'U10 Nadia', against: 'Tealside Town', note: 'Away · Elsternwick Park', status: 'Same' }, { time: '9:30', team: 'U12 Sam', against: 'Harbour Rovers', note: 'Home · pitch 2', status: 'Same' }, { time: '12:30', team: 'U13 Chris', against: 'Glenroy Park', note: 'Division 2 · moved from 12:00', status: 'Changed' }, { time: '1:30', team: 'U14 Josh', against: 'Ironbark FC', note: 'Away · Ironbark Park', status: 'Same' }, { time: '3:30', team: 'U16 Ollie', against: 'Harbour Rovers', note: 'Away · new venue', status: 'Changed' }].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <div style={{ width: 42, fontSize: 13, fontWeight: 700, color: '#10211f', flexShrink: 0 }}>{f.time}</div>
                <div style={{ flexGrow: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{f.team}</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>{f.against} · {f.note}</div></div>
                <span style={{ fontSize: 11, fontWeight: 700, color: f.status === 'Changed' ? '#c3a84a' : '#40826d', background: f.status === 'Changed' ? '#fdf8ed' : '#e4f2eb', borderRadius: 6, padding: '2px 8px' }}>{f.status}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ marginBottom: 14 }}><div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Results to the league</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>Sat 30 May</div></div>
            {[{ team: 'U12 Sam', result: 'Won 3–1 v Northcote City', status: 'Sent', ok: true }, { team: 'U12 Girls Ana', result: 'Won 2–0 v Glenroy Park', status: 'Sent', ok: true }, { team: 'U13 Chris', result: 'Drew 1–1 v Tealside Town', status: 'Sent', ok: true }, { team: 'U14 Josh', result: 'Won 2–1 v Kingsbury United', status: 'Waiting for manager', ok: false }, { team: 'U16 Ollie', result: 'Lost 1–3 v Ironbark FC', status: 'Score differs from the league', ok: false, fix: true }].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <div style={{ flexGrow: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{r.team}</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>{r.result}</div></div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: r.ok ? '#40826d' : '#c39797', background: r.ok ? '#e4f2eb' : '#fdf4f4', borderRadius: 6, padding: '2px 8px' }}>{r.status}</span>
                  {r.fix && <button style={{ height: 24, padding: '0 10px', borderRadius: '999px', border: 0, background: '#c39797', color: '#fff', fontFamily: 'inherit', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Fix</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'grading' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, padding: p.padding }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div><div style={{ fontSize: 18, fontWeight: 800, color: '#10211f' }}>Grading</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>How the league placed each U12+ team, and whether to ask for a change</div></div>
              <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Ask the league to regrade</button>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 120px', padding: '10px 16px', borderBottom: '1px solid #f0f1f0', gap: 8 }}>
                {['TEAM','WE ASKED','LEAGUE GAVE','SINCE GRADING','SUGGESTION'].map(h => <div key={h} style={{ fontSize: 11, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
              </div>
              {GRADING.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 120px', padding: '12px 16px', borderBottom: i < GRADING.length - 1 ? '1px solid #f0f1f0' : 'none', gap: 8, alignItems: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{row.team}</div>
                  <div style={{ fontSize: 13, color: '#6f7f7b' }}>{row.asked}</div>
                  <div style={{ fontSize: 13, color: '#6f7f7b' }}>{row.gave}</div>
                  <div style={{ fontSize: 13, color: '#10211f' }}>{row.since}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: row.suggestion === 'Stay' ? '#40826d' : row.suggestion === 'Watch' ? '#c3a84a' : '#c39797', background: row.suggestion === 'Stay' ? '#e4f2eb' : row.suggestion === 'Watch' ? '#fdf8ed' : '#fdf4f4', borderRadius: 6, padding: '2px 8px', textAlign: 'center' }}>{row.suggestion}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: '#6f7f7b', padding: '10px 14px', background: '#fff', borderRadius: 10, border: '1px solid #e9eae8' }}>U13 Chris has lost 6 of 9 in Division 2. Most leagues take regrade requests once, mid-season.</div>
          </div>
          <div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>MiniRoos levels</div>
              <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 10 }}>The club picks Kangaroos, Wallabies or Joeys. No results are kept, so these are about fun, even games.</div>
              {[{ level: 'Kangaroos', n: 2 }, { level: 'Wallabies', n: 4 }, { level: 'Joeys', n: 1 }].map((l, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                  <span style={{ fontSize: 13, color: '#10211f' }}>{l.level}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{l.n} teams</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Next season's grading</div>
              <div style={{ fontSize: 12, color: '#4a5a57' }}>Coaches score each player in 3 areas at grading games. You see a suggested team for every player.</div>
              <button style={{ marginTop: 10, height: 32, padding: '0 12px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer' }}>Plan grading days</button>
            </div>
          </div>
        </div>
      )}

      {view === 'referees' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, padding: p.padding }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <div><div style={{ fontSize: 18, fontWeight: 800, color: '#10211f' }}>Referees</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>Home games Sat 6 Jun · club game leaders and referees</div></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 0 10px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Home games</div>
              <span style={{ fontSize: 12, color: '#c39797', fontWeight: 700 }}>2 still needed</span>
            </div>
            {[
              { time: '8:30', game: 'U7 Dan v Ironbark FC · festival', role: 'Game leader', who: 'Zoe Park, 16', needed: false },
              { time: '8:30', game: 'U8 Hannah v Ironbark FC · festival', role: 'Game leader', who: '', needed: true },
              { time: '9:00', game: 'U9 Mark v Glenroy Park', role: 'Game leader', who: 'Ethan Moss, 15', needed: false },
              { time: '9:30', game: 'U12 Sam v Harbour Rovers', role: 'Referee', who: 'Dana · club referee', needed: false },
              { time: '11:00', game: 'U12 Girls Ana v Tealside Town', role: 'Referee', who: 'Appointed by the league', needed: false },
              { time: '12:00', game: 'U13 Girls Meg v Northcote City', role: 'Assistant referee', who: '', needed: true },
            ].map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none', alignItems: 'center' }}>
                <div style={{ width: 42, fontSize: 12, fontWeight: 700, color: '#10211f', flexShrink: 0 }}>{g.time}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{g.game}</div>
                  <div style={{ fontSize: 12, color: '#6f7f7b' }}>{g.role}</div>
                </div>
                {g.needed ? (
                  <button style={{ height: 28, padding: '0 12px', borderRadius: '999px', border: 0, background: '#c39797', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Ask</button>
                ) : (
                  <span style={{ fontSize: 12, color: '#40826d', fontWeight: 700 }}>{g.who}</span>
                )}
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>Club referees</div>
            {[{ ini: 'ZP', name: 'Zoe Park', detail: '16 · 21 games · Level 4' }, { ini: 'EM', name: 'Ethan Moss', detail: '15 · 12 games · new this year' }, { ini: 'LS', name: 'Liam Shaw', detail: '17 · 26 games · Level 4' }, { ini: 'RA', name: 'Ruth Adeyemi', detail: 'Adult · 30 games · coordinator' }].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.ini}</div>
                <div><div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{r.name}</div><div style={{ fontSize: 11, color: '#6f7f7b' }}>{r.detail}</div></div>
              </div>
            ))}
            <div style={{ marginTop: 10, fontSize: 12, color: '#6f7f7b', paddingTop: 10, borderTop: '1px solid #f0f1f0' }}>Feedback this week: 5 · all positive</div>
            <button style={{ marginTop: 10, height: 32, width: '100%', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer' }}>Add a referee</button>
          </div>
        </div>
      )}

      {!empty && view === 'cards' && <CardsTab />}

      {view === 'teamkit' && (
        <div style={p}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Camera kit</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
            {[{ id: 'Kit 1', s: 'Available', c: '#40826d', bg: '#e4f2eb' }, { id: 'Kit 2', s: 'Booked · U12 Sat', c: '#c3a84a', bg: '#fdf8ed' }, { id: 'Kit 3', s: 'Available', c: '#40826d', bg: '#e4f2eb' }, { id: 'Kit 4', s: 'Repair needed', c: '#c39797', bg: '#fdf4f4' }].map(k => (
              <div key={k.id} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>{k.id}</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: k.c, background: k.bg, borderRadius: 6, padding: '2px 8px' }}>{k.s}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Kit bags</div>
          {[{ name: 'First aid (4 bags)', s: 'All in place' }, { name: 'Bibs (all teams)', s: '3 bags need restocking' }, { name: 'Training balls', s: '48/50 accounted for' }].map((k, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
              <span style={{ fontSize: 14, color: '#10211f' }}>{k.name}</span>
              <span style={{ fontSize: 13, color: '#6f7f7b' }}>{k.s}</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
