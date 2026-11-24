// ADC15-MySession, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
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

export default function ADC15MySession({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const [pick, setPick] = useState<number[]>([2, 3, 3, 3])   // which choice is tapped in each group
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ADC15-MySession" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="record" sub="Tonight’s film" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>How did it go?</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Your own view · U13 Timber · Thursday 4 June · before Dani watches</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ADC3-SessionFilm")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Watch it first</button>
          <button onClick={() => demoToast("Sent. Dani can now watch and add her view beside yours.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Send to Dani</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 340px" }}>
        <section aria-label="Four quick ratings" style={{ ...C.tile, gap: "14px" }}>
          <h2 style={{ ...C.h2 }}>Four quick ratings</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", fontSize: "15px", fontWeight: "700" }}>Ball rolling</span>
            <span role="radiogroup" aria-label="Ball rolling" style={{ display: "flex", gap: "6px" }}>
              <button role="radio" aria-checked={pick[0] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 0 : v)); demoToast("Ball rolling: 1 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(0 <= pick[0] ? R[0].on : R[0].off) }}>1</button>
              <button role="radio" aria-checked={pick[0] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 1 : v)); demoToast("Ball rolling: 2 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(1 <= pick[0] ? R[0].on : R[0].off) }}>2</button>
              <button role="radio" aria-checked={pick[0] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 2 : v)); demoToast("Ball rolling: 3 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(2 <= pick[0] ? R[0].on : R[0].off) }}>3</button>
              <button role="radio" aria-checked={pick[0] === 3} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 3 : v)); demoToast("Ball rolling: 4 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(3 <= pick[0] ? R[0].on : R[0].off) }}>4</button>
              <button role="radio" aria-checked={pick[0] === 4} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 4 : v)); demoToast("Ball rolling: 5 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(4 <= pick[0] ? R[0].on : R[0].off) }}>5</button>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", fontSize: "15px", fontWeight: "700" }}>Clear, short words</span>
            <span role="radiogroup" aria-label="Clear, short words" style={{ display: "flex", gap: "6px" }}>
              <button role="radio" aria-checked={pick[1] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 0 : v)); demoToast("Clear, short words: 1 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(0 <= pick[1] ? R[1].on : R[1].off) }}>1</button>
              <button role="radio" aria-checked={pick[1] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 1 : v)); demoToast("Clear, short words: 2 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(1 <= pick[1] ? R[1].on : R[1].off) }}>2</button>
              <button role="radio" aria-checked={pick[1] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 2 : v)); demoToast("Clear, short words: 3 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(2 <= pick[1] ? R[1].on : R[1].off) }}>3</button>
              <button role="radio" aria-checked={pick[1] === 3} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 3 : v)); demoToast("Clear, short words: 4 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(3 <= pick[1] ? R[1].on : R[1].off) }}>4</button>
              <button role="radio" aria-checked={pick[1] === 4} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 4 : v)); demoToast("Clear, short words: 5 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(4 <= pick[1] ? R[1].on : R[1].off) }}>5</button>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", fontSize: "15px", fontWeight: "700" }}>Every child noticed</span>
            <span role="radiogroup" aria-label="Every child noticed" style={{ display: "flex", gap: "6px" }}>
              <button role="radio" aria-checked={pick[2] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 0 : v)); demoToast("Every child noticed: 1 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(0 <= pick[2] ? R[2].on : R[2].off) }}>1</button>
              <button role="radio" aria-checked={pick[2] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 1 : v)); demoToast("Every child noticed: 2 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(1 <= pick[2] ? R[2].on : R[2].off) }}>2</button>
              <button role="radio" aria-checked={pick[2] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 2 : v)); demoToast("Every child noticed: 3 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(2 <= pick[2] ? R[2].on : R[2].off) }}>3</button>
              <button role="radio" aria-checked={pick[2] === 3} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 3 : v)); demoToast("Every child noticed: 4 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(3 <= pick[2] ? R[2].on : R[2].off) }}>4</button>
              <button role="radio" aria-checked={pick[2] === 4} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 4 : v)); demoToast("Every child noticed: 5 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(4 <= pick[2] ? R[2].on : R[2].off) }}>5</button>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", fontSize: "15px", fontWeight: "700" }}>Followed the plan</span>
            <span role="radiogroup" aria-label="Followed the plan" style={{ display: "flex", gap: "6px" }}>
              <button role="radio" aria-checked={pick[3] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 3 ? 0 : v)); demoToast("Followed the plan: 1 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(0 <= pick[3] ? R[3].on : R[3].off) }}>1</button>
              <button role="radio" aria-checked={pick[3] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 3 ? 1 : v)); demoToast("Followed the plan: 2 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(1 <= pick[3] ? R[3].on : R[3].off) }}>2</button>
              <button role="radio" aria-checked={pick[3] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 3 ? 2 : v)); demoToast("Followed the plan: 3 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(2 <= pick[3] ? R[3].on : R[3].off) }}>3</button>
              <button role="radio" aria-checked={pick[3] === 3} onClick={() => { setPick(p => p.map((v, k) => k === 3 ? 3 : v)); demoToast("Followed the plan: 4 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(3 <= pick[3] ? R[3].on : R[3].off) }}>4</button>
              <button role="radio" aria-checked={pick[3] === 4} onClick={() => { setPick(p => p.map((v, k) => k === 3 ? 4 : v)); demoToast("Followed the plan: 5 of 5.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", width: "44px", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", ...(4 <= pick[3] ? R[3].on : R[3].off) }}>5</button>
            </span>
          </div>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            One thing I’d change
            <textarea defaultValue="The finishing drill had one goal for 20. I’d set up three." rows={3} style={{ minHeight: "72px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
          </label>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>You are asked after any session Dani plans to watch.</span>
        </section>
        <aside aria-label="How this is used" style={{ ...C.tile, gap: "2px" }}>
          <h2 style={{ ...C.h2 }}>How this is used</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>You go first</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Dani can’t add hers until you have</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Side by side</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>You both see both</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>One thing to try</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Agreed in a short chat</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>4</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Never for pay</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>And never shown to families</span>
            </span>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Only you and the owner see this.</span>
        </aside>
      </main>
    </div>
  )
}
