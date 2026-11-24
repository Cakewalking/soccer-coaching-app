// ADC11-AfterSession, as the academy pack draws it: the board's own words, sizes and colours.
// Programs v2: the rows are the coach's own team from the academy's one list. "Done" closes the session by the one
// rule in ../steps ("Better" two sessions running moves a step up, in the list), and a tap or a note counts as a note.
// Hand-wired to the list: do not make it again from the board's source.

import { useContext, useState } from 'react'
import { demoToast } from '../../demoToast'
import { addNote } from '../../academy/academyStore'
import { TODAY_SKILL, closeSession, wasBetter } from '../steps'
import { firstName, ini, longDate, names, todayMark, useCoachTeam } from '../coachTeam'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

// A tapped choice and an untapped one.
const R = { on: { background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }, off: { background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" } } as const

export default function ADC11AfterSession({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const { a, g, ps } = useCoachTeam()
  const [taps, setTaps] = useState<Record<number, boolean>>({})   // each player's tap today: true is Better, false is Same, none is skipped
  const [noted, setNoted] = useState<number[]>([])
  const skill = a.skills[TODAY_SKILL].toLowerCase()
  // Everyone who was not marked away on today's roll (ACC2).
  const list = ps.filter(p => todayMark(a, g, p) !== false)
  const here = ps.filter(p => todayMark(a, g, p) === true).length, marked = list.filter(p => p.id in taps).length
  function done() {
    const moved = closeSession(Object.fromEntries(list.map(p => [p.id, taps[p.id] ?? null])))
    const up = ps.filter(p => moved.includes(p.id))
    if (up.length) demoToast(`${names(up)} ${up.length === 1 ? 'is' : 'are'} up a step on ${skill}.`)
    else if (marked) demoToast(`${marked} ${marked === 1 ? 'player has' : 'players have'} notes from today.`)
    go("ACC1-CoachToday")
  }
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ADC11-AfterSession" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="today" sub="Run a session" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>After the session</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>{g.name} · {longDate(a.today)} · {here ? `${here} came` : 'roll not taken yet'} · today’s skill: {skill}</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go("ACC1-CoachToday")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Finish later</button>
          <button data-done="" onClick={done} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Done · {marked} of {list.length} marked</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 340px" }}>
        <section aria-label="Two taps each" style={{ ...C.tile, gap: "14px" }}>
          <h2 style={{ ...C.h2 }}>Two taps each</h2>
          {list.map(p => {
            const tap = taps[p.id] ?? null, f = firstName(p)
            return (
          <div key={p.id} data-after={p.id} style={{ display: "grid", gridTemplateColumns: "40px minmax(0,1fr) 190px minmax(0,1fr) 44px", gap: "10px", alignItems: "center", minHeight: "60px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "34px", height: "34px", borderRadius: "999px", background: "#e8cfcf", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>{ini(p)}</span>
            <span style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
              <strong style={{ fontSize: "15px" }}>{p.name}</strong>
              {wasBetter(p.id) && <span style={{ fontSize: "12px", lineHeight: "16px", color: "#4a5a57" }}>Better last session. One more moves {f} up a step</span>}
            </span>
            <span role="radiogroup" aria-label={`${p.name}: ${skill} today`} style={{ display: "flex", gap: "6px" }}>
              <button role="radio" aria-checked={tap === false} onClick={() => { setTaps(t => ({ ...t, [p.id]: false })); demoToast(`${p.name}: Same.`) }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(tap === false ? R.on : R.off) }}>Same</button>
              <button role="radio" aria-checked={tap === true} onClick={() => { setTaps(t => ({ ...t, [p.id]: true })); demoToast(`${p.name}: Better.`) }} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", flex: "1", height: "44px", borderRadius: "12px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", textDecoration: "none", ...(tap === true ? R.on : R.off) }}>Better</button>
            </span>
            {/* A note counts on the player's file at once: it is one of the coach's four basics. */}
            <button data-note={p.id} onClick={() => { addNote(p.id); setNoted(n => [...n, p.id]); demoToast(`A note is on ${f}’s file, with today’s date.`) }} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", minHeight: "44px", display: "flex", alignItems: "center", fontSize: "14px", textDecoration: "none", color: "#10211f" }}>{noted.includes(p.id) ? 'Note added today' : p.notes_in_last_3_weeks ? 'Add a note' : 'Add a note · none in 3 weeks'}</button>
            <button aria-label={`Say a note about ${p.name}`} onClick={() => demoToast("Hold to talk. Up to 30 seconds. It is typed out for you.")} style={{ padding: "0", margin: "0", font: "inherit", textAlign: "inherit", textDecoration: "underline", cursor: "pointer", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid #c5c8c4", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", color: "#10211f" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v9M8 9v2a4 4 0 008 0V9M12 17v3" />
              </svg>
            </button>
          </div>
            )
          })}
          <span style={{ ...C.cap, marginTop: "auto" }}>{list.length === ps.length ? `All ${ps.length} of ${g.name}` : `The ${list.length} who were not marked away`}, in name order. Opens when you close a session in Run a session. Takes about three minutes.</span>
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
