// ADK4-CheckIn, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
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
  { on: { background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }, off: { background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" } },
  { on: { background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }, off: { background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" } },
] as const

export default function ADK4CheckIn({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const [pick, setPick] = useState<number[]>([1, 2, 1])   // which choice is tapped in each group
  return (
    <div data-board="ADK4-CheckIn" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <button aria-label="Back" onClick={() => go("ACK1-AcademyPlayerHome")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", width: "44px", height: "44px", marginLeft: "-8px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", textDecoration: "none" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Kai O · Tall Timber Academy</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>How are you today?</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>KO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ ...C.card, gap: "8px", padding: "16px 14px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <strong style={{ fontSize: "15px" }}>Body</strong>
            <span role="radiogroup" aria-label="Body" style={{ display: "flex", gap: "8px" }}>
              <button role="radio" aria-checked={pick[0] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 0 : v)); demoToast("Fresh. Saved.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "56px", borderRadius: "14px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(pick[0] === 0 ? R[0].on : R[0].off) }}>Fresh</button>
              <button role="radio" aria-checked={pick[0] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 1 : v)); demoToast("OK. Saved.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "56px", borderRadius: "14px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(pick[0] === 1 ? R[0].on : R[0].off) }}>OK</button>
              <button role="radio" aria-checked={pick[0] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 2 : v)); demoToast("Sore. Saved.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "56px", borderRadius: "14px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(pick[0] === 2 ? R[0].on : R[0].off) }}>Sore</button>
            </span>
          </div>
          <span style={{ height: "6px" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <strong style={{ fontSize: "15px" }}>Head</strong>
            <span role="radiogroup" aria-label="Head" style={{ display: "flex", gap: "8px" }}>
              <button role="radio" aria-checked={pick[1] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 0 : v)); demoToast("Good. Saved.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "56px", borderRadius: "14px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(pick[1] === 0 ? R[1].on : R[1].off) }}>Good</button>
              <button role="radio" aria-checked={pick[1] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 1 : v)); demoToast("OK. Saved.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "56px", borderRadius: "14px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(pick[1] === 1 ? R[1].on : R[1].off) }}>OK</button>
              <button role="radio" aria-checked={pick[1] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 2 : v)); demoToast("Low. Saved.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "56px", borderRadius: "14px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(pick[1] === 2 ? R[1].on : R[1].off) }}>Low</button>
            </span>
          </div>
          <span style={{ height: "6px" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <strong style={{ fontSize: "15px" }}>Sleep</strong>
            <span role="radiogroup" aria-label="Sleep" style={{ display: "flex", gap: "8px" }}>
              <button role="radio" aria-checked={pick[2] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 0 : v)); demoToast("Well. Saved.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "56px", borderRadius: "14px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(pick[2] === 0 ? R[2].on : R[2].off) }}>Well</button>
              <button role="radio" aria-checked={pick[2] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 1 : v)); demoToast("OK. Saved.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "56px", borderRadius: "14px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(pick[2] === 1 ? R[2].on : R[2].off) }}>OK</button>
              <button role="radio" aria-checked={pick[2] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 2 : v)); demoToast("Badly. Saved.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "56px", borderRadius: "14px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(pick[2] === 2 ? R[2].on : R[2].off) }}>Badly</button>
            </span>
          </div>
        </div>
        <span style={{ ...C.cap, fontSize: "13px", lineHeight: "18px", textAlign: "center" }}>Reece sees this. If you tap Low or Sore two days running, he’ll have a quiet word. Under 13, a parent does this with you.</span>
      </div>
      <div style={{ flex: "none", padding: "10px 14px 14px", background: "#ffffff", borderTop: "1px solid #c5c8c4", display: "flex", gap: "8px" }}>
        <button onClick={() => demoToast("Thanks, Kai. See you Thursday.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, height: "48px", flex: "1" }}>Done</button>
      </div>
    </div>
  )
}
