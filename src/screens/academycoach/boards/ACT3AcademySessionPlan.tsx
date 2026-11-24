// ACT3-AcademySessionPlan, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  num: { fontVariantNumeric: "tabular-nums" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACT3AcademySessionPlan({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACT3-AcademySessionPlan" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="training" sub="Session plan" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Tuesday · Advanced</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>2 June, 4:30 pm · Messmate Primary School, pitch 1 · 60 minutes</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => demoToast("Plan summary sent to 11 families: time, place, what to bring.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Send to families</button>
          <button onClick={() => go("ACC2-RunSession")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Run it</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 340px" }}>
        <section aria-label="Plan" style={{ ...C.tile, gap: "0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>Receiving on the half-turn</h2>
            <span style={{ ...C.cap }}>4 parts · 11 players · 2 coaches</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "56px minmax(0,1fr) auto", gap: "12px", alignItems: "center", minHeight: "68px", borderTop: "1px solid #e9eae8" }}>
            <strong style={{ ...C.num, fontSize: "15px" }}>4:30</strong>
            <span>
              <strong style={{ display: "block", fontSize: "15px" }}>Arrival game: tag with a ball</strong>
              <span style={{ ...C.cap }}>8 minutes · everyone moving, no queue</span>
            </span>
            <button onClick={() => demoToast("Three other drills for this slot, with reasons.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Swap</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "56px minmax(0,1fr) auto", gap: "12px", alignItems: "center", minHeight: "68px", borderTop: "1px solid #e9eae8" }}>
            <strong style={{ ...C.num, fontSize: "15px" }}>4:38</strong>
            <span>
              <strong style={{ display: "block", fontSize: "15px" }}>Open body, in pairs</strong>
              <span style={{ ...C.cap }}>12 minutes · check a shoulder, receive side-on</span>
            </span>
            <button onClick={() => demoToast("Three other drills for this slot, with reasons.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Swap</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "56px minmax(0,1fr) auto", gap: "12px", alignItems: "center", minHeight: "68px", borderTop: "1px solid #e9eae8" }}>
            <strong style={{ ...C.num, fontSize: "15px" }}>4:50</strong>
            <span>
              <strong style={{ display: "block", fontSize: "15px" }}>Rondo with a bounce player</strong>
              <span style={{ ...C.cap }}>15 minutes · groups of 5 and 6</span>
            </span>
            <button onClick={() => demoToast("Three other drills for this slot, with reasons.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Swap</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "56px minmax(0,1fr) auto", gap: "12px", alignItems: "center", minHeight: "68px", borderTop: "1px solid #e9eae8" }}>
            <strong style={{ ...C.num, fontSize: "15px" }}>5:05</strong>
            <span>
              <strong style={{ display: "block", fontSize: "15px" }}>4 v 4 through the middle</strong>
              <span style={{ ...C.cap }}>20 minutes · a goal only counts after a half-turn</span>
            </span>
            <button onClick={() => demoToast("Three other drills for this slot, with reasons.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Swap</button>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>5 minutes at the end for water and one question: “what did you try today?”</span>
        </section>
        <aside style={{ display: "flex", flexDirection: "column", gap: "14px", minHeight: "0" }}>
          <section aria-label="One thing each" style={{ ...C.tile, flex: "none", gap: "6px", border: "2px solid #2f6252" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ ...C.h2 }}>One thing each</h2>
              <button onClick={() => go("ACC4-PlayerPlan")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", color: "#2f6252", fontSize: "14px", fontWeight: "700", textDecoration: "none", minHeight: "44px", display: "flex", alignItems: "center" }}>All 11</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "50px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>KO</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Kai Okonkwo</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Left foot when the right is blocked</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "50px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>BN</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Billie Nguyen</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Check a shoulder before it arrives</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "50px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>AM</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Arjun Mehta</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>First touch forward</span>
              </span>
            </div>
            <span style={{ ...C.cap }}>From each player’s plan. 8 more in the list.</span>
          </section>
          <section aria-label="You need" style={{ ...C.tile, flex: "none", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ ...C.h2 }}>You need</h2>
            </div>
            <span style={{ ...C.cap }}>11 balls, 20 cones, 3 sets of bibs, 4 small goals.</span>
          </section>
          <section aria-label="Open view" style={{ ...C.tile, flex: "1 1 0", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ ...C.h2 }}>Open view</h2>
            </div>
            <span style={{ ...C.cap }}>Pitch 1 is in view of the school office. Two coaches on site: you and Mel.</span>
          </section>
        </aside>
      </main>
    </div>
  )
}
