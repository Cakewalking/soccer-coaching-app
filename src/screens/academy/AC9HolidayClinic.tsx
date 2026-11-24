// AC9-HolidayClinic: Academy owner, holiday clinic.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AC9HolidayClinic() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>July holiday clinic</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Mon 6 to Wed 8 July · $180 · open to anyone</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Clinic link copied." style={S.more}>Copy the booking link</Tap>
          <Tap say="New message to 29 families." style={S.primary}>Message booked families</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <section aria-label="Bookings" style={{ ...S.tile, gridColumn: 'span 8', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Bookings</h2>
            <span style={S.cap}>31 of 40 places</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>14</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Ages 6 to 8</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Mon to Wed · 9:00 to 12:00</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: '88%', background: '#2f6252' }} />
              </span>
              <strong style={{ ...S.num, whiteSpace: 'nowrap' }}>14 of 16</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>17</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Ages 9 to 12</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Mon to Wed · 9:00 to 12:00</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: '71%', background: '#2f6252' }} />
              </span>
              <strong style={{ ...S.num, whiteSpace: 'nowrap' }}>17 of 24</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 66, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 36, height: 36, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>12</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>New to the academy</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>12 of the 31 have never trained with you</span>
            </span>
            <Tap say="After the clinic, these 12 families get a trial invite." style={S.more}>Invite to a trial</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Clinic families pay when they book. A place can be cancelled for a full refund up to 7 days before.</span>
        </section>
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section aria-label="Takings" style={{ ...S.tile, background: '#f3ecdf', flex: 'none', gap: 2 }}>
            <span style={S.label}>Taken so far</span>
            <span style={{ ...S.num, fontSize: 30, lineHeight: '36px', fontWeight: 700 }}>$5,580</span>
            <span style={S.cap}>31 places at $180</span>
          </section>
          <section aria-label="Each day" style={{ ...S.tile, flexGrow: 1, gap: 0, padding: '14px 18px 10px' }}>
            <h2 style={S.h2}>Each day</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>S</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Sign in and out</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>A named adult collects each child</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>H</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Hot day plan</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Follows the heat rule, with shade breaks</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>F</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>First-aid cards</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Allergies and who to call</span>
              </span>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
