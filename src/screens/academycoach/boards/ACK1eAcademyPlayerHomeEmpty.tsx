// ACK1e-AcademyPlayerHomeEmpty, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { coachGo } from '../menu'

const C = {
  label: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a4b5b" },
} as const

export default function ACK1eAcademyPlayerHomeEmpty({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  return (
    <div data-board="ACK1e-AcademyPlayerHomeEmpty" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Tall Timber · Advanced</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>Hi Kai</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>KO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "10px", padding: "26px 14px 14px", border: "1.5px dashed #6f7f7b", borderRadius: "16px", background: "#ffffff" }}>
          <span style={{ width: "60px", height: "60px", borderRadius: "999px", background: "#eef5f2", color: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z" />
            </svg>
          </span>
          <span style={{ fontSize: "19px", lineHeight: "25px", fontWeight: "700" }}>Your goal is coming</span>
          <span style={{ fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>After a few sessions, coach Reece picks one thing to work on with you. It shows up here.</span>
        </div>
        <span style={{ ...C.label }}>Fills in like this</span>
        <div style={{ height: "54px", border: "1.5px dashed #6f7f7b", borderRadius: "14px", background: "#faf5ec" }} />
        <div style={{ height: "54px", border: "1.5px dashed #6f7f7b", borderRadius: "14px", background: "#faf5ec" }} />
        <div style={{ height: "54px", border: "1.5px dashed #6f7f7b", borderRadius: "14px", background: "#faf5ec" }} />
      </div>
      <nav aria-label="Main" style={{ flex: "none", display: "flex", borderTop: "1px solid #c5c8c4", background: "#ffffff" }}>
        <button aria-current="page" onClick={() => go("ACK1-AcademyPlayerHome")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", minHeight: "56px", textDecoration: "none", fontSize: "11px", fontWeight: "700", color: "#2f6252" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 11l8-7 8 7v9H4z" />
          </svg>
          Home
        </button>
        <button aria-current="false" onClick={() => go("ACK2-HomePractice")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", minHeight: "56px", textDecoration: "none", fontSize: "11px", fontWeight: "700", color: "#4a5a57" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z" />
          </svg>
          Practice
        </button>
      </nav>
    </div>
  )
}
