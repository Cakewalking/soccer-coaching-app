// ACT1-AcademyWeek, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACT1AcademyWeek({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACT1-AcademyWeek" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="training" sub="This week" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>This week</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Tall Timber Academy · term 3, week 4 of 10 · Reece’s groups</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => demoToast("Last week’s plans copied in as drafts.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Copy last week</button>
          <button onClick={() => go("ACT2-AcademySuggested")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Plan a session</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 320px" }}>
        <section aria-label="Sessions this week" style={{ ...C.tile, gap: "0" }}>
          <button onClick={() => go("ACT3-AcademySessionPlan")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "64px 150px minmax(0,1fr) auto", alignItems: "center", gap: "12px", minHeight: "66px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ flex: "none", width: "48px", height: "52px", borderRadius: "12px", background: "#e9eae8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "700" }}>MON</span>
              <span style={{ fontSize: "20px", lineHeight: "22px", fontWeight: "700" }}>1</span>
            </span>
            <span>
              <strong style={{ display: "block", fontSize: "15px" }}>Foundation</strong>
              <span style={{ ...C.cap }}>4:00 · 12 children</span>
            </span>
            <span style={{ fontSize: "14px", lineHeight: "20px" }}>Ball mastery, both feet. Small games, no lines</span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e9eae8", color: "#10211f" }}>Done</span>
          </button>
          <button onClick={() => go("ACT3-AcademySessionPlan")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "64px 150px minmax(0,1fr) auto", alignItems: "center", gap: "12px", minHeight: "66px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ flex: "none", width: "48px", height: "52px", borderRadius: "12px", background: "#e8cfcf", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "700" }}>TUE</span>
              <span style={{ fontSize: "20px", lineHeight: "22px", fontWeight: "700" }}>2</span>
            </span>
            <span>
              <strong style={{ display: "block", fontSize: "15px" }}>Advanced</strong>
              <span style={{ ...C.cap }}>4:30 · 11 players</span>
            </span>
            <span style={{ fontSize: "14px", lineHeight: "20px" }}>Receiving on the half-turn, then 4 v 4 through the middle</span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Planned</span>
          </button>
          <button onClick={() => go("ACT2-AcademySuggested")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "64px 150px minmax(0,1fr) auto", alignItems: "center", gap: "12px", minHeight: "66px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ flex: "none", width: "48px", height: "52px", borderRadius: "12px", background: "None", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "700" }}>WED</span>
              <span style={{ fontSize: "20px", lineHeight: "22px", fontWeight: "700" }}>3</span>
            </span>
            <span>
              <strong style={{ display: "block", fontSize: "15px" }}>Development</strong>
              <span style={{ ...C.cap }}>4:30 · 14 players</span>
            </span>
            <span style={{ fontSize: "14px", lineHeight: "20px" }}>First touch away from pressure</span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e8cfcf", color: "#10211f" }}>Needs a plan</span>
          </button>
          <button onClick={() => go("ACT2-AcademySuggested")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "64px 150px minmax(0,1fr) auto", alignItems: "center", gap: "12px", minHeight: "66px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ flex: "none", width: "48px", height: "52px", borderRadius: "12px", background: "None", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "700" }}>THU</span>
              <span style={{ fontSize: "20px", lineHeight: "22px", fontWeight: "700" }}>4</span>
            </span>
            <span>
              <strong style={{ display: "block", fontSize: "15px" }}>Advanced</strong>
              <span style={{ ...C.cap }}>4:30 · 11 players</span>
            </span>
            <span style={{ fontSize: "14px", lineHeight: "20px" }}>Playing forward after winning it</span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e8cfcf", color: "#10211f" }}>Needs a plan</span>
          </button>
          <button onClick={() => go("ACC7-AcademyGameDay")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "64px 150px minmax(0,1fr) auto", alignItems: "center", gap: "12px", minHeight: "66px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ flex: "none", width: "48px", height: "52px", borderRadius: "12px", background: "#e8cfcf", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: "700" }}>SAT</span>
              <span style={{ fontSize: "20px", lineHeight: "22px", fontWeight: "700" }}>6</span>
            </span>
            <span>
              <strong style={{ display: "block", fontSize: "15px" }}>Game team · U13 Timber</strong>
              <span style={{ ...C.cap }}>9:00 at Kingfisher Reserve</span>
            </span>
            <span style={{ fontSize: "14px", lineHeight: "20px" }}>League game with the partner club</span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Planned</span>
          </button>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>The same planning tools a club coach has: suggestions with reasons, the drill library, session plans, who’s coming, and growth and load.</span>
        </section>
        <aside style={{ display: "flex", flexDirection: "column", gap: "14px", minHeight: "0" }}>
          <section aria-label="This fortnight’s theme" style={{ ...C.tile, flex: "none", gap: "6px", border: "2px solid #2f6252" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ ...C.h2 }}>This fortnight’s theme</h2>
            </div>
            <span style={{ fontSize: "15px", lineHeight: "22px" }}>Receiving on the half-turn</span>
            <span style={{ ...C.cap }}>Set by Dani for every group. Your sessions build on it at each level.</span>
          </section>
          <section aria-label="From Sunday’s game" style={{ ...C.tile, flex: "none", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ ...C.h2 }}>From Sunday’s game</h2>
              <button onClick={() => demoToast("Sunday’s match review opens.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", color: "#2f6252", fontSize: "14px", fontWeight: "700", textDecoration: "none", minHeight: "44px", display: "flex", alignItems: "center" }}>Review</button>
            </div>
            <span style={{ ...C.cap }}>The U13s received facing their own goal 31 times and lost it 12. Tuesday’s session comes from that.</span>
          </section>
          <section aria-label="Load this week" style={{ ...C.tile, flex: "1 1 0", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ ...C.h2 }}>Load this week</h2>
            </div>
            <span style={{ ...C.cap }}>Kai Okonkwo also trains twice with his club. He is at 4 sessions; the limit you set is 5.</span>
          </section>
        </aside>
      </main>
    </div>
  )
}
