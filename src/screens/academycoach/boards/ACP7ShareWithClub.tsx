// ACP7-ShareWithClub, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { demoToast } from '../../demoToast'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  card: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a4b5b" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
} as const

export default function ACP7ShareWithClub({ onNav }: { onNav?: (id: string) => void }) {
  void onNav
  return (
    <div data-board="ACP7-ShareWithClub" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>One question before you start</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>Theo also plays for a club</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>ML</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ ...C.card }}>
          <span style={{ fontSize: "15px", lineHeight: "22px" }}>Theo plays for Banksia Park U11, which isn’t linked to the academy. Sharing lets both coaches see his whole week, so nobody overloads a growing body.</span>
        </div>
        <span style={{ ...C.label }}>Share with his club coach</span>
        <div style={{ ...C.card, gap: "0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>His academy goal and plan</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>So both coaches pull the same way</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Yes</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>Which days he trains here</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Counts towards his weekly load</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Yes</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>His term report</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Stays between you and the academy</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e9eae8", color: "#10211f" }}>No</span>
          </div>
        </div>
        <span style={{ ...C.label }}>Share with the academy</span>
        <div style={{ ...C.card, gap: "0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>His club training and games</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Days and minutes only</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Yes</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>Growth and how he’s feeling</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>From his club check-ins</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e9eae8", color: "#10211f" }}>No</span>
          </div>
        </div>
        <span style={{ ...C.cap, fontSize: "13px", lineHeight: "18px" }}>You can change any of these whenever you like. Fees are never shared.</span>
      </div>
      <div style={{ flex: "none", padding: "10px 14px 14px", background: "#ffffff", borderTop: "1px solid #c5c8c4", display: "flex", gap: "8px" }}>
        <button onClick={() => demoToast("Nothing is shared. You can change this any time.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, height: "48px", flex: "1" }}>Share nothing</button>
        <button onClick={() => demoToast("Saved. Theo’s club coach is told what you chose to share.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, height: "48px", flex: "1" }}>Save</button>
      </div>
    </div>
  )
}
