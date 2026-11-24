// ACT2-AcademySuggested, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  card: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  num: { fontVariantNumeric: "tabular-nums" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACT2AcademySuggested({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACT2-AcademySuggested" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="training" sub="Suggested" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Suggested for Development</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Wednesday 3 June · 14 players · 60 minutes</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ASK3-AskOpen")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Ask in your own words</button>
          <button onClick={() => go("ACT3-AcademySessionPlan")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Build the whole session</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 320px" }}>
        <section style={{ display: "flex", flexDirection: "column", gap: "12px", minHeight: "0" }}>
          <div style={{ ...C.card, gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "baseline" }}>
              <strong style={{ fontSize: "16px" }}>Turn and go, in threes</strong>
              <span style={{ ...C.cap, ...C.num, flex: "none" }}>15 min</span>
            </div>
            <span style={{ fontSize: "14px", lineHeight: "20px" }}>
              <strong>Why:</strong>
              {" 9 of 14 scored under their target on the turning test in week 2."}
            </span>
            <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
              <button onClick={() => demoToast("Added to Wednesday. Open the plan to change the order.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Add to Wednesday</button>
              <button onClick={() => demoToast("The drill opens: set-up, three coaching points, and a 20-second video.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>See it</button>
              <button onClick={() => demoToast("Hidden. You won’t be shown this one again for this group.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Not this</button>
            </div>
          </div>
          <div style={{ ...C.card, gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "baseline" }}>
              <strong style={{ fontSize: "16px" }}>Rondo with a bounce player</strong>
              <span style={{ ...C.cap, ...C.num, flex: "none" }}>15 min</span>
            </div>
            <span style={{ fontSize: "14px", lineHeight: "20px" }}>
              <strong>Why:</strong>
              {" It builds on this fortnight’s theme, receiving on the half-turn, at Development level."}
            </span>
            <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
              <button onClick={() => demoToast("Added to Wednesday. Open the plan to change the order.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Add to Wednesday</button>
              <button onClick={() => demoToast("The drill opens: set-up, three coaching points, and a 20-second video.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>See it</button>
              <button onClick={() => demoToast("Hidden. You won’t be shown this one again for this group.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Not this</button>
            </div>
          </div>
          <div style={{ ...C.card, gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "baseline" }}>
              <strong style={{ fontSize: "16px" }}>3 v 3 to end zones</strong>
              <span style={{ ...C.cap, ...C.num, flex: "none" }}>20 min</span>
            </div>
            <span style={{ fontSize: "14px", lineHeight: "20px" }}>
              <strong>Why:</strong>
              {" Last week you noted “too much standing”. Everyone touches the ball every 20 seconds in this one."}
            </span>
            <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
              <button onClick={() => demoToast("Added to Wednesday. Open the plan to change the order.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Add to Wednesday</button>
              <button onClick={() => demoToast("The drill opens: set-up, three coaching points, and a 20-second video.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>See it</button>
              <button onClick={() => demoToast("Hidden. You won’t be shown this one again for this group.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Not this</button>
            </div>
          </div>
        </section>
        <aside style={{ display: "flex", flexDirection: "column", gap: "14px", minHeight: "0" }}>
          <section aria-label="What this uses" style={{ ...C.tile, flex: "1 1 0", gap: "6px", border: "2px solid #2f6252" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ ...C.h2 }}>What this uses</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "28px", height: "28px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Skills tests</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Each player against their own last result</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "28px", height: "28px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Your notes after sessions</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Three taps each time</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "28px", height: "28px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>The fortnight’s theme</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>From Dani</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "28px", height: "28px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>4</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>The curriculum for this age</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Skill Acquisition phase</span>
              </span>
            </div>
          </section>
        </aside>
      </main>
    </div>
  )
}
