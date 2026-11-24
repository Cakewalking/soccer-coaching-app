// AD21-RatesCosts: Academy owner: the pay rate for each coach and the cost of each pitch, which Roster and pay and What each program earns are worked out from.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'
import { Step } from './formKit'

export default function AD21RatesCosts() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Rates and costs</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>What you pay coaches, and what you pay for the pitch</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="AD9-RosterPay" style={S.more}>Cancel</Tap>
          <Tap to="AD9-RosterPay" style={S.primary}>Save</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 340px' }}>
        <section aria-label="Coaches, per session" style={{ ...S.tile, gap: 14 }}>
          <h2 style={S.h2}>Coaches, per session</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 10, alignItems: 'end', paddingBottom: 6 }}>
            <span style={S.th}>Coach</span>
            <span style={S.th}>Group session</span>
            <span style={S.th}>One-on-one</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 10, alignItems: 'center', minHeight: 60, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Reece Whitlam</strong>
            </span>
            <Step start="$60" what="Reece Whitlam, group session" />
            <Step start="$50" what="Reece Whitlam, one-on-one" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 10, alignItems: 'center', minHeight: 60, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Sofia Marin</strong>
            </span>
            <Step start="$55" what="Sofia Marin, group session" />
            <Step start="$50" what="Sofia Marin, one-on-one" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 10, alignItems: 'center', minHeight: 60, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Ben Castellano</strong>
            </span>
            <Step start="$35" what="Ben Castellano, group session" />
            <Step start="None" what="Ben Castellano, one-on-one" />
          </div>
          <h2 style={{ ...S.h2, marginTop: 8 }}>Pitch hire, per hour</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 10, alignItems: 'center', minHeight: 60, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Messmate Primary School</strong>
            </span>
            <Step start="$45" what="Messmate Primary School" />
            <span style={{ color: '#4a5a57' }}>Both pitches</span>
          </div>
        </section>
        <aside aria-label="Where these go" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>Where these go</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Roster and pay</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Sessions run, at these rates</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>What each program earns</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Fees less coaches and pitch</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Nowhere else</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>A coach sees only their own rate</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>From next fortnight</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>A new rate never changes the past</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>These are your numbers. Tax, super and the award are yours and your accountant’s to check.</span>
        </aside>
      </main>
    </>
  )
}
