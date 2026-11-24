// ADCO01-Coach to ADCO17-Coach (and the coach of any team added since): ONE page for a coach, drawn like the boards (pack v31, 25 Nov).
// Agreement, pay, details, away and cover, their team's basics, watched coaching, and a private note only the owner sees.
// COUNTED from the store: the rate, sessions and pay (sessions × the rate the owner typed), the children check (the store's adults), and
// the four basics, which are the same four meters as the team's page. Change the rate in AD21 or take a roll, and this page moves.
// The rest is the owner's own record of the coach, and sample here: see coachStore. Clean Sheet does not work out tax or super, and says so.
import { useContext, useState, type ReactNode } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { demoToast } from '../demoToast'
import { OwnerGo } from './ownerMenu'
import { basics, money, playersIn, teamBoard, teamCounts, useAcademy } from './academyStore'
import { coachFacts, coachPay, coachTeam, first, noteOf, ONE_RATE, setNote, useCoachStore, watchCoach, watchOf } from './coachStore'
import { Avatar, Cap, LINE, Link, MAIN, MUTED, Met, Pill, Proof, SAND, chevron } from './kit'

const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven']
const BASIC_LABEL = ['Notes in the last 3 weeks', 'A goal set', 'Families sent a clip', 'Term reports drafted']
const fact = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${LINE}`, fontSize: 14, textDecoration: 'none', color: '#10211f', boxSizing: 'content-box' } as const
const Fact = ({ label, children, to, onTap }: { label: string; children: ReactNode; to?: string; onTap?: () => void }) => {
  const inner = <><span style={{ color: '#33443f' }}>{label}</span><span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, textAlign: 'right' }}>{children}{(to || onTap) && chevron}</span></>
  if (to) return <Tap to={to} style={fact}>{inner}</Tap>
  if (onTap) return <button type="button" onClick={onTap} style={{ ...fact, width: '100%', padding: 0, borderLeft: 0, borderRight: 0, borderBottom: 0, background: 'transparent', fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left' }}>{inner}</button>
  return <span style={fact}>{inner}</span>
}

export default function CoachPage({ id }: { id: string }) {
  const a = useAcademy(), g = coachTeam(a, id), go = useContext(OwnerGo)
  useCoachStore()
  /** The mobile number: masked, then asked "is it you?", then shown until the page is left. */
  const [mobile, setMobile] = useState<'masked' | 'asking' | 'shown'>('masked')
  if (!g) return <main style={MAIN}><div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><h1 style={{ margin: 0, flexGrow: 1, fontSize: 26, lineHeight: '32px' }}>Coach not found</h1><Tap to="AC6-AcademyCoaches" style={S.more}>All coaches</Tap></div><Cap>This coach is not in the academy’s list.</Cap></main>
  const f = coachFacts(g), pay = coachPay(g), ps = playersIn(a, g.id), s = teamCounts(a, g), four = basics(ps), w = watchOf(g), fn = first(g.coach), x = a.adults.find(y => y.name === g.coach)
  // A coach named on a team since the sample was drawn has no agreement or details on record yet.
  const known = f.since !== null
  const check = !x ? <Pill kind="mauve">To add</Pill> : x.check !== 'Current' ? <Pill kind="warn">{x.check}</Pill> : !x.linked ? <Pill kind="mauve">Current, to link this week</Pill> : <Pill kind="good">Current</Pill>
  // Under 6s play no games yet, so their coach has no Sunday.
  const sessions = `${WORDS[g.days.length] ?? g.days.length} a week${/^No games/.test(g.team) ? '' : ', and Sunday games'}`
  const watched = w.watched ? `Last watched on ${w.watched} by ${w.by === 'You' ? 'you' : w.by}. ${fn} has ${w.read ? 'read it' : 'not opened it yet'}.` : 'Not watched yet this term.'
  // With film there is a session to pick. With none, the owner watches beside the pitch and fills in the same four lines.
  function watch() { watchCoach(g!.coach, w.filmed === 0); go('ADW1-WatchSession') }
  return (
    <main style={{ ...MAIN, padding: '14px 28px 16px' }}>
      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
        <Avatar bg={SAND} size={52}><span style={{ fontSize: 16 }}>{g.ci}</span></Avatar>
        <div style={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>{g.coach}</h1>
          <span style={{ fontSize: 14, lineHeight: '20px', color: MUTED }}>Coach · {g.name} · {g.prog}{f.since ? ` · with you since ${f.since}` : ''}</span>
        </div>
        <Tap to="AC6-AcademyCoaches" style={S.more}>All coaches</Tap>
        <Tap to="AD23-AddCoach" style={S.more}>Change details</Tap>
        <Tap to="ADM1-Messages" style={S.primary}>Message {fn}</Tap>
      </div>
      <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, minWidth: 0 }}>
          <section aria-label="Agreement" style={{ ...S.tile, gap: 0, padding: '12px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 4 }}><h2 style={S.h2}>Agreement</h2>{known ? <Pill kind="good">Signed</Pill> : <Pill kind="mauve">To add</Pill>}</div>
            <Fact label="Engaged as">{known ? 'Casual coach, by the session' : 'Not added yet'}</Fact>
            <Fact label="Rate">{money(g.rate)} a session</Fact>
            <Fact label="Sessions">{sessions}</Fact>
            <Fact label="Runs">{known ? '2 February to 27 November 2026' : 'Not added yet'}</Fact>
            {known ? <Fact label="The signed copy" onTap={() => demoToast('The signed agreement opens as a PDF. Only you can see it.')}>Open</Fact> : <Fact label="The signed copy">None yet</Fact>}
          </section>
          <section aria-label="Details" style={{ ...S.tile, gap: 0, padding: '12px 16px', flexGrow: 1 }}>
            <h2 style={{ ...S.h2, paddingBottom: 4 }}>Details</h2>
            {mobile === 'shown' || !f.mobileEnd
              ? <Fact label="Mobile">{f.mobile || 'Not added yet'}</Fact>
              : mobile === 'asking'
                // The row keeps its height: the button takes the place of the hidden number.
                ? <Fact label="Mobile"><button type="button" onClick={() => { setMobile('shown'); demoToast(`Confirmed. ${fn}’s number shows until you leave this page.`) }} style={{ ...S.more, fontFamily: 'inherit', cursor: 'pointer', flex: 'none', fontSize: 14, padding: '0 12px' }}>Confirm it is you, Dani</button></Fact>
                : <Fact label="Mobile" onTap={() => { setMobile('asking'); demoToast('The full number shows after you confirm it is you.') }}><span aria-label={`Hidden, ending ${f.mobileEnd}`}>04•• ••• {f.mobileEnd}</span></Fact>}
            <Fact label="Email">{f.email}</Fact>
            <Fact label="In an emergency">{f.emergency}</Fact>
            <Fact label="Coaching course">{f.course}</Fact>
            <Fact label="First aid">{f.firstAid}</Fact>
            <Fact label="Children check" to="AD17-Checks">{check}</Fact>
          </section>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, minWidth: 0 }}>
          <section aria-label="Pay" style={{ ...S.tile, gap: 0, padding: '12px 16px', background: '#f3ecdf', border: '2px solid #2f6252' }}>
            <span style={S.label}>Pay · this fortnight</span>
            <strong style={{ ...S.num, fontSize: 28, lineHeight: '34px' }}>{money(pay.fortnight)}</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: MUTED }}>{pay.sessions ? `${pay.sessions} sessions at ${money(g.rate)}${pay.ones ? ` · ${pay.ones} one-on-ones at ${money(ONE_RATE)}` : ''} · goes to payroll on Friday 5 June` : 'No sessions run yet'}</span>
            {pay.past.map(([day, sum]) => <Fact key={day} label={day}><Pill kind="good">Paid</Pill> <span style={S.num}>{money(sum)}</span></Fact>)}
            <Fact label="This term so far"><span style={S.num}>{pay.termSessions} sessions · {money(pay.term)}</span></Fact>
            <Fact label="This year so far"><span style={S.num}>{money(pay.year)}</span></Fact>
            <span style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
              <Tap to="AD9-RosterPay" style={S.more}>Roster and pay</Tap>
              <Tap to="AD21-RatesCosts" style={S.more}>Change the rate</Tap>
            </span>
          </section>
          <section aria-label="Away and cover" style={{ ...S.tile, gap: 4, padding: '12px 16px', flexGrow: 1 }}>
            <h2 style={S.h2}>Away and cover</h2>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>{f.away}</span>
            <Cap style={{ marginTop: 'auto' }}>Sessions are counted when they are opened and closed on the tablet. Clean Sheet counts sessions and multiplies by the rate you typed. It does not work out tax or super.</Cap>
          </section>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, minWidth: 0 }}>
          <section aria-label="Oversight" style={{ ...S.tile, gap: 2, padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>{g.name} · the basics</h2><Proof kind="Strong" /></div>
            <span style={{ fontSize: 13, lineHeight: '18px', color: MUTED }}>{s.n} players · {s.att}% came · {s.up} up a step</span>
            {/* The same four meters as the team's page. Mauve below two-thirds, for the three the coach does week to week. */}
            {four.map((b, i) => <Met key={b.label} title={BASIC_LABEL[i]} n={b.n} of={b.of} sub="" to={i < 3 ? teamBoard(g) : 'AC7-ReportsOut'} low={i < 3 && b.low} />)}
            <Cap>Counted from what was done in Clean Sheet.</Cap>
          </section>
          <section aria-label="Watched coaching" style={{ ...S.tile, gap: 4, padding: '12px 16px', flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h2 style={S.h2}>Watched coaching</h2><Link to="AD10-WatchCoach">All</Link></div>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>{watched} {w.filmed} session{w.filmed === 1 ? '' : 's'} filmed this term.</span>
            <span style={{ display: 'flex', paddingTop: 4 }}>
              <a href="/__screen/ADW1-WatchSession" onClick={e => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); watch() }} style={S.more}>Watch a session</a>
            </span>
            <label style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 6 }}>
              <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}><strong style={{ fontSize: 14 }}>Your private note</strong><span style={{ fontSize: 12, color: MUTED }}>Only you see this</span></span>
              <textarea value={noteOf(g)} onChange={e => setNote(g, e.target.value)} rows={2} placeholder={`A note to yourself about ${fn}`} style={{ minHeight: 48, resize: 'vertical', boxSizing: 'border-box', padding: '8px 10px', borderRadius: 10, border: '1px solid #c5c8c4', background: '#ffffff', color: '#10211f', fontFamily: 'inherit', fontSize: 14, lineHeight: '20px' }} />
            </label>
          </section>
        </div>
      </div>
    </main>
  )
}
