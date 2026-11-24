// ACC1-CoachToday, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  num: { fontVariantNumeric: "tabular-nums" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACC1CoachToday({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC1-CoachToday" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="today" sub="Today" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Hi Reece</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Thursday 4 June · 3 sessions today at Messmate Primary School</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ACC13-AcademyChat")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Group chats</button>
          <button onClick={() => demoToast("New message to Dani.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Message Dani</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "repeat(12, minmax(0,1fr))" }}>
        <section aria-label="Today" style={{ ...C.tile, gridColumn: "span 8", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>Today</h2>
            <span style={{ ...C.cap }}>Tap a session to run it</span>
          </div>
          <button onClick={() => go("ACC2-RunSession")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", minHeight: "92px", borderTop: "1px solid #e9eae8", color: "#10211f", textDecoration: "none" }}>
            <span style={{ ...C.num, flex: "none", width: "60px", height: "60px", borderRadius: "14px", background: "#eef5f2", color: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", fontWeight: "700" }}>4:30</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "17px", lineHeight: "23px", fontWeight: "700" }}>Development · 9 to 11</span>
              <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>14 coming · Arjun Mehta is on trial</span>
              <span style={{ display: "block", fontSize: "14px", lineHeight: "20px" }}>Plan: First touch on the move</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e8cfcf", color: "#10211f" }}>1 trial</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <button onClick={() => go("ACC2-RunSession")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", minHeight: "92px", borderTop: "1px solid #e9eae8", color: "#10211f", textDecoration: "none" }}>
            <span style={{ ...C.num, flex: "none", width: "60px", height: "60px", borderRadius: "14px", background: "#eef5f2", color: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", fontWeight: "700" }}>5:30</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "17px", lineHeight: "23px", fontWeight: "700" }}>Advanced · 12 to 14</span>
              <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>20 coming · Lola and Finn are making up a missed session</span>
              <span style={{ display: "block", fontSize: "14px", lineHeight: "20px" }}>Plan: Finishing with the weaker foot</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#eef5f2", color: "#2f6252" }}>2 make-ups</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <button onClick={() => go("ACC5-OneOnOne")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", minHeight: "92px", borderTop: "1px solid #e9eae8", color: "#10211f", textDecoration: "none" }}>
            <span style={{ ...C.num, flex: "none", width: "60px", height: "60px", borderRadius: "14px", background: "#eef5f2", color: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", fontWeight: "700" }}>6:45</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "17px", lineHeight: "23px", fontWeight: "700" }}>One-on-one · Kai Okonkwo</span>
              <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>45 minutes · pitch 2, in open view</span>
              <span style={{ display: "block", fontSize: "14px", lineHeight: "20px" }}>Plan: Built from Kai’s goal: weaker-foot finishing</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Parent told</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Plans come from each group’s term plan. Swap any drill from the library.</span>
        </section>
        <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: "14px", minHeight: "0" }}>
          <section aria-label="Before you start" style={{ ...C.tile, flex: "none", gap: "0", padding: "14px 18px 10px" }}>
            <h2 style={{ ...C.h2 }}>Before you start</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>!</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Zane: easy on sprints</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>5 sessions this week across club and academy</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>+</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Arjun’s first time</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Assess him in the last 10 minutes</span>
              </span>
            </div>
          </section>
          <section aria-label="Reports" style={{ ...C.tile, flexGrow: "1", gap: "8px" }}>
            <h2 style={{ ...C.h2 }}>Term reports</h2>
            <span style={{ ...C.cap }}>8 of your 52 are drafted from your notes. 4 are ready for you to check.</span>
            <button onClick={() => go("ACC6-ReportDraft")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, marginTop: "auto" }}>Check a draft</button>
          </section>
        </div>
      </main>
    </div>
  )
}
