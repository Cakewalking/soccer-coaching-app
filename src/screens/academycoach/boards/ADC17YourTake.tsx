// ADC17-YourTake, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
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
] as const

export default function ADC17YourTake({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const [pick, setPick] = useState<number[]>([1])   // which choice is tapped in each group
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ADC17-YourTake" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="gameday" sub="Review" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Your take</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>U13 Timber v Eastbank · Sunday 31 May · won 3–1 · two minutes, typed or spoken</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ADC7-GameReview")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Back to the review</button>
          <button onClick={() => go("ADC7-GameReview")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Save</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 340px" }}>
        <section aria-label="Three short answers" style={{ ...C.tile, gap: "14px" }}>
          <h2 style={{ ...C.h2 }}>Three short answers</h2>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            What went well
            <textarea defaultValue="We won it back high and went straight at them. Kai’s left-foot goal." rows={3} style={{ minHeight: "72px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            What didn’t
            <textarea defaultValue="Too slow to react when we lost it. One pressed, the rest watched." rows={3} style={{ minHeight: "72px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            One thing for Thursday
            <textarea defaultValue="Press as a group of three." rows={1} style={{ minHeight: "48px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
            <span style={{ fontSize: "12px", fontWeight: "400", color: "#4a5a57" }}>This is offered as the theme for Thursday’s plan.</span>
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>Did the numbers match what you saw?</span>
            <div role="radiogroup" aria-label="Did the numbers match what you saw?" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button role="radio" aria-checked={pick[0] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 0 : v)); demoToast("Yes: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 0 ? R[0].on : R[0].off) }}>Yes</button>
              <button role="radio" aria-checked={pick[0] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 1 : v)); demoToast("Mostly: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 1 ? R[0].on : R[0].off) }}>Mostly</button>
              <button role="radio" aria-checked={pick[0] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 2 : v)); demoToast("No: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 2 ? R[0].on : R[0].off) }}>No</button>
            </div>
          </div>
          <button onClick={() => demoToast("Hold to talk. Up to a minute. It is typed out for you to check.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, alignSelf: "flex-start" }}>Say it instead</button>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Three answers, in your words. Skip any of them.</span>
        </section>
        <aside aria-label="Where it goes" style={{ ...C.tile, gap: "2px" }}>
          <h2 style={{ ...C.h2 }}>Where it goes</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Beside the numbers</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>On the game review, for you</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Into Thursday’s plan</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Your “one thing” leads the suggestions</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Dani can read it</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>As the academy’s owner</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>4</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Not to families</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Unless you put a line in a report</span>
            </span>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>If you say the numbers didn’t match, you’re asked which one, and it is checked.</span>
        </aside>
      </main>
    </div>
  )
}
