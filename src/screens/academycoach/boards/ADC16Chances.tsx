// ADC16-Chances, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  label: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a4b5b" },
  num: { fontVariantNumeric: "tabular-nums" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ADC16Chances({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ADC16-Chances" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="gameday" sub="Review" go={go} />}
      <main style={{ flexGrow: "1", minHeight: "0", padding: "14px 28px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <section aria-label="Result" style={{ flex: "none", borderRadius: "18px", background: "#1c3a33", color: "#ffffff", padding: "12px 18px", display: "flex", alignItems: "center", gap: "16px" }}>
          <strong style={{ ...C.num, flex: "none", fontSize: "44px", lineHeight: "48px", letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>2.1 v 0.8</strong>
          <span style={{ flexGrow: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
            <strong style={{ fontSize: "19px", lineHeight: "24px" }}>Your chances were worth about 2 goals. You scored 3.</strong>
            <span style={{ fontSize: "13px", lineHeight: "18px", color: "#cfe6dc" }}>U13 Timber v Eastbank · Sun 31 May · 11 shots, 6 on target</span>
          </span>
          <button aria-current="false" onClick={() => go("ADC7-GameReview")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 18px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Review</button>
          <button aria-current="page" onClick={() => go("ADC16-Chances")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 18px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }}>Chances</button>
          <button aria-current="false" onClick={() => go("ADC17-YourTake")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 18px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "15px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Your take</button>
        </section>
        <div style={{ flex: "none", display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "12px" }}>
          <div style={{ ...C.tile, gap: "2px", padding: "12px 16px", background: "#ffffff" }}>
            <span style={{ ...C.label }}>Shots</span>
            <span style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <strong style={{ ...C.num, fontSize: "30px", lineHeight: "36px", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>11</strong>
            </span>
            <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>6 on target · 3 goals</span>
          </div>
          <div style={{ ...C.tile, gap: "2px", padding: "12px 16px", background: "#ffffff" }}>
            <span style={{ ...C.label }}>Best chance</span>
            <span style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <strong style={{ ...C.num, fontSize: "30px", lineHeight: "36px", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>0.62</strong>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", border: "1.5px dashed #4a5a57" }} />
                Estimate
              </span>
            </span>
            <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Zane, minute 12 · goal</span>
          </div>
          <div style={{ ...C.tile, gap: "2px", padding: "12px 16px", background: "#ffffff" }}>
            <span style={{ ...C.label }}>From winning it high</span>
            <span style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <strong style={{ ...C.num, fontSize: "30px", lineHeight: "36px", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>4 of 11</strong>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", background: "#f4c95d", border: "1px solid #b98f1d" }} />
                Strong
              </span>
            </span>
            <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>shots within 10 seconds of a win</span>
          </div>
          <div style={{ ...C.tile, gap: "2px", padding: "12px 16px", background: "#f4e6e6" }}>
            <span style={{ ...C.label }}>Chances given away</span>
            <span style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <strong style={{ ...C.num, fontSize: "30px", lineHeight: "36px", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>3</strong>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", border: "1.5px dashed #4a5a57" }} />
                Estimate
              </span>
            </span>
            <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>worth 0.8 · they scored 1</span>
          </div>
        </div>
        <div style={{ flexGrow: "1", minHeight: "0", display: "grid", gridTemplateColumns: "minmax(0,1fr) 330px", gap: "12px" }}>
          <section aria-label="Your six best chances" style={{ ...C.tile, gap: "10px", padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ ...C.h2 }}>Your six best chances</h2>
              <span style={{ display: "flex", gap: "16px" }}>
                <button onClick={() => go("RC8-HowWeMeasure")} style={{ border: "0", padding: "0", margin: "-12px 0", background: "transparent", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", color: "#2f6252", display: "inline-flex", alignItems: "center", minHeight: "44px", fontSize: "14px", fontWeight: "700" }}>What “worth” means</button>
              </span>
            </div>
            <div style={{ flexGrow: "1", minHeight: "0", display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gridTemplateRows: "repeat(2, minmax(0,1fr))", gap: "10px" }}>
              <button onClick={() => demoToast("The clip from minute 12 plays.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px", borderRadius: "16px", padding: "12px 14px", background: "#eef5f2", border: "1px solid #cfe3da", textDecoration: "none", color: "#10211f", minHeight: "0" }}>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ fontSize: "13px", lineHeight: "17px", fontWeight: "700" }}>
                    Zane Abbas
                    <br />
                    <span style={{ fontWeight: "400", color: "#33443f" }}>Inside the box, right foot</span>
                  </span>
                  <span style={{ flex: "none", height: "22px", padding: "0 8px", borderRadius: "999px", background: "#ffffff", display: "inline-flex", alignItems: "center", fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap" }}>Goal</span>
                </span>
                <strong style={{ ...C.num, fontSize: "34px", lineHeight: "38px", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>0.62</strong>
                <span role="img" aria-label="Worth 0.62 of a goal" style={{ display: "block", flex: "none", position: "relative", height: "8px", borderRadius: "4px", background: "#ffffff", margin: "6px 0 4px" }}>
                  <span style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "62%", borderRadius: "4px", background: "#2f6252" }} />
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px", marginTop: "auto" }}>
                  <span style={{ fontSize: "12px", color: "#33443f" }}>minute 12</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", border: "1.5px dashed #4a5a57" }} />
                    Estimate
                  </span>
                </span>
              </button>
              <button onClick={() => demoToast("The clip from minute 23 plays.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px", borderRadius: "16px", padding: "12px 14px", background: "#f3ecdf", border: "1px solid #e2d6bd", textDecoration: "none", color: "#10211f", minHeight: "0" }}>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ fontSize: "13px", lineHeight: "17px", fontWeight: "700" }}>
                    Lola Nguyen
                    <br />
                    <span style={{ fontWeight: "400", color: "#33443f" }}>Edge of the box</span>
                  </span>
                  <span style={{ flex: "none", height: "22px", padding: "0 8px", borderRadius: "999px", background: "#ffffff", display: "inline-flex", alignItems: "center", fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap" }}>Saved</span>
                </span>
                <strong style={{ ...C.num, fontSize: "34px", lineHeight: "38px", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>0.18</strong>
                <span role="img" aria-label="Worth 0.18 of a goal" style={{ display: "block", flex: "none", position: "relative", height: "8px", borderRadius: "4px", background: "#ffffff", margin: "6px 0 4px" }}>
                  <span style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "18%", borderRadius: "4px", background: "#8a7a55" }} />
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px", marginTop: "auto" }}>
                  <span style={{ fontSize: "12px", color: "#33443f" }}>minute 23</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", border: "1.5px dashed #4a5a57" }} />
                    Estimate
                  </span>
                </span>
              </button>
              <button onClick={() => demoToast("The clip from minute 31 plays.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px", borderRadius: "16px", padding: "12px 14px", background: "#eef5f2", border: "1px solid #cfe3da", textDecoration: "none", color: "#10211f", minHeight: "0" }}>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ fontSize: "13px", lineHeight: "17px", fontWeight: "700" }}>
                    Kai Okonkwo
                    <br />
                    <span style={{ fontWeight: "400", color: "#33443f" }}>Inside the box, left foot</span>
                  </span>
                  <span style={{ flex: "none", height: "22px", padding: "0 8px", borderRadius: "999px", background: "#ffffff", display: "inline-flex", alignItems: "center", fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap" }}>Goal</span>
                </span>
                <strong style={{ ...C.num, fontSize: "34px", lineHeight: "38px", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>0.40</strong>
                <span role="img" aria-label="Worth 0.40 of a goal" style={{ display: "block", flex: "none", position: "relative", height: "8px", borderRadius: "4px", background: "#ffffff", margin: "6px 0 4px" }}>
                  <span style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "40%", borderRadius: "4px", background: "#2f6252" }} />
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px", marginTop: "auto" }}>
                  <span style={{ fontSize: "12px", color: "#33443f" }}>minute 31</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", border: "1.5px dashed #4a5a57" }} />
                    Estimate
                  </span>
                </span>
              </button>
              <button onClick={() => demoToast("The clip from minute 38 plays.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px", borderRadius: "16px", padding: "12px 14px", background: "#f4e6e6", border: "1px solid #c39797", textDecoration: "none", color: "#10211f", minHeight: "0" }}>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ fontSize: "13px", lineHeight: "17px", fontWeight: "700" }}>
                    Isla Tran
                    <br />
                    <span style={{ fontWeight: "400", color: "#33443f" }}>Wide on the left</span>
                  </span>
                  <span style={{ flex: "none", height: "22px", padding: "0 8px", borderRadius: "999px", background: "#ffffff", display: "inline-flex", alignItems: "center", fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap" }}>Wide</span>
                </span>
                <strong style={{ ...C.num, fontSize: "34px", lineHeight: "38px", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>0.09</strong>
                <span role="img" aria-label="Worth 0.09 of a goal" style={{ display: "block", flex: "none", position: "relative", height: "8px", borderRadius: "4px", background: "#ffffff", margin: "6px 0 4px" }}>
                  <span style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "9%", borderRadius: "4px", background: "#a86b78" }} />
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px", marginTop: "auto" }}>
                  <span style={{ fontSize: "12px", color: "#33443f" }}>minute 38</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", border: "1.5px dashed #4a5a57" }} />
                    Estimate
                  </span>
                </span>
              </button>
              <button onClick={() => demoToast("The clip from minute 44 plays.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px", borderRadius: "16px", padding: "12px 14px", background: "#eef5f2", border: "1px solid #cfe3da", textDecoration: "none", color: "#10211f", minHeight: "0" }}>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ fontSize: "13px", lineHeight: "17px", fontWeight: "700" }}>
                    Lola Nguyen
                    <br />
                    <span style={{ fontWeight: "400", color: "#33443f" }}>One against the keeper</span>
                  </span>
                  <span style={{ flex: "none", height: "22px", padding: "0 8px", borderRadius: "999px", background: "#ffffff", display: "inline-flex", alignItems: "center", fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap" }}>Goal</span>
                </span>
                <strong style={{ ...C.num, fontSize: "34px", lineHeight: "38px", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>0.55</strong>
                <span role="img" aria-label="Worth 0.55 of a goal" style={{ display: "block", flex: "none", position: "relative", height: "8px", borderRadius: "4px", background: "#ffffff", margin: "6px 0 4px" }}>
                  <span style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "55%", borderRadius: "4px", background: "#2f6252" }} />
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px", marginTop: "auto" }}>
                  <span style={{ fontSize: "12px", color: "#33443f" }}>minute 44</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", border: "1.5px dashed #4a5a57" }} />
                    Estimate
                  </span>
                </span>
              </button>
              <button onClick={() => demoToast("The clip from minute 47 plays.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px", borderRadius: "16px", padding: "12px 14px", background: "#f3ecdf", border: "1px solid #e2d6bd", textDecoration: "none", color: "#10211f", minHeight: "0" }}>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ fontSize: "13px", lineHeight: "17px", fontWeight: "700" }}>
                    Finn Byrne
                    <br />
                    <span style={{ fontWeight: "400", color: "#33443f" }}>From a corner</span>
                  </span>
                  <span style={{ flex: "none", height: "22px", padding: "0 8px", borderRadius: "999px", background: "#ffffff", display: "inline-flex", alignItems: "center", fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap" }}>Blocked</span>
                </span>
                <strong style={{ ...C.num, fontSize: "34px", lineHeight: "38px", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>0.14</strong>
                <span role="img" aria-label="Worth 0.14 of a goal" style={{ display: "block", flex: "none", position: "relative", height: "8px", borderRadius: "4px", background: "#ffffff", margin: "6px 0 4px" }}>
                  <span style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "14%", borderRadius: "4px", background: "#8a7a55" }} />
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px", marginTop: "auto" }}>
                  <span style={{ fontSize: "12px", color: "#33443f" }}>minute 47</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", border: "1.5px dashed #4a5a57" }} />
                    Estimate
                  </span>
                </span>
              </button>
            </div>
            <span style={{ ...C.cap }}>Each number is the share of similar chances that are scored. Tap a tile for the clip.</span>
          </section>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", minHeight: "0" }}>
            <section aria-label="Their three chances" style={{ ...C.tile, gap: "4px", padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h2 style={{ ...C.h2 }}>Their three chances</h2>
              </div>
              <button onClick={() => demoToast("The clip from minute 8 plays.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "44px minmax(0,1fr) auto", gap: "10px", alignItems: "center", minHeight: "58px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
                <span style={{ height: "44px", borderRadius: "12px", background: "#1c3a33", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", lineHeight: "12px" }}>
                  MIN
                  <span style={{ ...C.num, fontSize: "16px", lineHeight: "18px" }}>8</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
                  <strong style={{ fontSize: "14px", lineHeight: "18px" }}>Shot from a cut-back</strong>
                  <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>Our midfield was 26 m away</span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                  <strong style={{ ...C.num, fontSize: "20px", lineHeight: "24px", whiteSpace: "nowrap" }}>0.31</strong>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", border: "1.5px dashed #4a5a57" }} />
                    Estimate
                  </span>
                </span>
              </button>
              <button onClick={() => demoToast("The clip from minute 29 plays.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "44px minmax(0,1fr) auto", gap: "10px", alignItems: "center", minHeight: "58px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
                <span style={{ height: "44px", borderRadius: "12px", background: "#1c3a33", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", lineHeight: "12px" }}>
                  MIN
                  <span style={{ ...C.num, fontSize: "16px", lineHeight: "18px" }}>29</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
                  <strong style={{ fontSize: "14px", lineHeight: "18px" }}>One against our keeper</strong>
                  <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>Saved by Noah</span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                  <strong style={{ ...C.num, fontSize: "20px", lineHeight: "24px", whiteSpace: "nowrap" }}>0.38</strong>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", border: "1.5px dashed #4a5a57" }} />
                    Estimate
                  </span>
                </span>
              </button>
              <button onClick={() => demoToast("The clip from minute 46 plays.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "44px minmax(0,1fr) auto", gap: "10px", alignItems: "center", minHeight: "58px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
                <span style={{ height: "44px", borderRadius: "12px", background: "#1c3a33", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", lineHeight: "12px" }}>
                  MIN
                  <span style={{ ...C.num, fontSize: "16px", lineHeight: "18px" }}>46</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
                  <strong style={{ fontSize: "14px", lineHeight: "18px" }}>Header from a corner</strong>
                  <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>Their goal</span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                  <strong style={{ ...C.num, fontSize: "20px", lineHeight: "24px", whiteSpace: "nowrap" }}>0.11</strong>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "700", color: "#10211f", whiteSpace: "nowrap" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "999px", boxSizing: "border-box", border: "1.5px dashed #4a5a57" }} />
                    Estimate
                  </span>
                </span>
              </button>
            </section>
            <section aria-label="How sure" style={{ ...C.tile, gap: "6px", padding: "12px 14px", flexGrow: "1" }}>
              <h2 style={{ ...C.h2 }}>How sure is this?</h2>
              <span style={{ fontSize: "14px", lineHeight: "20px" }}>Chance values come from adult and older-junior games. For under 13s they are a guide to which chances were good, not a precise number.</span>
              <span style={{ ...C.cap, marginTop: "auto" }}>Shots and where they were taken are counted from film and marked Strong.</span>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
