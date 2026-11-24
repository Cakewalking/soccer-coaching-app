// ACP4-ParentFees, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { demoToast } from '../../demoToast'
import { coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  card: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a4b5b" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  num: { fontVariantNumeric: "tabular-nums" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
} as const

export default function ACP4ParentFees({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  return (
    <div data-board="ACP4-ParentFees" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>Tall Timber · Kai</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>Fees</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>TO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ ...C.card, border: "2px solid #2f6252" }}>
          <span style={{ ...C.label }}>Term 2 · Advanced</span>
          <span style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <span style={{ ...C.num, fontSize: "28px", lineHeight: "34px", fontWeight: "700" }}>$129.67 due</span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e8cfcf", color: "#10211f" }}>15 June</span>
          </span>
          <span style={{ fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Payment 3 of 3 · Tall Timber and Wattle Creek FC, on one bill</span>
        </div>
        <div style={{ ...C.card, gap: "0" }}>
          <strong style={{ fontSize: "15px" }}>This term</strong>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>13 May · payment 1 of 3</span>
            <strong style={{ ...C.num, textAlign: "right" }}>$129.67 paid</strong>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>1 June · payment 2 of 3</span>
            <strong style={{ ...C.num, textAlign: "right" }}>$129.66 paid</strong>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>28 May · one-on-one</span>
            <strong style={{ ...C.num, textAlign: "right" }}>$90 paid</strong>
          </span>
          <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", minHeight: "38px", alignItems: "center", borderTop: "1px solid #e9eae8", fontSize: "14px" }}>
            <span>4 June · one-on-one</span>
            <strong style={{ ...C.num, textAlign: "right" }}>$90 paid</strong>
          </span>
        </div>
        <div style={{ ...C.card, gap: "0" }}>
          <button onClick={() => demoToast("Kai’s Term 3 place is held. $1,100, due 13 July.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>Term 3 place</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Re-enrol by 19 June to keep Kai’s spot</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Keep it</span>
          </button>
          <button onClick={() => demoToast("4 receipts sent to your email.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "56px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "20px", fontWeight: "700" }}>Receipts</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>For your records or a rebate</span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
        <span style={{ ...C.cap, fontSize: "13px", lineHeight: "18px" }}>Only you and the academy owner can see fees. Coaches and Kai can’t.</span>
        {/* Handover v23 asks for this way in to ADP16; the board does not draw it, so it is a plain link. */}
        <button onClick={() => go("ADP16-Voucher")} style={{ alignSelf: "flex-start", minHeight: "44px", margin: "-8px 0", border: "0", padding: "0", background: "transparent", font: "inherit", fontSize: "14px", fontWeight: "700", color: "#2f6252", textDecoration: "underline", cursor: "pointer" }}>Have a sport voucher?</button>
      </div>
      <div style={{ flex: "none", padding: "10px 14px 14px", background: "#ffffff", borderTop: "1px solid #c5c8c4", display: "flex", gap: "8px" }}>
        <button onClick={() => demoToast("Opens secure card set-up.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, height: "48px", flex: "1" }}>Change card</button>
        <button onClick={() => demoToast("$129.67 paid. Thanks, Tess.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, height: "48px", flex: "1" }}>Pay it now</button>
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
