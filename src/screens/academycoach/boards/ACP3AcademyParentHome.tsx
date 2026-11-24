// ACP3-AcademyParentHome, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { coachGo } from '../menu'
import { clock, useCoachTeam } from '../coachTeam'

const C = {
  card: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a4b5b" },
} as const

export default function ACP3AcademyParentHome({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const { g } = useCoachTeam()   // the team's times are read from the academy's list
  return (
    <div data-board="ACP3-AcademyParentHome" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Tall Timber · Advanced</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>Kai’s week</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>TO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <button onClick={() => go("ACP6-MakeUp")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.card, flexDirection: "row", alignItems: "center", gap: "12px", textDecoration: "none", color: "#10211f", border: "2px solid #2f6252" }}>
          <span style={{ flex: "none", width: "48px", height: "52px", borderRadius: "12px", background: "#e8cfcf", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "700" }}>THU</span>
            <span style={{ fontSize: "20px", lineHeight: "22px", fontWeight: "700" }}>4</span>
          </span>
          <span style={{ flexGrow: "1" }}>
            <span style={{ display: "block", fontSize: "16px", lineHeight: "21px", fontWeight: "700" }}>Training today, {clock(g)} pm</span>
            <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>One-on-one Fri 4:15 · game Sun 12:00</span>
          </span>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#2f6252" }}>Can’t come?</span>
        </button>
        <div style={{ ...C.card }}>
          <span style={{ ...C.label }}>His goal this term</span>
          <span style={{ fontSize: "17px", lineHeight: "23px", fontWeight: "700" }}>Score with his left foot in a game</span>
          <span style={{ fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>3 in training so far. Practice at home: 2 of 3 this week.</span>
        </div>
        <button onClick={() => go("ACP5-ProgressReport")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.card, gap: "6px", textDecoration: "none", color: "#10211f" }}>
          <span style={{ ...C.label }}>From coach Reece · Tuesday</span>
          <span style={{ fontSize: "15px", lineHeight: "21px" }}>“Best first touch I’ve seen from Kai. He set it out of his feet every time.”</span>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#2f6252" }}>See his progress</span>
        </button>
        <div style={{ ...C.card, background: "#e8cfcf", borderColor: "#e8cfcf" }}>
          <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ fontSize: "15px" }}>A big week for Kai</strong>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e8cfcf", color: "#10211f" }}>5 sessions</span>
          </span>
          <span style={{ fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Academy four times, school football, a one-on-one and a game. Coach Reece knows, and tonight’s sprints are kept short.</span>
        </div>
        <button onClick={() => go("ACP8-BookClinic")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.card, flexDirection: "row", alignItems: "center", gap: "10px", textDecoration: "none", color: "#10211f" }}>
          <span style={{ flexGrow: "1" }}>
            <strong style={{ display: "block", fontSize: "15px" }}>July holiday clinic</strong>
            <span style={{ fontSize: "13px", color: "#4a5a57" }}>Mon 6 to Wed 8 July · 9 places left</span>
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", padding: "0 4px" }}>
          <button onClick={() => go("ACP11-AcademyParentChat")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", color: "#2f6252", minHeight: "44px", display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 5h16v11H8l-4 4z" />
            </svg>
            Group chat · 2 new
          </button>
          <button onClick={() => go("ACP10-AcademyConcern")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", color: "#2f6252", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none" }}>Something not right?</button>
        </div>
      </div>
      <nav aria-label="Main" style={{ flex: "none", display: "flex", borderTop: "1px solid #c5c8c4", background: "#ffffff" }}>
        <button aria-current="false" onClick={() => go("FAM14-HomeWithClub")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", minHeight: "56px", textDecoration: "none", fontSize: "11px", fontWeight: "700", color: "#4a5a57" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 11l8-7 8 7v9H4z" />
          </svg>
          Home
        </button>
        <button aria-current="false" onClick={() => go("FAM18-Reels")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", minHeight: "56px", textDecoration: "none", fontSize: "11px", fontWeight: "700", color: "#4a5a57" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 7h11v10H4zM15 10l5-3v10l-5-3" />
          </svg>
          Reels
        </button>
        <button aria-current="false" onClick={() => go("FAM31-Team")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", minHeight: "56px", textDecoration: "none", fontSize: "11px", fontWeight: "700", color: "#4a5a57" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 11a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 3-5 6-5s6 2 6 5M14 20c0-2 1-4 4-4s4 2 4 4" />
          </svg>
          Team
        </button>
        <button aria-current="false" onClick={() => go("FAM17u-LearnWithClub")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", minHeight: "56px", textDecoration: "none", fontSize: "11px", fontWeight: "700", color: "#4a5a57" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 4h13v16H5zM9 4v16" />
          </svg>
          Learn
        </button>
        <button aria-current="page" onClick={() => go("ADP1-AcademyHome")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", minHeight: "56px", textDecoration: "none", fontSize: "11px", fontWeight: "700", color: "#2f6252" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
          </svg>
          Club
        </button>
      </nav>
    </div>
  )
}
