// ACC8e-AcademyRecordEmpty, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
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

export default function ACC8eAcademyRecordEmpty({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC8e-AcademyRecordEmpty" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="record" sub="Record" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Record</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>No camera or sensors paired yet</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }} />
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 320px" }}>
        <section aria-label="Record" style={{ ...C.tile }}>
          <div style={{ flexGrow: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", textAlign: "center" }}>
            <span style={{ width: "72px", height: "72px", borderRadius: "999px", background: "#eef5f2", color: "#2f6252", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 7h11v10H4zM15 10l5-3v10l-5-3" />
              </svg>
            </span>
            <span style={{ fontSize: "22px", lineHeight: "28px", fontWeight: "700", letterSpacing: "-0.01em" }}>Pair a camera, or start with your phone</span>
            <span style={{ fontSize: "15px", lineHeight: "22px", color: "#4a5a57", maxWidth: "460px" }}>Any camera that saves a video file works. With no kit you can still count by hand, and it goes into each player’s notes.</span>
            <button onClick={() => demoToast("Opens devices. Hold the camera near the tablet.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Pair a camera</button>
            <button onClick={() => go("ACC9-AcademyRecordDrill")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Count by hand</button>
          </div>
        </section>
        <aside aria-label="What each bit of kit adds" style={{ ...C.tile }}>
          <h2 style={{ ...C.h2 }}>What each bit of kit adds</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>A camera</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Clips for parents and term reports</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Boot sensors</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Touches, and which foot</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Nothing at all</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Your own count still works</span>
            </span>
          </div>
        </aside>
      </main>
    </div>
  )
}
