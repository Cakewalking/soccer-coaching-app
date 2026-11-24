// ACC2-RunSession, as the academy pack draws it: the board's own words, sizes and colours.
// Programs v2: "Who's here" is the roll for today's session, for the coach's whole team from the academy's one list.
// Each tap is written to that list (markRoll), so the player's file, the team page and the home change with it.
// Hand-wired to the list: do not make it again from the board's source.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { markRoll } from '../../academy/academyStore'
import { COACH_GROUP, firstName, ini, longDate, todayMark, useCoachTeam } from '../coachTeam'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  num: { fontVariantNumeric: "tabular-nums" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACC2RunSession({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { a, g, ps } = useCoachTeam()
  const marks = ps.map(p => todayMark(a, g, p)), here = marks.filter(m => m === true).length, away = marks.filter(m => m === false).length, unmarked = marks.length - here - away
  return (
    <div data-board="ACC2-RunSession" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="today" sub="Run a session" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{g.name} · {g.ages.toLowerCase()}</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>{longDate(a.today).split(' ')[0]} {g.when.split(' · ')[1]} · finishing with the weaker foot</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("DrillFlow")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Swap a drill</button>
          <button onClick={() => go("ADC11-AfterSession")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Finish and write notes</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "repeat(12, minmax(0,1fr))" }}>
        <section aria-label="Who’s here" style={{ ...C.tile, gridColumn: "span 5", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2, whiteSpace: "nowrap" }}>Who’s here</h2>
            {unmarked > 0 && <button onClick={() => { ps.filter(p => todayMark(a, g, p) === null).forEach(p => markRoll(COACH_GROUP, a.today, p.id, true)); demoToast(`${unmarked} marked here.`) }} style={{ border: "0", padding: "0", margin: "-12px 0 -12px auto", background: "transparent", font: "inherit", cursor: "pointer", color: "#2f6252", fontSize: "14px", fontWeight: "700", textDecoration: "underline", minHeight: "44px", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>Mark the rest here</button>}
            <span data-roll-count="" style={{ ...C.cap, whiteSpace: "nowrap" }}>{here} here · {away} away{unmarked ? ` · ${unmarked} to mark` : ''}</span>
          </div>
          {ps.map(p => {
            const mark = todayMark(a, g, p), f = firstName(p)
            return (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>{ini(p)}</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>{p.name}</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>{p.goal ? `Goal: ${p.goal}` : 'No goal yet'}</span>
            </span>
            {/* The roll for today's session. Each tap is written to the academy's list: not marked, then here, then away. */}
            <button data-roll={p.id} data-mark={mark === null ? 'none' : mark ? 'here' : 'away'} aria-label={`${p.name}: ${mark === null ? 'not marked. Mark here' : mark ? 'here. Mark away' : 'away. Mark here'}`} onClick={() => { markRoll(COACH_GROUP, a.today, p.id, mark === null ? true : !mark); demoToast(`${f} marked ${mark === true ? 'away' : 'here'}.`) }} style={{ padding: "0 10px", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", minWidth: "68px", height: "44px", borderRadius: "10px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", ...(mark === null ? { border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" } : mark ? { border: "0", background: "#2f6252", color: "#ffffff" } : { border: "0", background: "#e8cfcf", color: "#10211f" }) }}>{mark === null ? 'Mark here' : mark ? 'Here' : 'Away'}</button>
          </div>
            )
          })}
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>All {ps.length} of {g.name}, in name order. Each player’s goal sits under their name so you can coach it in passing. The roll goes onto each player’s file and the team’s attendance.</span>
        </section>
        <section aria-label="The plan" style={{ ...C.tile, gridColumn: "span 7", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>The plan</h2>
            <button onClick={() => demoToast("Filming on. Only players whose parents agreed appear in clips.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", color: "#2f6252", fontSize: "14px", fontWeight: "600", textDecoration: "none", minHeight: "44px", display: "flex", alignItems: "center" }}>Film this drill</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "74px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ ...C.num, flex: "none", width: "48px", fontSize: "15px", fontWeight: "700" }}>5:45</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "16px", lineHeight: "22px", fontWeight: "700" }}>Ball each · both feet</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>10 min · done</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e9eae8", color: "#10211f" }}>Done</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "74px", borderTop: "1px solid #e9eae8", background: "#eef5f2", margin: "0 -10px", padding: "0 10px", borderRadius: "12px" }}>
            <span style={{ ...C.num, flex: "none", width: "48px", fontSize: "15px", fontWeight: "700" }}>5:55</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "16px", lineHeight: "22px", fontWeight: "700" }}>2v1 to a small goal · finish weaker foot</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>20 min · running now, 12 minutes left</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Now</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "74px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ ...C.num, flex: "none", width: "48px", fontSize: "15px", fontWeight: "700" }}>6:15</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "16px", lineHeight: "22px", fontWeight: "700" }}>Finishing circuit · three stations</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>15 min</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "74px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ ...C.num, flex: "none", width: "48px", fontSize: "15px", fontWeight: "700" }}>6:30</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "16px", lineHeight: "22px", fontWeight: "700" }}>4v4 · a weaker-foot goal counts double</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>20 min</span>
            </span>
          </div>
          <div style={{ marginTop: "10px", background: "#faf5ec", borderRadius: "12px", padding: "10px 12px", fontSize: "14px", lineHeight: "20px" }}>
            <strong>Say this:</strong>
            {" “Open your hips, lock the ankle, and pick your corner before you strike.”"}
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Zane sits out the sprint finish at the last station. He has had a big week with his club.</span>
        </section>
      </main>
    </div>
  )
}
