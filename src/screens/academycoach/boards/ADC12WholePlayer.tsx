// ADC12-WholePlayer, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext } from 'react'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ADC12WholePlayer({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ADC12-WholePlayer" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="players" sub="Player file" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>The whole player</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Kai Okonkwo, 13 · four short lines, yours to write</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ADC1-PlayerFile")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Cancel</button>
          <button onClick={() => go("ADC1-PlayerFile")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Save</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 340px" }}>
        <section aria-label="Four lines" style={{ ...C.tile, gap: "14px" }}>
          <h2 style={{ ...C.h2 }}>Four lines</h2>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            With the ball
            <textarea defaultValue="Strong on the right. Left foot is the work." rows={1} style={{ minHeight: "48px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            Game sense
            <textarea defaultValue="Finds space late. Ask him what he saw." rows={1} style={{ minHeight: "48px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            Body
            <textarea defaultValue="Grown 4 cm since February. Keep sprints short." rows={1} style={{ minHeight: "48px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
            <span style={{ fontSize: "12px", fontWeight: "400", color: "#4a5a57" }}>158 cm on 10 February, from Wattle Creek FC’s growth check, shared by his mum. 162 cm at your skills check on 2 June.</span>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            Head, and with others
            <textarea defaultValue="Leads the arrival game now. Quiet in a new group." rows={1} style={{ minHeight: "48px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
          </label>
          <div style={{ borderRadius: "12px", background: "#eef5f2", padding: "10px 12px", fontSize: "14px", lineHeight: "20px" }}>
            <strong>His week, from his mum:</strong>
            {" academy twice, U13 Timber training and game, school football on Friday. "}
            <button onClick={() => go("ADP8-OtherSport")} style={{ border: "0", padding: "0", margin: "-12px 0", background: "transparent", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", color: "#2f6252", display: "inline-flex", alignItems: "center", minHeight: "44px" }}>See what she entered</button>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Opens from “The whole player” on the player file.</span>
        </section>
        <aside aria-label="Who sees these" style={{ ...C.tile, gap: "2px" }}>
          <h2 style={{ ...C.h2 }}>Who sees these</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Academy coaches</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Anyone who coaches Kai</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>The owner</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Dani</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Kai and his family</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Only the words you put in a report</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>4</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Nobody else</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>A club sees nothing unless the family sends a passport</span>
            </span>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>The Body line is never shown to the player as written.</span>
        </aside>
      </main>
    </div>
  )
}
