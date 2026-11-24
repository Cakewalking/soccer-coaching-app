// ACC7-AcademyGameDay, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
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

export default function ACC7AcademyGameDay({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC7-AcademyGameDay" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="gameday" sub="This Sunday" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>U13 Timber · Sunday</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Sun 7 June · 11:00 vs Banksia Park · home, pitch 2</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => demoToast("New message to 16 families.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Message the team</button>
          <button onClick={() => go("L11-LiveGame11")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Start the game</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "repeat(12, minmax(0,1fr))" }}>
        <section aria-label="Ready for Sunday" style={{ ...C.tile, gridColumn: "span 8", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>Ready for Sunday</h2>
            <span style={{ ...C.cap }}>3 of 4 done</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "68px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>!</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Team sheet</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>14 of 16 can play · 2 still to register with the club</span>
            </span>
            <button onClick={() => go("MS1-TeamSheet")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Open</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "68px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
            </span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Minutes</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Everyone gets at least half a game. The plan is ready</span>
            </span>
            <button onClick={() => demoToast("Minutes plan: 16 players, nobody under 35 of 70 minutes.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>See plan</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "68px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
            </span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Team talk</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>3 slides from Thursday’s session: finishing with the weaker foot</span>
            </span>
            <button onClick={() => go("E-TeamTalk")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Open</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "68px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
            </span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Cards</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Nobody suspended</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: "#2f6252", color: "#ffffff" }}>Clear</span>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>U13 Timber is your Advanced group’s game team. It plays as part of Wattle Creek FC, so the club’s rules apply on the day.</span>
        </section>
        <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: "14px", minHeight: "0" }}>
          <section aria-label="Can't play yet" style={{ ...C.tile, flex: "none", gap: "0", padding: "14px 18px 10px" }}>
            <h2 style={{ ...C.h2 }}>Can’t play yet</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>AC</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Ana Costa</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Club registration not finished</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
              <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>JM</span>
              <span style={{ flexGrow: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Jonah Marsh</span>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Club registration not finished</span>
              </span>
            </div>
            <span style={{ ...C.cap, paddingTop: "8px" }}>Their parents were reminded today. Both can still train.</span>
          </section>
          <section aria-label="After the game" style={{ ...C.tile, flexGrow: "1", gap: "8px" }}>
            <h2 style={{ ...C.h2 }}>After the game</h2>
            <span style={{ ...C.cap }}>The match review comes back in about 25 minutes. What it finds feeds next week’s sessions and each player’s plan.</span>
            <button onClick={() => go("R1-MatchReview")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, marginTop: "auto" }}>See last week’s review</button>
          </section>
        </div>
      </main>
    </div>
  )
}
