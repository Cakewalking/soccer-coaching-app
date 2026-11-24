// ACC6-ReportDraft, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
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

export default function ACC6ReportDraft({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC6-ReportDraft" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="players" sub="Term report" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Term report · Kai Okonkwo</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Drafted from your 5 session notes · check it, then send to Dani</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => demoToast("Opening Ana’s. Too new for a report, so skipped.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Next draft</button>
          <button onClick={() => demoToast("Sent to Dani to approve. 3 more drafts to check.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Looks right, send to Dani</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "repeat(12, minmax(0,1fr))" }}>
        <section aria-label="What Kai’s family will read" style={{ ...C.tile, gridColumn: "span 7", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>What Kai’s family will read</h2>
            <span style={{ ...C.cap }}>2 short paragraphs</span>
          </div>
          <div style={{ border: "1px solid #c5c8c4", borderRadius: "12px", padding: "14px 16px", fontSize: "15px", lineHeight: "23px", background: "#ffffff" }}>
            Kai has had a strong first term. He takes players on with confidence and keeps the ball close with both feet. His first touch has moved up a step: he now sets the ball out of his feet before he looks up.
            <br />
            <br />
            We’ve worked on finishing with his left foot. He has scored three in training and practises at home most weeks. Next term’s goal is to do it in a game.
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <button onClick={() => demoToast("Shortened to three sentences.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Make it shorter</button>
            <button onClick={() => demoToast("Tap any sentence to edit it.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Change a word</button>
            <button onClick={() => demoToast("Pick from Kai’s 4 clips this term.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Add a clip</button>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Written from what you noted, in plain words. It never compares Kai with another child.</span>
        </section>
        <section aria-label="Skills, then and now" style={{ ...C.tile, gridColumn: "span 5", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>Skills, then and now</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", fontSize: "15px", fontWeight: "700" }}>Running with the ball</span>
            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", fontSize: "15px", fontWeight: "700" }}>First touch</span>
            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#40826d", outline: "2px solid #40826d", outlineOffset: "2px" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", fontSize: "15px", fontWeight: "700" }}>One against one</span>
            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", fontSize: "15px", fontWeight: "700" }}>Striking the ball</span>
            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#2f6252" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
              <span style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", background: "#ffffff", border: "1.5px solid #c5c8c4" }} />
            </span>
          </div>
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", fontSize: "14px", borderTop: "1px solid #e9eae8", paddingTop: "10px" }}>
            <span>Came to</span>
            <strong style={{ ...C.num }}>5 of 6 sessions</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", paddingTop: "8px" }}>
            <span>Next term’s goal</span>
            <strong>Left-foot goal in a game</strong>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>The lighter dot is what moved this term.</span>
        </section>
      </main>
    </div>
  )
}
