// ACC9-AcademyRecordDrill, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACC9AcademyRecordDrill({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC9-AcademyRecordDrill" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="record" sub="Record" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Record a drill</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Finishing circuit · Advanced, 12 to 14 · third on tonight’s plan</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("DrillFlow")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Pick another drill</button>
          <button onClick={() => go("ACC11-AcademyRecording")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Start recording</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "repeat(12, minmax(0,1fr))" }}>
        <section aria-label="The set-up" style={{ ...C.tile, gridColumn: "span 7", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>The set-up</h2>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Same as last time</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "110px", fontSize: "14px", color: "#4a5a57" }}>Players</span>
            <strong style={{ flexGrow: "1", fontSize: "15px", lineHeight: "21px" }}>20 · three groups</strong>
            <button onClick={() => demoToast("Change players.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", color: "#2f6252", flex: "none", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>Change</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "110px", fontSize: "14px", color: "#4a5a57" }}>Area</span>
            <strong style={{ flexGrow: "1", fontSize: "15px", lineHeight: "21px" }}>Penalty box, with three stations</strong>
            <button onClick={() => demoToast("Change area.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", color: "#2f6252", flex: "none", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>Change</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "110px", fontSize: "14px", color: "#4a5a57" }}>Rounds</span>
            <strong style={{ flexGrow: "1", fontSize: "15px", lineHeight: "21px" }}>3 rounds of 5 minutes</strong>
            <button onClick={() => demoToast("Change rounds.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", color: "#2f6252", flex: "none", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>Change</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "110px", fontSize: "14px", color: "#4a5a57" }}>Rule</span>
            <strong style={{ flexGrow: "1", fontSize: "15px", lineHeight: "21px" }}>Weaker foot only at station 2</strong>
            <button onClick={() => demoToast("Change rule.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", color: "#2f6252", flex: "none", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>Change</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "110px", fontSize: "14px", color: "#4a5a57" }}>Camera</span>
            <strong style={{ flexGrow: "1", fontSize: "15px", lineHeight: "21px" }}>Behind the goal, with all three stations in view</strong>
            <button onClick={() => demoToast("Camera view looks good. All three stations are in shot.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", color: "#2f6252", flex: "none", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>Check view</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "110px", fontSize: "14px", color: "#4a5a57" }}>Sensors</span>
            <strong style={{ flexGrow: "1", fontSize: "15px", lineHeight: "21px" }}>Boots on 19</strong>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>This set-up is saved with the drill, so the next run is a fair comparison.</span>
        </section>
        <section aria-label="What we’ll measure" style={{ ...C.tile, gridColumn: "span 5", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>What we’ll measure</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Weaker-foot shots on target</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Share that hit the target</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "22px", padding: "0 8px", borderRadius: "6px", background: "#e9eae8", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" }}>Camera</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Shots per player</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>So everyone gets enough goes</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "22px", padding: "0 8px", borderRadius: "6px", background: "#e9eae8", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" }}>Camera</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Weaker-foot touches</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Share of touches on the weaker foot</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "22px", padding: "0 8px", borderRadius: "6px", background: "#e9eae8", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" }}>Boot sensors</span>
          </div>
          <button onClick={() => demoToast("Add a count you tap by hand, such as “first-time finishes”.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, marginTop: "10px", alignSelf: "flex-start" }}>+ Count something by hand</button>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Last run: Thu 21 May, run 2. Six players have this as their term goal.</span>
        </section>
      </main>
    </div>
  )
}
