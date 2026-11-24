// AC4-AcademyPlayers: Academy owner: every player by team, with attendance, game team, term report, Term 3 answer and fees.
// A template over the store (programs v2, 24 Nov): every row is a player in the list, and a row opens THAT player's page.
// By team, then by name. Never ranked. The menus above it are the owner app's own (OwnerHeader).
import { S, INK } from './adStyles'
import Tap from './Tap'
import { cameOf, count, isNew, playerBoard, playersIn, teamBoard, useAcademy } from './academyStore'
import { Cap, FeePill, Head, Link, MAIN, Num, Pill, PlayerName, ReportPill, Row, SOURCES, Sources, Term3Pill, Th } from './kit'

const COLS = '1.6fr 0.55fr 1.5fr 0.9fr 0.9fr 0.9fr'

export default function AC4AcademyPlayers() {
  const a = useAcademy(), all = count(a.players)
  return (
    <main style={MAIN}>
      <Head title="Players" sub={`${all.n} this term · ${all.att}% of sessions attended · ${all.staying} staying for Term 3`}>
        <Tap say={`A spreadsheet of all ${all.n} players is on its way to your email.`} style={S.more}>Export</Tap>
        <Tap to="AC12-AcademyBroadcast" style={S.primary}>Message all families</Tap>
      </Head>
      <div style={{ flex: 'none', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', height: 44 }}><Pill kind="good">All {all.n}</Pill></span>
        {a.groups.map(g => (
          <Tap key={g.id} to={teamBoard(g)} style={{ display: 'inline-flex', alignItems: 'center', height: 44, padding: '0 14px', borderRadius: 999, border: '1px solid #c5c8c4', background: '#ffffff', fontSize: 14, fontWeight: 700, textDecoration: 'none', color: INK }}>{g.name} · {playersIn(a, g.id).length}</Tap>
        ))}
      </div>
      <section style={{ ...S.tile, flex: 'none', gap: 2, padding: '12px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>All players</h2><Cap>By team, then by name. Never ranked.</Cap></div>
        <Th cols={COLS} heads={['Player', 'Came', 'Game team', 'Term report', 'Term 3', 'Fees']} />
        {a.groups.map(g => { const ps = playersIn(a, g.id); return (
          <div key={g.id} style={{ display: 'contents' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, marginTop: 10, padding: '0 10px', borderRadius: 10, background: '#faf5ec' }}>
              <strong style={{ fontSize: 15 }}>{g.name}</strong>
              <Cap style={{ flexGrow: 1 }}>{ps.length} players · {g.coach} · {g.when}</Cap>
              <Link to={teamBoard(g)}>Open the team</Link>
            </div>
            {ps.map(p => { const c = cameOf(p); return (
              <Row key={p.id} cols={COLS} to={playerBoard(p)} h={46}>
                <PlayerName p={p} isNew={isNew(a, p)} />
                <Num>{c.came} of {c.of}</Num>
                <span style={{ fontSize: 13 }}>{p.game_team.split(' · ')[0]}</span>
                <ReportPill p={p} />
                <Term3Pill p={p} />
                <FeePill p={p} />
              </Row>
            ) })}
          </div>
        ) })}
      </section>
      <Cap>Every team plays its games at Wattle Creek FC, your partner club, so games and film come in without anyone sharing them. Under 6s don’t play games yet.</Cap>
      <Sources items={SOURCES} />
    </main>
  )
}
