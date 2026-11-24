// AD21-RatesCosts: Academy owner: what a coach is paid for a session and what half a pitch costs for a term, which Roster and pay,
// What each program earns and every team's "what this team earns" are worked out from.
// An INPUT that writes to the store (programs v2, 24 Nov): Save calls `setRates`, and those screens change with it.
// The older board listed three coaches at three rates. The academy now pays every coach one rate a team session ($150 in the sample),
// so this form has that one number. The one-on-one rate is still a sample value: one-on-ones are not in the list of players.
import { useContext, useState } from 'react'
import { S } from './adStyles'
import Tap from './Tap'
import { Step } from './formKit'
import { OwnerGo } from './ownerMenu'
import { demoToast } from '../demoToast'
import { SESSIONS_A_TERM, money, programCounts, setRates, useAcademy } from './academyStore'

const row = { display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 10, alignItems: 'center', minHeight: 60, borderTop: '1px solid #e9eae8', fontSize: 14, lineHeight: '19px', color: '#10211f', boxSizing: 'content-box' } as const
const WHERE: [string, string][] = [['Roster and pay', 'Sessions run, at this rate'], ['What each program earns', 'Fees less coaches and pitch'], ['Every team’s page', 'What this team earns'], ['From next fortnight', 'A new rate never changes the past']]

export default function AD21RatesCosts() {
  const a = useAcademy(), go = useContext(OwnerGo), all = programCounts(a), teams = a.groups.length
  const [rate, setRate] = useState(a.coach_rate_a_session), [pitch, setPitch] = useState(a.half_pitch_a_term)
  const coaches = teams * SESSIONS_A_TERM * rate, hire = teams * pitch, changed = rate !== a.coach_rate_a_session || pitch !== a.half_pitch_a_term
  function save() {
    setRates(rate, pitch)
    demoToast(changed ? `Saved. A team session pays ${money(rate)} and half a pitch is ${money(pitch)} a term. Pay and program money have moved.` : 'Nothing changed.')
    go('AD9-RosterPay')
  }
  return (
    <>
      <div style={{ flex: 'none', padding: '14px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: 26, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Rates and costs</h1>
          <span style={{ ...S.cap, whiteSpace: 'nowrap' }}>What you pay coaches, and what you pay for the pitch</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <Tap to="AD9-RosterPay" style={S.more}>Cancel</Tap>
          <button type="button" onClick={save} style={{ ...S.primary, fontFamily: 'inherit', cursor: 'pointer' }}>Save</button>
        </div>
      </div>
      <main style={{ flexGrow: 1, minHeight: 0, padding: '12px 28px 18px', boxSizing: 'border-box', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(0,1fr) 340px' }}>
        <section aria-label="Coaches, per session" style={{ ...S.tile, gap: 14 }}>
          <h2 style={S.h2}>Coaches, per session</h2>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 10, alignItems: 'end', paddingBottom: 6 }}>
              <span style={S.th}>Who</span>
              <span style={S.th}>Team session</span>
              <span style={S.th}>One-on-one</span>
            </div>
            <div style={row}>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: 15 }}>Every coach</strong>
                <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{teams} coaches, one for each team, on one rate</span>
              </span>
              <Step start={money(a.coach_rate_a_session)} what="every coach, team session" onChange={setRate} />
              <Step start="$50" what="every coach, one-on-one" />
            </div>
          </div>
          <h2 style={S.h2}>Pitch hire, for a term</h2>
          <div style={{ ...row, borderTop: '1px solid #e9eae8' }}>
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: 15 }}>Messmate Primary School</strong>
              <span style={{ fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>Half a pitch for each team</span>
            </span>
            <Step start={money(a.half_pitch_a_term)} size={50} what="half a pitch for a term" onChange={setPitch} />
            <span style={{ color: '#4a5a57' }}>Three pitches, used as six halves</span>
          </div>
          {/* What these two numbers come to, counted from the teams and the fees billed. It moves as the steppers are pressed; nothing is saved until Save. */}
          <div aria-live="polite" style={{ borderRadius: 12, background: '#eef5f2', padding: '10px 12px', fontSize: 14, lineHeight: '20px', color: '#10211f' }}>
            <strong>This term, at these rates:</strong> coaches {money(coaches)} ({teams} teams × {SESSIONS_A_TERM} sessions × {money(rate)}), pitch hire {money(hire)}. Of {money(all.billed)} fees billed, {money(all.billed - coaches - hire)} is left over.{changed ? ' Not saved yet.' : ''}
          </div>
          <span style={{ ...S.cap, marginTop: 'auto' }}>A team session steps $5 at a time, half a pitch $50 at a time.</span>
        </section>
        <aside aria-label="Where these go" style={{ ...S.tile, gap: 2 }}>
          <h2 style={S.h2}>Where these go</h2>
          {WHERE.map(([t, sub], i) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 54, borderTop: '1px solid #e9eae8', boxSizing: 'content-box' }}>
              <span style={{ flex: 'none', width: 30, height: 30, borderRadius: 999, background: '#eef5f2', color: '#10211f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
              <span style={{ flexGrow: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 15, lineHeight: '21px', fontWeight: 700 }}>{t}</span>
                <span style={{ display: 'block', fontSize: 13, lineHeight: '18px', color: '#4a5a57' }}>{sub}</span>
              </span>
            </div>
          ))}
          <span style={{ ...S.cap, marginTop: 'auto', paddingTop: 8 }}>These are your numbers. Tax, super and the award are yours and your accountant’s to check. A coach sees only their own rate.</span>
        </aside>
      </main>
    </>
  )
}
