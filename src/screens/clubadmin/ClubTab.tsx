import { useState } from 'react'
import { SubTabBar } from './ui'

type ClubView = 'overview' | 'inbox' | 'calendar' | 'seasonplan' | 'playingstyle' | 'headingpolicy' | 'kit' | 'settings'

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

const GANTT_ROWS = [
  { label: 'MiniRoos U6–U11', bars: [{ s: 2, e: 2, label: 'Pre-season', c: '#cbbeb5' }, { s: 3, e: 7, label: 'Winter season · Apr to Aug', c: '#2f6252' }, { s: 10, e: 10, label: 'Summer 4v4', c: '#c3a84a' }] },
  { label: 'Juniors U12–U18', bars: [{ s: 1, e: 2, label: 'Pre-season', c: '#cbbeb5' }, { s: 3, e: 3, label: 'Grading', c: '#c39797' }, { s: 4, e: 7, label: 'Season · divisions', c: '#2f6252' }, { s: 8, e: 8, label: 'Finals', c: '#40826d' }, { s: 10, e: 10, label: 'Futsal', c: '#c3a84a' }] },
  { label: 'Seniors and NPL', bars: [{ s: 0, e: 1, label: 'Pre-season', c: '#cbbeb5' }, { s: 2, e: 7, label: 'Season · Mar to Aug', c: '#2f6252' }, { s: 8, e: 8, label: 'Finals', c: '#40826d' }] },
  { label: 'Fitness tests', bars: [{ s: 2, e: 2, label: 'Start', c: '#4a5a57' }, { s: 5, e: 5, label: 'Mid', c: '#4a5a57' }, { s: 8, e: 8, label: 'End', c: '#4a5a57' }] },
  { label: 'Coach courses', bars: [{ s: 2, e: 2, label: 'MiniRoos', c: '#cbbeb5' }, { s: 5, e: 6, label: 'Club course', c: '#cbbeb5' }, { s: 10, e: 10, label: 'C Diploma', c: '#cbbeb5' }] },
  { label: 'Registrations', bars: [{ s: 0, e: 0, label: 'Winter', c: '#cbbeb5' }, { s: 7, e: 7, label: 'Futsal', c: '#cbbeb5' }] },
]

export default function ClubTab({ role, empty, homeStory }: { role: 'chair' | 'dof'; empty?: boolean; homeStory?: import('react').ReactNode }) {
  const [view, setView] = useState<ClubView>('overview')
  const [headingPolicy, setHeadingPolicy] = useState<'england' | 'own' | 'none' | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const pad = { padding: '16px 20px' }
  const card = { background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 14 }

  return (
    <>
      <SubTabBar
        items={[
          { id: 'overview', label: 'Overview' },
          { id: 'inbox', label: 'Inbox' },
          { id: 'calendar', label: 'Calendar' },
          { id: 'seasonplan', label: 'Season plan' },
          { id: 'playingstyle', label: 'Playing style' },
          { id: 'headingpolicy', label: 'Heading policy' },
          { id: 'kit', label: 'Kit and cameras' },
          { id: 'settings', label: 'Club settings' },
        ]}
        active={view}
        onSelect={id => setView(id as ClubView)}
      />

      {view === 'overview' && !empty && homeStory}

      {empty && view === 'overview' && (
        <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#10211f', marginBottom: 4 }}>Welcome, Rachel</div>
            <div style={{ fontSize: 14, color: '#4a5a57', marginBottom: 20 }}>Wattle Creek FC · Director of football · let's set up the club</div>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid #e9eae8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Set up the club</span>
                <span style={{ fontSize: 13, color: '#6f7f7b' }}>0 of 6 · about 30 minutes</span>
              </div>
              {[
                { n: 1, t: 'Bring in your teams', sub: 'Import teams and players from PlayFootball, or add teams one by one.', cta: 'Import' },
                { n: 2, t: 'Invite your coaches', sub: "Each coach gets a link for their team. Add their children check number.", cta: 'Invite' },
                { n: 3, t: 'Name a welfare officer', sub: 'The one person who sees safeguarding concerns in full.', cta: 'Name' },
                { n: 4, t: 'Set the club rules', sub: 'Fair minutes, who sees the first-aid card, consent, how long video is kept.', cta: 'Set rules' },
                { n: 5, t: "Set the club playing style", sub: "Every team's numbers are measured against it.", cta: 'Set style' },
                { n: 6, t: 'Add club kit', sub: 'Cameras, boot sensors and vests, shared between teams.', cta: 'Add kit' },
              ].map((item, i) => (
                <div key={item.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', borderTop: i > 0 ? '1px solid #e9eae8' : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#f0f1f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#6f7f7b', flexShrink: 0 }}>{item.n}</div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{item.t}</div>
                    <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: 1.4 }}>{item.sub}</div>
                  </div>
                  <button onClick={() => showToast(`Opens ${item.cta.toLowerCase()} setup.`)} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>{item.cta}</button>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: 1.5, marginBottom: 10 }}>Coaches can start before you finish. Each team can set itself up from a coach link.</div>
            <button onClick={() => showToast('Opening setup call booking.')} style={{ height: 44, padding: '0 16px', borderRadius: '999px', border: '1px solid #c5c8c4', background: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Book a setup call</button>
          </div>
          <div>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e9eae8', padding: '16px', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>What you will see here</div>
              {[
                { label: 'PLAYING OUR WAY', val: '—', sub: 'Teams matching the club style' },
                { label: 'TRAINING TURNOUT', val: '—', sub: 'Every team, every session' },
                { label: 'FAIR GAME TIME', val: '—', sub: 'Teams inside the minutes policy' },
                { label: 'COACHES CLEARED', val: '—', sub: 'Children checks valid' },
              ].map((m, i) => (
                <div key={i} style={{ padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#6f7f7b', marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#10211f', marginBottom: 1 }}>{m.val}</div>
                  <div style={{ fontSize: 12, color: '#4a5a57' }}>{m.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#eef5f2', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2f6252', marginBottom: 8 }}>Who does what</div>
              {[
                { who: 'You and the chair', what: 'See every team. Set the style and the rules.' },
                { who: 'Coaches, fitness coaches, team managers', what: 'Run their own team. Cannot see other teams.' },
                { who: 'Parents and players', what: 'Join with a team link. See only their own child.' },
              ].map((r, i) => (
                <div key={i} style={{ padding: '8px 0', borderTop: i > 0 ? '1px solid #c5d9d2' : 'none' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#1f4a3e', marginBottom: 2 }}>{r.who}</div>
                  <div style={{ fontSize: 12, color: '#4a5a57' }}>{r.what}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={pad}>

        {view === 'overview' && role === 'chair' && !empty && !homeStory && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
              {[{ n: '212', l: 'Players', sub: '+16 on last season' }, { n: '91%', l: 'Coming back', sub: 'Re-registered from last season' }, { n: '2 open', l: 'Safeguarding', sub: 'Both on track · none overdue' }, { n: '96%', l: 'Parent consent', sub: '204 of 212 players complete' }].map(s => (
                <div key={s.l} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#10211f' }}>{s.n}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f', marginTop: 2 }}>{s.l}</div>
                  <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <div style={card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Is the club in good shape?</div>
                    <div style={{ fontSize: 12, color: '#6f7f7b' }}>Plain answers for the committee</div>
                  </div>
                  {[
                    { q: 'Are kids enjoying it?', ans: 'Yes', ansColor: '#40826d', ansBg: '#e4f2eb', detail: "Turnout 87%. Player check-ins average 4.1 out of 5 for \"I had fun\"." },
                    { q: 'Are they getting better?', ans: 'Yes', ansColor: '#40826d', ansBg: '#e4f2eb', detail: '61% of player goals met this season, up from 48% last season.' },
                    { q: 'Is everyone getting a fair go?', ans: 'Mostly', ansColor: '#c3a84a', ansBg: '#fdf8ed', detail: '2 teams below the minutes policy. U11 Luke and U16 Ollie.' },
                    { q: 'Are our coaches cleared and trained?', ans: 'Act now', ansColor: '#c39797', ansBg: '#fdf4f4', detail: '4 checks run out soon. 9 coaches still to do the club course.' },
                    { q: 'Is player data handled properly?', ans: 'Yes', ansColor: '#40826d', ansBg: '#e4f2eb', detail: 'Consent 96%. No data requests waiting. Full match video deleted after 90 days.' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '999px', background: item.ansBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 10, color: item.ansColor }}>✓</span>
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{item.q}</div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: item.ansColor, background: item.ansBg, borderRadius: 6, padding: '2px 8px', flexShrink: 0 }}>{item.ans}</span>
                        </div>
                        <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Players by age</div>
                    <div style={{ fontSize: 11, color: '#6f7f7b' }}>This season vs last</div>
                  </div>
                  {[{ label: 'MiniRoos', n: 98, delta: '+8' }, { label: 'U12–U14', n: 85, delta: '+7' }, { label: 'U15–U16', n: 29, delta: '+1' }].map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 60, fontSize: 12, color: '#6f7f7b', flexShrink: 0 }}>{r.label}</div>
                      <div style={{ flexGrow: 1, height: 8, borderRadius: 4, background: '#f0f1f0', overflow: 'hidden' }}>
                        <div style={{ height: '100%', borderRadius: 4, background: '#2f6252', width: `${(r.n / 100) * 100}%` }} />
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', width: 24, flexShrink: 0 }}>{r.n}</div>
                      <div style={{ fontSize: 11, color: '#40826d', width: 24, flexShrink: 0 }}>{r.delta}</div>
                    </div>
                  ))}
                  <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 8 }}>{"Girls' teams grew fastest: 3 teams, 45 players, up from 31."}</div>
                </div>
                <div style={card}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Club kit</div>
                  <div style={{ fontSize: 11, color: '#6f7f7b', marginBottom: 8 }}>Shared between teams</div>
                  {[
                    { label: 'Match cameras', detail: '3 of 4 working', tag: 'Kit 2 at repair', tagC: '#c39797', tagBg: '#fdf4f4' },
                    { label: 'Boot sensor sets', detail: '96 pairs', tag: 'OK', tagC: '#40826d', tagBg: '#e4f2eb' },
                    { label: 'GPS vests', detail: '64 of 70 working', tag: '6 to repair', tagC: '#c39797', tagBg: '#fdf4f4' },
                  ].map((k, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{k.label}</div>
                        <div style={{ fontSize: 12, color: '#6f7f7b' }}>{k.detail}</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: k.tagC, background: k.tagBg, borderRadius: 6, padding: '2px 8px' }}>{k.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {view === 'overview' && role === 'dof' && !empty && !homeStory && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 14 }}>
              {[{ n: '67%', l: 'Playing our way', sub: 'Teams matching the club style · up from 51%' }, { n: '87%', l: 'Training turnout', sub: 'All teams, last 2 weeks' }, { n: '12 of 14', l: 'Fair game time', sub: 'Teams inside the club minutes policy' }, { n: '27 of 31', l: 'Coaches cleared', sub: 'Working with Children Checks valid' }].map(s => (
                <div key={s.l} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#10211f' }}>{s.n}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f', marginTop: 2 }}>{s.l}</div>
                  <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Needs you this week</div>
                  <div style={{ fontSize: 12, color: '#6f7f7b' }}>5 things</div>
                </div>
                {[
                  { text: 'U9 Mark has no coach on Saturday', sub: 'Tom Albers can cover. U9 Tom kick off 30 min earlier.', cta: 'Ask Tom' },
                  { text: "4 coaches' checks run out soon", sub: "Chris and Luke inside 14 days. Can't run sessions once expired.", cta: 'Remind' },
                  { text: 'U13 Chris and U15 Girls Bec missing games', sub: 'Only 3 and 2 of their last 6 games recorded. Camera kit 2 is away for repair.', cta: 'Fix kit' },
                  { text: 'U16 Ollie heavy legs', sub: 'Load up 30% two weeks running. Fitness coach is on it.', cta: 'See load' },
                  { text: 'Coach meeting on Tuesday', sub: "Agenda drafted from this week's numbers.", cta: 'Open' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{item.text}</div>
                      <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{item.sub}</div>
                    </div>
                    <button onClick={() => showToast(`${item.cta} sent.`)} style={{ flexShrink: 0, height: 44, padding: '0 12px', borderRadius: '999px', border: '1px solid #2f6252', background: '#fff', color: '#2f6252', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{item.cta}</button>
                  </div>
                ))}
              </div>
              <div style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Teams to watch</div>
                  <button onClick={() => showToast('Opening all teams view.')} style={{ fontSize: 12, color: '#2f6252', background: 'none', border: 0, cursor: 'pointer', fontFamily: 'inherit' }}>All 14 teams</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: '6px 12px', fontSize: 12 }}>
                  <div style={{ color: '#6f7f7b', fontWeight: 700 }}>TEAM</div>
                  <div style={{ color: '#6f7f7b', fontWeight: 700 }}>COACH</div>
                  <div style={{ color: '#6f7f7b', fontWeight: 700 }}>OUR WAY</div>
                  <div style={{ color: '#6f7f7b', fontWeight: 700 }}>TURNOUT</div>
                  {[
                    { team: 'U9 Mark', sub: 'Kangaroos', coach: '', results: [], style: 0, turnout: 84, alert: 'No coach Sat' },
                    { team: 'U11 Luke', sub: 'Wallabies', coach: 'Luke Fraser', results: ['W','D','L','W','L'], style: 52, turnout: 79 },
                    { team: 'U12 Sam', sub: '', coach: 'Sam K', results: ['W','W','D','L','W'], style: 78, turnout: 92 },
                    { team: 'U13 Chris', sub: 'Division 2', coach: 'Chris Pham', results: ['L','W','L','L','D'], style: 58, turnout: 81 },
                    { team: 'U15 Girls Bec', sub: 'Division 2', coach: 'Bec Ward', results: ['W','L','W','D','D'], style: 66, turnout: 85 },
                    { team: 'U16 Ollie', sub: 'Division 1', coach: 'Ollie Grant', results: ['L','D','W','L','L'], style: 55, turnout: 76 },
                  ].map((row, i) => (
                    <>
                      <div key={`a${i}`} style={{ padding: '6px 0', borderTop: '1px solid #f0f1f0' }}>
                        <div style={{ fontWeight: 700, color: '#10211f', fontSize: 13 }}>{row.team}</div>
                        {row.sub && <div style={{ color: '#6f7f7b', fontSize: 11 }}>{row.sub}</div>}
                        {row.alert && <span style={{ fontSize: 10, fontWeight: 700, color: '#c39797', background: '#fdf4f4', borderRadius: 4, padding: '1px 6px' }}>{row.alert}</span>}
                      </div>
                      <div key={`b${i}`} style={{ padding: '6px 0', borderTop: '1px solid #f0f1f0', fontSize: 12, color: '#6f7f7b', display: 'flex', alignItems: 'center' }}>
                        {row.coach || <span style={{ color: '#c39797' }}>No coach assigned</span>}
                      </div>
                      <div key={`c${i}`} style={{ padding: '6px 0', borderTop: '1px solid #f0f1f0', display: 'flex', alignItems: 'center' }}>
                        {row.style > 0 ? <span style={{ fontWeight: 700, color: '#10211f' }}>{row.style}%</span> : <span style={{ color: '#6f7f7b' }}>—</span>}
                      </div>
                      <div key={`d${i}`} style={{ padding: '6px 0', borderTop: '1px solid #f0f1f0', display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: '#10211f' }}>{row.turnout}%</span>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {view === 'inbox' && (
          <>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>Inbox</div>
            {[
              { title: 'U11 Luke · Fair game time alert', body: 'Fewest player minutes at 28% — below the ½ game minimum for Kangaroos.', time: '2h ago', dot: '#c39797' },
              { title: 'Coach meeting RSVP', body: '19 coaches confirmed for Tue 9 Jun · 7:30 pm.', time: '1 day ago', dot: '#40826d' },
              { title: 'Kit 2 returned from repair', body: 'Camera kit 2 is back and ready to book.', time: '2 days ago', dot: '#40826d' },
              { title: 'Registration closes Friday', body: '6 pending registrations. Chase before Fri 8 Nov.', time: '3 days ago', dot: '#c3a84a' },
            ].map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: '999px', background: n.dot, marginTop: 6, flexShrink: 0 }} />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{n.title}</div>
                  <div style={{ fontSize: 13, color: '#4a5a57', marginTop: 2 }}>{n.body}</div>
                  <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 4 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </>
        )}

        {view === 'calendar' && (
          <>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>November 2026</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 16 }}>
              {['M','T','W','T','F','S','S'].map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#6f7f7b', padding: '4px 0' }}>{d}</div>)}
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1
                const isEvent = [8, 9, 11, 16, 23].includes(day)
                const isToday = day === 8
                return <div key={i} style={{ textAlign: 'center', padding: '6px 0', borderRadius: 8, fontSize: 13, fontWeight: isToday ? 800 : 400, background: isToday ? '#1f4a3e' : 'transparent', color: isToday ? '#fff' : isEvent ? '#2f6252' : '#10211f', position: 'relative' }}>
                  {day}{isEvent && !isToday && <div style={{ width: 4, height: 4, borderRadius: '999px', background: '#2f6252', margin: '1px auto 0' }} />}
                </div>
              })}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Upcoming events</div>
            {[{ date: 'Fri 8', label: 'Registrations close', teams: 'All teams' }, { date: 'Sat 9', label: 'U12 carnival', teams: 'U10, U12' }, { date: 'Mon 11', label: 'Committee meeting', teams: 'Committee' }, { date: 'Sat 16', label: 'Round 14 fixtures', teams: 'All competitive' }].map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none', alignItems: 'center' }}>
                <div style={{ width: 42, textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#2f6252', flexShrink: 0 }}>{e.date}</div>
                <div><div style={{ fontSize: 14, fontWeight: 600, color: '#10211f' }}>{e.label}</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>{e.teams}</div></div>
              </div>
            ))}
          </>
        )}

        {view === 'seasonplan' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f' }}>Season plan</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>Season 2026 · winter football with a summer break</div>
              </div>
              <button onClick={() => showToast('Adding season plan to calendar.')} style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Add to calendar</button>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '130px repeat(12, 1fr)', borderBottom: '1px solid #f0f1f0' }}>
                <div style={{ padding: '8px 12px', fontSize: 11, color: '#6f7f7b', fontWeight: 700 }} />
                {MONTHS.map(m => <div key={m} style={{ padding: '8px 4px', fontSize: 10, fontWeight: 700, color: '#6f7f7b', textAlign: 'center' }}>{m}</div>)}
              </div>
              {GANTT_ROWS.map((row, ri) => (
                <div key={ri} style={{ display: 'grid', gridTemplateColumns: '130px repeat(12, 1fr)', borderBottom: ri < GANTT_ROWS.length - 1 ? '1px solid #f0f1f0' : 'none', minHeight: 36 }}>
                  <div style={{ padding: '10px 12px', fontSize: 12, fontWeight: 600, color: '#10211f', borderRight: '1px solid #f0f1f0', display: 'flex', alignItems: 'center' }}>{row.label}</div>
                  {Array.from({ length: 12 }).map((_, mi) => {
                    const bar = row.bars.find(b => b.s === mi)
                    if (bar) {
                      const span = bar.e - bar.s + 1
                      return <div key={mi} style={{ gridColumn: `span ${span}`, background: bar.c, margin: '6px 2px', borderRadius: 6, display: 'flex', alignItems: 'center', padding: '0 6px' }}>
                        <span style={{ fontSize: 10, color: '#fff', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{bar.label}</span>
                      </div>
                    }
                    const isCovered = row.bars.some(b => mi > b.s && mi <= b.e)
                    if (isCovered) return null
                    return <div key={mi} />
                  })}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: '10px 14px', background: '#fff', borderRadius: 10, border: '1px solid #e9eae8', fontSize: 12, color: '#6f7f7b' }}>
              Today, Sat 8 Nov · round 9 of 18 · Coming up: mid-season fitness tests 13 to 20 Jun · club course 20 Jun · late registrations close 30 Jun.
            </div>
          </>
        )}

        {view === 'playingstyle' && (
          <div style={card}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Club playing style</div>
            <div style={{ fontSize: 13, color: '#4a5a57', lineHeight: '20px', marginBottom: 16 }}>The club style is shared with every coach and shapes the drill library. Coaches can adapt it for their age group.</div>
            {[{ label: 'Build from the back', pct: 78 }, { label: 'High press', pct: 65 }, { label: 'Wide play', pct: 70 }, { label: 'Positional rotations', pct: 55 }].map((s, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: '#10211f' }}>{s.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#2f6252' }}>{s.pct}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: '#f0f1f0' }}><div style={{ height: 6, borderRadius: 3, background: '#2f6252', width: `${s.pct}%` }} /></div>
              </div>
            ))}
            <button onClick={() => showToast('Opens style editor.')} style={{ marginTop: 8, height: 44, padding: '0 16px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Edit style</button>
          </div>
        )}

        {view === 'headingpolicy' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f' }}>Heading policy</div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#6f7f7b', background: '#f0f1f0', borderRadius: 6, padding: '2px 8px' }}>Not chosen yet</span>
              </div>
              <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 20 }}>Football Australia has no national heading rule yet · the club decides</div>
              <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 16 }}>Nothing is turned on until you choose. Right now every heading drill shows for every team.</div>
              {[
                { id: 'england' as const, label: 'Follow England FA guidance', desc: 'No heading in training for U11 and under. Up to 10 headers in one session a week for U12 to U16. Nothing changes in games.' },
                { id: 'own' as const, label: 'Write our own', desc: 'Pick the ages and limits yourself. Clean Sheet applies them the same way.' },
                { id: 'none' as const, label: 'No club policy', desc: 'Every drill shows for every team. Coaches decide.' },
              ].map(opt => (
                <button key={opt.id} onClick={() => setHeadingPolicy(opt.id)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', width: '100%', textAlign: 'left', padding: '14px 16px', marginBottom: 10, borderRadius: 12, border: `1.5px solid ${headingPolicy === opt.id ? '#2f6252' : '#e9eae8'}`, background: headingPolicy === opt.id ? '#f0f8f4' : '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '999px', border: `2px solid ${headingPolicy === opt.id ? '#2f6252' : '#c5c8c4'}`, marginTop: 2, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {headingPolicy === opt.id && <div style={{ width: 8, height: 8, borderRadius: '999px', background: '#2f6252' }} />}
                  </div>
                  <div><div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 2 }}>{opt.label}</div><div style={{ fontSize: 13, color: '#4a5a57' }}>{opt.desc}</div></div>
                </button>
              ))}
            </div>
            <div style={card}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>What changes when you choose</div>
              {[
                { icon: '📚', title: 'Drill library', desc: 'Heading drills are hidden or marked for the ages you pick' },
                { icon: '📊', title: 'Header counts', desc: "Older teams' sessions count headers, so coaches stay inside the limit" },
                { icon: '👨‍👩‍👧', title: 'Parents', desc: 'Parents see the policy on the team page' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div><div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{item.title}</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>{item.desc}</div></div>
                </div>
              ))}
              <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 12 }}>You can change it at any time.</div>
            </div>
          </div>
        )}

        {view === 'kit' && (
          <>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Camera kit</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[{ id: 'Kit 1', status: 'Available', c: '#40826d', bg: '#e4f2eb' }, { id: 'Kit 2', status: 'Booked · U12 Sat', c: '#c3a84a', bg: '#fdf8ed' }, { id: 'Kit 3', status: 'Available', c: '#40826d', bg: '#e4f2eb' }, { id: 'Kit 4', status: 'Repair needed', c: '#c39797', bg: '#fdf4f4' }].map(k => (
                <div key={k.id} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>{k.id}</div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: k.c, background: k.bg, borderRadius: 6, padding: '2px 8px' }}>{k.status}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Kit bags</div>
            {[{ name: 'First aid (4 bags)', status: 'All in place' }, { name: 'Bibs (all teams)', status: '3 bags need restocking' }, { name: 'Training balls', status: '48/50 accounted for' }].map((k, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <span style={{ fontSize: 14, color: '#10211f' }}>{k.name}</span>
                <span style={{ fontSize: 13, color: '#6f7f7b' }}>{k.status}</span>
              </div>
            ))}
          </>
        )}

        {view === 'settings' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Club settings</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>Wattle Creek FC · only the chair and director can change these</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => showToast('Changes discarded.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => showToast('Settings saved.')} style={{ height: 44, padding: '0 14px', borderRadius: 10, border: 'none', background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Save</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Club details */}
                <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, overflow: 'hidden' }}>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid #e9eae8', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b' }}>CLUB DETAILS</div>
                  {[
                    { label: 'CLUB NAME',         value: 'Wattle Creek FC' },
                    { label: 'HOME GROUND',        value: 'Wattle Creek Reserve, 5 pitches' },
                    { label: 'STATE AND LEAGUE',   value: 'Victoria · Football Victoria' },
                    { label: 'CLUB COLOURS',       value: 'Green and white' },
                  ].map(f => (
                    <div key={f.label} style={{ padding: '10px 16px', borderBottom: '1px solid #e9eae8' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b', marginBottom: 5 }}>{f.label}</div>
                      <div style={{ height: 40, border: '1px solid #e9eae8', borderRadius: 8, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 14, background: '#fafafa', color: '#10211f' }}>{f.value}</div>
                    </div>
                  ))}
                  <div style={{ padding: '10px 16px', fontSize: 12, color: '#6f7f7b' }}>The club name and ground show to every family and coach.</div>
                </div>

                {/* Season and defaults */}
                <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, overflow: 'hidden' }}>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid #e9eae8', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b' }}>SEASON AND DEFAULTS</div>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid #e9eae8' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b', marginBottom: 5 }}>SEASON</div>
                    <div style={{ height: 40, border: '1px solid #e9eae8', borderRadius: 8, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 14, background: '#fafafa', color: '#10211f' }}>11 Apr to 22 Aug 2026</div>
                  </div>
                  {[
                    { label: 'Full match video kept', value: '90 days' },
                    { label: 'Data stored in', value: 'Australia' },
                  ].map(f => (
                    <div key={f.label} style={{ padding: '10px 16px', borderBottom: '1px solid #e9eae8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 14, color: '#10211f' }}>{f.label}</span>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#4a5a57' }}>{f.value}</span>
                        <button onClick={() => showToast(`Opens ${f.label.toLowerCase()} change.`)} style={{ height: 44, padding: '0 10px', borderRadius: 999, border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer' }}>Change</button>
                      </div>
                    </div>
                  ))}
                  {[
                    { label: 'Clips can be downloaded', on: false },
                    { label: 'Faces blurred outside coaching', on: true },
                  ].map(r => (
                    <div key={r.label} style={{ padding: '10px 16px', borderBottom: '1px solid #e9eae8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 14, color: '#10211f' }}>{r.label}</span>
                      <span style={{ flexShrink: 0, width: 44, height: 26, borderRadius: 13, background: r.on ? '#2f6252' : '#d6d9d7', display: 'flex', alignItems: 'center', justifyContent: r.on ? 'flex-end' : 'flex-start', padding: 3, boxSizing: 'border-box' as const }}>
                        <span style={{ width: 20, height: 20, borderRadius: 10, background: '#fff' }} />
                      </span>
                    </div>
                  ))}
                  <div style={{ padding: '10px 16px', fontSize: 12, color: '#6f7f7b', lineHeight: 1.5 }}>Changing a privacy default emails every family before it takes effect.</div>
                </div>
              </div>

              {/* Right: officers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, overflow: 'hidden' }}>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid #e9eae8', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b' }}>CLUB OFFICERS</div>
                  {[
                    { label: 'Welfare officer',      name: 'Helen Park',    ini: 'HP', role: 'Club volunteer · all families know her name' },
                    { label: 'Concussion officer',   name: 'Marco Bellini', ini: 'MB', role: 'Physio · told about every head knock' },
                  ].map((o, i) => (
                    <div key={o.label} style={{ padding: '12px 16px', borderBottom: i === 0 ? '1px solid #e9eae8' : 'none' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b', marginBottom: 8 }}>{o.label.toUpperCase()}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1f4a3e', color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{o.ini}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{o.name}</div>
                          <div style={{ fontSize: 12, color: '#6f7f7b' }}>{o.role}</div>
                        </div>
                        <button onClick={() => showToast(`Opens ${o.label.toLowerCase()} change.`)} style={{ height: 44, padding: '0 10px', borderRadius: 999, border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer' }}>Change</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, overflow: 'hidden' }}>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid #e9eae8', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b' }}>CONNECTIONS</div>
                  {[
                    { name: 'Dribl', desc: 'Fixtures, team sheets, results', status: 'Connected', c: '#40826d', bg: '#e4f2eb' },
                    { name: 'WWC Connect', desc: 'Children checks · 27 of 31 valid', status: 'Connected', c: '#40826d', bg: '#e4f2eb' },
                    { name: 'PlayFootball', desc: 'Registrations and player IDs', status: 'Connected', c: '#40826d', bg: '#e4f2eb' },
                    { name: 'Partner academy', desc: 'Talent pathway referrals', status: 'Not set up', c: '#6f7f7b', bg: '#f4f4f4' },
                  ].map((c, i) => (
                    <div key={c.name} style={{ padding: '10px 16px', borderBottom: i < 3 ? '1px solid #e9eae8' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{c.name}</div>
                        <div style={{ fontSize: 12, color: '#6f7f7b' }}>{c.desc}</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: c.c, background: c.bg, borderRadius: 999, padding: '2px 8px' }}>{c.status}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#fafafa', border: '1px solid #e9eae8', borderRadius: 12, padding: '10px 14px', fontSize: 12, color: '#6f7f7b', lineHeight: 1.5 }}>
                  Connections sync each morning. Changes to club details apply immediately to what families and coaches see.
                </div>
              </div>
            </div>
          </>
        )}

      </div>
      {toast && <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 100, padding: '12px 20px', borderRadius: 12, background: '#1f4a3e', color: '#fff', fontSize: 15, fontWeight: 600, boxShadow: '0 8px 24px rgba(16,33,31,0.25)', whiteSpace: 'nowrap' }}>{toast}</div>}
    </>
  )
}
