// AD11-ProgramMoney: Academy owner: what a player pays, and the fees billed, coach cost and pitch hire for each program this term; and the year's four parts.
// A template over the store (programs v2, 24 Nov). Fees billed is players × what each player pays this term; coaches is 20 sessions a team
// at the rate set in AD21; pitch hire is half a pitch a team. The price a player pays is shown beside every total.
import { S } from './adStyles'
import Tap from './Tap'
import { PROGRAMS, SESSIONS_A_TERM, money, pays, programCounts, useAcademy } from './academyStore'
import { Cap, Head, LINE, MAIN, Num, Row, Sources, Th, Tile } from './kit'

const COLS = '1.3fr 1fr 0.7fr 1fr 1fr 0.9fr 1fr'

export default function AD11ProgramMoney() {
  const a = useAcademy(), all = programCounts(a)
  return (
    <main style={MAIN}>
      <Head title="What each program earns" sub="Term 2 · this term’s instalment of the season fee · before your own pay, insurance, kit and the trip">
        <Tap to="AD21-RatesCosts" style={S.more}>Rates and pitch hire</Tap>
        <Tap say="A spreadsheet is on its way to your email." style={S.primary}>Download for your accountant</Tap>
      </Head>
      <Tile title="This term" right={<Cap>Fees billed is players × what each player pays this term</Cap>}>
        <Th cols={COLS} heads={['Program', 'A player pays', 'Players', 'Fees billed', 'Coaches', 'Pitch hire', 'Left over']} />
        {PROGRAMS.map(p => { const s = programCounts(a, p); if (!s.teams.length) return null; return (
          <Row key={p} cols={COLS} to="AC2-Programs" h={54}>
            <span style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{p}</strong><span style={{ fontSize: 12, color: '#4a5a57' }}>{s.teams.length} teams</span></span>
            <Num>{pays(a, p)}</Num>
            <Num>{s.n}</Num>
            <Num>{money(s.billed)}</Num>
            <Num>−{money(s.coachCost)}</Num>
            <Num>−{money(s.pitch)}</Num>
            <span><strong style={{ ...S.num, fontSize: 16 }}>{money(s.left)}</strong></span>
          </Row>
        ) })}
        <Row cols={COLS} h={50} band>
          <span><strong>All programs</strong></span>
          <span />
          <span><strong style={S.num}>{all.n}</strong></span>
          <span><strong style={S.num}>{money(all.billed)}</strong></span>
          <span><strong style={S.num}>−{money(all.coachCost)}</strong></span>
          <span><strong style={S.num}>−{money(all.pitch)}</strong></span>
          <span><strong style={{ ...S.num, fontSize: 16 }}>{money(all.left)}</strong></span>
        </Row>
        <Cap style={{ paddingTop: 6 }}>Coaches is {SESSIONS_A_TERM} sessions a team at {money(a.coach_rate_a_session)}. Pitch hire is {money(a.half_pitch_a_term)} a team for half a pitch. {money(all.owed)} of the fees billed is still owed. {all.open} open {all.open === 1 ? 'place' : 'places'} would add {money(all.openWorth)}.</Cap>
      </Tile>
      <div style={{ flex: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>What a family pays for the year</h2><Cap>Four parts. The season is paid in two instalments, Term 2 and Term 3.</Cap></div>
      <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>
        {PROGRAMS.map(p => { const parts = a.price_for_the_year[p]; return (
          <div key={p} style={{ ...S.tile, gap: 0, padding: '12px 16px' }}>
            <strong style={{ fontSize: 16 }}>{p}</strong>
            {parts.map(([label, v]) => <span key={label} style={{ display: 'flex', justifyContent: 'space-between', minHeight: 30, alignItems: 'center', borderTop: `1px solid ${LINE}`, fontSize: 14, boxSizing: 'content-box' }}><span>{label}</span><span style={S.num}>{v ? money(v) : 'Not at this age'}</span></span>)}
            <span style={{ display: 'flex', justifyContent: 'space-between', minHeight: 36, alignItems: 'center', borderTop: `1px solid ${LINE}`, fontSize: 15, fontWeight: 700, boxSizing: 'content-box' }}><span>A player, for the year</span><span style={S.num}>{money(parts.reduce((t, [, v]) => t + v, 0))}</span></span>
          </div>
        ) })}
      </div>
      <Sources items={[['Prices', 'AD20-NewProgram'], ['Rates and pitch hire', 'AD21-RatesCosts'], ['Fees paid', 'AC5-Fees'], ['Team by team', 'AC2-Programs']]} />
    </main>
  )
}
