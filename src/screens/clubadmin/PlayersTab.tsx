import { useState } from 'react'
import { FAIR_TIME } from './data'
import { SubTabBar } from './ui'

type PlayersView = 'overview' | 'goals' | 'growthload' | 'fairtime' | 'registrations' | 'moves' | 'trials' | 'girls'

const PLAYERS_LIST = [
  { ini: 'MT', name: 'Mia Tran', team: 'U12 Sam', reg: 'done' as const, dob: '12/08/2014' },
  { ini: 'NO', name: 'Noah Owusu', team: 'U14 Sam', reg: 'done' as const, dob: '03/02/2012' },
  { ini: 'EB', name: 'Ella Brennan', team: 'U14 Sam', reg: 'pending' as const, dob: '19/11/2012' },
  { ini: 'JP', name: 'Jai Patel', team: 'U16 Boys', reg: 'done' as const, dob: '05/07/2010' },
  { ini: 'HD', name: 'Harper Day', team: 'U14 Sam', reg: 'pending' as const, dob: '22/04/2012' },
  { ini: 'RC', name: 'Ruby Chen', team: 'U13 Girls Meg', reg: 'done' as const, dob: '14/09/2008' },
]

function PlaceholderSection({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 20px' }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, color: '#6f7f7b', maxWidth: 360, margin: '0 auto' }}>{desc}</div>
    </div>
  )
}

export default function PlayersTab() {
  const [view, setView] = useState<PlayersView>('overview')

  const p = { padding: '16px 20px' }

  const statusColor = (s: 'ok' | 'close' | 'under3' | 'under4') =>
    s === 'ok' ? { c: '#40826d', bg: '#e4f2eb', label: 'OK' } :
    s === 'close' ? { c: '#c3a84a', bg: '#fdf8ed', label: 'Close to the line' } :
    s === 'under3' ? { c: '#c39797', bg: '#fdf4f4', label: '3 under' } :
    { c: '#c39797', bg: '#fdf4f4', label: '4 under' }

  return (
    <>
      <SubTabBar
        items={[
          { id: 'overview', label: 'Overview' },
          { id: 'goals', label: 'Goals' },
          { id: 'growthload', label: 'Growth and load' },
          { id: 'fairtime', label: 'Fair game time' },
          { id: 'registrations', label: 'Registrations' },
          { id: 'moves', label: 'Moves' },
          { id: 'trials', label: 'Trials' },
          { id: 'girls', label: 'Girls and women' },
        ]}
        active={view}
        onSelect={id => setView(id as PlayersView)}
      />

      {view === 'overview' && (
        <div style={p}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
            {[{ n: '212', l: 'Total players', sub: '134 juniors · 78 seniors' }, { n: '96%', l: 'Consent done', sub: '8 pending' }, { n: '12 of 14', l: 'Fair game time', sub: '2 teams with players under' }, { n: '11', l: 'Ready for more', sub: 'Coach nominations this season' }].map(s => (
              <div key={s.l} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#10211f' }}>{s.n}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f', marginTop: 2 }}>{s.l}</div>
                <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>All players · 212</div>
            <input placeholder="Search…" style={{ height: 32, borderRadius: '999px', border: '1px solid #e9eae8', padding: '0 14px', fontFamily: 'inherit', fontSize: 13 }} />
          </div>
          {PLAYERS_LIST.map((p2, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p2.ini}</div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{p2.name}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>{p2.team} · DOB {p2.dob}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: p2.reg === 'done' ? '#40826d' : '#c39797', background: p2.reg === 'done' ? '#e4f2eb' : '#fdf4f4', borderRadius: 6, padding: '2px 8px' }}>
                {p2.reg === 'done' ? 'Registered' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      )}

      {view === 'goals' && (
        <div style={p}>
          <PlaceholderSection title="Player goals" desc="Season goals are set by players and tracked in the app. This view shows how many players have set goals and how many have been met." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[{ n: '134', l: 'Goals set', sub: '63% of players' }, { n: '61%', l: 'On track', sub: 'Up from 48% last season' }, { n: '24', l: 'Goals met', sub: 'This season so far' }].map(s => (
              <div key={s.l} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8', textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#10211f' }}>{s.n}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f', marginTop: 2 }}>{s.l}</div>
                <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'growthload' && (
        <div style={p}>
          <PlaceholderSection title="Growth and load" desc="Physical measurements and training load data from every 3-month measurement session and fitness coach. Data stays with the coaching team." />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[{ n: '82%', l: 'Growth on track', sub: 'vs last measurement' }, { n: '3', l: 'Fast-growth flags', sub: 'May need load reduction' }].map(s => (
              <div key={s.l} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#10211f' }}>{s.n}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f', marginTop: 2 }}>{s.l}</div>
                <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'fairtime' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, padding: p.padding }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f' }}>Fair game time</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>Every team · fewest minutes this season, as a share of the game</div>
              </div>
              <button style={{ height: 32, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Export</button>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e9eae8', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 60px 100px', padding: '8px 16px', borderBottom: '1px solid #f0f1f0', gap: 8 }}>
                {['TEAM','COACH','FEWEST MINUTES','',''].map((h, i) => <div key={i} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
              </div>
              {FAIR_TIME.map((row, i) => {
                const st = statusColor(row.status)
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 60px 100px', padding: '10px 16px', borderBottom: i < FAIR_TIME.length - 1 ? '1px solid #f0f1f0' : 'none', gap: 8, alignItems: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{row.team}</div>
                    <div style={{ fontSize: 12, color: '#6f7f7b' }}>{row.coach}</div>
                    <div style={{ position: 'relative', height: 8, background: '#f0f1f0', borderRadius: 4 }}>
                      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: '#cbbeb5' }} />
                      <div style={{ height: '100%', borderRadius: 4, background: row.status.startsWith('under') ? '#c39797' : '#2f6252', width: `${row.pct}%` }} />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f', textAlign: 'right' }}>{row.pct}%</div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: st.c, background: st.bg, borderRadius: 6, padding: '2px 8px', textAlign: 'center' }}>{st.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Club policy</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>½</span>
                <div><div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Up to U13</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>Everyone plays at least half of every game</div></div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>⅓</span>
                <div><div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>U14 to U16</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>Everyone plays at least a third</div></div>
              </div>
            </div>
            <div style={{ background: '#fdf4f4', borderRadius: 14, padding: '14px 16px', border: '1px solid #f0dcc8' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 6 }}>12 of 14 teams inside it</div>
              <div style={{ fontSize: 13, color: '#4a5a57' }}>{"U11 Luke and U16 Ollie aren't. Both coaches know and it's on Tuesday's agenda."}</div>
            </div>
          </div>
        </div>
      )}

      {view === 'registrations' && (
        <div style={p}>
          <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
            {[{ n: 206, l: 'Complete', color: '#40826d' }, { n: 6, l: 'Pending', color: '#c39797' }].map(s => (
              <div key={s.l}><div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.n}</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>{s.l}</div></div>
            ))}
          </div>
          {PLAYERS_LIST.filter(p2 => p2.reg === 'pending').map((p2, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p2.ini}</div>
              <div style={{ flexGrow: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{p2.name}</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>{p2.team}</div></div>
              <button style={{ height: 32, padding: '0 12px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Chase</button>
            </div>
          ))}
        </div>
      )}

      {view === 'moves' && (
        <div style={p}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f' }}>Player moves</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>7 moves this season · 2 pending coach approval</div>
            </div>
            <button style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Propose a move</button>
          </div>
          {[
            { ini: 'EB', name: 'Ella Brennan', from: 'U12 Sam', to: 'U14 Sam', reason: 'Growth spurt — competing better in older age group', status: 'approved', date: '12 May' },
            { ini: 'RC', name: 'Riley Clark', from: 'U11 Luke', to: 'U12 Sam', reason: 'Technical readiness — scoring consistently at U11', status: 'approved', date: '3 May' },
            { ini: 'JK', name: 'James Kirk', from: 'U13 Chris', to: 'U11 Luke', reason: 'Development: needs more minutes and game confidence', status: 'pending', date: 'Pending' },
            { ini: 'AH', name: 'Amy Hughes', from: 'U14 Sam', to: 'U13 Girls Meg', reason: 'Requested by parent — playing with school friends', status: 'pending', date: 'Pending' },
            { ini: 'SD', name: 'Sam Dex', from: 'U16 Ollie', to: 'U15 Girls Bec', reason: 'Age-group change — birthday in October', status: 'done', date: '24 Apr' },
          ].map((m, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{m.ini}</div>
                <div style={{ flexGrow: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{m.name}</div><div style={{ fontSize: 12, color: '#6f7f7b' }}>{m.from} → {m.to} · {m.date}</div></div>
                <span style={{ fontSize: 11, fontWeight: 700, borderRadius: 6, padding: '2px 8px', color: m.status === 'approved' ? '#40826d' : m.status === 'pending' ? '#c3a84a' : '#6f7f7b', background: m.status === 'approved' ? '#e4f2eb' : m.status === 'pending' ? '#fdf8ed' : '#f0f1f0' }}>{m.status}</span>
              </div>
              <div style={{ fontSize: 12, color: '#4a5a57' }}>{m.reason}</div>
              {m.status === 'pending' && (
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button style={{ height: 28, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Approve</button>
                  <button style={{ height: 28, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer' }}>Decline</button>
                </div>
              )}
            </div>
          ))}

          {/* Dispensations */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 14, marginTop: 20, alignItems: 'start' }}>
            <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px 10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <div style={{ fontSize: 17, fontWeight: 700 }}>Dispensations</div>
                <span style={{ fontSize: 14, color: '#4a5a57' }}>2 approved · 1 waiting</span>
              </div>
              {[
                { ini: 'TN', name: 'Tess Nolan', desc: 'Playing down', detail: 'U14 by age · plays U13 Girls Meg · Approved by FV 12 Mar · letter on file', badge: 'Approved', badgeBg: '#2f6252', badgeColor: '#fff' },
                { ini: 'AY', name: 'Aiden Yu', desc: 'U12 in MiniRoos', detail: 'U12 by age · asked to play U11 Luke · Sent to FV 28 May · can\'t be picked until it\'s back', badge: 'Waiting on FV', badgeBg: '#cbbeb5', badgeColor: '#10211f' },
                { ini: 'SH', name: 'Sara Haddad', desc: 'Playing down', detail: 'U16 by age · plays U15 Girls Bec · Approved by FV 3 Apr · letter on file', badge: 'Approved', badgeBg: '#2f6252', badgeColor: '#fff' },
                { ini: 'LP', name: 'Leo Park', desc: 'Playing up', detail: 'U10 Nadia · one game with U11 Luke · Parent asked. No FV approval needed', badge: 'Not needed', badgeBg: '#e9eae8', badgeColor: '#10211f' },
              ].map(d => (
                <div key={d.ini} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 74, borderTop: '1px solid #e9eae8' }}>
                  <span style={{ flexShrink: 0, width: 38, height: 38, borderRadius: '999px', background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{d.ini}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{d.name} · <span style={{ fontWeight: 400 }}>{d.desc}</span></span>
                    <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{d.detail}</span>
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: '999px', fontSize: 12, fontWeight: 700, background: d.badgeBg, color: d.badgeColor, whiteSpace: 'nowrap' }}>{d.badge}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 12, background: '#eef5f2', fontSize: 13, lineHeight: '19px', display: 'flex', gap: 10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true"><path d="M12 8v5M12 16h.01M12 3a9 9 0 100 18 9 9 0 000-18z"/></svg>
                <span>On game day the approval letter shows on the team manager's phone. A player who is still waiting can't be added to the sheet.</span>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #c5c8c4', borderRadius: 16, padding: '14px 18px' }}>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 0 }}>When FV must say yes</div>
              {[
                { badge: '↓', badgeBg: '#cbbeb5', title: 'Playing down, U12 and up', sub: 'Written approval, carried on game day' },
                { badge: '12', badgeBg: '#cbbeb5', title: 'An U12 in MiniRoos', sub: 'Needs a dispensation first' },
                { badge: '✓', badgeBg: '#eef5f2', title: 'MiniRoos, one age group down', sub: 'No approval needed' },
                { badge: '↑', badgeBg: '#eef5f2', title: 'Playing up', sub: 'No approval. The club asks the parent' },
              ].map(r => (
                <div key={r.badge} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8' }}>
                  <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '999px', background: r.badgeBg, color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r.badge}</span>
                  <span style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{r.title}</span>
                    <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{r.sub}</span>
                  </span>
                </div>
              ))}
              <button style={{ marginTop: 12, height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid #2f6252', background: '#2f6252', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>Start a request</button>
            </div>
          </div>
        </div>
      )}

      {view === 'trials' && (
        <div style={p}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f' }}>Trials and talent days</div>
              <div style={{ fontSize: 13, color: '#6f7f7b' }}>Next: Sat 14 Jun · 23 players registered</div>
            </div>
            <button style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ New trial</button>
          </div>
          <div style={{ background: '#1f4a3e', borderRadius: 14, padding: '16px', marginBottom: 16, color: '#fff' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Sat 14 Jun · 10:00 am</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 12 }}>Ground 3 · U12 to U14 mixed · 23 attending</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
              {[{ n: 23, l: 'Registered' }, { n: 2, l: 'coaches assessing' }, { n: 11, l: 'forms sent' }].map(s => (
                <div key={s.l} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.4)', background: 'transparent', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>View list</button>
              <button style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: 0, background: '#fff', color: '#1f4a3e', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Send reminder to 12 unregistered</button>
            </div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>Import from PlayFootball</div>
          <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#e4f2eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Sync trial registrations from PlayFootball</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Last synced 2 hours ago · 23 entries found</div>
            </div>
            <button style={{ height: 36, padding: '0 16px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#2f6252', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Sync now</button>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>Past trials</div>
          {[
            { date: 'Sat 15 Mar', label: 'U11–U12 · 18 attended · 7 offered places', done: true },
            { date: 'Sun 2 Feb', label: 'Girls day · 11 attended · 4 joined the club', done: true },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid #f0f1f0' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{t.date}</div>
                <div style={{ fontSize: 12, color: '#6f7f7b' }}>{t.label}</div>
              </div>
              <button style={{ height: 28, padding: '0 12px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer' }}>View</button>
            </div>
          ))}
        </div>
      )}

      {view === 'girls' && (
        <div style={p}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#10211f', marginBottom: 4 }}>Girls and women</div>
          <div style={{ fontSize: 13, color: '#6f7f7b', marginBottom: 20 }}>Tracking growth in female participation this season</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
            {[{ n: '45', l: "Girls' teams players", sub: 'Up from 31 last season · +45%' }, { n: '3', l: "Girls' teams", sub: 'U11 Girls Kate, U12 Girls Ana, U13 Girls Meg' }, { n: "Women's 1sts", l: 'Senior women', sub: 'State League 2 · 19 players' }].map(s => (
              <div key={s.l} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#10211f' }}>{s.n}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f', marginTop: 2 }}>{s.l}</div>
                <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#e4f2eb', borderRadius: 14, padding: '14px 16px', border: '1px solid #c3ddd0' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1f4a3e', marginBottom: 4 }}>Girls in sport grant · Girls in sport bursary — Submitted Oct</div>
            <div style={{ fontSize: 13, color: '#2f6252' }}>Waiting on outcome. Funds would go toward a 4th girls team and new training kit.</div>
          </div>
        </div>
      )}
    </>
  )
}
