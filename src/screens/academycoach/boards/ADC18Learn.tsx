// ADC18-Learn, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
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

export default function ADC18Learn({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ADC18-Learn" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="learn" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Learn</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Reece · picked from your block, your sessions and How we coach</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ASK3-AskOpen")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Ask a question</button>
          <button onClick={() => demoToast("The lesson opens where you left it.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Carry on: asking, not telling</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 340px" }}>
        <section aria-label="For you this week" style={{ ...C.tile, gap: "0", padding: "14px 18px 10px", gridColumn: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>For you this week</h2>
            <span style={{ ...C.cap }}>4 of 23</span>
          </div>
          <button onClick={() => demoToast("Coaching the weaker foot: the lesson opens. Short clips, one idea, one thing to try.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "96px minmax(0,1fr) 100px", gap: "14px", alignItems: "center", minHeight: "92px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ height: "64px", borderRadius: "12px", background: "linear-gradient(140deg,#1c3a33,#40826d)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 5l11 7-11 7z" />
              </svg>
            </span>
            <span style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: "16px", lineHeight: "21px" }}>Coaching the weaker foot</strong>
              <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>4 min · follows this block</span>
            </span>
            <span style={{ justifySelf: "end" }}>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>New</span>
            </span>
          </button>
          <button onClick={() => demoToast("Asking, not telling: the lesson opens. Short clips, one idea, one thing to try.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "96px minmax(0,1fr) 100px", gap: "14px", alignItems: "center", minHeight: "92px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ height: "64px", borderRadius: "12px", background: "linear-gradient(164deg,#1c3a33,#40826d)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 5l11 7-11 7z" />
              </svg>
            </span>
            <span style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: "16px", lineHeight: "21px" }}>Asking, not telling</strong>
              <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>6 min · 3 clips from Tall Timber sessions</span>
            </span>
            <span style={{ justifySelf: "end" }}>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e8cfcf", color: "#10211f" }}>Half done</span>
            </span>
          </button>
          <button onClick={() => demoToast("Keeping 20 players busy with one goal: the lesson opens. Short clips, one idea, one thing to try.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "96px minmax(0,1fr) 100px", gap: "14px", alignItems: "center", minHeight: "92px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ height: "64px", borderRadius: "12px", background: "linear-gradient(188deg,#1c3a33,#40826d)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 5l11 7-11 7z" />
              </svg>
            </span>
            <span style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: "16px", lineHeight: "21px" }}>Keeping 20 players busy with one goal</strong>
              <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>3 min · from Thursday’s film</span>
            </span>
            <span style={{ justifySelf: "end" }}>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#eef5f2", color: "#2f6252" }}>For you</span>
            </span>
          </button>
          <button onClick={() => demoToast("Growth spurts and sprinting: the lesson opens. Short clips, one idea, one thing to try.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "96px minmax(0,1fr) 100px", gap: "14px", alignItems: "center", minHeight: "92px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ height: "64px", borderRadius: "12px", background: "linear-gradient(212deg,#1c3a33,#40826d)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 5l11 7-11 7z" />
              </svg>
            </span>
            <span style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: "16px", lineHeight: "21px" }}>Growth spurts and sprinting</strong>
              <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>5 min · for coaches of 11 to 14s</span>
            </span>
            <span style={{ justifySelf: "end" }}>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e9eae8", color: "#10211f" }}>Done</span>
            </span>
          </button>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Lessons are short on purpose. Each ends with one thing to try at your next session.</span>
        </section>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", minHeight: "0" }}>
          <section aria-label="The academy’s way" style={{ ...C.tile, gap: "6px" }}>
            <h2 style={{ ...C.h2 }}>Tall Timber’s way</h2>
            <span style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: "15px", lineHeight: "20px" }}>How we coach</strong>
              <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Session shape, rules and the words we use</span>
            </span>
            <button onClick={() => go("AD7-HowWeCoach")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, alignSelf: "flex-start" }}>Read it</button>
          </section>
          <section aria-label="From your own sessions" style={{ ...C.tile, gap: "8px", flexGrow: "1" }}>
            <h2 style={{ ...C.h2 }}>From your own sessions</h2>
            <span style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: "15px", lineHeight: "20px" }}>Your own view of Thursday</strong>
              <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Four quick ratings before Dani watches</span>
            </span>
            <button onClick={() => go("ADC15-MySession")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, alignSelf: "flex-start" }}>Open</button>
            <span style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: "15px", lineHeight: "20px" }}>Tonight’s film</strong>
              <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>38 moments, by player</span>
            </span>
            <button onClick={() => go("ADC3-SessionFilm")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, alignSelf: "flex-start" }}>Open</button>
            <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Nothing here is a test. Nobody sees what you have or haven’t watched.</span>
          </section>
        </div>
      </main>
    </div>
  )
}
