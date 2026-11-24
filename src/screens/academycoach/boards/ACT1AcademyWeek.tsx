// ACT1-AcademyWeek, as the academy pack draws it (handover v24): the board's own words, sizes and colours.
// The rows are redrawn for programs v2 (Booker, 25 Nov): a coach has one team, so the week is that team's own sessions and its game,
// with the team, the times and the number of players read from the academy's list. The plans themselves are still sample.
// v29 (25 Nov): every team trains four days, Monday to Thursday. A day before today is done, today is tonight's session,
// and a day still to come is planned or needs a plan. The game is on Sunday at 10:00, as the coach's home has it.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { useCoachTeam } from '../coachTeam'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

export default function ACT1AcademyWeek({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { a, g, ps } = useCoachTeam()
  const start = g.when.split(' · ')[1]?.split(' to ')[0] ?? '', today = new Date(`${a.today}T00:00:00Z`)
  const date = (dow: number) => { const d = new Date(today); d.setUTCDate(d.getUTCDate() + dow - (d.getUTCDay() || 7)); return d }
  const DOW: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }
  // The four plans are the v30 board's own, Monday to Thursday. The board still draws three programs and a Saturday game at another ground;
  // the team, its start time, its players and the Sunday game at Wattle Creek FC are the academy's.
  const PLANS = ['Ball mastery, both feet. Small games, no lines', 'Receiving on the half-turn, then 4 v 4 through the middle', 'First touch away from pressure', 'Playing forward after winning it']
  const week = /week \d+ of \d+/.exec(a.term)?.[0] ?? '', term = a.term.split(' · ')[0].toLowerCase()
  const rows = [
    ...g.days.map((d, k) => { const on = date(DOW[d]), past = on < today, tonight = on.getTime() === today.getTime(), state = past ? 'Done' : tonight ? 'Tonight' : k % 2 ? 'Needs a plan' : 'Planned'
      return { day: d.toUpperCase(), n: on.getUTCDate(), title: g.name, sub: `${start} · ${ps.length} players`, plan: PLANS[k % PLANS.length], state, to: state === 'Needs a plan' ? 'ACT2-AcademySuggested' : 'ACT3-AcademySessionPlan' } }),
    { day: 'SUN', n: date(7).getUTCDate(), title: `Game · ${g.name}`, sub: '10:00 at Wattle Creek FC', plan: 'League game with the partner club', state: 'Planned', to: 'ACC7-AcademyGameDay' },
  ]
  const look = (st: string) => st === 'Done' ? { box: '#e9eae8', pill: '#e9eae8', ink: '#10211f' } : st === 'Planned' || st === 'Tonight' ? { box: '#e8cfcf', pill: '#2f6252', ink: '#ffffff' } : { box: 'transparent', pill: '#e8cfcf', ink: '#10211f' }
  return (
    <div data-board="ACT1-AcademyWeek" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="training" sub="This week" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>This week</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>Tall Timber Academy · {term}, {week} · {g.name}</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => demoToast("Last week’s plans copied in as drafts.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Copy last week</button>
          <button onClick={() => go("ACT2-AcademySuggested")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Plan a session</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 320px" }}>
        <section aria-label="Sessions this week" style={{ ...C.tile, gap: "0" }}>
          {rows.map(r => { const k = look(r.state); return (
            <button key={r.day} onClick={() => go(r.to)} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", display: "grid", gridTemplateColumns: "64px 200px minmax(0,1fr) auto", alignItems: "center", gap: "12px", minHeight: "66px", borderTop: "1px solid #e9eae8", textDecoration: "none", color: "#10211f" }}>
              <span style={{ flex: "none", width: "48px", height: "52px", borderRadius: "12px", background: k.box, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: "700" }}>{r.day}</span>
                <span style={{ fontSize: "20px", lineHeight: "22px", fontWeight: "700" }}>{r.n}</span>
              </span>
              <span>
                <strong style={{ display: "block", fontSize: "15px" }}>{r.title}</strong>
                <span style={{ ...C.cap }}>{r.sub}</span>
              </span>
              <span style={{ fontSize: "14px", lineHeight: "20px" }}>{r.plan}</span>
              <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 9px", borderRadius: "999px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", background: k.pill, color: k.ink }}>{r.state}</span>
            </button>) })}
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>The same planning tools a club coach has: suggestions with reasons, the drill library, session plans, who’s coming, and growth and load.</span>
        </section>
        <aside style={{ display: "flex", flexDirection: "column", gap: "14px", minHeight: "0" }}>
          <section aria-label="This fortnight’s theme" style={{ ...C.tile, flex: "none", gap: "6px", border: "2px solid #2f6252" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ ...C.h2 }}>This fortnight’s theme</h2>
            </div>
            <span style={{ fontSize: "15px", lineHeight: "22px" }}>Receiving on the half-turn</span>
            <span style={{ ...C.cap }}>Set by Dani for every team. Your sessions build on it at your team’s level.</span>
          </section>
          <section aria-label="From Sunday’s game" style={{ ...C.tile, flex: "none", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ ...C.h2 }}>From Sunday’s game</h2>
              <button onClick={() => demoToast("Sunday’s match review opens.")} style={{ border: "0", padding: "0", margin: "0", background: "transparent", font: "inherit", textAlign: "inherit", cursor: "pointer", color: "#2f6252", fontSize: "14px", fontWeight: "700", textDecoration: "none", minHeight: "44px", display: "flex", alignItems: "center" }}>Review</button>
            </div>
            <span style={{ ...C.cap }}>{g.name} received facing their own goal 31 times and lost it 12. Tuesday’s session comes from that.</span>
          </section>
          <section aria-label="Load this week" style={{ ...C.tile, flex: "1 1 0", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ ...C.h2 }}>Load this week</h2>
            </div>
            <span style={{ ...C.cap }}>Kai Okonkwo also trains with his club, on top of {g.days.length} sessions here. Keep his repeated sprints short.</span>
          </section>
        </aside>
      </main>
    </div>
  )
}
