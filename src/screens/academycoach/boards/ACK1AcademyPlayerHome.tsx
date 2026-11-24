// ACK1-AcademyPlayerHome, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts, then given three ways in that the
// board does not draw (to ADK1, ADK2 and ADK4). Do not make it again from the board without putting those back.

import { demoToast } from '../../demoToast'
import { coachGo } from '../menu'

const C = {
  card: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a4b5b" },
} as const

export default function ACK1AcademyPlayerHome({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  return (
    <div data-board="ACK1-AcademyPlayerHome" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Tall Timber · Advanced</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>Hi Kai</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>KO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ ...C.card, border: "2px solid #2f6252" }}>
          <span style={{ ...C.label }}>Your goal this term</span>
          <span style={{ fontSize: "19px", lineHeight: "25px", fontWeight: "700" }}>Score with your left foot in a game</span>
          <span style={{ fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>3 in training so far. Keep going.</span>
        </div>
        <button onClick={() => go("ACK2-HomePractice")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.card, flexDirection: "row", alignItems: "center", gap: "12px", textDecoration: "none", color: "#10211f", background: "#eef5f2", borderColor: "#eef5f2" }}>
          <span style={{ flexGrow: "1" }}>
            <strong style={{ display: "block", fontSize: "16px", lineHeight: "21px" }}>Practice at home</strong>
            <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Left-foot wall strikes · 10 minutes · 2 of 3 done</span>
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
        <div style={{ ...C.card, gap: "4px" }}>
          {/* Not on the board: the handover says "Your skills" is the way in to ADK1, so the heading is the control. */}
          <button onClick={() => go("ADK1-MySkills")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "44px", margin: "-6px 0", border: "0", padding: "0", background: "transparent", font: "inherit", color: "#10211f", cursor: "pointer" }}>
            <strong style={{ fontSize: "15px" }}>Your skills</strong>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#2f6252", textDecoration: "underline" }}>How am I going?</span>
          </button>
          <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "40px", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>Running with the ball</span>
            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
            </span>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "40px", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>First touch</span>
            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#40826d", outline: "2px solid #40826d", outlineOffset: "2px" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
            </span>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "40px", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>One against one</span>
            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
            </span>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "40px", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>Striking the ball</span>
            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
            </span>
          </span>
          <span style={{ fontSize: "12px", lineHeight: "17px", color: "#4a5a57" }}>Only you, your mum and your coaches see this.</span>
        </div>
        <button onClick={() => demoToast("Playing your clip: left-foot finish, 28 May.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.card, flexDirection: "row", alignItems: "center", gap: "12px", textDecoration: "none", color: "#10211f" }}>
          <span style={{ flex: "none", width: "56px", height: "44px", borderRadius: "10px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 7l8 5-8 5z" />
            </svg>
          </span>
          <span style={{ flexGrow: "1" }}>
            <strong style={{ display: "block", fontSize: "15px" }}>From Reece: your left-foot finish</strong>
            <span style={{ fontSize: "13px", color: "#4a5a57" }}>“Look how your hips open here.”</span>
          </span>
        </button>
        {/* Not on the board: the handover says ADK2 and ADK4 are reached from here, so each has a plain link. */}
        <span style={{ alignSelf: "center", display: "flex", gap: "8px" }}>
          <button onClick={() => go("ADK2-MyClips")} style={{ minHeight: "44px", border: "0", padding: "0 12px", background: "transparent", font: "inherit", fontSize: "14px", fontWeight: "700", color: "#2f6252", textDecoration: "underline", cursor: "pointer" }}>My six clips</button>
          <button onClick={() => go("ADK4-CheckIn")} style={{ minHeight: "44px", border: "0", padding: "0 12px", background: "transparent", font: "inherit", fontSize: "14px", fontWeight: "700", color: "#2f6252", textDecoration: "underline", cursor: "pointer" }}>Today’s check-in</button>
        </span>
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
