// AC2-Programs: Academy owner: every program this term broken into its teams, with coach, places, attendance, progress and fees for each.
// A template over the store (programs v2, 24 Nov): every figure is counted from the list of players, and "Open" goes to THAT team's page.
// The menus above it are the owner app's own (OwnerHeader).
import { S, INK } from './adStyles'
import Tap from './Tap'
import { PROGRAMS, WAITING, count, money, pays, playersIn, programCounts, teamBoard, teamCounts, useAcademy, type Program } from './academyStore'
import { Avatar, Bar, Cap, Head, LINE, MAUVE, Num, Row, Th, chevron } from './kit'

const COLS = '1.75fr 1.5fr 1.15fr 1.25fr 0.55fr 0.8fr 0.75fr 76px'
const AGES: Record<Program, string> = { Foundation: 'Ages 5 to 8', Development: 'Ages 9 to 11', Advanced: 'Ages 12 to 14' }
// One-on-ones have 16 slots a week between Dani and Reece, at $90 a session. Sample values: slots and the price are not in the list of players.
const ONE_SLOTS = 16, ONE_PRICE = '$90 a session'

const name = (t: string, sub: string, bold: boolean) => (
  <span style={{ display: 'flex', flexDirection: 'column', paddingLeft: bold ? 0 : 16 }}>
    <strong style={{ fontSize: bold ? 15 : 14, lineHeight: '19px', whiteSpace: 'nowrap' }}>{t}</strong>
    <span style={{ fontSize: 12, color: '#4a5a57' }}>{sub}</span>
  </span>
)
const small = { fontSize: 13, lineHeight: '17px' } as const
const places = (n: number, cap: number, bold: boolean) => (
  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Bar pct={cap ? Math.round(100 * n / cap) : 0} w={44} /><span style={{ ...S.num, fontWeight: bold ? 700 : undefined, whiteSpace: 'nowrap' }}>{n} of {cap}</span></span>
)

export default function AC2Programs() {
  const a = useAcademy(), all = programCounts(a)
  const ones = a.players.filter(p => p.one_on_ones).length
  // Worth knowing: the team with the largest share of families who have not said about Term 3; the teams that are full; what the open places are worth.
  const sized = a.groups.map(g => ({ g, c: count(playersIn(a, g.id)) })).filter(x => x.c.n > 0)
  const unsaid = sized.reduce<typeof sized[number] | null>((m, x) => !m || x.c.notSaid / x.c.n > m.c.notSaid / m.c.n ? x : m, null)
  const full = sized.filter(x => x.c.n >= x.g.cap).map(x => x.g.name)
  const advOpen = programCounts(a, 'Advanced').open
  const know: [string, string, string][] = [
    ...(unsaid && unsaid.c.notSaid ? [[`${unsaid.g.name}: ${unsaid.c.notSaid} of ${unsaid.c.n} families haven’t said about Term 3`, 'The most of any team', teamBoard(unsaid.g)] as [string, string, string]] : []),
    [`${full.length} ${full.length === 1 ? 'team is' : 'teams are'} full`, full.slice(0, 4).join(', ') + (full.length > 4 ? ` and ${full.length - 4} more` : '') || 'Every team has a place open', 'ADP14-WaitingList'],
    [`${all.open} open ${all.open === 1 ? 'place is' : 'places is'} ${money(all.openWorth)} this term`, PROGRAMS.map(p => `${programCounts(a, p).open} in ${p}`).join(', '), 'AC3-Trials'],
  ]
  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Head title="Programs" sub={`Term 2 · 20 April to 26 June · 10 weeks · ${a.groups.length} teams in ${PROGRAMS.filter(p => programCounts(a, p).teams.length).length} programs · ${all.n} players`}>
        <Tap to="AD4-NextTerm" style={S.more}>Copy to Term 3</Tap>
        <Tap to="AD20-NewProgram" style={S.primary}>+ New program</Tap>
      </Head>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 330px', gap: 12 }}>
        <section style={{ ...S.tile, gap: 2, padding: '12px 16px', minHeight: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>This term</h2><Cap>{all.n} of {all.cap} places · each team has its own coach and its own page</Cap></div>
          <Th cols={COLS} heads={['Team', 'When', 'Coach', 'Places', 'Came', 'Moved up', 'Fees billed', '']} />
          {PROGRAMS.map(prog => { const s = programCounts(a, prog); if (!s.teams.length) return null; return (
            <div key={prog} style={{ display: 'contents' }}>
              {/* The price a player pays sits beside the program's fees total, so the total is never read as a price. */}
              <Row cols={COLS} h={46} band>
                {name(prog, `${AGES[prog]} · ${s.teams.length} teams · ${pays(a, prog)} a player this term`, true)}
                <span /><span />
                {places(s.n, s.cap, true)}
                <Num bold>{s.att}%</Num>
                <Num bold>{s.up} of {s.n}</Num>
                <Num bold>{money(s.billed)}</Num>
                <span />
              </Row>
              {s.teams.map(g => { const t = teamCounts(a, g); return (
                <Row key={g.id} cols={COLS} h={50}>
                  {name(g.name, g.where.split(' · ')[1] ?? g.where, false)}
                  <span style={small}>{g.when.split(' · ').map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}</span>
                  <span style={small}>{g.coach}</span>
                  {places(t.n, g.cap, false)}
                  <Num>{t.of ? `${t.att}%` : ''}</Num>
                  <Num>{t.up} of {t.n}</Num>
                  <Num>{money(t.billed)}</Num>
                  <Tap to={teamBoard(g)} style={S.more} aria-label={`Open ${g.name}`}>Open</Tap>
                </Row>
              ) })}
            </div>
          ) })}
          <Row cols={COLS} h={46} band>
            {name('One-on-ones', `Any age · ${ones} players`, true)}
            <span style={small}><span style={{ display: 'block' }}>45 minutes</span><span style={{ display: 'block' }}>by booking</span></span>
            <span style={small}>Dani and Reece</span>
            {places(ones, ONE_SLOTS, true)}
            <span /><span />
            <Num bold>{ONE_PRICE}</Num>
            <Tap to="ACC5-OneOnOne" style={S.more} aria-label="Open one-on-ones">Open</Tap>
          </Row>
          <Cap style={{ marginTop: 'auto', paddingTop: 10 }}>Families who join mid-term pay only for the weeks left. Brothers and sisters get 10% off.</Cap>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <section style={{ ...S.tile, gap: 0, padding: '12px 14px' }}>
            <h2 style={{ ...S.h2, paddingBottom: 4 }}>Worth knowing</h2>
            {know.map(([t, sub, to]) => (
              <Tap key={t} to={to} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 52, borderTop: `1px solid ${LINE}`, textDecoration: 'none', color: INK, boxSizing: 'content-box' }}>
                <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 14, lineHeight: '18px' }}>{t}</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57' }}>{sub}</span></span>{chevron}
              </Tap>
            ))}
          </section>
          {/* The waiting list is a sample value (5 families, all for Advanced); the open places beside it are counted. */}
          <section style={{ ...S.tile, gap: 4, padding: '12px 14px' }}>
            <h2 style={S.h2}>Waiting list</h2>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, borderTop: `1px solid ${LINE}` }}>
              <Avatar bg={MAUVE} size={34}>{WAITING.Advanced}</Avatar>
              <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}><strong style={{ fontSize: 15, lineHeight: '20px' }}>Advanced · {WAITING.Advanced} waiting</strong><span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{advOpen} {advOpen === 1 ? 'place' : 'places'} open</span></span>
              <Tap to="ADP14-WaitingList" style={{ flex: 'none', height: 44, padding: '0 16px', borderRadius: 12, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', background: '#ffffff', color: INK, border: '1px solid #c5c8c4' }}>Offer</Tap>
            </span>
            <Cap>Nobody is waiting for the other programs.</Cap>
          </section>
          {/* The holiday clinic is its own screen (AC9) and is not in the list of players: 31 of 40 is that screen's sample. */}
          <Tap to="AC9-HolidayClinic" style={{ ...S.tile, gap: 4, padding: '12px 14px', flexGrow: 1, textDecoration: 'none', color: INK }}>
            <h2 style={S.h2}>July holiday clinic</h2>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Mon 6 to Wed 8 July · ages 6 to 12 · $180</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Bar pct={78} w={120} /><strong style={S.num}>31 of 40</strong></span>
            <span style={{ marginTop: 'auto', fontSize: 14, fontWeight: 700 }}>Open the clinic</span>
          </Tap>
        </div>
      </div>
    </main>
  )
}
