// AD24-BringIn: Academy owner: bringing players in from a spreadsheet, matching each column once and checking before anything is saved.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD24BringIn() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Bring in your players</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Step 2 of 3 · match the columns · tall-timber-term2.xlsx · 83 rows</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="AD13-Connections" style={S.more}>Back</Tap>
          <Tap say="Step 3: 80 players ready, 3 need a look. Nothing is saved until you press Bring in." style={S.primary}>Check before saving</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 340px' }}>
        <section aria-label="Your columns, and where each goes" style={{ ...S.tile, gap: 14 }}>
          <h2 style={S.h2}>Your columns, and where each goes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', gap: 10, alignItems: 'end', paddingBottom: 6 }}>
            <span style={S.th}>In your sheet</span>
            <span style={S.th}>Goes to</span>
            <span style={S.th}>First row looks like</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Child</strong>
            </span>
            <Tap say="Pick where this column goes, or leave it out." style={{ minHeight: 44, padding: '0 12px', borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: '#10211f', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>
              Player name
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Tap>
            <span style={{ color: '#4a5a57' }}>Mia Rossi</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>DOB</strong>
            </span>
            <Tap say="Pick where this column goes, or leave it out." style={{ minHeight: 44, padding: '0 12px', borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: '#10211f', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>
              Date of birth
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Tap>
            <span style={{ color: '#4a5a57' }}>14/03/2019</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Mum/Dad</strong>
            </span>
            <Tap say="Pick where this column goes, or leave it out." style={{ minHeight: 44, padding: '0 12px', borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: '#10211f', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>
              Parent name
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Tap>
            <span style={{ color: '#4a5a57' }}>Carla Rossi</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Mob</strong>
            </span>
            <Tap say="Pick where this column goes, or leave it out." style={{ minHeight: 44, padding: '0 12px', borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: '#10211f', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>
              Parent mobile
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Tap>
            <span style={{ color: '#4a5a57' }}>04•• ••• 902</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Group</strong>
            </span>
            <Tap say="Pick where this column goes, or leave it out." style={{ minHeight: 44, padding: '0 12px', borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: '#10211f', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>
              Program
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Tap>
            <span style={{ color: '#4a5a57' }}>Foundation</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Paid T2</strong>
            </span>
            <Tap say="Pick where this column goes, or leave it out." style={{ minHeight: 44, padding: '0 12px', borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: '#10211f', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>
              Fees paid this term
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Tap>
            <span style={{ color: '#4a5a57' }}>$260</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', gap: 10, alignItems: 'center', minHeight: 56, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>Notes</strong>
            </span>
            <Tap say="Pick where this column goes, or leave it out." style={{ minHeight: 44, padding: '0 12px', borderRadius: 12, border: '1px solid #c5c8c4', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: '#4a5a57', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>
              Not brought in
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Tap>
            <span style={{ color: '#4a5a57' }}>asthma, puffer in bag</span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>83 rows: 80 players, 2 that look like doubles, 1 with no date of birth.</span>
        </section>
        <aside aria-label="Three steps" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>Three steps</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Choose the file</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Any spreadsheet, from any system</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Match the columns</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Once. It is remembered next time</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Check, then bring in</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Doubles and gaps are shown first</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Health notes are left out on purpose. Each family is asked for those themselves when they first open the app.</span>
        </aside>
      </main>
    </>
  )
}
