// ACP10-AcademyConcern, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { demoToast } from '../../demoToast'
import { coachGo } from '../menu'

const C = {
  card: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a4b5b" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
} as const

export default function ACP10AcademyConcern({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  return (
    <div data-board="ACP10-AcademyConcern" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <button aria-label="Back" onClick={() => go("ACP3-AcademyParentHome")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", width: "44px", height: "44px", marginLeft: "-8px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", textDecoration: "none" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Private · Kai’s coaches can’t see this</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>Tell someone</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>TO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ ...C.card }}>
          <span style={{ fontSize: "15px", lineHeight: "22px" }}>If something doesn’t feel right, say so here. You don’t need to be sure, and you don’t need to know who looks after what.</span>
        </div>
        <span style={{ ...C.label }}>Where did it happen?</span>
        <div role="radiogroup" aria-label="Where" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button aria-checked="false" onClick={() => demoToast("At academy training chosen.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "60px", padding: "8px 12px", borderRadius: "14px", background: "#ffffff", border: "1px solid #c5c8c4", color: "#10211f", textDecoration: "none", boxSizing: "border-box" }}>
            <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "999px", boxSizing: "border-box", border: "2px solid #6f7f7b" }} />
            <span style={{ flexGrow: "1" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>At academy training</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Goes to Dani Okafor, who runs Tall Timber</span>
            </span>
          </button>
          <button aria-checked="true" onClick={() => demoToast("At a Sunday game chosen.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "60px", padding: "8px 12px", borderRadius: "14px", background: "#ffffff", border: "2px solid #2f6252", color: "#10211f", textDecoration: "none", boxSizing: "border-box" }}>
            <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "999px", boxSizing: "border-box", border: "7px solid #2f6252" }} />
            <span style={{ flexGrow: "1" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>At a Sunday game</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Goes to Helen Park, Wattle Creek’s welfare officer</span>
            </span>
          </button>
          <button aria-checked="false" onClick={() => demoToast("I’m not sure chosen.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "60px", padding: "8px 12px", borderRadius: "14px", background: "#ffffff", border: "1px solid #c5c8c4", color: "#10211f", textDecoration: "none", boxSizing: "border-box" }}>
            <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "999px", boxSizing: "border-box", border: "2px solid #6f7f7b" }} />
            <span style={{ flexGrow: "1" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>I’m not sure</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Both are told, and they agree who leads</span>
            </span>
          </button>
          <button aria-checked="false" onClick={() => demoToast("It’s about the person in charge chosen.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "60px", padding: "8px 12px", borderRadius: "14px", background: "#ffffff", border: "1px solid #c5c8c4", color: "#10211f", textDecoration: "none", boxSizing: "border-box" }}>
            <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "999px", boxSizing: "border-box", border: "2px solid #6f7f7b" }} />
            <span style={{ flexGrow: "1" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>It’s about the person in charge</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>We show you how to go straight to the regulator</span>
            </span>
          </button>
        </div>
        <div style={{ ...C.card }}>
          <textarea aria-label="What happened" placeholder="What happened, in your own words" style={{ minHeight: "92px", border: "1px solid #c5c8c4", borderRadius: "12px", padding: "10px 12px", fontFamily: "inherit", fontSize: "15px", lineHeight: "21px", resize: "none", background: "#ffffff", color: "#10211f" }} />
          <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>You’ll hear back within 2 days. Kai can also write from his own app.</span>
        </div>
      </div>
      <div style={{ flex: "none", padding: "10px 14px 14px", background: "#ffffff", borderTop: "1px solid #c5c8c4", display: "flex", gap: "8px" }}>
        <button onClick={() => demoToast("Sent to Helen Park. She’ll reply within 2 days.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, height: "48px", flex: "1" }}>Send privately</button>
      </div>
    </div>
  )
}
