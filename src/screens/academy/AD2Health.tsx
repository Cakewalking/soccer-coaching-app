// AD2-Health: Academy owner: are families staying, are places filling, and who might leave. Rebuilt from the board in pack v30 (25 Nov):
// every figure shows the count behind it and a proof mark, and a rate is only shown with its count (under 30, the count and no percentage).
// COUNTED from the store: places filled and the waiting list, this term's players, "Worth a call" (the roll has them missing the last
// three sessions and they have not said about Term 3), and the trials that joined this month (the cards in the Trials list).
// STILL SAMPLE: the three earlier terms, who stayed from Term 1, the year's trials, where new players came from, and why families left.
// That history is not in `academy-data.json`. Each is marked below.
import { S, INK } from './adStyles'
import Tap from './Tap'
import { PROGRAMS, RATE_FROM, WAITING, cameOf, groupOf, initials, pct, playerBoard, programCounts, useAcademy, worthACall } from './academyStore'
import { MORE_JOINED, useTrials } from './trialStore'
import { BOOKED_THIS_MONTH, TRIALS_THIS_YEAR } from './trialHistory'
import { Bar, Cap, Head, LINE, MAIN, MAUVE, PALE, Proof, SAND, Sources } from './kit'

// Sample history: players in each of the three terms before this one, how many of Term 1's players came back, how many of this
// term's new players came from a trial, how the year's growth split by program, and why the families who left after Term 1 said they did.
const EARLIER: [number, string][] = [[164, 'Term 3, 2025'], [181, 'Term 4, 2025'], [204, 'Term 1, 2026']]
const STAYED = 176, FROM_A_TRIAL = 31, GROWTH: Record<string, number> = { Foundation: 14, Development: 27, Advanced: 21 }
const LEFT: [string, number][] = [['Moved to a club’s own program', 9], ['Cost', 6], ['Clash with another sport', 5], ['Moved away', 3], ['Didn’t say', 5]]
const SOURCES: [string, string][] = [['Enrolments', 'AD4-NextTerm'], ['Trials', 'AC3-Trials'], ['The roll', 'ACC2-RunSession'], ['Why a family left', 'ADP10-WhyLeaving'], ['How they heard', 'ADP15-HowHeard']]

/** A rate with its count: "86% came back". Under 30 the percentage is left out. */
const rate = (n: number, of: number, words: string) => of >= RATE_FROM ? `${pct(n, of)}% ${words}` : `${n} of ${of} ${words}`
const big = { ...S.num, fontSize: 28, lineHeight: '32px', letterSpacing: '-0.02em' } as const, small = { fontSize: 12, lineHeight: '16px', color: '#33443f' } as const

function Fig({ label, proof, value, sub, bg }: { label: string; proof: 'Strong' | 'Estimate' | 'You counted'; value: string; sub: string; bg: string }) {
  return (
    <div style={{ ...S.tile, gap: 2, padding: '12px 14px', background: bg }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}><span style={S.label}>{label}</span><Proof kind={proof} /></div>
      <strong style={big}>{value}</strong>
      <span style={small}>{sub}</span>
    </div>
  )
}

export default function AD2Health() {
  const a = useAcademy(), all = programCounts(a), trials = useTrials()
  const before = EARLIER[EARLIER.length - 1][0], left = before - STAYED, fresh = Math.max(0, all.n - STAYED)
  const monthJoined = trials.filter(t => t.col === 'joined').length + MORE_JOINED.n
  const waitingFor = PROGRAMS.filter(p => WAITING[p] > 0), waiting = waitingFor.reduce((t, p) => t + WAITING[p], 0)
  // Late fees first (they are already with the owner), then the list's order: nobody is ranked. Three are shown; the count is all of them.
  const calls = a.players.filter(worthACall), shown = [...calls].sort((x, y) => Number(y.fees_status === 'Late') - Number(x.fees_status === 'Late')).slice(0, 3)
  const terms: [number, string][] = [...EARLIER, [all.n, 'Term 2, 2026']], most = Math.max(...LEFT.map(l => l[1]))
  const grown = Object.entries(GROWTH).map(([p, n]) => `${p} ${n}`).join(', ')
  return (
    <main style={MAIN}>
      <Head title="Health of the academy" sub="Term 2 · four terms shown · every figure shows the count behind it">
        <Tap say="A spreadsheet of these numbers is on its way to your email." style={S.more}>Download</Tap>
      </Head>
      <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
        <Fig label="Stayed from Term 1" proof="Strong" value={`${STAYED} of ${before}`} sub={`${rate(STAYED, before, 'came back')} · counted from enrolments`} bg={SAND} />
        <Fig label="Trials that joined" proof="Strong" value={`${TRIALS_THIS_YEAR.joined} of ${TRIALS_THIS_YEAR.of}`} sub={`This year. This month is ${monthJoined} of ${BOOKED_THIS_MONTH}${BOOKED_THIS_MONTH < RATE_FROM ? ', too few to read' : ''}`} bg="#ffffff" />
        <Fig label="Places filled" proof="Strong" value={`${all.n} of ${all.cap}`} sub={`${all.cap >= RATE_FROM ? `${pct(all.n, all.cap)}% · ` : ''}${waiting ? `${waiting} waiting, all for ${waitingFor.join(' and ')}` : 'nobody waiting'}`} bg={PALE} />
        <Fig label="New this term" proof="You counted" value={String(fresh)} sub={`${Math.min(fresh, FROM_A_TRIAL)} from a trial · ${Math.max(0, fresh - FROM_A_TRIAL)} told by a friend`} bg="#ffffff" />
      </div>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <section aria-label="Players, term by term" style={{ ...S.tile, gap: 6, padding: '12px 16px' }}>
          <h2 style={S.h2}>Players, term by term</h2>
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', gap: 14, minHeight: 150, paddingTop: 8 }}>
            {terms.map(([n, label], k) => (
              <span key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                <strong style={{ ...S.num, fontSize: 16 }}>{n}</strong>
                <span style={{ width: '100%', height: `${Math.round(100 * n / 290)}%`, borderRadius: '10px 10px 0 0', background: k === terms.length - 1 ? '#2f6252' : '#b3cbbf' }} />
                <span style={{ fontSize: 12, lineHeight: '15px', color: '#33443f', textAlign: 'center' }}>{label}</span>
              </span>
            ))}
          </div>
          <Cap>Up {all.n - EARLIER[0][0]} in a year: {grown}. Counted from enrolments each term.</Cap>
          <Tap to="ADP15-HowHeard" style={{ fontSize: 14, fontWeight: 700, minHeight: 44, display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start', margin: '-10px 0' }}>How we know where families came from</Tap>
        </section>
        <section aria-label={`Why ${left} families left after Term 1`} style={{ ...S.tile, gap: 0, padding: '12px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 4 }}><h2 style={S.h2}>Why {left} families left after Term 1</h2><Proof kind="Estimate" /></div>
          {LEFT.map(([why, n]) => (
            <div key={why} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 110px 24px', gap: 10, alignItems: 'center', minHeight: 44, borderTop: `1px solid ${LINE}`, fontSize: 14 }}>
              <span>{why}</span><Bar pct={Math.round(100 * n / most)} w={110} /><strong style={S.num}>{n}</strong>
            </div>
          ))}
          <Cap style={{ marginTop: 'auto', paddingTop: 6 }}>Counts, not rates. With {left} families, one family is {Math.round(100 / left)} points, so read the order and not the size. Asked in a two-question form when a family doesn’t re-enrol.</Cap>
          <Tap to="ADP10-WhyLeaving" style={{ fontSize: 14, fontWeight: 700, minHeight: 44, display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start', margin: '-6px 0 -10px' }}>See the form</Tap>
        </section>
        <section aria-label="Worth a call" style={{ ...S.tile, gap: 0, padding: '12px 16px', borderTop: '4px solid #c39797' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 4 }}>
            <h2 style={S.h2}>Worth a call</h2>
            <Cap>{calls.length} {calls.length === 1 ? 'family' : 'families'}{calls.length > shown.length ? ` · ${shown.length} shown` : ''}</Cap>
          </div>
          {shown.map(p => { const c = cameOf(p); return (
            <Tap key={p.id} to={playerBoard(p)} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 60, borderTop: `1px solid ${LINE}`, textDecoration: 'none', color: INK }}>
              <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: MAUVE, color: INK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{initials(p.name)}</span>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 14, lineHeight: '18px' }}>{p.name} · {groupOf(a, p.group)?.name}</strong>
                <span style={small}>Came to {c.came} of {c.of} · missed the last 3 · not said about Term 3{p.fees_status === 'Late' ? ` · fees ${p.fees_note || 'late'}` : ''}</span>
              </span>
            </Tap>
          ) })}
          {calls.length === 0 && <Cap style={{ borderTop: `1px solid ${LINE}`, paddingTop: 10 }}>No family is worth a call this week.</Cap>}
          {calls.length > 0 && <span style={{ display: 'flex', paddingTop: 8 }}><Tap to="ADM1-Messages" style={S.more}>Message these families</Tap></span>}
          <Cap style={{ marginTop: 'auto', paddingTop: 6 }}>A family shows here when the roll has them missing the last three sessions and they haven’t said about Term 3. It is a prompt to call, not a prediction.</Cap>
        </section>
      </div>
      <Sources items={SOURCES} />
    </main>
  )
}
