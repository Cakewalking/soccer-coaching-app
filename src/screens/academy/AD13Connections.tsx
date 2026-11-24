// AD13-Connections: Academy owner: what Clean Sheet is joined to, what each connection brings in or sends out, and what is not set up.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD13Connections() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Connections</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>What Clean Sheet brings in, and what it sends out</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="Choose the file. You match the columns once, then check before anything is saved." style={S.primary}>Bring in a spreadsheet</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 320px' }}>
        <section aria-label="Joined up" style={{ ...S.tile, gap: 0, padding: '14px 18px 10px', gridColumn: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Joined up</h2>
            <span style={S.cap}>5 of 7 on</span>
          </div>
          <Tap say="Players and families: settings open." style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) 84px', gap: 12, alignItems: 'center', minHeight: 68, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Players and families</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Bring in a spreadsheet from what you use now</span>
            </span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>80 players brought in · 3 need a look</span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>On</span>
            </span>
          </Tap>
          <Tap say="Payments: settings open." style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) 84px', gap: 12, alignItems: 'center', minHeight: 68, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Payments</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Cards and payment plans through your payment provider</span>
            </span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Pays into your account every 2 days</span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>On</span>
            </span>
          </Tap>
          <Tap say="Your accountant: settings open." style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) 84px', gap: 12, alignItems: 'center', minHeight: 68, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Your accountant</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>A file each month, in the layout accounting tools read</span>
            </span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Last sent 1 June</span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>On</span>
            </span>
          </Tap>
          <Tap say="Calendars: settings open." style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) 84px', gap: 12, alignItems: 'center', minHeight: 68, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Calendars</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Sessions show in coaches’ and families’ own calendars</span>
            </span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>61 families have added it</span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>On</span>
            </span>
          </Tap>
          <Tap say="Film: settings open." style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) 84px', gap: 12, alignItems: 'center', minHeight: 68, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Film</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>A phone, a tablet, or a camera that follows the play</span>
            </span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>2 cameras paired · tablet filming on</span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>On</span>
            </span>
          </Tap>
          <Tap say="Vests that track running: settings open." style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) 84px', gap: 12, alignItems: 'center', minHeight: 68, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Vests that track running</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Distance and sprints for older groups</span>
            </span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Not set up</span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e9eae8', color: '#10211f', boxSizing: 'content-box' }}>Set up</span>
            </span>
          </Tap>
          <Tap say="Your website: settings open." style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) 84px', gap: 12, alignItems: 'center', minHeight: 68, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Your website</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>The trial link and this term’s timetable, on your own site</span>
            </span>
            <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Trial link in use · timetable not added</span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>Add</span>
            </span>
          </Tap>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section aria-label="Partner club" style={{ ...S.tile, gap: 6 }}>
            <h2 style={S.h2}>Partner club</h2>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Wattle Creek FC</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>16 players in U13 Timber · squads and game film shared</span>
            </span>
            <Tap to="AC11-PartnerClub" style={{ ...S.more, alignSelf: 'flex-start' }}>Open</Tap>
          </section>
          <section aria-label="Your data" style={{ ...S.tile, gap: 8, flexGrow: 1 }}>
            <h2 style={S.h2}>Your data stays yours</h2>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>Everything you bring in can be taken out again as a spreadsheet, at any time.</span>
            <Tap say="Everything is on its way to your email: players, attendance, notes, reports and fees." style={{ ...S.more, alignSelf: 'flex-start' }}>Take everything out</Tap>
            <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A connection never shares a child’s file with anyone outside your academy. Only a parent can send that.</span>
          </section>
        </div>
      </main>
    </>
  )
}
