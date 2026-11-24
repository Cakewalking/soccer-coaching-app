// ACP1b-TrialBooked, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { demoToast } from '../../demoToast'
import { coachGo } from '../menu'

const C = {
  card: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  num: { fontVariantNumeric: "tabular-nums" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
} as const

export default function ACP1bTrialBooked({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  return (
    <div data-board="ACP1b-TrialBooked" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Tall Timber Football Academy</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>Trial booked</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>TO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "10px", padding: "26px 14px 14px", border: "1.5px dashed #6f7f7b", borderRadius: "16px", background: "#ffffff" }}>
          <span style={{ width: "60px", height: "60px", borderRadius: "999px", background: "#eef5f2", color: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
          </span>
          <span style={{ fontSize: "19px", lineHeight: "25px", fontWeight: "700" }}>See you Tuesday, Kai</span>
          <span style={{ fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Tue 12 May, 5:30 pm at Messmate Primary School, pitch 1. Coach Reece will look out for him.</span>
        </div>
        <div style={{ ...C.card }}>
          <strong style={{ fontSize: "15px" }}>What happens after</strong>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>That evening</span>
            <strong style={{ ...C.num, textAlign: "right" }}>A note from the coach</strong>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>Within 2 days</span>
            <strong style={{ ...C.num, textAlign: "right" }}>An offer, if there’s a place</strong>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>No pressure</span>
            <strong style={{ ...C.num, textAlign: "right" }}>Nothing to pay unless you join</strong>
          </span>
        </div>
        <div style={{ ...C.card }}>
          <span style={{ fontSize: "14px", lineHeight: "20px" }}>
            {"Every Tall Timber coach holds a Working with Children Check. "}
            <button onClick={() => demoToast("Opens the academy’s child-safe policy.")} style={{ border: "0", padding: "0", margin: "-12px 0", background: "transparent", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", color: "#2f6252", display: "inline-flex", alignItems: "center", minHeight: "44px" }}>Read the child-safe policy</button>
          </span>
        </div>
      </div>
      <div style={{ flex: "none", padding: "10px 14px 14px", background: "#ffffff", borderTop: "1px solid #c5c8c4", display: "flex", gap: "8px" }}>
        <button onClick={() => demoToast("Added to your calendar.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, height: "48px", flex: "1" }}>Add to my calendar</button>
        <button onClick={() => go("ACP2-Offer")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, height: "48px", flex: "1" }}>Done</button>
      </div>
    </div>
  )
}
