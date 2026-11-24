// ACP9-JoinGameTeam, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
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

export default function ACP9JoinGameTeam({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  return (
    <div data-board="ACP9-JoinGameTeam" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <button aria-label="Back" onClick={() => go("ACP2-Offer")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", width: "44px", height: "44px", marginLeft: "-8px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", textDecoration: "none" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Tall Timber · with Wattle Creek FC</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>Play games too?</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>TO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ ...C.card }}>
          <span style={{ fontSize: "15px", lineHeight: "22px" }}>
            {"Tall Timber’s Advanced group plays Sunday games as "}
            <strong>U13 Timber</strong>
            , part of Wattle Creek FC. Coach Reece runs the team.
          </span>
        </div>
        <div role="radiogroup" aria-label="Games" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button aria-checked="true" onClick={() => demoToast("Train and play games chosen.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "60px", padding: "8px 12px", borderRadius: "14px", background: "#ffffff", border: "2px solid #2f6252", color: "#10211f", textDecoration: "none", boxSizing: "border-box" }}>
            <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "999px", boxSizing: "border-box", border: "7px solid #2f6252" }} />
            <span style={{ flexGrow: "1" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>Train and play games</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Mon to Thu, plus Sunday league</span>
            </span>
          </button>
          <button aria-checked="false" onClick={() => demoToast("Train only chosen.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "60px", padding: "8px 12px", borderRadius: "14px", background: "#ffffff", border: "1px solid #c5c8c4", color: "#10211f", textDecoration: "none", boxSizing: "border-box" }}>
            <span style={{ flex: "none", width: "22px", height: "22px", borderRadius: "999px", boxSizing: "border-box", border: "2px solid #6f7f7b" }} />
            <span style={{ flexGrow: "1" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>Train only</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>You can add games later if there’s a place</span>
            </span>
          </button>
        </div>
        <div style={{ ...C.card, border: "2px solid #2f6252", gap: "0" }}>
          <span style={{ ...C.label }}>One bill, two lines</span>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>Tall Timber · 7 weeks left of term</span>
            <strong style={{ ...C.num, textAlign: "right" }}>$224</strong>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>Wattle Creek FC · registration to season end</span>
            <strong style={{ ...C.num, textAlign: "right" }}>$165</strong>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", minHeight: "42px", alignItems: "center", borderTop: "2px solid #10211f", fontSize: "16px", fontWeight: "700" }}>
            <span>Today, or in 3 parts</span>
            <span style={{ ...C.num }}>$389</span>
          </span>
        </div>
        <div style={{ ...C.card, gap: "0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>The club sees</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Team sheets, minutes and cards. Not your fees or his report</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>Game time</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Every player gets at least half a game</span>
            </span>
          </div>
          <button onClick={() => go("ACP10-AcademyConcern")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>A worry about a game?</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>It goes to the club’s welfare officer</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
      <div style={{ flex: "none", padding: "10px 14px 14px", background: "#ffffff", borderTop: "1px solid #c5c8c4", display: "flex", gap: "8px" }}>
        <button onClick={() => go("ACP3e-AcademyParentHomeEmpty")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, height: "48px", flex: "1" }}>Pay in 3 parts</button>
        <button onClick={() => go("ACP3e-AcademyParentHomeEmpty")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, height: "48px", flex: "1" }}>Pay $389</button>
      </div>
    </div>
  )
}
