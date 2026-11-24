// ACC3-TrialAssess, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  label: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a4b5b" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACC3TrialAssess({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC3-TrialAssess" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="today" sub="Trial player" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Trial · Arjun Mehta, 10</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>In Development today · 4 taps, then send</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ACC1-CoachToday")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Not today</button>
          <button onClick={() => demoToast("Sent. Dani can make Arjun’s family an offer tonight.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Send to Dani</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "repeat(12, minmax(0,1fr))" }}>
        <section aria-label="What you saw" style={{ ...C.tile, gridColumn: "span 8", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>What you saw</h2>
            <span style={{ ...C.cap }}>For his age</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "84px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "16px", lineHeight: "22px", fontWeight: "700" }}>Running with the ball</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Keeps the ball close with both feet</span>
            </span>
            <span role="radiogroup" aria-label="Running with the ball" style={{ display: "flex", gap: "6px" }}>
              <button aria-checked="false" onClick={() => demoToast("Ball mastery: Starting out.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", minWidth: "104px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Starting out</button>
              <button aria-checked="false" onClick={() => demoToast("Ball mastery: Getting there.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", minWidth: "104px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Getting there</button>
              <button aria-checked="true" onClick={() => demoToast("Ball mastery: Strong.")} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", minWidth: "104px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", background: "#2f6252", color: "#ffffff" }}>Strong</button>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "84px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "16px", lineHeight: "22px", fontWeight: "700" }}>First touch</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Sets the ball where they want it</span>
            </span>
            <span role="radiogroup" aria-label="First touch" style={{ display: "flex", gap: "6px" }}>
              <button aria-checked="false" onClick={() => demoToast("First touch: Starting out.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", minWidth: "104px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Starting out</button>
              <button aria-checked="true" onClick={() => demoToast("First touch: Getting there.")} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", minWidth: "104px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", background: "#2f6252", color: "#ffffff" }}>Getting there</button>
              <button aria-checked="false" onClick={() => demoToast("First touch: Strong.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", minWidth: "104px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Strong</button>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "84px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "16px", lineHeight: "22px", fontWeight: "700" }}>One against one</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Takes a player on, or stops one</span>
            </span>
            <span role="radiogroup" aria-label="One against one" style={{ display: "flex", gap: "6px" }}>
              <button aria-checked="false" onClick={() => demoToast("One against one: Starting out.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", minWidth: "104px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Starting out</button>
              <button aria-checked="false" onClick={() => demoToast("One against one: Getting there.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", minWidth: "104px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Getting there</button>
              <button aria-checked="true" onClick={() => demoToast("One against one: Strong.")} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", minWidth: "104px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", background: "#2f6252", color: "#ffffff" }}>Strong</button>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "84px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "16px", lineHeight: "22px", fontWeight: "700" }}>Striking the ball</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Finds a teammate, right weight</span>
            </span>
            <span role="radiogroup" aria-label="Striking the ball" style={{ display: "flex", gap: "6px" }}>
              <button aria-checked="false" onClick={() => demoToast("Passing: Starting out.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", minWidth: "104px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Starting out</button>
              <button aria-checked="true" onClick={() => demoToast("Passing: Getting there.")} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", minWidth: "104px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", background: "#2f6252", color: "#ffffff" }}>Getting there</button>
              <button aria-checked="false" onClick={() => demoToast("Passing: Strong.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", minWidth: "104px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Strong</button>
            </span>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>These four go into his first plan if he joins. They’re never shown as a score.</span>
        </section>
        <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: "14px", minHeight: "0" }}>
          <section aria-label="Suggested group" style={{ ...C.tile, background: "#f3ecdf", flex: "none", gap: "8px", border: "2px solid #2f6252" }}>
            <span style={{ ...C.label }}>Suggested group</span>
            <span style={{ fontSize: "22px", lineHeight: "28px", fontWeight: "700" }}>Development</span>
            <span style={{ ...C.cap }}>Tue and Thu 4:30 · 2 places open. He’d fit in comfortably and be stretched on first touch.</span>
            <button onClick={() => demoToast("Changed to Advanced. Dani will see your reason.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Suggest another group</button>
          </section>
          <section aria-label="A line for the family" style={{ ...C.tile, flexGrow: "1", gap: "8px" }}>
            <h2 style={{ ...C.h2 }}>A line for the family</h2>
            <div style={{ border: "1px solid #c5c8c4", borderRadius: "12px", padding: "10px 12px", fontSize: "15px", lineHeight: "22px", background: "#ffffff" }}>Arjun loved taking players on and never hid from the ball. We’d work on his first touch.</div>
            <span style={{ ...C.cap, marginTop: "auto" }}>Written for you from your taps. Change any word.</span>
          </section>
        </div>
      </main>
    </div>
  )
}
