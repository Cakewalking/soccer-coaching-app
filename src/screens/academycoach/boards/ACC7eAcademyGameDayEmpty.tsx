// ACC7e-AcademyGameDayEmpty, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext } from 'react'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACC7eAcademyGameDayEmpty({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC7e-AcademyGameDayEmpty" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="gameday" sub="This Sunday" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Game day</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>No game team yet</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }} />
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 320px" }}>
        <section aria-label="Game day" style={{ ...C.tile }}>
          <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", textAlign: "center" }}>
            <span style={{ width: "72px", height: "72px", borderRadius: "999px", background: "#eef5f2", color: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z" />
              </svg>
            </span>
            <span style={{ fontSize: "22px", lineHeight: "28px", fontWeight: "700", letterSpacing: "-0.01em" }}>Your groups only train for now</span>
            <span style={{ fontSize: "15px", lineHeight: "22px", color: "#4a5a57", maxWidth: "460px" }}>If the academy links with a club, your game team’s fixtures, team sheet and reviews show here.</span>
            <button onClick={() => go("ACC1-CoachToday")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Back to today</button>
          </div>
        </section>
        <aside aria-label="With a game team" style={{ ...C.tile }}>
          <h2 style={{ ...C.h2 }}>With a game team</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Fixtures arrive</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>From the club’s league</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>One team sheet</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Checked against registrations</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Reviews feed training</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>And each player’s plan</span>
            </span>
          </div>
        </aside>
      </main>
    </div>
  )
}
