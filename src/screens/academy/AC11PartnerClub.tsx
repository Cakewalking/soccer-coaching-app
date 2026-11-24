// AC11-PartnerClub: Academy owner: how the academy and its partner club work together. Rebuilt from the board in pack v30 (25 Nov):
// four steps across the top, the agreement in two columns, what the academy pays the club, and what each side sees.
// COUNTED from the store: the teams, the game teams and their ages (a team with "No games yet" is not a game team), the game
// players, the fee (`partner_club_fee_a_game_player_a_season` × game players, in two halves), the coaches and the check that runs out.
// STILL SAMPLE: the seven players still to register with the club, the dates, the club's own registration fee, its pitches and its welfare officer.
import { S, INK } from './adStyles'
import Tap from './Tap'
import { gamePlayers, money, useAcademy } from './academyStore'
import { Cap, Head, LINE, MAIN, Pill } from './kit'

const CLUB = 'Wattle Creek FC'
/** Players still to register with the club. Sample: registrations are the club's, not in the academy's list. */
const TO_REGISTER = 7
const LONG: Record<string, string> = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' }
const WORD = ['No', 'One', 'Two', 'Three', 'Four', 'Five']
const arrow = <span aria-hidden="true" style={{ flex: 'none', display: 'flex', alignItems: 'center', color: '#4a5a57' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ ...S.tile, gap: 4, padding: '12px 14px', flex: 1 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ flex: 'none', width: 28, height: 28, borderRadius: 999, background: '#eef5f2', color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{n}</span><strong style={{ fontSize: 15, lineHeight: '19px' }}>{title}</strong></span>
      <span style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>{children}</span>
    </div>
  )
}
function Line({ title, sub, children }: { title: string; sub: string; children?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, borderTop: `1px solid ${LINE}` }}>
      <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{title}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{sub}</span></span>
      {children}
    </div>
  )
}
const pay = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${LINE}`, fontSize: 14, color: INK } as const

export default function AC11PartnerClub() {
  const a = useAcademy()
  const noGames = a.groups.filter(g => /^No games/.test(g.team)), games = a.groups.filter(g => !/^No games/.test(g.team))
  const players = gamePlayers(a).length, notCounted = a.players.length - players
  const fee = a.partner_club_fee_a_game_player_a_season, total = players * fee, half = total / 2
  const ages = games.map(g => g.age), days = [...new Set(a.groups.flatMap(g => g.days))]
  const when = days.length > 2 ? `${LONG[days[0]]} to ${LONG[days[days.length - 1]]}` : days.map(d => LONG[d]).join(' and ')
  const where = a.groups[0]?.where.split(' · ')[0] ?? ''
  const coaches = a.adults.filter(x => x.role !== 'Owner'), ending = coaches.filter(x => x.checkOk && x.check !== 'Current'), missing = coaches.filter(x => !x.checkOk)
  const young = [...new Set(noGames.map(g => g.ages.toLowerCase()))].join(' and ')
  // Weeks until the second half is due, 1 July, counted from today's date in the list.
  const [y, m, d] = a.today.split('-').map(Number), weeks = Math.max(0, Math.round((Date.UTC(y, 6, 1) - Date.UTC(y, m - 1, d)) / (7 * 864e5)))
  const checkLine = `${coaches.length} coaches. ${ending.length === 1 ? `One ${ending[0].check.replace(/^Runs out/, 'runs out on')}` : ending.length ? `${ending.length} run out soon` : missing.length ? `${missing.length} still to look up` : 'All current'}`
  return (
    <main style={MAIN}>
      <Head title={`Partner club · ${CLUB}`} sub="An academy cannot enter a league on its own. Your teams play on Sunday as Wattle Creek teams">
        <Tap to="ADM1-Messages" style={S.more}>Message the club</Tap>
        <Tap say="Pick the team. Wattle Creek’s registrar is asked to enter it for next season." style={S.primary}>+ Add a game team</Tap>
      </Head>
      <div style={{ flex: 'none', display: 'flex', gap: 8, alignItems: 'stretch' }}>
        <Step n={1} title="You train them">{a.groups.length} teams, {when} at {where}. Your coaches, your curriculum, your fees.</Step>{arrow}
        <Step n={2} title="The club enters them">{games.length} teams play in the Football Victoria Sunday league as {CLUB}. Players register through the club.</Step>{arrow}
        <Step n={3} title="You coach them on Sunday">Your coach, in the club’s shirt, on the club’s pitches.{young ? ` ${young.charAt(0).toUpperCase()}${young.slice(1)} play festival days, not league games.` : ''}</Step>{arrow}
        <Step n={4} title="You pay the club">{money(fee)} a game player a season for the name, the league entry, pitches and referees.</Step>
      </div>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: 12 }}>
        <section aria-label="The agreement" style={{ ...S.tile, gap: 0, padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 4 }}><h2 style={S.h2}>The agreement · 2026 season</h2><Pill kind="good">Signed 12 February</Pill></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <div>
              <span style={S.label}>The club gives</span>
              <Line title="Its name and a place in the league" sub={`${games.length} teams entered${ages.length ? `, under ${Math.min(...ages)} to under ${Math.max(...ages)}` : ''}`} />
              <Line title="Registration with Football Victoria" sub={`${players - TO_REGISTER} of ${players} players registered`}><Tap say={`${WORD[TO_REGISTER] ?? 'Seven'} families are reminded to finish registering with the club.`} style={S.more}>Chase {TO_REGISTER}</Tap></Line>
              <Line title="Home pitches and referees on Sunday" sub="Redgum Reserve, pitches 1 to 4" />
              <Line title="A welfare officer at games" sub="Helen Park. At training, concerns come to you"><Tap to="ACP10-AcademyConcern" style={S.more}>How it works</Tap></Line>
            </div>
            <div>
              <span style={S.label}>You give</span>
              <Line title="A coach for every team on game day" sub="The same coach who trains them"><Tap to="ACC7-AcademyGameDay" style={S.more}>Sunday</Tap></Line>
              <Line title="The club’s game-time rule" sub="Every player gets at least half a game"><Pill>Set by the club</Pill></Line>
              <Line title="Children checks the club can see" sub={checkLine}><Tap to="AD17-Checks" style={S.more}>Open</Tap></Line>
              <Line title="The fee" sub={`${money(fee)} a game player a season`} />
            </div>
          </div>
          <Cap style={{ marginTop: 'auto', paddingTop: 8 }}>Families pay you the academy fee. They pay the club its own registration ($120 a season) directly. Neither side sees the other’s money.</Cap>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <section aria-label="What you pay the club" style={{ ...S.tile, background: '#f3ecdf', gap: 0, padding: '12px 16px', border: '2px solid #2f6252' }}>
            <span style={S.label}>What you pay the club</span>
            <strong style={{ ...S.num, fontSize: 28, lineHeight: '34px' }}>{money(total)} <span style={{ fontSize: 14, fontWeight: 600 }}>this season</span></strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{players} game players at {money(fee)}.{notCounted ? ` The ${notCounted} ${young || 'players with no games yet'} are not counted.` : ''}</span>
            <span style={pay}><span style={{ color: '#33443f' }}>First half · 1 April</span><span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}><Pill kind="good">Paid</Pill> <span style={S.num}>{money(half)}</span></span></span>
            <span style={pay}><span style={{ color: '#33443f' }}>Second half · 1 July</span><span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}><Pill kind="mauve">Due in {weeks} {weeks === 1 ? 'week' : 'weeks'}</Pill> <span style={S.num}>{money(half)}</span></span></span>
            <span style={{ display: 'flex', gap: 8, paddingTop: 8 }}><Tap to="AD11-ProgramMoney" style={S.more}>See it in Money</Tap><Tap to="AD21-RatesCosts" style={S.more}>Change the fee</Tap></span>
          </section>
          <section aria-label="What each side sees" style={{ ...S.tile, gap: 0, padding: '12px 16px', flexGrow: 1 }}>
            <h2 style={{ ...S.h2, paddingBottom: 4 }}>What each side sees</h2>
            <Line title="The club sees" sub="Team sheets, cards, minutes played and coach checks for its game teams" />
            <Line title="Only you see" sub="Academy fees, trials, skills, term reports and families’ messages" />
            <Line title="Game film" sub="Yours. The club sees a game only if you share it" />
          </section>
        </div>
      </div>
    </main>
  )
}
