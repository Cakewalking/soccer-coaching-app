import { useState } from 'react'
import { COACHES_DATA } from './data'
import { SubTabBar, BackBtn } from './ui'

type CoachesView = 'allcoaches' | 'training' | 'meetings' | 'goalkeepers' | 'drilllib'

export default function CoachesTab() {
  const [view, setView] = useState<CoachesView>('allcoaches')
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null)

  const p = { padding: '16px 20px' }

  return (
    <>
      <SubTabBar
        items={[
          { id: 'allcoaches', label: 'All coaches' },
          { id: 'training', label: 'Training and courses' },
          { id: 'meetings', label: 'Coach meetings' },
          { id: 'goalkeepers', label: 'Goalkeepers' },
          { id: 'drilllib', label: 'Club drill library' },
        ]}
        active={view}
        onSelect={id => { setView(id as CoachesView); setSelectedCoach(null) }}
      />

      {view === 'allcoaches' && (
        <div style={{ display: 'grid', gridTemplateColumns: selectedCoach ? '1fr 320px' : '1fr', gap: 0 }}>
          <div style={p}>
            {selectedCoach && <BackBtn label="All coaches" onClick={() => setSelectedCoach(null)} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Coaches · {COACHES_DATA.length} coaches · 9 shown · sorted by what needs doing</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>1 request to join</button>
                <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Invite a coach</button>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 130px 90px 90px', padding: '8px 16px', borderBottom: '1px solid #f0f1f0', gap: 8 }}>
                {['COACH','TEAM','TRAINING','CHILDREN CHECK','SESSIONS','GAMES'].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
              </div>
              {COACHES_DATA.map((c, i) => {
                const expiring = c.checkDays > 0 && c.checkDays <= 30
                const urgent = c.checkDays > 0 && c.checkDays <= 14
                return (
                  <button key={i} onClick={() => setSelectedCoach(c.name)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 130px 90px 90px', padding: '12px 16px', borderBottom: i < COACHES_DATA.length - 1 ? '1px solid #f0f1f0' : 'none', gap: 8, alignItems: 'center', width: '100%', textAlign: 'left', background: selectedCoach === c.name ? '#f0f8f4' : 'transparent', cursor: 'pointer', fontFamily: 'inherit', border: 0 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.ini}</div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{c.name}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#6f7f7b' }}>{c.team}</div>
                    <div style={{ fontSize: 12, color: c.training.includes('due') ? '#c39797' : '#6f7f7b' }}>{c.training}</div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: urgent ? '#c39797' : expiring ? '#c3a84a' : '#40826d', background: urgent ? '#fdf4f4' : expiring ? '#fdf8ed' : '#e4f2eb', borderRadius: 6, padding: '2px 8px' }}>{c.check}</span>
                    <div style={{ fontSize: 12, color: '#10211f' }}>{c.sessions}</div>
                    <div style={{ fontSize: 12, color: '#10211f' }}>{c.games}</div>
                  </button>
                )
              })}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: '#6f7f7b', padding: '10px 14px', background: '#fff', borderRadius: 10, border: '1px solid #e9eae8' }}>
              Sessions planned and games reviewed are counted in Clean Sheet over the last 6 weeks. They show who might need a hand, not who is a good coach.
            </div>
          </div>

          {selectedCoach && (() => {
            const c = COACHES_DATA.find(x => x.name === selectedCoach)
            if (!c) return null
            const urgent = c.checkDays > 0 && c.checkDays <= 14
            return (
              <div style={{ borderLeft: '1px solid #e9eae8', padding: '16px', background: '#fff' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '999px', background: '#c39797', color: '#10211f', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.ini}</div>
                  <div><div style={{ fontSize: 15, fontWeight: 800, color: '#10211f' }}>{c.name}</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>{c.team} · 2nd season · volunteer</div></div>
                </div>
                {urgent && (
                  <div style={{ background: '#fdf4f4', borderRadius: 10, padding: '10px 12px', marginBottom: 14, fontSize: 13, color: '#10211f' }}>
                    <span style={{ fontWeight: 700 }}>Check ends in {c.checkDays} days.</span> {c.name.split(' ')[0]} cannot run sessions after {c.checkDays <= 9 ? '14 Jun' : '20 Jun'} until it is renewed.
                  </div>
                )}
                <div style={{ fontSize: 12, fontWeight: 700, color: '#6f7f7b', marginBottom: 10 }}>HOW THE SEASON'S GOING</div>
                {[{ label: 'Results', value: c.results }, { label: 'Playing our way', value: c.style > 0 ? `${c.style}%` : '—' }, { label: 'Turnout', value: c.turnout > 0 ? `${c.turnout}%` : '—' }, { label: 'Games recorded', value: c.recorded }].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                    <span style={{ fontSize: 13, color: '#6f7f7b' }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{row.value}</span>
                  </div>
                ))}
                {c.helpNote && (
                  <div style={{ marginTop: 14, padding: '10px 12px', background: '#f0f8f4', borderRadius: 10, border: '1px solid #d4ebe0' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#2f6252', marginBottom: 4 }}>MIGHT HELP</div>
                    <div style={{ fontSize: 13, color: '#10211f' }}>{c.helpNote}</div>
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                  <button style={{ height: 40, borderRadius: '999px', border: 0, background: '#1f4a3e', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Message {c.name.split(' ')[0]}</button>
                  <button style={{ height: 40, borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer' }}>Send check renewal link</button>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {view === 'training' && (
        <div style={p}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div><div style={{ fontSize: 18, fontWeight: 800, color: '#10211f' }}>Training and courses</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>31 coaches · what they've done and what's next</div></div>
            <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Invite the 9 to the club course</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
            {[{ n: '22 of 31', label: 'Club course done', sub: '9 to go · next one Sat 20 Jun' }, { n: '14', label: 'Foundation courses', sub: 'MiniRoos or Foundation of Football' }, { n: '3', label: 'C Diploma', sub: 'Sam K, Bec Ward and one assistant' }, { n: '18 of 31', label: 'First aid', sub: 'Every team has at least one' }].map(s => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#10211f' }}>{s.n}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f', marginTop: 2 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 4 }}>Club course · Sat 20 Jun · 9:00 to 12:00</div>
              <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 12 }}>Clubrooms · 9 coaches</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[{ ini: 'LF', name: 'Luke Fraser', team: 'U11 Luke' }, { ini: 'TA', name: 'Tom Albers', team: 'U9 Tom' }, { ini: 'DO', name: 'Dan Okafor', team: 'U7 Dan' }, { ini: 'HR', name: 'Hannah Reid', team: 'U8 Hannah' }, { ini: 'ME', name: 'Mark Ellis', team: 'U9 Mark' }, { ini: 'NR', name: 'Nadia Rahman', team: 'U10 Nadia' }, { ini: 'MD', name: 'Meg Doyle', team: 'U13 Girls Meg' }, { ini: 'JK', name: 'Josh Kerr', team: 'U14 Josh' }, { ini: 'JM', name: 'Jess Marsh', team: 'U12 Sam, co-coach' }].map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.ini}</div>
                    <div><div style={{ fontSize: 12, fontWeight: 600, color: '#10211f' }}>{c.name}</div><div style={{ fontSize: 10, color: '#6f7f7b' }}>{c.team}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>Next steps for coaches</div>
              {[{ ini: 'MR', label: 'MiniRoos course', desc: 'For coaches of players up to about 10', cta: 'Share' }, { ini: 'FF', label: 'Foundation of Football', desc: 'Players up to about 15 · needed before the C Diploma', cta: 'Share' }, { ini: 'GK', label: 'Foundation of Goalkeeping', desc: 'For anyone coaching keepers', cta: 'Share' }, { ini: 'C', label: 'C Diploma', desc: 'Advanced · club pays half for one coach a year', cta: 'Nominate' }, { ini: 'FA', label: 'First aid', desc: 'Club runs one each season', cta: 'Book' }].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#e4f2eb', color: '#2f6252', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.ini}</div>
                    <div><div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{item.label}</div><div style={{ fontSize: 11, color: '#6f7f7b' }}>{item.desc}</div></div>
                  </div>
                  <button style={{ flexShrink: 0, height: 28, padding: '0 12px', borderRadius: '999px', border: '1px solid #2f6252', background: '#fff', color: '#2f6252', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{item.cta}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'meetings' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, padding: p.padding }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f' }}>Coach meeting</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>Tue 9 Jun · 7:30 pm · clubrooms and online</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#10211f', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Edit agenda</button>
                <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Send agenda</button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '14px 0 10px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Agenda</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Drafted from this week's numbers · 45 minutes</div>
            </div>
            {[
              { n: 1, title: 'Children checks', desc: '4 run out within 30 days. Chris and Luke inside 14 days.' },
              { n: 2, title: 'Fair game time', desc: 'U11 Luke under half and U16 Ollie under a third. Everyone else is fine.' },
              { n: 3, title: 'Playing our way', desc: "67%, up from 61%. U12 Girls Ana press the best. What are they doing?" },
              { n: 4, title: 'Cameras', desc: 'Kit 2 back Fri 12 Jun. U13 Chris and U15 Girls Bec get first go.' },
              { n: 5, title: 'Club course', desc: '9 coaches booked for Sat 20 Jun.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none', alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#e4f2eb', color: '#2f6252', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.n}</div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#6f7f7b', marginTop: 2 }}>{item.desc}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c5c8c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
              </div>
            ))}
          </div>
          <div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>{"Who's coming"}</div>
              <div style={{ display: 'flex', gap: 16 }}>
                {[{ n: 19, l: 'Coming' }, { n: 5, l: 'Online' }, { n: 7, l: 'No answer' }].map(s => (
                  <div key={s.l} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#10211f' }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: '#6f7f7b' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#6f7f7b', marginBottom: 8 }}>LAST MEETING · 12 MAY</div>
              {["Agree the minutes policy from U14", "Pair new coaches with a mentor", "Fix camera kit 2"].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0' }}>
                  <span style={{ color: '#40826d', fontSize: 13 }}>✓</span>
                  <span style={{ fontSize: 13, color: '#6f7f7b' }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width: '100%', height: 40, borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer' }}>Remind the 7</button>
          </div>
        </div>
      )}

      {view === 'goalkeepers' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, padding: p.padding }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 14 }}>Keepers by team</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '8px 0', borderBottom: '1px solid #f0f1f0', gap: 8 }}>
              {['TEAM','KEEPER','AGE','STATUS'].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
            </div>
            {[{ team: 'U12 Sam', keeper: 'Leo Marsh', age: 12, status: 'Active' }, { team: 'U12 Girls Ana', keeper: 'Grace Owusu', age: 12, status: 'Active' }, { team: 'U13 Chris', keeper: 'Noah Ali', age: 13, status: 'Concussion' }, { team: 'U13 Girls Meg', keeper: 'Zara Costa', age: 13, status: 'Active' }, { team: 'U14 Josh', keeper: 'Harry Lee', age: 14, status: 'Active' }, { team: 'U15 Girls Bec', keeper: 'Priya Nair', age: 15, status: 'Active' }, { team: 'U16 Ollie', keeper: 'Tom Walsh', age: 16, status: 'Active' }].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '10px 0', borderBottom: '1px solid #f0f1f0', gap: 8, alignItems: 'center' }}>
                <div style={{ fontSize: 13, color: '#10211f' }}>{row.team}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{row.keeper}</div>
                <div style={{ fontSize: 13, color: '#6f7f7b' }}>U{row.age}</div>
                <span style={{ fontSize: 11, fontWeight: 700, color: row.status === 'Active' ? '#40826d' : '#c39797', background: row.status === 'Active' ? '#e4f2eb' : '#fdf4f4', borderRadius: 6, padding: '2px 8px' }}>{row.status}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>GK coach · Lee Kim</div>
            <div style={{ fontSize: 12, color: '#6f7f7b', marginBottom: 12 }}>All teams · GK Level 1 · Valid Nov 2027</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6f7f7b', marginBottom: 8 }}>THIS SEASON</div>
            {[{ label: 'Keeper sessions run', value: '14' }, { label: 'Teams covered', value: '7 of 7' }, { label: 'Individual coaching', value: '3 keepers' }].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                <span style={{ fontSize: 13, color: '#6f7f7b' }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{row.value}</span>
              </div>
            ))}
            <button style={{ marginTop: 12, width: '100%', height: 36, borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Message Lee</button>
          </div>
        </div>
      )}

      {view === 'drilllib' && (
        <div style={{ ...p, textAlign: 'center', padding: '48px 20px' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>📚</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>Club drill library</div>
          <div style={{ fontSize: 14, color: '#6f7f7b', maxWidth: 400, margin: '0 auto 20px' }}>The club drill library is managed in the coach Training tab. Coaches can access all shared drills from their session planner.</div>
          <button style={{ height: 36, padding: '0 20px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Go to drill library</button>
        </div>
      )}
    </>
  )
}
