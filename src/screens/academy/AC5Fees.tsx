// AC5-Fees: Academy owner, fees.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AC5Fees() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Fees</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Term 2 · $23,020 billed</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Term 2 fees downloaded as a spreadsheet." style={S.more}>Download for your accountant</Tap>
          <Tap say="Next pay-out: $2,940 on Friday." style={S.more}>Pay-outs</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))', gridTemplateRows: 'auto minmax(0,1fr)' }}>
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Collected</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#2f6252' }}>$21,180</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>92% of the term</span>
          </div>
          <div style={{ ...S.tile, background: '#f4e6e6', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Late</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>$1,160</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>4 families</span>
          </div>
          <div style={{ ...S.tile, background: '#eef5f2', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Still to come on plans</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>$680</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>9 families pay in parts</span>
          </div>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>One-on-ones and clinic</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>$7,740</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>24 sessions · 31 clinic places</span>
          </div>
        </div>
        <section aria-label="Late" style={{ ...S.tile, gridColumn: 'span 8', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Late</h2>
            <span style={S.cap}>Oldest first</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>JM</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Marsh family · Jonah</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Advanced · $320 · 3 weeks late</span>
            </span>
            <span style={{ ...S.cap, marginRight: 8 }}>Reminded twice</span>
            <Tap say="Payment plan offered: 3 parts, no extra cost." style={S.more}>Offer a plan</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>EB</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Brandt family · Eli</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Development · $290 · 1 week late</span>
            </span>
            <span style={{ ...S.cap, marginRight: 8 }}>Reminded once</span>
            <Tap say="Payment plan offered: 3 parts, no extra cost." style={S.more}>Offer a plan</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>SV</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Vella family · Sienna</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Foundation · $260 · 1 week late</span>
            </span>
            <span style={{ ...S.cap, marginRight: 8 }}>Reminded once</span>
            <Tap say="Payment plan offered: 3 parts, no extra cost." style={S.more}>Offer a plan</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>DK</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Kovac family · Dario</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Development · $290 · 4 days late</span>
            </span>
            <span style={{ ...S.cap, marginRight: 8 }}>Reminder goes tomorrow</span>
            <Tap say="Payment plan offered: 3 parts, no extra cost." style={S.more}>Offer a plan</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Reminders go by themselves at 3, 7 and 14 days. After that it comes to you, and the child keeps training unless you decide otherwise.</span>
        </section>
        <section aria-label="How families pay" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>How families pay</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Card, in the app</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>61 families · paid on enrolment</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Payment plan</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>9 families · 3 parts, no extra cost</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Sibling discount</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>8 families · 10% off</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Club registration</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>16 game-team players · goes straight to Wattle Creek FC</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Clean Sheet never shows a child or another parent that a family is behind.</span>
        </section>
      </main>
    </>
  )
}
