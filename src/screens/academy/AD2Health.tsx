// AD2-Health: Academy owner: are families staying, are places filling, and who might leave.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD2Health() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Health of the academy</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Term 2 · four terms shown</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="The numbers are on their way to your email as a spreadsheet." style={S.more}>Download</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))', gridTemplateRows: 'auto minmax(0,1fr)' }}>
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Stayed from Term 1</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>62 of 72</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>86% came back · 10 left</span>
          </div>
          <div style={{ ...S.tile, background: '#f4e6e6', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Trials that joined</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#2f6252' }}>4 of 9</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>This month · 3 waiting on an offer</span>
          </div>
          <div style={{ ...S.tile, background: '#eef5f2', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Places filled</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>91%</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>80 of 88 · 5 on a waiting list</span>
          </div>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>New this term</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>18</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>11 from a trial · 7 from a friend</span>
          </div>
        </div>
        <section aria-label="Players, term by term" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Players, term by term</h2>
          </div>
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', gap: 18, padding: '8px 6px 0' }}>
            <span style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <strong style={{ ...S.num, fontSize: 18 }}>58</strong>
              <span style={{ width: '100%', height: 151, borderRadius: '10px 10px 0 0', background: '#a9cfc0' }} />
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57', textAlign: 'center' }}>Term 3, 2025</span>
            </span>
            <span style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <strong style={{ ...S.num, fontSize: 18 }}>64</strong>
              <span style={{ width: '100%', height: 166, borderRadius: '10px 10px 0 0', background: '#a9cfc0' }} />
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57', textAlign: 'center' }}>Term 4, 2025</span>
            </span>
            <span style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <strong style={{ ...S.num, fontSize: 18 }}>72</strong>
              <span style={{ width: '100%', height: 187, borderRadius: '10px 10px 0 0', background: '#a9cfc0' }} />
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57', textAlign: 'center' }}>Term 1, 2026</span>
            </span>
            <span style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <strong style={{ ...S.num, fontSize: 18 }}>80</strong>
              <span style={{ width: '100%', height: 208, borderRadius: '10px 10px 0 0', background: '#2f6252' }} />
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#4a5a57', textAlign: 'center' }}>Term 2, 2026</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>
            {'Up 22 players in a year. Growth has come from Development, ages 9 to 11. '}
            <Tap to="ADP15-HowHeard">How we know where families came from</Tap>
          </span>
        </section>
        <section aria-label="Why 10 families left after Term 1" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Why 10 families left after Term 1</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 15 }}>Moved to a club’s own program</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '90%', background: '#40826d' }} />
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>3</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 15 }}>Cost</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '60%', background: '#40826d' }} />
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>2</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 15 }}>Clash with another sport</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '60%', background: '#40826d' }} />
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>2</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 15 }}>Moved away</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '30%', background: '#40826d' }} />
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 48, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 15 }}>Didn’t say</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '60%', background: '#40826d' }} />
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>2</span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Asked in a two-question form when a family doesn’t re-enrol. 8 of 10 answered.</span>
        </section>
        <section aria-label="Worth a call" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Worth a call</h2>
            <span style={S.cap}>3 families</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>JM</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Jonah Marsh · Advanced</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Came to 6 of 10 · fees 3 weeks late · not re-enrolled</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>EB</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Eli Brandt · Development</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Came to 7 of 10 · fees 1 week late · not re-enrolled</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#c39797', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>MR</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Maya Rossi · Foundation</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Missed the last 2 · not re-enrolled</span>
            </span>
          </div>
          <Tap say="New message to 3 families. Nothing is sent until you press send." style={{ ...S.more, marginTop: 10, alignSelf: 'flex-start' }}>Message these families</Tap>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A family shows here when attendance drops and they haven’t re-enrolled. It is a prompt to call, not a prediction.</span>
        </section>
      </main>
    </>
  )
}
