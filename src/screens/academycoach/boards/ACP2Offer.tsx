// ACP2-Offer, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { demoToast } from '../../demoToast'
import { coachGo } from '../menu'

const C = {
  card: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a4b5b" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  num: { fontVariantNumeric: "tabular-nums" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
} as const

export default function ACP2Offer({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  return (
    <div data-board="ACP2-Offer" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Tall Timber Football Academy</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>A place for Kai</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>TO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ ...C.card, background: "#eef5f2", borderColor: "#eef5f2" }}>
          <span style={{ ...C.label }}>From coach Reece</span>
          <span style={{ fontSize: "15px", lineHeight: "22px" }}>Kai took players on all session and keeps the ball close with both feet. We’d work on finishing with his left.</span>
        </div>
        <div style={{ ...C.card, border: "2px solid #2f6252" }}>
          <span style={{ ...C.label }}>Your offer</span>
          <span style={{ fontSize: "20px", lineHeight: "26px", fontWeight: "700" }}>Advanced · ages 12 to 14</span>
          <span style={{ fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Tue and Thu, 5:30 to 6:40 pm · coach Reece</span>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>Full term</span>
            <strong style={{ ...C.num, textAlign: "right" }}>$1,100</strong>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>You pay for the 7 weeks left</span>
            <strong style={{ ...C.num, textAlign: "right" }}>$224</strong>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>Place held until</span>
            <strong style={{ ...C.num, textAlign: "right" }}>Sat 16 May</strong>
          </span>
        </div>
        <div style={{ ...C.card }}>
          <span style={{ fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Next you can choose whether Kai also plays games on Sundays. Nothing is paid until the last step.</span>
        </div>
      </div>
      <div style={{ flex: "none", padding: "10px 14px 14px", background: "#ffffff", borderTop: "1px solid #c5c8c4", display: "flex", gap: "8px" }}>
        <button onClick={() => demoToast("No problem. The place goes to the next family.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, height: "48px", flex: "1" }}>Not for us</button>
        <button onClick={() => go("ACP9-JoinGameTeam")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, height: "48px", flex: "1" }}>Accept</button>
      </div>
    </div>
  )
}
