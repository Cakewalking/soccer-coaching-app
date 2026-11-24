// AD7-HowWeCoach: Academy owner: the academy’s way of coaching in one page, which suggested sessions and new coaches follow.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD7HowWeCoach() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>How we coach</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>One page every coach reads before their first session</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Pick the coach. They read it and tick it off before they can open a session." style={S.more}>Send to a new coach</Tap>
          <Tap say="Each part opens to edit. Changes show to coaches from their next session." style={S.primary}>Edit</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <section aria-label="Every session has this shape" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Every session has this shape</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 64, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Arrival game</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Small games as players arrive. Nobody waits.</span>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>15%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 64, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Skill practice</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>The block’s skill, a ball each or in pairs</span>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>25%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 64, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Skill game</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>A game with a rule that makes the skill happen</span>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>35%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 64, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Game</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Free play. The coach watches and notes.</span>
            </span>
            <span style={{ ...S.num, fontWeight: 700 }}>25%</span>
          </div>
          <div style={{ borderRadius: 12, background: '#eef5f2', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>Suggested sessions are built in this shape, sized for the players who are coming.</div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Shares of the session, so it works for 50 minutes or 70.</span>
        </section>
        <section aria-label="Our rules" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Our rules</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>One coach to 12 players</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>To 8 in Foundation</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>A ball each for the first 10 minutes</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Every session, every group</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Nobody queues for more than 30 seconds</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Split the group or add a goal</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>One goal per player, per term</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Chosen with the player</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>One-on-ones in open view</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>And the parent is told first</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>No heading practice under 12</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Your own rule · Australia has no national one</span>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>The timetable and session film check the first three for you.</span>
        </section>
        <section aria-label="Words we use" style={{ ...S.tile, gridColumn: 'span 4', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Words we use</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '6px 0 12px' }}>
            <span style={{ height: 36, padding: '0 14px', borderRadius: 999, background: '#f4e6e6', color: '#10211f', display: 'inline-flex', alignItems: 'center', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>Check your shoulder</span>
            <span style={{ height: 36, padding: '0 14px', borderRadius: 999, background: '#f4e6e6', color: '#10211f', display: 'inline-flex', alignItems: 'center', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>Open up</span>
            <span style={{ height: 36, padding: '0 14px', borderRadius: 999, background: '#f4e6e6', color: '#10211f', display: 'inline-flex', alignItems: 'center', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>First touch away</span>
            <span style={{ height: 36, padding: '0 14px', borderRadius: 999, background: '#f4e6e6', color: '#10211f', display: 'inline-flex', alignItems: 'center', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>Other foot</span>
            <span style={{ height: 36, padding: '0 14px', borderRadius: 999, background: '#f4e6e6', color: '#10211f', display: 'inline-flex', alignItems: 'center', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>Have a go</span>
            <span style={{ height: 36, padding: '0 14px', borderRadius: 999, background: '#f4e6e6', color: '#10211f', display: 'inline-flex', alignItems: 'center', fontSize: 14, fontWeight: 700, boxSizing: 'content-box' }}>What did you see?</span>
          </div>
          <h2 style={{ ...S.h2, marginBottom: 4 }}>Drills we use</h2>
          <Tap to="DrillFlow" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 58, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>64 drills in your library</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>12 are your own · 52 chosen from Clean Sheet</span>
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <Tap to="DrillFlow" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 58, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>3 drills waiting for you</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Reece and Sofia added them this term</span>
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>The same words in every group means a child who moves up already knows them.</span>
        </section>
      </main>
    </>
  )
}
