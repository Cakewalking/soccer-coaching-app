// ACP1-BookTrial, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { demoToast } from '../../demoToast'
import { coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  card: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a4b5b" },
  num: { fontVariantNumeric: "tabular-nums" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
} as const

export default function ACP1BookTrial({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  return (
    <div data-board="ACP1-BookTrial" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Tall Timber Football Academy</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>Book a free trial</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>TO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ ...C.card }}>
          <span style={{ fontSize: "15px", lineHeight: "21px" }}>One free session with the group that fits your child’s age. A coach will tell you honestly which group suits them.</span>
        </div>
        <span style={{ ...C.label }}>Your child</span>
        <div style={{ ...C.card }}>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", fontSize: "14px" }}>
            <span>First name</span>
            <strong style={{ ...C.num, textAlign: "right" }}>Kai</strong>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>Age</span>
            <strong style={{ ...C.num, textAlign: "right" }}>13</strong>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>Plays for a club?</span>
            <strong style={{ ...C.num, textAlign: "right" }}>Not yet</strong>
          </span>
        </div>
        <span style={{ ...C.label }}>Pick a session · ages 12 to 14</span>
        <div role="radiogroup" aria-label="Session" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button aria-checked="true" onClick={() => demoToast("Tue 12 May · 5:30 pm chosen.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "60px", padding: "8px 12px", borderRadius: "14px", background: "#ffffff", border: "2px solid #2f6252", color: "#10211f", textDecoration: "none", boxSizing: "border-box" }}>
            <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "999px", boxSizing: "border-box", border: "7px solid #2f6252" }} />
            <span style={{ flexGrow: "1" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>Tue 12 May · 5:30 pm</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Advanced · Messmate Primary School</span>
            </span>
          </button>
          <button aria-checked="false" onClick={() => demoToast("Thu 14 May · 5:30 pm chosen.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "60px", padding: "8px 12px", borderRadius: "14px", background: "#ffffff", border: "1px solid #c5c8c4", color: "#10211f", textDecoration: "none", boxSizing: "border-box" }}>
            <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "999px", boxSizing: "border-box", border: "2px solid #6f7f7b" }} />
            <span style={{ flexGrow: "1" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>Thu 14 May · 5:30 pm</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Advanced · Messmate Primary School</span>
            </span>
          </button>
        </div>
        <span style={{ ...C.cap, fontSize: "13px", lineHeight: "18px" }}>Bring boots, shin pads and water. No card needed for a trial.</span>
      </div>
      <div style={{ flex: "none", padding: "10px 14px 14px", background: "#ffffff", borderTop: "1px solid #c5c8c4", display: "flex", gap: "8px" }}>
        {/* Handover v23: after a trial is booked, one optional question (ADP15), then the booked page. The board still points straight at ACP1b. */}
        <button onClick={() => go("ADP15-HowHeard")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, height: "48px", flex: "1" }}>Book the trial</button>
      </div>
    </div>
  )
}
