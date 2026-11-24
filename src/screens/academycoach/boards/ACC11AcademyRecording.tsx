// ACC11-AcademyRecording, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  num: { fontVariantNumeric: "tabular-nums" },
} as const

export default function ACC11AcademyRecording({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC11-AcademyRecording" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#1f4a3e", color: "#ffffff", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", height: "64px", padding: "0 28px", display: "flex", alignItems: "center", gap: "14px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "32px", padding: "0 12px", borderRadius: "999px", background: "#ffffff", color: "#10211f", fontSize: "13px", fontWeight: "700" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "999px", background: "#2f6252" }} />
          Recording
        </span>
        <span style={{ flexGrow: "1", fontSize: "17px", fontWeight: "700" }}>Finishing circuit · run 3</span>
        <span style={{ fontSize: "14px", color: "#cfe6dc" }}>Works with no signal. Uploads when you’re back online.</span>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "0 28px 24px", display: "grid", gridTemplateColumns: "minmax(0,1fr) 380px", gap: "16px" }}>
        <section aria-label="Round" style={{ background: "rgba(255,255,255,0.08)", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#cfe6dc" }}>Round 2 of 3</span>
          <span style={{ ...C.num, fontSize: "120px", lineHeight: "136px", fontWeight: "700", letterSpacing: "-0.03em" }}>1:42</span>
          <span style={{ fontSize: "17px", lineHeight: "24px", color: "#e1efe9" }}>Left in this round. Say: “Open your hips, lock the ankle, pick your corner.”</span>
          <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
            <button onClick={() => demoToast("Round 3 started.")} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "64px", borderRadius: "14px", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "700", textDecoration: "none" }}>Next round</button>
            <button onClick={() => demoToast("Moment marked at 1:42. You’ll find it in the clips.")} style={{ padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "64px", borderRadius: "14px", border: "2px solid #ffffff", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "18px", fontWeight: "700", textDecoration: "none", boxSizing: "border-box" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 21V5l10 4-10 4" />
              </svg>
              Mark a moment
            </button>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => demoToast("Paused. Nothing is lost.")} style={{ padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "52px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.5)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "700", textDecoration: "none", boxSizing: "border-box" }}>Pause</button>
            <button onClick={() => go("ACC10-AcademyRecordResults")} style={{ padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "52px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.5)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "700", textDecoration: "none", boxSizing: "border-box" }}>Stop and save</button>
          </div>
        </section>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", minHeight: "0" }}>
          <section aria-label="Kit" style={{ background: "#ffffff", color: "#10211f", borderRadius: "20px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "0" }}>
            <h2 style={{ ...C.h2, marginBottom: "6px" }}>Capturing</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "50px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5 9-10" />
                </svg>
              </span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Academy camera</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>All three stations in view</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "50px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5 9-10" />
                </svg>
              </span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>GPS vests</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Not used tonight</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "50px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>!</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Boot sensors</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>19 of 20 · Zane’s aren’t on</span>
              </span>
            </div>
          </section>
          <section aria-label="So far" style={{ flexGrow: "1", background: "#ffffff", color: "#10211f", borderRadius: "20px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <h2 style={{ ...C.h2 }}>So far tonight</h2>
            <span style={{ ...C.num, fontSize: "44px", lineHeight: "54px", fontWeight: "700", color: "#2f6252" }}>10 of 16</span>
            <span style={{ fontSize: "15px", lineHeight: "21px" }}>weaker-foot shots on target</span>
            <span style={{ ...C.cap, marginTop: "auto" }}>Last run they finished on 52%. Full results about 10 minutes after you stop.</span>
          </section>
        </div>
      </main>
    </div>
  )
}
