// ADC11-AfterSession, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext, useState } from 'react'
import { demoToast } from '../../demoToast'
import { closeSession } from '../steps'
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
  { on: { background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }, off: { background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" } },
  { on: { background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }, off: { background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" } },
] as const

export default function ADC11AfterSession({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const [pick, setPick] = useState<number[]>([1, 0, 0, 1, 0, 1])   // which choice is tapped in each group
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ADC11-AfterSession" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="today" sub="Run a session" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>After the session</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Advanced · Thursday 4 June · 20 came · today’s skill: striking the ball</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ACC1-CoachToday")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Finish later</button>
          <button onClick={() => { closeSession(pick.map(p => p === 1)); go("ACC1-CoachToday") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Done · 6 of 20 marked</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 340px" }}>
        <section aria-label="Two taps each" style={{ ...C.tile, gap: "14px" }}>
          <h2 style={{ ...C.h2 }}>Two taps each</h2>
          <div style={{ display: "grid", gridTemplateColumns: "40px minmax(0,1fr) 190px minmax(0,1fr) 44px", gap: "10px", alignItems: "center", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>KO</span>
            <strong style={{ fontSize: "15px" }}>Kai Okonkwo</strong>
            <span role="radiogroup" aria-label="Kai Okonkwo: striking the ball today" style={{ display: "flex", gap: "6px" }}>
              <button role="radio" aria-checked={pick[0] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 0 : v)); demoToast("Kai Okonkwo: Same.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(pick[0] === 0 ? R[0].on : R[0].off) }}>Same</button>
              <button role="radio" aria-checked={pick[0] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 1 : v)); demoToast("Kai Okonkwo: Better.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(pick[0] === 1 ? R[0].on : R[0].off) }}>Better</button>
            </span>
            <button onClick={() => demoToast("Pick a quick note or type one.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", textDecoration: "none", color: "#10211f" }}>Used his left foot</button>
            <button aria-label="Say a note about Kai Okonkwo" onClick={() => demoToast("Hold to talk. Up to 30 seconds. It is typed out for you.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", color: "#10211f" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v9M8 9v2a4 4 0 008 0V9M12 17v3" />
              </svg>
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "40px minmax(0,1fr) 190px minmax(0,1fr) 44px", gap: "10px", alignItems: "center", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>AC</span>
            <strong style={{ fontSize: "15px" }}>Ana Costa</strong>
            <span role="radiogroup" aria-label="Ana Costa: striking the ball today" style={{ display: "flex", gap: "6px" }}>
              <button role="radio" aria-checked={pick[1] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 0 : v)); demoToast("Ana Costa: Same.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(pick[1] === 0 ? R[1].on : R[1].off) }}>Same</button>
              <button role="radio" aria-checked={pick[1] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 1 : v)); demoToast("Ana Costa: Better.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(pick[1] === 1 ? R[1].on : R[1].off) }}>Better</button>
            </span>
            <button onClick={() => demoToast("Pick a quick note or type one.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", textDecoration: "none", color: "#4a5a57" }}>Add a note</button>
            <button aria-label="Say a note about Ana Costa" onClick={() => demoToast("Hold to talk. Up to 30 seconds. It is typed out for you.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", color: "#10211f" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v9M8 9v2a4 4 0 008 0V9M12 17v3" />
              </svg>
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "40px minmax(0,1fr) 190px minmax(0,1fr) 44px", gap: "10px", alignItems: "center", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>JM</span>
            <strong style={{ fontSize: "15px" }}>Jonah Marsh</strong>
            <span role="radiogroup" aria-label="Jonah Marsh: striking the ball today" style={{ display: "flex", gap: "6px" }}>
              <button role="radio" aria-checked={pick[2] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 0 : v)); demoToast("Jonah Marsh: Same.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(pick[2] === 0 ? R[2].on : R[2].off) }}>Same</button>
              <button role="radio" aria-checked={pick[2] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 2 ? 1 : v)); demoToast("Jonah Marsh: Better.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(pick[2] === 1 ? R[2].on : R[2].off) }}>Better</button>
            </span>
            <button onClick={() => demoToast("Pick a quick note or type one.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", textDecoration: "none", color: "#10211f" }}>Quiet today</button>
            <button aria-label="Say a note about Jonah Marsh" onClick={() => demoToast("Hold to talk. Up to 30 seconds. It is typed out for you.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", color: "#10211f" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v9M8 9v2a4 4 0 008 0V9M12 17v3" />
              </svg>
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "40px minmax(0,1fr) 190px minmax(0,1fr) 44px", gap: "10px", alignItems: "center", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>LN</span>
            <strong style={{ fontSize: "15px" }}>Lola Nguyen</strong>
            <span role="radiogroup" aria-label="Lola Nguyen: striking the ball today" style={{ display: "flex", gap: "6px" }}>
              <button role="radio" aria-checked={pick[3] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 3 ? 0 : v)); demoToast("Lola Nguyen: Same.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(pick[3] === 0 ? R[3].on : R[3].off) }}>Same</button>
              <button role="radio" aria-checked={pick[3] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 3 ? 1 : v)); demoToast("Lola Nguyen: Better.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(pick[3] === 1 ? R[3].on : R[3].off) }}>Better</button>
            </span>
            <button onClick={() => demoToast("Pick a quick note or type one.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", textDecoration: "none", color: "#10211f" }}>Great effort</button>
            <button aria-label="Say a note about Lola Nguyen" onClick={() => demoToast("Hold to talk. Up to 30 seconds. It is typed out for you.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", color: "#10211f" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v9M8 9v2a4 4 0 008 0V9M12 17v3" />
              </svg>
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "40px minmax(0,1fr) 190px minmax(0,1fr) 44px", gap: "10px", alignItems: "center", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>ZA</span>
            <strong style={{ fontSize: "15px" }}>Zane Abbas</strong>
            <span role="radiogroup" aria-label="Zane Abbas: striking the ball today" style={{ display: "flex", gap: "6px" }}>
              <button role="radio" aria-checked={pick[4] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 4 ? 0 : v)); demoToast("Zane Abbas: Same.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(pick[4] === 0 ? R[4].on : R[4].off) }}>Same</button>
              <button role="radio" aria-checked={pick[4] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 4 ? 1 : v)); demoToast("Zane Abbas: Better.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(pick[4] === 1 ? R[4].on : R[4].off) }}>Better</button>
            </span>
            <button onClick={() => demoToast("Pick a quick note or type one.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", textDecoration: "none", color: "#4a5a57" }}>Add a note</button>
            <button aria-label="Say a note about Zane Abbas" onClick={() => demoToast("Hold to talk. Up to 30 seconds. It is typed out for you.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", color: "#10211f" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v9M8 9v2a4 4 0 008 0V9M12 17v3" />
              </svg>
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "40px minmax(0,1fr) 190px minmax(0,1fr) 44px", gap: "10px", alignItems: "center", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>IT</span>
            <strong style={{ fontSize: "15px" }}>Isla Tran</strong>
            <span role="radiogroup" aria-label="Isla Tran: striking the ball today" style={{ display: "flex", gap: "6px" }}>
              <button role="radio" aria-checked={pick[5] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 5 ? 0 : v)); demoToast("Isla Tran: Same.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(pick[5] === 0 ? R[5].on : R[5].off) }}>Same</button>
              <button role="radio" aria-checked={pick[5] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 5 ? 1 : v)); demoToast("Isla Tran: Better.") }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(pick[5] === 1 ? R[5].on : R[5].off) }}>Better</button>
            </span>
            <button onClick={() => demoToast("Pick a quick note or type one.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", textDecoration: "none", color: "#10211f" }}>Took her player on</button>
            <button aria-label="Say a note about Isla Tran" onClick={() => demoToast("Hold to talk. Up to 30 seconds. It is typed out for you.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", color: "#10211f" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v9M8 9v2a4 4 0 008 0V9M12 17v3" />
              </svg>
            </button>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Showing 6 of 20. Opens when you close a session in Run a session. Takes about three minutes.</span>
        </section>
        <aside aria-label="What the taps do" style={{ ...C.tile, gap: "2px" }}>
          <h2 style={{ ...C.h2 }}>What the taps do</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Move a step</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>“Better” in two sessions running moves a player up one step</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Fill the file</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Notes sit under the skill, with the date</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Draft the report</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>The term report is written from them</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>4</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Stay private</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Only academy coaches and the owner see notes</span>
            </span>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>A player you skip keeps their step. Nothing is ever marked down by a tap: to move a step down, open the file.</span>
        </aside>
      </main>
    </div>
  )
}
