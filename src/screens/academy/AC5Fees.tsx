// AC5-Fees: Academy owner, fees: what was billed and collected this term, who is late, and who is paying in parts.
// A template over the store (programs v2, 24 Nov), and an INPUT: "Mark as paid" calls `payFees`, and the team's page, the player's
// page, What each program earns and Home all change with it. Wherever a fees total is shown, the price a player pays is beside it.
// STILL SAMPLE: one-on-ones and the clinic, the sibling discount, the next pay-out, and how many times a family was reminded
// (worked out from how late the fee is; reminders are not in `academy-data.json`).
import type { ReactNode } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { demoToast } from '../demoToast'
import { firstName, groupOf, initials, money, payFees, paysLine, pct, playerBoard, programCounts, useAcademy, weeksLate, type Player } from './academyStore'
import { Link } from './kit'

const kpi = { ...S.tile, padding: '12px 16px', gap: 2 } as const
const big = { ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em' } as const
const small = { fontSize: 13, lineHeight: '18px', color: '#4a5a57' } as const
const paidBtn = { ...S.primary, fontFamily: 'inherit', cursor: 'pointer' } as const
const family = (p: Player) => `${p.name.split(' ').slice(1).join(' ')} family · ${firstName(p)}`

export default function AC5Fees() {
  const a = useAcademy(), all = programCounts(a)
  // Oldest first: the order is how long the fee has waited, then the family's name. It is not a ranking of anyone.
  const late = a.players.filter(p => p.fees_status === 'Late').sort((x, y) => weeksLate(y) - weeksLate(x) || x.name.localeCompare(y.name))
  const plans = a.players.filter(p => p.fees_status === 'On a plan').sort((x, y) => x.name.localeCompare(y.name))
  const owed = (l: Player[]) => l.reduce((t, p) => t + p.fees_owed, 0)
  const paid = a.players.filter(p => p.fees_status === 'Paid').length, inGames = a.players.filter(p => !/^No games/.test(p.game_team)).length
  function pay(p: Player) { const was = p.fees_owed; payFees(p.id); demoToast(`${firstName(p)}’s fees are marked as paid: ${money(was)}. The team’s page, ${firstName(p)}’s page and program money have moved.`) }
  const line = (p: Player, sub: string, note: string, buttons: ReactNode) => (
    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
      {/* The family's name and its line open that player's page. */}
      <Tap to={playerBoard(p)} style={{ flexGrow: 1, minWidth: 0, minHeight: 62, display: 'flex', alignItems: 'center', gap: 12, color: '#10211f', textDecoration: 'none' }}>
        <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{initials(p.name)}</span>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{family(p)}</span>
          <span style={{ display: 'block', ...small }}>{sub}</span>
        </span>
      </Tap>
      <span style={{ ...S.cap, marginRight: 8, whiteSpace: 'nowrap' }}>{note}</span>
      {buttons}
    </div>
  )
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Fees</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Term 2 · {money(all.billed)} billed · a player pays {paysLine(a)} this term</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Term 2 fees downloaded as a spreadsheet." style={S.more}>Download for your accountant</Tap>
          <Tap say="Next pay-out: $2,940 on Friday." style={S.more}>Pay-outs</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))', gridTemplateRows: 'auto minmax(0,1fr)', alignItems: 'start' }}>
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
          <div style={{ ...kpi, background: '#f3ecdf' }}>
            <span style={S.label}>Collected</span>
            <span style={{ ...big, color: '#2f6252' }}>{money(all.collected)}</span>
            <span style={small}>{pct(all.collected, all.billed)}% of the {money(all.billed)} billed</span>
          </div>
          <div style={{ ...kpi, background: '#f4e6e6' }}>
            <span style={S.label}>Late</span>
            <span style={{ ...big, color: '#10211f' }}>{money(owed(late))}</span>
            <span style={small}>{late.length} {late.length === 1 ? 'family' : 'families'}</span>
          </div>
          <div style={{ ...kpi, background: '#eef5f2' }}>
            <span style={S.label}>Still to come on plans</span>
            <span style={{ ...big, color: '#10211f' }}>{money(owed(plans))}</span>
            <span style={small}>{plans.length} {plans.length === 1 ? 'family pays' : 'families pay'} in parts</span>
          </div>
          <div style={{ ...kpi, background: '#ffffff' }}>
            <span style={S.label}>One-on-ones and clinic</span>
            <span style={{ ...big, color: '#10211f' }}>$7,740</span>
            <span style={small}>24 sessions at $90 · 31 clinic places at $180</span>
          </div>
        </div>
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
          <section aria-label="Late" style={{ ...S.tile, gap: 0, padding: '14px 18px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
              <h2 style={S.h2}>Late · {late.length}</h2>
              <span style={S.cap}>Oldest first</span>
            </div>
            {late.map(p => { const w = weeksLate(p); return line(p, `${groupOf(a, p.group)?.name} · ${money(p.fees_owed)} · ${p.fees_note}`, w > 1 ? 'Reminded twice' : 'Reminded once', <>
              <Tap say="Payment plan offered: 3 parts, no extra cost." style={S.more} aria-label={`Offer ${firstName(p)}’s family a plan`}>Offer a plan</Tap>
              <button type="button" onClick={() => pay(p)} style={paidBtn} aria-label={`Mark ${p.name}’s fees as paid`}>Mark as paid</button>
            </>) })}
            {late.length === 0 && <span style={{ ...S.cap, borderTop: '1px solid #e9eae8', padding: '12px 0' }}>Nobody is late.</span>}
            <span style={{ ...S.cap, paddingTop: 8 }}>Reminders go by themselves at 3, 7 and 14 days. After that it comes to you, and the child keeps training unless you decide otherwise.</span>
          </section>
          <section aria-label="Paying in parts" style={{ ...S.tile, gap: 0, padding: '14px 18px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
              <h2 style={S.h2}>Paying in parts · {plans.length}</h2>
              <span style={S.cap}>By name</span>
            </div>
            {plans.map(p => line(p, `${groupOf(a, p.group)?.name} · ${money(p.fees_owed)} still to come · ${p.fees_note.replace(/^Half paid · /, '')}`, 'Half paid', <button type="button" onClick={() => pay(p)} style={{ ...S.more, fontFamily: 'inherit', cursor: 'pointer' }} aria-label={`Mark the rest of ${p.name}’s fees as paid`}>Mark the rest paid</button>))}
            {plans.length === 0 && <span style={{ ...S.cap, borderTop: '1px solid #e9eae8', padding: '12px 0' }}>Nobody is paying in parts.</span>}
            <span style={{ ...S.cap, paddingTop: 8 }}>A plan is not late. The next part is taken on the date shown.</span>
          </section>
        </div>
        <section aria-label="How families pay" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>How families pay</h2>
            <Link to="AD11-ProgramMoney">Program money</Link>
          </div>
          {([['Card, in the app', `${paid} families · paid in full`], ['Payment plan', `${plans.length} families · in parts, no extra cost`], ['Sibling discount', '8 families · 10% off'], ['Club registration', `${inGames} game-team players · goes straight to Wattle Creek FC`]] as const).map(([t, sub], i) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{t}</span>
                <span style={{ display: 'block', ...small }}>{sub}</span>
              </span>
            </div>
          ))}
          <span style={{ ...S.cap, paddingTop: 8 }}>Clean Sheet never shows a child or another parent that a family is behind.</span>
        </section>
      </main>
    </>
  )
}
