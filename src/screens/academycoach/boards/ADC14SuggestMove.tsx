// ADC14-SuggestMove, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext, useState } from 'react'
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

// A tapped choice and an untapped one, for each group of choices.
const R = [
  { on: { background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }, off: { background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" } },
  { on: { background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }, off: { background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" } },
  { on: { background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }, off: { background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" } },
  { on: { background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }, off: { background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" } },
] as const

export default function ADC14SuggestMove({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const [pick, setPick] = useState<number[]>([2, 2, 1, 2])   // which choice is tapped in each group
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ADC14-SuggestMove" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="players" sub="Player file" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Suggest a move</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Ruby Sandhu, 10 · Development to Advanced · for Term 3</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ADC1-PlayerFile")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Cancel</button>
          <button onClick={() => demoToast("Sent to Dani. Ruby’s family hears nothing until Dani agrees.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Send to Dani</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 340px" }}>
        <section aria-label="What you’ve seen" style={{ ...C.tile, gap: "14px" }}>
          <h2 style={{ ...C.h2 }}>What you’ve seen</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>With the ball</span>
            <div role="radiogroup" aria-label="With the ball" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button role="radio" aria-checked={pick[0] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 0 : v)); demoToast("Not yet: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 0 ? R[0].on : R[0].off) }}>Not yet</button>
              <button role="radio" aria-checked={pick[0] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 1 : v)); demoToast("Some: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 1 ? R[0].on : R[0].off) }}>Some</button>
              <button role="radio" aria-checked={pick[0] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 2 : v)); demoToast("Strong: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 2 ? R[0].on : R[0].off) }}>Strong</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>Game sense</span>
            <div role="radiogroup" aria-label="Game sense" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button role="radio" aria-checked={pick[1] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 0 : v)); demoToast("Not yet: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[1] === 0 ? R[1].on : R[1].off) }}>Not yet</button>
              <button role="radio" aria-checked={pick[1] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 1 : v)); demoToast("Some: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[1] === 1 ? R[1].on : R[1].off) }}>Some</button>
              <button role="radio" aria-checked={pick[1] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 2 : v)); demoToast("Strong: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[1] === 2 ? R[1].on : R[1].off) }}>Strong</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>Body</span>
            <div role="radiogroup" aria-label="Body" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button role="radio" aria-checked={pick[2] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 0 : v)); demoToast("Not yet: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[2] === 0 ? R[2].on : R[2].off) }}>Not yet</button>
              <button role="radio" aria-checked={pick[2] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 1 : v)); demoToast("Some: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[2] === 1 ? R[2].on : R[2].off) }}>Some</button>
              <button role="radio" aria-checked={pick[2] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 2 : v)); demoToast("Strong: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[2] === 2 ? R[2].on : R[2].off) }}>Strong</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>Head</span>
            <div role="radiogroup" aria-label="Head" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button role="radio" aria-checked={pick[3] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 3 ? 0 : v)); demoToast("Not yet: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[3] === 0 ? R[3].on : R[3].off) }}>Not yet</button>
              <button role="radio" aria-checked={pick[3] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 3 ? 1 : v)); demoToast("Some: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[3] === 1 ? R[3].on : R[3].off) }}>Some</button>
              <button role="radio" aria-checked={pick[3] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 3 ? 2 : v)); demoToast("Strong: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[3] === 2 ? R[3].on : R[3].off) }}>Strong</button>
            </div>
          </div>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            Your view, in one line
            <textarea defaultValue="Ready now. Wins most one-against-ones in her group." rows={1} style={{ minHeight: "48px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>Clips that show it · 2 picked</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => demoToast("The clip plays.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px", textDecoration: "none", color: "#10211f" }}>
                <span style={{ height: "64px", borderRadius: "10px", background: "linear-gradient(140deg,#1c3a33,#40826d)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 5l11 7-11 7z" />
                  </svg>
                </span>
                <strong style={{ fontSize: "13px", lineHeight: "17px" }}>Beats two</strong>
                <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>Tue 2 June</span>
              </button>
              <button onClick={() => demoToast("The clip plays.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px", textDecoration: "none", color: "#10211f" }}>
                <span style={{ height: "64px", borderRadius: "10px", background: "linear-gradient(165deg,#1c3a33,#40826d)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 5l11 7-11 7z" />
                  </svg>
                </span>
                <strong style={{ fontSize: "13px", lineHeight: "17px" }}>First touch, turn</strong>
                <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>Thu 28 May</span>
              </button>
              <button onClick={() => demoToast("The clip plays.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px", textDecoration: "none", color: "#10211f" }}>
                <span style={{ height: "64px", borderRadius: "10px", background: "linear-gradient(215deg,#1c3a33,#40826d)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 5l11 7-11 7z" />
                  </svg>
                </span>
                <strong style={{ fontSize: "13px", lineHeight: "17px" }}>Add a clip</strong>
                <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>From her file</span>
              </button>
            </div>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Opens from the player file. You can also suggest a move down, or staying put for another term.</span>
        </section>
        <aside aria-label="What happens next" style={{ ...C.tile, gap: "2px" }}>
          <h2 style={{ ...C.h2 }}>What happens next</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Dani decides</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>She sees your checks and clips</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>The family is asked</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>With the reason, the time and the price</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Two sessions</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>In the new group, then everyone decides</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>4</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Nothing changes</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Until the family agrees</span>
            </span>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>The four checks start from your notes and the skills check. Change any of them.</span>
        </aside>
      </main>
    </div>
  )
}
