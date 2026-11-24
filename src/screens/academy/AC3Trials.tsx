// AC3-Trials: Academy owner, trials.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AC3Trials() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Trials</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>June so far · 9 booked · 4 joined</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Trial link copied." style={S.primary}>Share the trial link</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(4, minmax(0,1fr))' }}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: 8, background: '#e9eae8', borderRadius: 16, padding: 12, minHeight: 0, boxSizing: 'content-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={S.h2}>Booked</h2>
            <strong style={S.num}>2</strong>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>Ivy Barlow, 7</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Mon 8 Jun · Foundation</span>
            <span style={S.cap}>Reminder goes Sunday</span>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>Nate Greco, 10</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Tue 9 Jun · Development</span>
            <span style={S.cap}>Reminder goes Monday</span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto' }}>Families book themselves from your link.</span>
        </section>
        <section style={{ display: 'flex', flexDirection: 'column', gap: 8, background: '#e9eae8', borderRadius: 16, padding: 12, minHeight: 0, boxSizing: 'content-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={S.h2}>Came, to assess</h2>
            <strong style={S.num}>1</strong>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>Arjun Mehta, 10</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Today 4:30 · Development</span>
            <Tap to="ACC3-TrialAssess" style={S.more}>Reece assesses today</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto' }}>The coach rates four skills in under a minute.</span>
        </section>
        <section style={{ display: 'flex', flexDirection: 'column', gap: 8, background: '#e8cfcf', borderRadius: 16, padding: 12, minHeight: 0, boxSizing: 'content-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={S.h2}>Offer to send</h2>
            <strong style={S.num}>3</strong>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>Lola Ferris, 12</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Fits Advanced · came 28 May</span>
            <Tap say="Offer sent to Lola’s family: Advanced, $128 for the 4 weeks left." style={S.primary}>Send offer</Tap>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>Sam Petrakis, 8</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Fits Foundation · came 27 May</span>
            <Tap say="Offer sent to Sam’s family." style={S.primary}>Send offer</Tap>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>Billie Nguyen, 9</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Fits Development · came 26 May</span>
            <Tap say="Offer sent to Billie’s family." style={S.primary}>Send offer</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto' }}>Clean Sheet works out the price for the weeks left.</span>
        </section>
        <section style={{ display: 'flex', flexDirection: 'column', gap: 8, background: '#eef5f2', borderRadius: 16, padding: 12, minHeight: 0, boxSizing: 'content-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={S.h2}>Joined</h2>
            <strong style={S.num}>4</strong>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>Kai Okonkwo, 13</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Advanced · joined 13 May</span>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>Maya Rossi, 6</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Foundation · joined 14 May</span>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>Theo Lindqvist, 11</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Development · joined 19 May</span>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #c5c8c4', borderRadius: 12, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong style={{ fontSize: 15, lineHeight: '20px' }}>Ana Costa, 12</strong>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Advanced · joined 2 Jun</span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto' }}>4 of the last 6 offers were taken up.</span>
        </section>
      </main>
    </>
  )
}
