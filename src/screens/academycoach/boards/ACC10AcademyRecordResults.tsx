// ACC10-AcademyRecordResults, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
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
  num: { fontVariantNumeric: "tabular-nums" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACC10AcademyRecordResults({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC10-AcademyRecordResults" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="record" sub="Record" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Finishing circuit · run 3</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Tonight · Advanced · 20 players · same set-up as run 2</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => demoToast("8 clips from tonight. Six are of players with a finishing goal.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Clips · 8</button>
          <button onClick={() => demoToast("Added to Thursday 11 June with the same set-up.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Run it again next week</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "repeat(12, minmax(0,1fr))", gridTemplateRows: "auto minmax(0,1fr)" }}>
        <div style={{ gridColumn: "span 12", display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "12px" }}>
          <div style={{ ...C.tile, padding: "12px 16px", gap: "2px" }}>
            <span style={{ ...C.label }}>Weaker-foot shots on target</span>
            <span style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ ...C.num, fontSize: "30px", lineHeight: "36px", fontWeight: "700", letterSpacing: "-0.02em", color: "#2f6252" }}>64%</span>
              <span style={{ fontSize: "13px", color: "#4a5a57" }}>was 52%</span>
            </span>
            <span>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Real change</span>
            </span>
          </div>
          <div style={{ ...C.tile, padding: "12px 16px", gap: "2px" }}>
            <span style={{ ...C.label }}>Shots per player</span>
            <span style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ ...C.num, fontSize: "30px", lineHeight: "36px", fontWeight: "700", letterSpacing: "-0.02em", color: "#10211f" }}>9</span>
              <span style={{ fontSize: "13px", color: "#4a5a57" }}>was 8</span>
            </span>
            <span>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e9eae8", color: "#10211f" }}>About the same</span>
            </span>
          </div>
          <div style={{ ...C.tile, padding: "12px 16px", gap: "2px" }}>
            <span style={{ ...C.label }}>Weaker-foot touches</span>
            <span style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ ...C.num, fontSize: "30px", lineHeight: "36px", fontWeight: "700", letterSpacing: "-0.02em", color: "#2f6252" }}>31%</span>
              <span style={{ fontSize: "13px", color: "#4a5a57" }}>was 24%</span>
            </span>
            <span>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Real change</span>
            </span>
          </div>
        </div>
        <section aria-label="Each player, against their own last run" style={{ ...C.tile, gridColumn: "span 7", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>Each player, against their own last run</h2>
            <span style={{ ...C.cap }}>Compared with 21 May</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>AC</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Ana Costa</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Too new to compare. This is her starting point</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e9eae8", color: "#10211f" }}>Starting point</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>JM</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Jonah Marsh</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Same as last run</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e9eae8", color: "#10211f" }}>Same</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>KO</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Kai Okonkwo</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Left foot on target 5 of 8, up from 3 of 8</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Better</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>LF</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Lola Ferris</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Make-up session, so no last run with this group</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e9eae8", color: "#10211f" }}>Not compared</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>MW</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Mila Wójcik</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Not filmed. Your hand count: 4 of 7</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e8cfcf", color: "#10211f" }}>Hand count</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "56px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>ZA</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Zane Abbas</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>No boot sensors, so no touches</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#e8cfcf", color: "#10211f" }}>Part missing</span>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>In name order, never ranked. Showing 6 of 20.</span>
        </section>
        <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "14px", minHeight: "0" }}>
          <section aria-label="Where it goes" style={{ ...C.tile, flex: "none", gap: "0", padding: "14px 18px 10px", border: "2px solid #2f6252" }}>
            <h2 style={{ ...C.h2 }}>Where it goes</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "58px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Session notes, written for you</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>For all 20. Check them in two taps</span>
              </span>
              <button onClick={() => demoToast("20 notes ready. Tap any to change it.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Check</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "58px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Kai’s plan</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Finishing could move up a step. You decide</span>
              </span>
              <button onClick={() => go("ACC4-PlayerPlan")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Open</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Term reports</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>A clip is saved for 6 players</span>
              </span>
            </div>
          </section>
          <section aria-label="What it means" style={{ ...C.tile, flexGrow: "1", gap: "6px" }}>
            <h2 style={{ ...C.h2 }}>What it means</h2>
            <span style={{ fontSize: "15px", lineHeight: "22px" }}>The group is hitting the target more often with the weaker foot, and it’s more than a normal up and down. One more run makes it a trend.</span>
            <span style={{ ...C.cap, marginTop: "auto" }}>A change counts as real when it’s bigger than the usual wobble between runs.</span>
          </section>
        </div>
      </main>
    </div>
  )
}
