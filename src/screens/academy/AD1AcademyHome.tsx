// AD1-AcademyHome: Academy owner, home: what needs you, today, and how the term is going.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD1AcademyHome() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Hi Dani</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Thursday 4 June · Term 2, week 7 of 10</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="AC12-AcademyBroadcast" style={S.more}>Message families</Tap>
          <Tap say="Trial link copied. Anyone with it can book a free trial." style={S.more}>Share the trial link</Tap>
          <Tap to="AC2-Programs" style={S.primary}>+ New program</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))', gridTemplateRows: 'auto minmax(0,1fr)' }}>
        <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Players this term</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>80 of 88</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Places filled across 3 programs</span>
          </div>
          <div style={{ ...S.tile, background: '#f4e6e6', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Staying for Term 3</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#2f6252' }}>52 of 80</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>24 not yet said · 4 leaving</span>
          </div>
          <div style={{ ...S.tile, background: '#eef5f2', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Fees collected</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#10211f' }}>$21,180</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Of $23,020 billed · $1,160 late</span>
          </div>
          <div style={{ ...S.tile, background: '#f3ecdf', padding: '12px 16px', gap: 2 }}>
            <span style={S.label}>Came to training</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700, letterSpacing: '-0.02em', color: '#2f6252' }}>91%</span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Last 2 weeks · 6 make-ups booked</span>
          </div>
        </div>
        <section aria-label="Needs you" style={{ ...S.tile, borderTop: '5px solid #c39797', gridColumn: 'span 7', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Needs you</h2>
            <span style={S.cap}>5 things</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>3 trial families are waiting on an offer</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>They came last week</span>
            </span>
            <Tap to="AC3-Trials" style={S.more}>Send offers</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>24 families haven’t said about Term 3</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Places are held until Friday 19 June</span>
            </span>
            <Tap to="AD4-NextTerm" style={S.more}>See who</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>4 families are behind on term fees</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>$1,160 in total · the oldest is 3 weeks late</span>
            </span>
            <Tap to="AC5-Fees" style={S.more}>See who</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Sofia is away on Thursday 11 June</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Advanced at 5:30 would have one coach for 20 players</span>
            </span>
            <Tap to="AD3-Timetable" style={S.more}>Find cover</Tap>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 62, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>5</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Ben’s children check runs out on 30 June</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>He can’t coach after that until it’s renewed</span>
            </span>
            <Tap to="AC6-AcademyCoaches" style={S.more}>Remind Ben</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Clean Sheet chases fees, trial families and re-enrolments for you. You only see what it couldn’t settle.</span>
        </section>
        <section aria-label="Today" style={{ ...S.tile, gridColumn: 'span 5', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Today</h2>
            <span style={S.cap}>Messmate Primary School</span>
          </div>
          <Tap to="ACC2-RunSession" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>4:30 · Development · 9 to 11</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Reece · pitch 1 · 14 coming, 1 trial</span>
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <Tap to="ACC2-RunSession" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>5:30 · Advanced · 12 to 14</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Reece and Sofia · pitch 1 · 20 coming, 2 make-ups</span>
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <Tap to="ACC5-OneOnOne" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>6:45 · One-on-one · Kai Okonkwo</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Reece · pitch 2, in open view</span>
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <h2 style={{ ...S.h2, marginTop: 14, marginBottom: 6 }}>This term so far</h2>
          <Tap to="AD8-SessionQuality" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>61 of 80 players are up a step in a skill</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>From coaches’ notes since week 1</span>
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <Tap to="AC7-ReportsOut" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>12 of 80 term reports are drafted</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Due to families in week 9</span>
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
          <Tap to="AD5-GroupMoves" style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15, lineHeight: '20px' }}>2 players are ready to move up a group</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Ruby and Hugo</span>
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Tap>
        </section>
      </main>
    </>
  )
}
