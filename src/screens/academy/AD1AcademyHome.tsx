// AD1-AcademyHome: Academy owner, home: progress across the whole academy, the players who need something, whether every coach is doing the basics, and what needs the owner.
// A template over the store (programs v2, 24 Nov): the fees, the players up a step, the four counts under it, the coach table, "Are families staying?"
// and the counted lines of "Needs you" all come from the list of players, so a roll, a goal or a fee put in anywhere moves them here.
// STILL SAMPLE: last term's figure in the hero, the pitches in use today, the trial families and the session that needs cover.
import { S, INK } from './adStyles'
import Tap from './Tap'
import { BASIC_LOW, PROGRAMS, count, firstName, money, paysLine, playersIn, programCounts, share, teamBoard, useAcademy, worthACall } from './academyStore'
import { Cap, Link, Lines, MAUVE, Met, Num, Of, PALE, Row, SAND, Th, Who } from './kit'

const COLS = '1.5fr 1fr 1fr 1.1fr 0.9fr'
const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const chip = { height: 44, padding: '0 14px', borderRadius: 12, background: PALE, display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', textDecoration: 'none', color: INK, whiteSpace: 'nowrap' } as const
const dev = { ...S.tile, gap: 2, padding: '10px 14px', textDecoration: 'none', color: INK } as const
const big = { ...S.num, fontSize: 28, lineHeight: '32px', letterSpacing: '-0.02em' } as const

export default function AD1AcademyHome() {
  const a = useAcademy(), all = programCounts(a), n = all.n
  const [y, m, d] = a.today.split('-').map(Number), dow = DAY[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]
  const today = a.groups.filter(g => g.days.includes(dow)).length
  const ready = a.players.filter(p => p.ready_to_move_to), stuck = a.players.filter(p => p.same_step_two_terms), noGoal = a.players.filter(p => !p.goal), calls = a.players.filter(worthACall)
  const noGoalIn = PROGRAMS.map(p => ({ p, k: noGoal.filter(x => x.program === p).length })).reduce((best, x) => x.k > best.k ? x : best)
  // The three coaches to look at first: the lowest on notes and clips for the size of their team. Shown in team order; nobody is ranked.
  const rows = a.groups.map((g, i) => ({ g, i, s: count(playersIn(a, g.id)) })).filter(x => x.s.n > 0)
  const three = [...rows].sort((x, y2) => (x.s.clip + x.s.notes) / x.s.n - (y2.s.clip + y2.s.notes) / y2.s.n || x.i - y2.i).slice(0, 3).sort((x, y2) => x.i - y2.i)
  const ending = a.adults.filter(x => x.check !== 'Current')
  const prices = a.groups.map(g => g.price), priceRange = prices.length ? `${money(Math.min(...prices))} to ${money(Math.max(...prices))}` : ''
  const need = [
    { text: '3 trial families are waiting on an offer', to: 'AC3-Trials' },
    ...(all.notSaid ? [{ text: `${all.notSaid} ${all.notSaid === 1 ? 'family hasn’t' : 'families haven’t'} said about Term 3`, to: 'AD4-NextTerm' }] : []),
    ...(all.late ? [{ text: `${all.late} ${all.late === 1 ? 'family is' : 'families are'} behind on fees`, to: 'AC5-Fees' }] : []),
    { text: 'U13 Gold needs cover on Thu 11 June', to: 'AD3-Timetable' },
    ...ending.map(x => ({ text: `${x.name.split(' ')[0]}’s children check ${x.check.replace(/^R/, 'r')}`, to: 'AD17-Checks' })),
  ]
  return (
    <main style={{ flexGrow: 1, minHeight: 0, padding: '14px 28px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <section aria-label="Now" style={{ flex: 'none', borderRadius: 16, background: '#ffffff', border: '1px solid #c5c8c4', padding: '8px 10px 8px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <strong style={{ fontSize: 15, whiteSpace: 'nowrap' }}>Hi Dani · {dow} {d} {MONTH[m - 1]} · Term 2, week 7 of 10</strong>
        <Tap to="AD3-Timetable" style={chip}><strong style={{ fontSize: 13, lineHeight: '16px' }}>Today</strong><span style={{ fontSize: 12, lineHeight: '15px', color: '#33443f' }}>{today} teams train · 6 pitches</span></Tap>
        {/* The price a player pays sits beside the fees total, so the total is never read as a price. */}
        <Tap to="AC5-Fees" style={chip} aria-label={`Fees this term: ${money(all.collected)} of ${money(all.billed)}. A player pays ${paysLine(a)} this term.`}><strong style={{ fontSize: 13, lineHeight: '16px' }}>Fees this term</strong><span style={{ fontSize: 12, lineHeight: '15px', color: '#33443f' }}>{money(all.collected)} of {money(all.billed)} · {priceRange} each</span></Tap>
        <span style={{ flexGrow: 1 }} />
        <Tap to="AC12-AcademyBroadcast" style={S.more}>Message families</Tap>
        <Tap say="Trial link copied. Anyone with it can book a free trial." style={S.primary}>Share the trial link</Tap>
      </section>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 330px', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <section aria-label="Progress" style={{ flex: 'none', borderRadius: 18, background: '#1c3a33', color: '#ffffff', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#f4c95d' }}>PROGRESS · THE WHOLE ACADEMY · {a.groups.length} TEAMS · THIS TERM</span>
                <strong style={{ fontSize: 25, lineHeight: '31px', letterSpacing: '-0.01em' }}>{all.up} of your {n} players are up a step this term.</strong>
                <span style={{ fontSize: 14, lineHeight: '20px', color: '#cfe6dc' }}>On at least one core skill since week 1. At this point last term it was 139 of 204.</span>
              </span>
              <span style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'stretch' }}>
                <Tap say="One then-and-now clip from each program. 60 seconds." style={{ height: 44, padding: '0 16px', borderRadius: 999, background: '#f4c95d', color: INK, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
                  The term in 60 seconds
                </Tap>
                <Tap to="AC2-Programs" style={{ height: 44, padding: '0 16px', borderRadius: 999, border: '1px solid #ffffff', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>By team</Tap>
              </span>
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'flex-end', marginTop: 4 }}>
              {PROGRAMS.map(p => { const s = programCounts(a, p); return (
                <span key={p} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 12, color: '#cfe6dc', whiteSpace: 'nowrap' }}>{p}</span>
                  <span role="img" aria-label={`${p}: ${s.up} of ${s.n}`} style={{ display: 'block', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.16)', overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: `${s.n ? Math.round(100 * s.up / s.n) : 0}%`, background: '#f4c95d' }} /></span>
                  <span style={{ fontSize: 13 }}><strong style={S.num}>{s.up}</strong> of {s.n}</span>
                </span>
              ) })}
            </div>
          </section>
          <div aria-label="Development" style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
            <Tap to="AD5-GroupMoves" style={{ ...dev, background: PALE, borderColor: '#cfe3da' }}><strong style={big}>{ready.length}</strong><strong style={{ fontSize: 14, lineHeight: '18px' }}>Ready to move up</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57' }}>{ready.length > 2 ? `${ready.slice(0, 2).map(firstName).join(', ')} and ${ready.length - 2} more` : ready.map(firstName).join(' and ') || 'Nobody yet'}</span></Tap>
            <Tap to="AC4-AcademyPlayers" style={{ ...dev, background: '#ffffff' }}><strong style={big}>{stuck.length}</strong><strong style={{ fontSize: 14, lineHeight: '18px' }}>On the same step for two terms</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57' }}>Worth a word with their coach</span></Tap>
            <Tap to="AC6-AcademyCoaches" style={{ ...dev, background: '#ffffff' }}><strong style={big}>{noGoal.length}</strong><strong style={{ fontSize: 14, lineHeight: '18px' }}>No goal set</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57' }}>{noGoal.length ? `${noGoalIn.k} of them in ${noGoalIn.p}` : 'Every player has one'}</span></Tap>
            <Tap to="AD2-Health" style={{ ...dev, background: MAUVE, borderColor: '#c39797' }}><strong style={big}>{calls.length}</strong><strong style={{ fontSize: 14, lineHeight: '18px' }}>Families worth a call</strong><span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57' }}>Missing sessions, not re-enrolled</span></Tap>
          </div>
          <section aria-label="Oversight" style={{ ...S.tile, gap: 4, padding: '12px 16px', flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>Oversight · the three coaches to look at first</h2><Link to="AC6-AcademyCoaches">All {a.groups.length} coaches</Link></div>
            <Th cols={COLS} heads={['Coach', 'Notes written', 'Goals set', 'Clips to families', 'Up a step']} />
            {three.map(({ g, s }) => { const low = (v: number) => share(v, s.n) < BASIC_LOW; return (
              <Row key={g.id} cols={COLS} to={teamBoard(g)} h={40}>
                <Who ini={g.ci} name={g.coach} sub={g.name} bg={SAND} />
                <Of n={s.notes} of={s.n} low={low(s.notes)} />
                <Of n={s.goal} of={s.n} low={low(s.goal)} />
                <Of n={s.clip} of={s.n} low={low(s.clip)} />
                <Num bold>{s.up} of {s.n}</Num>
              </Row>
            ) })}
            <Cap style={{ marginTop: 'auto' }}>The lowest on notes and clips, in team order. A coach sees only their own row.</Cap>
          </section>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <section aria-label="Families" style={{ ...S.tile, gap: 2, padding: '12px 14px' }}>
            <h2 style={S.h2}>Are families staying?</h2>
            <Met title="Staying for Term 3" n={all.staying} of={n} sub={`${all.notSaid} not yet said · ${all.leaving} leaving`} to="AD4-NextTerm" />
            <Met title="Families sent a clip this term" n={all.clip} of={n} sub="Families who see progress tend to stay" to="AD15-Families" />
          </section>
          <section aria-label="Needs you" style={{ ...S.tile, gap: 0, padding: '12px 14px', flexGrow: 1, borderTop: '4px solid #c39797' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 4 }}><h2 style={S.h2}>Needs you</h2><Cap>{need.length} things</Cap></div>
            <Lines items={need} />
            <Cap style={{ marginTop: 'auto' }}>Only what Clean Sheet couldn’t settle for you.</Cap>
          </section>
        </div>
      </div>
    </main>
  )
}
