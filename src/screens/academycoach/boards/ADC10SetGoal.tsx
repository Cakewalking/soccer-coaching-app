// ADC10-SetGoal, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
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
] as const

export default function ADC10SetGoal({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const [pick, setPick] = useState<number[]>([3, 0])   // which choice is tapped in each group
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ADC10-SetGoal" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="players" sub="Player file" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>A goal with Kai</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Kai Okonkwo, 13 · Advanced · chosen together, in his words</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ADC1-PlayerFile")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Cancel</button>
          <button onClick={() => go("ADC1-PlayerFile")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Save the goal</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 340px" }}>
        <section aria-label="This term’s goal" style={{ ...C.tile, gap: "14px" }}>
          <h2 style={{ ...C.h2 }}>This term’s goal</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>Which skill</span>
            <div role="radiogroup" aria-label="Which skill" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button role="radio" aria-checked={pick[0] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 0 : v)); demoToast("First touch: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 0 ? R[0].on : R[0].off) }}>First touch</button>
              <button role="radio" aria-checked={pick[0] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 1 : v)); demoToast("Running with the ball: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 1 ? R[0].on : R[0].off) }}>Running with the ball</button>
              <button role="radio" aria-checked={pick[0] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 2 : v)); demoToast("One against one: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 2 ? R[0].on : R[0].off) }}>One against one</button>
              <button role="radio" aria-checked={pick[0] === 3} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 3 : v)); demoToast("Striking the ball: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 3 ? R[0].on : R[0].off) }}>Striking the ball</button>
              <button role="radio" aria-checked={pick[0] === 4} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 4 : v)); demoToast("Something else: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 4 ? R[0].on : R[0].off) }}>Something else</button>
            </div>
          </div>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            The goal, in Kai’s words
            <textarea defaultValue="Score with my left foot in a game" rows={1} style={{ minHeight: "48px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            How we’ll know
            <textarea defaultValue="One left-foot goal in a game, on film or seen by a coach" rows={1} style={{ minHeight: "48px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>By when</span>
            <div role="radiogroup" aria-label="By when" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button role="radio" aria-checked={pick[1] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 0 : v)); demoToast("End of this term: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[1] === 0 ? R[1].on : R[1].off) }}>End of this term</button>
              <button role="radio" aria-checked={pick[1] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 1 : v)); demoToast("End of next term: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[1] === 1 ? R[1].on : R[1].off) }}>End of next term</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>Ideas from your notes and the skills check</span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button onClick={() => demoToast("Filled in. Change the words to Kai’s own.")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 14px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "inline-flex", alignItems: "center", fontSize: "14px", textDecoration: "none" }}>Weaker-foot hits: 3 of 10</button>
              <button onClick={() => demoToast("Filled in. Change the words to Kai’s own.")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 14px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "inline-flex", alignItems: "center", fontSize: "14px", textDecoration: "none" }}>Finds space late</button>
              <button onClick={() => demoToast("Filled in. Change the words to Kai’s own.")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 14px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "inline-flex", alignItems: "center", fontSize: "14px", textDecoration: "none" }}>First touch under pressure</button>
            </div>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Opens from the player file, My group (“Set one”), and the last step of a review chat.</span>
        </section>
        <aside aria-label="Where the goal shows" style={{ ...C.tile, gap: "2px" }}>
          <h2 style={{ ...C.h2 }}>Where the goal shows</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Kai’s own app</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>On his home screen</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>His family’s app</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>With this week’s practice</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Your sessions</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Suggested drills lean towards it</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>4</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>The term report</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Whether he got there</span>
            </span>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>One goal at a time. For a child under 13 the parent sees it first and can ask to change it.</span>
        </aside>
      </main>
    </div>
  )
}
