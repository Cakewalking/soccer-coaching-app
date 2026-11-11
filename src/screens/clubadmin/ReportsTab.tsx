import { useState } from 'react'
import { SubTabBar, EmptyCard, FOOTER_DEFAULT } from './ui'

type ReportsView = 'board' | 'grants' | 'league' | 'season' | 'fees'

const REPORTS_EMPTY: Record<ReportsView, { icon: string; title: string; desc: string; cta?: string; items: { title: string; desc: string }[] }> = {
  board:  { icon: 'M18 20V10M12 20V4M6 20v-6', title: 'Your first report writes itself', desc: 'At the end of your first month, Clean Sheet drafts a one-page report for the committee from the club\'s own numbers.', cta: 'See an example', items: [{ title: 'Players, coaches, safety', desc: 'One page, plain words' }, { title: 'Sent when you say', desc: 'Never automatically' }] },
  grants: { icon: 'M18 20V10M12 20V4M6 20v-6', title: 'No grants listed yet', desc: 'Tell us your council and Clean Sheet lists grants the club could apply for, with your numbers filled in.', cta: 'Add your council', items: [{ title: 'Numbers grants ask for', desc: 'Players, girls, volunteers' }, { title: 'No names leave the club', desc: 'Ever' }] },
  league: { icon: 'M18 20V10M12 20V4M6 20v-6', title: 'Nothing due yet', desc: 'Once fixtures sync from Dribl, the things Football Victoria needs from the club show here with their due times.', cta: 'Connect Dribl', items: [{ title: 'Team sheets and results', desc: 'With deadlines' }, { title: 'Children checks', desc: 'Linked in WWC Connect' }] },
  season: { icon: 'M18 20V10M12 20V4M6 20v-6', title: 'Fills in as the season goes', desc: 'After round 4 you\'ll see highlights and what to fix. The full review writes itself at season end.', cta: 'See an example', items: [{ title: 'Players and goals met', desc: 'Against last season' }, { title: 'What to fix', desc: 'Before next year' }] },
  fees:   { icon: 'M18 20V10M12 20V4M6 20v-6', title: 'Nothing here yet', desc: 'Fees come from PlayFootball. Add the club\'s volunteer jobs and families can sign up from their phones.', cta: 'Add volunteer jobs', items: [{ title: 'Fees by age group', desc: 'Coaches never see who paid' }, { title: 'Volunteer roster', desc: 'For jobs the whole club shares' }] },
}

export default function ReportsTab({ empty }: { empty?: boolean }) {
  const [view, setView] = useState<ReportsView>('board')

  const p = { padding: '16px 20px' }

  return (
    <>
      <SubTabBar
        items={[
          { id: 'board', label: 'Board' },
          { id: 'grants', label: 'Grants' },
          { id: 'league', label: 'League' },
          { id: 'season', label: 'Season' },
          { id: 'fees', label: 'Fees and volunteers' },
        ]}
        active={view}
        onSelect={id => setView(id as ReportsView)}
      />

      {empty && view in REPORTS_EMPTY && <EmptyCard {...REPORTS_EMPTY[view]!} footer={FOOTER_DEFAULT} />}

      {!empty && view === 'board' && (
        <div style={p}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Board report</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>May 2026 · written by Clean Sheet from this month's data · edit before you send</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Edit</button>
              <button style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Send to committee</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, padding: '20px 24px', marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#6f7f7b', marginBottom: 4 }}>WATTLE CREEK FC · FOOTBALL REPORT TO THE COMMITTEE</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#10211f', marginBottom: 16 }}>A strong month on the pitch. Two things to fix off it.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
              {[{ n: '192', l: 'players', sub: '+16 on last year' }, { n: '87%', l: 'training turnout', sub: '' }, { n: '61%', l: 'player goals met', sub: '' }, { n: '16 W', l: '9 D · 10 L', sub: 'across 7 teams that keep score' }].map(s => (
                <div key={s.l} style={{ background: '#eef5f2', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#1f4a3e' }}>{s.n}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#2f6252' }}>{s.l}</div>
                  {s.sub && <div style={{ fontSize: 10, color: '#4a5a57', marginTop: 2 }}>{s.sub}</div>}
                </div>
              ))}
            </div>
            {[
              { head: 'WHAT WENT WELL', body: "Girls' football keeps growing: 62 players across 4 girls' teams. U12 Girls Ana are unbeaten in 4. More teams are pressing the way we agreed at the start of the season, 67% up from 61%." },
              { head: 'WHAT NEEDS THE COMMITTEE', body: "1. Four coaches' children checks expire this month. Two are inside 14 days. We'll stand them down if not renewed.\n2. One match camera is out of action. A fifth kit (about $1,400) would let every team from U12 record every game." },
              { head: 'COMING UP', body: 'Coach meeting Tue 9 Jun. Club course for 9 new coaches on 20 Jun. Registrations for summer futsal open 1 Sep.' },
            ].map(s => (
              <div key={s.head} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#6f7f7b', marginBottom: 4 }}>{s.head}</div>
                <div style={{ fontSize: 13, color: '#10211f', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{s.body}</div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #f0f1f0', paddingTop: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6f7f7b', marginBottom: 8 }}>Teams playing the club's way, by month</div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
                {[{ m: 'Feb', p: 52 }, { m: 'Mar', p: 56 }, { m: 'Apr', p: 61 }, { m: 'May', p: 67 }].map(r => (
                  <div key={r.m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#2f6252' }}>{r.p}%</div>
                    <div style={{ width: 40, height: r.p, background: '#2f6252', borderRadius: '4px 4px 0 0', maxHeight: 80, minHeight: 20 }}/>
                    <div style={{ fontSize: 11, color: '#6f7f7b' }}>{r.m}</div>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: '#40826d', marginBottom: 20, marginLeft: 8, fontStyle: 'italic' }}>↑ This report</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {['Headline numbers', 'Results by team', 'Safeguarding', 'Kit and spending', 'Player names'].map((t, i) => (
              <button key={t} style={{ height: 44, padding: '0 12px', borderRadius: '999px', border: `1px solid ${i === 0 ? '#1f4a3e' : '#e9eae8'}`, background: i === 0 ? '#1f4a3e' : '#fff', color: i === 0 ? '#fff' : '#6f7f7b', fontFamily: 'inherit', fontSize: 12, fontWeight: i === 0 ? 700 : 400, cursor: 'pointer' }}>{t}</button>
            ))}
          </div>

          <div style={{ background: '#fafafa', border: '1px solid #e9eae8', borderRadius: 12, padding: '10px 14px', fontSize: 12, color: '#6f7f7b' }}>
            Player names are off by default. The committee sees the club, not the children.
            <span style={{ display: 'block', marginTop: 4 }}>Last sent 1 May to 7 committee members.</span>
          </div>
        </div>
      )}

      {!empty && view === 'grants' && (
        <div style={p}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>Available grants · 3 matches</div>
              {[
                { name: 'Community sport participation grant', funder: 'Wattle Creek Council', amount: '$5,000', due: 'Due 30 Nov', status: 'Draft' as const, body: "Covers boots and kit for 20 players from low-income families. Last year's report auto-fills most fields.", action: 'Review draft', daysLeft: 25 },
                { name: 'Girls in sport bursary', funder: 'Football Victoria', amount: '$3,200', due: 'Submitted 10 Oct', status: 'Submitted' as const, body: "Covers kit and coaching costs for girls' teams U10–U14. Outcome expected by end of November.", action: null, daysLeft: null },
                { name: 'Club development fund', funder: 'Sport Australia', amount: '$8,500', due: 'Due 15 Dec', status: 'Open' as const, body: 'Capital equipment — cameras, canteen upgrade. Applications need 3 quotes. Clean Sheet has pre-filled your numbers.', action: 'Start application', daysLeft: 40 },
              ].map((g, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8', marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{g.name}</div>
                      <div style={{ fontSize: 12, color: '#6f7f7b', marginTop: 2 }}>{g.funder} · {g.due}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#1f4a3e' }}>{g.amount}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: g.status === 'Draft' ? '#c3a84a' : g.status === 'Submitted' ? '#40826d' : '#2f6252', background: g.status === 'Draft' ? '#fdf9f0' : g.status === 'Submitted' ? '#e4f2eb' : '#eef5f2', borderRadius: 6, padding: '2px 8px' }}>{g.status}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: '#4a5a57', marginBottom: 10, lineHeight: 1.5 }}>{g.body}</div>
                  {g.action && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <button style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{g.action}</button>
                      {g.daysLeft && <span style={{ fontSize: 12, color: '#6f7f7b' }}>{g.daysLeft} days left</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', borderBottom: '1px solid #e9eae8', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b' }}>NUMBERS GRANTS ASK FOR</div>
                <div style={{ padding: '8px 14px', borderBottom: '1px solid #e9eae8', fontSize: 11, color: '#6f7f7b' }}>Pre-filled from your season data. Review once a year.</div>
                {[
                  { label: 'Total players', value: '192' },
                  { label: "Girls' players", value: '62' },
                  { label: 'Players under 18', value: '148' },
                  { label: 'Low-income families (est.)', value: '21' },
                  { label: 'Volunteer hours', value: '840' },
                  { label: 'Registered coaches', value: '31' },
                  { label: 'Accredited coaches', value: '18' },
                ].map((r, i) => (
                  <div key={r.label} style={{ padding: '8px 14px', borderBottom: i < 6 ? '1px solid #e9eae8' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#4a5a57' }}>{r.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fafafa', border: '1px solid #e9eae8', borderRadius: 12, padding: '10px 14px', fontSize: 12, color: '#6f7f7b' }}>
                No child names or personal data leave the club in grant applications.
              </div>
            </div>
          </div>
        </div>
      )}

      {!empty && view === 'league' && (
        <div style={p}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f', marginBottom: 12 }}>League standing · Spring 2026</div>
              {[
                { team: 'U12 Sam', coach: 'Sam K', record: '7W · 2D · 1L', pts: 23 },
                { team: 'U12 Girls Ana', coach: 'Ana Silva', record: '6W · 2D · 1L', pts: 20 },
                { team: 'U13 Girls Meg', coach: 'Meg Doyle', record: '6W · 1D · 2L', pts: 19 },
                { team: 'U14 Josh', coach: 'Josh Kerr', record: '5W · 3D · 2L', pts: 18 },
                { team: "Men's 1sts", coach: 'Marko Petrovic', record: '8W · 2D · 2L', pts: 26 },
                { team: "Women's 1sts", coach: 'Steph Lau', record: '7W · 2D · 1L', pts: 23 },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '999px', background: '#f0f1f0', color: '#6f7f7b', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>{t.team}</div>
                    <div style={{ fontSize: 12, color: '#6f7f7b' }}>{t.coach}</div>
                  </div>
                  <div style={{ textAlign: 'right' as const }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#10211f' }}>{t.pts} pts</div>
                    <div style={{ fontSize: 11, color: '#6f7f7b' }}>{t.record}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', borderBottom: '1px solid #e9eae8', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b' }}>COMPLIANCE TRACKER</div>
                {[
                  { label: 'Team sheets', value: '7 / 7', ok: true, action: null },
                  { label: 'Results up to date', value: 'Yes', ok: true, action: null },
                  { label: 'Player registrations', value: '5 to chase', ok: false, action: 'Chase now' },
                  { label: 'Children checks (WWC Connect)', value: '27 / 31', ok: false, action: 'Email coaches' },
                  { label: 'Child safety training', value: '22 / 31', ok: false, action: 'Share link' },
                ].map((r, i) => (
                  <div key={r.label} style={{ padding: '10px 14px', borderBottom: i < 4 ? '1px solid #e9eae8' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: '#4a5a57' }}>{r.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: r.ok ? '#40826d' : '#c39797' }}>{r.value}</span>
                    </div>
                    {r.action && (
                      <button style={{ marginTop: 6, height: 44, padding: '0 10px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{r.action}</button>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ background: '#fafafa', border: '1px solid #e9eae8', borderRadius: 12, padding: '10px 14px', fontSize: 12, color: '#6f7f7b' }}>
                Compliance data syncs from Dribl and WWC Connect each morning.
              </div>
            </div>
          </div>
        </div>
      )}

      {!empty && view === 'season' && (
        <div style={p}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10211f' }}>Season review · Spring 2026</div>
              <div style={{ fontSize: 12, color: '#6f7f7b' }}>Generated from the season's data · 2 rounds left · share after the final</div>
            </div>
            <button style={{ height: 44, padding: '0 14px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Share season review</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#6f7f7b', marginBottom: 10 }}>WHAT WENT WELL</div>
                {[
                  { icon: '↑', text: "Girls' football grew fastest. Up 22 players from last year — the biggest gain in any age group.", bold: true },
                  { icon: '★', text: "U12 Girls Ana unbeaten at home all season. First time for any Wattle Creek team.", bold: true },
                  { icon: '↑', text: 'More teams recording matches. 5 teams on video this season, up from 3.', bold: false },
                  { icon: '↓', text: 'Fewer injuries. 14 this year against 22 last year. Fewer games missed too.', bold: false },
                ].map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none', alignItems: 'flex-start' }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#eef5f2', color: '#2f6252', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{h.icon}</span>
                    <span style={{ fontSize: 13, color: '#10211f', lineHeight: 1.5, fontWeight: h.bold ? 600 : 400 }}>{h.text}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, padding: '16px 20px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#6f7f7b', marginBottom: 10 }}>TO FIX BEFORE NEXT SEASON</div>
                {[
                  { n: '1', title: "Children checks", detail: "9 coaches have let theirs lapse. We can't start pre-season until they're renewed.", urgent: true },
                  { n: '2', title: 'Fair game time', detail: "3 teams — U13 Sam, U14 Josh, Men's 2nds — had a gap of 20+ minutes between most and least. Some kids barely played.", urgent: true },
                  { n: '3', title: 'Match cameras', detail: 'Only 5 teams recorded regularly. A second set of tripods ($600) would let us cover every game.', urgent: false },
                ].map(r => (
                  <div key={r.n} style={{ display: 'flex', gap: 10, padding: '10px 0', borderTop: r.n !== '1' ? '1px solid #f0f1f0' : 'none', alignItems: 'flex-start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: r.urgent ? '#c39797' : '#e8edeb', color: r.urgent ? '#fff' : '#4a5a57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{r.n}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{r.title}</div>
                      <div style={{ fontSize: 12, color: '#4a5a57', lineHeight: 1.5, marginTop: 2 }}>{r.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#fff', border: '1px solid #e9eae8', borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', borderBottom: '1px solid #e9eae8', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', color: '#6f7f7b' }}>SEASON AT A GLANCE</div>
                {[
                  { label: 'Players',           value: '192', sub: '+16 on 2025' },
                  { label: 'Coaches',            value: '31',  sub: '7 new this year' },
                  { label: 'Games played',       value: '218', sub: 'across 11 teams' },
                  { label: 'Player goals met',   value: '61%', sub: 'up from 54%' },
                  { label: 'Training turnout',   value: '87%', sub: '' },
                  { label: 'Injuries',           value: '14',  sub: 'down from 22' },
                ].map((r) => (
                  <div key={r.label} style={{ padding: '8px 14px', borderBottom: '1px solid #e9eae8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: '#4a5a57' }}>{r.label}</span>
                    <div style={{ textAlign: 'right' as const }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#10211f' }}>{r.value}</div>
                      {r.sub && <div style={{ fontSize: 10, color: '#40826d' }}>{r.sub}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fafafa', border: '1px solid #e9eae8', borderRadius: 12, padding: '10px 14px', fontSize: 12, color: '#6f7f7b' }}>
                Season review is drafted now. Final numbers update after the last fixture.
              </div>
            </div>
          </div>
        </div>
      )}

      {!empty && view === 'fees' && (
        <div style={p}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
            {[{ n: '$32,400', l: 'Collected', sub: '94% of target · $1,980 outstanding', color: '#10211f' }, { n: '14', l: 'Outstanding accounts', sub: 'Oldest: 42 days overdue', color: '#c39797' }, { n: '$2,100', l: 'Hardship waivers', sub: '7 families this season', color: '#c3a84a' }].map(s => (
              <div key={s.l} style={{ background: '#fff', borderRadius: 14, padding: '14px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.n}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#10211f', marginTop: 2 }}>{s.l}</div>
                <div style={{ fontSize: 11, color: '#6f7f7b', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10211f' }}>Outstanding accounts · 14</div>
                <button style={{ height: 44, padding: '0 12px', borderRadius: '999px', border: 0, background: '#2f6252', color: '#fff', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Send all invoices</button>
              </div>
              {[
                { ini: 'EB', name: 'Ella Brennan', team: 'U14 Sam', amount: '$180', days: 42, sent: 2 },
                { ini: 'HD', name: 'Harper Day', team: 'U14 Sam', amount: '$180', days: 28, sent: 1 },
                { ini: 'RC', name: 'Riley Clark', team: 'U11 Luke', amount: '$120', days: 14, sent: 0 },
                { ini: 'SD', name: 'Scott Davis', team: "Men's 1sts", amount: '$250', days: 7, sent: 0 },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '999px', background: '#cbbeb5', color: '#10211f', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{a.ini}</div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: '#6f7f7b' }}>{a.team} · {a.days}d overdue · {a.sent > 0 ? `${a.sent} invoice${a.sent > 1 ? 's' : ''} sent` : 'not contacted'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#c39797' }}>{a.amount}</div>
                    <button style={{ height: 44, padding: '0 10px', borderRadius: '999px', border: '1px solid #e9eae8', background: '#fff', color: '#6f7f7b', fontFamily: 'inherit', fontSize: 11, cursor: 'pointer', marginTop: 4 }}>Send invoice</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Season fees by age group</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '6px 0', borderBottom: '1px solid #f0f1f0', gap: 8 }}>
                  {['AGE GROUP','FEE','PAID'].map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#6f7f7b' }}>{h}</div>)}
                </div>
                {[{ age: 'MiniRoos', fee: '$120', pct: 94 }, { age: 'Juniors', fee: '$180', pct: 97 }, { age: 'Seniors', fee: '$250', pct: 88 }, { age: 'Over 35s', fee: '$200', pct: 100 }].map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '8px 0', borderBottom: '1px solid #f0f1f0', gap: 8, alignItems: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{row.age}</div>
                    <div style={{ fontSize: 13, color: '#6f7f7b' }}>{row.fee}</div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: row.pct >= 95 ? '#40826d' : '#c3a84a' }}>{row.pct}%</span>
                  </div>
                ))}
                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#10211f' }}>Total collected</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: '#10211f' }}>$32,400</span>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: '1px solid #e9eae8' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#10211f', marginBottom: 10 }}>Volunteer hours · 840 hrs</div>
                {[
                  { name: 'Canteen roster', hours: '240 hrs', people: '12 families' },
                  { name: 'Ground setup', hours: '180 hrs', people: '8 families' },
                  { name: 'BBQ on game days', hours: '160 hrs', people: '10 families' },
                ].map((v, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: i > 0 ? '1px solid #f0f1f0' : 'none' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#10211f' }}>{v.name}</div>
                      <div style={{ fontSize: 11, color: '#6f7f7b' }}>{v.people}</div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#2f6252' }}>{v.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
