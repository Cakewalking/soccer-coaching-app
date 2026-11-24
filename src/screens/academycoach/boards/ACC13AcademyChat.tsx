// ACC13-AcademyChat, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useContext, useState } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  num: { fontVariantNumeric: "tabular-nums" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACC13AcademyChat({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const [sheet, setSheet] = useState<string | null>(null)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ACC13-AcademyChat" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="today" go={go} />}
      <main style={{ flexGrow: "1", minHeight: "0", padding: "14px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "340px minmax(0,1fr)" }}>
        <section aria-label="Chats" style={{ ...C.tile, padding: "0", gap: "0", overflow: "hidden" }}>
          <div style={{ flex: "none", display: "flex", alignItems: "center", gap: "8px", padding: "14px 16px 12px" }}>
            <h1 style={{ margin: "0", flexGrow: "1", fontSize: "22px", lineHeight: "28px", fontWeight: "700" }}>Chats</h1>
            <button onClick={() => go("ACC1-CoachToday")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more, padding: "0 12px" }}>Today</button>
            <button onClick={() => setSheet("cacadnew")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, padding: "0 14px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New chat
            </button>
          </div>
          <button aria-current="false" onClick={() => setSheet("cacadnews")} style={{ border: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "68px", padding: "0 16px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "700" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10v4h3l7 4V6l-7 4zM18 9a4 4 0 010 6" />
              </svg>
            </span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                <strong style={{ fontSize: "15px", lineHeight: "20px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Tall Timber news</strong>
                <span style={{ flex: "none", fontSize: "12px", color: "#4a5a57" }}>Mon</span>
              </span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Dani: July clinic bookings are open</span>
            </span>
          </button>
          <button aria-current="true" onClick={() => go("ACC13-AcademyChat")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "68px", padding: "0 16px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f", background: "#eef5f2", boxShadow: "inset 3px 0 0 #2f6252" }}>
            <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "700" }}>ADV</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                <strong style={{ fontSize: "15px", lineHeight: "20px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>U13 Timber · Tue and Thu</strong>
                <span style={{ flex: "none", fontSize: "12px", color: "#4a5a57" }}>4:15 pm</span>
              </span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Tess: Kai did all three practices!</span>
            </span>
            <span style={{ ...C.num, flex: "none", minWidth: "22px", height: "22px", borderRadius: "999px", background: "#2f6252", color: "#ffffff", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
          </button>
          <button aria-current="false" onClick={() => setSheet("cacadgame")} style={{ border: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "68px", padding: "0 16px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "700" }}>U13</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                <strong style={{ fontSize: "15px", lineHeight: "20px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>U13 Timber · game team</strong>
                <span style={{ flex: "none", fontSize: "12px", color: "#4a5a57" }}>Wed</span>
              </span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>You: Team sheet for Sunday</span>
            </span>
          </button>
          <button aria-current="false" onClick={() => setSheet("cdani")} style={{ border: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", minHeight: "68px", padding: "0 16px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
            <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "700" }}>DO</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                <strong style={{ fontSize: "15px", lineHeight: "20px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Dani Okafor · owner</strong>
                <span style={{ flex: "none", fontSize: "12px", color: "#4a5a57" }}>Wed</span>
              </span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Can you take the 4:15 on Friday?</span>
            </span>
            <span style={{ ...C.num, flex: "none", minWidth: "22px", height: "22px", borderRadius: "999px", background: "#2f6252", color: "#ffffff", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>1</span>
          </button>
          <span style={{ ...C.cap, marginTop: "auto", padding: "10px 16px 14px", fontSize: "12px", lineHeight: "17px" }}>Nobody’s phone number is shared. Families leave these chats when the season ends.</span>
        </section>
        <section aria-label="U13 Timber · Tue and Thu" style={{ ...C.tile, padding: "0", gap: "0", overflow: "hidden" }}>
          <div style={{ flex: "none", display: "flex", alignItems: "center", gap: "12px", padding: "10px 16px", borderBottom: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "44px", height: "44px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "700" }}>ADV</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <strong style={{ display: "block", fontSize: "17px", lineHeight: "22px" }}>U13 Timber · Tue and Thu</strong>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>16 families, Reece and Dani · parents can post · set up by Dani</span>
            </span>
            <button aria-label="Photos, videos and files" title="Photos, videos and files" onClick={() => setSheet("cacadmedia")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", flex: "none", width: "44px", height: "44px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15.5 9.5h.01" />
              </svg>
            </button>
            <button aria-label="Chat details" title="Chat details" onClick={() => setSheet("cacadinfo")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", flex: "none", width: "44px", height: "44px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 8v.01M12 11v5M12 3a9 9 0 100 18 9 9 0 000-18z" />
              </svg>
            </button>
          </div>
          <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "8px 16px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "6px", background: "#faf5ec" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", flexDirection: "row-reverse" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-end" }}>
                <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>You · 3:30 pm</span>
                <div style={{ maxWidth: "520px", background: "#2f6252", color: "#ffffff", border: "0", borderRadius: "14px 14px 4px 14px", padding: "8px 12px", fontSize: "15px", lineHeight: "21px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span role="img" aria-label="Video: Left-foot finishing, this week’s home practice" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "170px", height: "64px", borderRadius: "10px", background: "#1f4a3e", color: "#ffffff" }}>
                    <span style={{ width: "40px", height: "40px", borderRadius: "999px", background: "#ffffff", color: "#1f4a3e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M8 5l11 7-11 7z" />
                      </svg>
                    </span>
                    <span style={{ position: "absolute", right: "6px", bottom: "6px", height: "22px", padding: "0 8px", borderRadius: "999px", background: "#ffffff", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", color: "#10211f" }}>0:48</span>
                  </span>
                  This week’s home practice: 20 left-foot finishes against a wall.
                </div>
                <span style={{ display: "flex", gap: "4px", marginTop: "-2px" }}>
                  <span style={{ height: "24px", padding: "0 8px", borderRadius: "999px", background: "#ffffff", border: "1px solid #c5c8c4", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px", color: "#10211f" }}>8</span>
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
              <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>TO</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>Tess Okonkwo · Kai’s mum · 4:15 pm</span>
                <div style={{ maxWidth: "520px", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4", borderRadius: "14px 14px 14px 4px", padding: "8px 12px", fontSize: "15px", lineHeight: "21px", display: "flex", flexDirection: "column", gap: "6px" }}>Kai did all three! Any make-up for next Tuesday?</div>
                <span style={{ display: "flex", gap: "4px", marginTop: "-2px" }}>
                  <span style={{ height: "24px", padding: "0 8px", borderRadius: "999px", background: "#ffffff", border: "1px solid #2f6252", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px", color: "#10211f" }}>2</span>
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
              <span style={{ flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#c39797", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>RW</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>You · 4:20 pm</span>
                <div style={{ maxWidth: "520px", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4", borderRadius: "14px 14px 14px 4px", padding: "8px 12px", fontSize: "15px", lineHeight: "21px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", minWidth: "260px", color: "#10211f" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "700", color: "#2f6252" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 20V10M12 20V4M19 20v-7" />
                      </svg>
                      POLL
                    </span>
                    <strong style={{ fontSize: "15px", lineHeight: "20px" }}>Make-up for Tuesday 9 June: which suits?</strong>
                    <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", lineHeight: "19px" }}>
                        <span style={{ flex: "none", width: "20px", height: "20px", borderRadius: "999px", boxSizing: "border-box", border: "2px solid #6f7f7b", background: "#ffffff", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }} />
                        <span style={{ flexGrow: "1", fontWeight: "500" }}>Wed 10 June, 5:30</span>
                        <strong style={{ ...C.num }}>3</strong>
                      </span>
                      <span style={{ display: "block", height: "6px", borderRadius: "3px", background: "#e9eae8", overflow: "hidden" }}>
                        <span style={{ display: "block", height: "100%", width: "100%", background: "#40826d" }} />
                      </span>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", lineHeight: "19px" }}>
                        <span style={{ flex: "none", width: "20px", height: "20px", borderRadius: "999px", boxSizing: "border-box", border: "2px solid #6f7f7b", background: "#ffffff", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }} />
                        <span style={{ flexGrow: "1", fontWeight: "500" }}>Fri 12 June, 4:15</span>
                        <strong style={{ ...C.num }}>1</strong>
                      </span>
                      <span style={{ display: "block", height: "6px", borderRadius: "3px", background: "#e9eae8", overflow: "hidden" }}>
                        <span style={{ display: "block", height: "100%", width: "33%", background: "#40826d" }} />
                      </span>
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ flexGrow: "1", fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>3 of 16 families · your answer books the make-up</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: "none", borderTop: "1px solid #e9eae8", padding: "10px 16px 12px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", gap: "6px", flexWrap: "nowrap", overflow: "hidden" }}>
              <button onClick={() => demoToast("Everyone in U13 Timber has a yes for photos.")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", height: "44px", padding: "0 10px", borderRadius: "10px", background: "#faf5ec", color: "#10211f", fontSize: "13px", fontWeight: "700", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15.5 9.5h.01" />
                </svg>
                Photo
              </button>
              <button onClick={() => setSheet("cvideo")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", height: "44px", padding: "0 10px", borderRadius: "10px", background: "#faf5ec", color: "#10211f", fontSize: "13px", fontWeight: "700", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 7h11v10H4zM15 10l5-3v10l-5-3" />
                </svg>
                Video
              </button>
              <button onClick={() => setSheet("cvoice")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", height: "44px", padding: "0 10px", borderRadius: "10px", background: "#faf5ec", color: "#10211f", fontSize: "13px", fontWeight: "700", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4a3 3 0 00-3 3v5a3 3 0 006 0V7a3 3 0 00-3-3zM6 11a6 6 0 0012 0M12 17v4" />
                </svg>
                Voice
              </button>
              <button onClick={() => setSheet("cacadpoll")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", height: "44px", padding: "0 10px", borderRadius: "10px", background: "#faf5ec", color: "#10211f", fontSize: "13px", fontWeight: "700", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 20V10M12 20V4M19 20v-7" />
                </svg>
                Poll
              </button>
              <button onClick={() => setSheet("cfile")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", height: "44px", padding: "0 10px", borderRadius: "10px", background: "#faf5ec", color: "#10211f", fontSize: "13px", fontWeight: "700", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9zM14 3v6h6" />
                </svg>
                File
              </button>
              <button onClick={() => demoToast("This week’s home practice attached.")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", height: "44px", padding: "0 10px", borderRadius: "10px", background: "#faf5ec", color: "#10211f", fontSize: "13px", fontWeight: "700", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7l4 3-1.5 5h-5L8 10z" />
                </svg>
                Home practice
              </button>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ flexGrow: "1", minHeight: "48px", border: "1px solid #c5c8c4", borderRadius: "12px", padding: "0 14px", display: "flex", alignItems: "center", fontSize: "15px", color: "#4a5a57", background: "#ffffff" }}>Write to the U13 Timber group</span>
              <button onClick={() => demoToast("Sent to the U13 Timber group.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary, height: "48px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
                Send
              </button>
            </div>
            <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>Notes about one player belong in their plan or a private reply, not the group.</span>
          </div>
        </section>
      </main>
      {sheet === "cacadgame" && (
        <>
          <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", zIndex: "40" }}>
            <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", color: "#10211f", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", border: "0", padding: "0", margin: "0", background: "rgba(16,33,31,0.45)", cursor: "default" }} />
            <div role="dialog" aria-label="U13 Timber · game team" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "540px", maxHeight: "740px", borderRadius: "18px", padding: "20px 22px", boxSizing: "border-box", background: "#ffffff", color: "#10211f", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden", boxShadow: "0 12px 40px rgba(16,33,31,0.25)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "20px", lineHeight: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>U13 Timber · game team</span>
                  <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>14 families, you, and Rob Owusu from Wattle Creek FC</span>
                </div>
                <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", flex: "none", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ alignSelf: "flex-end", maxWidth: "84%", background: "#2f6252", color: "#ffffff", borderRadius: "14px", padding: "8px 12px", fontSize: "14px", lineHeight: "20px" }}>
                  <strong style={{ display: "block", fontSize: "12px", opacity: "0.8" }}>You · Wed 5:10 pm</strong>
                  Team sheet for Sunday is in. 11:00 at Wattle Creek Reserve, be there 10:15.
                </div>
                <div style={{ alignSelf: "flex-start", maxWidth: "84%", background: "#faf5ec", color: "#10211f", borderRadius: "14px", padding: "8px 12px", fontSize: "14px", lineHeight: "20px" }}>
                  <strong style={{ display: "block", fontSize: "12px", opacity: "0.8" }}>Tess Okonkwo · Wed 5:40 pm</strong>
                  Kai’s in. Which kit?
                </div>
              </div>
              <label style={{ display: "block" }}>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", fontWeight: "700", color: "#4a5a57", marginBottom: "4px" }}>Message</span>
                <textarea rows={3} style={{ width: "100%", boxSizing: "border-box", minHeight: "46px", border: "1px solid #c5c8c4", borderRadius: "10px", padding: "10px 12px", fontFamily: "inherit", fontSize: "16px", color: "#10211f", background: "#ffffff", resize: "none", lineHeight: "22px" }} defaultValue="Club kit on Sundays, academy kit for training." />
              </label>
              <div style={{ background: "#faf5ec", borderRadius: "12px", padding: "10px 12px", fontSize: "13px", lineHeight: "19px", color: "#10211f" }}>This team plays under Wattle Creek FC, so the club’s welfare officer can read this chat as well as Dani.</div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "2px" }}>
                <button type="button" onClick={() => setSheet(null)} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Cancel</button>
                <button type="button" onClick={() => { setSheet(null); demoToast("Sent to U13 Timber.") }} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }}>Send</button>
              </div>
            </div>
          </div>
        </>
      )}
      {sheet === "cacadinfo" && (
        <>
          <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", zIndex: "40" }}>
            <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", color: "#10211f", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", border: "0", padding: "0", margin: "0", background: "rgba(16,33,31,0.45)", cursor: "default" }} />
            <div role="dialog" aria-label="U13 Timber · Tue and Thu" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "540px", maxHeight: "740px", borderRadius: "18px", padding: "20px 22px", boxSizing: "border-box", background: "#ffffff", color: "#10211f", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden", boxShadow: "0 12px 40px rgba(16,33,31,0.25)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "20px", lineHeight: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>U13 Timber · Tue and Thu</span>
                  <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>16 families, Reece and Dani · set up by Dani</span>
                </div>
                <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", flex: "none", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "0" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Parents can post</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Dani chose this when she set up the chat</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Parents can send</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Photos, videos and voice notes. No polls</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Quiet hours</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>8 pm to 7 am</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Dani can read every chat</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>She is the academy’s child safety contact</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "2px" }}>
                <button type="button" onClick={() => setSheet(null)} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Cancel</button>
                <button type="button" onClick={() => { setSheet(null); demoToast("Muted. Tall Timber news still comes through.") }} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }}>Mute this chat</button>
              </div>
            </div>
          </div>
        </>
      )}
      {sheet === "cacadmedia" && (
        <>
          <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", zIndex: "40" }}>
            <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", color: "#10211f", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", border: "0", padding: "0", margin: "0", background: "rgba(16,33,31,0.45)", cursor: "default" }} />
            <div role="dialog" aria-label="Photos, videos and files" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "540px", maxHeight: "740px", borderRadius: "18px", padding: "20px 22px", boxSizing: "border-box", background: "#ffffff", color: "#10211f", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden", boxShadow: "0 12px 40px rgba(16,33,31,0.25)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "20px", lineHeight: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>Photos, videos and files</span>
                  <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>U13 Timber · Tue and Thu · this term</span>
                </div>
                <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", flex: "none", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", fontWeight: "700", color: "#4a5a57", marginBottom: "4px" }}>Show</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", background: "#2f6252", color: "#ffffff" }}>Videos · 4</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>Photos · 9</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>Files · 2</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "0" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Left-foot finishing</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Home practice · this week · 0:48</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>First touch on the half-turn</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Home practice · last week · 0:36</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Term 2 program.pdf</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Dani · 14 April</span>
                </div>
              </div>
              <div style={{ background: "#faf5ec", borderRadius: "12px", padding: "10px 12px", fontSize: "13px", lineHeight: "19px", color: "#10211f" }}>Home practice videos also show on each player’s Practice screen.</div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "2px" }}>
                <button type="button" onClick={() => setSheet(null)} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Cancel</button>
                <button type="button" onClick={() => { setSheet(null); demoToast("Closed.") }} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }}>Done</button>
              </div>
            </div>
          </div>
        </>
      )}
      {sheet === "cacadnew" && (
        <>
          <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", zIndex: "40" }}>
            <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", color: "#10211f", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", border: "0", padding: "0", margin: "0", background: "rgba(16,33,31,0.45)", cursor: "default" }} />
            <div role="dialog" aria-label="New chat" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "540px", maxHeight: "740px", borderRadius: "18px", padding: "20px 22px", boxSizing: "border-box", background: "#ffffff", color: "#10211f", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden", boxShadow: "0 12px 40px rgba(16,33,31,0.25)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "20px", lineHeight: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>New chat</span>
                  <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Dani has let coaches set up chats for their own groups.</span>
                </div>
                <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", flex: "none", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", fontWeight: "700", color: "#4a5a57", marginBottom: "4px" }}>For</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>U13 Timber · 16 families</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>Development · 30 families</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", background: "#2f6252", color: "#ffffff" }}>One-on-one families · 6</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>Pick people</span>
                </div>
              </div>
              <label style={{ display: "block" }}>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", fontWeight: "700", color: "#4a5a57", marginBottom: "4px" }}>Chat name</span>
                <input defaultValue="One-on-one bookings" placeholder="" style={{ width: "100%", boxSizing: "border-box", minHeight: "46px", border: "1px solid #c5c8c4", borderRadius: "10px", padding: "10px 12px", fontFamily: "inherit", fontSize: "16px", color: "#10211f", background: "#ffffff" }} />
              </label>
              <div>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", fontWeight: "700", color: "#4a5a57", marginBottom: "4px" }}>Who can post</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", background: "#2f6252", color: "#ffffff" }}>Coaches only</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>Everyone in the chat</span>
                </div>
              </div>
              <div style={{ background: "#faf5ec", borderRadius: "12px", padding: "10px 12px", fontSize: "13px", lineHeight: "19px", color: "#10211f" }}>A new chat starts as coaches only. Players under 15 are never added.</div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "2px" }}>
                <button type="button" onClick={() => setSheet(null)} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Cancel</button>
                <button type="button" onClick={() => { setSheet(null); demoToast("Chat created. 6 families invited.") }} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }}>Create chat</button>
              </div>
            </div>
          </div>
        </>
      )}
      {sheet === "cacadnews" && (
        <>
          <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", zIndex: "40" }}>
            <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", color: "#10211f", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", border: "0", padding: "0", margin: "0", background: "rgba(16,33,31,0.45)", cursor: "default" }} />
            <div role="dialog" aria-label="Tall Timber news" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "540px", maxHeight: "740px", borderRadius: "18px", padding: "20px 22px", boxSizing: "border-box", background: "#ffffff", color: "#10211f", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden", boxShadow: "0 12px 40px rgba(16,33,31,0.25)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "20px", lineHeight: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>Tall Timber news</span>
                  <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Only Dani posts here. All 226 families and the coaches get it.</span>
                </div>
                <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", flex: "none", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "0" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>July clinic bookings are open</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Monday · 61 of 226 families have seen it</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Thursday is indoors: wet weather</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Wednesday · U13 Timber</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Term 3 dates and prices</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>28 May</span>
                </div>
              </div>
              <div style={{ background: "#faf5ec", borderRadius: "12px", padding: "10px 12px", fontSize: "13px", lineHeight: "19px", color: "#10211f" }}>Families ask you about these, so you see them too. You can’t post here.</div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "2px" }}>
                <button type="button" onClick={() => setSheet(null)} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Cancel</button>
                <button type="button" onClick={() => { setSheet(null); demoToast("Marked as seen.") }} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }}>Got it</button>
              </div>
            </div>
          </div>
        </>
      )}
      {sheet === "cacadpoll" && (
        <>
          <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", zIndex: "40" }}>
            <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", color: "#10211f", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", border: "0", padding: "0", margin: "0", background: "rgba(16,33,31,0.45)", cursor: "default" }} />
            <div role="dialog" aria-label="New poll" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "540px", maxHeight: "740px", borderRadius: "18px", padding: "20px 22px", boxSizing: "border-box", background: "#ffffff", color: "#10211f", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden", boxShadow: "0 12px 40px rgba(16,33,31,0.25)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "20px", lineHeight: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>New poll</span>
                  <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Polls can book things, not just count hands.</span>
                </div>
                <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", flex: "none", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", fontWeight: "700", color: "#4a5a57", marginBottom: "4px" }}>Start from</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", background: "#2f6252", color: "#ffffff" }}>Make-up times</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>Who’s coming?</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>Holiday clinic interest</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>Your own question</span>
                </div>
              </div>
              <label style={{ display: "block" }}>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", fontWeight: "700", color: "#4a5a57", marginBottom: "4px" }}>Question</span>
                <input defaultValue="Make-up for Tuesday 9 June: which suits?" placeholder="" style={{ width: "100%", boxSizing: "border-box", minHeight: "46px", border: "1px solid #c5c8c4", borderRadius: "10px", padding: "10px 12px", fontFamily: "inherit", fontSize: "16px", color: "#10211f", background: "#ffffff" }} />
              </label>
              <label style={{ display: "block" }}>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", fontWeight: "700", color: "#4a5a57", marginBottom: "4px" }}>Answers</span>
                <input defaultValue="Wed 10 June, 5:30 · Fri 12 June, 4:15" placeholder="" style={{ width: "100%", boxSizing: "border-box", minHeight: "46px", border: "1px solid #c5c8c4", borderRadius: "10px", padding: "10px 12px", fontFamily: "inherit", fontSize: "16px", color: "#10211f", background: "#ffffff" }} />
              </label>
              <div>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", fontWeight: "700", color: "#4a5a57", marginBottom: "4px" }}>What the answers do</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", background: "#2f6252", color: "#ffffff" }}>Book the make-up for each player</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>Remind on Monday</span>
                </div>
              </div>
              <div style={{ background: "#faf5ec", borderRadius: "12px", padding: "10px 12px", fontSize: "13px", lineHeight: "19px", color: "#10211f" }}>Each session holds 6 make-up places. The poll closes an answer when it’s full.</div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "2px" }}>
                <button type="button" onClick={() => setSheet(null)} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Cancel</button>
                <button type="button" onClick={() => { setSheet(null); demoToast("Poll sent. Make-ups are booked as families answer.") }} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }}>Send poll</button>
              </div>
            </div>
          </div>
        </>
      )}
      {sheet === "cdani" && (
        <>
          <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", zIndex: "40" }}>
            <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", color: "#10211f", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", border: "0", padding: "0", margin: "0", background: "rgba(16,33,31,0.45)", cursor: "default" }} />
            <div role="dialog" aria-label="Dani Okafor · owner" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "540px", maxHeight: "740px", borderRadius: "18px", padding: "20px 22px", boxSizing: "border-box", background: "#ffffff", color: "#10211f", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden", boxShadow: "0 12px 40px rgba(16,33,31,0.25)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "20px", lineHeight: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>Dani Okafor · owner</span>
                  <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Just you and Dani.</span>
                </div>
                <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", flex: "none", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ alignSelf: "flex-start", maxWidth: "84%", background: "#faf5ec", color: "#10211f", borderRadius: "14px", padding: "8px 12px", fontSize: "14px", lineHeight: "20px" }}>
                  <strong style={{ display: "block", fontSize: "12px", opacity: "0.8" }}>Dani · Wed 3:02 pm</strong>
                  Can you take the 4:15 on Friday? Sofia is away.
                </div>
              </div>
              <label style={{ display: "block" }}>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", fontWeight: "700", color: "#4a5a57", marginBottom: "4px" }}>Message</span>
                <textarea rows={3} style={{ width: "100%", boxSizing: "border-box", minHeight: "46px", border: "1px solid #c5c8c4", borderRadius: "10px", padding: "10px 12px", fontFamily: "inherit", fontSize: "16px", color: "#10211f", background: "#ffffff", resize: "none", lineHeight: "22px" }} defaultValue="Yes, I can do the 4:15. I’ll need her plan for Development." />
              </label>
              <div>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", fontWeight: "700", color: "#4a5a57", marginBottom: "4px" }}>Quick replies</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", background: "#2f6252", color: "#ffffff" }}>Yes, I can</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>Sorry, I can’t</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>Call me</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "2px" }}>
                <button type="button" onClick={() => setSheet(null)} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Cancel</button>
                <button type="button" onClick={() => { setSheet(null); demoToast("Sent to Dani.") }} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }}>Send to Dani</button>
              </div>
            </div>
          </div>
        </>
      )}
      {sheet === "cfile" && (
        <>
          <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", zIndex: "40" }}>
            <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", color: "#10211f", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", border: "0", padding: "0", margin: "0", background: "rgba(16,33,31,0.45)", cursor: "default" }} />
            <div role="dialog" aria-label="Add a file" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "540px", maxHeight: "740px", borderRadius: "18px", padding: "20px 22px", boxSizing: "border-box", background: "#ffffff", color: "#10211f", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden", boxShadow: "0 12px 40px rgba(16,33,31,0.25)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "20px", lineHeight: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>Add a file</span>
                  <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>PDF, document, spreadsheet or image, up to 25 MB.</span>
                </div>
                <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", flex: "none", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "0" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>U12 fixtures, term 3.pdf</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>From the club · 84 KB</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Canteen roster, June.pdf</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>From the team manager · 61 KB</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Pick another file</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>From this device</span>
                </div>
              </div>
              <div style={{ background: "#faf5ec", borderRadius: "12px", padding: "10px 12px", fontSize: "13px", lineHeight: "19px", color: "#10211f" }}>Files stay in the chat’s Photos, videos and files, so nobody has to scroll back for them.</div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "2px" }}>
                <button type="button" onClick={() => setSheet(null)} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Cancel</button>
                <button type="button" onClick={() => { setSheet(null); demoToast("File added to your message.") }} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }}>Attach</button>
              </div>
            </div>
          </div>
        </>
      )}
      {sheet === "cvideo" && (
        <>
          <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", zIndex: "40" }}>
            <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", color: "#10211f", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", border: "0", padding: "0", margin: "0", background: "rgba(16,33,31,0.45)", cursor: "default" }} />
            <div role="dialog" aria-label="Add a video" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "540px", maxHeight: "740px", borderRadius: "18px", padding: "20px 22px", boxSizing: "border-box", background: "#ffffff", color: "#10211f", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden", boxShadow: "0 12px 40px rgba(16,33,31,0.25)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "20px", lineHeight: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>Add a video</span>
                  <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Up to 3 minutes. Longer videos are trimmed first.</span>
                </div>
                <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", flex: "none", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "0" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Take a video now</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Opens the camera</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Pick from this device</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Your own photos and videos</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>A clip from a game or a recorded drill</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Anyone without a yes for filming is already blurred</span>
                </div>
              </div>
              <div style={{ background: "#faf5ec", borderRadius: "12px", padding: "10px 12px", fontSize: "13px", lineHeight: "19px", color: "#10211f" }}>A video from your own phone gets the same check as a photo: you’re asked if a child without a yes is in it.</div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "2px" }}>
                <button type="button" onClick={() => setSheet(null)} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Cancel</button>
                <button type="button" onClick={() => { setSheet(null); demoToast("Video added to your message.") }} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }}>Add video</button>
              </div>
            </div>
          </div>
        </>
      )}
      {sheet === "cvoice" && (
        <>
          <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", zIndex: "40" }}>
            <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", color: "#10211f", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", border: "0", padding: "0", margin: "0", background: "rgba(16,33,31,0.45)", cursor: "default" }} />
            <div role="dialog" aria-label="Voice note" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "540px", maxHeight: "740px", borderRadius: "18px", padding: "20px 22px", boxSizing: "border-box", background: "#ffffff", color: "#10211f", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden", boxShadow: "0 12px 40px rgba(16,33,31,0.25)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "20px", lineHeight: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>Voice note</span>
                  <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Recording · 0:07 of 2:00</span>
                </div>
                <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", flex: "none", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px", borderRadius: "14px", background: "#eef5f2" }}>
                  <span style={{ flex: "none", width: "14px", height: "14px", borderRadius: "999px", background: "#c39797" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", height: "32px", flexGrow: "1" }}>
                    <span style={{ width: "4px", height: "8px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "14px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "22px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "12px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "28px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "18px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "10px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "20px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "26px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "14px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "8px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "16px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "22px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "10px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "6px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "12px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "18px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "24px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "12px", borderRadius: "2px", background: "#2f6252" }} />
                    <span style={{ width: "4px", height: "8px", borderRadius: "2px", background: "#2f6252" }} />
                  </div>
                  <strong style={{ fontSize: "18px", fontVariantNumeric: "tabular-nums" }}>0:07</strong>
                </div>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", fontWeight: "700", color: "#4a5a57", marginBottom: "4px" }}>Before you send</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", background: "#2f6252", color: "#ffffff" }}>Listen back</span>
                  <span style={{ height: "40px", padding: "0 14px", borderRadius: "999px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f" }}>Start again</span>
                </div>
              </div>
              <div style={{ background: "#faf5ec", borderRadius: "12px", padding: "10px 12px", fontSize: "13px", lineHeight: "19px", color: "#10211f" }}>Everyone in the chat can play it. Voice notes are kept with the chat, like any message.</div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "2px" }}>
                <button type="button" onClick={() => setSheet(null)} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Cancel</button>
                <button type="button" onClick={() => { setSheet(null); demoToast("Voice note sent.") }} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }}>Send voice note</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
