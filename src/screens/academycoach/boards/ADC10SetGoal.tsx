// ADC10-SetGoal, as the academy pack draws it: the board's own words, sizes and colours.
// Programs v2: the goal is for the player the coach has open, and "Save the goal" writes it to the academy's one
// list (setGoal). "How we'll know" and "By when" are not in the list yet: they are kept for the visit only.
// Hand-wired to the list: do not make it again from the board's source.

import { useContext, useState } from 'react'
import { demoToast } from '../../demoToast'
import CoachNav from '../CoachNav'
import { InCoachApp, coachGo } from '../menu'
import { setGoal, type Academy, type Group, type Player } from '../../academy/academyStore'
import { coachBoard, firstName, lowestSkill, useCoachTeam } from '../coachTeam'

const C = {
  cap: { fontSize: "14px", lineHeight: "20px", color: "#4a5a57" },
  h2: { margin: "0", fontSize: "17px", lineHeight: "23px", fontWeight: "700", letterSpacing: "-0.01em" },
  more: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 16px", borderRadius: "10px", border: "1px solid #c5c8c4", background: "#ffffff", color: "#10211f", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  primary: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "10px", border: "1px solid #2f6252", background: "#2f6252", color: "#ffffff", fontSize: "15px", fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box" },
  tile: { background: "#ffffff", border: "1px solid #c5c8c4", borderRadius: "16px", boxSizing: "border-box", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "8px", minHeight: "0", minWidth: "0" },
} as const

// A tapped choice and an untapped one, for each group of choices.
const R = [
  { on: { background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }, off: { background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" } },
  { on: { background: "#2f6252", color: "#ffffff", border: "1px solid #2f6252" }, off: { background: "#ffffff", color: "#10211f", border: "1px solid #c5c8c4" } },
] as const

/** The goal is set for the player the coach has open: from their file, from the team page or from the home. */
export default function ADC10SetGoal({ onNav }: { onNav?: (id: string) => void }) {
  const { a, g, player } = useCoachTeam()
  return <Goal key={player.id} onNav={onNav} a={a} g={g} p={player} />
}

function Goal({ onNav, a, g, p }: { onNav?: (id: string) => void; a: Academy; g: Group; p: Player }) {
  const go = coachGo(onNav)
  const f = firstName(p)
  // The skill the goal works on: the one it was set on, "Something else" for a goal with none, or where the player's step is lowest.
  const [pick, setPick] = useState<number[]>([p.goal_skill ? a.skills.indexOf(p.goal_skill) : p.goal ? 4 : lowestSkill(p), 0])   // which choice is tapped in each group
  const [text, setText] = useState(p.goal ?? '')
  function save() {
    if (!text.trim()) { demoToast(`Write the goal in ${f}’s words first.`); return }
    setGoal(p.id, text, a.skills[pick[0]] ?? null)   // written to the academy's list: the file, the team page and the home's meter follow
    demoToast(`${f}’s goal is saved. It is on ${f}’s file and the team page.`)
    go(coachBoard(p))
  }
  // Ideas: the next step on each core skill, in the words the steps use.
  const ideas = a.skills.map((skill, k) => ({ k, skill, next: a.step_words[skill][p.skills_now[k]] })).filter(i => i.next)
  const inApp = useContext(InCoachApp)
  return (
    <div data-board="ADC10-SetGoal" style={{ ...(inApp ? { flexGrow: 1, minHeight: 0 } : { width: 1180, minHeight: 820 }), position: "relative", boxSizing: "border-box", background: "#faf5ec", color: "#10211f", fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)", display: "flex", flexDirection: "column" }}>
      {!inApp && <CoachNav active="players" sub="Player file" go={go} />}
      <div style={{ flex: "none", padding: "14px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "14px", minWidth: "0" }}>
          <h1 style={{ margin: "0", fontSize: "26px", lineHeight: "32px", fontWeight: "700", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>A goal with {f}</h1>
          <span style={{ ...C.cap, whiteSpace: "nowrap" }}>{p.name}, {p.age} · {g.name} · chosen together, in {f}’s words</span>
        </div>
        <div style={{ display: "flex", gap: "8px", flex: "none" }}>
          <button onClick={() => go(coachBoard(p))} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.more }}>Cancel</button>
          <button data-save="" onClick={save} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", ...C.primary }}>Save the goal</button>
        </div>
      </div>
      <main style={{ flexGrow: "1", minHeight: "0", padding: "12px 28px 18px", boxSizing: "border-box", display: "grid", gap: "14px", gridTemplateColumns: "minmax(0,1fr) 340px" }}>
        <section aria-label="This term’s goal" style={{ ...C.tile, gap: "14px" }}>
          <h2 style={{ ...C.h2 }}>This term’s goal</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>Which skill</span>
            <div role="radiogroup" aria-label="Which skill" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button role="radio" aria-checked={pick[0] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 0 : v)); demoToast("First touch: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 0 ? R[0].on : R[0].off) }}>First touch</button>
              <button role="radio" aria-checked={pick[0] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 1 : v)); demoToast("Running with the ball: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 1 ? R[0].on : R[0].off) }}>Running with the ball</button>
              <button role="radio" aria-checked={pick[0] === 2} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 2 : v)); demoToast("One against one: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 2 ? R[0].on : R[0].off) }}>One against one</button>
              <button role="radio" aria-checked={pick[0] === 3} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 3 : v)); demoToast("Striking the ball: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 3 ? R[0].on : R[0].off) }}>Striking the ball</button>
              <button role="radio" aria-checked={pick[0] === 4} onClick={() => { setPick(p => p.map((v, k) => k === 0 ? 4 : v)); demoToast("Something else: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[0] === 4 ? R[0].on : R[0].off) }}>Something else</button>
            </div>
          </div>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            The goal, in {f}’s words
            <textarea data-goal-text="" value={text} onChange={e => setText(e.target.value)} placeholder="One thing, said the way they would say it" rows={1} style={{ minHeight: "48px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", fontWeight: "700" }}>
            How we’ll know
            <textarea defaultValue={p.id === 166 ? "One left-foot goal in a game, on film or seen by a coach" : ""} placeholder="What you would both see when it is done" rows={1} style={{ minHeight: "48px", borderRadius: "12px", border: "1px solid #c5c8c4", background: "#ffffff", padding: "12px", boxSizing: "border-box", fontSize: "15px", lineHeight: "21px", fontWeight: "400", fontFamily: "inherit", color: "inherit", width: "100%", display: "block", resize: "none" }} />
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>By when</span>
            <div role="radiogroup" aria-label="By when" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button role="radio" aria-checked={pick[1] === 0} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 0 : v)); demoToast("End of this term: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[1] === 0 ? R[1].on : R[1].off) }}>End of this term</button>
              <button role="radio" aria-checked={pick[1] === 1} onClick={() => { setPick(p => p.map((v, k) => k === 1 ? 1 : v)); demoToast("End of next term: chosen.") }} style={{ margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 16px", borderRadius: "999px", boxSizing: "border-box", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "700", textDecoration: "none", whiteSpace: "nowrap", ...(pick[1] === 1 ? R[1].on : R[1].off) }}>End of next term</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700" }}>Ideas: the next step on each skill</span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {ideas.map(i => <button key={i.skill} onClick={() => { setText(i.next); setPick(v => [i.k, v[1]]); demoToast(`Filled in. Change the words to ${f}’s own.`) }} style={{ border: "0", margin: "0", font: "inherit", textAlign: "inherit", cursor: "pointer", height: "44px", padding: "0 14px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "inline-flex", alignItems: "center", fontSize: "14px", textDecoration: "none" }}>{i.skill}: {i.next.toLowerCase()}</button>)}
            </div>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>Opens from the player file, the home (“Set one”), and the last step of a review chat.</span>
        </section>
        <aside aria-label="Where the goal shows" style={{ ...C.tile, gap: "2px" }}>
          <h2 style={{ ...C.h2 }}>Where the goal shows</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>1</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>{f}’s own app</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>On the home screen{p.age < 13 ? ', from 13' : ''}</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>2</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>{f}’s family’s app</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>With this week’s practice</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>3</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>Your sessions</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Suggested drills lean towards it</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minHeight: "54px", borderTop: "1px solid #e9eae8" }}>
            <span style={{ flex: "none", width: "30px", height: "30px", borderRadius: "999px", background: "#eef5f2", color: "#10211f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700" }}>4</span>
            <span style={{ flexGrow: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontSize: "15px", lineHeight: "21px", fontWeight: "700" }}>The term report</span>
              <span style={{ display: "block", fontSize: "13px", lineHeight: "18px", color: "#4a5a57" }}>Whether {f} got there</span>
            </span>
          </div>
          <span style={{ ...C.cap, marginTop: "auto", paddingTop: "8px" }}>One goal at a time. For a child under 13 the parent sees it first and can ask to change it.</span>
        </aside>
      </main>
    </div>
  )
}
