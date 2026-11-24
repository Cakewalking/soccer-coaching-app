// AD17-Checks: Academy owner: each coach’s Working with Children Check, whether it has been checked and connected to the academy, the child safety training, and what to do next.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'

export default function AD17Checks() {
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Children checks</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>Working with Children Check · 4 coaches and 1 starting</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="AD23-AddCoach" style={S.primary}>Add a coach</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 330px' }}>
        <section aria-label="Your coaches" style={{ ...S.tile, gap: 0, padding: '14px 18px 10px', gridColumn: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Your coaches</h2>
            <span style={S.cap}>Checked again every month</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.1fr 1fr 0.9fr', gap: 10, alignItems: 'end', paddingBottom: 6 }}>
            <span style={S.th}>Coach</span>
            <span style={S.th}>Status checked</span>
            <span style={S.th}>Connected to you</span>
            <span style={S.th}>Safety training</span>
            <span style={S.th}>Runs out</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.1fr 1fr 0.9fr', gap: 10, alignItems: 'center', minHeight: 68, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>DO</span>
              Dani Okafor
            </span>
            <span>Checked 2 June</span>
            <span>Connected</span>
            <span>Done</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Mar 2029</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.1fr 1fr 0.9fr', gap: 10, alignItems: 'center', minHeight: 68, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>RW</span>
              Reece Whitlam
            </span>
            <span>Checked 2 June</span>
            <span>Connected</span>
            <span>Done</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Nov 2027</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.1fr 1fr 0.9fr', gap: 10, alignItems: 'center', minHeight: 68, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>SM</span>
              Sofia Marin
            </span>
            <span>Checked 2 June</span>
            <span>Connected</span>
            <span>Done</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Aug 2028</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.1fr 1fr 0.9fr', gap: 10, alignItems: 'center', minHeight: 68, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>BC</span>
              Ben Castellano
            </span>
            <span>Checked 2 June</span>
            <span>Connected</span>
            <span>Needed to renew</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#c39797', color: '#10211f', boxSizing: 'content-box' }}>30 June</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.1fr 1fr 0.9fr', gap: 10, alignItems: 'center', minHeight: 68, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 700 }}>
              <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#e8cfcf', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>MF</span>
              Mia Farrow · starts 15 June
            </span>
            <span>Not checked</span>
            <span>Not connected</span>
            <span>Not known</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e9eae8', color: '#10211f', boxSizing: 'content-box' }}>Not known</span>
          </div>
          <div style={{ borderRadius: 12, background: '#f4e6e6', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>
            <strong>Ben’s check runs out on 30 June.</strong>
            {' To renew, he has to finish the online child safety training first. He has been reminded twice. '}
            <Tap say="A message to Ben opens, with the link to renew.">Message Ben</Tap>
          </div>
          <div style={{ borderRadius: 12, background: '#eef5f2', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>
            <strong>Mia starts on 15 June.</strong>
            {' Check her status before her first session, then connect her within 7 days of starting.'}
          </div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>A coach who is not checked and connected can’t open a session or see a player. Clean Sheet keeps your record and reminds you. The checking and connecting are done by you, in the government’s own service.</span>
        </section>
        <aside aria-label="What Victoria asks" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>What Victoria asks of you</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Check</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Look up the person’s status before they start</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Connect</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Link them to your academy: 7 days for paid coaches, 21 for volunteers</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Keep a record</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Who, card number, and when you checked</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ flexGrow: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Act on a change</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>You are told if a status changes</span>
            </span>
          </div>
          <div style={{ borderRadius: 12, background: '#eef5f2', padding: '10px 12px', fontSize: 14, lineHeight: '20px' }}>In force in Victoria from 19 October 2026, for every organisation and sole trader working with children. Other states differ: this page follows the state you set.</div>
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>This is a summary, not legal advice. The regulator’s own pages are linked from each step.</span>
        </aside>
      </main>
    </>
  )
}
