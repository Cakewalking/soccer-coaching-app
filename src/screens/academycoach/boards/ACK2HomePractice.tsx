// ACK2-HomePractice, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { demoToast } from '../../demoToast'
import { coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  card: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
} as const

export default function ACK2HomePractice({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  return (
    <div data-board="ACK2-HomePractice" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Practice at home · 10 minutes</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>Left-foot wall strikes</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>KO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ ...C.card }}>
          <span style={{ display: "flex", gap: "6px" }}>
            <span style={{ flex: "1", height: "10px", borderRadius: "5px", background: "#2f6252" }} />
            <span style={{ flex: "1", height: "10px", borderRadius: "5px", background: "#2f6252" }} />
            <span style={{ flex: "1", height: "10px", borderRadius: "5px", background: "#e9eae8" }} />
          </span>
          <span style={{ fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>2 of 3 this week. One more before Tuesday.</span>
        </div>
        <div style={{ ...C.card, gap: "0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>1 · Find a wall and a line</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Stand 5 big steps back</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>2 · 20 strikes, left foot only</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Lock your ankle. Hit the middle of the ball</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>3 · 10 more, first time</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Strike it as it comes back, no touch</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>4 · Count your best run</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>How many in a row hit your target?</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </div>
        </div>
        <div style={{ ...C.card, background: "#eef5f2", borderColor: "#eef5f2" }}>
          <span style={{ fontSize: "14px", lineHeight: "20px" }}>
            <strong>Reece says:</strong>
            {" “Don’t rush. Ten good ones beat thirty wild ones.”"}
          </span>
        </div>
        <span style={{ ...C.cap, fontSize: "13px", lineHeight: "18px" }}>Sore or tired? Skip it. Rest counts too.</span>
      </div>
      <div style={{ flex: "none", padding: "10px 14px 14px", background: "#ffffff", borderTop: "1px solid #c5c8c4", display: "flex", gap: "8px" }}>
        <button onClick={() => demoToast("No worries. Rest counts too.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, height: "48px", flex: "1" }}>Skip today</button>
        <button onClick={() => demoToast("Nice work, Kai. That’s 3 of 3 this week.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, height: "48px", flex: "1" }}>Done it</button>
      </div>
      <nav aria-label="Main" style={{ flex: "none", display: "flex", borderTop: "1px solid #c5c8c4", background: "#ffffff" }}>
        <button aria-current="false" onClick={() => go("ACK1-AcademyPlayerHome")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", minHeight: "56px", textDecoration: "none", fontSize: "11px", fontWeight: "700", color: "#4a5a57" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 11l8-7 8 7v9H4z" />
          </svg>
          Home
        </button>
        <button aria-current="page" onClick={() => go("ACK2-HomePractice")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", minHeight: "56px", textDecoration: "none", fontSize: "11px", fontWeight: "700", color: "#2f6252" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z" />
          </svg>
          Practice
        </button>
      </nav>
    </div>
  )
}
