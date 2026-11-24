// AD15-Families: Academy owner: the term’s short family survey, the lowest answer, and what to do about it.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD15Families() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>What families think</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Term 2, week 6 · 58 of 74 families answered · five questions, one minute</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="The five questions open. You can change one each term." style={S.more}>See the questions</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <section aria-label="Out of 5" style={{ ...S.tile, gridColumn: 'span 7', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Out of 5</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 15, fontWeight: 400 }}>My child enjoys coming</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 120, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '92%', background: '#2f6252' }} />
            </span>
            <strong style={{ ...S.num, width: 32, textAlign: 'right', fontSize: 16 }}>4.6</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 15, fontWeight: 400 }}>The coaches know my child</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 120, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '88%', background: '#2f6252' }} />
            </span>
            <strong style={{ ...S.num, width: 32, textAlign: 'right', fontSize: 16 }}>4.4</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 15, fontWeight: 400 }}>It is good value</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 120, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '82%', background: '#2f6252' }} />
            </span>
            <strong style={{ ...S.num, width: 32, textAlign: 'right', fontSize: 16 }}>4.1</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 15, fontWeight: 400 }}>I can see what my child is improving</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 120, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '78%', background: '#2f6252' }} />
            </span>
            <strong style={{ ...S.num, width: 32, textAlign: 'right', fontSize: 16 }}>3.9</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 60, background: '#f4e6e6', borderRadius: 10, padding: '0 10px', borderTop: 0, boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, fontSize: 15, fontWeight: 700 }}>I know what to practise at home</span>
            <span style={{ flex: 'none', display: 'inline-block', width: 120, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden', verticalAlign: 'middle' }}>
              <span style={{ display: 'block', height: '100%', width: '64%', background: '#40826d' }} />
            </span>
            <strong style={{ ...S.num, width: 32, textAlign: 'right', fontSize: 16 }}>3.2</strong>
          </div>
          <div style={{ borderRadius: 12, background: '#eef5f2', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>
            <strong>Lowest: what to practise at home.</strong>
            {' Development has no weekly practice set. Advanced does, and scored 4.3. '}
            <Tap to="ADC6-HomePractice">Turn it on for Development</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Answers are never shown by family. With fewer than 5 answers in a group, that group isn’t shown on its own.</span>
        </section>
        <section aria-label="In their words" style={{ ...S.tile, gridColumn: 'span 5', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>In their words</h2>
            <span style={S.cap}>21 comments</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 78, borderTop: '1px solid #e9eae8', justifyContent: 'center', boxSizing: 'content-box' }}>
            <span style={{ fontSize: 15, lineHeight: '21px' }}>“He asks to go early now. Whatever Reece is doing, keep doing it.”</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Advanced parent</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 78, borderTop: '1px solid #e9eae8', justifyContent: 'center', boxSizing: 'content-box' }}>
            <span style={{ fontSize: 15, lineHeight: '21px' }}>“We’d do more at home if we knew what. A short video would help.”</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Development parent</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 78, borderTop: '1px solid #e9eae8', justifyContent: 'center', boxSizing: 'content-box' }}>
            <span style={{ fontSize: 15, lineHeight: '21px' }}>“Pick-up at 5:25 and 5:30 start for his sister is tight.”</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Family with two children</span>
          </div>
          <h2 style={{ ...S.h2, marginTop: 12, marginBottom: 4 }}>From the players</h2>
          <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>88% tapped “I enjoyed today”</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>One tap at the end of a session · last 2 weeks</span>
          </span>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Three comments chosen to show the range, not the best three.</span>
        </section>
      </main>
    </>
  )
}
