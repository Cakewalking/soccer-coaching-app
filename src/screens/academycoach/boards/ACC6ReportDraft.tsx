// ACC6-ReportDraft, as the academy pack draws it: the board's own words, sizes and colours.
// Programs v2: the draft is for the player the coach has open, written and counted from the academy's one list.
// "Looks right, send to Dani" marks the report drafted in that list (setReport).
// Hand-wired to the list: do not make it again from the board's source.

import { useContext } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { cameOf, setReport, type Academy, type Group, type Player } from '../../academy/academyStore'
import { dayMonth, firstName, isNew, lowestSkill, openPlayer, useCoachTeam } from '../coachTeam'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  num: { fontVariantNumeric: "tabular-nums" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

/** The draft a family would read, written from the list: what the player came to, what moved against their own start, and their goal. Never another child. */
function draft(a: Academy, g: Group, p: Player): [string, string] {
  const f = firstName(p), c = cameOf(p)
  const up = a.skills.map((skill, k) => ({ skill, by: p.skills_now[k] - p.skills_then[k], words: a.step_words[skill][p.skills_now[k] - 1] })).filter(x => x.by > 0)
  const low = lowestSkill(p), next = a.step_words[a.skills[low]][p.skills_now[low]]
  const first = `${f} came to ${c.came} of ${c.of} sessions ${isNew(p, g) ? `since joining on ${dayMonth(p.joined)}` : 'this term'}. `
    + (up.length ? up.map(x => `${x.skill} has moved up ${x.by === 1 ? 'a step' : `${x.by} steps`}: ${x.words.toLowerCase()}.`).join(' ')
      : `${f} is steady on all four core skills.${next ? ` The next step on ${a.skills[low].toLowerCase()} is: ${next.toLowerCase()}.` : ''}`)
  const second = p.goal ? `The goal we set together this term: ${p.goal.toLowerCase()}. We will keep at it in training, and a few minutes at home each week helps.`
    : `We have not set a goal with ${f} yet. That is the first thing we will do next term.`
  return [first, second]
}

export default function ACC6ReportDraft({ onNav }: { onNav?: (id: string) => void }) {
  const go = coachGo(onNav)
  const inApp = useContext(InCoachApp)
  const { a, g, ps, player: p } = useCoachTeam()
  const f = firstName(p), c = cameOf(p), [first, second] = draft(a, g, p)
  const toWrite = ps.filter(x => x.term_report === 'To write')
  function next() {
    // the next player, in name order, whose report is still to write
    const i = ps.indexOf(p), to = [...ps.slice(i + 1), ...ps.slice(0, i)].find(x => x.term_report === 'To write')
    if (to) { openPlayer(to.id); demoToast(`Opening ${firstName(to)}’s.`) } else demoToast('No more reports to write.')
  }
  function send() {
    setReport(p.id, 'Drafted')   // written to the academy's list: the file, the home's meter and Dani's list follow
    const left = toWrite.filter(x => x.id !== p.id).length
    demoToast(`Sent to Dani to approve. ${left ? `${left} more to write.` : 'Every report is drafted.'}`)
  }
  return (
    <div data-board="ACC6-ReportDraft" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="players" sub="Term report" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Term report · {p.name}</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }} data-report-status={p.term_report}>{p.term_report === 'Drafted' ? 'Drafted and with Dani to approve' : p.term_report === 'Too new' ? `${f} joined on ${dayMonth(p.joined)}: too new for a report this term` : 'Drafted from your session notes · check it, then send to Dani'}</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={next} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Next draft</button>
          {p.term_report === 'To write' && <button data-send="" onClick={send} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Looks right, send to Dani</button>}
          {p.term_report === 'Drafted' && <button data-takeback="" onClick={() => { setReport(p.id, 'To write'); demoToast(`${f}’s report is back with you to write.`) }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Take it back</button>}
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "repeat(12, minmax(0,1fr))" }}>
        <section aria-label={`What ${f}’s family will read`} style={{ ...C.tile, gridColumn: "span 7", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>What {f}’s family will read</h2>
            <span style={{ ...C.cap }}>2 short paragraphs</span>
          </div>
          <div style={{ border: "1px solid #c5c8c4", borderRadius: "12px", padding: "14px 16px", fontSize: "15px", lineHeight: "23px", background: "#ffffff" }}>
            {first}
            <br />
            <br />
            {second}
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <button onClick={() => demoToast("Shortened to three sentences.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Make it shorter</button>
            <button onClick={() => demoToast("Tap any sentence to edit it.")} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Change a word</button>
            <button onClick={() => demoToast(p.clips_sent_this_term ? `Pick from the ${p.clips_sent_this_term} ${p.clips_sent_this_term === 1 ? 'clip' : 'clips'} sent to ${f}’s family this term.` : `No clip has gone to ${f}’s family yet this term.`)} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Add a clip</button>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Written from what you noted, in plain words. It never compares {f} with another child.</span>
        </section>
        <section aria-label="Skills, then and now" style={{ ...C.tile, gridColumn: "span 5", gap: "0", padding: "14px 18px 10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
            <h2 style={{ ...C.h2 }}>Skills, then and now</h2>
          </div>
          {a.skills.map((skill, k) => (
          <div key={skill} style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "52px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flexGrow: "1", fontSize: "15px", fontWeight: "700" }}>{skill}</span>
            <span role="img" aria-label={`Step ${p.skills_now[k]} of 5${p.skills_now[k] > p.skills_then[k] ? `, up from ${p.skills_then[k]}` : ''}`} style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ width: "14px", height: "14px", borderRadius: "999px", boxSizing: "border-box", ...(s <= p.skills_then[k] ? { background: "#2f6252" } : s <= p.skills_now[k] ? { background: "#40826d", outline: "2px solid #40826d", outlineOffset: "2px" } : { background: "#ffffff", border: "1.5px solid #c5c8c4" }) }} />)}
            </span>
          </div>
          ))}
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", fontSize: "14px", borderTop: "1px solid #e9eae8", paddingTop: "10px" }}>
            <span>Came to</span>
            <strong style={{ ...C.num }}>{c.came} of {c.of} sessions</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", paddingTop: "8px" }}>
            <span>Goal this term</span>
            <strong>{p.goal ?? 'Not set yet'}</strong>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>The lighter dot is what moved this term.</span>
        </section>
      </main>
    </div>
  )
}
