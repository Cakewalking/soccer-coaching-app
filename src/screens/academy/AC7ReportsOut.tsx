// AC7-ReportsOut: Academy owner, term reports.
// One line differs from the board on purpose: the board still says "Five skills, then and now"; the academy has four core skills.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AC7ReportsOut() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Term reports</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Term 2 · due to families in week 9</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="ACP5-ProgressReport" style={S.more}>See a finished report</Tap>
          <Tap say="5 reports sent to families." style={S.primary}>Approve 5 and send</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <section aria-label="By program" style={{ ...S.tile, gridColumn: 'span 7', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>By program</h2>
            <span style={S.cap}>12 of 80 drafted</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr 110px', gap: 12, alignItems: 'center', minHeight: 66, borderTop: '1px solid #e9eae8', fontSize: 14, boxSizing: 'content-box' }}>
            <strong style={{ fontSize: 15 }}>Advanced</strong>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flexGrow: 1, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: '36%', background: '#2f6252' }} />
              </span>
              <span style={S.num}>8 of 22 drafted</span>
            </span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>4 waiting for you</span>
            </span>
            <Tap to="ACC6-ReportDraft" style={S.more}>Open</Tap>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr 110px', gap: 12, alignItems: 'center', minHeight: 66, borderTop: '1px solid #e9eae8', fontSize: 14, boxSizing: 'content-box' }}>
            <strong style={{ fontSize: 15 }}>Development</strong>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flexGrow: 1, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: '10%', background: '#2f6252' }} />
              </span>
              <span style={S.num}>3 of 30 drafted</span>
            </span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>1 waiting for you</span>
            </span>
            <Tap to="ACC6-ReportDraft" style={S.more}>Open</Tap>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1fr 110px', gap: 12, alignItems: 'center', minHeight: 66, borderTop: '1px solid #e9eae8', fontSize: 14, boxSizing: 'content-box' }}>
            <strong style={{ fontSize: 15 }}>Foundation</strong>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flexGrow: 1, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: '4%', background: '#2f6252' }} />
              </span>
              <span style={S.num}>1 of 28 drafted</span>
            </span>
            <span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e9eae8', color: '#10211f', boxSizing: 'content-box' }}>None waiting</span>
            </span>
            <Tap to="ACC6-ReportDraft" style={S.more}>Open</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A coach checks each draft, then you approve it. Nothing reaches a parent that a person hasn’t read.</span>
        </section>
        <section aria-label="What a report holds" style={{ ...S.tile, gridColumn: 'span 5', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>What a report holds</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Four core skills, then and now</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>From the coach’s session notes</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>What they came to</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Sessions attended this term</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>One goal for next term</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Chosen by the coach</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>A clip</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Only where the parent agreed</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>No rankings and no comparing children. Each report is the child against their own last term.</span>
        </section>
      </main>
    </>
  )
}
