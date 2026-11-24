// AC6-AcademyCoaches: Academy owner, coaches.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AC6AcademyCoaches() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Coaches</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>4 coaches · 15 sessions this week</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="AD23-AddCoach" style={S.primary}>+ Invite a coach</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'repeat(12, minmax(0,1fr))' }}>
        <section aria-label="Coaches and checks" style={{ ...S.tile, gridColumn: 'span 8', gap: 0, padding: '14px 18px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Coaches and checks</h2>
            <span style={S.cap}>Working with Children Check</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 70, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>DO</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>
                {'Dani Okafor · '}
                <span style={{ fontWeight: 400 }}>Owner and head coach · B licence</span>
              </span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>One-on-ones · 4 this week</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Valid to Mar 2029</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 70, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>RW</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>
                {'Reece Whitlam · '}
                <span style={{ fontWeight: 400 }}>Coach · C licence</span>
              </span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Development, Advanced · 5 sessions</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Valid to Nov 2027</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 70, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>SM</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>
                {'Sofia Marin · '}
                <span style={{ fontWeight: 400 }}>Coach · C licence</span>
              </span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Foundation, Advanced · 4 sessions</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Valid to Aug 2028</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 70, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 40, height: 40, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>BC</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>
                {'Ben Castellano · '}
                <span style={{ fontWeight: 400 }}>Assistant coach · studying</span>
              </span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Foundation · 2 sessions</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>Runs out 30 Jun</span>
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A coach with no valid children check can’t open a session or see a player. Ben has been reminded.</span>
        </section>
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section aria-label="Session notes" style={{ ...S.tile, flex: 'none', gap: 0, padding: '14px 18px 10px' }}>
            <h2 style={S.h2}>Session notes written</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>RW</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Reece</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>5 of 5 sessions</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>All done</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>SM</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Sofia</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>3 of 4 sessions</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>1 to do</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 52, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>BC</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Ben</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>2 of 2 sessions</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>All done</span>
            </div>
          </section>
          <section aria-label="Why notes matter" style={{ ...S.tile, flexGrow: 1 }}>
            <h2 style={S.h2}>Why notes matter</h2>
            <span style={S.cap}>Each note is two taps per player. At the end of term they become the progress report, so nobody writes 80 reports from memory.</span>
            <Tap to="AC7-ReportsOut" style={{ ...S.more, marginTop: 'auto' }}>See term reports</Tap>
          </section>
        </div>
      </main>
    </>
  )
}
