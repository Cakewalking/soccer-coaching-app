// ACC1-CoachToday, as the academy pack draws it (handover v26, the home rebuilt in four parts: Now, Progress, Development, Oversight): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  num: { fontVariantNumeric: "tabular-nums" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACC1CoachToday({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC1-CoachToday" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="today" sub="Today" go={go} />}
      <main style={{ flexGrow: "1", minHeight: "0", padding: "14px 28px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <section aria-label="Now" style={{ flex: "none", borderRadius: "16px", background: "#ffffff", border: "1px solid #c5c8c4", padding: "8px 10px 8px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
          <strong style={{ fontSize: "15px", whiteSpace: "nowrap" }}>Today · Thu 4 June</strong>
          <button onClick={() => go("ACT3-AcademySessionPlan")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 14px", borderRadius: "12px", background: "#eef5f2", display: "inline-flex", flexDirection: "column", justifyContent: "center", textDecoration: "none", color: "#10211f", whiteSpace: "nowrap" }}>
            <strong style={{ fontSize: "13px", lineHeight: "16px" }}>4:30 Development</strong>
            <span style={{ fontSize: "12px", lineHeight: "15px", color: "#33443f" }}>14 coming · plan ready</span>
          </button>
          <button onClick={() => go("ACT3-AcademySessionPlan")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 14px", borderRadius: "12px", background: "#eef5f2", display: "inline-flex", flexDirection: "column", justifyContent: "center", textDecoration: "none", color: "#10211f", whiteSpace: "nowrap" }}>
            <strong style={{ fontSize: "13px", lineHeight: "16px" }}>5:30 Advanced</strong>
            <span style={{ fontSize: "12px", lineHeight: "15px", color: "#33443f" }}>20 coming · plan ready</span>
          </button>
          <button onClick={() => go("ACC5-OneOnOne")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 14px", borderRadius: "12px", background: "#eef5f2", display: "inline-flex", flexDirection: "column", justifyContent: "center", textDecoration: "none", color: "#10211f", whiteSpace: "nowrap" }}>
            <strong style={{ fontSize: "13px", lineHeight: "16px" }}>6:45 One-on-one</strong>
            <span style={{ fontSize: "12px", lineHeight: "15px", color: "#33443f" }}>Kai · left foot</span>
          </button>
          <span style={{ flexGrow: "1" }} />
          <button onClick={() => go("ACT2-AcademySuggested")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Swap a drill</button>
          <button onClick={() => go("ACC2-RunSession")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Start the 4:30</button>
        </section>
        <div style={{ flexGrow: "1", minHeight: "0", display: "grid", gridTemplateColumns: "minmax(0,1fr) 330px", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", minHeight: "0" }}>
            <section aria-label="Progress" style={{ flex: "none", borderRadius: "18px", background: "#1c3a33", color: "#ffffff", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span style={{ flexGrow: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.08em", color: "#f4c95d" }}>PROGRESS · ADVANCED · THIS TERM</span>
                  <strong style={{ fontSize: "25px", lineHeight: "31px", letterSpacing: "-0.01em" }}>Sixteen of your 22 now take their first touch away from pressure. In week 1, nine.</strong>
                  <span style={{ fontSize: "14px", lineHeight: "20px", color: "#cfe6dc" }}>Players on step 3 or higher, on each of the four core skills. The white line is week 1, “then”.</span>
                </span>
                <span style={{ flex: "none", display: "flex", flexDirection: "column", gap: "8px", alignItems: "stretch" }}>
                  <button onClick={() => demoToast("Then and now for four players, from the drill you filmed in weeks 3 and 7.")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", background: "#f4c95d", color: "#10211f", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M8 5l11 7-11 7z" />
                    </svg>
                    Play 45 seconds
                  </button>
                  <button onClick={() => go("ADC2-Group")} style={{ margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", border: "1px solid #ffffff", color: "#ffffff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap" }}>By player</button>
                </span>
              </div>
              <div style={{ display: "flex", gap: "18px", alignItems: "flex-end", marginTop: "4px" }}>
                <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "12px", lineHeight: "16px", color: "#cfe6dc", whiteSpace: "nowrap" }}>First touch</span>
                  <span role="img" aria-label="First touch: 9 then, 16 now, of 22" style={{ display: "block", position: "relative", height: "10px", borderRadius: "5px", background: "rgba(255,255,255,0.16)" }}>
                    <span style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "73%", borderRadius: "5px", background: "#f4c95d" }} />
                    <span style={{ position: "absolute", left: "41%", top: "-3px", width: "2px", height: "16px", background: "#ffffff" }} />
                  </span>
                  <span style={{ fontSize: "13px", color: "#ffffff" }}>
                    <strong style={{ ...C.num }}>16</strong>
                    {" now · 9 then"}
                  </span>
                </span>
                <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "12px", lineHeight: "16px", color: "#cfe6dc", whiteSpace: "nowrap" }}>Running with the ball</span>
                  <span role="img" aria-label="Running with the ball: 12 then, 17 now, of 22" style={{ display: "block", position: "relative", height: "10px", borderRadius: "5px", background: "rgba(255,255,255,0.16)" }}>
                    <span style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "77%", borderRadius: "5px", background: "#f4c95d" }} />
                    <span style={{ position: "absolute", left: "55%", top: "-3px", width: "2px", height: "16px", background: "#ffffff" }} />
                  </span>
                  <span style={{ fontSize: "13px", color: "#ffffff" }}>
                    <strong style={{ ...C.num }}>17</strong>
                    {" now · 12 then"}
                  </span>
                </span>
                <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "12px", lineHeight: "16px", color: "#cfe6dc", whiteSpace: "nowrap" }}>One against one</span>
                  <span role="img" aria-label="One against one: 10 then, 15 now, of 22" style={{ display: "block", position: "relative", height: "10px", borderRadius: "5px", background: "rgba(255,255,255,0.16)" }}>
                    <span style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "68%", borderRadius: "5px", background: "#f4c95d" }} />
                    <span style={{ position: "absolute", left: "45%", top: "-3px", width: "2px", height: "16px", background: "#ffffff" }} />
                  </span>
                  <span style={{ fontSize: "13px", color: "#ffffff" }}>
                    <strong style={{ ...C.num }}>15</strong>
                    {" now · 10 then"}
                  </span>
                </span>
                <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "12px", lineHeight: "16px", color: "#cfe6dc", whiteSpace: "nowrap" }}>Striking the ball</span>
                  <span role="img" aria-label="Striking the ball: 5 then, 8 now, of 22" style={{ display: "block", position: "relative", height: "10px", borderRadius: "5px", background: "rgba(255,255,255,0.16)" }}>
                    <span style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "36%", borderRadius: "5px", background: "#f4c95d" }} />
                    <span style={{ position: "absolute", left: "23%", top: "-3px", width: "2px", height: "16px", background: "#ffffff" }} />
                  </span>
                  <span style={{ fontSize: "13px", color: "#ffffff" }}>
                    <strong style={{ ...C.num }}>8</strong>
                    {" now · 5 then"}
                  </span>
                </span>
              </div>
            </section>
            <section aria-label="Development" style={{ ...C.tile, gap: "8px", padding: "12px 16px", flexGrow: "1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h2 style={{ ...C.h2 }}>Development · every player, this term</h2>
                <button onClick={() => go("ADC2-Group")} style={{ border: "0", padding: "0", margin: "-12px 0", background: "transparent", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", color: "#2f6252", display: "inline-flex", alignItems: "center", minHeight: "44px", fontSize: "14px", fontWeight: "700" }}>My group</button>
              </div>
              <div style={{ display: "flex", gap: "4px", flexWrap: "nowrap" }}>
                <button aria-label="KO: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>KO</span></button>
                <button aria-label="AC: same step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#ffffff", color: "#10211f", border: "1.5px solid #c5c8c4" }}>AC</span></button>
                <button aria-label="JM: no notes in three weeks" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#ffffff", color: "#4a5a57", border: "1.5px dashed #8a9794" }}>JM</span></button>
                <button aria-label="FB: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>FB</span></button>
                <button aria-label="LN: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>LN</span></button>
                <button aria-label="ZA: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>ZA</span></button>
                <button aria-label="IT: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>IT</span></button>
                <button aria-label="NP: no notes in three weeks" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#ffffff", color: "#4a5a57", border: "1.5px dashed #8a9794" }}>NP</span></button>
                <button aria-label="ML: no notes in three weeks" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#ffffff", color: "#4a5a57", border: "1.5px dashed #8a9794" }}>ML</span></button>
                <button aria-label="RD: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>RD</span></button>
                <button aria-label="TS: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>TS</span></button>
                <button aria-label="EK: same step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#ffffff", color: "#10211f", border: "1.5px solid #c5c8c4" }}>EK</span></button>
                <button aria-label="OB: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>OB</span></button>
                <button aria-label="HW: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>HW</span></button>
                <button aria-label="PG: same step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#ffffff", color: "#10211f", border: "1.5px solid #c5c8c4" }}>PG</span></button>
                <button aria-label="SV: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>SV</span></button>
                <button aria-label="DC: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>DC</span></button>
                <button aria-label="WM: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>WM</span></button>
                <button aria-label="YA: same step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#ffffff", color: "#10211f", border: "1.5px solid #c5c8c4" }}>YA</span></button>
                <button aria-label="BN: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>BN</span></button>
                <button aria-label="CF: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>CF</span></button>
                <button aria-label="GH: up a step" onClick={() => go("ADC1-PlayerFile")} style={{ border: "0", padding: "0", margin: "-7px 0", background: "transparent", font: "inherit", cursor: "pointer", flex: "none", width: "30px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "30px", height: "30px", borderRadius: "999px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", background: "#2f6252", color: "#ffffff" }}>GH</span></button>
              </div>
              <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#33443f" }}>
                  <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
                  15 up a step
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#33443f" }}>
                  <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
                  4 on the same step
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#33443f" }}>
                  <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px dashed #8a9794" }} />
                  3 with no notes in 3 weeks
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
                <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>KO</span>
                <span style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Kai is up a step on first touch</span>
                  <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>There’s a 9-second clip from Thursday that shows it</span>
                </span>
                <button onClick={() => go("ADC3-SessionFilm")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Send to his family</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
                <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#f4e6e6", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>AC</span>
                <span style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Ana has no goal yet</span>
                  <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>She joined 3 weeks ago</span>
                </span>
                <button onClick={() => go("ADC10-SetGoal")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Set one</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
                <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#f4e6e6", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
                <span style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Noah, Jonah and Mila have no notes</span>
                  <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Two taps each after tonight’s session</span>
                </span>
                <button onClick={() => go("ADC11-AfterSession")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Add notes</button>
              </div>
              <span style={{ ...C.cap, marginTop: "auto" }}>Steps come from your own notes after each session. Film backs them for the players you’ve filmed.</span>
            </section>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", minHeight: "0" }}>
            <section aria-label="Oversight" style={{ ...C.tile, gap: "2px", padding: "12px 14px", flexGrow: "1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h2 style={{ ...C.h2 }}>Has anything slipped?</h2>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", background: "#f4c95d", border: "1px solid #b98f1d" }} />
                  Strong
                </span>
              </div>
              <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Advanced · counted from what you’ve done in Clean Sheet</span>
              <button onClick={() => go("ADC11-AfterSession")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px", minHeight: "60px", justifyContent: "center", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                  <strong style={{ fontSize: "14px", lineHeight: "18px" }}>Notes in the last 3 weeks</strong>
                  <strong style={{ ...C.num, fontSize: "15px", whiteSpace: "nowrap" }}>19 of 22</strong>
                </span>
                <span role="img" aria-label="19 of 22" style={{ display: "block", height: "8px", borderRadius: "4px", background: "#e9eae8", overflow: "hidden" }}>
                  <span style={{ display: "block", height: "100%", width: "86%", background: "#2f6252" }} />
                </span>
                <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>3 players to catch up on</span>
              </button>
              <button onClick={() => go("ADC10-SetGoal")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px", minHeight: "60px", justifyContent: "center", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                  <strong style={{ fontSize: "14px", lineHeight: "18px" }}>A goal set</strong>
                  <strong style={{ ...C.num, fontSize: "15px", whiteSpace: "nowrap" }}>21 of 22</strong>
                </span>
                <span role="img" aria-label="21 of 22" style={{ display: "block", height: "8px", borderRadius: "4px", background: "#e9eae8", overflow: "hidden" }}>
                  <span style={{ display: "block", height: "100%", width: "95%", background: "#2f6252" }} />
                </span>
                <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>Only Ana to go</span>
              </button>
              <button onClick={() => go("ADC3-SessionFilm")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px", minHeight: "60px", justifyContent: "center", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                  <strong style={{ fontSize: "14px", lineHeight: "18px" }}>Families sent a clip this term</strong>
                  <strong style={{ ...C.num, fontSize: "15px", whiteSpace: "nowrap" }}>16 of 22</strong>
                </span>
                <span role="img" aria-label="16 of 22" style={{ display: "block", height: "8px", borderRadius: "4px", background: "#e9eae8", overflow: "hidden" }}>
                  <span style={{ display: "block", height: "100%", width: "73%", background: "#a86b78" }} />
                </span>
                <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>6 families have seen nothing yet</span>
              </button>
              <button onClick={() => go("ACC6-ReportDraft")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px", minHeight: "60px", justifyContent: "center", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                  <strong style={{ fontSize: "14px", lineHeight: "18px" }}>Term reports drafted</strong>
                  <strong style={{ ...C.num, fontSize: "15px", whiteSpace: "nowrap" }}>4 of 22</strong>
                </span>
                <span role="img" aria-label="4 of 22" style={{ display: "block", height: "8px", borderRadius: "4px", background: "#e9eae8", overflow: "hidden" }}>
                  <span style={{ display: "block", height: "100%", width: "18%", background: "#2f6252" }} />
                </span>
                <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>Due to Dani in week 9</span>
              </button>
              <span style={{ ...C.cap, marginTop: "auto" }}>Dani sees these same four numbers for every coach.</span>
            </section>
            <button aria-label="One thing needs you" onClick={() => go("AD3-Timetable")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.tile, flex: "none", flexDirection: "row", alignItems: "center", gap: "12px", padding: "12px 14px", borderTop: "4px solid #c39797", textDecoration: "none", color: "#10211f" }}>
              <span style={{ flex: "none", width: "36px", height: "36px", borderRadius: "999px", background: "#f4e6e6", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
              <span style={{ flexGrow: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
                <strong style={{ fontSize: "15px" }}>One thing needs you</strong>
                <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Dani asked: can you cover Thursday 11 June?</span>
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
