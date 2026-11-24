// AD11-ProgramMoney: Academy owner: income, coach cost and pitch hire for each program this term, and what empty places cost.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD11ProgramMoney() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>What each program earns</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Term 2 · 10 weeks · before your own pay, insurance and other costs</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Term 2 is on its way to your email as a spreadsheet." style={S.more}>Download for your accountant</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 320px' }}>
        <section aria-label="This term" style={{ ...S.tile, gap: 0, padding: '14px 18px 10px', gridColumn: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>This term</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 0.8fr 0.9fr 1.3fr', gap: 10, alignItems: 'end', paddingBottom: 6 }}>
            <span style={S.th}>Program</span>
            <span style={S.th}>Fees</span>
            <span style={S.th}>Coaches</span>
            <span style={S.th}>Pitch hire</span>
            <span style={S.th}>Left over</span>
            <span style={S.th}>Places filled</span>
          </div>
          <Tap to="AC2-Programs" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 0.8fr 0.9fr 1.3fr', gap: 10, alignItems: 'center', minHeight: 70, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Foundation</strong>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>$7,280</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$1,800</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$900</span>
            <span>
              <strong style={{ ...S.num, fontSize: 16 }}>$4,580</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', display: 'inline-block', width: 70, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                <span style={{ display: 'block', height: '100%', width: '88%', background: '#2f6252' }} />
              </span>
              <span style={{ ...S.num, fontWeight: 700 }}>28 of 32</span>
            </span>
          </Tap>
          <Tap to="AC2-Programs" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 0.8fr 0.9fr 1.3fr', gap: 10, alignItems: 'center', minHeight: 70, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Development</strong>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>$8,700</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$1,200</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$900</span>
            <span>
              <strong style={{ ...S.num, fontSize: 16 }}>$6,600</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', display: 'inline-block', width: 70, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                <span style={{ display: 'block', height: '100%', width: '94%', background: '#2f6252' }} />
              </span>
              <span style={{ ...S.num, fontWeight: 700 }}>30 of 32</span>
            </span>
          </Tap>
          <Tap to="AC2-Programs" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 0.8fr 0.9fr 1.3fr', gap: 10, alignItems: 'center', minHeight: 70, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Advanced</strong>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>$7,040</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$2,300</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$1,125</span>
            <span>
              <strong style={{ ...S.num, fontSize: 16 }}>$3,615</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', display: 'inline-block', width: 70, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                <span style={{ display: 'block', height: '100%', width: '92%', background: '#2f6252' }} />
              </span>
              <span style={{ ...S.num, fontWeight: 700 }}>22 of 24</span>
            </span>
          </Tap>
          <Tap to="AC2-Programs" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 0.8fr 0.9fr 1.3fr', gap: 10, alignItems: 'center', minHeight: 70, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>One-on-ones</strong>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>$2,160</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$300</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$810</span>
            <span>
              <strong style={{ ...S.num, fontSize: 16 }}>$1,050</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', display: 'inline-block', width: 70, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
                <span style={{ display: 'block', height: '100%', width: '75%', background: '#2f6252' }} />
              </span>
              <span style={{ ...S.num, fontWeight: 700 }}>6 of 8</span>
            </span>
          </Tap>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 0.8fr 0.9fr 1.3fr', gap: 10, alignItems: 'center', minHeight: 60, fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', background: '#eef5f2', borderRadius: 10, padding: '0 10px', borderTop: 0, marginTop: 6, boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>All programs</strong>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>$25,180</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$5,600</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$3,735</span>
            <span>
              <strong style={{ ...S.num, fontSize: 16 }}>$15,845</strong>
            </span>
            <span />
          </div>
          <h2 style={{ ...S.h2, marginTop: 18, marginBottom: 8 }}>Where each $100 of fees goes</h2>
          <div role="img" aria-label="Coaches 22 dollars, pitch hire 15 dollars, left over 63 dollars" style={{ display: 'flex', gap: 4, height: 44 }}>
            <span style={{ flex: '22', borderRadius: 8, background: '#f4e6e6', color: '#10211f', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>Coaches $22</span>
            <span style={{ flex: '15', borderRadius: 8, background: '#f3ecdf', color: '#10211f', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>Pitch $15</span>
            <span style={{ flex: '63', borderRadius: 8, background: '#2f6252', color: '#ffffff', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>Left over $63</span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Fees are what was billed. Coaches is sessions at the rates in Roster and pay. Pitch hire is hours at $45. The July clinic is counted in Term 3.</span>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section aria-label="Empty places" style={{ ...S.tile, gap: 6 }}>
            <h2 style={S.h2}>Empty places</h2>
            <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <strong style={{ ...S.num, fontSize: 30, lineHeight: '36px' }}>$2,260</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>a term · 8 group places</span>
            </span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>4 in Foundation, 2 in Development, 2 in Advanced.</span>
            <Tap to="AC3-Trials" style={{ ...S.more, alignSelf: 'flex-start' }}>See trials</Tap>
          </section>
          <section aria-label="Worth knowing" style={{ ...S.tile, gap: 8, flexGrow: 1 }}>
            <h2 style={S.h2}>Worth knowing</h2>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Advanced costs the most to run</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Two coaches and a longer session</span>
            </span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Development has room for a second coach</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>30 players with one coach is over your own rule on Thursdays</span>
            </span>
            <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Numbers, not advice. Prices are yours to set.</span>
          </section>
        </div>
      </main>
    </>
  )
}
