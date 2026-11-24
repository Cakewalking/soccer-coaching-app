// AD9-RosterPay: Academy owner: sessions each coach ran this fortnight and what they are owed, ready for payroll.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD9RosterPay() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Roster and pay</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Fortnight · 25 May to 7 June · 30 sessions</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="AD21-RatesCosts" style={S.more}>Change a rate</Tap>
          <Tap say="The fortnight is on its way to your email as a spreadsheet." style={S.primary}>Download for payroll</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 320px' }}>
        <section aria-label="This fortnight" style={{ ...S.tile, gap: 0, padding: '14px 18px 10px', gridColumn: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>This fortnight</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.9fr 0.8fr 0.9fr 0.8fr 0.8fr', gap: 10, alignItems: 'end', paddingBottom: 6 }}>
            <span style={S.th}>Coach</span>
            <span style={S.th}>Group sessions</span>
            <span style={S.th} />
            <span style={S.th}>One-on-ones</span>
            <span style={S.th} />
            <span style={S.th}>Total</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.9fr 0.8fr 0.9fr 0.8fr 0.8fr', gap: 10, alignItems: 'center', minHeight: 78, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>RW</span>
              Reece Whitlam
            </span>
            <span>8 at $60</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$480</span>
            <span>2 at $50</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$100</span>
            <span>
              <strong style={{ ...S.num, fontSize: 16 }}>$580</strong>
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.9fr 0.8fr 0.9fr 0.8fr 0.8fr', gap: 10, alignItems: 'center', minHeight: 78, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>SM</span>
              Sofia Marin
            </span>
            <span>8 at $55</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$440</span>
            <span>None</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$0</span>
            <span>
              <strong style={{ ...S.num, fontSize: 16 }}>$440</strong>
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.9fr 0.8fr 0.9fr 0.8fr 0.8fr', gap: 10, alignItems: 'center', minHeight: 78, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>BC</span>
              Ben Castellano
            </span>
            <span>4 at $35</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$140</span>
            <span>None</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$0</span>
            <span>
              <strong style={{ ...S.num, fontSize: 16 }}>$140</strong>
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.9fr 0.8fr 0.9fr 0.8fr 0.8fr', gap: 10, alignItems: 'center', minHeight: 78, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>DO</span>
              You
            </span>
            <span>None</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$0</span>
            <span>8, not paid here</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$0</span>
            <span>
              <strong style={{ ...S.num, fontSize: 16 }}>$0</strong>
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.9fr 0.8fr 0.9fr 0.8fr 0.8fr', gap: 10, alignItems: 'center', minHeight: 60, fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', background: '#eef5f2', borderRadius: 10, padding: '0 10px', borderTop: 0, marginTop: 6, boxSizing: 'content-box' }}>
            <span>
              <strong style={{ fontSize: 15 }}>All coaches</strong>
            </span>
            <span>20 sessions</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$1,060</span>
            <span>2 sessions</span>
            <span style={{ ...S.num, fontWeight: 700 }}>$100</span>
            <span>
              <strong style={{ ...S.num, fontSize: 16 }}>$1,160</strong>
            </span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Counted from sessions that were opened and closed on the tablet. A session a coach covered is paid to the coach who ran it.</span>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section aria-label="Before you pay" style={{ ...S.tile, gap: 2 }}>
            <h2 style={S.h2}>Before you pay</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>All 30 sessions were closed</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Nothing left open</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 56, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#f4e6e6', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Sofia ran Ben’s Wednesday</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Moved to Sofia for you</span>
              </span>
              <Tap to="AD3-Timetable" style={S.more}>See</Tap>
            </div>
          </section>
          <section aria-label="What this is" style={{ ...S.tile, gap: 6, flexGrow: 1 }}>
            <h2 style={S.h2}>What this is, and isn’t</h2>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>Clean Sheet adds up sessions at the rates you set. It is not payroll: tax, super and the right award are yours and your accountant’s to check.</span>
            <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Coaches see only their own line.</span>
          </section>
        </div>
      </main>
    </>
  )
}
