// AD5-GroupMoves: Academy owner: which players are ready to change group, the evidence, the coach’s view, and how the family is asked.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD5GroupMoves() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Group moves</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>For Term 3 · suggested by coaches, decided by you, agreed with the family</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }} />
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 320px' }}>
        <section aria-label="Suggested by your coaches" style={{ ...S.tile, gap: 0, padding: '14px 18px 10px', gridColumn: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Suggested by your coaches</h2>
            <span style={S.cap}>4 players</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) 170px', columnGap: 10, alignItems: 'center', minHeight: 104, borderTop: '1px solid #e9eae8', padding: '6px 0', boxSizing: 'border-box' }}>
            <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>RS</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <strong style={{ fontSize: 15 }}>Ruby Sandhu, 10</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Development to Advanced</span>
              </span>
              <span role="img" aria-label="With the ball strong, Game sense strong, Body some, Head strong" style={{ display: 'inline-flex', gap: 4, flexWrap: 'wrap' }}>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', border: '1px solid #2f6252' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  With the ball
                </span>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', border: '1px solid #2f6252' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  Game sense
                </span>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#eef5f2', color: '#10211f', border: '1px solid #cfe3da' }}>Body</span>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', border: '1px solid #2f6252' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  Head
                </span>
              </span>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Reece: ready now. Wins most one-against-ones in her group.</span>
            </span>
            <Tap say="The family is asked, with the reason, the new time and the new price. Nothing changes until they agree." style={S.primary}>Offer the move</Tap>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) 170px', columnGap: 10, alignItems: 'center', minHeight: 104, borderTop: '1px solid #e9eae8', padding: '6px 0', boxSizing: 'border-box' }}>
            <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>HP</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <strong style={{ fontSize: 15 }}>Hugo Pereira, 7</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Foundation to Development</span>
              </span>
              <span role="img" aria-label="With the ball strong, Game sense some, Body strong, Head strong" style={{ display: 'inline-flex', gap: 4, flexWrap: 'wrap' }}>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', border: '1px solid #2f6252' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  With the ball
                </span>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#eef5f2', color: '#10211f', border: '1px solid #cfe3da' }}>Game sense</span>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', border: '1px solid #2f6252' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  Body
                </span>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', border: '1px solid #2f6252' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  Head
                </span>
              </span>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Sofia: ready for Term 3. He turns 8 in August.</span>
            </span>
            <Tap say="The family is asked, with the reason, the new time and the new price. Nothing changes until they agree." style={S.more}>Offer the move</Tap>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) 170px', columnGap: 10, alignItems: 'center', minHeight: 104, borderTop: '1px solid #e9eae8', padding: '6px 0', boxSizing: 'border-box' }}>
            <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>TL</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <strong style={{ fontSize: 15 }}>Theo Lindqvist, 11</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Development to Advanced</span>
              </span>
              <span role="img" aria-label="With the ball strong, Game sense strong, Body not yet, Head some" style={{ display: 'inline-flex', gap: 4, flexWrap: 'wrap' }}>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', border: '1px solid #2f6252' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  With the ball
                </span>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', border: '1px solid #2f6252' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  Game sense
                </span>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#ffffff', color: '#4a5a57', border: '1px dashed #8a9794' }}>Body</span>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#eef5f2', color: '#10211f', border: '1px solid #cfe3da' }}>Head</span>
              </span>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Reece: wait a term. Growing fast, so keep his week steady.</span>
            </span>
            <Tap say="You’ll be asked again in week 5 of Term 3." style={S.more}>Look again in Term 3</Tap>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) 170px', columnGap: 10, alignItems: 'center', minHeight: 104, borderTop: '1px solid #e9eae8', padding: '6px 0', boxSizing: 'border-box' }}>
            <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>KO</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <strong style={{ fontSize: 15 }}>Kai Okonkwo, 13</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Advanced, staying</span>
              </span>
              <span role="img" aria-label="With the ball strong, Game sense some, Body some, Head strong" style={{ display: 'inline-flex', gap: 4, flexWrap: 'wrap' }}>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', border: '1px solid #2f6252' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  With the ball
                </span>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#eef5f2', color: '#10211f', border: '1px solid #cfe3da' }}>Game sense</span>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#eef5f2', color: '#10211f', border: '1px solid #cfe3da' }}>Body</span>
                <span style={{ height: 26, padding: '0 9px', borderRadius: 999, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', border: '1px solid #2f6252' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  Head
                </span>
              </span>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Reece: add a one-on-one block before any club trial.</span>
            </span>
            <Tap to="ADC1-PlayerFile" style={S.more}>Open his file</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Filled green is strong, pale is some, dashed is not yet. Each one opens the notes and clips behind it.</span>
        </section>
        <aside aria-label="How a move works" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>How a move works</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>A coach suggests it</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>From session notes, film and the skills check</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>You agree</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Or ask the coach for more</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>The family is asked</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>With the reason, the time and the price</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Two sessions in the new group</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Then the child, family and coach decide</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>
            {'Age is the guide, not the rule. Children of the same age can be years apart in growth, so a move looks at the child. '}
            <Tap to="ADP12-MoveOffer">See what the family is asked</Tap>
          </span>
        </aside>
      </main>
    </>
  )
}
