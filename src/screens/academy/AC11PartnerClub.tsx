// AC11-PartnerClub: Academy owner, partner club.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AC11PartnerClub() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Partner club</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Your game team plays as part of Wattle Creek FC</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="New message to Rachel M, director of football." style={S.more}>Message the club</Tap>
          <Tap say="Pick a group. The club is asked to enter it in a league." style={S.primary}>+ Add a game team</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <section aria-label="How the partnership runs" style={{ ...S.tile, gridColumn: 'span 8', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>How the partnership runs</h2>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Linked</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 68, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Who coaches on game day</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>The academy’s coach · Reece Whitlam</span>
            </span>
            <Tap say="Choose: the academy’s coach, or a coach from the club." style={S.more}>Change</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 68, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Game time</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Set by Wattle Creek: every player gets at least half a game</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e9eae8', color: '#10211f', boxSizing: 'content-box' }}>Set by the club</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 68, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Registration</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>14 of 16 are registered with Football Victoria through the club</span>
            </span>
            <Tap say="Reminder sent to 2 families to finish club registration." style={S.more}>Chase 2</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 68, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Concerns</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>At a game: Helen Park, the club’s welfare officer. At training: you</span>
            </span>
            <Tap to="ACP10-AcademyConcern" style={S.more}>How it works</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 68, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>5</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Money</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Club registration goes straight to the club. Term fees come to you</span>
            </span>
            <Tap to="AC5-Fees" style={S.more}>Open fees</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>You train the players and run the team. The club holds the registrations and the place in the league, so its rules apply on game day.</span>
        </section>
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section aria-label="Game team" style={{ ...S.tile, flex: 'none', gap: 6, border: '2px solid #2f6252' }}>
            <span style={S.label}>Game team</span>
            <span style={{ fontSize: 20, lineHeight: '26px', fontWeight: 700 }}>U13 Timber</span>
            <span style={S.cap}>16 players from Advanced · Sunday league, 11 a side · entered by Wattle Creek FC</span>
            <Tap to="ACC7-AcademyGameDay" style={S.more}>See Sunday</Tap>
          </section>
          <section aria-label="What each side sees" style={{ ...S.tile, flexGrow: 1, gap: 0, padding: '14px 18px 10px' }}>
            <h2 style={S.h2}>What each side sees</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 58, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>C</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>The club sees</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Team sheets, cards, minutes and coach checks</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 58, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>A</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Only you see</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Term fees, trials and term reports</span>
              </span>
            </div>
            <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Families are told this when they join the game team.</span>
          </section>
        </div>
      </main>
    </>
  )
}
