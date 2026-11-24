// ACP3e-AcademyParentHomeEmpty, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { demoToast } from '../../demoToast'
import { coachGo } from '../menu'

const C = {
  label: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a4b5b" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
} as const

export default function ACP3eAcademyParentHomeEmpty({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  return (
    <div data-board="ACP3e-AcademyParentHomeEmpty" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Tall Timber · Advanced</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>Welcome, Tess</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>TO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "10px", padding: "26px 14px 14px", border: "1.5px dashed #6f7f7b", borderRadius: "16px", background: "#ffffff" }}>
          <span style={{ width: "60px", height: "60px", borderRadius: "999px", background: "#eef5f2", color: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zM4 10h16M9 3v4M15 3v4" />
            </svg>
          </span>
          <span style={{ fontSize: "19px", lineHeight: "25px", fontWeight: "700" }}>Kai starts on Thursday</span>
          <span style={{ fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Thu 14 May, 5:30 pm at Messmate Primary School. After his first few sessions you’ll see his goal and notes from his coach here.</span>
          <button onClick={() => demoToast("Added to your calendar.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, height: "48px", marginTop: "4px" }}>Add to my calendar</button>
        </div>
        <span style={{ ...C.label }}>Fills in like this</span>
        <div style={{ height: "54px", border: "1.5px dashed #6f7f7b", borderRadius: "14px", background: "#faf5ec" }} />
        <div style={{ height: "54px", border: "1.5px dashed #6f7f7b", borderRadius: "14px", background: "#faf5ec" }} />
        <div style={{ height: "54px", border: "1.5px dashed #6f7f7b", borderRadius: "14px", background: "#faf5ec" }} />
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
