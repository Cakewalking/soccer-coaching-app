// ACC4-PlayerPlan, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  label: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a4b5b" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  th: { fontSize: "11px", lineHeight: "15px", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase", color: "#7a4b5b" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACC4PlayerPlan({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC4-PlayerPlan" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="players" sub="Player file" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Kai Okonkwo, 13</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Advanced · joined 13 May · came to 5 of 6</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => demoToast("New message to Tess Okonkwo.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Message Kai’s mum</button>
          <button onClick={() => go("ACC6-ReportDraft")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Write term report</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "repeat(12, minmax(0,1fr))" }}>
        <section aria-label="Where Kai is" style={{ ...C.tile, gridColumn: "span 7", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>Where Kai is</h2>
            <span style={{ ...C.cap }}>Against where he started</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "150px", fontSize: "15px", fontWeight: "700" }}>Running with the ball</span>
            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
            </span>
            <span style={{ flexGrow: "1", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Both feet, at speed</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "150px", fontSize: "15px", fontWeight: "700" }}>First touch</span>
            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#40826d", outline: "2px solid #40826d", outlineOffset: "2px" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
            </span>
            <span style={{ flexGrow: "1", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Up one this term · sets it out of his feet now</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "150px", fontSize: "15px", fontWeight: "700" }}>One against one</span>
            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
            </span>
            <span style={{ flexGrow: "1", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>His strength</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "150px", fontSize: "15px", fontWeight: "700" }}>Striking the ball</span>
            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
            </span>
            <span style={{ flexGrow: "1", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>This term’s goal · weaker foot</span>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Five steps per skill, set from your session notes. Kai sees his own ladder, never anyone else’s.</span>
        </section>
        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "14px", minHeight: "0" }}>
          <section aria-label="Goal this term" style={{ ...C.tile, flex: "none", gap: "6px", border: "2px solid #2f6252" }}>
            <span style={{ ...C.label }}>Goal this term</span>
            <span style={{ fontSize: "19px", lineHeight: "25px", fontWeight: "700" }}>Score with his left foot in a game</span>
            <span style={{ ...C.cap }}>3 left-foot finishes in training so far. Practice at home: 2 of 3 done this week.</span>
          </section>
          <section aria-label="Kai's whole week" style={{ ...C.tile, flexGrow: "1", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ ...C.h2 }}>Kai’s whole week</h2>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e8cfcf", color: "#10211f" }}>5 sessions</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0,1fr))", gap: "4px" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "stretch" }}>
                <span style={{ ...C.th, textAlign: "center" }}>Mon</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "stretch" }}>
                <span style={{ ...C.th, textAlign: "center" }}>Tue</span>
                <span style={{ borderRadius: "6px", padding: "3px 0", fontSize: "11px", fontWeight: "700", textAlign: "center", background: "#40826d", color: "#ffffff" }}>Academy</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "stretch" }}>
                <span style={{ ...C.th, textAlign: "center" }}>Wed</span>
                <span style={{ borderRadius: "6px", padding: "3px 0", fontSize: "11px", fontWeight: "700", textAlign: "center", background: "#e8cfcf", color: "#10211f" }}>School</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "stretch" }}>
                <span style={{ ...C.th, textAlign: "center" }}>Thu</span>
                <span style={{ borderRadius: "6px", padding: "3px 0", fontSize: "11px", fontWeight: "700", textAlign: "center", background: "#40826d", color: "#ffffff" }}>Academy</span>
                <span style={{ borderRadius: "6px", padding: "3px 0", fontSize: "11px", fontWeight: "700", textAlign: "center", background: "#40826d", color: "#ffffff" }}>1:1</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "stretch" }}>
                <span style={{ ...C.th, textAlign: "center" }}>Fri</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "stretch" }}>
                <span style={{ ...C.th, textAlign: "center" }}>Sat</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "stretch" }}>
                <span style={{ ...C.th, textAlign: "center" }}>Sun</span>
                <span style={{ borderRadius: "6px", padding: "3px 0", fontSize: "11px", fontWeight: "700", textAlign: "center", background: "#e8cfcf", color: "#10211f" }}>Game</span>
              </span>
            </div>
            <span style={{ ...C.cap }}>Kai plays for U13 Timber, your game team at Wattle Creek FC, so his games are here without anyone sharing them. His mum added school football.</span>
            <span style={{ ...C.cap, marginTop: "auto" }}>A full week before Sunday’s game. Keep repeated sprints short.</span>
          </section>
        </div>
      </main>
    </div>
  )
}
