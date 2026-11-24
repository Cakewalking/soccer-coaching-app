// AD16-SetUp: Academy owner: the first-week checklist, what is done, what is next, and what families see before you finish.
// Drawn from the board in the academy handover (24 Nov). The menus above it are the owner app's own (OwnerHeader).
import { S } from './adStyles'
import Tap from './Tap'
import { useAcademy } from './academyStore'

export default function AD16SetUp() {
  const players = useAcademy().players.length   // counted from the academy's list (programs v2)
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Set up Tall Timber Academy</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>2 of 7 done · about 40 minutes in all</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap say="A person from Clean Sheet will call you. Pick a time." style={S.more}>Ask for a hand</Tap>
          <Tap to="AD13-Connections" style={S.primary}>Carry on: bring in players</Tap>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 320px' }}>
        <section aria-label="Seven steps" style={{ ...S.tile, gap: 0, padding: '14px 18px 10px', gridColumn: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <h2 style={S.h2}>Seven steps</h2>
            <span style={S.cap}>In any order, except the last</span>
          </div>
          <Tap to="AC2-Programs" style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) 110px', gap: 12, alignItems: 'center', minHeight: 74, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#2f6252', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
            </span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Your terms and programs</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Term 2 · 3 programs and one-on-ones</span>
            </span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#2f6252', color: '#ffffff', boxSizing: 'content-box' }}>Done</span>
            </span>
          </Tap>
          <Tap to="AD13-Connections" style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) 110px', gap: 12, alignItems: 'center', minHeight: 74, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Bring in your players</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{players} players from your spreadsheet · 3 need a look</span>
            </span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>Look at 3</span>
            </span>
          </Tap>
          <Tap to="AC6-AcademyCoaches" style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) 110px', gap: 12, alignItems: 'center', minHeight: 74, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Invite your coaches</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>3 of 4 have joined · Ben hasn’t opened it</span>
            </span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>Remind Ben</span>
            </span>
          </Tap>
          <Tap to="AD17-Checks" style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) 110px', gap: 12, alignItems: 'center', minHeight: 74, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>4</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Children checks</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Checked and connected for 3 of 4 coaches</span>
            </span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e8cfcf', color: '#10211f', boxSizing: 'content-box' }}>Finish</span>
            </span>
          </Tap>
          <Tap to="AD13-Connections" style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) 110px', gap: 12, alignItems: 'center', minHeight: 74, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>5</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Take payments</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Not set up · families can’t pay in the app yet</span>
            </span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e9eae8', color: '#10211f', boxSizing: 'content-box' }}>Set up</span>
            </span>
          </Tap>
          <Tap to="AD7-HowWeCoach" style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) 110px', gap: 12, alignItems: 'center', minHeight: 74, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>6</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>How we coach</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Your session shape, rules and words</span>
            </span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e9eae8', color: '#10211f', boxSizing: 'content-box' }}>Write it</span>
            </span>
          </Tap>
          <Tap to="AC12-AcademyBroadcast" style={{ display: 'grid', gridTemplateColumns: '36px minmax(0,1fr) 110px', gap: 12, alignItems: 'center', minHeight: 74, borderTop: '1px solid #e9eae8', color: '#10211f', textDecoration: 'none', boxSizing: 'content-box' }}>
            <span style={{ flex: 'none', width: 32, height: 32, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>7</span>
            <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15, lineHeight: '20px' }}>Tell your families</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Send each family their link · 0 of 74 sent</span>
            </span>
            <span style={{ justifySelf: 'end' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: '#e9eae8', color: '#10211f', boxSizing: 'content-box' }}>Not yet</span>
            </span>
          </Tap>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <section aria-label="Before you finish" style={{ ...S.tile, gap: 6 }}>
            <h2 style={S.h2}>Before you finish</h2>
            <span style={{ fontSize: 14, lineHeight: '20px' }}>Coaches can already plan and run sessions. Families see nothing until you send their links.</span>
          </section>
          <section aria-label="Coming from somewhere else" style={{ ...S.tile, gap: 2, flexGrow: 1 }}>
            <h2 style={S.h2}>Coming from another system?</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>1</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Take your list out of it</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Any spreadsheet works</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>2</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Match the columns once</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Name, date of birth, parent, program</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>3</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>Check before it is saved</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Doubles and gaps are shown first</span>
              </span>
            </div>
            <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>Fees already paid this term can come in too, so nobody is billed twice.</span>
          </section>
        </div>
      </main>
    </>
  )
}
