import { useState } from 'react'
import { FAIR_TIME } from './data'
import { SubTabBar, EmptyCard, FOOTER_DEFAULT } from './ui'

type PlayersView = 'overview' | 'goals' | 'growthload' | 'fairtime' | 'registrations' | 'moves' | 'trials' | 'girls' | 'nominations'

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

const PLAYERS_EMPTY: Partial<Record<PlayersView, { icon: string; title: string; desc: string; cta?: string; items: { title: string; desc: string }[] }>> = {
  overview:      { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75', title: 'No players yet', desc: 'Players arrive with your PlayFootball import, or as parents join with a team link.', cta: 'Import from PlayFootball', items: [{ title: 'Is everyone getting a fair go?', desc: 'Minutes across every team' }, { title: "Who's ready for more", desc: 'Coach nominations' }] },
  fairtime:      { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', title: 'Nothing to show until teams play', desc: "Minutes come from each team's game timer. After the first round you'll see every team against the club policy.", cta: 'Set the minutes policy', items: [{ title: 'Fewest minutes per team', desc: 'Against the policy line' }, { title: 'Who to talk to', desc: 'Coaches below the line' }] },
  registrations: { icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 13h8M8 17h5', title: 'No registrations yet', desc: 'Connect PlayFootball and registrations, fees and consent show here by team.', cta: 'Import from PlayFootball', items: [{ title: 'Fees owing', desc: 'By team, never by name to coaches' }, { title: 'Consent done', desc: 'And who to remind' }] },
  moves:         { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75', title: 'No moves this month', desc: 'Move a player to another team, or let them play up for a game. The parent is asked first.', cta: 'Move a player', items: [{ title: 'History moves with them', desc: 'Goals, minutes, tests' }, { title: 'Dispensations flagged', desc: 'When FV must approve' }] },
  trials:        { icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', title: 'No trials set up', desc: 'Set up a trial, share the sign-up link, and score players together. Everyone hears back kindly.', cta: 'Set up a trial', items: [{ title: 'Scores stay private', desc: 'Never shared with players' }, { title: 'Birth month shown', desc: "So younger players aren't missed" }] },
  girls:         { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', title: "No girls' teams yet", desc: "Add a girls' team, or import your players, to see the pathway from MiniRoos to seniors and where the gaps are.", cta: 'Import from PlayFootball', items: [{ title: 'Pathway by age', desc: 'And the gaps' }, { title: 'Who came back', desc: 'Against last year' }] },
}

const G  = '#2f6252'
const GD = '#1f4a3e'
const INK = '#10211f'
const MUT = '#4a5a57'
const LN  = '#e8edeb'
const PALE = '#eef5f2'
const ROSE = '#c39797'
const WARN = '#c3a84a'

type GoalStatus = 'on-track' | 'needs-work' | 'to-set'
const statusStyle = (s: GoalStatus) => s === 'on-track'
  ? { bg: '#e4f2eb', c: '#40826d', label: 'On track' }
  : s === 'needs-work'
  ? { bg: '#fdf4f4', c: ROSE, label: 'Needs work' }
  : { bg: '#f4f4f4', c: MUT, label: 'To set' }

const GOALS_DATA: Array<{ ini: string; name: string; team: string; goal: string; dots: boolean[]; status: GoalStatus }> = [
  { ini: 'MT', name: 'Mia Tran',      team: 'U12 Sam',       goal: 'First touch under pressure', dots: [true,true,true,false,true],  status: 'on-track' },
  { ini: 'NO', name: 'Noah Owusu',    team: 'U14 Sam',       goal: 'Head up before passing',      dots: [true,false,true,true,true],  status: 'on-track' },
  { ini: 'EB', name: 'Ella Brennan',  team: 'U14 Sam',       goal: 'Win headers at the back',     dots: [false,true,false,false,true], status: 'needs-work' },
  { ini: 'JP', name: 'Jai Patel',     team: 'U16 Boys',      goal: 'Shoot first time, in the box',dots: [true,true,true,true,true],   status: 'on-track' },
  { ini: 'HD', name: 'Harper Day',    team: 'U14 Sam',       goal: '—',                           dots: [false,false,false,false,false],status: 'to-set' },
  { ini: 'RC', name: 'Ruby Chen',     team: 'U13 Girls Meg', goal: 'Press high with the striker',  dots: [true,true,true,false,false],  status: 'needs-work' },
  { ini: 'AK', name: 'Aisha Kaur',   team: 'U12 Girls Ana', goal: 'Control on the chest',        dots: [true,true,true,true,false],  status: 'on-track' },
  { ini: 'TL', name: 'Tom Li',        team: 'U13 Chris',     goal: 'Better left foot',            dots: [false,true,false,true,true],  status: 'needs-work' },
  { ini: 'GN', name: 'Grace Nguyen',  team: 'U11 Girls Kate',goal: '—',                           dots: [false,false,false,false,false],status: 'to-set' },
  { ini: 'SD', name: 'Sam Dex',       team: 'U16 Ollie',     goal: 'Winning headers mid-block',   dots: [true,true,false,true,true],   status: 'on-track' },
  { ini: 'AH', name: 'Amy Hughes',    team: 'U14 Sam',       goal: 'Body shape to receive',       dots: [true,false,true,false,true],  status: 'needs-work' },
  { ini: 'OB', name: 'Owen Baker',    team: 'U13 Sam',       goal: 'Dribble past defenders 1v1',  dots: [true,true,true,true,true],    status: 'on-track' },
  { ini: 'PW', name: 'Priya Watts',   team: 'U12 Girls Ana', goal: 'First touch wide, not back',  dots: [false,true,true,false,true],  status: 'needs-work' },
  { ini: 'JK', name: 'James Kirk',    team: 'U13 Chris',     goal: '—',                           dots: [false,false,false,false,false],status: 'to-set' },
  { ini: 'FL', name: 'Freya Lowe',    team: 'U11 Girls Kate',goal: 'Chip the keeper from outside',dots: [true,false,true,true,true],   status: 'on-track' },
  { ini: 'BM', name: 'Ben Morris',    team: 'U12 Sam',       goal: 'Win the ball back quickly',   dots: [true,true,false,true,false],  status: 'needs-work' },
]

function GoalDot({ filled }: { filled: boolean }) {
  return <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: filled ? G : LN, border: `1.5px solid ${filled ? '#40826d' : MUT}` }} />
}

function GoalsView() {
  const [sel, setSel] = useState(0)
  const player = GOALS_DATA[sel]!
  const st = statusStyle(player.status)
  const onTrack = GOALS_DATA.filter(r => r.status === 'on-track').length
  const needsWork = GOALS_DATA.filter(r => r.status === 'needs-work').length
  const toSet = GOALS_DATA.filter(r => r.status === 'to-set').length

  return (
    <div style={{ padding: '16px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
        {[{ n: `${onTrack}`, l: 'On track', sub: `${Math.round(onTrack/GOALS_DATA.length*100)}% of players with goals`, c: '#40826d' }, { n: `${needsWork}`, l: 'Needs work', sub: 'Goal set but not showing in games', c: ROSE }, { n: `${toSet}`, l: 'Yet to set a goal', sub: 'Coach to prompt this week', c: MUT }].map(s => (
          <div key={s.l} style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', border: '1px solid #e9eae8' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.c }}>{s.n}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginTop: 2 }}>{s.l}</div>
            <div style={{ fontSize: 11, color: MUT, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
        <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 100px 90px', padding: '8px 14px', borderBottom: `1px solid ${LN}` }}>
            {['PLAYER', 'GOAL', 'LAST 5 GAMES', 'STATUS'].map(h => (
              <span key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT }}>{h}</span>
            ))}
          </div>
          {GOALS_DATA.map((row, i) => {
            const s = statusStyle(row.status)
            return (
              <div
                key={row.ini}
                onClick={() => setSel(i)}
                style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 100px 90px', padding: '9px 14px', borderBottom: i < GOALS_DATA.length - 1 ? `1px solid ${LN}` : 'none', alignItems: 'center', cursor: 'pointer', background: sel === i ? PALE : 'transparent' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: GD, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{row.ini}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: INK }}>{row.name}</div>
                    <div style={{ fontSize: 10, color: MUT }}>{row.team}</div>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: row.status === 'to-set' ? MUT : INK, fontStyle: row.status === 'to-set' ? 'italic' : 'normal' }}>{row.goal}</span>
                <div style={{ display: 'flex', gap: 3 }}>{row.dots.map((f, di) => <GoalDot key={di} filled={f} />)}</div>
                <span style={{ fontSize: 11, fontWeight: 700, color: s.c, background: s.bg, borderRadius: 999, padding: '2px 8px', display: 'inline-block' }}>{s.label}</span>
              </div>
            )
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '12px 14px', background: GD, color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{player.ini}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{player.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.75 }}>{player.team}</div>
                </div>
              </div>
            </div>
            <div style={{ padding: '12px 14px', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT, marginBottom: 4 }}>SEASON GOAL</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{player.status === 'to-set' ? 'Not set yet' : player.goal}</div>
            </div>
            <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: MUT }}>Progress</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: st.c, background: st.bg, borderRadius: 999, padding: '2px 10px' }}>{st.label}</span>
            </div>
            <div style={{ padding: '10px 14px', borderBottom: `1px solid ${LN}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: MUT, marginBottom: 6 }}>LAST 5 GAMES</div>
              <div style={{ display: 'flex', gap: 6 }}>{player.dots.map((f, di) => <GoalDot key={di} filled={f} />)}</div>
            </div>
            {player.status === 'needs-work' && (
              <div style={{ padding: '10px 14px', background: '#fdf4f4', borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 12, color: ROSE, fontWeight: 600 }}>Goal set but not showing in recent games. Talk to coach before next session.</div>
              </div>
            )}
            {player.status === 'to-set' && (
              <div style={{ padding: '10px 14px', background: PALE, borderBottom: `1px solid ${LN}` }}>
                <div style={{ fontSize: 12, color: G, fontWeight: 600 }}>Prompt the coach — this player has not set a goal yet this season.</div>
              </div>
            )}
            <div style={{ padding: '10px 14px', display: 'flex', gap: 8 }}>
              <button style={{ flex: 1, height: 36, borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Message coach</button>
              <button style={{ flex: 1, height: 36, borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>View clips</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const NOMINATIONS: Array<{ ini: string; name: string; team: string; coach: string; why: string; numbers: string; next: string; birthMonth: string; bornLate: boolean }> = [
  { ini: 'JP', name: 'Jai Patel',      team: 'U16 Boys',      coach: 'Ollie Marsh',   why: 'Leading scorer, sets the tempo every game, pulls younger players into shape.',           numbers: '14 goals · 94% training · highest pass rate on team',       next: 'Invite to seniors pre-season trial',          birthMonth: 'Jan', bornLate: false },
  { ini: 'AK', name: 'Aisha Kaur',    team: 'U12 Girls Ana', coach: 'Ana Silva',     why: "Plays two years ahead technically. Calm under pressure. Already coaching the younger ones in warm-ups.",  numbers: '11 goals · 97% training · unbeaten run captain', next: 'Invite to U14 Girls Meg training session',    birthMonth: 'Feb', bornLate: false },
  { ini: 'OB', name: 'Owen Baker',    team: 'U13 Sam',       coach: 'Sam Kerr',      why: 'Covers the most ground per game. Reading the game two passes ahead. Coachable, brings others.',          numbers: '8 goals · 91% training · 11 assists',               next: 'Nominate for FV talent ID program',           birthMonth: 'Nov', bornLate: true },
  { ini: 'GN', name: 'Grace Nguyen',  team: 'U11 Girls Kate',coach: 'Kate Lim',      why: "Very quick, wins the ball back everywhere. Needs a bigger challenge — she is bored in the current team.", numbers: '9 goals · 89% training · lowest minutes conceded', next: 'Move to U12 Girls Ana',                       birthMonth: 'Aug', bornLate: true },
  { ini: 'MT', name: 'Mia Tran',      team: 'U12 Sam',       coach: 'Sam Kerr',      why: 'Has improved more this season than any other player. First touch is now a weapon.',                     numbers: '7 goals · 90% training · most improved score',      next: 'Invite to talent day',                        birthMonth: 'Mar', bornLate: false },
  { ini: 'FL', name: 'Freya Lowe',    team: 'U11 Girls Kate',coach: 'Kate Lim',      why: 'Leads the press without being coached to. Vision is there already. Ready for a step up.',               numbers: '6 goals · 93% training · most tackles won',         next: 'Invite to U12 Girls Ana session',             birthMonth: 'Dec', bornLate: true },
  { ini: 'RC', name: 'Ruby Chen',     team: 'U13 Girls Meg', coach: 'Meg Doyle',     why: 'Best engine in the team. Covers more ground than anyone and wins the ball back consistently.',           numbers: '5 goals · 88% training · most pressures',           next: 'Nominate for FV talent ID program',           birthMonth: 'Sep', bornLate: true },
  { ini: 'NO', name: 'Noah Owusu',    team: 'U14 Sam',       coach: 'Sam Kerr',      why: 'Very mature for age. Already directing the defence. Good to get in front of a senior coach.',           numbers: '4 goals · 92% training · 0 red or yellow cards',   next: 'Attend senior training as observer',          birthMonth: 'May', bornLate: false },
  { ini: 'PW', name: 'Priya Watts',   team: 'U12 Girls Ana', coach: 'Ana Silva',     why: 'Fastest player at the club. Speed needs to catch up with her technical level but the ceiling is high.',  numbers: '8 goals · 85% training · fastest sprint recorded', next: 'Invite to talent day',                        birthMonth: 'Jul', bornLate: true },
  { ini: 'SD', name: 'Sam Dex',       team: 'U16 Ollie',     coach: 'Ollie Marsh',   why: 'Dominant in the air. Wins every header. Already playing at the intensity of seniors.',                  numbers: '10 goals · 91% training · most headers won',        next: 'Trial with seniors in pre-season',            birthMonth: 'Apr', bornLate: false },
  { ini: 'TL', name: 'Tom Li',        team: 'U13 Chris',     coach: 'Chris Okafor',  why: "Very tidy technically. Keeps the ball in every situation. Needs to play with better players to grow.",  numbers: '5 goals · 87% training · highest pass rate',       next: 'Nominate for FV talent ID program',           birthMonth: 'Oct', bornLate: true },
]

function NominationsView() {
  const lateBorn = NOMINATIONS.filter(n => n.bornLate).length
  return (
    <div style={{ padding: '16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>Ready for more · 11 nominations</div>
          <div style={{ fontSize: 12, color: MUT }}>Coach nominations this season · talk to families before making any offer</div>
        </div>
        <button style={{ height: 36, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Export list</button>
      </div>

      <div style={{ background: '#fdf8ed', border: `1px solid #e8d8a0`, borderRadius: 12, padding: '10px 14px', marginBottom: 16, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={WARN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true"><path d="M12 8v5M12 16h.01M12 3a9 9 0 100 18 9 9 0 000-18z"/></svg>
        <div style={{ fontSize: 13, color: '#7a6218', lineHeight: 1.5 }}>
          <strong>{lateBorn} of these {NOMINATIONS.length} players</strong> were born in the second half of the year (Aug–Dec). Coaches may be seeing maturity, not talent. Talk to the coach about the birth month before acting.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {NOMINATIONS.map((nom) => (
          <div key={nom.ini} style={{ background: '#fff', border: `1px solid ${LN}`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: GD, color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{nom.ini}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' as const }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>{nom.name}</span>
                  <span style={{ fontSize: 12, color: MUT }}>{nom.team}</span>
                  {nom.bornLate && <span style={{ fontSize: 10, fontWeight: 700, color: WARN, background: '#fdf8ed', borderRadius: 999, padding: '1px 7px' }}>Born {nom.birthMonth}</span>}
                </div>
                <div style={{ fontSize: 12, color: MUT, marginTop: 1 }}>Nominated by {nom.coach}</div>
              </div>
              <div style={{ textAlign: 'right' as const, flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: MUT, marginBottom: 2 }}>SUGGESTED NEXT STEP</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: G }}>{nom.next}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: MUT, lineHeight: 1.5, marginBottom: 8, paddingLeft: 48 }}>{nom.why}</div>
            <div style={{ fontSize: 11, color: G, fontWeight: 600, background: PALE, borderRadius: 8, padding: '5px 10px', marginBottom: 10, marginLeft: 48 }}>{nom.numbers}</div>
            <div style={{ display: 'flex', gap: 8, paddingLeft: 48 }}>
              <button style={{ height: 32, padding: '0 14px', borderRadius: 999, border: `1px solid ${LN}`, background: '#fff', fontSize: 12, fontWeight: 600, color: MUT, cursor: 'pointer', fontFamily: 'inherit' }}>Message {nom.coach}</button>
              <button style={{ height: 32, padding: '0 14px', borderRadius: 999, border: 'none', background: G, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Talk to family</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PlayersTab({ empty }: { empty?: boolean }) {
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
          { id: 'nominations', label: 'Ready for more' },
        ]}
        active={view}
        onSelect={id => setView(id as PlayersView)}
      />

      {empty && view in PLAYERS_EMPTY && <EmptyCard {...PLAYERS_EMPTY[view]!} footer={FOOTER_DEFAULT} />}

      {!empty && view === 'overview' && (
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

      {view === 'goals' && <GoalsView />}

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

      {view === 'nominations' && <NominationsView />}

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
