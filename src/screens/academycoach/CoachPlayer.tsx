// The coach's player file: one template for every player in the coach's own team (ADCP167 to ADCP181, and
// ADC1-PlayerFile for Kai). Everything on it is counted from the academy's one list (programs v2): the four core
// skills against the player's own start of term, the roll session by session, the goal, the family and the place.
// A coach sees no fees. Back goes to the team. "Set a goal" and "Add notes" work on this player.

import { cameOf, worthACall, type Group, type Player } from '../academy/academyStore'
import { dayMonth, firstName, isNew, shortDate, useCoachTeam } from './coachTeam'
import { Dots, More, Primary } from './kit'
import { G, HAIR, INK, MAUVE_PALE, T, label, plain, textLink } from './styles'
import { Chevron, Hd, Pill, StrongDot } from './teamParts'

const row = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, minHeight: 44, borderTop: `1px solid ${HAIR}`, fontSize: 14, color: INK } as const
const val = { display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, textAlign: 'right' } as const
const said = { fontSize: 14, lineHeight: '20px' } as const

/** What is worth knowing about a player, from the list. A prompt for the coach, never a prediction. */
function worthKnowing(p: Player, g: Group): string[] {
  const f = firstName(p), out: string[] = []
  if (p.ready_to_move_to) out.push(`${g.coach.split(' ')[0]} thinks ${f} is ready for ${p.ready_to_move_to} in Term 3.`)
  if (p.same_step_two_terms) out.push(`${f} has been on the same steps for two terms. Worth a word with the coach.`)
  if (worthACall(p)) out.push(`${f} has missed the last three sessions and the family hasn’t said about Term 3. Worth a call.`)
  if (!p.notes_in_last_3_weeks) out.push('No coach notes in the last three weeks.')
  if (p.one_on_ones) out.push(`${f} also books one-on-ones.`)
  if (isNew(p, g)) out.push(`${f} joined on ${dayMonth(p.joined)}, so there is less to go on.`)
  return out
}

export default function CoachPlayer({ player: p, go }: { player: Player; go: (id: string) => void }) {
  const { a, g } = useCoachTeam()
  const f = firstName(p), fresh = isNew(p, g), c = cameOf(p)
  const up = p.skills_now.filter((s, k) => s > p.skills_then[k]).length
  const know = worthKnowing(p, g)
  // A grey square: a session before the player joined, or one whose roll has no mark for them yet.
  const unmarked = g.dates.some((d, i) => d >= p.joined && (p.roll[i] ?? null) === null)
  const grey = fresh ? ` · grey before joining${unmarked ? ' or not marked' : ''}` : unmarked ? ' · grey not marked' : ''
  return (
    <div data-coach-player={p.id} style={{ flexGrow: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#faf5ec', color: INK, fontFamily: "var(--font-sans, 'DM Sans', system-ui, sans-serif)" }}>
      <div style={{ flex: 'none', height: 64, boxSizing: 'border-box', background: '#1c3a33', display: 'flex', alignItems: 'center', padding: '0 22px', gap: 12 }}>
        <button onClick={() => go('ADC2-Group')} style={{ margin: 0, background: 'transparent', fontFamily: 'inherit', cursor: 'pointer', height: 44, padding: '0 14px', borderRadius: 12, border: '1px solid #a9cfc0', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          {g.name}
        </button>
      </div>
      <main style={{ ...T.main, padding: '14px 28px 16px' }}>
        <Hd title={`${p.name}, ${p.age}`} sub={`${g.name} · ${g.coach} · joined ${fresh ? `this term, ${dayMonth(p.joined)}` : 'before this term'} · came to ${c.came} of ${c.of}`}>
          <More onClick={() => go('ADC10-SetGoal')}>Set a goal</More>
          <Primary onClick={() => go('ADC11-AfterSession')}>Add notes</Primary>
        </Hd>
        <div style={{ flexGrow: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 400px', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            <section aria-label={`Where ${f} is`} style={T.tile}>
              <div style={T.between}><h2 style={T.h2}>Where {f} is</h2><span style={T.cap}>Steps 1 to 5 · {up} up {fresh ? `since ${f} joined` : 'since week 1'}</span></div>
              {a.skills.map((skill, k) => {
                const now = p.skills_now[k], moved = now - p.skills_then[k]
                return (
                  <div key={skill} data-skill={k} data-step={now} style={{ display: 'grid', gridTemplateColumns: '170px 96px minmax(0,1fr)', gap: 12, alignItems: 'center', minHeight: 54, borderTop: `1px solid ${HAIR}` }}>
                    <strong style={{ fontSize: 15, lineHeight: '19px' }}>{skill}</strong>
                    <Dots step={now} size={13} />
                    <span style={{ fontSize: 13, lineHeight: '18px', color: '#33443f' }}>{moved > 0 && <strong style={{ color: G }}>Up {moved} this term. </strong>}{a.step_words[skill][now - 1]}</span>
                  </div>
                )
              })}
              <span style={{ ...T.cap, paddingTop: 6 }}>The coach’s own judgement, from two taps after a session. {f} is compared only with where {f} started.</span>
            </section>
            <section aria-label="Attendance" style={{ ...T.tile, gap: 8, flexGrow: 1 }}>
              <div style={T.between}><h2 data-came="" style={T.h2}>Came to {c.came} of {c.of} sessions</h2><StrongDot /></div>
              <div role="img" aria-label={`Came to ${c.came} of ${c.of} sessions`} style={{ display: 'flex', gap: 5 }}>
                {g.dates.map((d, i) => {
                  const v = p.roll[i] ?? null
                  return <span key={d} style={{ flex: 1, maxWidth: 26, height: 22, borderRadius: 5, boxSizing: 'border-box', ...(v === null ? { background: '#eceeed' } : v ? { background: G } : { background: '#ffffff', border: '1.5px solid #a86b78' }) }} />
                })}
              </div>
              <div style={{ ...T.cap, display: 'flex', justifyContent: 'space-between' }}>
                <span>{shortDate(g.dates[0])}</span>
                <span>Green came · outlined missed{grey}</span>
                <span>{shortDate(g.dates[g.dates.length - 1])}</span>
              </div>
              <span style={{ ...T.cap, marginTop: 'auto' }}>From the roll the coach takes at each session.</span>
            </section>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            {p.goal ? (
              <section aria-label="Goal this term" style={{ ...T.tile, gap: 4, padding: '14px 16px', border: `2px solid ${G}` }}>
                <span style={label}>Goal this term</span>
                <strong data-goal="" style={{ fontSize: 20, lineHeight: '26px' }}>{p.goal}</strong>
                <span style={T.sub}>Set with {f} by the coach.{p.goal_skill ? ` It works on: ${p.goal_skill.toLowerCase()}.` : ''}</span>
              </section>
            ) : (
              <section aria-label="Goal this term" style={{ ...T.tile, gap: 6, padding: '14px 16px', background: MAUVE_PALE, borderColor: '#c39797' }}>
                <span style={label}>Goal this term</span>
                <strong data-goal="" style={{ fontSize: 20, lineHeight: '26px' }}>No goal yet</strong>
                <span style={{ display: 'flex' }}><More onClick={() => go('ADC10-SetGoal')}>Set one with {f}</More></span>
              </section>
            )}
            <section aria-label="Family and place" style={{ ...T.tile, gap: 0 }}>
              <h2 style={{ ...T.h2, paddingBottom: 4 }}>Family and place</h2>
              <span style={row}><span style={{ color: '#33443f' }}>Family</span><span style={val}>{p.parent}, {f}’s {p.parent_is}</span></span>
              <span style={row}><span style={{ color: '#33443f' }}>Term 3</span><span style={val}><Pill kind={p.term3 === 'Staying' ? 'good' : p.term3 === 'Leaving' ? 'warn' : 'mauve'}>{p.term3}</Pill></span></span>
              <button data-report={p.term_report} onClick={() => go('ACC6-ReportDraft')} style={{ ...plain, ...row }}>
                <span style={{ color: '#33443f' }}>Term report</span>
                <span style={val}><Pill kind={p.term_report === 'Drafted' ? 'good' : p.term_report === 'To write' ? 'mauve' : 'plain'}>{p.term_report}</Pill><Chevron /></span>
              </button>
              <button data-clips={p.clips_sent_this_term} onClick={() => go('ADC3-SessionFilm')} style={{ ...plain, ...row }}>
                <span style={{ color: '#33443f' }}>Clips sent home this term</span>
                <span style={val}>{p.clips_sent_this_term ? p.clips_sent_this_term : <Pill kind="mauve">None yet</Pill>}<Chevron /></span>
              </button>
              <span style={row}><span style={{ color: '#33443f' }}>Game team</span><span style={val}>{p.game_team.split(' · ')[0]}</span></span>
            </section>
            <section aria-label="Worth knowing" style={{ ...T.tile, gap: 6, flexGrow: 1, ...(worthACall(p) || p.same_step_two_terms ? { background: MAUVE_PALE, borderColor: '#c39797' } : {}) }}>
              <h2 style={T.h2}>Worth knowing</h2>
              {know.length ? know.map(t => <span key={t} style={said}>{t}</span>) : <span style={said}>Nothing needs you. {f} is coming and moving.</span>}
              {/* Kai is the one player the designs draw "The whole player" (ADC12) for, so it opens from his file only. */}
              {p.id === 166 && <span style={{ display: 'flex', marginTop: 'auto' }}><button onClick={() => go('ADC12-WholePlayer')} style={textLink}>The whole player</button></span>}
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
