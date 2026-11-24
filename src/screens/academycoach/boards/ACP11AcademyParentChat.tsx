// ACP11-AcademyParentChat, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// Made from the board's source by the converter kept with the checking scripts; change the words here, not the layout.

import { useState } from 'react'
import { demoToast } from '../../demoToast'
import { coachGo } from '../menu'

const C = {
  num: { fontVariantNumeric: "tabular-nums" },
} as const

export default function ACP11AcademyParentChat({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const [sheet, setSheet] = useState<string | null>(null)
  return (
    <div data-board="ACP11-AcademyParentChat" style={{ width: 390, height: 844, overflow: 'hidden', position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "none", padding: "12px 18px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
        <button aria-label="Back" onClick={() => go("ACP3-AcademyParentHome")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", width: "44px", height: "44px", marginLeft: "-8px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", textDecoration: "none" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <span style={{ flexGrow: "1" }}>
          <span style={{ display: "block", fontSize: "12px", lineHeight: "16px", color: "#cfe6dc" }}>16 families, Reece and Dani</span>
          <span style={{ display: "block", fontSize: "21px", lineHeight: "27px", fontWeight: "700" }}>U13 Timber · Tue and Thu</span>
        </span>
        <span style={{ flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>TO</span>
      </div>
      <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <button onClick={() => setSheet("cpinned")} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "none", display: "flex", alignItems: "center", gap: "8px", minHeight: "44px", padding: "0 12px", borderRadius: "12px", background: "#eef5f2", color: "#10211f", fontSize: "13px", lineHeight: "18px", textDecoration: "none" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2f6252" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 4h6l-1 6 4 4H6l4-4zM12 14v7" />
          </svg>
          <span style={{ flexGrow: "1" }}>
            <strong>Pinned:</strong>
            {" Term 3 starts Tue 14 July. Same times."}
          </span>
        </button>
        <div style={{ flexGrow: "1", minHeight: "0", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "10px" }}>
          <div style={{ display: "flex", gap: "6px", alignItems: "flex-end" }}>
            <span style={{ flex: "none", width: "28px", height: "28px", borderRadius: "999px", background: "#c39797", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>RW</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-start", minWidth: "0" }}>
              <span style={{ fontSize: "11px", lineHeight: "15px", color: "#4a5a57" }}>Reece · coach · 3:30 pm</span>
              <div style={{ maxWidth: "258px", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4", borderRadius: "14px 14px 14px 4px", padding: "8px 11px", fontSize: "15px", lineHeight: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span role="img" aria-label="Video: Left-foot finishing" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "236px", height: "132px", borderRadius: "10px", background: "#1f4a3e", color: "#ffffff" }}>
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
                <span style={{ height: "24px", padding: "0 8px", borderRadius: "999px", background: "#ffffff", border: "1px solid #2f6252", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px", color: "#10211f" }}>8</span>
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "flex-end", flexDirection: "row-reverse" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-end", minWidth: "0" }}>
              <span style={{ fontSize: "11px", lineHeight: "15px", color: "#4a5a57" }}>You · 4:15 pm</span>
              <div style={{ maxWidth: "258px", background: "#2f6252", color: "#ffffff", border: "0", borderRadius: "14px 14px 4px 14px", padding: "8px 11px", fontSize: "15px", lineHeight: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>Kai did all three practices! Is there a make-up for next Tuesday? We’re away.</div>
              <span style={{ display: "flex", gap: "4px", marginTop: "-2px" }}>
                <span style={{ height: "24px", padding: "0 8px", borderRadius: "999px", background: "#ffffff", border: "1px solid #c5c8c4", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px", color: "#10211f" }}>2</span>
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "flex-end" }}>
            <span style={{ flex: "none", width: "28px", height: "28px", borderRadius: "999px", background: "#c39797", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>RW</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-start", minWidth: "0" }}>
              <span style={{ fontSize: "11px", lineHeight: "15px", color: "#4a5a57" }}>Reece · coach · 4:20 pm</span>
              <div style={{ maxWidth: "258px", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4", borderRadius: "14px 14px 14px 4px", padding: "8px 11px", fontSize: "15px", lineHeight: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "8px", width: "236px", minWidth: "0", color: "#10211f" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "700", color: "#2f6252" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 20V10M12 20V4M19 20v-7" />
                    </svg>
                    POLL
                  </span>
                  <strong style={{ fontSize: "15px", lineHeight: "20px" }}>Make-up for Tue 9 June: which suits?</strong>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", lineHeight: "19px" }}>
                      <span style={{ flex: "none", width: "20px", height: "20px", borderRadius: "999px", boxSizing: "border-box", border: "2px solid #2f6252", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12l5 5 9-10" />
                        </svg>
                      </span>
                      <span style={{ flexGrow: "1", fontWeight: "700" }}>Wed 10 June, 5:30</span>
                      <strong style={{ ...C.num }}>3</strong>
                    </span>
                    <span style={{ display: "block", height: "6px", borderRadius: "3px", background: "#e9eae8", overflow: "hidden" }}>
                      <span style={{ display: "block", height: "100%", width: "100%", background: "#2f6252" }} />
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
                    <span style={{ flexGrow: "1", fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>Your answer books Kai’s make-up</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: "none", padding: "8px 12px 10px", background: "#ffffff", borderTop: "1px solid #c5c8c4", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button aria-label="Add a photo, video, voice note or more" onClick={() => setSheet("cattach")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", flex: "none", width: "48px", height: "48px", borderRadius: "14px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <span style={{ flexGrow: "1", minHeight: "48px", border: "1px solid #c5c8c4", borderRadius: "14px", background: "#ffffff", padding: "0 14px", display: "flex", alignItems: "center", fontSize: "15px", color: "#4a5a57" }}>Write to the group</span>
          <button aria-label="Send" onClick={() => demoToast("Sent to the U13 Timber group.")} style={{ border: "0", padding: "0", margin: "0", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", flex: "none", width: "48px", height: "48px", borderRadius: "14px", background: "#2f6252", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
      {sheet === "cattach" && (
        <>
          <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", zIndex: "40" }}>
            <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", color: "#10211f", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", border: "0", padding: "0", margin: "0", background: "rgba(16,33,31,0.45)", cursor: "default" }} />
            <div role="dialog" aria-label="Add to your message" style={{ position: "absolute", left: "0", right: "0", bottom: "0", borderRadius: "20px 20px 0 0", maxHeight: "780px", padding: "18px 16px 22px", boxSizing: "border-box", background: "#ffffff", color: "#10211f", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden", boxShadow: "0 12px 40px rgba(16,33,31,0.25)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "20px", lineHeight: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>Add to your message</span>
                  <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>What you can send was set by the chat owner.</span>
                </div>
                <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", flex: "none", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "0" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Photo</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Take one or pick from your phone</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Video</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Up to 3 minutes</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Voice note</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Up to 2 minutes</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Place</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>A pin on the map</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>File</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>A PDF or document, up to 25 MB</span>
                </div>
              </div>
              <div style={{ background: "#faf5ec", borderRadius: "12px", padding: "10px 12px", fontSize: "13px", lineHeight: "19px", color: "#10211f" }}>Photos and videos of other people’s children are checked against photo consent before they’re sent.</div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "2px" }}>
                <button type="button" onClick={() => setSheet(null)} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Cancel</button>
                <button type="button" onClick={() => { setSheet(null); demoToast("Photo added to your message.") }} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252", flexGrow: "1" }}>Add a photo</button>
              </div>
            </div>
          </div>
        </>
      )}
      {sheet === "cpinned" && (
        <>
          <div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", zIndex: "40" }}>
            <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", color: "#10211f", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", border: "0", padding: "0", margin: "0", background: "rgba(16,33,31,0.45)", cursor: "default" }} />
            <div role="dialog" aria-label="Pinned messages" style={{ position: "absolute", left: "0", right: "0", bottom: "0", borderRadius: "20px 20px 0 0", maxHeight: "780px", padding: "18px 16px 22px", boxSizing: "border-box", background: "#ffffff", color: "#10211f", display: "flex", flexDirection: "column", gap: "14px", overflow: "hidden", boxShadow: "0 12px 40px rgba(16,33,31,0.25)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flexGrow: "1", minWidth: "0" }}>
                  <span style={{ display: "block", fontSize: "20px", lineHeight: "26px", fontWeight: "700", letterSpacing: "-0.01em" }}>Pinned messages</span>
                  <span style={{ display: "block", fontSize: "14px", lineHeight: "20px", color: "#4a5a57" }}>Pinned by a coach or the chat owner.</span>
                </div>
                <button type="button" aria-label="Close" onClick={() => setSheet(null)} style={{ fontFamily: "inherit", flex: "none", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "0" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Sunday, be there 8:40 at pitch 2. White kit.</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Rob · today 7:12 pm</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>U12 fixtures, term 3.pdf</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Rob · Monday 6:10 pm</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
                  <span style={{ fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Chat rules: be kind, no scores from other teams’ games</span>
                  <span style={{ fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Rob · 2 March</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "2px" }}>
                <button type="button" onClick={() => setSheet(null)} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" }}>Cancel</button>
                <button type="button" onClick={() => { setSheet(null); demoToast("Jumped to the pinned message.") }} style={{ height: "48px", padding: "0 18px", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", fontWeight: "700", cursor: "pointer", background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252", flexGrow: "1" }}>Go to the first one</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
