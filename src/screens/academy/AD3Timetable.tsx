// AD3-Timetable: Academy owner: the week by pitch and coach, with cover and wet-weather cancelling.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD3Timetable() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Timetable</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Next week · 8 to 11 June · Messmate Primary School</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Pick the session. Families are told at once and each child gets a make-up." style={S.more}>Cancel a session</Tap>
          <Tap say="A new session opens: group, coach, pitch and time." style={S.primary}>+ Add a session</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 320px' }}>
        <section aria-label="Week" style={{ ...S.tile, gap: 8, padding: '14px 18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '52px repeat(4, minmax(0,1fr))', gap: 8, alignItems: 'center' }}>
            <span />
            <span style={S.th}>Mon 8</span>
            <span style={S.th}>Tue 9</span>
            <span style={S.th}>Wed 10</span>
            <span style={S.th}>Thu 11</span>
            <span style={{ ...S.num, fontSize: 14, fontWeight: 700 }}>4:30</span>
            <Tap to="ACT3-AcademySessionPlan" style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 12, padding: '8px 10px', minHeight: 128, boxSizing: 'border-box', textDecoration: 'none', color: '#10211f', background: '#eef5f2', border: '1px solid #cfe3da' }}>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Foundation</strong>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Sofia and Ben</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Pitch 1</span>
            </Tap>
            <Tap to="ACT3-AcademySessionPlan" style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 12, padding: '8px 10px', minHeight: 128, boxSizing: 'border-box', textDecoration: 'none', color: '#10211f', background: '#eef5f2', border: '1px solid #cfe3da' }}>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Development</strong>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Reece</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Pitch 1</span>
            </Tap>
            <Tap to="ACT3-AcademySessionPlan" style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 12, padding: '8px 10px', minHeight: 128, boxSizing: 'border-box', textDecoration: 'none', color: '#10211f', background: '#eef5f2', border: '1px solid #cfe3da' }}>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Foundation</strong>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Sofia and Ben</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Pitch 1</span>
            </Tap>
            <Tap to="ACT3-AcademySessionPlan" style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 12, padding: '8px 10px', minHeight: 128, boxSizing: 'border-box', textDecoration: 'none', color: '#10211f', background: '#eef5f2', border: '1px solid #cfe3da' }}>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Development</strong>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Reece</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Pitch 1</span>
            </Tap>
            <span style={{ ...S.num, fontSize: 14, fontWeight: 700 }}>5:30</span>
            <span style={{ minHeight: 128, borderRadius: 12, border: '1px dashed #c9d2cf', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#4a5a57' }}>Free</span>
            <Tap to="ACT3-AcademySessionPlan" style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 12, padding: '8px 10px', minHeight: 128, boxSizing: 'border-box', textDecoration: 'none', color: '#10211f', background: '#eef5f2', border: '1px solid #cfe3da' }}>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Advanced</strong>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Reece and Sofia</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Pitch 1</span>
            </Tap>
            <span style={{ minHeight: 128, borderRadius: 12, border: '1px dashed #c9d2cf', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#4a5a57' }}>Free</span>
            <Tap to="ACT3-AcademySessionPlan" style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 12, padding: '8px 10px', minHeight: 128, boxSizing: 'border-box', textDecoration: 'none', color: '#10211f', background: '#f4e6e6', border: '1px solid #c39797' }}>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>Advanced</strong>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Reece only</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Pitch 1</span>
              <strong style={{ fontSize: 12, lineHeight: '16px' }}>Needs a second coach</strong>
            </Tap>
            <span style={{ ...S.num, fontSize: 14, fontWeight: 700 }}>6:45</span>
            <Tap to="ACT3-AcademySessionPlan" style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 12, padding: '8px 10px', minHeight: 128, boxSizing: 'border-box', textDecoration: 'none', color: '#10211f', background: '#eef5f2', border: '1px solid #cfe3da' }}>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>One-on-one</strong>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Dani · 2 booked</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Pitch 2</span>
            </Tap>
            <Tap to="ACT3-AcademySessionPlan" style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 12, padding: '8px 10px', minHeight: 128, boxSizing: 'border-box', textDecoration: 'none', color: '#10211f', background: '#eef5f2', border: '1px solid #cfe3da' }}>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>One-on-one</strong>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Reece · Kai</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Pitch 2</span>
            </Tap>
            <Tap to="ACT3-AcademySessionPlan" style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 12, padding: '8px 10px', minHeight: 128, boxSizing: 'border-box', textDecoration: 'none', color: '#10211f', background: '#eef5f2', border: '1px solid #cfe3da' }}>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>One-on-one</strong>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Dani · 2 booked</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Pitch 2</span>
            </Tap>
            <Tap to="ACT3-AcademySessionPlan" style={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 12, padding: '8px 10px', minHeight: 128, boxSizing: 'border-box', textDecoration: 'none', color: '#10211f', background: '#eef5f2', border: '1px solid #cfe3da' }}>
              <strong style={{ fontSize: 14, lineHeight: '18px' }}>One-on-one</strong>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Reece · open</span>
              <span style={{ fontSize: 12, lineHeight: '16px', color: '#33443f' }}>Pitch 2</span>
            </Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Your rule: one coach to 12 players, and to 8 in Foundation. A session that breaks it turns mauve. Change the rule in How we coach.</span>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section aria-label="Cover" style={{ ...S.tile, gap: 6, borderTop: '4px solid #c39797' }}>
            <h2 style={S.h2}>Cover for Thursday 5:30</h2>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Sofia is away. 20 players are coming.</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 58, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>BC</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Ben Castellano</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Free at 5:30 · check valid to 30 June</span>
              </span>
              <Tap say="Ben has been asked. You’ll hear when he answers." style={S.more}>Ask</Tap>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 58, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>DO</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>You</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Free until your 6:45 one-on-one</span>
              </span>
              <Tap say="You’re on Advanced, Thursday 5:30." style={S.more}>Take it</Tap>
            </div>
          </section>
          <section aria-label="Pitch hire" style={{ ...S.tile, gap: 4, flexGrow: 1 }}>
            <h2 style={S.h2}>Pitch hire</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 50, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Pitch 1</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Group sessions · 6.5 hours a week</span>
              </span>
              <span style={{ ...S.num, fontWeight: 700 }}>$292.50</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 50, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Pitch 2</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>One-on-ones · 45 minutes each</span>
              </span>
              <span style={{ ...S.num, fontWeight: 700 }}>$33.75</span>
            </div>
            <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>$45 an hour, from your hire agreement. It feeds What each program earns.</span>
          </section>
        </div>
      </main>
    </>
  )
}
