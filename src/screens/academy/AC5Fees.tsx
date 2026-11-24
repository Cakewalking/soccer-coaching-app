// AC5-Fees: Academy owner: fees run themselves (pack v31, 25 Nov). The saved card is charged on the due date and chased without
// anyone touching it; the owner's list is only the families left after that, each row saying what the app has already done.
// A template over the store, and an INPUT: "Offer a plan" calls `offerPlan` (the family is then on a plan), and "Paid another way"
// calls `payFees` for cash or a bank transfer, the only payment recorded by hand. The team's page, the player's page, What each program
// earns and Home all change with either. "Mark as paid" is gone. A child and other parents are never shown that a family is behind.
// STILL SAMPLE: the nine families who paid by transfer or cash before today, the weekly pay-out, and how many times a card was tried
// and a family reminded (worked out from how late the fee is; tries and reminders are not in `academy-data.json`).
import { useState } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { demoToast } from '../demoToast'
import { firstName, groupOf, initials, money, offerPlan, payFees, paysLine, pct, playerBoard, programCounts, useAcademy, weeksLate, type Player } from './academyStore'
import { Avatar, Cap, Head, Kpi, Kpis, LINE, Link, MAIN, MAUVE, MUTED, PALE, SAND, Sources } from './kit'

/** Families who had paid by bank transfer or cash before today. Sample: how a fee was paid is not in `academy-data.json`. */
const BY_HAND_BEFORE = 9
const surname = (p: Player) => p.name.split(' ').slice(1).join(' ')
/** What the app has already done about a late fee, from how many weeks late it is. */
const did = (p: Player) => { const w = weeksLate(p); return `Card declined on the due date · tried ${Math.min(3, w + 1)} times · reminded ${w > 1 ? 'twice' : 'once'}` }
const families = (n: number) => `${n} ${n === 1 ? 'family' : 'families'}`
const btn = { fontFamily: 'inherit', cursor: 'pointer', flex: 'none' } as const
const STEPS: [string, string, string][] = [
  ['Due date', 'the saved card is charged', 'A receipt goes to the parent. Nothing for you to do'], ['Day 3', 'tried again, first reminder', 'If the card failed'],
  ['Day 7', 'tried again, second reminder', 'With a link to change the card or ask for a plan'], ['Day 14', 'it comes to you', 'Offer a plan, or record a payment made another way'],
]

export default function AC5Fees() {
  const a = useAcademy(), all = programCounts(a)
  /** The family whose "Paid another way" is open: cash, or a bank transfer. */
  const [asking, setAsking] = useState<number | null>(null)
  // Oldest first: the order is how long the fee has waited, then team order, as the board has it. It is not a ranking of anyone.
  const late = a.players.filter(p => p.fees_status === 'Late').sort((x, y) => weeksLate(y) - weeksLate(x) || x.id - y.id)
  const plans = a.players.filter(p => p.fees_status === 'On a plan'), owed = (l: Player[]) => l.reduce((t, p) => t + p.fees_owed, 0)
  const byHand = BY_HAND_BEFORE + a.players.filter(p => p.paid_another_way).length, auto = a.players.filter(p => p.fees_status === 'Paid').length - byHand
  function paid(p: Player, how: 'cash' | 'bank transfer') { const was = p.fees_owed; payFees(p.id, true); setAsking(null); demoToast(`Recorded: the ${surname(p)} family paid ${money(was)} by ${how}. Their card will not be charged again.`) }
  function plan(p: Player) { offerPlan(p.id); demoToast(`A payment plan is offered to the ${surname(p)} family. They are now shown as on a plan.`) }
  function planAll() { const n = late.length; offerPlan(late.map(p => p.id)); demoToast(`A payment plan is offered to ${families(n)}. Each can accept with one tap.`) }
  const fact = (label: string, value: string) => (
    <span key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${LINE}`, fontSize: 14, boxSizing: 'content-box' }}><span style={{ color: '#33443f' }}>{label}</span><span style={{ fontWeight: 700, textAlign: 'right' }}>{value}</span></span>
  )
  return (
    <main style={MAIN}>
      <Head title="Fees" sub={`Term 2 · ${money(all.billed)} billed · a player pays ${paysLine(a)} this term`}>
        <Tap say="A spreadsheet is on its way to your email." style={S.more}>Download for your accountant</Tap>
        <Tap say="Pay-outs land every Tuesday. The next is $18,400 on Tuesday 9 June." style={S.more}>Pay-outs to your bank</Tap>
      </Head>
      <Kpis n={4}>
        <Kpi label="Collected" value={money(all.collected)} sub={`${pct(all.collected, all.billed)}% of the ${money(all.billed)} billed`} bg={SAND} />
        <Kpi label="Paid without anyone touching it" value={`${auto} of ${all.n}`} sub="Card charged on the due date" bg={PALE} />
        <Kpi label="Late, and now yours" value={money(owed(late))} sub={late.length ? `${families(late.length)} · the card has failed three times` : 'Nobody is late'} bg={MAUVE} />
        <Kpi label="Still to come on plans" value={money(owed(plans))} sub={`${families(plans.length)} · charged on 15 June`} />
      </Kpis>
      <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 12, alignItems: 'start' }}>
        <section aria-label="Needs you" style={{ ...S.tile, gap: 2, padding: '12px 16px', borderTop: '4px solid #c39797' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <h2 style={S.h2}>Needs you · {late.length}</h2>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Cap>Oldest first</Cap>
              {late.length > 0 && <button type="button" onClick={planAll} style={{ ...S.primary, ...btn }}>Offer a plan to {late.length === 1 ? 'this family' : `all ${late.length}`}</button>}
            </span>
          </div>
          {late.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 66, borderTop: `1px solid ${LINE}`, boxSizing: 'content-box' }}>
              <Avatar bg={MAUVE} size={36}>{initials(p.name)}</Avatar>
              {/* The family's name and its lines open that player's page. */}
              <Tap to={playerBoard(p)} style={{ flexGrow: 1, minWidth: 0, minHeight: 66, display: 'flex', flexDirection: 'column', justifyContent: 'center', textDecoration: 'none', color: '#10211f' }}>
                <strong style={{ fontSize: 15, lineHeight: '19px' }}>{surname(p)} family · {firstName(p)}</strong>
                <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{groupOf(a, p.group)?.name} · {money(p.fees_owed)} · {p.fees_note}</span>
                <span style={{ fontSize: 12, lineHeight: '16px', color: MUTED }}>{did(p)}</span>
              </Tap>
              {asking === p.id ? (
                <span role="group" aria-label={`How the ${surname(p)} family paid`} style={{ display: 'flex', gap: 8, flex: 'none' }}>
                  <button type="button" onClick={() => paid(p, 'cash')} style={{ ...S.more, ...btn }}>Cash</button>
                  <button type="button" onClick={() => paid(p, 'bank transfer')} style={{ ...S.more, ...btn }}>Bank transfer</button>
                  <button type="button" onClick={() => setAsking(null)} style={{ ...S.more, ...btn, border: '1px solid transparent', background: 'transparent', color: '#2f6252' }}>Cancel</button>
                </span>
              ) : (
                <>
                  <button type="button" onClick={() => setAsking(p.id)} style={{ ...S.more, ...btn }} aria-label={`The ${surname(p)} family paid another way`}>Paid another way</button>
                  <button type="button" onClick={() => plan(p)} style={{ ...S.primary, ...btn }} aria-label={`Offer the ${surname(p)} family a plan`}>Offer a plan</button>
                </>
              )}
            </div>
          ))}
          {late.length === 0 && <Cap style={{ borderTop: `1px solid ${LINE}`, padding: '12px 0' }}>Nothing needs you. Every fee was paid by card, recorded by you, or is on a plan.</Cap>}
          <Cap style={{ paddingTop: 6 }}>A family reaches this list only after the card has failed three times and two reminders have gone. “Paid another way” is for cash or a bank transfer, the only payments you record by hand.</Cap>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <section style={{ ...S.tile, gap: 2, padding: '12px 16px' }}>
            <h2 style={{ ...S.h2, paddingBottom: 6 }}>What happens on its own</h2>
            {STEPS.map(([day, what, sub], i) => { const last = i === STEPS.length - 1; return (
              <div key={day} style={{ display: 'flex', gap: 10, minHeight: 52 }}>
                <span style={{ flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ width: 12, height: 12, borderRadius: 999, background: last ? '#c39797' : '#2f6252', marginTop: 4 }} />
                  {!last && <span style={{ flexGrow: 1, width: 2, background: '#cfe3da' }} />}
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', paddingBottom: 8 }}>
                  <strong style={{ fontSize: 14, lineHeight: '18px' }}>{day} · {what}</strong>
                  <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>{sub}</span>
                </span>
              </div>
            ) })}
            <Cap>A child, and other parents, are never shown that a family is behind. A place is never removed without you.</Cap>
          </section>
          <section aria-label="How families pay" style={{ ...S.tile, gap: 0, padding: '12px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 4 }}><h2 style={S.h2}>How families pay</h2><Link to="AD11-ProgramMoney">Program money</Link></div>
            {fact('Card in the app, in full', families(auto))}
            {fact('Card in the app, on a plan', families(plans.length))}
            {fact('Bank transfer or cash', `${families(byHand)} · you record these`)}
            {fact('Late', families(late.length))}
            <Cap style={{ paddingTop: 6 }}>Club registration goes straight to Wattle Creek FC and is not shown here.</Cap>
          </section>
        </div>
      </div>
      <Sources items={[['What a parent sees', 'ACP4-ParentFees'], ['Prices', 'AD20-NewProgram'], ['Credits and pauses', 'AD12-Credits']]} />
    </main>
  )
}
