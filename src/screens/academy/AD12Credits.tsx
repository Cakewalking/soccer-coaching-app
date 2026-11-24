// AD12-Credits: Academy owner: make-ups, credits, paused players, refunds and supported places, with the rule behind each.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD12Credits() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Credits and pauses</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Term 2 · the rules are yours, applied the same for every family</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Your rules open: make-ups, pauses, refunds and brothers and sisters." style={S.more}>Change the rules</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <section aria-label="Owed to families" style={{ ...S.tile, gridColumn: 'span 5', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Owed to families</h2>
          </div>
          <Tap to="ACP6-MakeUp" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 68, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>Make-ups owed</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>A missed session with 2 hours’ notice earns one, used this term</span>
              </span>
            </span>
            <strong style={{ ...S.num, fontSize: 16, whiteSpace: 'nowrap' }}>9 sessions</strong>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <Tap to="AC5-Fees" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 68, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>Credit held for families</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Cancelled sessions and paused weeks, taken off the next bill</span>
              </span>
            </span>
            <strong style={{ ...S.num, fontSize: 16, whiteSpace: 'nowrap' }}>$420</strong>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <Tap say="The request opens: what was paid, what was used, and your refund rule." style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 68, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>Refund asked</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Vella family · moving house in week 8</span>
              </span>
            </span>
            <strong style={{ ...S.num, fontSize: 16, whiteSpace: 'nowrap' }}>$78</strong>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <Tap to="AC5-Fees" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 68, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>Brothers and sisters</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>8 families · 10% off the second child, taken off at billing</span>
              </span>
            </span>
            <strong style={{ ...S.num, fontSize: 16, whiteSpace: 'nowrap' }}>8 families</strong>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <Tap to="AC5-Fees" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 68, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>Joined part-way</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>5 players paid only for the weeks left</span>
              </span>
            </span>
            <strong style={{ ...S.num, fontSize: 16, whiteSpace: 'nowrap' }}>5 players</strong>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Clean Sheet applies your rule and shows the family the same sum you see.</span>
        </section>
        <section aria-label="Paused" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Paused</h2>
            <span style={S.cap}>2 players</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>FD</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Finn Doyle · Advanced</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Broken wrist · paused weeks 5 to 8 · place held</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#eef5f2', color: '#2f6252', boxSizing: 'content-box' }}>Back week 9</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>LN</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Lola Nguyen · Advanced</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Family overseas · paused weeks 7 to 8</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#eef5f2', color: '#2f6252', boxSizing: 'content-box' }}>Back week 9</span>
          </div>
          <div style={{ borderRadius: 12, background: '#eef5f2', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>A paused week is credited at the weekly rate. A place is held for up to 4 weeks.</div>
          <h2 style={{ ...S.h2, marginTop: 14, marginBottom: 2 }}>Your rules</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Make-ups</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>2 hours’ notice · used within the term</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Pauses</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Up to 4 weeks · place held</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Refunds</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Unused weeks, less one week</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A coach sees “paused”, never the reason, unless the family ticks that the coach should know.</span>
        </section>
        <section aria-label="Supported places" style={{ ...S.tile, gridColumn: 'span 3', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Supported places</h2>
          </div>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingBottom: 6 }}>
            <strong style={{ ...S.num, fontSize: 30, lineHeight: '36px' }}>3 of 4</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>in use this term</span>
          </span>
          <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>Who can see</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Only you. Coaches, other families and the child’s own screen show nothing different.</span>
          </span>
          <span style={{ height: 10 }} />
          <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>Government sport vouchers</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>6 families asked. An academy can only take them if it is a registered provider in its state.</span>
          </span>
          <Tap say="A short page on who can register, with the link to your state’s program." style={{ ...S.more, alignSelf: 'flex-start', marginTop: 10 }}>Check if you can register</Tap>
          <Tap to="AD19-SupportedPlace" style={{ ...S.more, alignSelf: 'flex-start', marginTop: 10 }}>Give a supported place</Tap>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>
            {'You choose how many places and what a family pays. '}
            <Tap to="ADP16-Voucher">What a family with a voucher sees</Tap>
          </span>
        </section>
      </main>
    </>
  )
}
