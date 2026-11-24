// ADK3-EnjoyedToday, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useState } from 'react'
import { demoToast } from '../../demoToast'
import { coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  card: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
} as const

// A tapped choice and an untapped one, for each group of choices.
const R = [
  { on: { background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }, off: { background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" } },
] as const

export default function ADK3EnjoyedToday({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const [pick, setPick] = useState<number[]>([0])   // which choice is tapped in each group
  return (
    <div data-board="ADK3-EnjoyedToday" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <button aria-label="Back" onClick={() => go("ACK1-AcademyPlayerHome")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", width: "44px", height: "44px", marginLeft: "-8px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", textDecoration: "none" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Kai O · Tall Timber Academy</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>How was today?</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>KO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ ...C.card, gap: "0", padding: "16px 14px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <strong style={{ fontSize: "15px" }}>Thursday’s session</strong>
            <span role="radiogroup" aria-label="Thursday’s session" style={{ display: "flex", gap: "8px" }}>
              <button role="radio" aria-checked={pick[0] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 0 : v)); demoToast("Loved it. Saved.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "56px", borderRadius: "14px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(pick[0] === 0 ? R[0].on : R[0].off) }}>Loved it</button>
              <button role="radio" aria-checked={pick[0] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 1 : v)); demoToast("It was OK. Saved.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "56px", borderRadius: "14px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(pick[0] === 1 ? R[0].on : R[0].off) }}>It was OK</button>
              <button role="radio" aria-checked={pick[0] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 2 : v)); demoToast("Not today. Saved.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "56px", borderRadius: "14px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(pick[0] === 2 ? R[0].on : R[0].off) }}>Not today</button>
            </span>
          </div>
        </div>
        <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontSize: "13px", fontWeight: "700" }}>Anything you want Reece to know? (optional)</span>
          <input defaultValue="" style={{ borderRadius: "10px", border: "1px solid #8d9794", background: "#ffffff", padding: "0 12px", fontSize: "16px", height: "48px", fontFamily: "inherit", color: "inherit", width: "100%", display: "block" }} />
          <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>Only Reece sees this</span>
        </span>
        <span style={{ ...C.cap, fontSize: "13px", lineHeight: "18px", textAlign: "center" }}>One tap is enough. Nobody is told who tapped what: the academy sees how many, not who.</span>
      </div>
      <div style={{ flex: "none", padding: "10px 14px 14px", background: "#ffffff", borderTop: "1px solid #c5c8c4", display: "flex", gap: "8px" }}>
        <button onClick={() => demoToast("Thanks, Kai.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, height: "48px", flex: "1" }}>Done</button>
      </div>
    </div>
  )
}
