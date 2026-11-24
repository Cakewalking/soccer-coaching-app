// ACC12-AcademySuggested, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
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

export default function ACC12AcademySuggested({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC12-AcademySuggested" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="training" sub="Suggested" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Suggested for tonight</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Advanced · from 3 recordings, your session notes and each player’s goal</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ACC1-CoachToday")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Back to today</button>
          <button onClick={() => demoToast("Tonight’s plan updated with both suggestions.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Use both</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "repeat(12, minmax(0,1fr))" }}>
        <div style={{ gridColumn: "span 7", display: "flex", flexDirection: "column", gap: "12px", minHeight: "0" }}>
          <section aria-label="Weaker-foot finishing is working: make it harder" style={{ ...C.tile, gap: "8px", padding: "14px 18px", border: "2px solid #2f6252" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
              <h2 style={{ ...C.h2, flexGrow: "1", fontSize: "18px" }}>Weaker-foot finishing is working: make it harder</h2>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Strong evidence</span>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              <span style={{ ...C.label, alignSelf: "center" }}>Based on</span>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "6px", background: "#e9eae8", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" }}>3 runs: 41% to 64% on target</span>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "6px", background: "#e9eae8", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" }}>Your notes</span>
            </div>
            <span style={{ fontSize: "14px", lineHeight: "20px" }}>The group is ready for pressure. Adding a defender keeps the same skill but makes them do it faster.</span>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#faf5ec", borderRadius: "12px", padding: "8px 12px" }}>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Finishing circuit, with a chasing defender</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Same stations · defender starts 3 metres behind</span>
              </span>
              <button onClick={() => demoToast("Added. The set-up is saved as a new series.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Add to tonight</button>
            </div>
          </section>
          <section aria-label="Six players still take the ball with their back to goal" style={{ ...C.tile, gap: "8px", padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</span>
              <h2 style={{ ...C.h2, flexGrow: "1", fontSize: "18px" }}>Six players still take the ball with their back to goal</h2>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#eef5f2", color: "#2f6252" }}>Good evidence</span>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              <span style={{ ...C.label, alignSelf: "center" }}>Based on</span>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "6px", background: "#e9eae8", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" }}>Session notes, 4 weeks</span>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "6px", background: "#e9eae8", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" }}>Clips</span>
            </div>
            <span style={{ fontSize: "14px", lineHeight: "20px" }}>They share the same gap, so one station fixes it for all six while the rest play.</span>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#faf5ec", borderRadius: "12px", padding: "8px 12px" }}>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Receive on the half turn, one station</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>8 minutes · Mila, Zane and four others</span>
              </span>
              <button onClick={() => demoToast("Added as station 3.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Add to tonight</button>
            </div>
          </section>
        </div>
        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "14px", minHeight: "0" }}>
          <section aria-label="For each player’s goal" style={{ ...C.tile, gridColumn: "span 12", gap: "0", padding: "14px 18px 10px", flex: "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
              <h2 style={{ ...C.h2 }}>For each player’s goal</h2>
              <span style={{ ...C.cap }}>3 of 20</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>KO</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Kai Okonkwo</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Left foot on target 5 of 8. Next: finish first time</span>
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#eef5f2", color: "#2f6252" }}>Step up</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>JM</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Jonah Marsh</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>No change in 3 runs. Try striking a moving ball</span>
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#eef5f2", color: "#2f6252" }}>Swap</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>AC</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Ana Costa</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Too new. Keep her on the group drill</span>
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e9eae8", color: "#10211f" }}>Wait</span>
            </div>
            <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Each player’s goal sits under their name during the session, with tonight’s step.</span>
          </section>
          <section aria-label="Parents can see why" style={{ ...C.tile, flexGrow: "1" }}>
            <h2 style={{ ...C.h2 }}>Parents can see why</h2>
            <span style={{ ...C.cap }}>When a suggestion changes a player’s plan, the reason goes into their term report in plain words.</span>
          </section>
        </div>
      </main>
    </div>
  )
}
