// AC2-Programs: Academy owner, programs.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AC2Programs() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Programs</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Term 2 · 20 April to 26 June · 10 weeks</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Term 3 set up with the same groups. Families are asked to re-enrol." style={S.more}>Copy to Term 3</Tap>
          <Tap to="AD20-NewProgram" style={S.primary}>+ New program</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <section aria-label="This term" style={{ ...S.tile, gridColumn: 'span 8', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>This term</h2>
            <span style={S.cap}>80 of 88 group places</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.5fr 1.1fr 1.7fr 0.9fr 80px', gap: 12, alignItems: 'center', paddingBottom: 8 }}>
            <span style={S.th}>Program</span>
            <span style={S.th}>When</span>
            <span style={S.th}>Coach</span>
            <span style={S.th}>Places</span>
            <span style={S.th}>Price</span>
            <span />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.5fr 1.1fr 1.7fr 0.9fr 80px', gap: 12, alignItems: 'center', minHeight: 66, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ display: 'block', fontSize: 15 }}>Foundation</strong>
              <span style={{ color: '#4a5a57' }}>Ages 5 to 8</span>
            </span>
            <span>Mon and Wed · 4:30 to 5:20</span>
            <span>Sofia Marin</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: '88%', background: '#2f6252' }} />
              </span>
              <strong style={{ ...S.num, whiteSpace: 'nowrap' }}>28 of 32</strong>
            </span>
            <span style={S.num}>$260 a term</span>
            <Tap to="AC4-AcademyPlayers" style={S.more}>Open</Tap>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.5fr 1.1fr 1.7fr 0.9fr 80px', gap: 12, alignItems: 'center', minHeight: 66, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ display: 'block', fontSize: 15 }}>Development</strong>
              <span style={{ color: '#4a5a57' }}>Ages 9 to 11</span>
            </span>
            <span>Tue and Thu · 4:30 to 5:25</span>
            <span>Reece Whitlam</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: '94%', background: '#2f6252' }} />
              </span>
              <strong style={{ ...S.num, whiteSpace: 'nowrap' }}>30 of 32</strong>
            </span>
            <span style={S.num}>$290 a term</span>
            <Tap to="AC4-AcademyPlayers" style={S.more}>Open</Tap>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.5fr 1.1fr 1.7fr 0.9fr 80px', gap: 12, alignItems: 'center', minHeight: 66, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ display: 'block', fontSize: 15 }}>Advanced</strong>
              <span style={{ color: '#4a5a57' }}>Ages 12 to 14</span>
            </span>
            <span>Tue and Thu · 5:30 to 6:40</span>
            <span>Reece and Sofia</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: '92%', background: '#2f6252' }} />
              </span>
              <strong style={{ ...S.num, whiteSpace: 'nowrap' }}>22 of 24</strong>
            </span>
            <span style={S.num}>$320 a term</span>
            <Tap to="AC4-AcademyPlayers" style={S.more}>Open</Tap>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.5fr 1.1fr 1.7fr 0.9fr 80px', gap: 12, alignItems: 'center', minHeight: 66, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', boxSizing: 'content-box' }}>
            <span>
              <strong style={{ display: 'block', fontSize: 15 }}>One-on-one</strong>
              <span style={{ color: '#4a5a57' }}>Any age</span>
            </span>
            <span>By booking · 45 minutes</span>
            <span>Dani, Reece</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: '75%', background: '#2f6252' }} />
              </span>
              <strong style={{ ...S.num, whiteSpace: 'nowrap' }}>6 of 8</strong>
            </span>
            <span style={S.num}>$90 a session</span>
            <Tap to="AC4-AcademyPlayers" style={S.more}>Open</Tap>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Families who join mid-term pay only for the weeks left. Brothers and sisters get 10% off.</span>
        </section>
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section aria-label="Waiting list" style={{ ...S.tile, flex: 'none', gap: 8 }}>
            <h2 style={S.h2}>Waiting list</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 58, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>5</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Advanced · 5 waiting</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>2 places open. Offer them?</span>
              </span>
              <Tap say="Places offered to the first 2 on the list." style={S.more}>Offer</Tap>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 50, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>0</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Other groups</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Nobody waiting</span>
              </span>
            </div>
          </section>
          <section aria-label="Holiday clinic" style={{ ...S.tile, flexGrow: 1, gap: 8 }}>
            <h2 style={S.h2}>July holiday clinic</h2>
            <span style={S.cap}>Mon 6 to Wed 8 July · ages 6 to 12 · $180</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 'none', width: 90, height: 8, borderRadius: 4, background: '#e9eae8', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: '78%', background: '#2f6252' }} />
              </span>
              <strong style={{ ...S.num, whiteSpace: 'nowrap' }}>31 of 40</strong>
            </span>
            <Tap to="AC9-HolidayClinic" style={{ ...S.more, marginTop: 'auto' }}>Open the clinic</Tap>
          </section>
        </div>
      </main>
    </>
  )
}
